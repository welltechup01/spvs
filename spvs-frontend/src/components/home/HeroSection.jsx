import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'
import useSettings from '../../hooks/useSettings'
import { FaTrophy, FaGraduationCap, FaMedal, FaSchool } from 'react-icons/fa'

// ── Slide images (place these in /public/images/) ──────────────────────────
const SLIDES = [
  { src: '/images/Home%20Page%20Slide1.webp', alt: 'Sant Pathik Vidyalaya – Main Building' },
  { src: '/images/Home%20Page%20slide2.webp', alt: 'Sant Pathik Vidyalaya – Morning Assembly' },
  { src: '/images/Home%20Page%20Slide3.webp', alt: 'Sant Pathik Vidyalaya – Sports Ground' },
]
const SLIDE_DURATION = 4500   // ms each slide stays visible
const TRANSITION_MS  = 900    // crossfade duration

function make3D(canvas) {
  if (!canvas) return () => {}
  const W = canvas.offsetWidth, H = canvas.offsetHeight
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
  camera.position.z = 5
  const pGeo = new THREE.BufferGeometry()
  const N = 120, pos = new Float32Array(N * 3)
  for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 18
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const pMat = new THREE.PointsMaterial({ color: 0xE8761A, size: 0.06, transparent: true, opacity: 0.5 })
  scene.add(new THREE.Points(pGeo, pMat))
  const shapes = []
  const geoms = [new THREE.TetrahedronGeometry(.35,0), new THREE.OctahedronGeometry(.28,0), new THREE.IcosahedronGeometry(.24,0)]
  const cols = [0xE8761A, 0xF5B800, 0xFF9A3C]
  for (let i = 0; i < 12; i++) {
    const m = new THREE.MeshBasicMaterial({ color: cols[i%3], wireframe: true, transparent: true, opacity: 0.18 })
    const mesh = new THREE.Mesh(geoms[i%3], m)
    mesh.position.set((Math.random()-0.5)*12, (Math.random()-0.5)*8, (Math.random()-0.5)*4)
    mesh.userData = { rx: Math.random()*.005, ry: Math.random()*.007 }
    scene.add(mesh); shapes.push(mesh)
  }
  let raf
  const animate = () => {
    raf = requestAnimationFrame(animate)
    shapes.forEach(s => { s.rotation.x += s.userData.rx; s.rotation.y += s.userData.ry })
    renderer.render(scene, camera)
  }
  animate()
  return () => { cancelAnimationFrame(raf); renderer.dispose() }
}

