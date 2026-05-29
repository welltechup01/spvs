import { useState, useEffect } from 'react'
import { transportAPI } from '../../api'
import { FaBus, FaCheckCircle, FaTimesCircle, FaTools, FaUsers, FaChair, FaPencilAlt, FaTrash, FaSearch, FaSpinner } from 'react-icons/fa'

var AREAS    = ['All','Bahraich City','Nanpara','Kaiserganj','Mihinpurwa','Jarwal','Bhinga','Shravasti','Balrampur']
var STATUSES = ['Active','Inactive','Under Repair']
var STATUS_CLR = { Active:'#22a35a', Inactive:'#C45F0A', 'Under Repair':'#dc2626' }

var EMPTY = { busNo:'', route:'', area:'Bahraich City', driver:'', driverPhone:'', conductor:'', capacity:42, students:0, stops:'', departs:'7:00 AM', returns:'2:30 PM', status:'Active' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }

function StatusBadge({ status }) {
  var sc = STATUS_CLR[status]||'#22a35a'
  var icon = status==='Active' ? <FaCheckCircle size={10}/> : status==='Inactive' ? <FaTimesCircle size={10}/> : <FaTools size={10}/>
  return (
    <span style={{padding:'4px 10px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:sc+'12',color:sc,whiteSpace:'nowrap',display:'inline-flex',alignItems:'center',gap:'4px'}}>
      {icon} {status}
    </span>
  )
}

export default function ManageTransportPage() {
  var [buses,   setBuses]   = useState([])
  var [loading, setLoading] = useState(true)
  var [saving,  setSaving]  = useState(false)
  var [toast,   setToast]   = useState(null)
  var [filter,  setFilter]  = useState('All')
  var [search,  setSearch]  = useState('')
  var [view,    setView]    = useState('grid')
  var [modal,   setModal]   = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId,  setEditId]  = useState(null)
  var [delId,   setDelId]   = useState(null)

  function fetchBuses() {
    setLoading(true)
    transportAPI.getAll()
      .then(function(res){ setBuses(res.data||[]); setLoading(false) })
      .catch(function(err){ showToast(err.message,'error'); setLoading(false) })
  }
  useEffect(fetchBuses, [])

  function showToast(msg,type){ setToast({msg,type:type||'success'}); setTimeout(function(){setToast(null)},3000) }

  var visible = buses.filter(function(b){
    var ma = filter==='All' || b.area===filter || b.status===filter
    var ms = (b.route||'').toLowerCase().includes(search.toLowerCase()) ||
             (b.busNo||'').toLowerCase().includes(search.toLowerCase()) ||
             (b.driver||'').toLowerCase().includes(search.toLowerCase())
    return ma && ms
  })

  var totalStudents = buses.reduce(function(a,b){ return a+(Number(b.students)||0) },0)
  var totalCap      = buses.reduce(function(a,b){ return a+(Number(b.capacity)||0) },0)
  var active        = buses.filter(function(b){ return b.status==='Active' }).length

  function openAdd()   { setCurrent(EMPTY); setModal('add') }
  function openEdit(b) { setCurrent({ busNo:b.busNo, route:b.route, area:b.area||'Bahraich City', driver:b.driver||'', driverPhone:b.driverPhone||'', conductor:b.conductor||'', capacity:b.capacity||42, students:b.students||0, stops:b.stops||'', departs:b.departs||'7:00 AM', returns:b.returns||'2:30 PM', status:b.status||'Active' }); setEditId(b._id); setModal('edit') }
  function openDel(id) { setDelId(id); setModal('delete') }
  function closeModal(){ setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  async function handleSave() {
    if (!current.busNo.trim()||!current.route.trim()) return
    setSaving(true)
    try {
      var body = { ...current, capacity:Number(current.capacity), students:Number(current.students) }
      if (modal==='add') {
        var res = await transportAPI.create(body)
        setBuses(function(p){ return [res.data,...p] }); showToast('Bus route added!')
      } else {
        var res2 = await transportAPI.update(editId, body)
        setBuses(function(p){ return p.map(function(x){ return x._id===editId?res2.data:x }) }); showToast('Bus route updated!')
      }
      closeModal()
    } catch(err) { showToast(err.message,'error') }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await transportAPI.delete(delId)
      setBuses(function(p){ return p.filter(function(x){ return x._id!==delId }) })
      showToast('Bus route deleted'); closeModal()
    } catch(err) { showToast(err.message,'error') }
  }

  async function cycleStatus(b) {
    var next = b.status==='Active'?'Inactive':b.status==='Inactive'?'Under Repair':'Active'
    try {
      var res = await transportAPI.update(b._id, { status: next })
      setBuses(function(p){ return p.map(function(x){ return x._id===b._id?res.data:x }) })
    } catch(err) { showToast(err.message,'error') }
  }

  var STATS = [
    { label:'Total Buses',     value:loading?'...':buses.length, icon:<FaBus size={20} color="#E8761A"/>,        clr:'#E8761A' },
    { label:'Active Routes',   value:loading?'...':active,        icon:<FaCheckCircle size={20} color="#22a35a"/>,clr:'#22a35a' },
    { label:'Students Served', value:loading?'...':totalStudents, icon:<FaUsers size={20} color="#6C3FC5"/>,      clr:'#6C3FC5' },
    { label:'Total Capacity',  value:loading?'...':totalCap,      icon:<FaChair size={20} color="#C45F0A"/>,      clr:'#C45F0A' },
  ]

  return (
    <div style={{maxWidth:'1200px',width:'100%',boxSizing:'border-box'}}>
      <style>{`
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
        .mtr-stats  { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }
        .mtr-grid   { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:14px; }
        .mtr-tbl    { overflow-x:auto; }
        .mtr-filt   { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .mtr-cats   { display:flex; gap:6px; flex-wrap:wrap; }
        .mtr-mgrid2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .mtr-mgrid3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
        @media (max-width:640px) {
          .mtr-stats { grid-template-columns:1fr 1fr; gap:8px; }
          .mtr-filt { flex-direction:column; align-items:stretch; gap:8px; }
          .mtr-search { max-width:100% !important; width:100% !important; box-sizing:border-box; }
          .mtr-cats-wrap { width:100%; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
          .mtr-cats-wrap::-webkit-scrollbar { display:none; }
          .mtr-cats { flex-wrap:nowrap !important; width:max-content; }
          .mtr-mgrid2 { grid-template-columns:1fr; }
          .mtr-mgrid3 { grid-template-columns:1fr; }
        }
      `}</style>

      {toast && (
        <div style={{position:'fixed',top:'20px',right:'20px',zIndex:2000,padding:'12px 20px',borderRadius:'12px',background:toast.type==='error'?'#dc2626':'#22a35a',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',boxShadow:'0 8px 24px rgba(0,0,0,.2)',animation:'slideIn .3s ease',display:'inline-flex',alignItems:'center',gap:'7px'}}>
          {toast.type==='error' ? <FaTimesCircle size={13}/> : <FaCheckCircle size={13}/>} {toast.msg}
        </div>
      )}

      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px',display:'inline-flex',alignItems:'center',gap:'10px'}}>
            <FaBus size={22} color="#E8761A"/> Transport Management
          </h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage school bus routes, drivers and student capacity</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 20px',fontSize:'14px',whiteSpace:'nowrap'}}>+ Add Bus Route</button>
      </div>

      <div className="mtr-stats">
        {STATS.map(function(st){
          return (
            <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'12px',padding:'16px'}}>
              <div style={{width:'42px',height:'42px',borderRadius:'12px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'24px',fontWeight:'700',color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'12px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="mtr-filt">
          <div style={{position:'relative'}}>
            <FaSearch size={13} color="#B87832" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input className="mtr-search" value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search route, bus no, driver..." style={{...s.inp,maxWidth:'240px',padding:'9px 13px 9px 32px'}} onFocus={inf} onBlur={inb} />
          </div>
          <div className="mtr-cats-wrap">
            <div className="mtr-cats">
              {['All','Active','Inactive','Under Repair',...AREAS.filter(function(a){return a!=='All'})].map(function(f){
                var isA=filter===f
                return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 11px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap',transition:'all .15s',flexShrink:0}}>{f}</button>
              })}
            </div>
          </div>
          <div style={{display:'flex',gap:'5px',flexShrink:0}}>
            {['grid','list'].map(function(v){
              return <button key={v} onClick={function(){setView(v)}} style={{width:'34px',height:'34px',borderRadius:'8px',border:'1.5px solid',borderColor:view===v?'#E8761A':'rgba(232,118,26,.2)',background:view===v?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',cursor:'pointer',fontSize:'15px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>{v==='grid'?'⊞':'☰'}</button>
            })}
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{...s.card,textAlign:'center',padding:'60px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
          <FaSpinner size={20} color="#E8761A" style={{animation:'spin .8s linear infinite'}}/> Loading bus routes...
        </div>
      ) : view==='grid' ? (
        <div className="mtr-grid">
          {visible.length===0 && <div style={{...s.card,gridColumn:'1/-1',textAlign:'center',padding:'48px',color:'#B87832'}}>No buses found</div>}
          {visible.map(function(b){
            var sc  = STATUS_CLR[b.status]||'#22a35a'
            var pct = b.capacity ? Math.round(((b.students||0)/b.capacity)*100) : 0
            var barClr = pct>=90?'#dc2626':pct>=70?'#C45F0A':'#22a35a'
            return (
              <div key={b._id} style={{...s.card,transition:'all .25s'}}
                onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 10px 28px rgba(232,118,26,.12)'}}
                onMouseLeave={function(e){e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px'}}>
                      <FaBus size={20} color="#E8761A"/>
                      <span style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'#1C0A00'}}>{b.busNo}</span>
                    </div>
                    <div style={{fontSize:'12.5px',fontWeight:'700',color:'#7A4010'}}>{b.route}</div>
                  </div>
                  <button onClick={function(){cycleStatus(b)}} style={{padding:'4px 10px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',border:'none',cursor:'pointer',background:sc+'12',color:sc,whiteSpace:'nowrap',transition:'all .2s',display:'inline-flex',alignItems:'center',gap:'4px'}}>
                    <StatusBadge status={b.status}/>
                  </button>
                </div>
                <div style={{marginBottom:'12px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                    <span style={{fontSize:'11.5px',color:'#7A4010',fontWeight:'600'}}>Occupancy</span>
                    <span style={{fontSize:'12px',fontWeight:'800',color:barClr}}>{b.students||0}/{b.capacity} ({pct}%)</span>
                  </div>
                  <div style={{height:'6px',borderRadius:'3px',background:'rgba(232,118,26,.15)',overflow:'hidden'}}>
                    <div style={{height:'100%',width:pct+'%',background:barClr,borderRadius:'3px',transition:'width .5s'}} />
                  </div>
                </div>
                <div className="mtr-mgrid2" style={{marginBottom:'12px'}}>
                  <div style={{padding:'8px 10px',borderRadius:'9px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)'}}>
                    <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'2px'}}>Driver</div>
                    <div style={{fontSize:'12.5px',fontWeight:'700',color:'#1C0A00'}}>{b.driver||'—'}</div>
                    <div style={{fontSize:'11px',color:'#7A4010'}}>{b.driverPhone||''}</div>
                  </div>
                  <div style={{padding:'8px 10px',borderRadius:'9px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)'}}>
                    <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'2px'}}>Timings</div>
                    <div style={{fontSize:'12px',fontWeight:'700',color:'#1C0A00'}}>▶ {b.departs||'—'}</div>
                    <div style={{fontSize:'12px',color:'#7A4010'}}>◀ {b.returns||'—'}</div>
                  </div>
                </div>
                {b.stops && (
                  <div style={{padding:'8px 10px',borderRadius:'9px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.1)',marginBottom:'12px'}}>
                    <div style={{fontSize:'10px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'3px'}}>Stops</div>
                    <div style={{fontSize:'11.5px',color:'#7A4010',lineHeight:'1.5'}}>{b.stops}</div>
                  </div>
                )}
                <div style={{display:'flex',gap:'6px'}}>
                  <button onClick={function(){openEdit(b)}} style={{flex:1,padding:'8px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',color:'#E8761A',fontSize:'12.5px',fontWeight:'700',cursor:'pointer',transition:'all .15s',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'5px'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#E8761A';e.currentTarget.style.color='#fff'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA';e.currentTarget.style.color='#E8761A'}}>
                    <FaPencilAlt size={12}/> Edit
                  </button>
                  <button onClick={function(){openDel(b._id)}} style={{width:'36px',borderRadius:'9px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>
                    <FaTrash size={13} color="#dc2626"/>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={s.card}>
          <div className="mtr-tbl">
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'700px'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['Bus No','Route','Area','Driver','Students','Departs','Returns','Status','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length===0 && <tr><td colSpan={9} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No buses found</td></tr>}
                {visible.map(function(b,i){
                  var pct = b.capacity ? Math.round(((b.students||0)/b.capacity)*100) : 0
                  return (
                    <tr key={b._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}} onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                      <td style={{padding:'12px',fontSize:'13px',fontWeight:'700',color:'#1C0A00',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:'6px'}}><FaBus size={14} color="#E8761A"/>{b.busNo}</td>
                      <td style={{padding:'12px',fontSize:'12.5px',color:'#3D1A00',fontWeight:'600',maxWidth:'160px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.route}</td>
                      <td style={{padding:'12px'}}><span style={{padding:'3px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:'rgba(232,118,26,.1)',color:'#C45F0A',whiteSpace:'nowrap'}}>{b.area}</span></td>
                      <td style={{padding:'12px'}}><div style={{fontSize:'12.5px',fontWeight:'700',color:'#1C0A00'}}>{b.driver||'—'}</div>{b.driverPhone&&<div style={{fontSize:'11px',color:'#7A4010'}}>{b.driverPhone}</div>}</td>
                      <td style={{padding:'12px'}}><div style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00'}}>{b.students||0}/{b.capacity}</div><div style={{fontSize:'10.5px',color:'#B87832'}}>{pct}% full</div></td>
                      <td style={{padding:'12px',fontSize:'12.5px',color:'#7A4010',whiteSpace:'nowrap'}}>{b.departs||'—'}</td>
                      <td style={{padding:'12px',fontSize:'12.5px',color:'#7A4010',whiteSpace:'nowrap'}}>{b.returns||'—'}</td>
                      <td style={{padding:'12px'}}><button onClick={function(){cycleStatus(b)}} style={{padding:'0',background:'none',border:'none',cursor:'pointer'}}><StatusBadge status={b.status}/></button></td>
                      <td style={{padding:'12px'}}>
                        <div style={{display:'flex',gap:'6px'}}>
                          <button onClick={function(){openEdit(b)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}><FaPencilAlt size={13} color="#7A4010"/></button>
                          <button onClick={function(){openDel(b._id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}><FaTrash size={13} color="#dc2626"/></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'clamp(18px,4vw,30px)',width:'100%',maxWidth:'580px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,4vw,20px)',fontWeight:'700',color:'#1C0A00',margin:0,display:'inline-flex',alignItems:'center',gap:'8px'}}>
                {modal==='add' ? <><FaBus size={16} color="#E8761A"/> Add Bus Route</> : <><FaPencilAlt size={16} color="#E8761A"/> Edit Bus Route</>}
              </h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'13px'}}>
              <div className="mtr-mgrid2">
                <div><label style={s.label}>Bus Number *</label><input name="busNo" value={current.busNo} onChange={handleChange} placeholder="e.g. UP 41 T 1001" style={s.inp} onFocus={inf} onBlur={inb} /></div>
                <div><label style={s.label}>Area / Region</label><select name="area" value={current.area} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>{AREAS.filter(function(a){return a!=='All'}).map(function(a){return <option key={a}>{a}</option>})}</select></div>
              </div>
              <div><label style={s.label}>Route Name *</label><input name="route" value={current.route} onChange={handleChange} placeholder="e.g. Route A — City Centre" style={s.inp} onFocus={inf} onBlur={inb} /></div>
              <div className="mtr-mgrid2">
                <div><label style={s.label}>Driver Name</label><input name="driver" value={current.driver} onChange={handleChange} placeholder="Driver full name" style={s.inp} onFocus={inf} onBlur={inb} /></div>
                <div><label style={s.label}>Driver Phone</label><input name="driverPhone" value={current.driverPhone} onChange={handleChange} placeholder="10-digit number" style={s.inp} onFocus={inf} onBlur={inb} /></div>
              </div>
              <div><label style={s.label}>Conductor Name</label><input name="conductor" value={current.conductor} onChange={handleChange} placeholder="Conductor name" style={s.inp} onFocus={inf} onBlur={inb} /></div>
              <div className="mtr-mgrid3">
                <div><label style={s.label}>Capacity</label><input name="capacity" type="number" value={current.capacity} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} /></div>
                <div><label style={s.label}>Students</label><input name="students" type="number" value={current.students} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb} /></div>
                <div><label style={s.label}>Status</label><select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>{STATUSES.map(function(st){return <option key={st}>{st}</option>})}</select></div>
              </div>
              <div className="mtr-mgrid2">
                <div><label style={s.label}>Departure Time</label><input name="departs" value={current.departs} onChange={handleChange} placeholder="e.g. 7:00 AM" style={s.inp} onFocus={inf} onBlur={inb} /></div>
                <div><label style={s.label}>Return Time</label><input name="returns" value={current.returns} onChange={handleChange} placeholder="e.g. 2:30 PM" style={s.inp} onFocus={inf} onBlur={inb} /></div>
              </div>
              <div><label style={s.label}>Bus Stops (comma separated)</label><textarea name="stops" value={current.stops} onChange={handleChange} rows={3} placeholder="Stop 1, Stop 2, Stop 3, SPV Gate" style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} /></div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'20px',flexWrap:'wrap'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?.7:1,display:'inline-flex',alignItems:'center',gap:'7px'}}>
                {saving?<><FaSpinner size={13} style={{animation:'spin .8s linear infinite'}}/> Saving...</>:modal==='add'?'+ Add Route':'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'28px',width:'100%',maxWidth:'380px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <FaTrash size={44} color="#dc2626" style={{marginBottom:'12px'}}/>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Remove Bus Route?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 20px'}}>This bus route record will be permanently deleted.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'11px 22px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn,background:'linear-gradient(135deg,#dc2626,#ef4444)',color:'#fff',padding:'11px 22px',boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}