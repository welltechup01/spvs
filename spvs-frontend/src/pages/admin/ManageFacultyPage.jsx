import { useState, useEffect } from 'react'
import { facultyAPI } from '../../api'
import {
  FaChalkboardTeacher, FaUsers, FaCheckCircle, FaUmbrellaBeach, FaLandmark,
  FaTimesCircle, FaPencilAlt, FaTrash, FaSpinner, FaUser, FaFolder, FaSearch,
} from 'react-icons/fa'

var DEPTS = ['All','Science','Mathematics','English','Hindi','Social Science','Computer Science','Physical Education','Arts','Commerce','Administration']
var ROLES = ['Director','Principal','Vice Principal','PGT','TGT','PRT','Lab Assistant','Librarian','Sports Coach','Admin Staff']
var QUAL  = ['M.Sc., B.Ed','M.A., B.Ed','B.Sc., B.Ed','M.Com., B.Ed','M.P.Ed','B.Tech','MCA','M.A.','Ph.D','MBA','M.Sc., LT','B.A., B.PEd','M.A., B.PEd','B.Com., B.Lib','M.A., D.EL.Ed','Other']
var ROLE_CLR = { Director:'#C45F0A', Principal:'#E8761A', 'Vice Principal':'#C45F0A', PGT:'#6C3FC5', TGT:'#22a35a', PRT:'#E94F37', 'Lab Assistant':'#F5B800', Librarian:'#7A4010', 'Sports Coach':'#22a35a', 'Admin Staff':'#B87832' }
var EMPTY = { name:'', role:'TGT', dept:'Science', qual:'M.Sc., B.Ed', exp:'', phone:'', email:'', status:'Active' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }
function avatar(name){ return (name||'?').replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Sh\.)\s*/i,'').split(' ').slice(0,2).map(function(w){return w[0]}).join('').toUpperCase() }

