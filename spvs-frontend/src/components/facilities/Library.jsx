import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBook, FaNewspaper, FaLaptop, FaVolumeOff, FaBookOpen, FaBullseye, FaClock, FaBuilding } from 'react-icons/fa'

const FEATURES = [
  { icon:<FaBook size={30} color="#E8761A"/>,      title:'Book Collection',       desc:'5,000+ books covering all subjects, NCERT, reference books, encyclopaedias and competitive exam guides.' },
  { icon:<FaNewspaper size={30} color="#E8761A"/>, title:'Newspapers & Journals', desc:'Daily newspapers in Hindi & English plus educational journals and magazines for all age groups.' },
  { icon:<FaLaptop size={30} color="#E8761A"/>,    title:'Digital Section',        desc:'Computers with internet access for online research, e-books and CBSE digital content.' },
  { icon:<FaVolumeOff size={30} color="#E8761A"/>, title:'Reading Hall',           desc:'Spacious, well-lit silent reading hall with comfortable seating for 60+ students at a time.' },
  { icon:<FaBookOpen size={30} color="#E8761A"/>,  title:'Issue & Return',         desc:'Automated book issue/return system. Each student can borrow up to 2 books for 14 days.' },
  { icon:<FaBullseye size={30} color="#E8761A"/>,  title:'Study Material',         desc:'Previous year CBSE board papers, sample papers, notes and study material available for students.' },
]

export default function Library({ embedded = false }) {
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
            <h1 className="pb-title">Our <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Library</span></h1>
            <p className="pb-sub">A world of knowledge — 5,000+ books, digital resources and a peaceful reading environment</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/facilities">Facilities</Link><span>›</span>
              <span className="bc-cur">Library</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>

          {/* Hero card */}
          <div style={{background:'linear-gradient(135deg,rgba(232,118,26,.06),rgba(245,184,0,.04))',border:'1.5px solid rgba(232,118,26,.15)',borderRadius:'22px',padding:'28px',marginBottom:'28px'}}>
            <div className="lib-hero" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'28px',alignItems:'center'}}>
              <div>
                <div className="chip" style={{marginBottom:'14px'}}><span className="chip-dot"></span>School Library</div>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'28px',fontWeight:'700',color:'var(--dark)',marginBottom:'12px',lineHeight:'1.25'}}>
                  A <span style={{color:'var(--or)'}}>Knowledge Hub</span> for Every Learner
                </h2>
                <p style={{fontSize:'14px',color:'var(--txt2)',lineHeight:'1.75',marginBottom:'18px'}}>
                  Our well-stocked library is the intellectual heart of SPV — encouraging reading habits, independent research and a lifelong love for learning in students from Class I to XII.
                </p>
                <div style={{display:'flex',gap:'18px',flexWrap:'wrap'}}>
                  {[['5,000+','Books'],['60+','Seating'],['Daily','Newspapers'],['Digital','Access']].map(([n,l])=>(
                    <div key={l} style={{textAlign:'center'}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'var(--or)'}}>{n}</div>
                      <div style={{fontSize:'11px',color:'var(--txt3)',letterSpacing:'.5px'}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))',borderRadius:'18px',padding:'28px',textAlign:'center',border:'1px solid rgba(245,184,0,.1)'}}>
                <FaBook size={64} color="#F5B800" style={{marginBottom:'14px'}}/>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',color:'var(--gd2)',fontWeight:'700',marginBottom:'6px'}}>Incharge: Mr. Akhilesh Kr. Mishra</div>
                <div style={{fontSize:'12px',color:'rgba(255,255,255,.4)'}}>B.Com., B.Lib</div>
                <div style={{marginTop:'14px',padding:'9px 14px',background:'rgba(232,118,26,.1)',borderRadius:'10px',fontSize:'12px',color:'rgba(255,255,255,.6)',display:'flex',alignItems:'center',justifyContent:'center',gap:'7px'}}>
                  <FaClock size={12} color="rgba(255,255,255,.6)"/> Library Hours: 8:00 AM – 4:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Features grid */}
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

      <style>{`@media (max-width:640px) { .lib-hero { grid-template-columns:1fr !important; } }`}</style>
    </>
  )
}