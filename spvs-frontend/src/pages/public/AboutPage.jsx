import { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import SchoolHistory         from '../../components/about/SchoolHistory'
import VisionMissionFull     from '../../components/about/VisionMissionFull'
import DirectorMessage       from '../../components/about/DirectorMessage'
import PrincipalMessageFull  from '../../components/about/PrincipalMessageFull'
import SchoolValues          from '../../components/about/SchoolValues'
import {
  FaLandmark, FaUserGraduate, FaChalkboardTeacher, FaBus, FaFlask, FaTree,
  FaHome, FaTrophy, FaSchool, FaFileAlt, FaGraduationCap, FaAtom,
  FaCalendarAlt, FaGlobe, FaMapMarkerAlt, FaCheckCircle,
  FaPhone, FaWhatsapp, FaEnvelope, FaClipboardList, FaUsers,
} from 'react-icons/fa'

var SCHOOL_STATS = [
  { icon:<FaLandmark size={18} color="#FFCF40"/>,          value:'1987',  label:'Established' },
  { icon:<FaUserGraduate size={18} color="#FFCF40"/>,      value:'1410',  label:'Students' },
  { icon:<FaChalkboardTeacher size={18} color="#FFCF40"/>, value:'64+',   label:'Faculty' },
  { icon:<FaBus size={18} color="#FFCF40"/>,               value:'22',    label:'Buses' },
  { icon:<FaFlask size={18} color="#FFCF40"/>,             value:'8',     label:'Labs' },
  { icon:<FaTree size={18} color="#FFCF40"/>,              value:'10',    label:'Acres' },
  { icon:<FaHome size={18} color="#FFCF40"/>,              value:'73',    label:'Classrooms' },
  { icon:<FaTrophy size={18} color="#FFCF40"/>,            value:'100%',  label:'Board Results' },
]

var INFO_GRID = [
  { icon:<FaSchool size={20} color="#E8761A"/>,         label:'School Type',  val:'Day & Boarding' },
  { icon:<FaFileAlt size={20} color="#E8761A"/>,        label:'Affiliation',  val:'CBSE — 2130176' },
  { icon:<FaGraduationCap size={20} color="#E8761A"/>,  label:'Curriculum',   val:'NCERT (I–XII)' },
  { icon:<FaAtom size={20} color="#E8761A"/>,           label:'Streams',      val:'Science, Commerce, Arts' },
  { icon:<FaCalendarAlt size={20} color="#E8761A"/>,    label:'School Shift', val:'Morning' },
  { icon:<FaGlobe size={20} color="#E8761A"/>,          label:'Medium',       val:'English & Hindi' },
  { icon:<FaMapMarkerAlt size={20} color="#E8761A"/>,   label:'Location',     val:'Pashupati Nagar, Bahraich' },
  { icon:<FaCheckCircle size={20} color="#E8761A"/>,    label:'Affil. Valid', val:'Upto 2029' },
]

var CTA_CARDS = [
  { icon:<FaPhone size={28} color="#FFCF40"/>,    title:'Call Us',  sub:'Talk to our admission team', val:'+91 9198783830',   href:'tel:+919198783830',         bg:'rgba(232,118,26,.15)', border:'rgba(232,118,26,.3)',  btnTxt:'Call Now'  },
  { icon:<FaWhatsapp size={28} color="#FFCF40"/>, title:'WhatsApp', sub:'Chat with us instantly',     val:'+91 9198783830',   href:'https://wa.me/919198783830', bg:'rgba(34,163,90,.12)',  border:'rgba(34,163,90,.3)',   btnTxt:'Chat Now'  },
  { icon:<FaEnvelope size={28} color="#FFCF40"/>, title:'Email Us', sub:'Send your enquiry',          val:'spvbrh@gmail.com', href:'mailto:spvbrh@gmail.com',   bg:'rgba(245,184,0,.1)',   border:'rgba(245,184,0,.25)', btnTxt:'Email Now' },
]

var PILLS = [
  { icon:<FaLandmark size={11}/>,    text:'Est. 1987' },
  { icon:<FaFileAlt size={11}/>,     text:'CBSE Affiliated' },
  { icon:<FaUserGraduate size={11}/>,text:'1410+ Students' },
  { icon:<FaBus size={11}/>,         text:'22 School Buses' },
  { icon:<FaFlask size={11}/>,       text:'8 Labs' },
  { icon:<FaTrophy size={11}/>,      text:'100% Board Results' },
]

function useReveal() {
  var [vis, setVis] = useState(false)
  var ref = useRef()
  useEffect(function(){
    var obs = new IntersectionObserver(function(e){ if(e[0].isIntersecting){ setVis(true); obs.disconnect() } },{ threshold:0.08 })
    if(ref.current) obs.observe(ref.current)
    return function(){ obs.disconnect() }
  },[])
  return [ref, vis]
}

export default function AboutPage() {
  var location = useLocation()
  var [introRef, introVis] = useReveal()

  useEffect(function(){
    var hash = location.hash
    if(hash){
      setTimeout(function(){
        var el = document.querySelector(hash)
        if(el) el.scrollIntoView({ behavior:'smooth', block:'start' })
      }, 120)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif"}}>

      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#1C0A00 0%,#3D1A00 55%,#1C0A00 100%)',padding:'90px 24px 70px',textAlign:'center',position:'relative',overflow:'hidden',minHeight:'380px',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{position:'absolute',inset:0,zIndex:1,pointerEvents:'none',overflow:'hidden'}}>
          {[0,1,2,3,4,5,6,7,8,9,10,11].map(function(i){
            return <div key={i} style={{position:'absolute',width:(8+(i%4)*6)+'px',height:(8+(i%4)*6)+'px',borderRadius:'50%',background:i%2===0?'rgba(232,118,26,.07)':'rgba(245,184,0,.09)',left:((i*8.3)%100)+'%',top:((i*13.7)%100)+'%',animation:'floatP '+(3+(i%3))+'s ease-in-out '+(i*.4)+'s infinite alternate'}} />
          })}
        </div>
        <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'radial-gradient(circle at 20% 50%, rgba(232,118,26,.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,184,0,.08) 0%, transparent 50%)'}} />
        <div style={{position:'relative',zIndex:2,maxWidth:'800px',margin:'0 auto',width:'100%'}}>
          <div className="chip" style={{background:'rgba(245,184,0,.1)',borderColor:'rgba(245,184,0,.25)',color:'#F5B800',margin:'0 auto 20px'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#F5B800',display:'inline-block',animation:'blink 2s infinite',flexShrink:0}} />About SPV
          </div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,5vw,60px)',fontWeight:'700',color:'#FFFDF8',margin:'0 0 16px',lineHeight:'1.15'}}>
            Shaping Minds,<br/>
            <span style={{background:'linear-gradient(90deg,#E8761A,#F5B800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Building Futures</span>
          </h1>
          <p style={{fontSize:'clamp(13px,2vw,18px)',color:'rgba(255,220,150,.7)',lineHeight:'1.75',marginBottom:'36px',maxWidth:'580px',display:'inline-block'}}>
            A CBSE affiliated co-educational day and boarding school — established in 1987, serving Bahraich with excellence for over 37 years.
          </p>
          <div style={{display:'flex',gap:'10px',flexWrap:'wrap',justifyContent:'center'}}>
            {SCHOOL_STATS.map(function(st){
              return (
                <div key={st.label} style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'14px',padding:'12px 14px',minWidth:'64px',backdropFilter:'blur(8px)',transition:'all .25s',cursor:'default'}}
                  onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.15)';e.currentTarget.style.borderColor='rgba(232,118,26,.3)'}}
                  onMouseLeave={function(e){e.currentTarget.style.background='rgba(255,255,255,.06)';e.currentTarget.style.borderColor='rgba(255,255,255,.1)'}}>
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'4px'}}>{st.icon}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'#FFCF40',lineHeight:1}}>{st.value}</div>
                  <div style={{fontSize:'10px',color:'rgba(255,220,150,.5)',fontWeight:'600',marginTop:'3px'}}>{st.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section ref={introRef} style={{padding:'64px 24px',background:'#FFFDF8',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-60px',right:'-60px',width:'300px',height:'300px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,184,0,.07),transparent 70%)',pointerEvents:'none'}} />
        <div className="ab-intro" style={{maxWidth:'1060px',margin:'0 auto'}}>
          <div style={{opacity:introVis?1:0,transform:introVis?'none':'translateX(-28px)',transition:'all .7s ease'}}>
            <div className="chip"><span className="chip-dot"/>Who We Are</div>
            <h2 className="sec-title">A School Founded on<br/><span className="hl">Vision and Faith</span></h2>
            <div className="s-bar" />
            <p style={{fontSize:'15px',color:'#7A4010',lineHeight:'1.82',marginBottom:'16px'}}>
              Sant Pathik Vidyalaya is a co-educational Day and Boarding Senior Secondary School affiliated with C.B.S.E., New Delhi. The school was established in <strong style={{color:'#E8761A'}}>1987</strong>, founded by the visionary <strong style={{color:'#E8761A'}}>Sant Pathik Ji Maharaj</strong>.
            </p>
            <p style={{fontSize:'15px',color:'#7A4010',lineHeight:'1.82',marginBottom:'16px'}}>
              Its growth and remarkable advancement are propelled under the noble guidance of <strong style={{color:'#E8761A'}}>Sh. Awadhesh Narayan Agarwal</strong> as Manager. What began with 70–80 students now runs with 1410 students and 64+ dedicated faculty.
            </p>
            <p style={{fontSize:'15px',color:'#7A4010',lineHeight:'1.82',marginBottom:'24px'}}>
              The school follows the NCERT curriculum from Class I to XII. At Senior Secondary level, three streams — <strong style={{color:'#E8761A'}}>Science, Commerce and Humanities</strong> — are offered, along with a residential hostel on the 10-acre campus.
            </p>
            <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
              <Link to="/contact" className="btn-or">Enquire Now →</Link>
              <Link to="/about#history" className="btn-out">Our History</Link>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',opacity:introVis?1:0,transform:introVis?'none':'translateX(28px)',transition:'all .7s ease .12s'}}>
            {INFO_GRID.map(function(d,i){
              return (
                <div key={d.label} style={{background:'#FFFFFF',borderRadius:'16px',border:'1.5px solid rgba(232,118,26,.1)',padding:'18px',boxShadow:'0 4px 16px rgba(232,118,26,.05)',transition:'all .25s',opacity:introVis?1:0,transform:introVis?'none':'translateY(12px)',transitionDelay:(.1+i*.06)+'s'}}
                  onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 10px 28px rgba(232,118,26,.12)';e.currentTarget.style.borderColor='rgba(232,118,26,.25)'}}
                  onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.05)';e.currentTarget.style.borderColor='rgba(232,118,26,.1)'}}>
                  <div style={{marginBottom:'6px'}}>{d.icon}</div>
                  <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:'4px'}}>{d.label}</div>
                  <div style={{fontSize:'12px',fontWeight:'700',color:'#1C0A00'}}>{d.val}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SUB-SECTIONS */}
      <div id="vision"><VisionMissionFull /></div>
      <div id="director"><DirectorMessage /></div>
      <div id="principal"><PrincipalMessageFull /></div>
      <div id="values"><SchoolValues /></div>
      <div id="history"><SchoolHistory /></div>

      {/* CTA */}
      <section style={{padding:'80px 24px',background:'linear-gradient(135deg,#1C0A00 0%,#3D1A00 50%,#1C0A00 100%)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
          <div style={{position:'absolute',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,118,26,.12),transparent 70%)',top:'-150px',right:'-150px'}} />
          <div style={{position:'absolute',width:'380px',height:'380px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,184,0,.08),transparent 70%)',bottom:'-100px',left:'-100px'}} />
          <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle, rgba(232,118,26,.06) 1px, transparent 1px)',backgroundSize:'36px 36px'}} />
        </div>
        <div style={{maxWidth:'860px',margin:'0 auto',position:'relative',zIndex:1}}>
          <div style={{textAlign:'center',marginBottom:'28px'}}>
            <div className="chip" style={{background:'rgba(245,184,0,.1)',borderColor:'rgba(245,184,0,.25)',color:'#F5B800',display:'inline-flex',alignItems:'center',gap:'6px'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#F5B800',display:'inline-block',animation:'blink 2s infinite',flexShrink:0}} />Admissions Open 2026-27
            </div>
          </div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(26px,4.5vw,48px)',fontWeight:'700',color:'#FFFDF8',margin:'0 0 16px',lineHeight:'1.2',textAlign:'center'}}>
            Give Your Child the<br/>
            <span style={{background:'linear-gradient(90deg,#E8761A,#F5B800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Best Start in Life</span>
          </h2>
          <p style={{fontSize:'16px',color:'rgba(255,220,150,.65)',lineHeight:'1.8',textAlign:'center',maxWidth:'560px',margin:'0 auto 32px'}}>
            Join the SPV family — where values meet excellence, and every child is empowered to become their best self.
          </p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap',marginBottom:'32px'}}>
            {PILLS.map(function(pill){
              return (
                <div key={pill.text} style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'6px 14px',borderRadius:'30px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',fontSize:'12px',color:'rgba(255,220,150,.75)',fontWeight:'600'}}>
                  {pill.icon} {pill.text}
                </div>
              )
            })}
          </div>
          <div className="ab-cta-cards">
            {CTA_CARDS.map(function(card){
              return (
                <div key={card.title} style={{background:card.bg,border:'1.5px solid '+card.border,borderRadius:'18px',padding:'24px 20px',textAlign:'center',transition:'all .25s'}}
                  onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-4px)'}}
                  onMouseLeave={function(e){e.currentTarget.style.transform='none'}}>
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'10px'}}>{card.icon}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:'700',color:'#FFCF40',marginBottom:'5px'}}>{card.title}</div>
                  <div style={{fontSize:'11.5px',color:'rgba(255,220,150,.5)',marginBottom:'12px'}}>{card.sub}</div>
                  <div style={{fontSize:'12.5px',fontWeight:'700',color:'rgba(255,220,150,.8)',marginBottom:'16px'}}>{card.val}</div>
                  <a href={card.href} style={{display:'inline-block',padding:'8px 22px',borderRadius:'10px',background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#1C0A00',fontWeight:'800',fontSize:'12.5px',textDecoration:'none'}}>{card.btnTxt}</a>
                </div>
              )
            })}
          </div>
          <div style={{textAlign:'center',marginTop:'24px'}}>
            <Link to="/contact" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'16px 40px',borderRadius:'14px',background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#1C0A00',fontWeight:'800',fontSize:'15px',textDecoration:'none',boxShadow:'0 8px 32px rgba(232,118,26,.4)',transition:'all .25s'}}
              onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-3px)'}}
              onMouseLeave={function(e){e.currentTarget.style.transform='none'}}>
              <FaClipboardList size={16}/> Start Admission Enquiry →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes floatP { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(-18px) rotate(8deg)} }
        .ab-intro { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
        .ab-cta-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:0; }
        @media (max-width:768px) {
          .ab-intro { grid-template-columns:1fr !important; gap:24px !important; }
          .ab-cta-cards { grid-template-columns:1fr !important; gap:12px !important; }
        }
      `}</style>
    </div>
  )
}