import { useRef, useEffect } from 'react'
import { FaBalanceScale, FaHandsHelping, FaClock, FaStar, FaHandshake, FaFlag, FaBinoculars, FaBullseye } from 'react-icons/fa'

function useReveal(cls = "", delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.classList.add("sr")
    if (cls) el.classList.add(cls)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("in"), delay); obs.disconnect() }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

var VALUES = [
  { icon:<FaBalanceScale size={26} color="#E8761A"/>, title:'Integrity',      desc:'Students are encouraged to practice honesty and ethical behavior in their academic and personal lives.' },
  { icon:<FaHandsHelping size={26} color="#E8761A"/>, title:'Respect',         desc:'The school promotes respect for teachers, parents, peers and society, encouraging students to appreciate diversity and differences.' },
  { icon:<FaClock size={26} color="#E8761A"/>,        title:'Discipline',      desc:'A disciplined environment helps students develop responsibility, punctuality and self-control in their daily lives.' },
  { icon:<FaStar size={26} color="#E8761A"/>,         title:'Excellence',      desc:'Students are motivated to continuously improve and strive for excellence in academics, sports and extracurricular activities.' },
  { icon:<FaHandshake size={26} color="#E8761A"/>,    title:'Teamwork',        desc:'The school encourages collaboration and cooperation so that students learn the importance of working together to achieve common goals.' },
  { icon:<FaFlag size={26} color="#E8761A"/>,         title:'Cultural Pride',  desc:'Modern education rooted in Indian values — students who are globally competitive yet culturally grounded.' },
]

const CSS = `
  .sr { opacity:0; transform:translateY(28px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
  .sr.from-left  { transform:translateX(-36px); }
  .sr.from-right { transform:translateX( 36px); }
  .sr.from-up    { transform:translateY( 28px); }
  .sr.in         { opacity:1 !important; transform:none !important; }
  .vm-cards { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:0; }
  .vm-val-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:14px; }
  .vm-val-card { transition:transform .28s, box-shadow .28s, border-color .28s; }
  .vm-val-card:hover { transform:translateY(-5px) !important; box-shadow:0 16px 40px rgba(232,118,26,.14) !important; border-color:rgba(232,118,26,.3) !important; }
  .vm-story-card { transition:transform .3s, box-shadow .3s; }
  .vm-story-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(28,10,0,.18) !important; }
  @media (max-width:768px) { .vm-cards { grid-template-columns:1fr !important; gap:16px !important; } .vm-val-grid { grid-template-columns:1fr !important; } }
  @media (max-width:480px) { .vm-val-grid { grid-template-columns:1fr !important; } }
`

