import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTv, FaFilm, FaWifi, FaMicrophone, FaFileAlt, FaChartBar, FaBuilding } from 'react-icons/fa'

const FEATURES = [
  { icon:<FaTv size={30} color="#E8761A"/>,          title:'Interactive Smart Boards',  desc:'HD interactive flat-panel displays in senior classrooms replacing traditional blackboards.' },
  { icon:<FaFilm size={30} color="#E8761A"/>,         title:'Animated 3D Content',        desc:'CBSE-aligned animated video lessons for all subjects making complex topics easy to understand.' },
  { icon:<FaWifi size={30} color="#E8761A"/>,         title:'High-Speed Internet',         desc:'Campus-wide Wi-Fi ensuring seamless streaming and online resource access in all smart classrooms.' },
  { icon:<FaMicrophone size={30} color="#E8761A"/>,   title:'Audio-Visual System',         desc:'Surround sound speakers and microphone system for clear communication in large classrooms.' },
  { icon:<FaFileAlt size={30} color="#E8761A"/>,      title:'Digital Lesson Plans',        desc:'Teachers use digital lesson plans, presentations and e-content aligned with NCERT curriculum.' },
  { icon:<FaChartBar size={30} color="#E8761A"/>,     title:'Real-Time Assessment',        desc:'Digital quizzes and instant feedback tools helping teachers monitor student understanding live.' },
]

export default function SmartClasses({ embedded = false }) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv,.rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {!embedded && (
        <div className="page-banner">
          <div className="pb-inner">
            <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}><FaBuilding size={12}/> Facilities</div>
            <h1 className="pb-title">Smart <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Classrooms</span></h1>
            <p className="pb-sub">Technology-powered learning — interactive boards, 3D content and digital assessments</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/facilities">Facilities</Link><span>›</span>
              <span className="bc-cur">Smart Classes</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          {/* Hero banner */}
          <div style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))',borderRadius:'22px',padding:'28px',marginBottom:'28px',border:'1px solid rgba(245,184,0,.1)'}}>
            <div className="sc-hero" style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'24px',alignItems:'center'}}>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'#fff',marginBottom:'12px'}}>
                  Learning in the <span style={{color:'var(--gd2)'}}>21st Century</span>
                </div>
                <p style={{fontSize:'14px',color:'rgba(255,255,255,.5)',lineHeight:'1.75',marginBottom:'0',maxWidth:'500px'}}>
                  SPV has integrated smart classroom technology across senior classes to make lessons more engaging, interactive and effective. Our teachers are fully trained to deliver digital-first lessons.
                </p>
              </div>
              <div className="sc-stats" style={{display:'flex',flexDirection:'column',gap:'8px',flexShrink:0}}>
                {[['73','Classrooms Total'],['25+','Smart Equipped'],['100%','Senior Classes']].map(([n,l])=>(
                  <div key={l} style={{padding:'10px 18px',borderRadius:'12px',background:'rgba(245,184,0,.08)',border:'1px solid rgba(245,184,0,.15)',textAlign:'center',minWidth:'130px'}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'var(--gd2)'}}>{n}</div>
                    <div style={{fontSize:'10px',color:'rgba(255,255,255,.4)',letterSpacing:'.5px'}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile stats */}
            <div className="sc-stats-mob" style={{display:'none',gap:'8px',flexWrap:'wrap',marginTop:'18px'}}>
              {[['73','Classrooms'],['25+','Smart'],['100%','Senior']].map(([n,l])=>(
                <div key={l} style={{padding:'8px 14px',borderRadius:'10px',background:'rgba(245,184,0,.08)',border:'1px solid rgba(245,184,0,.15)',textAlign:'center'}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'var(--gd2)'}}>{n}</div>
                  <div style={{fontSize:'10px',color:'rgba(255,255,255,.4)'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'14px'}}>
            {FEATURES.map((f,i) => (
              <div key={i} style={{padding:'22px',borderRadius:'16px',background:'var(--card)',border:'1.5px solid var(--brd)'}}>
                <div style={{marginBottom:'12px'}}>{f.icon}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'var(--dark)',marginBottom:'7px'}}>{f.title}</div>
                <div style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.65'}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:640px) {
          .sc-hero { grid-template-columns:1fr !important; }
          .sc-stats { display:none !important; }
          .sc-stats-mob { display:flex !important; }
        }
      `}</style>
    </>
  )
}