import { useState, useEffect, useRef } from 'react'
import { announcementAPI } from '../../api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useSettings from '../../hooks/useSettings'
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaInstagram, FaFacebook, FaYoutube,
  FaChevronDown, FaSchool,
  FaLandmark, FaBullseye, FaUserTie, FaChalkboardTeacher, FaUsers, FaStar,
  FaHome, FaFlask, FaBook, FaDesktop, FaBus, FaFutbol,
  FaImages, FaBriefcase, FaNewspaper, FaTheaterMasks,
  FaFileAlt, FaGraduationCap, FaPhone as FaPhoneAlt, FaClipboardList,
  FaTrophy, FaAtom, FaGlobe, FaMoneyBillWave,
  FaBell, FaCheckCircle, FaBookOpen, FaSchool as FaSchool2,
} from 'react-icons/fa'

function SchoolLogo({ size = 58 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" fill="#E8761A"/>
      <circle cx="60" cy="60" r="50" fill="#F5B800"/>
      <circle cx="60" cy="60" r="46" fill="#FFD94A"/>
      <g fill="#1a6b3a">
        <polygon points="60,6 64,20 56,20"/>
        <polygon points="60,100 64,114 56,114"/>
        <polygon points="6,60 20,64 20,56"/>
        <polygon points="100,60 114,64 114,56"/>
        <polygon points="15,15 27,27 20,29"/>
        <polygon points="105,15 93,27 100,29"/>
        <polygon points="15,105 27,93 20,91"/>
        <polygon points="105,105 93,93 100,91"/>
      </g>
      <circle cx="60" cy="60" r="30" fill="white"/>
      <text x="60" y="76" textAnchor="middle" fontSize="38" fill="#DC3522" fontFamily="serif" fontWeight="bold">ॐ</text>
      <path id="tc-nav" d="M60,60 m-46,0 a46,46 0 1,1 92,0" fill="none"/>
      <text fontSize="7" fill="white" fontWeight="bold" fontFamily="sans-serif" letterSpacing=".7">
        <textPath href="#tc-nav">SANT PATHIK VIDYALAYA  PASHUPATI NAGAR</textPath>
      </text>
      <rect x="8" y="95" width="104" height="16" rx="5" fill="#4A2C8A"/>
      <text x="60" y="106.5" textAnchor="middle" fontSize="6.8" fill="white" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">WORK IS WORSHIP</text>
    </svg>
  )
}

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/sant.pathikvidyalaya?igsh=MXRhMGY5ZzA2OGlvZg==',
  facebook:  'https://www.facebook.com/61584920274763/',
  youtube:   'https://youtube.com/@santpathikvidyalayabahraic9459?si=NccPMOyCjrsklcoc',
}