export default function VisionMissionFull() {
  useEffect(function(){
    var s = document.createElement("style")
    s.id = "vmf-css"; s.textContent = CSS
    document.head.appendChild(s)
    return function(){ var el = document.getElementById("vmf-css"); if(el) el.remove() }
  }, [])

  const headRef    = useReveal("from-up",    0)
  const visionRef  = useReveal("from-left",  100)
  const missionRef = useReveal("from-right", 200)
  const quoteRef   = useReveal("from-up",    0)
  const valHdRef   = useReveal("from-up",    0)
  const val0Ref    = useReveal("from-up",  50)
  const val1Ref    = useReveal("from-up", 120)
  const val2Ref    = useReveal("from-up", 190)
  const val3Ref    = useReveal("from-up", 260)
  const val4Ref    = useReveal("from-up", 330)
  const val5Ref    = useReveal("from-up", 400)
  const valRefs    = [val0Ref, val1Ref, val2Ref, val3Ref, val4Ref, val5Ref]

  return (
    <section id="vision" style={{padding:'80px 0',background:'#FFFDF8',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.4,backgroundImage:'radial-gradient(circle, rgba(232,118,26,.12) 1px, transparent 1px)',backgroundSize:'32px 32px'}} />
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:1}}>

        <div ref={headRef} style={{textAlign:'center',marginBottom:'52px'}}>
          <div className="chip"><span className="chip-dot"/>Our Purpose</div>
          <h2 className="sec-title">Vision, Mission <span className="hl2">&amp; Values</span></h2>
          <div className="s-bar" style={{margin:'0 auto 16px'}} />
          <p className="s-desc" style={{margin:'0 auto',textAlign:'center'}}>The principles that have guided SPV for over 37 years.</p>
        </div>

        <div className="vm-cards" style={{marginBottom:'32px'}}>
          {/* Vision */}
          <div ref={visionRef} className="vm-story-card" style={{background:'linear-gradient(135deg,#1C0A00 0%,#3D1A00 100%)',borderRadius:'22px',padding:'36px',position:'relative',overflow:'hidden',boxShadow:'0 8px 32px rgba(28,10,0,.18)'}}>
            <div style={{position:'absolute',top:'-40px',right:'-40px',width:'180px',height:'180px',borderRadius:'50%',background:'rgba(232,118,26,.08)'}} />
            <div style={{position:'absolute',bottom:'-20px',left:'20px',width:'100px',height:'100px',borderRadius:'50%',background:'rgba(245,184,0,.05)'}} />
            <div style={{marginBottom:'18px'}}><FaBinoculars size={44} color="#F5B800"/></div>
            <div className="chip" style={{background:'rgba(245,184,0,.12)',borderColor:'rgba(245,184,0,.25)',color:'#F5B800',marginBottom:'14px'}}>Our Vision</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#FFCF40',margin:'0 0 14px',lineHeight:'1.35'}}>Education with Values and Excellence</h3>
            <p style={{fontSize:'14px',color:'rgba(255,220,150,.72)',lineHeight:'1.78',margin:0}}>Sant Pathik Vidyalaya is guided by the vision of "Education with Values and Excellence." The institution believes that education should not only focus on academic knowledge but also on building strong character, discipline and responsibility among students. The school aims to create an educational environment where students develop intellectual abilities while also learning important life values.</p>
          </div>

          {/* Mission */}
          <div ref={missionRef} className="vm-story-card" style={{background:'linear-gradient(135deg,#E8761A 0%,#F5B800 100%)',borderRadius:'22px',padding:'36px',position:'relative',overflow:'hidden',boxShadow:'0 8px 32px rgba(232,118,26,.3)'}}>
            <div style={{position:'absolute',bottom:'-40px',left:'-40px',width:'180px',height:'180px',borderRadius:'50%',background:'rgba(255,255,255,.1)'}} />
            <div style={{position:'absolute',top:'20px',right:'20px',width:'80px',height:'80px',borderRadius:'50%',background:'rgba(255,255,255,.08)'}} />
            <div style={{marginBottom:'18px'}}><FaBullseye size={44} color="#1C0A00"/></div>
            <div className="chip" style={{background:'rgba(28,10,0,.1)',borderColor:'rgba(28,10,0,.15)',color:'#1C0A00',marginBottom:'14px'}}>Our Mission</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 14px',lineHeight:'1.35'}}>Quality Education with Modern Practices & Indian Values</h3>
            <p style={{fontSize:'14px',color:'rgba(28,10,0,.68)',lineHeight:'1.78',margin:0}}>The mission of Sant Pathik Vidyalaya is to provide quality education that encourages curiosity, creativity and critical thinking. By combining modern academic practices with traditional Indian cultural values, the school strives to create a learning environment where students feel motivated to explore their interests and develop their abilities in different areas.</p>
          </div>
        </div>

        {/* Director Quote */}
        <div ref={quoteRef} style={{textAlign:'center',padding:'36px 28px',background:'linear-gradient(135deg,#FFF6EA,#FEF0D4)',borderRadius:'22px',border:'1.5px solid rgba(232,118,26,.18)',margin:'0 0 52px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-10px',left:'24px',fontSize:'72px',color:'rgba(232,118,26,.1)',fontFamily:'Georgia,serif',lineHeight:1,userSelect:'none'}}>"</div>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(15px,2.2vw,20px)',fontStyle:'italic',color:'#3D1A00',lineHeight:'1.7',margin:'0 0 14px',position:'relative',zIndex:1}}>Education is the most powerful tool to achieve the goal. Great things are done by a series of small things brought together.</p>
          <div style={{fontSize:'13px',fontWeight:'800',color:'#E8761A',letterSpacing:'.5px'}}>— Sh. Awadhesh Narayan Agarwal, Director &amp; Manager</div>
        </div>

        {/* Core Values heading */}
        <div ref={valHdRef} style={{textAlign:'center',marginBottom:'28px'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Core Values</h3>
          <p style={{fontSize:'14px',color:'#7A4010',margin:0}}>The pillars that define every SPV student's journey</p>
        </div>

        {/* Values grid */}
        <div className="vm-val-grid">
          {VALUES.map(function(v, i){
            return (
              <div key={i} ref={valRefs[i]} className="vm-val-card"
                style={{background:'#FFFFFF',borderRadius:'18px',border:'1.5px solid rgba(232,118,26,.1)',padding:'24px',boxShadow:'0 4px 16px rgba(232,118,26,.05)',display:'flex',gap:'16px',alignItems:'flex-start',cursor:'default'}}>
                <div style={{width:'50px',height:'50px',borderRadius:'14px',background:'linear-gradient(135deg,#FFF3E0,#FEF0D4)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,border:'1.5px solid rgba(232,118,26,.15)',boxShadow:'0 4px 12px rgba(232,118,26,.1)'}}>
                  {v.icon}
                </div>
                <div>
                  <div style={{fontSize:'15px',fontWeight:'700',color:'#1C0A00',marginBottom:'6px'}}>{v.title}</div>
                  <div style={{fontSize:'13px',color:'#7A4010',lineHeight:'1.68'}}>{v.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}