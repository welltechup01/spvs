import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { alumniAPI } from '../../api'
import { FaGlobe, FaGraduationCap, FaLandmark, FaUserMd, FaStar } from 'react-icons/fa'

var FIELDS = ['All','Medicine','Civil Services','Engineering','Business','Education','Law','Arts & Media','Science & Research','Armed Forces','Other']

var STATS = [
  { n:'5000+', l:'Alumni Worldwide',   icon:<FaGlobe size={20} color="#fff"/>        },
  { n:'37+',   l:'Batches Passed Out', icon:<FaGraduationCap size={20} color="#fff"/> },
  { n:'100+',  l:'In Civil Services',  icon:<FaLandmark size={20} color="#fff"/>      },
  { n:'500+',  l:'In Medicine',        icon:<FaUserMd size={20} color="#fff"/>        },
]

var TESTIMONIALS = [
  { name:'Priya Shukla',   batch:'2003', text:'SPV gave me the discipline and values to crack UPSC. I am forever grateful to my teachers who believed in me.', avatar:'PS', clr:'#6C3FC5' },
  { name:'Rahul Verma',    batch:'2005', text:'The science labs and dedicated faculty at SPV built my passion for engineering. Working at ISRO was a dream SPV helped me achieve.', avatar:'RV', clr:'#22a35a' },
  { name:'Sanjay Agarwal', batch:'2007', text:'Entrepreneurship needs courage. SPV gave me that through co-curricular activities and a never-give-up culture.', avatar:'SA', clr:'#E8761A' },
]

