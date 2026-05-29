import { useState, useEffect } from 'react'
import { testimonialAPI } from '../../api'
import { FaComments, FaCheckCircle, FaTimesCircle, FaSpinner, FaMedal, FaStar, FaPencilAlt, FaTrash, FaSearch } from 'react-icons/fa'

var TYPES   = ['All','Parent','Student','Alumni','Teacher']
var RATINGS = [5,4,3,2,1]
var TYPE_CLR= { Parent:'#E8761A', Student:'#22a35a', Alumni:'#6C3FC5', Teacher:'#C45F0A' }
var EMPTY = { name:'', type:'Parent', role:'', rating:5, message:'', approved:true }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inf(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inb(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }
function starStr(n){ return Array.from({length:5},function(_,i){ return i<n?'⭐':'☆' }).join('') }
function avatar(name){ return (name||'?').split(' ').slice(0,2).map(function(w){ return w[0] }).join('').toUpperCase() }

export default function ManageTestimonialsPage() {
  var [items,   setItems]   = useState([])
  var [loading, setLoading] = useState(true)
  var [saving,  setSaving]  = useState(false)
  var [toast,   setToast]   = useState(null)
  var [filter,  setFilter]  = useState('All')
  var [search,  setSearch]  = useState('')
  var [modal,   setModal]   = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId,  setEditId]  = useState(null)
  var [delId,   setDelId]   = useState(null)

  function fetchItems() {
    setLoading(true)
    var BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
    var token = localStorage.getItem('spvs_token')
    fetch(BASE + '/testimonials/all', { headers: token ? { Authorization:'Bearer '+token } : {} })
      .then(function(r){ return r.json() })
      .then(function(res){
        if (res.success) { setItems(res.data||[]); setLoading(false) }
        else return testimonialAPI.getAll().then(function(r2){ setItems(r2.data||[]); setLoading(false) })
      })
      .catch(function(){
        testimonialAPI.getAll()
          .then(function(res){ setItems(res.data||[]); setLoading(false) })
          .catch(function(err){ showToast(err.message,'error'); setLoading(false) })
      })
  }
  useEffect(fetchItems, [])

  function showToast(msg,type){ setToast({msg,type:type||'success'}); setTimeout(function(){setToast(null)},3000) }

  var visible = items.filter(function(t){
    var mf = filter==='All' || t.type===filter
    var ms = (t.name||'').toLowerCase().includes(search.toLowerCase()) || (t.message||'').toLowerCase().includes(search.toLowerCase())
    return mf && ms
  })

  var approved = items.filter(function(t){ return t.approved }).length
  var avg = items.length ? (items.reduce(function(a,t){ return a+(t.rating||5) },0)/items.length).toFixed(1) : '5.0'

  function openAdd()   { setCurrent(EMPTY); setModal('add') }
  function openEdit(t) { setCurrent({ name:t.name, type:t.type||'Parent', role:t.role||'', rating:t.rating||5, message:t.message||'', approved:t.approved||false }); setEditId(t._id); setModal('edit') }
  function openDel(id) { setDelId(id); setModal('delete') }
  function closeModal(){ setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null) }
  function handleChange(e){ var k=e.target.name,v=e.target.type==='checkbox'?e.target.checked:e.target.value; setCurrent(function(p){ var n={...p}; n[k]=v; return n }) }

  async function handleSave() {
    if (!current.name.trim()||!current.message.trim()) return
    setSaving(true)
    try {
      var body = { name:current.name, type:current.type, role:current.role, rating:Number(current.rating), message:current.message, approved:current.approved }
      var BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
      var token = localStorage.getItem('spvs_token')
      var r = await fetch(BASE + '/testimonials' + (modal==='edit' ? '/'+editId : ''), {
        method: modal==='add' ? 'POST' : 'PUT',
        headers: { 'Content-Type':'application/json', ...(token?{Authorization:'Bearer '+token}:{}) },
        body: JSON.stringify(body)
      })
      var data = await r.json()
      if (!data.success) throw new Error(data.message)
      if (modal==='add') setItems(function(p){ return [data.data,...p] })
      else setItems(function(p){ return p.map(function(x){ return x._id===editId?data.data:x }) })
      showToast(modal==='add'?'Testimonial added!':'Testimonial updated!')
      closeModal()
    } catch(err) { showToast(err.message,'error') }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await testimonialAPI.delete(delId)
      setItems(function(p){ return p.filter(function(x){ return x._id!==delId }) })
      showToast('Deleted'); closeModal()
    } catch(err) { showToast(err.message,'error') }
  }

  async function toggleApproved(t) {
    try {
      var BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
      var token = localStorage.getItem('spvs_token')
      var r = await fetch(BASE + '/testimonials/' + t._id, {
        method:'PUT', headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},
        body: JSON.stringify({ approved: !t.approved })
      })
      var data = await r.json()
      if (data.success) setItems(function(p){ return p.map(function(x){ return x._id===t._id?data.data:x }) })
    } catch(err) { showToast(err.message,'error') }
  }

  var STATS = [
    { label:'Total',      value:loading?'...':items.length,            icon:<FaComments size={18} color="#E8761A"/>, clr:'#E8761A' },
    { label:'Approved',   value:loading?'...':approved,                icon:<FaCheckCircle size={18} color="#22a35a"/>, clr:'#22a35a' },
    { label:'Pending',    value:loading?'...':(items.length-approved), icon:<FaSpinner size={18} color="#C45F0A"/>,  clr:'#C45F0A' },
    { label:'Avg Rating', value:avg+'★',                               icon:<FaMedal size={18} color="#6C3FC5"/>,    clr:'#6C3FC5' },
  ]

  return (
    <div style={{maxWidth:'1100px',width:'100%',boxSizing:'border-box'}}>
      <style>{`
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
        .mtp-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }
        .mtp-filters { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .mtp-cats { display:flex; gap:6px; flex-wrap:wrap; }
        .mtp-mgrid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media (max-width:640px) {
          .mtp-stats { grid-template-columns:1fr 1fr; gap:8px; }
          .mtp-filters { flex-direction:column; align-items:stretch; gap:8px; }
          .mtp-search { max-width:100% !important; width:100% !important; box-sizing:border-box; }
          .mtp-cats-wrap { width:100%; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
          .mtp-cats-wrap::-webkit-scrollbar { display:none; }
          .mtp-cats { flex-wrap:nowrap !important; width:max-content; }
          .mtp-mgrid { grid-template-columns:1fr; }
        }
      `}</style>

      {toast && (
        <div style={{position:'fixed',top:'20px',right:'20px',zIndex:2000,padding:'12px 20px',borderRadius:'12px',background:toast.type==='error'?'#dc2626':'#22a35a',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700',boxShadow:'0 8px 24px rgba(0,0,0,.2)',animation:'slideIn .3s ease',display:'inline-flex',alignItems:'center',gap:'7px'}}>
          {toast.type==='error'?<FaTimesCircle size={13}/>:<FaCheckCircle size={13}/>} {toast.msg}
        </div>
      )}

      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'24px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,26px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 5px',display:'inline-flex',alignItems:'center',gap:'10px'}}>
            <FaComments size={22} color="#E8761A"/> Testimonials
          </h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage reviews shown on the website</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 20px',fontSize:'14px',whiteSpace:'nowrap'}}>+ Add Testimonial</button>
      </div>

      <div className="mtp-stats">
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
        <div className="mtp-filters">
          <div style={{position:'relative'}}>
            <FaSearch size={13} color="#B87832" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input className="mtp-search" value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search testimonials..."
              style={{...s.inp,maxWidth:'220px',padding:'9px 13px 9px 32px'}} onFocus={inf} onBlur={inb} />
          </div>
          <div className="mtp-cats-wrap">
            <div className="mtp-cats">
              {TYPES.map(function(f){
                var isA=filter===f
                return <button key={f} onClick={function(){setFilter(f)}} style={{padding:'7px 13px',borderRadius:'8px',border:'1.5px solid',borderColor:isA?'#E8761A':'rgba(232,118,26,.2)',background:isA?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isA?'#fff':'#7A4010',fontSize:'12px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap',transition:'all .15s',flexShrink:0}}>{f}</button>
              })}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{...s.card,textAlign:'center',padding:'60px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
          <FaSpinner size={20} color="#E8761A" style={{animation:'spin .8s linear infinite'}}/> Loading testimonials...
        </div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {visible.length===0 && <div style={{...s.card,textAlign:'center',padding:'48px',color:'#B87832'}}>No testimonials found</div>}
          {visible.map(function(t){
            var tc = TYPE_CLR[t.type]||'#E8761A'
            return (
              <div key={t._id} style={{...s.card,transition:'all .2s'}}
                onMouseEnter={function(e){e.currentTarget.style.boxShadow='0 8px 28px rgba(232,118,26,.1)'}}
                onMouseLeave={function(e){e.currentTarget.style.boxShadow='0 4px 16px rgba(232,118,26,.06)'}}>
                <div style={{display:'flex',gap:'14px',alignItems:'flex-start',flexWrap:'wrap'}}>
                  <div style={{width:'46px',height:'46px',borderRadius:'13px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'800',color:'#fff',flexShrink:0}}>{avatar(t.name)}</div>
                  <div style={{flex:1,minWidth:'200px'}}>
                    <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap',marginBottom:'4px'}}>
                      <span style={{fontSize:'14px',fontWeight:'700',color:'#1C0A00'}}>{t.name}</span>
                      {t.type && <span style={{padding:'2px 9px',borderRadius:'20px',fontSize:'10.5px',fontWeight:'800',background:tc+'15',color:tc}}>{t.type}</span>}
                      <span style={{fontSize:'12px',color:'#F5B800',letterSpacing:'1px'}}>{starStr(t.rating||5)}</span>
                    </div>
                    {t.role && <div style={{fontSize:'11.5px',color:'#B87832',marginBottom:'8px'}}>{t.role}</div>}
                    <div style={{fontSize:'13px',color:'#3D1A00',lineHeight:'1.65',fontStyle:'italic'}}>"{t.message}"</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'6px',flexShrink:0}}>
                    <button onClick={function(){toggleApproved(t)}} style={{padding:'5px 11px',borderRadius:'8px',border:'none',fontSize:'11px',fontWeight:'800',cursor:'pointer',background:t.approved?'rgba(34,163,90,.12)':'rgba(196,95,10,.12)',color:t.approved?'#22a35a':'#C45F0A',whiteSpace:'nowrap',transition:'all .2s',display:'inline-flex',alignItems:'center',gap:'5px'}}>
                      {t.approved ? <><FaCheckCircle size={10}/> Approved</> : <><FaSpinner size={10}/> Pending</>}
                    </button>
                    <div style={{display:'flex',gap:'5px'}}>
                      <button onClick={function(){openEdit(t)}} style={{flex:1,padding:'5px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>
                        <FaPencilAlt size={13} color="#7A4010"/>
                      </button>
                      <button onClick={function(){openDel(t._id)}} style={{flex:1,padding:'5px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}} onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>
                        <FaTrash size={13} color="#dc2626"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {(modal==='add'||modal==='edit') && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.2)',padding:'clamp(18px,4vw,30px)',width:'100%',maxWidth:'540px',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(28,10,0,.2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(16px,4vw,20px)',fontWeight:'700',color:'#1C0A00',margin:0,display:'inline-flex',alignItems:'center',gap:'8px'}}>
                {modal==='add' ? <><FaComments size={16} color="#E8761A"/> Add Testimonial</> : <><FaPencilAlt size={16} color="#E8761A"/> Edit Testimonial</>}
              </h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div><label style={s.label}>Full Name *</label><input name="name" value={current.name} onChange={handleChange} placeholder="Reviewer name..." style={s.inp} onFocus={inf} onBlur={inb} /></div>
              <div className="mtp-mgrid">
                <div><label style={s.label}>Type</label><select name="type" value={current.type} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>{TYPES.filter(function(t){return t!=='All'}).map(function(t){return <option key={t}>{t}</option>})}</select></div>
                <div><label style={s.label}>Rating</label><select name="rating" value={current.rating} onChange={handleChange} style={s.inp} onFocus={inf} onBlur={inb}>{RATINGS.map(function(r){return <option key={r} value={r}>{r} Star{r!==1?'s':''}</option>})}</select></div>
              </div>
              <div><label style={s.label}>Role / Relation</label><input name="role" value={current.role} onChange={handleChange} placeholder="e.g. Parent of Class IX student" style={s.inp} onFocus={inf} onBlur={inb} /></div>
              <div><label style={s.label}>Testimonial Text *</label><textarea name="message" value={current.message} onChange={handleChange} rows={4} placeholder="What they said about SPV..." style={{...s.inp,resize:'vertical'}} onFocus={inf} onBlur={inb} /></div>
              <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'12px 14px',borderRadius:'10px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.15)'}}>
                <input type="checkbox" name="approved" id="appr" checked={current.approved} onChange={handleChange} style={{width:'16px',height:'16px',accentColor:'#E8761A'}} />
                <label htmlFor="appr" style={{fontSize:'13px',fontWeight:'600',color:'#7A4010',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:'6px'}}><FaCheckCircle size={13} color="#22a35a"/> Approved — show on website</label>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'20px',flexWrap:'wrap'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?.7:1,display:'inline-flex',alignItems:'center',gap:'7px'}}>
                {saving ? <><FaSpinner size={13} style={{animation:'spin .8s linear infinite'}}/> Saving...</> : modal==='add' ? '+ Add' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'28px',width:'100%',maxWidth:'380px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <FaTrash size={44} color="#dc2626" style={{marginBottom:'12px'}}/>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Testimonial?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 20px'}}>This testimonial will be permanently removed.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)',padding:'11px 22px'}}>Cancel</button>
              <button onClick={handleDelete} style={{...s.btn,background:'linear-gradient(135deg,#dc2626,#ef4444)',color:'#fff',padding:'11px 22px',boxShadow:'0 4px 14px rgba(220,38,38,.3)'}}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}