/* ── Hash-aware navigation helper ── */
function useHashNav() {
  const navigate  = useNavigate()
  const location  = useLocation()

  return function goTo(to) {
    var parts   = to.split('#')
    var path    = parts[0]
    var hash    = parts[1] ? '#' + parts[1] : ''

    if (!hash) {
      navigate(to)
      return
    }

    if (location.pathname === path || (path === '' && hash)) {
      // Already on the page — just scroll
      var el = document.getElementById(parts[1])
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Navigate first, then scroll after page loads
      navigate(path + hash)
      setTimeout(function() {
        var el2 = document.getElementById(parts[1])
        if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 350)
    }
  }
}

const ABOUT_DROPDOWN = [
  { to:'/about#history',    icon:<FaLandmark size={16} color="#000"/>,         label:'School History',      desc:'Our journey since 1987' },
  { to:'/about#vision',     icon:<FaBullseye size={16} color="#000"/>,         label:'Vision & Mission',    desc:'Our guiding principles' },
  { to:'/about#director',   icon:<FaUserTie size={16} color="#000"/>,          label:"Director's Message",  desc:'Message from the Director' },
  { to:'/about#principal',  icon:<FaChalkboardTeacher size={16} color="#000"/>,label:"Principal's Message", desc:'Message from the Principal' },
  { to:'/academics/faculty',icon:<FaUsers size={16} color="#000"/>,            label:'Faculty & Staff',     desc:'64+ expert educators' },
  { to:'/why-choose-us',    icon:<FaStar size={16} color="#000"/>,             label:'Why Choose Us',       desc:'What makes SPVS special' },
]

const FACILITIES_DROPDOWN = [
  { to:'/facilities#hostel',     icon:<FaHome size={16} color="#000"/>,    label:'Hostel',           desc:'Safe residential facility', highlight:true },
  { to:'/facilities#labs',       icon:<FaFlask size={16} color="#000"/>,   label:'Science Labs',     desc:'Physics · Chemistry · Bio' },
  { to:'/facilities#library',    icon:<FaBook size={16} color="#000"/>,    label:'Library',          desc:'10,000+ books & e-resources' },
  { to:'/facilities#smartclass', icon:<FaDesktop size={16} color="#000"/>, label:'Smart Classrooms', desc:'Digital learning boards' },
  { to:'/facilities#transport',  icon:<FaBus size={16} color="#000"/>,     label:'Transport',        desc:'GPS-tracked buses all routes' },
  { to:'/facilities#sports',     icon:<FaFutbol size={16} color="#000"/>,  label:'Sports Ground',    desc:'Cricket · Football · Athletics' },
]

/* ── DropPanel — uses goTo for hash scrolling ── */
function DropPanel({ items, onClose }) {
  var goTo = useHashNav()

  function handleClick(e, to) {
    e.preventDefault()
    onClose()
    goTo(to)
  }

  return (
    <div style={{position:'absolute',top:'calc(100% + 14px)',left:'50%',transform:'translateX(-50%)',background:'#ffffff',border:'1.5px solid rgba(232,118,26,.15)',borderRadius:'20px',boxShadow:'0 28px 70px rgba(232,118,26,.18),0 6px 24px rgba(0,0,0,.07)',padding:'10px',minWidth:'290px',zIndex:500,animation:'dropIn 0.28s cubic-bezier(.34,1.56,.64,1) both'}}>
      <div style={{position:'absolute',top:'-8px',left:'50%',transform:'translateX(-50%) rotate(45deg)',width:'14px',height:'14px',background:'#fff',border:'1.5px solid rgba(232,118,26,.15)',borderBottom:'none',borderRight:'none'}}/>
      {items.map(function(item) {
        var { to, icon, label, desc, highlight } = item
        return (
          <a key={to} href={to}
            onClick={function(e){ handleClick(e, to) }}
            style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 14px',borderRadius:'13px',marginBottom:'3px',textDecoration:'none',background:highlight?'linear-gradient(135deg,#FFF3E0,#FFF8DC)':'transparent',border:`1.5px solid ${highlight?'rgba(232,118,26,.28)':'transparent'}`,transition:'all 0.2s'}}
            onMouseEnter={function(e){e.currentTarget.style.background=highlight?'linear-gradient(135deg,#FFE4BC,#FFF3C0)':'rgba(232,118,26,.06)';e.currentTarget.style.transform='translateX(4px)'}}
            onMouseLeave={function(e){e.currentTarget.style.background=highlight?'linear-gradient(135deg,#FFF3E0,#FFF8DC)':'transparent';e.currentTarget.style.transform=''}}
          >
            <span style={{width:'38px',height:'38px',borderRadius:'11px',flexShrink:0,background:highlight?'linear-gradient(135deg,#E8761A,#F5B800)':'linear-gradient(135deg,#FFF3E0,#FEF0D4)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:highlight?'0 4px 14px rgba(232,118,26,.4)':'none'}}>
              {highlight ? <span style={{color:'#fff'}}>{icon}</span> : icon}
            </span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'13.5px',fontWeight:highlight?700:600,color:highlight?'#C45F0A':'#2C1500',display:'flex',alignItems:'center',gap:'7px'}}>
                {label}
              </div>
              <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'11.5px',fontWeight:400,color:'#B87832',marginTop:'2px'}}>{desc}</div>
            </div>
          </a>
        )
      })}
    </div>
  )
}

