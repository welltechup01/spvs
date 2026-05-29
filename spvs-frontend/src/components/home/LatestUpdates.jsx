import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogAPI } from '../../api'
import { FaTrophy, FaMedal, FaTv, FaFlask, FaRunning, FaClipboardList, FaGraduationCap, FaCalendarAlt, FaNewspaper } from 'react-icons/fa'

var FALLBACK = [
  { icon:<FaClipboardList size={22} color="#E8761A"/>, tag:'Admissions',    date:'Mar 2025', title:'Admissions Open 2025-26',       desc:'Enrolling students for Play Group to Class XII. Limited seats available. Apply early to secure admission.' },
  { icon:<FaMedal size={22} color="#E8761A"/>,         tag:'Achievement',   date:'Jan 2025', title:'District Sports Champions',      desc:'SPV wins Gold in Kabaddi, Chess, Volleyball, Shot-put, 100m, 200m, 400m, 800m and Long Jump.' },
  { icon:<FaTv size={22} color="#E8761A"/>,            tag:'National',      date:'Dec 2024', title:'KBC Winner — ₹3,20,000',        desc:'Aarav Raghuvansh of Class V wins ₹3,20,000 on Kaun Banega Crorepati. School felicitated him with cheque.' },
  { icon:<FaTrophy size={22} color="#E8761A"/>,        tag:'Results',       date:'Jun 2024', title:'100% Board Results Again',       desc:'SPV achieves 100% pass rate in CBSE Class X and Class XII board examinations for the academic year.' },
  { icon:<FaFlask size={22} color="#E8761A"/>,         tag:'Infrastructure', date:'Apr 2024', title:'New STEM Lab Inaugurated',      desc:'State-of-the-art STEM & Junior Tinkering Lab opened for students to explore robotics and innovation.' },
  { icon:<FaRunning size={22} color="#E8761A"/>,       tag:'Sports',        date:'Mar 2024', title:'CBSE Cluster Level — Runner Up', desc:'School reaches Runner-Up position in Kabaddi (U-17) at CBSE cluster level games and sports event.' },
]

var CAT_ICONS = {
  Academic:    <FaGraduationCap size={22} color="#E8761A"/>,
  Achievement: <FaTrophy size={22} color="#E8761A"/>,
  Event:       <FaCalendarAlt size={22} color="#E8761A"/>,
  Holiday:     <FaCalendarAlt size={22} color="#E8761A"/>,
  Competition: <FaMedal size={22} color="#E8761A"/>,
  Notice:      <FaClipboardList size={22} color="#E8761A"/>,
  Sports:      <FaRunning size={22} color="#E8761A"/>,
  Admission:   <FaClipboardList size={22} color="#E8761A"/>,
  General:     <FaNewspaper size={22} color="#E8761A"/>,
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN',{month:'short',year:'numeric'})
}

export default function LatestUpdates() {
  var [posts,   setPosts]   = useState([])
  var [loading, setLoading] = useState(true)

  useEffect(function() {
    blogAPI.getAll()
      .then(function(res){ setPosts(res.data||[]); setLoading(false) })
      .catch(function(){ setLoading(false) })
  }, [])

  var display = posts.length > 0 ? posts.slice(0,6) : FALLBACK

  return (
    <section className="sect" style={{background:'var(--bg)'}}>
      <div className="s-cont">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'48px',flexWrap:'wrap',gap:'16px'}}>
          <div className="rv">
            <div className="chip"><span className="chip-dot"></span>Latest News</div>
            <h2 className="sec-title">Updates &amp; <span className="hl">News</span></h2>
            <div className="s-bar" style={{marginBottom:'0'}}></div>
          </div>
          <Link to="/blog" className="btn-out rv" style={{transitionDelay:'.2s'}}>View All →</Link>
        </div>

        {loading ? (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'18px'}}>
            {[0,1,2,3,4,5].map(function(i){
              return (
                <div key={i} className="wcard" style={{padding:'22px 24px',opacity:.5}}>
                  <div style={{height:'14px',background:'rgba(232,118,26,.15)',borderRadius:'7px',marginBottom:'10px',width:'60%'}}/>
                  <div style={{height:'18px',background:'rgba(232,118,26,.1)',borderRadius:'7px',marginBottom:'8px'}}/>
                  <div style={{height:'40px',background:'rgba(232,118,26,.07)',borderRadius:'7px'}}/>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'18px'}}>
            {display.map(function(u, i) {
              var isDB  = !!u._id
              var icon  = isDB ? (CAT_ICONS[u.category] || <FaNewspaper size={22} color="#E8761A"/>) : u.icon
              var tag   = isDB ? u.category : u.tag
              var date  = isDB ? fmtDate(u.createdAt) : u.date
              var title = u.title
              var desc  = isDB ? (u.excerpt||u.content?.slice(0,130)||'') : u.desc

              return (
                <div key={u._id||i} className="wcard" style={{padding:'22px 24px',cursor:'pointer'}}
                  onClick={isDB ? function(){ window.location.hash = '/blog/'+u._id } : undefined}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
                    <span style={{display:'flex',alignItems:'center'}}>{icon}</span>
                    <span style={{fontSize:'11px',fontWeight:'700',color:'var(--or)',background:'rgba(232,118,26,.08)',padding:'3px 10px',borderRadius:'50px',letterSpacing:'1px',textTransform:'uppercase'}}>{tag}</span>
                    <span style={{fontSize:'11px',color:'var(--txt3)',marginLeft:'auto'}}>{date}</span>
                  </div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:'700',color:'var(--dark)',marginBottom:'8px',lineHeight:'1.35'}}>{title}</div>
                  <div style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.65',overflow:'hidden',display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical'}}>{desc}</div>
                  {isDB && <div style={{marginTop:'10px',fontSize:'12px',fontWeight:'700',color:'var(--or)'}}>Read more →</div>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}