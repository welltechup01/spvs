import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Library         from '../../components/facilities/Library'
import Labs            from '../../components/facilities/Labs'
import Transport       from '../../components/facilities/Transport'
import Playground      from '../../components/facilities/Playground'
import SmartClasses    from '../../components/facilities/SmartClasses'
import HostelHighlight from '../../components/facilities/HostelHighlight'
import { FaHome, FaBook, FaFlask, FaBus, FaFutbol, FaDesktop, FaStar, FaSchool } from 'react-icons/fa'

const TABS = [
  { id:'hostel',     icon:<FaHome size={14}/>,    label:'Hostel',       short:'Hostel',    highlight:true },
  { id:'library',    icon:<FaBook size={14}/>,    label:'Library',      short:'Library' },
  { id:'labs',       icon:<FaFlask size={14}/>,   label:'Laboratories', short:'Labs' },
  { id:'transport',  icon:<FaBus size={14}/>,     label:'Transport',    short:'Transport' },
  { id:'sports',     icon:<FaFutbol size={14}/>,  label:'Sports',       short:'Sports' },
  { id:'smart',      icon:<FaDesktop size={14}/>, label:'Smart Classes',short:'Smart' },
]

/* Maps hash → tab id  (navbar uses 'smartclass', tabs use 'smart') */
const HASH_MAP = {
  hostel:     'hostel',
  library:    'library',
  labs:       'labs',
  transport:  'transport',
  sports:     'sports',
  smart:      'smart',
  smartclass: 'smart',   /* ← navbar sends #smartclass, map to 'smart' */
}

export default function FacilitiesPage() {
  const location              = useLocation()
  const [active, setActive]   = useState(() => {
    /* Set initial tab from hash if present */
    var hash = window.location.hash.replace('#', '')
    return HASH_MAP[hash] || 'hostel'
  })

  /* ── React to hash changes (e.g. browser back/forward or navbar click) ── */
  useEffect(() => {
    var hash   = location.hash.replace('#', '')
    var tabId  = HASH_MAP[hash]
    if (tabId) setActive(tabId)
  }, [location.hash])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv,.rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [active])

  return (
    <>
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}><FaSchool size={12}/> Facilities</div>
          <h1 className="pb-title">World-Class <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Facilities</span></h1>
          <p className="pb-sub">Modern infrastructure, safe hostel, smart classes, 8 labs, 22 buses — everything your child needs</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Facilities</span>
          </div>
        </div>
      </div>

      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))',padding:'16px 0'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 16px',display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'10px'}}>
          {[['10 Acres','Campus'],['8','Labs'],['73','Classrooms'],['22','Buses'],['5,000+','Books'],['CCTV','All Areas']].map(([n,l])=>(
            <div key={l} style={{textAlign:'center',color:'#fff',minWidth:'52px'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'17px',fontWeight:'700',lineHeight:'1'}}>{n}</div>
              <div style={{fontSize:'9px',fontWeight:'700',opacity:'.8',letterSpacing:'1px',textTransform:'uppercase',marginTop:'3px'}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'var(--bg)',minHeight:'60vh'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'32px 14px'}}>

          <div style={{overflowX:'auto',WebkitOverflowScrolling:'touch',marginBottom:'28px',paddingBottom:'4px'}}>
            <div style={{display:'flex',gap:'6px',background:'var(--bg2)',padding:'6px',borderRadius:'18px',border:'1.5px solid var(--brd)',minWidth:'max-content'}}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActive(t.id)} style={{
                  display:'flex', alignItems:'center', gap:'6px',
                  padding:'11px 14px', borderRadius:'12px', border:'none', cursor:'pointer',
                  fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700',
                  transition:'all .28s cubic-bezier(.34,1.56,.64,1)',
                  background: t.highlight && active===t.id
                    ? 'linear-gradient(135deg,var(--or),var(--gd))'
                    : active===t.id ? 'var(--card)' : 'transparent',
                  color: active===t.id ? (t.highlight ? '#fff' : 'var(--or)') : 'var(--txt2)',
                  boxShadow: active===t.id ? (t.highlight ? '0 6px 22px var(--shd)' : '0 4px 18px var(--shd)') : 'none',
                  whiteSpace:'nowrap',
                }}>
                  {t.icon}
                  <span className="tab-full-f">{t.label}</span>
                  <span className="tab-short-f" style={{display:'none'}}>{t.short}</span>
                  {t.highlight && active!==t.id && (
                    <span style={{display:'inline-flex',alignItems:'center'}}><FaStar size={9} color="#E8761A"/></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div key={active} style={{animation:'fU .35s ease both'}}>
            {active === 'hostel'    && <HostelHighlight embedded />}
            {active === 'library'   && <Library         embedded />}
            {active === 'labs'      && <Labs             embedded />}
            {active === 'transport' && <Transport        embedded />}
            {active === 'sports'    && <Playground       embedded />}
            {active === 'smart'     && <SmartClasses     embedded />}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:480px) { .tab-full-f { display:none !important; } .tab-short-f { display:inline !important; } }
      `}</style>
    </>
  )
}