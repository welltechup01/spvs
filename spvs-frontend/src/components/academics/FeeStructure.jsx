import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaMoneyBillWave, FaClipboardList, FaCalendarAlt, FaFileAlt, FaBus, FaMapMarkerAlt, FaHome, FaExclamationTriangle, FaPhone } from 'react-icons/fa'

// ── STATIC FEE DATA — Academic Year 2026–27 (Sant Pathik Vidyalaya) ──────────
// Source: Official Fee Structure PDF 2026-27. Update this file to change fees.
const FEES = [
  { class:'Play Group',        tuition:1600, additional:2500, annual:1000, exam:0,    transport:'As per route' },
  { class:'Nursery – UKG',     tuition:1200, additional:2500, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class I – III',     tuition:1500, additional:2500, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class IV – V',      tuition:1600, additional:2500, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class VI',          tuition:1800, additional:3000, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class VII – VIII',  tuition:2000, additional:3000, annual:1000, exam:1500, transport:'As per route' },
  { class:'Class IX – X',      tuition:2750, additional:5000, annual:3000, exam:2000, transport:'As per route' },
  { class:'Class XI – XII',    tuition:3300, additional:7000, annual:5000, exam:4000, transport:'As per route' },
]

// ── CONVEYANCE FEE — W.E.F. 1st April 2026 ───────────────────────────────────
const CONVEYANCE = [
  { station:'Awasankhanpurwa', amount:1000 }, { station:'Badrauli',         amount:1800 },
  { station:'Bahraich',        amount:1800 }, { station:'Baundi & Bhilaura',amount:1700 },
  { station:'Bedaura',         amount:1500 }, { station:'Bhauri',           amount:1800 },
  { station:'Bhakla',          amount:1800 }, { station:'Bhinga Stand',     amount:2000 },
  { station:'Buddha',          amount:1000 }, { station:'Fakharpur',        amount:1300 },
  { station:'Gajadharpur',     amount:1400 }, { station:'Ghurdevi',         amount:1700 },
  { station:'Guthiya Mod',     amount:1800 }, { station:'Hariharpur',       amount:1400 },
  { station:'Ibrahim Deeha',   amount:1100 }, { station:'J.N.V',            amount:800  },
  { station:'Jaita',           amount:1600 }, { station:'Jarwal Kasba',     amount:1900 },
  { station:'Jarwal Road',     amount:2000 }, { station:'Jihura Maraucha',  amount:1200 },
  { station:'Kaiserganj',      amount:1800 }, { station:'Keshwapur',        amount:900  },
  { station:'Khaira',          amount:1100 }, { station:'Kodahi',           amount:1500 },
  { station:'Kothwal',         amount:1700 }, { station:'Kundasar',         amount:1700 },
  { station:'Kundaspara',      amount:1400 }, { station:'Madan Kothi',      amount:1000 },
  { station:'Methaura',        amount:1800 }, { station:'Nakdilpur',        amount:1100 },
  { station:'Nandwal',         amount:1700 }, { station:'Nausahra',         amount:1500 },
  { station:'Paramhansh',      amount:1900 }, { station:'Pakauri',          amount:1400 },
  { station:'Parle',           amount:1600 }, { station:'Patesiya',         amount:1600 },
  { station:'Raja Rehua',      amount:1800 }, { station:'Risiya',           amount:1800 },
  { station:'Roundopur',       amount:1900 }, { station:'Sablapur',         amount:1800 },
  { station:'Salempur(Dokri)', amount:1300 }, { station:'Sidarkha',         amount:1800 },
  { station:'Samda',           amount:1800 }, { station:'Sonari Bangla',    amount:1900 },
  { station:'Tikora Mod',      amount:1100 }, { station:'Wazirganj',        amount:1700 },
]

const NOTES = [
  { icon:<FaMapMarkerAlt size={13} color="#E8761A"/>, text:'Exam Fee for Class X & XII Board: ₹4,000/– (includes CBSE Board fees) — payable up to July of the session' },
  { icon:<FaMapMarkerAlt size={13} color="#E8761A"/>, text:'Exam Fee for Class IX & XI: ₹2,000/– per examination' },
  { icon:<FaMapMarkerAlt size={13} color="#E8761A"/>, text:'Exam Fee for Nursery to Class VIII: ₹1,500/– per examination' },
  { icon:<FaExclamationTriangle size={13} color="#E8761A"/>, text:'Play Group exam fee: not applicable' },
  { icon:<FaClipboardList size={13} color="#E8761A"/>,  text:'Additional Fee is charged for new students only (one-time at admission)' },
  { icon:<FaBus size={13} color="#E8761A"/>,            text:'Conveyance fee W.E.F. 1st April 2026 — charged as per route/station. Contact transport incharge: +91 7985287461' },
  { icon:<FaHome size={13} color="#E8761A"/>,           text:'Hostel fee is charged separately — contact school office for details' },
  { icon:<FaCalendarAlt size={13} color="#E8761A"/>,    text:'Tuition fee is payable monthly. Annual fee is charged once per academic year' },
  { icon:<FaExclamationTriangle size={13} color="#E8761A"/>, text:'Admission Form fee: ₹500/–' },
  { icon:<FaExclamationTriangle size={13} color="#E8761A"/>, text:'All fees are for Academic Year 2026–27. Subject to revision.' },
]