export default function ManageFacultyPage() {
  var [staff,   setStaff]   = useState([])
  var [loading, setLoading] = useState(true)
  var [saving,  setSaving]  = useState(false)
  var [toast,   setToast]   = useState(null)
  var [deptF,   setDeptF]   = useState('All')
  var [search,  setSearch]  = useState('')
  var [modal,   setModal]   = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId,  setEditId]  = useState(null)
  var [delId,   setDelId]   = useState(null)
  var [imgFile, setImgFile] = useState(null)

  function fetchStaff() {
    setLoading(true)
    facultyAPI.getAll()
      .then(function(res){ setStaff(res.data||[]); setLoading(false) })
      .catch(function(err){ showToast(err.message,'error'); setLoading(false) })
  }
  useEffect(fetchStaff, [])

  function showToast(msg,type){ setToast({msg,type:type||'success'}); setTimeout(function(){setToast(null)},3000) }

  var visible = staff.filter(function(f){
    var md = deptF==='All' || f.dept===deptF
    var ms = (f.name||'').toLowerCase().includes(search.toLowerCase()) || (f.role||'').toLowerCase().includes(search.toLowerCase())
    return md && ms
  })

  function openAdd()   { setCurrent(EMPTY); setImgFile(null); setModal('add') }
  function openEdit(f) {
    setCurrent({ name:f.name, role:f.role||'TGT', dept:f.dept||'Science', qual:f.qual||'M.Sc., B.Ed', exp:f.exp||'', phone:f.phone||'', email:f.email||'', status:f.status||'Active', image:f.image||'' })
    setEditId(f._id); setImgFile(null); setModal('edit')
  }
  function openDel(id) { setDelId(id); setModal('delete') }
  function closeModal(){ setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setImgFile(null) }
  function handleChange(e){ var k=e.target.name,v=e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  async function handleSave() {
    if (!current.name.trim()) return
    setSaving(true)
    try {
      var fd = new FormData()
      fd.append('name',   current.name); fd.append('role',   current.role)
      fd.append('dept',   current.dept); fd.append('qual',   current.qual)
      fd.append('exp',    current.exp);  fd.append('phone',  current.phone)
      fd.append('email',  current.email); fd.append('status', current.status)
      if (imgFile) fd.append('image', imgFile)
      else if (current.image && !current.image.startsWith('data:')) fd.append('image', current.image)
      if (modal==='add') {
        var res = await facultyAPI.create(fd)
        setStaff(function(p){ return [res.data,...p] }); showToast('Faculty added!')
      } else {
        var res2 = await facultyAPI.update(editId, fd)
        setStaff(function(p){ return p.map(function(x){ return x._id===editId?res2.data:x }) }); showToast('Faculty updated!')
      }
      closeModal()
    } catch(err) { showToast(err.message,'error') }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await facultyAPI.delete(delId)
      setStaff(function(p){ return p.filter(function(x){ return x._id!==delId }) })
      showToast('Faculty removed'); closeModal()
    } catch(err) { showToast(err.message,'error') }
  }

  async function toggleStatus(f) {
    try {
      var fd = new FormData(); fd.append('status', f.status==='Active'?'On Leave':'Active')
      var res = await facultyAPI.update(f._id, fd)
      setStaff(function(p){ return p.map(function(x){ return x._id===f._id?res.data:x }) })
    } catch(err) { showToast(err.message,'error') }
  }

  var active  = staff.filter(function(f){ return f.status==='Active' }).length
  var onLeave = staff.filter(function(f){ return f.status==='On Leave' }).length

  var STATS = [
    { label:'Total Staff',  value:loading?'...':staff.length,  icon:<FaUsers size={18} color="#E8761A"/>,              clr:'#E8761A' },
    { label:'Active',       value:loading?'...':active,         icon:<FaCheckCircle size={18} color="#22a35a"/>,        clr:'#22a35a' },
    { label:'On Leave',     value:loading?'...':onLeave,        icon:<FaUmbrellaBeach size={18} color="#C45F0A"/>,      clr:'#C45F0A' },
    { label:'Departments',  value:loading?'...':[...new Set(staff.map(function(f){return f.dept}))].length, icon:<FaLandmark size={18} color="#6C3FC5"/>, clr:'#6C3FC5' },
  ]

  return (
    <div style={{maxWidth:'1100px',width:'100%',boxSizing:'border-box'}}>
      <style>{`
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
        .mfp-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }
        .mfp-filters { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .mfp-cats { display:flex; gap:6px; flex-wrap:wrap; }
        .mfp-tbl { overflow-x:auto; }
        .mfp-mgrid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media (max-width:640px) {
          .mfp-stats { grid-template-columns:1fr 1fr; gap:8px; }
          .mfp-filters { flex-direction:column; align-items:stretch; gap:8px; }
          .mfp-search { max-width:100% !important; width:100% !important; box-sizing:border-box; }
          .mfp-cats-wrap { width:100%; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
          .mfp-cats-wrap::-webkit-scrollbar { display:none; }
          .mfp-cats { flex-wrap:nowrap !important; width:max-content; }
          .mfp-mgrid { grid-template-columns:1fr; }
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
            <FaChalkboardTeacher size={22} color="#E8761A"/> Faculty Management
          </h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage all teaching and non-teaching staff records</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 20px',fontSize:'14px',whiteSpace:'nowrap'}}>+ Add Faculty</button>
      </div>

      <div className="mfp-stats">
        {STATS.map(function(st){
          return (
            <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'12px',padding:'16px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'11px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'11.5px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="mfp-filters">
          <div style={{position:'relative'}}>
            <FaSearch size={13} color="#B87832" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input className="mfp-search" value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search by name or role..."
              style={{...s.inp,maxWidth:'230px',padding:'9px 13px 9px 32px'}} onFocus={inf} onBlur={inb} />
          </div>
          <div className="mfp-cats-wrap">
            <div className="mfp-cats">
              {DEPTS.map(function(d){
                var isA=deptF===d
                return <button key={d} onClick={function(){setDeptF(d)}} style={{padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'11.5px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap',transition:'all .15px',flexShrink:0}}>{d}</button>
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={s.card}>
        {loading ? (
          <div style={{textAlign:'center',padding:'60px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <FaSpinner size={20} color="#E8761A" style={{animation:'spin .8s linear infinite'}}/> Loading faculty...
          </div>
        ) : (
          <div className="mfp-tbl">
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'700px'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['Faculty','Role','Department','Qualification','Exp','Contact','Status','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length===0 && <tr><td colSpan={8} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No faculty found</td></tr>}
                {visible.map(function(f,i){
                  var rc = ROLE_CLR[f.role]||'#E8761A'
                  return (
                    <tr key={f._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                          {f.image ? <img src={f.image} alt={f.name} style={{width:'36px',height:'36px',borderRadius:'9px',objectFit:'cover',flexShrink:0,border:'2px solid rgba(232,118,26,.2)'}} /> : <div style={{width:'36px',height:'36px',borderRadius:'9px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'800',color:'#fff',flexShrink:0}}>{avatar(f.name)}</div>}
                          <span style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',whiteSpace:'nowrap'}}>{f.name}</span>
                        </div>
                      </td>
                      <td style={{padding:'10px 12px'}}><span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',background:rc+'15',color:rc,whiteSpace:'nowrap'}}>{f.role}</span></td>
                      <td style={{padding:'10px 12px',fontSize:'12.5px',color:'#3D1A00',fontWeight:'600',whiteSpace:'nowrap'}}>{f.dept}</td>
                      <td style={{padding:'10px 12px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{f.qual}</td>
                      <td style={{padding:'10px 12px',fontSize:'12.5px',color:'#7A4010',fontWeight:'600',whiteSpace:'nowrap'}}>{f.exp||'—'}</td>
                      <td style={{padding:'10px 12px'}}><div style={{fontSize:'11.5px',color:'#7A4010'}}>{f.phone||'—'}</div>{f.email&&<div style={{fontSize:'11px',color:'#B87832'}}>{f.email}</div>}</td>
                      <td style={{padding:'10px 12px'}}>
                        <button onClick={function(){toggleStatus(f)}} style={{padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:f.status==='Active'?'rgba(34,163,90,.12)':'rgba(196,95,10,.12)',color:f.status==='Active'?'#22a35a':'#C45F0A',transition:'all .2s',whiteSpace:'nowrap',display:'inline-flex',alignItems:'center',gap:'5px'}}>
                          {f.status==='Active' ? <><FaCheckCircle size={10}/> Active</> : <><FaUmbrellaBeach size={10}/> On Leave</>}
                        </button>
                      </td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{display:'flex',gap:'6px'}}>
                          <button onClick={function(){openEdit(f)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>
                            <FaPencilAlt size={13} color="#7A4010"/>
                          </button>
                          <button onClick={function(){openDel(f._id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>
                            <FaTrash size={13} color="#dc2626"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'clamp(18px,4vw,30px)',width:'100%',maxWidth:'560px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,4vw,20px)',fontWeight:'700',color:'#1C0A00',margin:0,display:'inline-flex',alignItems:'center',gap:'8px'}}>
                {modal==='add' ? <><FaChalkboardTeacher size={16} color="#E8761A"/> Add Faculty</> : <><FaPencilAlt size={16} color="#E8761A"/> Edit Faculty</>}
              </h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'13px'}}>
              <div><label style={s.label}>Full Name *</label><input name="name" value={current.name} onChange={handleChange} placeholder="Faculty full name..." style={s.inp} onFocus={inf} onBlur={inb} /></div>
              <div className="mfp-mgrid">
                <div><label style={s.label}>Role</label><select name="role" value={current.role} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>{ROLES.map(function(r){return <option key={r}>{r}</option>})}</select></div>
                <div><label style={s.label}>Department</label><select name="dept" value={current.dept} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>{DEPTS.filter(function(d){return d!=='All'}).map(function(d){return <option key={d}>{d}</option>})}</select></div>
              </div>
              <div className="mfp-mgrid">
                <div><label style={s.label}>Qualification</label><select name="qual" value={current.qual} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>{QUAL.map(function(q){return <option key={q}>{q}</option>})}</select></div>
                <div><label style={s.label}>Experience</label><input name="exp" value={current.exp} onChange={handleChange} placeholder="e.g. 10 yrs" style={s.inp} onFocus={inf} onBlur={inb} /></div>
              </div>
              <div className="mfp-mgrid">
                <div><label style={s.label}>Phone</label><input name="phone" value={current.phone} onChange={handleChange} placeholder="10-digit number" style={s.inp} onFocus={inf} onBlur={inb} /></div>
                <div><label style={s.label}>Email</label><input name="email" value={current.email} onChange={handleChange} placeholder="email@spv.edu" style={s.inp} onFocus={inf} onBlur={inb} /></div>
              </div>
              <div><label style={s.label}>Status</label><select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}><option>Active</option><option>On Leave</option></select></div>
              <div>
                <label style={s.label}>Faculty Photo</label>
                <div style={{border:'2px dashed rgba(232,118,26,.25)',borderRadius:'12px',padding:'14px',background:'rgba(232,118,26,.03)'}}>
                  {(imgFile||current.image) ? (
                    <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px'}}>
                      <img src={imgFile?URL.createObjectURL(imgFile):current.image} alt="Preview" style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:'10px',border:'2px solid rgba(232,118,26,.2)',flexShrink:0}} />
                      <button onClick={function(){setImgFile(null);setCurrent(function(p){return{...p,image:''}})}} style={{padding:'5px 12px',borderRadius:'7px',border:'1.5px solid rgba(220,38,38,.2)',background:'rgba(254,242,242,.7)',color:'#dc2626',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>Remove</button>
                    </div>
                  ) : (
                    <div style={{textAlign:'center',padding:'8px 0 10px'}}>
                      <FaUser size={28} color="#B87832" style={{marginBottom:'4px'}}/>
                      <div style={{fontSize:'12px',color:'#B87832',fontWeight:'600'}}>Upload faculty photo</div>
                    </div>
                  )}
                  <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'9px 14px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.25)',background:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:'700',color:'#E8761A',marginBottom:'8px'}}>
                    <FaFolder size={13}/> Upload Photo
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={function(e){var f=e.target.files&&e.target.files[0];if(f){setImgFile(f);setCurrent(function(p){return{...p,image:''}})}}} />
                  </label>
                  <input name="image" value={imgFile?'':(current.image||'')} onChange={handleChange} placeholder="Or paste photo URL..." style={{...s.inp,fontSize:'12px'}} onFocus={inf} onBlur={inb} />
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'20px',flexWrap:'wrap'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?.7:1,display:'inline-flex',alignItems:'center',gap:'7px'}}>
                {saving ? <><FaSpinner size={13} style={{animation:'spin .8s linear infinite'}}/> Saving...</> : modal==='add' ? '+ Add Faculty' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'28px',width:'100%',maxWidth:'380px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <FaTrash size={44} color="#dc2626" style={{marginBottom:'12px'}}/>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Remove Faculty?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 20px'}}>This faculty record will be permanently deleted.</p>
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