export default function AlumniPage() {
  var [alumni,  setAlumni]  = useState([])
  var [loading, setLoading] = useState(true)
  var [filter,  setFilter]  = useState('All')

  useEffect(function() {
    alumniAPI.getAll()
      .then(function(res){ setAlumni(res.data || []); setLoading(false) })
      .catch(function(){   setLoading(false) })
  }, [])

  var display = filter === 'All'
    ? alumni
    : alumni.filter(function(a){ return a.field === filter })

  return (
    <>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg) } }
        .ap-cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:20px; }
        .ap-testi { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:18px; }
        @media (max-width:480px) { .ap-cards { grid-template-columns:1fr; } .ap-testi { grid-template-columns:1fr; } }
      `}</style>

      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}><FaGraduationCap size={12}/> Alumni</div>
          <h1 className="pb-title">Our <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Alumni</span></h1>
          <p className="pb-sub">5000+ proud alumni — doctors, engineers, IAS officers and entrepreneurs — the living legacy of SPV</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Alumni</span>
          </div>
        </div>
      </div>

      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))',padding:'22px 0'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 20px',display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'16px'}}>
          {STATS.map(function(s){
            return (
              <div key={s.l} style={{textAlign:'center',color:'#fff'}}>
                <div style={{display:'flex',justifyContent:'center',marginBottom:'2px'}}>{s.icon}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',lineHeight:'1'}}>{s.n}</div>
                <div style={{fontSize:'11px',fontWeight:'700',opacity:'.8',letterSpacing:'1px',textTransform:'uppercase',marginTop:'3px'}}>{s.l}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{background:'var(--bg)',padding:'70px 20px'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>

          <div style={{marginBottom:'80px'}}>
            <div style={{textAlign:'center',marginBottom:'36px'}}>
              <div style={{display:'inline-block',fontSize:'11px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--or)',background:'rgba(232,118,26,.1)',padding:'6px 16px',borderRadius:'50px',marginBottom:'12px'}}>Hall of Fame</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'32px',fontWeight:'700',color:'var(--dark)',margin:'0 0 8px'}}>Alumni <span style={{color:'var(--or)',fontStyle:'italic'}}>Success Stories</span></h2>
              <p style={{fontSize:'14px',color:'var(--txt2)',marginBottom:'24px'}}>Our distinguished alumni across various fields</p>
              <div style={{display:'flex',gap:'8px',justifyContent:'center',flexWrap:'wrap'}}>
                {FIELDS.map(function(f){
                  var active = filter === f
                  return (
                    <button key={f} onClick={function(){setFilter(f)}} style={{padding:'8px 18px',borderRadius:'50px',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:'12.5px',fontWeight:'700',transition:'all .2s',background:active?'var(--or)':'var(--bg2)',color:active?'#fff':'var(--txt2)',boxShadow:active?'0 4px 14px rgba(232,118,26,.3)':'none'}}>
                      {f}
                    </button>
                  )
                })}
              </div>
            </div>

            {loading ? (
              <div style={{textAlign:'center',padding:'60px'}}>
                <div style={{width:'40px',height:'40px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 12px'}}/>
                <div style={{color:'var(--txt3)',fontSize:'14px'}}>Loading alumni...</div>
              </div>
            ) : display.length === 0 ? (
              <div style={{textAlign:'center',padding:'60px',color:'var(--txt3)',fontSize:'14px'}}>No alumni found for this field.</div>
            ) : (
              <div className="ap-cards">
                {display.map(function(a){
                  var clr = '#E8761A'
                  return (
                    <div key={a._id}
                      style={{borderRadius:'22px',background:'var(--card)',border:'1.5px solid var(--brd)',overflow:'hidden',transition:'all .3s ease',cursor:'default'}}
                      onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 20px 48px '+clr+'28';e.currentTarget.style.borderColor=clr+'55'}}
                      onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}>
                      <div style={{height:'6px',background:'linear-gradient(90deg,'+clr+','+clr+'88)'}} />
                      <div style={{padding:'24px'}}>
                        <div style={{display:'flex',alignItems:'flex-start',gap:'16px',marginBottom:'16px'}}>
                          {a.image ? (
                            <img src={a.image} alt={a.name} style={{width:'62px',height:'62px',borderRadius:'18px',objectFit:'cover',flexShrink:0,border:'2px solid rgba(232,118,26,.2)'}} />
                          ) : (
                            <div style={{width:'62px',height:'62px',borderRadius:'18px',background:'linear-gradient(135deg,'+clr+','+clr+'bb)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 6px 18px '+clr+'40',gap:'2px'}}>
                              <FaGraduationCap size={24} color="#fff"/>
                              <div style={{fontSize:'9px',fontWeight:'900',color:'rgba(255,255,255,.85)'}}>{a.name.split(' ').map(function(w){return w[0]}).join('').slice(0,2)}</div>
                            </div>
                          )}
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:'700',color:'var(--dark)',marginBottom:'4px',lineHeight:'1.3'}}>{a.name}</div>
                            <div style={{fontSize:'11px',fontWeight:'800',color:clr,background:clr+'12',padding:'3px 10px',borderRadius:'50px',display:'inline-block'}}>{a.field} · {a.batch}</div>
                          </div>
                          {a.featured && <FaStar size={16} color="#F5B800" style={{flexShrink:0}}/>}
                        </div>
                        <div style={{fontSize:'13px',color:'var(--txt2)',fontWeight:'600',marginBottom:'14px',paddingBottom:'14px',borderBottom:'1px solid var(--brd)',lineHeight:'1.5'}}>{a.role}</div>
                        {a.achievement && (
                          <div style={{fontSize:'12.5px',color:'var(--txt2)',lineHeight:'1.65',display:'flex',alignItems:'flex-start',gap:'8px'}}>
                            <FaStar size={14} color="#F5B800" style={{flexShrink:0,marginTop:'2px'}}/>
                            {a.achievement}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div style={{marginBottom:'80px'}}>
            <div style={{textAlign:'center',marginBottom:'36px'}}>
              <div style={{display:'inline-block',fontSize:'11px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--or)',background:'rgba(232,118,26,.1)',padding:'6px 16px',borderRadius:'50px',marginBottom:'12px'}}>Alumni Speak</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'32px',fontWeight:'700',color:'var(--dark)',margin:0}}>Words from Our <span style={{color:'var(--or)',fontStyle:'italic'}}>Alumni</span></h2>
            </div>
            <div className="ap-testi">
              {TESTIMONIALS.map(function(t){
                return (
                  <div key={t.name}
                    style={{padding:'28px',borderRadius:'20px',background:'var(--card)',border:'1.5px solid var(--brd)',transition:'all .3s',display:'flex',flexDirection:'column',gap:'14px'}}
                    onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 14px 36px '+t.clr+'22';e.currentTarget.style.borderColor=t.clr+'44'}}
                    onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}>
                    <div style={{fontSize:'40px',lineHeight:'1',color:t.clr,opacity:'.4',fontFamily:'Georgia,serif',marginBottom:'-6px'}}>"</div>
                    <div style={{fontSize:'13.5px',color:'var(--txt2)',lineHeight:'1.7',fontStyle:'italic',flex:1}}>{t.text}</div>
                    <div style={{display:'flex',alignItems:'center',gap:'12px',paddingTop:'14px',borderTop:'1px solid var(--brd)'}}>
                      <div style={{width:'44px',height:'44px',borderRadius:'12px',background:'linear-gradient(135deg,'+t.clr+','+t.clr+'bb)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'900',color:'#fff',flexShrink:0}}>{t.avatar}</div>
                      <div>
                        <div style={{fontWeight:'700',fontSize:'14px',color:'var(--dark)'}}>{t.name}</div>
                        <div style={{fontSize:'11.5px',color:'var(--txt3)'}}>Batch {t.batch}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}