function NavItem({ to, label, dropdown, isActive, onClose }) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef()
  const enter = () => { clearTimeout(timerRef.current); setOpen(true) }
  const leave = () => { timerRef.current = setTimeout(() => setOpen(false), 160) }
  useEffect(() => () => clearTimeout(timerRef.current), [])
  const baseStyle = {fontFamily:"'Poppins',sans-serif",fontSize:'13.5px',fontWeight:500,color:isActive?'#E8761A':'#7A4010',padding:'7px 13px',borderRadius:'10px',textDecoration:'none',transition:'all 0.2s',display:'inline-flex',alignItems:'center',gap:'4px',background:'transparent',border:'none',cursor:'pointer',position:'relative'}
  const activeBar = isActive ? <span style={{position:'absolute',bottom:'2px',left:'13px',right:'13px',height:'2.5px',borderRadius:'2px',background:'linear-gradient(90deg,#E8761A,#F5B800)'}}/> : null
  if (!dropdown) {
    return (
      <Link to={to} style={baseStyle}
        onMouseEnter={function(e){e.currentTarget.style.color='#E8761A';e.currentTarget.style.background='rgba(232,118,26,.07)'}}
        onMouseLeave={function(e){e.currentTarget.style.color=isActive?'#E8761A':'#7A4010';e.currentTarget.style.background='transparent'}}
      >{label}{activeBar}</Link>
    )
  }
  return (
    <div style={{position:'relative'}} onMouseEnter={enter} onMouseLeave={leave}>
      <button style={{...baseStyle,color:open||isActive?'#E8761A':'#7A4010',background:open?'rgba(232,118,26,.07)':'transparent'}}>
        {label}{activeBar}
        <FaChevronDown size={9} style={{transition:'transform 0.25s',transform:open?'rotate(180deg)':''}}/>
      </button>
      {open && <DropPanel items={dropdown} onClose={function(){setOpen(false);if(onClose)onClose()}}/>}
    </div>
  )
}

/* ── Mobile nav ── */
const MOB_NAV = [
  { to:'/',             icon:<FaHome size={17}/>,          label:'Home' },
  { icon:<FaLandmark size={17}/>, label:'About Us', to:'/about', sub:[
    { to:'/about#history',    icon:<FaBook size={15}/>,              label:'School History' },
    { to:'/about#vision',     icon:<FaBullseye size={15}/>,          label:'Vision & Mission' },
    { to:'/about#director',   icon:<FaUserTie size={15}/>,           label:"Director's Message" },
    { to:'/about#principal',  icon:<FaChalkboardTeacher size={15}/>, label:"Principal's Message" },
    { to:'/academics/faculty',icon:<FaUsers size={15}/>,             label:'Faculty & Staff' },
    { to:'/why-choose-us',    icon:<FaStar size={15}/>,              label:'Why Choose Us' },
  ]},
  { icon:<FaBook size={17}/>, label:'Academics', to:'/academics', sub:[
    { to:'/academics#science',    icon:<FaAtom size={15}/>,         label:'Science Stream' },
    { to:'/academics#commerce',   icon:<FaBriefcase size={15}/>,    label:'Commerce Stream' },
    { to:'/academics#humanities', icon:<FaGlobe size={15}/>,        label:'Humanities Stream' },
    { to:'/academics/fees',       icon:<FaMoneyBillWave size={15}/>,label:'Fee Structure' },
    { to:'/academics/faculty',    icon:<FaUsers size={15}/>,        label:'Faculty & Staff' },
  ]},
  { icon:<FaSchool size={17}/>, label:'Facilities', to:'/facilities', sub:[
    { to:'/facilities#hostel',     icon:<FaHome size={15}/>,    label:'Hostel' },
    { to:'/facilities#labs',       icon:<FaFlask size={15}/>,   label:'Science Labs' },
    { to:'/facilities#library',    icon:<FaBook size={15}/>,    label:'Library' },
    { to:'/facilities#smartclass', icon:<FaDesktop size={15}/>, label:'Smart Classrooms' },
    { to:'/facilities#transport',  icon:<FaBus size={15}/>,     label:'Transport' },
    { to:'/facilities#sports',     icon:<FaFutbol size={15}/>,  label:'Sports Ground' },
  ]},
  { to:'/gallery',              icon:<FaImages size={17}/>,       label:'Gallery' },
  { to:'/campus-life?tab=jobs', icon:<FaBriefcase size={17}/>,    label:'Jobs & Careers' },
  { to:'/blog',                 icon:<FaNewspaper size={17}/>,    label:'Blog & News' },
  { to:'/campus-life',          icon:<FaTheaterMasks size={17}/>, label:'Campus Life' },
  { to:'/downloads',            icon:<FaFileAlt size={17}/>,      label:'Certificates' },
  { to:'/alumni',               icon:<FaGraduationCap size={17}/>,label:'Alumni' },
  { to:'/contact',              icon:<FaPhone size={17}/>,        label:'Contact Us' },
  { to:'/mandatory-disclosure', icon:<FaClipboardList size={17}/>,label:'Mandatory Disclosure' },
]

