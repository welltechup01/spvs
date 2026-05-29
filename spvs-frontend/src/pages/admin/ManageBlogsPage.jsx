import { useState, useEffect } from 'react'
import { blogAPI } from '../../api'
import { FaNewspaper, FaCheckCircle, FaFileAlt, FaTimesCircle, FaPencilAlt, FaTrash, FaSpinner, FaImages, FaFolder, FaSearch } from 'react-icons/fa'

var CATS = ['Academic','Achievement','Event','Holiday','Competition','Notice','Sports','Admission','General']
var CAT_CLR = { Academic:'#6C3FC5', Achievement:'#E8761A', Event:'#22a35a', Notice:'#C45F0A', Sports:'#E8761A', Admission:'#6C3FC5', Holiday:'#22a35a', Competition:'#E94F37', General:'#B87832' }
var EMPTY = { title:'', category:'Academic', status:'Published', author:'SPV Admin', excerpt:'', content:'', image:'' }

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', padding:'22px', boxShadow:'0 4px 16px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'7px' },
  inp:   { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s' },
  btn:   { padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'700', transition:'all .2s' },
}
function inp_focus(e){ e.target.style.borderColor='#E8761A'; e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)' }
function inp_blur(e){ e.target.style.borderColor='rgba(232,118,26,.2)'; e.target.style.boxShadow='none' }
function formatDate(d) { if (!d) return ''; return new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) }

