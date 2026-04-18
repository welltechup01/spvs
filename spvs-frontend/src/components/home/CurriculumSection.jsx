import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'
import { academicsAPI } from '../../api'
import { FaSeedling, FaBook, FaDraftingCompass, FaFlask, FaAtom, FaBriefcase, FaGlobe } from 'react-icons/fa'

function make3D(canvas) {
  if (!canvas) return function() {}
  var W = canvas.offsetWidth, H = canvas.offsetHeight
  var renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  var scene  = new THREE.Scene()
  var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
  camera.position.z = 5
  var shapes = []
  var geoms  = [new THREE.TetrahedronGeometry(.3,0), new THREE.OctahedronGeometry(.22,0)]
  var cols   = [0xE8761A, 0xF5B800, 0xFF9A3C, 0xFFBB7A]
  for (var i = 0; i < 10; i++) {
    var m    = new THREE.MeshBasicMaterial({ color: cols[i%4], wireframe: true, transparent: true, opacity: 0.12 })
    var mesh = new THREE.Mesh(geoms[i%2], m)
    mesh.position.set((Math.random()-.5)*14, (Math.random()-.5)*8, (Math.random()-.5)*4)
    mesh.userData = { rx: Math.random()*.006, ry: Math.random()*.008 }
    scene.add(mesh); shapes.push(mesh)
  }
  var raf
  function animate() {
    raf = requestAnimationFrame(animate)
    shapes.forEach(function(s) { s.rotation.x += s.userData.rx; s.rotation.y += s.userData.ry })
    renderer.render(scene, camera)
  }
  animate()
  return function() { cancelAnimationFrame(raf); renderer.dispose() }
}

var FALLBACK_STREAMS = [
  {
    icon:<FaAtom size={36} color="#E8761A"/>, title:'Science Stream', sub:'Class XI – XII',
    subjects:['Physics','Chemistry','Biology / Maths','English Core','Hindi / CS / PE'],
    color:'#E8761A', bg:'rgba(232,118,26,.06)',
    desc:'PCB & PCM with fully equipped labs. Ideal for medical, engineering and research aspirants.'
  },
  {
    icon:<FaBriefcase size={36} color="#F5B800"/>, title:'Commerce Stream', sub:'Class XI – XII',
    subjects:['Accountancy','Business Studies','Economics','English Core','Hindi / CS / PE'],
    color:'#F5B800', bg:'rgba(245,184,0,.06)',
    desc:'Build the foundation for CA, MBA, banking and entrepreneurship.'
  },
  {
    icon:<FaGlobe size={36} color="#6C3FC5"/>, title:'Humanities Stream', sub:'Class XI – XII',
    subjects:['History','Political Science','Economics','English Core','Hindi / CS / PE'],
    color:'#6C3FC5', bg:'rgba(108,63,197,.06)',
    desc:'Prepare for law, civil services, journalism and social sciences.'
  },
]

var FALLBACK_LEVELS = [
  { icon:<FaSeedling size={28} color="#E8761A"/>, lbl:'Pre-Primary',   tag:'PG – UKG',        students:'160+' },
  { icon:<FaBook size={28} color="#E8761A"/>,     lbl:'Primary',       tag:'Class I – V',      students:'376+' },
  { icon:<FaDraftingCompass size={28} color="#E8761A"/>, lbl:'Middle', tag:'Class VI – VIII',  students:'285+' },
  { icon:<FaFlask size={28} color="#E8761A"/>,    lbl:'Secondary',     tag:'Class IX – X',     students:'315+' },
  { icon:<FaAtom size={28} color="#E8761A"/>,     lbl:'Sr. Secondary', tag:'Class XI – XII',   students:'274+' },
]

