import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogAPI } from '../../api'
import { FaCalendarAlt, FaEdit, FaGraduationCap, FaTrophy, FaCalendar, FaClipboardList, FaFutbol, FaMedal, FaMapPin, FaNewspaper, FaSchool, FaPhone } from 'react-icons/fa'

var CAT_CLR = {
  Academic:'#6C3FC5', Achievement:'#E8761A', Event:'#22a35a',
  Notice:'#F5B800',   Sports:'#E8761A',      Admission:'#6C3FC5',
  Holiday:'#22a35a',  Competition:'#E94F37', General:'#B87832',
}

var CAT_ICONS = {
  Academic:    <FaGraduationCap/>,
  Achievement: <FaTrophy/>,
  Event:       <FaCalendar/>,
  Holiday:     <FaCalendarAlt/>,
  Competition: <FaMedal/>,
  Notice:      <FaMapPin/>,
  Sports:      <FaFutbol/>,
  Admission:   <FaClipboardList/>,
  General:     <FaNewspaper/>,
}

function catIcon(c) { return CAT_ICONS[c] || <FaNewspaper/> }

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })
}

export default function BlogDetail() {
  var { slug }   = useParams()
  var [post,    setPost]    = useState(null)
  var [recent,  setRecent]  = useState([])
  var [loading, setLoading] = useState(true)
  var [error,   setError]   = useState(null)

  useEffect(function() {
    setLoading(true); setError(null)
    Promise.all([blogAPI.getById(slug), blogAPI.getAll()])
      .then(function(results) {
        setPost(results[0].data)
        setRecent((results[1].data||[]).filter(function(p){ return p._id !== slug }).slice(0,4))
        setLoading(false)
      })
      .catch(function(err){ setError(err.message); setLoading(false) })
  }, [slug])

  if (loading) {
    return (
      <div style={{background:'var(--bg)',minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'60px 20px',flexDirection:'column',gap:'14px'}}>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <div style={{width:'44px',height:'44px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
        <div style={{color:'var(--txt3)',fontSize:'14px',fontWeight:600}}>Loading post...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div style={{background:'var(--bg)',minHeight:'60vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 20px',textAlign:'center'}}>
        <FaNewspaper size={64} color="var(--txt3)" style={{marginBottom:'16px'}}/>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'var(--dark)',marginBottom:'10px'}}>Post Not Found</div>
        <div style={{fontSize:'14px',color:'var(--txt2)',marginBottom:'24px'}}>{error || 'The blog post you are looking for does not exist.'}</div>
        <Link to="/blog" style={{padding:'11px 28px',borderRadius:'50px',background:'var(--or)',color:'#fff',textDecoration:'none',fontFamily:"'DM Sans',sans-serif",fontSize:'14px',fontWeight:'700'}}>← Back to Blog</Link>
      </div>
    )
  }

  var clr  = CAT_CLR[post.category] || '#E8761A'
  var icon = catIcon(post.category)

  return (
    <>
      <style>{`
        .bd-layout  { display: grid; grid-template-columns: 1fr 280px; gap: 28px; align-items: start; }
        .bd-sidebar { position: sticky; top: 90px; }
        @media (max-width: 900px) { .bd-layout { grid-template-columns: 1fr !important; } .bd-sidebar { position: static !important; } }
      `}</style>

      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}>{icon} {post.category}</div>
          <h1 className="pb-title" style={{maxWidth:'800px',margin:'0 auto 12px'}}>{post.title}</h1>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',fontSize:'13px',color:'rgba(255,255,255,.7)',marginBottom:'14px'}}>
            <span style={{display:'inline-flex',alignItems:'center',gap:'5px'}}><FaCalendarAlt size={11}/> {formatDate(post.createdAt)}</span>
            <span style={{display:'inline-flex',alignItems:'center',gap:'5px'}}><FaEdit size={11}/> {post.author || 'SPV Admin'}</span>
            <span style={{background:'rgba(255,255,255,.15)',padding:'2px 12px',borderRadius:'50px',color:'#fff',fontWeight:'700'}}>{post.category}</span>
          </div>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/blog">Blog</Link><span>›</span>
            <span className="bc-cur">{post.title.slice(0,30)}...</span>
          </div>
        </div>
      </div>

      <div style={{background:'var(--bg)',padding:'40px 16px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <div className="bd-layout">
            <div>
              {post.image ? (
                <div style={{height:'300px',borderRadius:'18px',overflow:'hidden',marginBottom:'24px',border:'1.5px solid '+clr+'20',position:'relative'}}>
                  <img src={post.image} alt={post.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 55%,rgba(0,0,0,.45) 100%)'}} />
                  <div style={{position:'absolute',bottom:'16px',left:'18px'}}>
                    <span style={{display:'inline-flex',alignItems:'center',gap:'6px',background:clr,color:'#fff',fontSize:'11px',fontWeight:'800',padding:'4px 12px',borderRadius:'50px'}}>{icon} {post.category}</span>
                  </div>
                </div>
              ) : (
                <div style={{height:'120px',borderRadius:'18px',background:'linear-gradient(135deg,'+clr+'18,'+clr+'06)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'24px',border:'1.5px solid '+clr+'20',color:clr+'80',fontSize:'48px'}}>
                  {icon}
                </div>
              )}

              <div style={{background:'var(--card)',borderRadius:'18px',padding:'clamp(20px,4vw,36px)',border:'1.5px solid var(--brd)',boxShadow:'0 4px 24px rgba(0,0,0,.04)'}}>
                {post.excerpt && (
                  <p style={{fontSize:'16px',color:'var(--txt2)',lineHeight:'1.75',marginBottom:'24px',paddingBottom:'20px',borderBottom:'1.5px solid var(--brd)',fontStyle:'italic'}}>
                    {post.excerpt}
                  </p>
                )}
                <div style={{fontSize:'15px',color:'var(--txt)',lineHeight:'1.85',whiteSpace:'pre-wrap'}}>{post.content}</div>
                <div style={{marginTop:'32px',paddingTop:'20px',borderTop:'1.5px solid var(--brd)',display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
                  <span style={{display:'inline-flex',alignItems:'center',gap:'6px',background:clr+'18',color:clr,fontSize:'12px',fontWeight:'800',padding:'5px 14px',borderRadius:'50px',border:'1.5px solid '+clr+'30'}}>{icon} {post.category}</span>
                  <span style={{fontSize:'12px',color:'var(--txt3)',display:'inline-flex',alignItems:'center',gap:'4px'}}><FaCalendarAlt size={10}/> {formatDate(post.createdAt)}</span>
                  <span style={{fontSize:'12px',color:'var(--txt3)',display:'inline-flex',alignItems:'center',gap:'4px'}}><FaEdit size={10}/> {post.author || 'SPV Admin'}</span>
                </div>
              </div>

              <div style={{marginTop:'24px'}}>
                <Link to="/blog" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'11px 24px',borderRadius:'50px',background:'var(--card)',border:'1.5px solid var(--brd)',color:'var(--txt2)',textDecoration:'none',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',transition:'all .2s'}}
                  onMouseEnter={function(e){e.currentTarget.style.borderColor='var(--or)';e.currentTarget.style.color='var(--or)'}}
                  onMouseLeave={function(e){e.currentTarget.style.borderColor='var(--brd)';e.currentTarget.style.color='var(--txt2)'}}>
                  ← Back to Blog
                </Link>
              </div>
            </div>

            <div className="bd-sidebar">
              {recent.length > 0 && (
                <div style={{background:'var(--card)',borderRadius:'16px',padding:'20px',border:'1.5px solid var(--brd)',marginBottom:'20px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'var(--dark)',marginBottom:'16px',paddingBottom:'10px',borderBottom:'1.5px solid var(--brd)'}}>
                    <FaNewspaper size={14} color="#E8761A"/> Recent Posts
                  </div>
                  {recent.map(function(r) {
                    var rc = CAT_CLR[r.category] || '#E8761A'
                    return (
                      <Link key={r._id} to={'/blog/' + r._id}
                        style={{display:'flex',gap:'10px',marginBottom:'14px',textDecoration:'none',alignItems:'flex-start'}}
                        onMouseEnter={function(e){e.currentTarget.style.opacity='.8'}}
                        onMouseLeave={function(e){e.currentTarget.style.opacity='1'}}>
                        {r.image ? (
                          <img src={r.image} alt={r.title} style={{width:'52px',height:'52px',borderRadius:'10px',objectFit:'cover',flexShrink:0,border:'1.5px solid '+rc+'20'}} />
                        ) : (
                          <div style={{width:'52px',height:'52px',borderRadius:'10px',background:rc+'18',display:'flex',alignItems:'center',justifyContent:'center',color:rc,flexShrink:0}}>
                            {catIcon(r.category)}
                          </div>
                        )}
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:'12.5px',fontWeight:'700',color:'var(--dark)',lineHeight:'1.4',marginBottom:'4px',overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{r.title}</div>
                          <div style={{fontSize:'11px',color:'var(--txt3)',display:'inline-flex',alignItems:'center',gap:'3px'}}><FaCalendarAlt size={9}/> {formatDate(r.createdAt)}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              <div style={{background:'linear-gradient(135deg,var(--or),var(--gd))',borderRadius:'16px',padding:'20px',color:'#fff',textAlign:'center'}}>
                <FaSchool size={28} color="#fff" style={{marginBottom:'8px'}}/>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',marginBottom:'6px'}}>Have a Question?</div>
                <div style={{fontSize:'12px',opacity:'.85',marginBottom:'16px',lineHeight:'1.6'}}>Reach out to us for admissions, events or any enquiry.</div>
                <a href="tel:+919198783830" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'7px',padding:'10px',borderRadius:'10px',background:'rgba(255,255,255,.2)',color:'#fff',textDecoration:'none',fontSize:'13px',fontWeight:'800',border:'1.5px solid rgba(255,255,255,.3)'}}>
                  <FaPhone size={13}/> +91 9198783830
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}