export default function FeeStructure({ embedded }) {
  var [hovered,        setHovered]        = useState(null)
  var [view,           setView]           = useState('table')
  var [showConveyance, setShowConveyance] = useState(false)
  var [hoveredStation, setHoveredStation] = useState(null)

  useEffect(function() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv,.rv3d').forEach(function(el) { obs.observe(el) })
    return function() { obs.disconnect() }
  }, [])

  var SUMMARY = [
    { icon:<FaMoneyBillWave size={24} color="var(--or)"/>,  lbl:'Tuition',    sub:'Monthly',     note:'₹1,200–₹3,300/mo', color:'var(--or)'  },
    { icon:<FaClipboardList size={24} color="#6C3FC5"/>,     lbl:'Additional', sub:'New student',  note:'₹2,500–₹7,000',    color:'#6C3FC5'    },
    { icon:<FaCalendarAlt size={24} color="#22a35a"/>,       lbl:'Annual',     sub:'Once / year',  note:'₹1,000–₹5,000',    color:'#22a35a'    },
    { icon:<FaFileAlt size={24} color="#F5B800"/>,           lbl:'Exam Fee',   sub:'Per exam',     note:'₹1,500–₹4,000',    color:'#F5B800'    },
    { icon:<FaBus size={24} color="#0F1B3D"/>,               lbl:'Transport',  sub:'Monthly',      note:'As per route',      color:'#0F1B3D'    },
  ]

  return (
    <>
      {!embedded && (
        <div className="page-banner">
          <div className="pb-inner">
            <div className="pb-chip">Fee Structure</div>
            <h1 className="pb-title">Fee <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Structure</span></h1>
            <p className="pb-sub">Transparent fee structure for Academic Year 2026–27 — Play Group to Class XII</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/academics">Academics</Link><span>›</span>
              <span className="bc-cur">Fee Structure</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', minHeight:'60vh', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>

          {/* Summary cards */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'12px', marginBottom:'32px'}}>
            {SUMMARY.map(function(c, i) {
              return (
                <div key={i} style={{padding:'16px 12px', borderRadius:'14px', textAlign:'center', background:c.color+'08', border:'1.5px solid '+c.color+'22'}}>
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'8px'}}>{c.icon}</div>
                  <div style={{fontFamily:"'Playfair Display',serif", fontSize:'14px', fontWeight:'700', color:'var(--dark)', marginBottom:'2px'}}>{c.lbl}</div>
                  <div style={{fontSize:'10px', color:'var(--txt3)', marginBottom:'6px'}}>{c.sub}</div>
                  <div style={{fontSize:'11px', fontWeight:'700', color:c.color, background:c.color+'10', padding:'3px 8px', borderRadius:'50px', display:'inline-block'}}>{c.note}</div>
                </div>
              )
            })}
          </div>

          {/* View toggle */}
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px', flexWrap:'wrap', gap:'10px'}}>
            <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'var(--dark)', margin:0}}>Complete Fee Chart — 2026–27</h2>
            <div style={{display:'flex', gap:'5px', background:'var(--bg2)', padding:'4px', borderRadius:'10px', border:'1.5px solid var(--brd)'}}>
              {[['table','Table'],['cards','Cards']].map(function(pair) {
                var isActive = view === pair[0]
                return (
                  <button key={pair[0]} onClick={function(){ setView(pair[0]) }} style={{padding:'7px 14px', borderRadius:'8px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:'700', transition:'all .2s', background:isActive?'var(--card)':'transparent', color:isActive?'var(--or)':'var(--txt2)', boxShadow:isActive?'0 2px 10px rgba(232,118,26,.15)':'none'}}>
                    {pair[1]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Table view */}
          {view === 'table' && (
            <div style={{borderRadius:'18px', overflow:'hidden', border:'1.5px solid var(--brd)', boxShadow:'0 8px 36px rgba(232,118,26,.07)', marginBottom:'28px'}}>
              <div style={{overflowX:'auto', WebkitOverflowScrolling:'touch'}}>
                <table style={{width:'100%', borderCollapse:'collapse', minWidth:'640px'}}>
                  <thead>
                    <tr style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))'}}>
                      {['Class / Level','Tuition /mo','Add. Fee (new student)','Annual Fee','Exam Fee','Transport'].map(function(h) {
                        return <th key={h} style={{padding:'12px 14px', textAlign:'left', fontSize:'10px', fontWeight:'800', color:'rgba(255,255,255,.65)', letterSpacing:'1px', textTransform:'uppercase', whiteSpace:'nowrap'}}>{h}</th>
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {FEES.map(function(row, i) {
                      return (
                        <tr key={i} onMouseEnter={function(){ setHovered(i) }} onMouseLeave={function(){ setHovered(null) }}
                          style={{borderTop:'1px solid var(--brd)', background:hovered===i?'rgba(232,118,26,.03)':i%2===0?'transparent':'rgba(0,0,0,.012)', transition:'background .15s'}}>
                          <td style={{padding:'12px 14px', fontWeight:'700', color:'var(--dark)', fontSize:'13px', fontFamily:"'Playfair Display',serif", whiteSpace:'nowrap'}}>{row.class}</td>
                          <td style={{padding:'12px 14px', fontWeight:'700', color:'var(--or)', fontSize:'13px', whiteSpace:'nowrap'}}>₹{row.tuition.toLocaleString()}</td>
                          <td style={{padding:'12px 14px', fontWeight:'600', color:'#6C3FC5', fontSize:'13px', whiteSpace:'nowrap'}}>₹{row.additional.toLocaleString()}</td>
                          <td style={{padding:'12px 14px', fontWeight:'600', color:'#22a35a', fontSize:'13px', whiteSpace:'nowrap'}}>₹{row.annual.toLocaleString()}</td>
                          <td style={{padding:'12px 14px', color:'var(--txt2)', fontSize:'13px', whiteSpace:'nowrap'}}>
                            {row.exam === 0
                              ? <span style={{color:'var(--txt3)', fontStyle:'italic'}}>N/A</span>
                              : '₹'+row.exam.toLocaleString()}
                          </td>
                          <td style={{padding:'12px 14px', color:'var(--txt3)', fontSize:'12px', fontStyle:'italic'}}>{row.transport}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Cards view */}
          {view === 'cards' && (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'12px', marginBottom:'28px'}}>
              {FEES.map(function(row, i) {
                return (
                  <div key={i} style={{background:'var(--card)', borderRadius:'16px', padding:'20px', border:'1.5px solid var(--brd)'}}>
                    <div style={{fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'var(--dark)', marginBottom:'14px', paddingBottom:'10px', borderBottom:'1.5px solid var(--brd)'}}>{row.class}</div>
                    {[
                      [<FaMoneyBillWave size={12}/>, 'Tuition',    'var(--or)', row.tuition,    '/ month'],
                      [<FaClipboardList size={12}/>, 'Add. Fee',   '#6C3FC5',  row.additional, '/ new student'],
                      [<FaCalendarAlt size={12}/>,   'Annual',     '#22a35a',  row.annual,     '/ year'],
                      [<FaFileAlt size={12}/>,       'Exam Fee',   '#F5B800',  row.exam,       '/ exam'],
                    ].map(function(item) {
                      return (
                        <div key={item[1]} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid var(--brd)'}}>
                          <span style={{fontSize:'13px', color:'var(--txt2)', display:'flex', alignItems:'center', gap:'6px'}}>{item[0]} {item[1]}</span>
                          <span style={{fontWeight:'700', color:item[2], fontSize:'13px'}}>
                            {item[3] === 0
                              ? <span style={{color:'var(--txt3)', fontStyle:'italic', fontWeight:'400'}}>N/A</span>
                              : <>₹{item[3].toLocaleString()} <span style={{fontSize:'10px', color:'var(--txt3)', fontWeight:'400'}}>{item[4]}</span></>
                            }
                          </span>
                        </div>
                      )
                    })}
                    <div style={{marginTop:'10px', padding:'9px 12px', borderRadius:'10px', background:'rgba(232,118,26,.05)', border:'1px solid rgba(232,118,26,.12)', fontSize:'12px', color:'var(--txt2)', textAlign:'center'}}>
                      Monthly Total: <strong style={{color:'var(--or)'}}>₹{(row.tuition + row.additional).toLocaleString()}</strong>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Conveyance Fee — collapsible */}
          <div style={{marginBottom:'28px'}}>
            <button
              onClick={function(){ setShowConveyance(function(v){ return !v }) }}
              style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'14px 18px', borderRadius:'14px', border:'1.5px solid var(--brd)', background:'var(--bg2)', cursor:'pointer', fontFamily:"'DM Sans',sans-serif"}}>
              <span style={{display:'flex', alignItems:'center', gap:'10px', fontWeight:'700', fontSize:'14px', color:'var(--dark)'}}>
                <FaBus size={16} color="#E8761A"/> Conveyance Fee — W.E.F. 1st April 2026
              </span>
              <span style={{fontSize:'18px', color:'var(--txt3)', transform: showConveyance ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform .2s', display:'inline-block'}}>▾</span>
            </button>

            {showConveyance && (
              <div style={{marginTop:'10px', borderRadius:'14px', overflow:'hidden', border:'1.5px solid var(--brd)'}}>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'collapse', minWidth:'400px'}}>
                    <thead>
                      <tr style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))'}}>
                        {['Station','Amount /mo','Station','Amount /mo'].map(function(h, i) {
                          return <th key={i} style={{padding:'10px 14px', textAlign:'left', fontSize:'10px', fontWeight:'800', color:'rgba(255,255,255,.65)', letterSpacing:'1px', textTransform:'uppercase'}}>{h}</th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({length: Math.ceil(CONVEYANCE.length / 2)}, function(_, i) {
                        var left  = CONVEYANCE[i * 2]
                        var right = CONVEYANCE[i * 2 + 1]
                        var isHovL = hoveredStation === i * 2
                        var isHovR = hoveredStation === i * 2 + 1
                        return (
                          <tr key={i} style={{borderTop:'1px solid var(--brd)', background: i%2===0 ? 'transparent' : 'rgba(0,0,0,.012)'}}>
                            <td onMouseEnter={function(){setHoveredStation(i*2)}} onMouseLeave={function(){setHoveredStation(null)}} style={{padding:'10px 14px', fontSize:'13px', color:'var(--dark)', fontWeight:'600', background: isHovL?'rgba(232,118,26,.04)':'transparent', transition:'background .15s'}}>{left.station}</td>
                            <td onMouseEnter={function(){setHoveredStation(i*2)}} onMouseLeave={function(){setHoveredStation(null)}} style={{padding:'10px 14px', fontSize:'13px', color:'var(--or)', fontWeight:'700', background: isHovL?'rgba(232,118,26,.04)':'transparent', transition:'background .15s'}}>₹{left.amount.toLocaleString()}</td>
                            {right ? (
                              <>
                                <td onMouseEnter={function(){setHoveredStation(i*2+1)}} onMouseLeave={function(){setHoveredStation(null)}} style={{padding:'10px 14px', fontSize:'13px', color:'var(--dark)', fontWeight:'600', borderLeft:'1px solid var(--brd)', background: isHovR?'rgba(232,118,26,.04)':'transparent', transition:'background .15s'}}>{right.station}</td>
                                <td onMouseEnter={function(){setHoveredStation(i*2+1)}} onMouseLeave={function(){setHoveredStation(null)}} style={{padding:'10px 14px', fontSize:'13px', color:'var(--or)', fontWeight:'700', background: isHovR?'rgba(232,118,26,.04)':'transparent', transition:'background .15s'}}>₹{right.amount.toLocaleString()}</td>
                              </>
                            ) : (
                              <><td/><td/></>
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{padding:'12px 16px', background:'rgba(232,118,26,.04)', borderTop:'1px solid var(--brd)', fontSize:'12px', color:'var(--txt2)', display:'flex', alignItems:'center', gap:'8px'}}>
                  <FaPhone size={11} color="#E8761A"/> Transport incharge: +91 7985287461
                </div>
              </div>
            )}
          </div>

          {/* Important Notes */}
          <div style={{marginBottom:'28px'}}>
            <div style={{fontSize:'11px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'var(--txt3)', marginBottom:'12px'}}>Important Notes</div>
            <div style={{display:'flex', flexDirection:'column', gap:'7px'}}>
              {NOTES.map(function(n, i) {
                return (
                  <div key={i} style={{display:'flex', alignItems:'flex-start', gap:'10px', fontSize:'13px', color:'var(--txt2)', padding:'11px 14px', background:'var(--bg2)', borderRadius:'10px', border:'1px solid var(--brd)'}}>
                    <span style={{flexShrink:0, marginTop:'1px'}}>{n.icon}</span>{n.text}
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div style={{textAlign:'center', padding:'28px 20px', borderRadius:'20px', background:'linear-gradient(135deg,var(--dark),var(--dark2))', border:'1px solid rgba(245,184,0,.1)'}}>
            <div style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'#fff', marginBottom:'8px'}}>Have fee-related queries?</div>
            <p style={{fontSize:'13px', color:'rgba(255,255,255,.5)', marginBottom:'18px'}}>Contact our school office directly — we're happy to assist with all fee and admission queries.</p>
            <div style={{display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
              <Link to="/contact" className="btn-or" style={{display:'inline-flex',alignItems:'center',gap:'7px'}}><FaClipboardList size={13}/> Apply for Admission</Link>
              <a href="tel:+919198783830" className="btn-out" style={{color:'rgba(255,255,255,.7)', borderColor:'rgba(255,255,255,.2)', display:'inline-flex', alignItems:'center', gap:'7px'}}><FaPhone size={13}/> Call Now</a>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}