export default function CurriculumSection() {
  var cvRef = useRef(null)
  var [streams, setStreams] = useState(FALLBACK_STREAMS)
  var [levels,  setLevels]  = useState(FALLBACK_LEVELS)

  useEffect(function() {
    var cleanup = make3D(cvRef.current)
    return cleanup
  }, [])

  useEffect(function() {
    academicsAPI.get()
      .then(function(res) {
        var d = res.data
        if (d.streams && d.streams.length > 0) {
          setStreams(d.streams.map(function(s) {
            return {
              icon:     <FaBook size={36} color={s.clr||'#E8761A'}/>,
              title:    s.name + ' Stream',
              sub:      'Class XI – XII',
              subjects: s.subjects || [],
              color:    s.clr || '#E8761A',
              bg:       (s.clr || '#E8761A') + '10',
              desc:     s.description || '',
            }
          }))
        }
        if (d.classes && d.classes.length > 0) {
          setLevels([
            { icon:<FaSeedling size={28} color="#E8761A"/>, lbl:'Pre-Primary',   tag:'PG – UKG',       students: calcStudents(d.classes, ['Play Group','Nursery','KG']) },
            { icon:<FaBook size={28} color="#E8761A"/>,     lbl:'Primary',       tag:'Class I – V',     students: calcStudents(d.classes, ['Class I','Class II','Class III','Class IV','Class V']) },
            { icon:<FaDraftingCompass size={28} color="#E8761A"/>, lbl:'Middle', tag:'Class VI – VIII', students: calcStudents(d.classes, ['Class VI','Class VII','Class VIII']) },
            { icon:<FaFlask size={28} color="#E8761A"/>,    lbl:'Secondary',     tag:'Class IX – X',    students: calcStudents(d.classes, ['Class IX','Class X']) },
            { icon:<FaAtom size={28} color="#E8761A"/>,     lbl:'Sr. Secondary', tag:'Class XI – XII',  students: calcStudents(d.classes, ['Class XI','Class XII']) },
          ])
        }
      })
      .catch(function() {})
  }, [])

  function calcStudents(classes, names) {
    var total = classes
      .filter(function(c) { return names.includes(c.name) })
      .reduce(function(sum, c) { return sum + (Number(c.students) || 0) }, 0)
    return total > 0 ? total + '+' : '—'
  }

  return (
    <section className="sect" style={{background:'var(--bg2)',position:'relative',overflow:'hidden'}}>
      <canvas ref={cvRef} className="s-canvas" style={{opacity:.3}} />
      <div className="s-cont" style={{position:'relative',zIndex:3}}>

        {/* Header */}
        <div className="rv" style={{textAlign:'center',marginBottom:'52px'}}>
          <div className="chip"><span className="chip-dot"></span>Our Curriculum</div>
          <h2 className="sec-title">Comprehensive <span className="hl">Education</span><br/>from Nursery to Class XII</h2>
          <div className="s-bar" style={{margin:'10px auto 18px'}}></div>
          <p className="s-desc" style={{margin:'0 auto'}}>
            CBSE curriculum with NCERT books · Experienced faculty · Modern infrastructure · 100% board results
          </p>
        </div>

        {/* Level pills */}
        <div className="rv curr-levels">
          {levels.map(function(l, i) {
            return (
              <div key={i} className="rv3d curr-level-pill" style={{transitionDelay:(i*0.08)+'s'}}
                onMouseEnter={function(e){ e.currentTarget.style.borderColor='var(--or)'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 14px 36px var(--shd)' }}
                onMouseLeave={function(e){ e.currentTarget.style.borderColor='var(--brd)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 18px rgba(232,118,26,.07)' }}
              >
                <div style={{display:'flex',justifyContent:'center',marginBottom:'6px'}}>{l.icon}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'13px',fontWeight:'700',color:'var(--dark)',marginBottom:'3px'}}>{l.lbl}</div>
                <div style={{fontSize:'11px',color:'var(--txt3)',marginBottom:'4px'}}>{l.tag}</div>
                <div style={{fontSize:'12px',fontWeight:'700',color:'var(--or)'}}>{l.students}</div>
              </div>
            )
          })}
        </div>

        {/* Streams label */}
        <div className="rv" style={{textAlign:'center',marginBottom:'28px',marginTop:'52px'}}>
          <div style={{fontSize:'13px',fontWeight:'700',letterSpacing:'2px',textTransform:'uppercase',color:'var(--txt3)'}}>
            Senior Secondary Streams (Class XI–XII)
          </div>
        </div>

        {/* Streams grid */}
        <div className="curr-streams">
          {streams.map(function(s, i) {
            return (
              <div key={i} className="rv3d curr-stream-card"
                style={{transitionDelay:(i*0.12)+'s',background:s.bg,border:'1.5px solid '+s.color+'22'}}
                onMouseEnter={function(e){ e.currentTarget.style.transform='translateY(-8px) rotateX(3deg)'; e.currentTarget.style.boxShadow='0 20px 50px '+s.color+'25' }}
                onMouseLeave={function(e){ e.currentTarget.style.transform='translateY(0) rotateX(0)'; e.currentTarget.style.boxShadow='none' }}
              >
                <div style={{display:'flex',justifyContent:'flex-start',marginBottom:'12px'}}>{s.icon}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'var(--dark)',marginBottom:'4px'}}>{s.title}</div>
                <div style={{fontSize:'11px',fontWeight:'700',color:s.color,letterSpacing:'1px',textTransform:'uppercase',marginBottom:'12px'}}>{s.sub}</div>
                <p style={{fontSize:'13.5px',color:'var(--txt2)',lineHeight:'1.65',marginBottom:'16px'}}>{s.desc}</p>
                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  {s.subjects.map(function(subj, j) {
                    return (
                      <div key={j} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'var(--txt2)'}}>
                        <div style={{width:'6px',height:'6px',borderRadius:'50%',background:s.color,flexShrink:0}}></div>
                        {subj}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="rv curr-cta">
          <Link to="/academics" className="btn-or">View Full Curriculum →</Link>
          <Link to="/academics?tab=fees" className="btn-out">Fee Structure</Link>
        </div>

      </div>

      <style>{`
        .curr-levels { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
        .curr-level-pill { background:var(--card); border:1.5px solid var(--brd); border-radius:14px; padding:16px 20px; text-align:center; min-width:110px; cursor:default; box-shadow:0 4px 18px rgba(232,118,26,.07); transition:all .35s cubic-bezier(.34,1.56,.64,1); }
        .curr-streams { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:20px; margin-bottom:40px; }
        .curr-stream-card { border-radius:20px; padding:28px 24px; transition:all .4s cubic-bezier(.34,1.56,.64,1); cursor:default; }
        .curr-cta { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:8px; }
        @media (max-width:768px) {
          .curr-levels { gap:8px; }
          .curr-level-pill { min-width:calc(50% - 8px); flex:1 1 calc(50% - 8px); padding:12px 10px; }
          .curr-streams { grid-template-columns:1fr; gap:12px; }
          .curr-stream-card { padding:20px 16px; }
          .curr-cta { flex-direction:column; align-items:stretch; gap:10px; }
          .curr-cta a { width:100% !important; justify-content:center !important; text-align:center; }
        }
        @media (max-width:480px) {
          .curr-level-pill { min-width:calc(50% - 6px); padding:10px 8px; }
        }
      `}</style>
    </section>
  )
}