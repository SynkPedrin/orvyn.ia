'use client'

import { useEffect, useRef } from 'react'

// ── Simplex 3D noise GLSL (Stefan Gustavson / Ashima Arts) ───────────────────
const NOISE = `
vec3 _mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 _mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 _permute(vec4 x){return _mod289v4(((x*34.)+1.)*x);}
vec4 _taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=_mod289v3(i);
  vec4 p=_permute(_permute(_permute(
    i.z+vec4(0.,i1.z,i2.z,1.))
    +i.y+vec4(0.,i1.y,i2.y,1.))
    +i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=_taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const vertexShader = `
${NOISE}
uniform float uTime;
uniform float uStr;
uniform float uFreq;
uniform float uScroll;
varying vec3 vN;
varying vec3 vV;
varying vec3 vW;
varying float vD;

void main(){
  vec3 pos=position;
  float str=uStr*(1.+uScroll*1.4);
  float n1=snoise(pos*uFreq       +vec3(uTime*.18,uTime*.12,0.));
  float n2=snoise(pos*uFreq*2.3   -vec3(uTime*.10,0.,uTime*.15));
  float n3=snoise(pos*uFreq*5.1   +vec3(1.7,uTime*.22,9.2))*.35;
  float d=(n1*.6+n2*.3+n3*.1)*str;
  pos+=normal*d;
  vD=d;
  vN=normalize(normalMatrix*normal);
  vW=(modelMatrix*vec4(pos,1.)).xyz;
  vV=normalize(cameraPosition-vW);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
}
`

const fragmentShader = `
uniform float uTime;
uniform float uScroll;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uCS;
varying vec3 vN;
varying vec3 vV;
varying vec3 vW;
varying float vD;