export default function ManageBlogsPage() {
  var [posts,   setPosts]   = useState([])
  var [loading, setLoading] = useState(true)
  var [saving,  setSaving]  = useState(false)
  var [error,   setError]   = useState(null)
  var [toast,   setToast]   = useState(null)
  var [filter,  setFilter]  = useState('All')
  var [search,  setSearch]  = useState('')
  var [modal,   setModal]   = useState(null)
  var [current, setCurrent] = useState(EMPTY)
  var [editId,  setEditId]  = useState(null)
  var [delId,   setDelId]   = useState(null)
  var [imgFile, setImgFile] = useState(null)

  function fetchPosts() {
    setLoading(true)
    blogAPI.getAll()
      .then(function(res){ setPosts(res.data || []); setLoading(false) })
      .catch(function(err){ setError(err.message); setLoading(false) })
  }
  useEffect(fetchPosts, [])

  function showToast(msg, type) {
    setToast({ msg, type: type || 'success' })
    setTimeout(function(){ setToast(null) }, 3000)
  }

  var visible = posts.filter(function(p) {
    var mc = filter === 'All' || p.category === filter
    var ms = p.title.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  function openAdd()   { setCurrent(EMPTY); setImgFile(null); setModal('add') }
  function openEdit(p) {
    setCurrent({ title:p.title, category:p.category||'Academic', status:p.published?'Published':'Draft', author:p.author||'SPV Admin', excerpt:p.excerpt||'', content:p.content||'', image:p.image||'' })
    setEditId(p._id); setImgFile(null); setModal('edit')
  }
  function openDel(id) { setDelId(id); setModal('delete') }
  function closeModal(){ setModal(null); setCurrent(EMPTY); setEditId(null); setDelId(null); setImgFile(null) }
  function handleChange(e) {
    var k=e.target.name, v=e.target.value
    setCurrent(function(p){ var n={...p}; n[k]=v; return n })
  }

  async function handleSave() {
    if (!current.title.trim()) return
    setSaving(true)
    try {
      var fd = new FormData()
      fd.append('title',     current.title)
      fd.append('category',  current.category)
      fd.append('published', current.status === 'Published' ? 'true' : 'false')
      fd.append('featured',  current.featured ? 'true' : 'false')
      fd.append('author',    current.author)
      fd.append('excerpt',   current.excerpt)
      fd.append('content',   current.content)
      if (imgFile) fd.append('image', imgFile)
      else if (current.image && !current.image.startsWith('data:')) fd.append('image', current.image)
      if (modal === 'add') {
        var res = await blogAPI.create(fd)
        setPosts(function(p){ return [res.data, ...p] })
        showToast('Post published successfully!')
      } else {
        var res2 = await blogAPI.update(editId, fd)
        setPosts(function(p){ return p.map(function(x){ return x._id === editId ? res2.data : x }) })
        showToast('Post updated successfully!')
      }
      closeModal()
    } catch (err) { showToast(err.message, 'error') }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await blogAPI.delete(delId)
      setPosts(function(p){ return p.filter(function(x){ return x._id !== delId }) })
      showToast('Post deleted')
      closeModal()
    } catch (err) { showToast(err.message, 'error') }
  }

  async function toggleStatus(post) {
    try {
      var fd = new FormData()
      fd.append('published', (!post.published).toString())
      var res = await blogAPI.update(post._id, fd)
      setPosts(function(p){ return p.map(function(x){ return x._id === post._id ? res.data : x }) })
    } catch (err) { showToast(err.message, 'error') }
  }

  var pub   = posts.filter(function(p){ return p.published }).length
  var draft = posts.filter(function(p){ return !p.published }).length

  var STATS = [
    { label:'Total Posts', value:loading?'...':posts.length, icon:<FaNewspaper size={18} color="#E8761A"/>, clr:'#E8761A' },
    { label:'Published',   value:loading?'...':pub,          icon:<FaCheckCircle size={18} color="#22a35a"/>,clr:'#22a35a' },
    { label:'Drafts',      value:loading?'...':draft,        icon:<FaFileAlt size={18} color="#C45F0A"/>,   clr:'#C45F0A' },
  ]

  return (
    <div style={{maxWidth:'1100px', width:'100%', boxSizing:'border-box'}}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes slideIn { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:none } }
        .mbp-stats      { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px; }
        .mbp-filters    { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .mbp-cats       { display:flex; gap:6px; flex-wrap:wrap; }
        .mbp-tbl        { overflow-x:auto; }
        .mbp-modal-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media (max-width:640px) {
          .mbp-stats { grid-template-columns:1fr 1fr; gap:8px; }
          .mbp-filters { flex-direction:column; align-items:stretch; gap:8px; }
          .mbp-search { max-width:100% !important; width:100% !important; box-sizing:border-box; }
          .mbp-cats-wrap { width:100%; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }
          .mbp-cats-wrap::-webkit-scrollbar { display:none; }
          .mbp-cats { flex-wrap:nowrap !important; width:max-content; }
          .mbp-modal-grid { grid-template-columns:1fr; }
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
            <FaNewspaper size={22} color="#E8761A"/> Blogs & Updates
          </h1>
          <p style={{fontSize:'13px',color:'#7A4010',margin:0}}>Manage all school blog posts and announcements</p>
        </div>
        <button onClick={openAdd} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 6px 20px rgba(232,118,26,.3)',padding:'12px 20px',fontSize:'14px',whiteSpace:'nowrap'}}>+ Add New Post</button>
      </div>

      <div className="mbp-stats">
        {STATS.map(function(st){
          return (
            <div key={st.label} style={{...s.card,display:'flex',alignItems:'center',gap:'12px',padding:'16px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'12px',background:st.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{st.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#1C0A00'}}>{st.value}</div>
                <div style={{fontSize:'11px',color:'#7A4010',fontWeight:'600'}}>{st.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{...s.card,marginBottom:'16px',padding:'14px 16px'}}>
        <div className="mbp-filters">
          <div style={{position:'relative'}}>
            <FaSearch size={13} color="#B87832" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input className="mbp-search" value={search} onChange={function(e){setSearch(e.target.value)}} placeholder="Search posts..."
              style={{...s.inp,maxWidth:'220px',padding:'9px 13px 9px 32px'}} onFocus={inp_focus} onBlur={inp_blur} />
          </div>
          <div className="mbp-cats-wrap">
            <div className="mbp-cats">
              {['All',...CATS].map(function(c){
                var isActive = filter===c
                return (
                  <button key={c} onClick={function(){setFilter(c)}}
                    style={{padding:'7px 13px',borderRadius:'8px',border:'1.5px solid',borderColor:isActive?'#E8761A':'rgba(232,118,26,.2)',background:isActive?'linear-gradient(135deg,#E8761A,#F5B800)':'#FFF6EA',color:isActive?'#fff':'#7A4010',fontSize:'12px',fontWeight:'700',cursor:'pointer',whiteSpace:'nowrap',transition:'all .15s',flexShrink:0}}>
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={s.card}>
        {loading ? (
          <div style={{textAlign:'center',padding:'60px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <FaSpinner size={20} color="#E8761A" style={{animation:'spin .8s linear infinite'}}/> Loading posts...
          </div>
        ) : error ? (
          <div style={{textAlign:'center',padding:'60px',color:'#dc2626'}}>{error}</div>
        ) : (
          <div className="mbp-tbl">
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
              <thead>
                <tr style={{borderBottom:'2px solid rgba(232,118,26,.12)'}}>
                  {['','Title','Category','Status','Date','Actions'].map(function(h){
                    return <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'800',color:'#B87832',textTransform:'uppercase',letterSpacing:'.8px',whiteSpace:'nowrap'}}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.length===0 && <tr><td colSpan={6} style={{padding:'40px',textAlign:'center',color:'#B87832'}}>No posts found</td></tr>}
                {visible.map(function(p,i){
                  var cc = CAT_CLR[p.category] || '#E8761A'
                  return (
                    <tr key={p._id} style={{borderBottom:'1px solid rgba(232,118,26,.07)',background:i%2===0?'#FFFFFF':'#FFFDF8',transition:'background .15s'}}
                      onMouseEnter={function(e){e.currentTarget.style.background='#FFF6EA'}}
                      onMouseLeave={function(e){e.currentTarget.style.background=i%2===0?'#FFFFFF':'#FFFDF8'}}>
                      <td style={{padding:'8px 10px',width:'48px'}}>
                        {p.image
                          ? <img src={p.image} alt="" style={{width:'44px',height:'34px',objectFit:'cover',borderRadius:'7px',display:'block'}} />
                          : <div style={{width:'44px',height:'34px',borderRadius:'7px',background:'rgba(232,118,26,.08)',display:'flex',alignItems:'center',justifyContent:'center'}}><FaNewspaper size={14} color="#E8761A"/></div>
                        }
                      </td>
                      <td style={{padding:'10px 12px',maxWidth:'220px'}}>
                        <div style={{fontSize:'13px',fontWeight:'700',color:'#1C0A00',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.title}</div>
                        <div style={{fontSize:'11px',color:'#B87832',marginTop:'2px'}}>{p.author||'SPV Admin'}</div>
                      </td>
                      <td style={{padding:'10px 12px'}}><span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',background:cc+'15',color:cc,whiteSpace:'nowrap'}}>{p.category}</span></td>
                      <td style={{padding:'10px 12px'}}>
                        <button onClick={function(){toggleStatus(p)}}
                          style={{padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'800',border:'none',cursor:'pointer',background:p.published?'rgba(34,163,90,.12)':'rgba(196,95,10,.12)',color:p.published?'#22a35a':'#C45F0A',transition:'all .2s',whiteSpace:'nowrap',display:'inline-flex',alignItems:'center',gap:'5px'}}>
                          {p.published ? <><FaCheckCircle size={10}/> Published</> : <><FaFileAlt size={10}/> Draft</>}
                        </button>
                      </td>
                      <td style={{padding:'10px 12px',fontSize:'12px',color:'#7A4010',whiteSpace:'nowrap'}}>{formatDate(p.createdAt)}</td>
                      <td style={{padding:'10px 12px'}}>
                        <div style={{display:'flex',gap:'6px'}}>
                          <button onClick={function(){openEdit(p)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#E8761A'}} onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA'}}>
                            <FaPencilAlt size={13} color="#7A4010"/>
                          </button>
                          <button onClick={function(){openDel(p._id)}} style={{width:'32px',height:'32px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.15)',background:'rgba(254,242,242,.6)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
                            onMouseEnter={function(e){e.currentTarget.style.background='#dc2626'}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(254,242,242,.6)'}}>
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
                {modal==='add' ? <><FaNewspaper size={16} color="#E8761A"/> Add New Post</> : <><FaPencilAlt size={16} color="#E8761A"/> Edit Post</>}
              </h2>
              <button onClick={closeModal} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#B87832',flexShrink:0}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'13px'}}>
              <div><label style={s.label}>Title *</label><input name="title" value={current.title} onChange={handleChange} placeholder="Post title..." style={s.inp} onFocus={inp_focus} onBlur={inp_blur} /></div>
              <div className="mbp-modal-grid">
                <div><label style={s.label}>Category</label><select name="category" value={current.category} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur}>{CATS.map(function(c){ return <option key={c}>{c}</option> })}</select></div>
                <div><label style={s.label}>Status</label><select name="status" value={current.status} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur}><option>Published</option><option>Draft</option></select></div>
              </div>
              <div><label style={s.label}>Author</label><input name="author" value={current.author} onChange={handleChange} style={s.inp} onFocus={inp_focus} onBlur={inp_blur} /></div>
              <div><label style={s.label}>Excerpt / Summary</label><textarea name="excerpt" value={current.excerpt} onChange={handleChange} rows={2} placeholder="Short summary..." style={{...s.inp,resize:'vertical'}} onFocus={inp_focus} onBlur={inp_blur} /></div>
              <div><label style={s.label}>Content</label><textarea name="content" value={current.content} onChange={handleChange} rows={5} placeholder="Full blog content..." style={{...s.inp,resize:'vertical'}} onFocus={inp_focus} onBlur={inp_blur} /></div>
              <div>
                <label style={s.label}>Featured Image</label>
                <div style={{border:'2px dashed rgba(232,118,26,.25)',borderRadius:'12px',padding:'14px',background:'rgba(232,118,26,.03)'}}>
                  {(imgFile||current.image) ? (
                    <div style={{position:'relative',marginBottom:'10px'}}>
                      <img src={imgFile?URL.createObjectURL(imgFile):current.image} alt="Preview" style={{width:'100%',height:'140px',objectFit:'cover',borderRadius:'9px',display:'block'}} />
                      <button onClick={function(){setImgFile(null);setCurrent(function(p){return{...p,image:''}})}}
                        style={{position:'absolute',top:'8px',right:'8px',width:'26px',height:'26px',borderRadius:'50%',background:'rgba(220,38,38,.85)',border:'none',cursor:'pointer',color:'#fff',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
                    </div>
                  ) : (
                    <div style={{textAlign:'center',padding:'14px 0',marginBottom:'8px'}}>
                      <FaImages size={28} color="#B87832" style={{marginBottom:'4px'}}/>
                      <div style={{fontSize:'12px',color:'#B87832',fontWeight:'600'}}>Add a featured image</div>
                    </div>
                  )}
                  <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'9px 14px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.25)',background:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:'700',color:'#E8761A',marginBottom:'8px'}}>
                    <FaFolder size={13}/> Upload from Device
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={function(e){var f=e.target.files&&e.target.files[0];if(f){setImgFile(f);setCurrent(function(p){return{...p,image:''}})}}} />
                  </label>
                  <input name="image" value={imgFile?'':(current.image||'')} onChange={handleChange} placeholder="Or paste image URL..." style={{...s.inp,fontSize:'12px'}} onFocus={inp_focus} onBlur={inp_blur} />
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginTop:'20px',flexWrap:'wrap'}}>
              <button onClick={closeModal} style={{...s.btn,background:'#FFF6EA',color:'#7A4010',border:'1.5px solid rgba(232,118,26,.2)'}}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{...s.btn,background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',boxShadow:'0 4px 14px rgba(232,118,26,.3)',opacity:saving?.7:1,display:'inline-flex',alignItems:'center',gap:'7px'}}>
                {saving ? <><FaSpinner size={13} style={{animation:'spin .8s linear infinite'}}/> Saving...</> : modal==='add' ? '+ Publish Post' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal==='delete' && (
        <div style={{position:'fixed',inset:0,background:'rgba(28,10,0,.45)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'16px'}} onClick={function(e){if(e.target===e.currentTarget)closeModal()}}>
          <div style={{background:'#FFFDF8',borderRadius:'20px',border:'1.5px solid rgba(220,38,38,.2)',padding:'28px',width:'100%',maxWidth:'400px',boxShadow:'0 24px 64px rgba(28,10,0,.2)',textAlign:'center'}}>
            <FaTrash size={44} color="#dc2626" style={{marginBottom:'12px'}}/>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'#1C0A00',margin:'0 0 8px'}}>Delete Post?</h2>
            <p style={{fontSize:'13px',color:'#7A4010',margin:'0 0 20px'}}>This action cannot be undone. The post will be permanently removed.</p>
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