// ── Slideshow component ────────────────────────────────────────────────────
// All slides are always in the DOM, stacked.
// Active slide → opacity 1 (CSS transition).
// Inactive slides → opacity 0.
// Old slide fades OUT while new slide fades IN simultaneously → zero blank frame.
function HeroSlideshow({ className }) {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCur(c => (c + 1) % SLIDES.length)
    }, SLIDE_DURATION)
    return () => clearInterval(id)
  }, [])

  const goTo = (idx) => setCur(idx)

  return (
    <div className={`hs-wrap ${className || ''}`}>
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`hs-slide${i === cur ? ' hs-active' : ''}`}
          style={{ backgroundImage: `url(${slide.src})` }}
          aria-hidden={i !== cur}
        />
      ))}

      {/* Dot indicators */}
      <div className="hs-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hs-dot${i === cur ? ' hs-dot-on' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        .hs-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: inherit;
        }

        /* Every slide is always in the DOM, stacked */
        .hs-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          /* Smooth crossfade – no blank gap possible */
          transition: opacity ${TRANSITION_MS}ms ease-in-out;
          will-change: opacity, transform;
        }

        /* Active slide: full opacity + Ken Burns zoom */
        .hs-slide.hs-active {
          opacity: 1;
          animation: hsKenBurns ${SLIDE_DURATION + TRANSITION_MS}ms ease-out forwards;
        }

        /* Gentle zoom-in Ken Burns */
        @keyframes hsKenBurns {
          from { transform: scale(1.07); }
          to   { transform: scale(1.00); }
        }

        /* Dots */
        .hs-dots {
          position: absolute;
          bottom: 54px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 7px;
          z-index: 10;
        }
        .hs-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.45);
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .hs-dot-on {
          background: #fff;
          transform: scale(1.35);
        }
      `}</style>
    </div>
  )
}

export default function HeroSection() {
  const cvRef = useRef(null)
  const { settings } = useSettings()

  const school    = settings.school    || {}
  const admission = settings.admission || {}

  const name      = school.name        || 'Sant Pathik Vidyalaya'
  const students  = school.students    || '1410+'
  const est       = school.established || '1987'
  const board     = school.board       || 'CBSE'
  const area      = school.area        || '10 Acres'
  const affNo     = school.affNo       || '2130176'
  const schoolNo  = school.schoolNo    || '70178'
  const admOpen   = admission.open !== false

  useEffect(() => {
    const cleanup = make3D(cvRef.current)
    return cleanup
  }, [])

  return (
    <section className="hero" id="home">
      <canvas ref={cvRef} className="hero-canvas" />

      {/* ── DESKTOP ── */}
      <div className="hero-inner hero-desk">
        <div>
          <div className="hero-badge">
            <span className="hero-dot"></span>
            {board} Affiliated · Est. {est} · Bahraich
          </div>

          <h1 className="hero-h1">
            <span className="ita">SPV</span> — The<br />
            <span className="gol">Smart</span> Choice<br />
            for <span className="ita">Excellence</span>
          </h1>

          <p className="hero-sub">"Education with Values and Excellence"</p>

          <p className="hero-desc">
            {name} Senior Secondary School — nurturing curious minds, strong values, and lifelong learners since {est} in Pashupati Nagar, Bahraich.
          </p>

          <div className="hero-btns">
            <Link to="/contact" className="btn-or">
              {admOpen ? 'Admission Inquiry' : ' Contact Us →'}
            </Link>
            <Link to="/academics?tab=fees" className="btn-out">Fee Structure</Link>
          </div>

          <div className="hero-trust">
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div className="avs">
                <div className="av">S</div><div className="av">P</div>
                <div className="av">V</div><div className="av">B</div>
              </div>
              <div className="tr-info"><strong>{students}</strong> students</div>
            </div>
            <div className="tr-div"></div>
            <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
              <div className="stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div className="rat-txt"><strong>4.9/5</strong></div>
            </div>
            <div className="tr-div"></div>
            <div className="tr-info" style={{display:'flex',alignItems:'center',gap:'5px'}}>
              <FaTrophy size={13} color="#F5B800"/> <strong>100%</strong> Pass
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-card">
            <HeroSlideshow />
            <div className="hero-img-ov"></div>
            <div className="hero-img-txt">
              <div className="h-img-badge">Est. {est} · {area} Campus</div>
              <div className="h-img-t">Where Values Meet Excellence</div>
              <div className="h-img-s">{board} No. {schoolNo} · Affiliation {affNo}</div>
            </div>
          </div>

          <div className="fbdg fb1">
            <div className="fbdg-ic ic-or"><FaGraduationCap size={22} color="#000"/></div>
            <div><div className="fbdg-n">{students}</div><div className="fbdg-l">Students Enrolled</div></div>
          </div>
          <div className="fbdg fb2">
            <div className="fbdg-ic ic-gd"><FaMedal size={22} color="#000"/></div>
            <div><div className="fbdg-n">100%</div><div className="fbdg-l">Board Results</div></div>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="hero-mob">
        <div className="hm-text">
          <div className="hero-badge hm-badge">
            <span className="hero-dot"></span>
            {board} Affiliated · Est. {est} · Bahraich
          </div>

          <h1 className="hero-h1 hm-h1">
            <span className="ita">SPV</span> — The<br />
            <span className="gol">Smart</span> Choice<br />
            for <span className="ita">Excellence</span>
          </h1>

          <p className="hero-sub hm-sub">"Education with Values and Excellence"</p>

          <p className="hero-desc hm-desc">
            {name} — nurturing curious minds and strong values since {est} in Pashupati Nagar, Bahraich.
          </p>
        </div>

        <div className="hm-card">
          <HeroSlideshow />
          <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(28,10,0,.65) 0%,transparent 55%)',pointerEvents:'none',zIndex:3}}/>
          <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'12px 14px',zIndex:4}}>
            <div style={{fontFamily:"'Poppins',sans-serif",display:'inline-flex',alignItems:'center',gap:'5px',background:'rgba(245,184,0,.9)',padding:'3px 9px',borderRadius:'50px',fontSize:'10px',fontWeight:'600',color:'var(--dark)',marginBottom:'4px'}}>Est. {est} · {area}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:'700',color:'#fff',lineHeight:1.3}}>Where Values Meet Excellence</div>
            <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'10px',fontWeight:'400',color:'rgba(255,255,255,.6)',marginTop:'2px'}}>{board} No. {schoolNo} · Affiliation {affNo}</div>
          </div>
          <div style={{position:'absolute',top:'10px',right:'10px',background:'rgba(255,255,255,.92)',borderRadius:'9px',padding:'6px 10px',display:'flex',alignItems:'center',gap:'6px',zIndex:4}}>
            <FaGraduationCap size={14} color="#E8761A"/>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'13px',fontWeight:'700',color:'var(--dark)'}}>{students}</div>
              <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'9px',fontWeight:'500',color:'var(--txt3)'}}>Students</div>
            </div>
          </div>
        </div>

        <div className="hm-stats">
          {[[students,'Students'],['100%','Pass Rate'],[est.substring(2)+'yrs','Years'],[(school.classrooms||'73'),'Classes']].map(([n,l],i) => (
            <div key={i} className="hm-stat">
              <div className="hm-stat-n">{n}</div>
              <div className="hm-stat-l">{l}</div>
            </div>
          ))}
        </div>

        <div className="hm-btns">
          <Link to="/contact" className="btn-or hm-btn">
            {admOpen ? ' Admission Inquiry' : ' Contact Us'}
          </Link>
          <Link to="/academics?tab=fees" className="btn-out hm-btn">
            Fee Structure
          </Link>
        </div>

        <div className="hm-trust">
          <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <span style={{color:'#F5B800',fontSize:'12px'}}>★★★★★</span>
            <strong style={{fontFamily:"'Poppins',sans-serif",fontSize:'12px',fontWeight:'700',color:'var(--dark2)'}}>4.9/5</strong>
          </div>
          <div className="hm-tdiv"/>
          <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'12px',fontWeight:'400',color:'var(--dark2)'}}><strong>{students}</strong> Students</div>
          <div className="hm-tdiv"/>
          <div style={{display:'flex',alignItems:'center',gap:'4px',fontFamily:"'Poppins',sans-serif",fontSize:'12px',fontWeight:'400',color:'var(--dark2)'}}>
            <FaTrophy size={11} color="#F5B800"/> <strong>100%</strong> Pass
          </div>
        </div>
      </div>

      <div className="scroll-hint"><span>Scroll Down</span><div className="s-wheel"><div className="s-wd"></div></div></div>
      <div className="hero-dots"><div className="hd act"></div><div className="hd"></div><div className="hd"></div></div>

      <style>{`
        .hero-mob { display: none; }
        @media (max-width: 768px) {
          .hero-desk   { display: none !important; }
          .scroll-hint { display: none !important; }
          .hero-dots   { display: none !important; }
          .hero        { min-height: auto !important; padding-bottom: 28px; }
          .hero-mob    { display: flex; flex-direction: column; gap: 16px; padding: 24px 16px 4px; position: relative; z-index: 4; }
          .hm-badge  { font-size: 10px !important; padding: 5px 12px !important; margin-bottom: 10px !important; display: inline-flex !important; }
          .hm-h1     { font-size: 32px !important; line-height: 1.2 !important; margin-bottom: 8px !important; }
          .hm-sub    { font-size: 13px !important; margin-bottom: 6px !important; }
          .hm-desc   { font-size: 13px !important; line-height: 1.6 !important; margin: 0 !important; }
          .hm-card   { border-radius: 18px; overflow: hidden; height: 215px; position: relative; box-shadow: 0 12px 36px rgba(232,118,26,.22); border: 1.5px solid rgba(232,118,26,.2); }
          .hm-stats  { display: flex; align-items: center; background: rgba(255,255,255,.92); backdrop-filter: blur(12px); border-radius: 14px; padding: 12px 6px; border: 1.5px solid rgba(232,118,26,.14); box-shadow: 0 4px 18px rgba(232,118,26,.08); }
          .hm-stat   { flex: 1; text-align: center; }
          .hm-stat + .hm-stat { border-left: 1px solid rgba(232,118,26,.15); }
          .hm-stat-n { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--or); line-height: 1; margin-bottom: 2px; }
          .hm-stat-l { font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 500; color: var(--txt3); text-transform: uppercase; letter-spacing: 0.4px; }
          .hm-btns { display: flex; flex-direction: row; gap: 10px; }
          .hm-btn  { flex: 1 !important; justify-content: center !important; text-align: center !important; font-size: 12px !important; padding: 12px 6px !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .hm-trust  { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 10px 14px; background: rgba(255,255,255,.85); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid rgba(232,118,26,.12); margin-bottom: 4px; }
          .hm-tdiv   { width: 1px; height: 16px; background: rgba(232,118,26,.2); flex-shrink: 0; }
        }
        @media (max-width: 480px) {
          .hm-h1     { font-size: 27px !important; }
          .hm-card   { height: 185px; }
          .hm-stat-n { font-size: 15px; }
          .hm-btn    { font-size: 11px !important; padding: 11px 4px !important; }
        }
        @media (max-width: 360px) {
          .hm-btn    { font-size: 10px !important; padding: 10px 3px !important; }
        }
      `}</style>
    </section>
  )
}