void main(){
  float fr=pow(1.-clamp(dot(vN,vV),0.,1.),3.5);

  float cf=vN.y*.5+.5+sin(uTime*.38)*.12;
  vec3 base=mix(uC1,uC2,cf);

  float ir=sin(vN.y*5.5+vN.x*3.8+uTime*.55+vD*9.);
  base=mix(base,uC3,(ir*.5+.5)*.34);

  vec3 L1=normalize(vec3(1.5,2.,1.2));
  vec3 L2=normalize(vec3(-2.,-1.5,.8));
  vec3 L3=normalize(vec3(.2,1.,2.5));
  float s1=pow(max(dot(reflect(-L1,vN),vV),0.),54.);
  float s2=pow(max(dot(reflect(-L2,vN),vV),0.),26.);
  float s3=pow(max(dot(reflect(-L3,vN),vV),0.),14.);
  vec3 spec=uCS*s1*1.5+uC3*s2*.8+uC2*s3*.45;

  float band=pow(sin(vW.y*2.8+uTime*.45+vD*5.)*.5+.5,2.);
  base=mix(base,uCS*.85,band*.22);

  vec3 col=base+spec+uC2*fr*.95;
  col*=1.+uScroll*.28;

  gl_FragColor=vec4(col,1.);
}
`

// Waypoints: sphere position + scale per scroll section [x, y, z, scale]
const SPHERE_PATH = [
  [  0.0,  0.0, 0.0, 1.05 ],  // S0 hero: center
  [  1.2, -0.1,-0.6, 0.62 ],  // S1
  [ -1.2,  0.2,-0.4, 0.68 ],  // S2
  [  0.6,  0.5,-0.5, 0.58 ],  // S3
  [ -0.8, -0.3,-0.3, 0.64 ],  // S4
  [  0.4,  0.3,-0.4, 0.60 ],  // S5
  [  0.0,  0.0, 0.0, 1.30 ],  // S6 CTA: back center, large
]

function smoothstep(t: number) { return t * t * (3 - 2 * t) }

export function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    let cleanup: (() => void) | undefined

    const init = async () => {
      const THREE = await import('three')
      const canvas = canvasRef.current!

      // ── Renderer ───────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      // ── Scene + camera ─────────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x030308)
      scene.fog = new THREE.FogExp2(0x050310, 0.065)

      const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 60)
      camera.position.z = 3.8

      // ── Lights ─────────────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0x1a0033, 2))

      const L1 = new THREE.PointLight(0xAA22DD, 18, 30)
      L1.position.set(3, 3, 2)
      const L2 = new THREE.PointLight(0x4422BB, 12, 25)
      L2.position.set(-3, -2, -1)
      const L3 = new THREE.PointLight(0xFF88FF, 7, 20)
      L3.position.set(0, 4, 3)
      const L4 = new THREE.PointLight(0x6600AA, 5, 18)
      L4.position.set(0, -4, -2)
      scene.add(L1, L2, L3, L4)

      // ── Liquid metal sphere ─────────────────────────────────────────────────
      const mobile = window.innerWidth < 640
      const segs = mobile ? 72 : 128
      const sphereGeo = new THREE.SphereGeometry(1.2, segs, segs)
      const sphereMat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime:   { value: 0 },
          uStr:    { value: 0.18 },
          uFreq:   { value: 1.4 },
          uScroll: { value: 0 },
          uC1:  { value: new THREE.Color(0xA822DD) },
          uC2:  { value: new THREE.Color(0xCC55EC) },
          uC3:  { value: new THREE.Color(0xF0CCFF) },
          uCS:  { value: new THREE.Color(0xD4AAFF) },
        },
      })
      const sphere = new THREE.Mesh(sphereGeo, sphereMat)
      scene.add(sphere)

      // ── Inner glow ─────────────────────────────────────────────────────────
      const glowGeo = new THREE.SphereGeometry(1.35, 32, 32)
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x7700BB,
        transparent: true,
        opacity: 0.14,
        side: THREE.BackSide,
        depthWrite: false,
      })
      const glow = new THREE.Mesh(glowGeo, glowMat)
      scene.add(glow)

      // ── Particles ──────────────────────────────────────────────────────────
      const pCount = mobile ? 300 : 700
      const pPos = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        const r   = 2.8 + Math.random() * 6
        const th  = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        pPos[i * 3]     = r * Math.sin(phi) * Math.cos(th)
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(th)
        pPos[i * 3 + 2] = r * Math.cos(phi)
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      const pMat = new THREE.PointsMaterial({
        color: 0xCC55EC,
        size: mobile ? 0.018 : 0.022,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        sizeAttenuation: true,
      })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      // ── Ring accent ────────────────────────────────────────────────────────
      const ringGeo = new THREE.TorusGeometry(1.8, 0.006, 8, 140)
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x9922CC, transparent: true, opacity: 0.4 })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI * 0.32
      ring.rotation.z = Math.PI * 0.08
      scene.add(ring)

      const ring2Geo = new THREE.TorusGeometry(2.1, 0.004, 8, 160)
      const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xCC44EE, transparent: true, opacity: 0.2 })
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
      ring2.rotation.x = Math.PI * 0.55
      ring2.rotation.y = Math.PI * 0.2
      scene.add(ring2)

      // ── State ──────────────────────────────────────────────────────────────
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
      let scrollProg = 0

      const onMouseMove = (e: MouseEvent) => {
        mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2
        mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2
      }
      const onScroll = () => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
        scrollProg = window.scrollY / max
      }
      const onResize = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('scroll',    onScroll,    { passive: true })
      window.addEventListener('resize',    onResize)

      // ── Animate ────────────────────────────────────────────────────────────
      let rafId: number
      const clock = new THREE.Clock()
      const N = SPHERE_PATH.length

      const animate = () => {
        rafId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()

        // Smooth cursor
        mouse.x += (mouse.tx - mouse.x) * 0.045
        mouse.y += (mouse.ty - mouse.y) * 0.045

        // Sphere path interpolation
        const raw   = scrollProg * (N - 1)
        const idx   = Math.min(Math.floor(raw), N - 2)
        const frac  = smoothstep(raw - idx)
        const curr  = SPHERE_PATH[idx]
        const next  = SPHERE_PATH[idx + 1]
        const tx = curr[0] + (next[0] - curr[0]) * frac
        const ty = curr[1] + (next[1] - curr[1]) * frac
        const tz = curr[2] + (next[2] - curr[2]) * frac
        const ts = curr[3] + (next[3] - curr[3]) * frac

        sphere.position.x += (tx - sphere.position.x) * 0.055
        sphere.position.y += (ty - sphere.position.y) * 0.055
        sphere.position.z += (tz - sphere.position.z) * 0.055
        sphere.scale.setScalar(sphere.scale.x + (ts - sphere.scale.x) * 0.055)

        glow.position.copy(sphere.position)
        glow.scale.copy(sphere.scale)

        // Cursor tilt
        sphere.rotation.y += (mouse.x * 0.45 - sphere.rotation.y) * 0.05
        sphere.rotation.x += (-mouse.y * 0.3  - sphere.rotation.x) * 0.05

        // Rings orbit + follow sphere
        ring.position.lerp(sphere.position, 0.04)
        ring2.position.lerp(sphere.position, 0.03)
        ring.rotation.z  = t * 0.14
        ring2.rotation.z = -t * 0.09
        ring.scale.setScalar(sphere.scale.x)
        ring2.scale.setScalar(sphere.scale.x * 0.9)

        // Lights orbit around sphere
        L1.position.x = Math.sin(t * 0.4) * 3 + sphere.position.x
        L1.position.z = Math.cos(t * 0.4) * 2
        L2.position.x = Math.cos(t * 0.28) * -3 + sphere.position.x
        L2.position.z = Math.sin(t * 0.28) * -2

        // Particles drift
        particles.rotation.y = t * 0.016
        particles.rotation.x = t * 0.007

        // Update shader
        sphereMat.uniforms.uTime.value   = t
        sphereMat.uniforms.uScroll.value = scrollProg

        renderer.render(scene, camera)
      }

      animate()

      cleanup = () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('scroll',    onScroll)
        window.removeEventListener('resize',    onResize)
        sphereGeo.dispose()
        sphereMat.dispose()
        glowGeo.dispose()
        glowMat.dispose()
        pGeo.dispose()
        pMat.dispose()
        ringGeo.dispose()
        ringMat.dispose()
        ring2Geo.dispose()
        ring2Mat.dispose()
        renderer.dispose()
      }
    }

    init()
    return () => cleanup?.()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
