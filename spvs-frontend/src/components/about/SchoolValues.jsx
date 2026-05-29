import { useEffect, useRef, useState } from 'react'
import { FaBook, FaHandshake, FaStar, FaUsers, FaFlag, FaFistRaised, FaLandmark, FaUserGraduate, FaChalkboardTeacher, FaTrophy } from 'react-icons/fa'

var VALUES = [
  { icon:<FaBook size={26} color="#E8761A"/>,           title:'Knowledge',      color:'#E8761A', desc:'We believe education must evolve from mere information to deep wisdom — nurturing curious, critical thinkers.' },
  { icon:<FaHandshake size={26} color="#22a35a"/>,      title:'Integrity',      color:'#22a35a', desc:'Honesty, transparency and moral uprightness form the backbone of every interaction at SPV.' },
  { icon:<FaStar size={26} color="#F5B800"/>,           title:'Excellence',     color:'#F5B800', desc:'We settle for nothing less than the best — in academics, in character, in every endeavour we undertake.' },
  { icon:<FaUsers size={26} color="#6C3FC5"/>,          title:'Cooperation',    color:'#6C3FC5', desc:'From competition to collaboration — we teach students that collective success far surpasses individual achievement.' },
  { icon:<FaFlag size={26} color="#C45F0A"/>,           title:'Cultural Pride', color:'#C45F0A', desc:'Modern education rooted in Indian values — globally competitive yet culturally grounded.' },
  { icon:<FaFistRaised size={26} color="#1C0A00"/>,     title:'Resilience',     color:'#1C0A00', desc:'Failure is part of the journey. We equip students to bounce back stronger and more determined every time.' },
]

var STATS = [
  { n:37,   sfx:'+', label:'Years of Excellence', icon:<FaLandmark size={28} color="#FFCF40"/> },
  { n:1410, sfx:'',  label:'Students Enrolled',   icon:<FaUserGraduate size={28} color="#FFCF40"/> },
  { n:64,   sfx:'+', label:'Expert Faculty',       icon:<FaChalkboardTeacher size={28} color="#FFCF40"/> },
  { n:100,  sfx:'%', label:'Board Results',        icon:<FaTrophy size={28} color="#FFCF40"/> },
]

function CountUp({ target, started }) {
  var [val, setVal] = useState(0)
  useEffect(function(){
    if(!started) return
    var cur = 0
    var step = Math.max(1, Math.floor(target/70))
    var t = setInterval(function(){
      cur = Math.min(cur+step, target)
      setVal(cur)
      if(cur>=target) clearInterval(t)
    }, 18)
    return function(){ clearInterval(t) }
  },[started, target])
  return val>=1000 ? val.toLocaleString() : String(val)
}

export default function SchoolValues() {
  var [vis, setVis]           = useState(false)
  var [statsVis, setStatsVis] = useState(false)
  var ref      = useRef()
  var statsRef = useRef()

  useEffect(function(){
    var obs1 = new IntersectionObserver(function(e){ if(e[0].isIntersecting){ setVis(true);      obs1.disconnect() } },{ threshold:0.08 })
    var obs2 = new IntersectionObserver(function(e){ if(e[0].isIntersecting){ setStatsVis(true); obs2.disconnect() } },{ threshold:0.2 })
    if(ref.current)      obs1.observe(ref.current)
    if(statsRef.current) obs2.observe(statsRef.current)
    return function(){ obs1.disconnect(); obs2.disconnect() }
  },[])

  return (
    <section id="values" ref={ref} style={{padding:'80px 0',background:'#FFFDF8',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <div style={{position:'absolute',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,184,0,.05),transparent 70%)',top:'-150px',left:'-150px'}} />
        <div style={{position:'absolute',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,118,26,.04),transparent 70%)',bottom:'-100px',right:'-100px'}} />
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:1}}>
        <div style={{textAlign:'center',marginBottom:'48px',opacity:vis?1:0,transform:vis?'none':'translateY(24px)',transition:'all .65s ease'}}>
          <div className="chip"><span className="chip-dot"/>What We Stand For</div>
          <h2 className="sec-title">The Values That <span className="hl">Define Us</span></h2>
          <div className="s-bar" style={{margin:'0 auto 16px'}} />
          <p className="s-desc" style={{margin:'0 auto',textAlign:'center'}}>For over 37 years, these values have shaped every student who has walked through our gates.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'16px',marginBottom:'56px'}}>
          {VALUES.map(function(v,i){
            return (
              <div key={i} style={{background:'#FFFFFF',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.08)',padding:'26px',boxShadow:'0 4px 16px rgba(232,118,26,.05)',display:'flex',gap:'16px',alignItems:'flex-start',transition:'all .28s',cursor:'default',opacity:vis?1:0,transform:vis?'none':'translateY(20px)',transitionDelay:(.1+i*.08)+'s'}}
                onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 16px 44px rgba(232,118,26,.13)';e.currentTarget.style.borderColor=v.color+'30'}}
                onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.05)';e.currentTarget.style.borderColor='rgba(232,118,26,.08)'}}>
                <div style={{width:'52px',height:'52px',borderRadius:'15px',background:v.color+'14',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,border:'1.5px solid '+v.color+'20'}}>
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

        <div ref={statsRef} className="sv-stats" style={{background:'linear-gradient(135deg,#1C0A00 0%,#3D1A00 50%,#1C0A00 100%)',borderRadius:'24px',padding:'44px 32px',position:'relative',overflow:'hidden',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
          <div style={{position:'absolute',top:'-60px',right:'-60px',width:'280px',height:'280px',borderRadius:'50%',background:'rgba(232,118,26,.07)',pointerEvents:'none'}} />
          <div style={{position:'absolute',bottom:'-40px',left:'-40px',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(245,184,0,.05)',pointerEvents:'none'}} />
          <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:'linear-gradient(90deg,transparent,#E8761A,#F5B800,#E8761A,transparent)',borderRadius:'24px 24px 0 0'}} />
          <div className="sv-stats-grid">
            {STATS.map(function(st,i){
              return (
                <div key={i} style={{textAlign:'center',position:'relative',zIndex:1,opacity:statsVis?1:0,transform:statsVis?'none':'translateY(20px)',transition:'all .6s ease '+(i*.1)+'s'}}>
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'8px'}}>{st.icon}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,3.5vw,42px)',fontWeight:'700',color:'#FFCF40',marginBottom:'6px',lineHeight:1}}>
                    <CountUp target={st.n} started={statsVis} />{st.sfx}
                  </div>
                  <div style={{fontSize:'12px',color:'rgba(255,220,150,.55)',fontWeight:'600',letterSpacing:'.5px'}}>{st.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .sv-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
        @media (max-width:768px) { .sv-stats { padding:32px 20px !important; border-radius:18px !important; } .sv-stats-grid { grid-template-columns:repeat(2,1fr) !important; gap:28px 16px !important; } }
      `}</style>
    </section>
  )
}