/* ── MobNavRow — also uses goTo for hash links ── */
function MobNavRow({ item, isActive, onClose }) {
  var [open, setOpen] = useState(false)
  var hasSub = item.sub && item.sub.length > 0
  var goTo   = useHashNav()

  function handleSubClick(e, to) {
    e.preventDefault()
    onClose()
    goTo(to)
  }

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',borderRadius:'12px',marginBottom:'3px',overflow:'hidden',background:isActive(item.to)?'rgba(232,118,26,.08)':'transparent',transition:'background .15s'}}>
        <Link to={item.to} onClick={onClose} style={{flex:1,display:'flex',alignItems:'center',gap:'12px',padding:'11px 14px',textDecoration:'none',fontFamily:"'Poppins',sans-serif",fontSize:'15px',fontWeight:600,color:isActive(item.to)?'#E8761A':'#2C1500'}}>
          <span style={{width:'36px',height:'36px',borderRadius:'10px',background:isActive(item.to)?'rgba(232,118,26,.15)':'rgba(232,118,26,.07)',display:'flex',alignItems:'center',justifyContent:'center',color:isActive(item.to)?'#E8761A':'#B87832',flexShrink:0}}>
            {item.icon}
          </span>
          {item.label}
          {isActive(item.to) && <span style={{marginLeft:'auto',width:'6px',height:'6px',borderRadius:'50%',background:'#E8761A',flexShrink:0}} />}
        </Link>
        {hasSub && (
          <button onClick={function(){setOpen(function(o){return !o})}} style={{width:'44px',height:'100%',minHeight:'48px',border:'none',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,borderLeft:'1px solid rgba(232,118,26,.1)',transition:'background .15s'}}
            onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.06)'}}
            onMouseLeave={function(e){e.currentTarget.style.background='transparent'}}>
            <span style={{fontSize:'20px',fontWeight:'300',color:open?'#E8761A':'#B87832',lineHeight:1,transition:'transform .25s, color .2s',display:'block',transform:open?'rotate(45deg)':'rotate(0deg)'}}>+</span>
          </button>
        )}
      </div>
      {hasSub && open && (
        <div style={{marginLeft:'16px',marginBottom:'4px',borderLeft:'2px solid rgba(232,118,26,.18)',paddingLeft:'12px'}}>
          {item.sub.map(function(s){
            return (
              <a key={s.to} href={s.to}
                onClick={function(e){ handleSubClick(e, s.to) }}
                style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'10px',marginBottom:'2px',textDecoration:'none',fontFamily:"'Poppins',sans-serif",fontSize:'13.5px',fontWeight:500,color:isActive(s.to)?'#E8761A':'#4A2C00',background:isActive(s.to)?'rgba(232,118,26,.08)':'transparent',transition:'all .15s'}}
                onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.06)';e.currentTarget.style.paddingLeft='16px'}}
                onMouseLeave={function(e){e.currentTarget.style.background=isActive(s.to)?'rgba(232,118,26,.08)':'transparent';e.currentTarget.style.paddingLeft='12px'}}>
                <span style={{color:'#E8761A',display:'flex',alignItems:'center'}}>{s.icon}</span>
                {s.label}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled,          setScrolled]          = useState(false)
  const [mobileOpen,        setMobile]             = useState(false)
  const [liveAnnouncements, setLiveAnnouncements] = useState([])
  const location = useLocation()
  const { settings } = useSettings()

  const phone    = settings.contact?.phone1  || '9198783830'
  const email    = settings.contact?.email   || 'spvbrh@gmail.com'
  const students = settings.school?.students || '1410+'
  const buses    = settings.school?.buses    || '22'
  const igLink   = settings.contact?.instagram || SOCIAL_LINKS.instagram
  const fbLink   = settings.contact?.facebook  || SOCIAL_LINKS.facebook
  const ytLink   = settings.contact?.youtube   || SOCIAL_LINKS.youtube

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobile(false) }, [location])

  // ── Scroll to hash after navigation ──
  useEffect(() => {
    if (location.hash) {
      var id = location.hash.replace('#', '')
      setTimeout(function() {
        var el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    announcementAPI.getAll()
      .then(function(res){ if((res.data||[]).length > 0) setLiveAnnouncements(res.data.map(function(a){ return a.title })) })
      .catch(function(){})
  }, [])

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to.split('#')[0].split('?')[0])

  const NAV = [
    { to:'/',           label:'Home' },
    { to:'/about',      label:'About Us',   dropdown:ABOUT_DROPDOWN },
    { to:'/academics',  label:'Academics' },
    { to:'/blog',       label:'Blogs' },
    { to:'/facilities', label:'Facilities', dropdown:FACILITIES_DROPDOWN },
    { to:'/downloads',  label:'Certificates' },
    { to:'/contact',    label:'Contact Us' },
  ]

  const fallback = [
    'Admissions Open — Apply Now!',
    '100% Board Results — Science, Commerce & Humanities',
    'CBSE Affiliated · Est. ' + (settings.school?.established||'1987') + ' · Bahraich UP',
    'Transport Available on All Routes · ' + buses + ' Buses',
    'Enquire: +91 ' + phone + ' · ' + email,
    'Boys Hostel Available · Limited Seats',
    students + ' Students · ' + (settings.school?.classrooms||'73') + ' Classrooms · ' + (settings.school?.labs||'8') + ' Labs',
  ]
  const marqueeSource = liveAnnouncements.length > 0 ? liveAnnouncements : fallback
  const marqueeItems  = [...marqueeSource, ...marqueeSource]

  return (
    <>
      {/* ── TOPBAR ── */}
      <div style={{background:'linear-gradient(90deg,#1C0A00,#3D1A00)',position:'relative',zIndex:100}}>

        {/* Desktop topbar */}
        <div className="tb-inner tb-desktop">
          <div className="tb-contacts">
            <span className="tb-c"><FaPhone size={11} color="#FFCF40"/> <span style={{color:'#FFCF40'}}>+91 {phone}</span></span>
            <span className="tb-c"><FaEnvelope size={11} color="#FFCF40"/> <span style={{color:'#FFCF40'}}>{email}</span></span>
            <span className="tb-c tb-addr"><FaMapMarkerAlt size={11} color="#FFCF40"/> <span style={{color:'#FFCF40'}}>{settings.school?.address || 'Pashupati Nagar, Bahraich, 271802'}</span></span>
          </div>
          <div className="tb-marquee">
            <div className="tb-mq-track">
              {marqueeItems.map(function(t,i){ return (
                <span key={i} style={{color:'#FFCF40',margin:'0 32px',fontSize:'12px',fontWeight:600,fontFamily:"'Poppins',sans-serif",whiteSpace:'nowrap'}}>{t}</span>
              )})}
            </div>
          </div>
          <div className="tb-social">
            <a href={igLink} target="_blank" rel="noopener noreferrer" className="tb-soc-a tb-soc-ig" aria-label="Instagram"><FaInstagram size={13}/></a>
            <a href={fbLink} target="_blank" rel="noopener noreferrer" className="tb-soc-a tb-soc-fb" aria-label="Facebook"><FaFacebook size={13}/></a>
            <a href={ytLink} target="_blank" rel="noopener noreferrer" className="tb-soc-a tb-soc-yt" aria-label="YouTube"><FaYoutube size={13}/></a>
          </div>
        </div>

        {/* Mobile topbar */}
        <div className="tb-mobile">
          <div className="tb-mob-social">
            <a href={igLink} target="_blank" rel="noopener noreferrer" className="tb-mob-soc-btn tb-mob-ig" aria-label="Instagram"><FaInstagram size={13}/></a>
            <a href={fbLink} target="_blank" rel="noopener noreferrer" className="tb-mob-soc-btn tb-mob-fb" aria-label="Facebook"><FaFacebook size={13}/></a>
            <a href={ytLink} target="_blank" rel="noopener noreferrer" className="tb-mob-soc-btn tb-mob-yt" aria-label="YouTube"><FaYoutube size={13}/></a>
          </div>
          <div className="tb-mob-divider"/>
          <div className="tb-mob-mq-wrap">
            <div className="tb-mob-mq-track">
              {marqueeItems.map(function(t,i){ return (
                <span key={i} style={{color:'#FFCF40',margin:'0 18px',fontSize:'11px',fontWeight:600,fontFamily:"'Poppins',sans-serif",whiteSpace:'nowrap'}}>{t}</span>
              )})}
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY HEADER ── */}
      <header style={{position:'sticky',top:0,zIndex:200,background:'rgba(255,253,248,.97)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderBottom:'1px solid rgba(232,118,26,.13)',boxShadow:scrolled?'0 4px 40px rgba(232,118,26,.18)':'0 2px 16px rgba(232,118,26,.06)',transition:'all .3s'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 20px',display:'flex',alignItems:'center',gap:'16px',height:'76px'}}>
          <Link to="/" style={{display:'flex',alignItems:'center',gap:'13px',flexShrink:0,textDecoration:'none'}}>
            <div style={{width:'62px',height:'62px',borderRadius:'50%',overflow:'hidden',border:'2.5px solid rgba(245,184,0,.4)',boxShadow:'0 4px 18px rgba(245,184,0,.22)',background:'#FFF8DC',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all .5s cubic-bezier(.34,1.56,.64,1)'}}
              onMouseEnter={function(e){e.currentTarget.style.transform='rotate(8deg) scale(1.06)';e.currentTarget.style.borderColor='#F5B800'}}
              onMouseLeave={function(e){e.currentTarget.style.transform='';e.currentTarget.style.borderColor='rgba(245,184,0,.4)'}}
            ><SchoolLogo size={58}/></div>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'17px',fontWeight:700,color:'#C45F0A',lineHeight:1.2}}>{settings.school?.name || 'Sant Pathik Vidyalaya'}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'10px',fontStyle:'italic',fontWeight:400,color:'#F5B800',letterSpacing:'.5px'}}>Work is Worship — ॐ</div>
              <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'10px',fontWeight:400,color:'#B87832'}}>{settings.school?.board||'CBSE'} Affiliated · Est. {settings.school?.established||'1987'} · Bahraich, UP</div>
            </div>
          </Link>

          <nav className="spvs-dnav" style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:'2px'}}>
            {NAV.map(function(item){ return <NavItem key={item.to} {...item} isActive={isActive(item.to)}/> })}
            <div style={{marginLeft:'12px',position:'relative'}}>
              <div className="cta-pulse-ring"/>
              <Link to="/contact" className="spvs-cta-btn">
                <FaSchool size={14}/>
                ENROLL NOW
                <span style={{background:'rgba(255,255,255,.22)',backdropFilter:'blur(4px)',fontSize:'9px',fontWeight:700,letterSpacing:'1.2px',padding:'3px 8px',borderRadius:'50px',textTransform:'uppercase',border:'1px solid rgba(255,255,255,.3)'}}>{settings.admission?.open !== false ? 'OPEN' : 'LIMITED'}</span>
              </Link>
            </div>
          </nav>
          <button onClick={function(){setMobile(true)}} className="spvs-hamburger" style={{display:'none',flexDirection:'column',gap:'5px',background:'none',border:'none',cursor:'pointer',padding:'6px',marginLeft:'auto'}}>
            {[0,1,2].map(function(i){ return <span key={i} style={{width:'24px',height:'2.5px',background:'#E8761A',borderRadius:'3px',display:'block'}}/> })}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div style={{position:'fixed',inset:0,zIndex:1000,background:'#FFFDF8',display:'flex',flexDirection:'column',overflowY:'hidden'}}>
          <div style={{background:'linear-gradient(135deg,#1C0A00,#3D1A00)',padding:'18px 16px',display:'flex',alignItems:'center',gap:'13px',flexShrink:0}}>
            <div style={{width:'52px',height:'52px',borderRadius:'50%',overflow:'hidden',border:'2.5px solid rgba(245,184,0,.5)',background:'#FFF8DC',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <SchoolLogo size={48}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'10px',fontWeight:500,color:'rgba(255,210,130,.6)',letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:'2px'}}>Welcome to</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:700,color:'#FFCF40',lineHeight:1.25}}>{settings.school?.name || 'Sant Pathik Vidyalaya'}</div>
              <div style={{fontFamily:"'Poppins',sans-serif",fontSize:'10px',fontWeight:400,color:'rgba(255,210,130,.5)',marginTop:'2px'}}>{settings.school?.board||'CBSE'} Affiliated · Est. {settings.school?.established||'1987'} · Bahraich</div>
            </div>
            <button onClick={function(){setMobile(false)}} style={{width:'36px',height:'36px',borderRadius:'10px',border:'1.5px solid rgba(255,255,255,.15)',background:'rgba(255,255,255,.08)',cursor:'pointer',fontSize:'16px',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,.8)',flexShrink:0}}>✕</button>
          </div>

          <div style={{flex:1,overflowY:'auto',padding:'10px 14px 20px'}}>
            {MOB_NAV.map(function(item){ return <MobNavRow key={item.to} item={item} isActive={isActive} onClose={function(){setMobile(false)}} /> })}
          </div>

          <div style={{padding:'14px 16px 18px',borderTop:'1px solid rgba(232,118,26,.1)',flexShrink:0}}>
            <div style={{display:'flex',flexDirection:'column',gap:'7px',marginBottom:'14px'}}>
              <a href={'tel:+91' + phone} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 14px',borderRadius:'10px',background:'rgba(232,118,26,.07)',border:'1px solid rgba(232,118,26,.15)',color:'#7A4010',textDecoration:'none',fontFamily:"'Poppins',sans-serif",fontSize:'13px',fontWeight:600}}>
                <FaPhone size={14} color="#E8761A"/> +91 {phone}
              </a>
              <a href={'mailto:' + email} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 14px',borderRadius:'10px',background:'rgba(232,118,26,.07)',border:'1px solid rgba(232,118,26,.15)',color:'#7A4010',textDecoration:'none',fontFamily:"'Poppins',sans-serif",fontSize:'13px',fontWeight:600}}>
                <FaEnvelope size={14} color="#E8761A"/> {email}
              </a>
            </div>

            <div style={{display:'flex',gap:'8px',marginBottom:'14px',justifyContent:'center'}}>
              <a href={igLink} target="_blank" rel="noopener noreferrer" className="mob-soc-btn mob-soc-ig" aria-label="Instagram"><FaInstagram size={16}/></a>
              <a href={fbLink} target="_blank" rel="noopener noreferrer" className="mob-soc-btn mob-soc-fb" aria-label="Facebook"><FaFacebook size={16}/></a>
              <a href={ytLink} target="_blank" rel="noopener noreferrer" className="mob-soc-btn mob-soc-yt" aria-label="YouTube"><FaYoutube size={16}/></a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes tbmq    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes tbmqmob { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes dropIn  { from{opacity:0;transform:translateX(-50%) translateY(-12px) scale(.95)} to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)} }
        @keyframes ctaRing { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.08);opacity:1} }
        @keyframes ctaShine{ 0%{left:-60%} 100%{left:130%} }

        .tb-inner    { max-width:1280px; margin:0 auto; padding:7px 20px; display:flex; justify-content:space-between; align-items:center; gap:12px; }
        .tb-contacts { display:flex; gap:16px; flex-wrap:wrap; }
        .tb-c        { display:flex; align-items:center; gap:5px; font-size:12px; color:rgba(255,255,255,.6); font-family:'Poppins',sans-serif; }
        .tb-marquee  { flex:1; overflow:hidden; min-width:0; max-width:400px; }
        .tb-mq-track { display:inline-block; white-space:nowrap; animation:tbmq 30s linear infinite; }
        .tb-social   { display:flex; gap:6px; }
        .tb-desktop  { display:flex; }
        .tb-mobile   { display:none; }
        .tb-soc-a { width:26px; height:26px; border-radius:6px; background:rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,.75); text-decoration:none; transition:all .22s; }
        .tb-soc-a:hover { transform:translateY(-2px); color:#fff; }
        .tb-soc-ig:hover { background:linear-gradient(135deg,#f09433,#dc2743,#bc1888); }
        .tb-soc-fb:hover { background:#1877F2; }
        .tb-soc-yt:hover { background:#FF0000; }
        .tb-mob-social   { display:flex; align-items:center; gap:6px; padding:0 10px; flex-shrink:0; }
        .tb-mob-soc-btn  { width:28px; height:28px; border-radius:7px; background:rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,.8); text-decoration:none; transition:all .22s; }
        .tb-mob-soc-btn:hover { transform:translateY(-2px); }
        .tb-mob-ig:hover { background:linear-gradient(135deg,#f09433,#dc2743,#bc1888); color:#fff; }
        .tb-mob-fb:hover { background:#1877F2; color:#fff; }
        .tb-mob-yt:hover { background:#FF0000; color:#fff; }
        .tb-mob-divider  { width:1px; height:18px; background:rgba(255,255,255,.2); flex-shrink:0; }
        .tb-mob-mq-wrap  { flex:1; overflow:hidden; min-width:0; padding:0 8px; }
        .tb-mob-mq-track { display:inline-block; white-space:nowrap; animation:tbmqmob 25s linear infinite; }
        .cta-pulse-ring { position:absolute; inset:-4px; border-radius:15px; background:linear-gradient(135deg,#E8761A,#F5B800,#FF9A3C); animation:ctaRing 2.4s ease-in-out infinite; z-index:0; }
        .spvs-cta-btn   { position:relative; z-index:1; overflow:hidden; display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#E8761A,#C45F0A); color:#fff !important; font-family:'Poppins',sans-serif; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:.5px; padding:11px 20px; border-radius:12px; text-decoration:none; white-space:nowrap; box-shadow:0 6px 24px rgba(232,118,26,.5); transition:all .25s; }
        .spvs-cta-btn:hover { transform:translateY(-3px) scale(1.03); box-shadow:0 12px 36px rgba(232,118,26,.6); }
        .spvs-cta-btn::after { content:''; position:absolute; top:0; left:-60%; width:40%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); transform:skewX(-20deg); animation:ctaShine 3s ease-in-out infinite; }
        .mob-soc-btn { width:40px; height:40px; border-radius:10px; background:rgba(232,118,26,.08); border:1px solid rgba(232,118,26,.15); display:flex; align-items:center; justify-content:center; color:#7A4010; text-decoration:none; transition:all .22s; }
        .mob-soc-btn:hover { transform:translateY(-2px); color:#fff; }
        .mob-soc-ig:hover { background:linear-gradient(135deg,#f09433,#dc2743,#bc1888); border-color:transparent; }
        .mob-soc-fb:hover { background:#1877F2; border-color:transparent; }
        .mob-soc-yt:hover { background:#FF0000; border-color:transparent; }

        /* ── Restore chatbot orange color (overrides purple from global CSS) ── */
        .chat-btn { background:linear-gradient(135deg,#E8761A,#F5B800) !important; animation:chatPulse 2.5s 1.2s ease-in-out infinite !important; }
        .chat-tip { color:#E8761A !important; }
        .cp-send  { background:linear-gradient(135deg,#E8761A,#F5B800) !important; }
        .cp-dot   { background:#E8761A !important; }
        .cp-status{ color:#E8761A !important; }

        @media (max-width:960px) { .spvs-dnav { display:none !important; } .spvs-hamburger { display:flex !important; } }
        @media (max-width:768px) { .tb-desktop { display:none !important; } .tb-mobile { display:flex !important; align-items:center; width:100%; height:40px; overflow:hidden; } }
      `}</style>
    </>
  )
}