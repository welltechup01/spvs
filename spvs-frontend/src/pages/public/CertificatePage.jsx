import { useState, useRef, useEffect } from 'react'
import { resultAPI, tcAPI } from '../../api'
import ResultCard from './Result'
import TcCertificate from './TcCertificate'
import CertPreloader from './CertPreloader'
import {
  FaTrophy, FaClipboardList, FaCalendarAlt, FaTicketAlt,
  FaSearch, FaPhone, FaEnvelope, FaSchool, FaInfoCircle,
  FaFileAlt, FaScroll,
} from 'react-icons/fa'

var CERTS = [
  { id:'results', label:'Marksheet', full:'Results / Marksheet', icon:<FaTrophy size={20} color="#C45F0A"/>,      iconSm:<FaTrophy size={22} color="#C45F0A"/>, color:'#C45F0A' },
  { id:'tc',      label:'TC',        full:'Transfer Certificate', icon:<FaClipboardList size={20} color="#22a35a"/>, iconSm:<FaClipboardList size={22} color="#22a35a"/>, color:'#22a35a' },
]

var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
var WDAYS  = ['Su','Mo','Tu','We','Th','Fr','Sa']

function CalendarPicker({ value, onChange, hasError }) {
  var parsed   = value ? new Date(value+'T00:00:00') : null
  var [open,   setOpen]   = useState(false)
  var [view,   setView]   = useState('day')
  var [month,  setMonth]  = useState(parsed ? parsed.getMonth()    : 3)
  var [year,   setYear]   = useState(parsed ? parsed.getFullYear() : 2005)
  var [yrBase, setYrBase] = useState(Math.floor((parsed ? parsed.getFullYear() : 2005) / 12) * 12)
  var ref = useRef()

  useEffect(function () {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return function () { document.removeEventListener('mousedown', h) }
  }, [])

  var firstDay  = new Date(year, month, 1).getDay()
  var daysInMon = new Date(year, month + 1, 0).getDate()
  var prevDays  = new Date(year, month, 0).getDate()
  var cells = []
  for (var i = 0; i < firstDay; i++) cells.push({ n: prevDays - firstDay + 1 + i, ghost: true })
  for (var d = 1; d <= daysInMon; d++) cells.push({ n: d, ghost: false })
  var rem = 42 - cells.length
  for (var k = 1; k <= rem; k++) cells.push({ n: k, ghost: true })

  function pickDay(n) {
    var mm = String(month + 1).padStart(2, '0')
    var dd = String(n).padStart(2, '0')
    onChange(year + '-' + mm + '-' + dd)
    setOpen(false); setView('day')
  }

  function prevM() { if (month === 0) { setMonth(11); setYear(function(y){return y-1}) } else setMonth(function(m){return m-1}) }
  function nextM() { if (month === 11) { setMonth(0);  setYear(function(y){return y+1}) } else setMonth(function(m){return m+1}) }

  var isSel   = function(n,g){ return !g && parsed && parsed.getFullYear()===year && parsed.getMonth()===month && parsed.getDate()===n }
  var isToday = function(n,g){ var t=new Date(); return !g && t.getFullYear()===year && t.getMonth()===month && t.getDate()===n }
  var display = parsed ? parsed.toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'}) : ''
  var yrGrid  = Array.from({length:12}, function(_,i){ return yrBase+i })
  var inputBorder = hasError ? '#e74c3c' : open ? '#E8761A' : 'rgba(232,118,26,.22)'

  return (
    <div ref={ref} style={{position:'relative',width:'100%'}}>
      <div onClick={function(){setOpen(function(o){return !o})}}
        style={{display:'flex',alignItems:'center',gap:'12px',padding:'13px 16px',borderRadius:'14px',border:'1.5px solid '+inputBorder,background:'#FFFDF8',cursor:'pointer',transition:'border .2s,box-shadow .2s',boxShadow:open?'0 0 0 3px rgba(232,118,26,.12)':'none',userSelect:'none'}}>
        <div style={{width:'40px',height:'40px',borderRadius:'10px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <FaCalendarAlt size={20} color="#fff"/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:'2px'}}>Date of Birth</div>
          <div style={{fontSize:'14px',fontWeight:parsed?'700':'400',color:parsed?'#1C0A00':'rgba(184,120,50,.55)'}}>
            {parsed ? display : 'Select your date of birth'}
          </div>
        </div>
        <svg width="10" height="6" viewBox="0 0 10 6" style={{transition:'transform .25s',transform:open?'rotate(180deg)':'none',flexShrink:0}}>
          <path d="M1 1l4 4 4-4" stroke="#E8761A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {open && (
        <div style={{position:'absolute',top:'calc(100% + 10px)',left:0,right:0,zIndex:9999,background:'#FFFFFF',borderRadius:'22px',boxShadow:'0 32px 80px rgba(28,10,0,.2)',border:'1.5px solid rgba(232,118,26,.15)',overflow:'hidden',animation:'calDrop .22s cubic-bezier(.34,1.56,.64,1)'}}>
          <div style={{background:'linear-gradient(135deg,#1C0A00,#3D1A00)',padding:'13px 15px'}}>
            {view==='day' && (
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <CBtn onClick={prevM}>‹</CBtn>
                <div style={{display:'flex',gap:'7px'}}>
                  <CHdr onClick={function(){setView('month')}}>{MONTHS[month].slice(0,3)}</CHdr>
                  <CHdr onClick={function(){setView('year')}}>{year}</CHdr>
                </div>
                <CBtn onClick={nextM}>›</CBtn>
              </div>
            )}
            {view==='month' && (
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:'700',color:'#FFCF40'}}>Choose Month</span>
                <CHdr onClick={function(){setView('day')}}>← Back</CHdr>
              </div>
            )}
            {view==='year' && (
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <CBtn onClick={function(){setYrBase(function(b){return b-12})}}>‹</CBtn>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:'13px',fontWeight:'700',color:'#FFCF40'}}>{yrBase} – {yrBase+11}</span>
                <CBtn onClick={function(){setYrBase(function(b){return b+12})}}>›</CBtn>
              </div>
            )}
          </div>
          <div style={{padding:'12px 13px'}}>
            {view==='day' && (
              <>
                <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',marginBottom:'4px'}}>
                  {WDAYS.map(function(w){ return <div key={w} style={{textAlign:'center',fontSize:'9.5px',fontWeight:'900',color:'#B87832',padding:'3px 0',letterSpacing:'.5px'}}>{w}</div> })}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'2px'}}>
                  {cells.map(function(cell,i){
                    var sel=isSel(cell.n,cell.ghost); var tod=isToday(cell.n,cell.ghost)
                    return (
                      <button key={i} onClick={function(){if(!cell.ghost) pickDay(cell.n)}}
                        style={{height:'34px',borderRadius:'9px',border:tod&&!sel?'1.5px solid #E8761A':'none',background:sel?'linear-gradient(135deg,#E8761A,#F5B800)':'transparent',color:cell.ghost?'rgba(180,120,50,.2)':sel?'#1C0A00':tod?'#E8761A':'#2C1500',fontSize:'12.5px',fontWeight:sel||tod?'800':'500',cursor:cell.ghost?'default':'pointer',fontFamily:"'DM Sans',sans-serif",transition:'background .15s'}}
                        onMouseEnter={function(e){if(!cell.ghost&&!sel)e.currentTarget.style.background='rgba(232,118,26,.1)'}}
                        onMouseLeave={function(e){if(!cell.ghost&&!sel)e.currentTarget.style.background='transparent'}}>
                        {cell.n}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
            {view==='month' && (
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px'}}>
                {MONTHS.map(function(m,i){
                  var act=i===month
                  return (
                    <button key={m} onClick={function(){setMonth(i);setView('day')}}
                      style={{padding:'11px 4px',borderRadius:'11px',border:'1.5px solid '+(act?'#E8761A':'rgba(232,118,26,.12)'),background:act?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFDF8',color:act?'#1C0A00':'#3D1A00',fontSize:'12.5px',fontWeight:'700',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}
                      onMouseEnter={function(e){if(!act)e.currentTarget.style.background='#FFF3E0'}}
                      onMouseLeave={function(e){if(!act)e.currentTarget.style.background='#FFFDF8'}}>
                      {m.slice(0,3)}
                    </button>
                  )
                })}
              </div>
            )}
            {view==='year' && (
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'5px'}}>
                {yrGrid.map(function(y){
                  var act=y===year
                  return (
                    <button key={y} onClick={function(){setYear(y);setView('month')}}
                      style={{padding:'10px 2px',borderRadius:'11px',border:'1.5px solid '+(act?'#E8761A':'rgba(232,118,26,.12)'),background:act?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFFDF8',color:act?'#1C0A00':'#3D1A00',fontSize:'13px',fontWeight:'700',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}
                      onMouseEnter={function(e){if(!act)e.currentTarget.style.background='#FFF3E0'}}
                      onMouseLeave={function(e){if(!act)e.currentTarget.style.background='#FFFDF8'}}>
                      {y}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <div style={{padding:'8px 14px 11px',borderTop:'1px solid rgba(232,118,26,.08)',textAlign:'center',fontSize:'10.5px',color:'#B87832',fontWeight:'600'}}>
            Year → Month → Date
          </div>
        </div>
      )}
    </div>
  )
}

function CBtn({onClick,children}){
  return <button onClick={onClick} style={{width:'28px',height:'28px',borderRadius:'8px',background:'rgba(255,255,255,.1)',border:'none',color:'#FFCF40',fontSize:'18px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'inherit'}} onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.3)'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(255,255,255,.1)'}}>{children}</button>
}
function CHdr({onClick,children}){
  return <button onClick={onClick} style={{padding:'4px 11px',borderRadius:'7px',background:'rgba(232,118,26,.18)',border:'1px solid rgba(232,118,26,.3)',color:'#FFCF40',fontSize:'12px',fontWeight:'800',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}} onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.32)'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(232,118,26,.18)'}}>{children}</button>
}

function SuccessScreen({ data, certId, onDownload, onBack }) {
  var cert = CERTS.find(function(c){ return c.id === certId })
  var sessionShort = (data.session||'').replace(/\s*-\s*/g,'–').replace(/(\d{4})\s*[–-]\s*(\d{4})/,function(_,a,b){ return a+'–'+b.slice(-2) })

  var rows = certId === 'results' ? [
    { l:'Student Name',  v: data.studentName },
    { l:'Admission No.', v: data.admissionNo },
    { l:'Class',         v: 'Class '+data.class+' '+data.section },
    { l:'Session',       v: sessionShort || data.session },
    { l:'Total Marks',   v: data.totalMarks+' / '+data.totalMaxMarks },
    { l:'Percentage',    v: data.percentage },
    { l:'Rank',          v: data.rank||'—' },
    { l:'Result',        v: data.result },
  ] : [
    { l:'Student Name',  v: data.studentName },
    { l:'Admission No.', v: data.admissionNo },
    { l:'Class',         v: 'Class '+data.class+' '+data.section },
    { l:'Session',       v: sessionShort || data.session },
  ]

  return (
    <>
      <style>{`
        @keyframes popIn  { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
      `}</style>
      <div style={{minHeight:'100vh',background:'#FFFDF8',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'48px 20px',fontFamily:"'DM Sans',sans-serif"}}>
        <div style={{width:'100%',maxWidth:'480px',textAlign:'center',animation:'fadeUp .5s ease both'}}>
          <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'#22c55e',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',margin:'0 auto 20px',boxShadow:'0 8px 28px rgba(34,197,94,.3)',animation:'popIn .5s cubic-bezier(.34,1.56,.64,1) both',fontSize:'32px'}}>✓</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(22px,4vw,28px)',fontWeight:'700',color:'#1C0A00',marginBottom:'6px'}}>Verified Successfully!</div>
          <div style={{fontSize:'14px',color:'#7A4010',marginBottom:'28px'}}>Your certificate is ready to download.</div>
          <div style={{background:'linear-gradient(135deg,#FFF9F0,#FEF3DC)',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.22)',padding:'22px 20px',marginBottom:'28px',textAlign:'left',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:'linear-gradient(90deg,#E8761A,#F5B800)'}} />
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'18px'}}>
              <div style={{width:'46px',height:'46px',borderRadius:'12px',background:'rgba(232,118,26,.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {cert ? cert.iconSm : <FaFileAlt size={22} color="#E8761A"/>}
              </div>
              <div>
                <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',letterSpacing:'1.1px',textTransform:'uppercase',marginBottom:'2px'}}>Certificate Ready</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:'700',color:'#1C0A00'}}>
                  {certId === 'results' ? 'Progress Report Card' : cert ? cert.full : 'Certificate'}
                </div>
              </div>
            </div>
            {rows.map(function(row, i){
              return (
                <div key={row.l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:i<rows.length-1?'1px dashed rgba(232,118,26,.15)':'none',fontSize:'13.5px'}}>
                  <span style={{color:'#B87832',fontWeight:'700'}}>{row.l}</span>
                  <span style={{color:row.l==='Result'?(row.v==='Pass'||row.v==='Promoted'?'#166534':'#dc2626'):'#1C0A00',fontWeight:'700'}}>{row.v}</span>
                </div>
              )
            })}
          </div>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={onDownload} style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'14px 28px',borderRadius:'14px',background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#1C0A00',fontWeight:'900',fontSize:'15px',border:'none',cursor:'pointer',boxShadow:'0 8px 28px rgba(232,118,26,.32)',fontFamily:"'DM Sans',sans-serif",transition:'all .22s'}}
              onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 14px 36px rgba(232,118,26,.44)'}}
              onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 8px 28px rgba(232,118,26,.32)'}}>
              ↓ Download Report Card
            </button>
            <button onClick={onBack} style={{padding:'14px 24px',borderRadius:'14px',background:'transparent',color:'#7A4010',fontWeight:'700',fontSize:'14px',border:'1.5px solid rgba(232,118,26,.28)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",transition:'all .2s'}}
              onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
              onMouseLeave={function(e){e.currentTarget.style.background='transparent'}}>
              ← New Request
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function VerifyScreen({ certId, regNo, dob, onBack }) {
  var [loaderDone, setLoaderDone] = useState(false)
  var [resultData, setResultData] = useState(null)
  var [errMsg,     setErrMsg]     = useState('')
  var [apiDone,    setApiDone]    = useState(false)
  var [showFull,   setShowFull]   = useState(false)

  useEffect(function(){
    var apiCall = certId === 'tc'
      ? tcAPI.verify({ admissionNo: regNo.trim().toUpperCase(), dob: dob.trim() })
      : resultAPI.verify({ admissionNo: regNo.trim().toUpperCase(), dob: dob.trim() })
    apiCall
      .then(function(res){ setResultData(res.data); setApiDone(true) })
      .catch(function(err){ setErrMsg(err?.message||'No published record found. Please check your details.'); setApiDone(true) })
    var t = setTimeout(function(){ setLoaderDone(true) }, 3000)
    return function(){ clearTimeout(t) }
  }, [])

  if (!loaderDone) return <CertPreloader />
  if (!apiDone) {
    return (
      <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'36px',height:'36px',border:'3px solid rgba(232,118,26,.18)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spvSpin .8s linear infinite'}} />
      </div>
    )
  }
  if (resultData && certId === 'tc') return <TcCertificate data={resultData} onBack={onBack} />
  if (resultData && certId === 'results' && showFull) {
    return (
      <div style={{padding:'32px 24px',background:'#FFFDF8',minHeight:'100vh'}}>
        <ResultCard data={resultData} onBack={function(){ setShowFull(false) }} />
      </div>
    )
  }
  if (resultData && certId === 'results') {
    return <SuccessScreen data={resultData} certId={certId} onDownload={function(){ setShowFull(true) }} onBack={onBack} />
  }
  return (
    <div style={{minHeight:'62vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'48px 24px',fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{textAlign:'center',maxWidth:'460px'}}>
        <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'linear-gradient(135deg,#e74c3c,#c0392b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'30px',color:'#fff',margin:'0 auto 22px',boxShadow:'0 8px 28px rgba(231,76,60,.28)'}}>✕</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'#1C0A00',marginBottom:'8px'}}>Verification Failed</div>
        <div style={{fontSize:'14px',color:'#7A4010',marginBottom:'12px'}}>No record found matching your details.</div>
        <div style={{padding:'14px 18px',borderRadius:'14px',background:'rgba(231,76,60,.05)',border:'1.5px solid rgba(231,76,60,.14)',fontSize:'13px',color:'#7A4010',lineHeight:'1.65',marginBottom:'28px'}}>{errMsg}</div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onBack} style={{padding:'13px 28px',borderRadius:'13px',background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#1C0A00',fontWeight:'800',fontSize:'14px',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>← Try Again</button>
          <a href="tel:+919198783830" style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'13px 22px',borderRadius:'13px',background:'transparent',color:'#E8761A',fontWeight:'700',fontSize:'14px',border:'1.5px solid rgba(232,118,26,.28)',textDecoration:'none',fontFamily:"'DM Sans',sans-serif"}}>
            <FaPhone size={13}/> Call School
          </a>
        </div>
      </div>
    </div>
  )
}

export default function CertificatePage() {
  var [regNo,    setRegNo]    = useState('')
  var [dob,      setDob]      = useState('')
  var [certType, setCertType] = useState('')
  var [dropOpen, setDropOpen] = useState(false)
  var [submitted,setSubmitted]= useState(false)
  var [errors,   setErrors]   = useState({})
  var [touched,  setTouched]  = useState({})
  var dropRef = useRef()

  useEffect(function(){
    function h(e){ if(dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown',h)
    return function(){ document.removeEventListener('mousedown',h) }
  },[])

  function validate(){
    var e={}
    if(!regNo.trim())  e.regNo    = 'Admission number is required'
    if(!dob)           e.dob      = 'Date of birth is required'
    if(!certType)      e.certType = 'Please select a certificate'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function handleSubmit(){
    setTouched({regNo:true,dob:true,certType:true})
    if(!validate()) return
    setSubmitted(true)
    window.scrollTo({top:0,behavior:'smooth'})
  }

  function handleBack(){
    setSubmitted(false); setRegNo(''); setDob(''); setCertType(''); setErrors({}); setTouched({})
  }

  var selCert = CERTS.find(function(c){ return c.id===certType })

  if(submitted){
    return (
      <>
        <style>{`
          @keyframes spvSpin  { to { transform: rotate(360deg) } }
          @keyframes spvSpin2 { to { transform: rotate(-360deg) } }
          @keyframes calDrop  { from{opacity:0;transform:translateY(-10px) scale(.97)} to{opacity:1;transform:none} }
        `}</style>
        <div style={{fontFamily:"'DM Sans',sans-serif",minHeight:'100vh',background:'#FFFDF8'}}>
          <div style={{background:'linear-gradient(135deg,#1C0A00,#3D1A00)',padding:'22px 24px',textAlign:'center'}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#FFCF40'}}>Sant Pathik Vidyalaya</div>
            <div style={{fontSize:'12px',color:'rgba(255,210,130,.45)',marginTop:'3px'}}>Certificate Verification Portal</div>
          </div>
          <VerifyScreen certId={certType} regNo={regNo} dob={dob} onBack={handleBack} />
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @keyframes calDrop    { from{opacity:0;transform:translateY(-10px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        @keyframes badgePop   { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
        @keyframes dotBounce  { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-10px)} }
        .cert-btn-short{display:none} .cert-btn-full{display:inline}
        @media(max-width:400px){.cert-btn-full{display:none} .cert-btn-short{display:inline}}
      `}</style>

      <div style={{fontFamily:"'DM Sans',sans-serif",minHeight:'100vh',background:'#FFFDF8'}}>
        <section style={{background:'linear-gradient(145deg,#1C0A00 0%,#2E1100 45%,#1C0A00 100%)',padding:'88px 24px 76px',position:'relative',overflow:'hidden',textAlign:'center'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle,rgba(232,118,26,.07) 1px,transparent 1px)',backgroundSize:'28px 28px',pointerEvents:'none'}} />
          <div style={{position:'absolute',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,118,26,.09),transparent 65%)',top:'-160px',right:'-120px',pointerEvents:'none'}} />
          <div style={{position:'absolute',width:'380px',height:'380px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,184,0,.06),transparent 65%)',bottom:'-100px',left:'-80px',pointerEvents:'none'}} />
          <div style={{maxWidth:'620px',margin:'0 auto',position:'relative',zIndex:1,animation:'heroFadeUp .7s ease both'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 16px',borderRadius:'50px',background:'rgba(245,184,0,.1)',border:'1px solid rgba(245,184,0,.22)',color:'#F5B800',fontSize:'12px',fontWeight:'800',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'22px',animation:'badgePop .5s .2s ease both'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#F5B800',animation:'dotBounce 2s infinite',display:'inline-block'}} />
              Certificate Portal
            </div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(30px,5vw,54px)',fontWeight:'700',color:'#FFFDF8',margin:'0 0 16px',lineHeight:1.12}}>
              Request Your<br/>
              <span style={{background:'linear-gradient(90deg,#E8761A,#F5B800,#E8761A)',backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Certificate Online</span>
            </h1>
            <p style={{fontSize:'clamp(14px,2vw,16px)',color:'rgba(255,220,150,.6)',lineHeight:1.8,maxWidth:'460px',margin:'0 auto 32px'}}>
              Enter your admission number and date of birth to verify and instantly download your official certificate from Sant Pathik Vidyalaya.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center'}}>
              {CERTS.map(function(c){
                return (
                  <div key={c.id} style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'6px 13px',borderRadius:'50px',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',fontSize:'12px',fontWeight:'600',color:'rgba(255,220,150,.7)'}}>
                    {c.icon} {c.label}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section style={{padding:'60px 24px 80px',display:'flex',justifyContent:'center'}}>
          <div style={{width:'100%',maxWidth:'560px'}}>
            <div style={{background:'#FFFFFF',borderRadius:'28px',boxShadow:'0 24px 72px rgba(28,10,0,.1)',border:'1.5px solid rgba(232,118,26,.1)'}}>
              <div style={{background:'linear-gradient(135deg,#E8761A,#F5B800)',padding:'20px 28px',display:'flex',alignItems:'center',gap:'14px',borderRadius:'26px 26px 0 0'}}>
                <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'rgba(255,255,255,.22)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <FaSchool size={24} color="#1C0A00"/>
                </div>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'17px',fontWeight:'700',color:'#1C0A00'}}>Verify &amp; View Certificate</div>
                  <div style={{fontSize:'12px',color:'rgba(28,10,0,.55)',marginTop:'2px'}}>Fill all details as per school records</div>
                </div>
              </div>

              <div style={{padding:'30px 28px 28px',display:'flex',flexDirection:'column',gap:'22px'}}>
                {/* Admission No */}
                <div>
                  <label style={{display:'block',fontSize:'11px',fontWeight:'800',color:'#B87832',letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:'8px'}}>
                    Admission Number <span style={{color:'#e74c3c'}}>*</span>
                  </label>
                  <div style={{position:'relative'}}>
                    <div style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',width:'38px',height:'38px',borderRadius:'10px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <FaTicketAlt size={18} color="#1C0A00"/>
                    </div>
                    <input value={regNo}
                      onChange={function(e){setRegNo(e.target.value);if(touched.regNo)setErrors(function(err){return{...err,regNo:''}})}}
                      placeholder="e.g. 9157"
                      style={{width:'100%',padding:'14px 16px 14px 64px',borderRadius:'14px',border:'1.5px solid '+(errors.regNo&&touched.regNo?'#e74c3c':'rgba(232,118,26,.2)'),background:'#FFFDF8',color:'#1C0A00',fontFamily:"'DM Sans',sans-serif",fontSize:'14px',fontWeight:'600',outline:'none',boxSizing:'border-box',transition:'border .2s,box-shadow .2s'}}
                      onFocus={function(e){e.target.style.borderColor='#E8761A';e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)'}}
                      onBlur={function(e){setTouched(function(t){return{...t,regNo:true}});e.target.style.borderColor=errors.regNo?'#e74c3c':'rgba(232,118,26,.2)';e.target.style.boxShadow='none'}} />
                  </div>
                  {errors.regNo&&touched.regNo && <div style={{fontSize:'12px',color:'#e74c3c',marginTop:'6px',fontWeight:'600'}}>⚠ {errors.regNo}</div>}
                </div>

                {/* DOB */}
                <div>
                  <label style={{display:'block',fontSize:'11px',fontWeight:'800',color:'#B87832',letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:'8px'}}>
                    Date of Birth <span style={{color:'#e74c3c'}}>*</span>
                  </label>
                  <CalendarPicker value={dob} onChange={function(v){setDob(v);if(touched.dob)setErrors(function(err){return{...err,dob:''}})}} hasError={!!(errors.dob&&touched.dob)} />
                  {errors.dob&&touched.dob && <div style={{fontSize:'12px',color:'#e74c3c',marginTop:'6px',fontWeight:'600'}}>⚠ {errors.dob}</div>}
                </div>

                {/* Certificate Type */}
                <div>
                  <label style={{display:'block',fontSize:'11px',fontWeight:'800',color:'#B87832',letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:'8px'}}>
                    Certificate Type <span style={{color:'#e74c3c'}}>*</span>
                  </label>
                  <div ref={dropRef} style={{position:'relative'}}>
                    <div onClick={function(){setDropOpen(function(o){return !o})}}
                      style={{display:'flex',alignItems:'center',gap:'12px',padding:'13px 16px',borderRadius:'14px',border:'1.5px solid '+(errors.certType&&touched.certType?'#e74c3c':dropOpen?'#E8761A':'rgba(232,118,26,.2)'),background:'#FFFDF8',cursor:'pointer',transition:'border .2s,box-shadow .2s',boxShadow:dropOpen?'0 0 0 3px rgba(232,118,26,.1)':'none',userSelect:'none'}}>
                      <div style={{width:'40px',height:'40px',borderRadius:'10px',background:selCert?selCert.color+'18':'rgba(232,118,26,.08)',border:'1.5px solid '+(selCert?selCert.color+'30':'rgba(232,118,26,.14)'),display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        {selCert ? selCert.iconSm : <FaScroll size={20} color="#E8761A"/>}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:'2px'}}>Certificate</div>
                        <div style={{fontSize:'14px',fontWeight:selCert?'700':'400',color:selCert?'#1C0A00':'rgba(184,120,50,.55)'}}>
                          {selCert?selCert.full:'Select certificate type'}
                        </div>
                      </div>
                      <svg width="10" height="6" viewBox="0 0 10 6" style={{transition:'transform .25s',transform:dropOpen?'rotate(180deg)':'none',flexShrink:0}}>
                        <path d="M1 1l4 4 4-4" stroke="#E8761A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                      </svg>
                    </div>
                    {dropOpen && (
                      <div style={{position:'absolute',top:'calc(100% + 8px)',left:0,right:0,zIndex:99999,background:'#FFFFFF',borderRadius:'18px',boxShadow:'0 20px 56px rgba(28,10,0,.14)',border:'1.5px solid rgba(232,118,26,.12)',overflow:'hidden',animation:'calDrop .2s ease'}}>
                        {CERTS.map(function(c,idx){
                          var isAct=certType===c.id
                          return (
                            <div key={c.id} onClick={function(){setCertType(c.id);setDropOpen(false);if(touched.certType)setErrors(function(err){return{...err,certType:''}})}}
                              style={{display:'flex',alignItems:'center',gap:'14px',padding:'13px 16px',cursor:'pointer',background:isAct?'linear-gradient(135deg,#FFF6EA,#FEF0D4)':'#FFFFFF',borderLeft:'3px solid '+(isAct?'#E8761A':'transparent'),borderBottom:idx<CERTS.length-1?'1px solid rgba(232,118,26,.07)':'none',transition:'all .15s'}}
                              onMouseEnter={function(e){if(!isAct)e.currentTarget.style.background='#FFF9F3'}}
                              onMouseLeave={function(e){if(!isAct)e.currentTarget.style.background='#FFFFFF'}}>
                              <div style={{width:'38px',height:'38px',borderRadius:'10px',background:c.color+'15',border:'1.5px solid '+c.color+'25',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{c.iconSm}</div>
                              <div style={{flex:1}}>
                                <div style={{fontWeight:isAct?'800':'700',color:isAct?'#E8761A':'#1C0A00',fontSize:'14px'}}>{c.full}</div>
                                <div style={{fontSize:'11px',color:'#B87832',marginTop:'1px'}}>{c.label}</div>
                              </div>
                              {isAct && <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#E8761A',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:'#fff',fontWeight:'900',flexShrink:0}}>✓</div>}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  {errors.certType&&touched.certType && <div style={{fontSize:'12px',color:'#e74c3c',marginTop:'6px',fontWeight:'600'}}>⚠ {errors.certType}</div>}
                </div>

                {/* Note */}
                <div style={{padding:'13px 15px',borderRadius:'13px',background:'rgba(232,118,26,.05)',border:'1.5px solid rgba(232,118,26,.1)',display:'flex',gap:'10px',alignItems:'flex-start'}}>
                  <FaInfoCircle size={17} color="#E8761A" style={{flexShrink:0,marginTop:'1px'}}/>
                  <p style={{fontSize:'12.5px',color:'#7A4010',lineHeight:'1.65',margin:0}}>
                    Details must match <strong>exactly</strong> as per school records. For help contact&nbsp;
                    <a href="tel:+919198783830" style={{color:'#E8761A',fontWeight:'700',textDecoration:'none'}}>+91&nbsp;9198783830</a>.
                  </p>
                </div>

                {/* Submit */}
                <button onClick={handleSubmit}
                  style={{width:'100%',padding:'17px',borderRadius:'16px',background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#1C0A00',fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(13px,3vw,16px)',fontWeight:'900',border:'none',cursor:'pointer',boxShadow:'0 10px 32px rgba(232,118,26,.32)',transition:'all .25s',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',letterSpacing:'.3px'}}
                  onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(232,118,26,.44)'}}
                  onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 10px 32px rgba(232,118,26,.32)'}}>
                  <FaSearch size={18}/>
                  <span className="cert-btn-full">Verify &amp; View Certificate</span>
                  <span className="cert-btn-short">Verify &amp; View</span>
                </button>
              </div>
            </div>

            {/* Help */}
            <div style={{marginTop:'22px',display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
              {[
                {href:'tel:+919198783830',    icon:<FaPhone size={13}/>,   text:'Call School Office'},
                {href:'mailto:spvbrh@gmail.com',icon:<FaEnvelope size={13}/>,text:'Email Us'},
              ].map(function(btn){
                return (
                  <a key={btn.href} href={btn.href}
                    style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'10px 18px',borderRadius:'11px',background:'#FFFFFF',border:'1.5px solid rgba(232,118,26,.14)',color:'#7A4010',fontSize:'13px',fontWeight:'700',textDecoration:'none',boxShadow:'0 2px 10px rgba(232,118,26,.06)',transition:'all .2s'}}
                    onMouseEnter={function(e){e.currentTarget.style.borderColor='#E8761A';e.currentTarget.style.color='#E8761A';e.currentTarget.style.background='#FFF6EA'}}
                    onMouseLeave={function(e){e.currentTarget.style.borderColor='rgba(232,118,26,.14)';e.currentTarget.style.color='#7A4010';e.currentTarget.style.background='#FFFFFF'}}>
                    {btn.icon} {btn.text}
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}