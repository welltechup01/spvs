import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CampusLife   from '../../components/campus/CampusLife'
import JobCard      from '../../components/campus/JobCard'
import JobApplyForm from '../../components/campus/JobApplyForm'
import { jobAPI }   from '../../api'
import { FaTree, FaUsers, FaPalette, FaBus, FaLandmark, FaSchool, FaBriefcase, FaEnvelope, FaPhone } from 'react-icons/fa'

var TABS = [
  { id:'campus', icon:<FaSchool size={14}/>,   label:'Campus Life'    },
  { id:'jobs',   icon:<FaBriefcase size={14}/>, label:'Jobs & Careers' },
]

var STATS = [
  ['10 Acres', 'Campus Area',        <FaTree size={18} color="#fff"/>    ],
  ['1410+',    'Students',           <FaUsers size={18} color="#fff"/>   ],
  ['8+',       'Clubs & Activities', <FaPalette size={18} color="#fff"/> ],
  ['22',       'School Buses',       <FaBus size={18} color="#fff"/>     ],
  ['Since 1987','Established',       <FaLandmark size={18} color="#fff"/>],
]

export default function CampusLifePage() {
  var [searchParams]          = useSearchParams()
  var initTab                 = searchParams.get('tab') === 'jobs' ? 'jobs' : 'campus'
  var [tab, setTab]           = useState(initTab)
  var [filter, setFilter]     = useState('All')
  var [selected, setSelected] = useState(null)
  var [jobs, setJobs]         = useState([])
  var [loading, setLoading]   = useState(true)

  useEffect(function() {
    jobAPI.getAll()
      .then(function(res){ setJobs(res.data || []); setLoading(false) })
      .catch(function(){   setLoading(false) })
  }, [])

  var filters  = ['All', 'Open', 'Closed']
  var filtered = filter === 'All' ? jobs : jobs.filter(function(j){ return j.status === filter })

  function normalise(j) {
    return {
      _id:    j._id,
      title:  j.title,
      type:   j.type  || 'Full Time',
      dept:   j.dept  || 'General',
      qual:   j.qual  || '—',
      exp:    j.exp   || '—',
      posted: j.createdAt ? new Date(j.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '',
      status: j.status || 'Open',
    }
  }

  return (
    <>
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}><FaSchool size={12}/> Campus</div>
          <h1 className="pb-title">Campus <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Life & Careers</span></h1>
          <p className="pb-sub">Experience a vibrant school life — academics, activities, sports and opportunities beyond the classroom</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Campus Life & Jobs</span>
          </div>
        </div>
      </div>

      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))',padding:'20px 0'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 20px',display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'16px'}}>
          {STATS.map(function(s){
            return (
              <div key={s[1]} style={{textAlign:'center',color:'#fff'}}>
                <div style={{display:'flex',justifyContent:'center',marginBottom:'2px'}}>{s[2]}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',lineHeight:'1'}}>{s[0]}</div>
                <div style={{fontSize:'11px',fontWeight:'700',opacity:'.8',letterSpacing:'1px',textTransform:'uppercase',marginTop:'3px'}}>{s[1]}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{background:'var(--bg)',padding:'60px 20px',minHeight:'60vh'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>

          <div style={{display:'flex',gap:'6px',background:'var(--bg2)',padding:'5px',borderRadius:'14px',border:'1.5px solid var(--brd)',marginBottom:'44px',maxWidth:'420px'}}>
            {TABS.map(function(t){
              var active = tab === t.id
              return (
                <button key={t.id} onClick={function(){setTab(t.id)}} style={{flex:1,padding:'13px 16px',borderRadius:'10px',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:'14px',fontWeight:'700',transition:'all .25s cubic-bezier(.34,1.56,.64,1)',background:active?'var(--card)':'transparent',color:active?'var(--or)':'var(--txt2)',boxShadow:active?'0 4px 16px var(--shd)':'none',transform:active?'scale(1.02)':'scale(1)',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
                  {t.icon} {t.label}
                </button>
              )
            })}
          </div>

          {tab === 'campus' && (
            <div style={{animation:'fU .3s ease both'}}><CampusLife /></div>
          )}

          {tab === 'jobs' && (
            <div style={{animation:'fU .3s ease both'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'14px',marginBottom:'28px'}}>
                <div>
                  <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',color:'var(--dark)',margin:'0 0 4px'}}>Current <span style={{color:'var(--or)',fontStyle:'italic'}}>Openings</span></h2>
                  <div style={{fontSize:'13px',color:'var(--txt2)'}}>Join our team of dedicated educators at SPV</div>
                </div>
                <div style={{display:'flex',gap:'6px'}}>
                  {filters.map(function(f){
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
                <div style={{textAlign:'center',padding:'60px',color:'var(--txt3)',fontSize:'14px'}}>
                  <FaBriefcase size={32} color="var(--txt3)" style={{marginBottom:'10px'}}/>
                  <div>Loading jobs...</div>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{textAlign:'center',padding:'60px',color:'var(--txt3)',fontSize:'14px'}}>
                  <FaBriefcase size={32} color="var(--txt3)" style={{marginBottom:'10px'}}/>
                  <div>No {filter !== 'All' ? filter.toLowerCase() : ''} job openings at the moment.</div>
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'44px'}}>
                  {filtered.map(function(job){
                    return <JobCard key={job._id} job={normalise(job)} onApply={function(j){setSelected(j)}} />
                  })}
                </div>
              )}

              <div style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))',borderRadius:'20px',padding:'36px',textAlign:'center'}}>
                <FaEnvelope size={32} color="#FFCF40" style={{marginBottom:'12px'}}/>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#fff',marginBottom:'8px'}}>Don't see your role?</div>
                <div style={{fontSize:'14px',color:'rgba(255,255,255,.6)',marginBottom:'24px',maxWidth:'480px',margin:'0 auto 24px'}}>
                  Send your CV to <strong style={{color:'var(--gd2)'}}>spvbrh@gmail.com</strong> or call us. We are always looking for passionate educators.
                </div>
                <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
                  <a href="mailto:spvbrh@gmail.com" style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'12px 28px',borderRadius:'50px',background:'linear-gradient(135deg,var(--or),var(--gd))',color:'#fff',textDecoration:'none',fontFamily:"'DM Sans',sans-serif",fontSize:'13.5px',fontWeight:'800',boxShadow:'0 6px 20px rgba(232,118,26,.4)'}}>
                    <FaEnvelope size={13}/> Email Your CV
                  </a>
                  <a href="tel:+919198783830" style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'12px 28px',borderRadius:'50px',border:'1.5px solid rgba(255,255,255,.2)',color:'rgba(255,255,255,.85)',textDecoration:'none',fontFamily:"'DM Sans',sans-serif",fontSize:'13.5px',fontWeight:'700'}}>
                    <FaPhone size={13}/> Call +91 9198783830
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selected && <JobApplyForm job={selected} onClose={function(){setSelected(null)}} />}
    </>
  )
}