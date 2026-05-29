import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import { blogAPI } from '../../api'
import { FaSearch, FaStar, FaGraduationCap, FaTrophy, FaCalendar, FaCalendarAlt, FaMedal, FaMapPin, FaFutbol, FaClipboardList, FaNewspaper, FaExclamationTriangle, FaInbox } from 'react-icons/fa'

function normalise(item) {
  return {
    slug:     item._id,
    image:    item.image || '',
    title:    item.title,
    category: item.category || 'General',
    author:   item.author || 'SPV Admin',
    date:     item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '',
    featured: item.featured || false,
    excerpt:  item.excerpt || item.content?.slice(0,160) || '',
  }
}

var CATS = [
  { id:'All',         icon:<FaStar size={13}/> },
  { id:'Academic',    icon:<FaGraduationCap size={13}/> },
  { id:'Achievement', icon:<FaTrophy size={13}/> },
  { id:'Event',       icon:<FaCalendar size={13}/> },
  { id:'Holiday',     icon:<FaCalendarAlt size={13}/> },
  { id:'Competition', icon:<FaMedal size={13}/> },
  { id:'Notice',      icon:<FaMapPin size={13}/> },
  { id:'Sports',      icon:<FaFutbol size={13}/> },
  { id:'Admission',   icon:<FaClipboardList size={13}/> },
  { id:'General',     icon:<FaNewspaper size={13}/> },
]

export default function BlogList() {
  var [posts,   setPosts]   = useState([])
  var [loading, setLoading] = useState(true)
  var [error,   setError]   = useState(null)
  var [filter,  setFilter]  = useState('All')
  var [search,  setSearch]  = useState('')

  useEffect(function() {
    setLoading(true)
    blogAPI.getAll()
      .then(function(res){ setPosts((res.data||[]).map(normalise)); setLoading(false) })
      .catch(function(err){ setError(err.message); setLoading(false) })
  }, [])

  var filtered = posts.filter(function(p) {
    var matchCat    = filter === 'All' || p.category === filter
    var matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  var featured = filtered.find(function(p){ return p.featured })
  var rest      = filtered.filter(function(p){ return !p.featured })

  return (
    <>
      <style>{`
        .bl-search-wrap { position:relative; margin-bottom:14px; }
        .bl-search-icon { position:absolute; left:16px; top:50%; transform:translateY(-50%); pointer-events:none; color:var(--txt3); }
        .bl-search { width:100%; box-sizing:border-box; padding:13px 46px 13px 46px; border-radius:14px; border:1.5px solid var(--brd); background:var(--card); color:var(--txt); font-family:'DM Sans',sans-serif; font-size:14px; outline:none; transition:border-color .2s, box-shadow .2s; box-shadow:0 2px 12px rgba(0,0,0,.04); }
        .bl-search:focus { border-color:var(--or); box-shadow:0 0 0 3px rgba(232,118,26,.1); }
        .bl-search-clear { position:absolute; right:14px; top:50%; transform:translateY(-50%); background:var(--bg2); border:none; border-radius:50%; width:24px; height:24px; cursor:pointer; font-size:12px; color:var(--txt3); display:flex; align-items:center; justify-content:center; }
        .bl-pills { display:flex; flex-wrap:wrap; gap:8px; padding-bottom:4px; }
        .bl-pill { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:50px; font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:700; cursor:pointer; white-space:nowrap; flex-shrink:0; transition:all .25s cubic-bezier(.34,1.56,.64,1); border:1.5px solid var(--brd); background:var(--card); color:var(--txt2); box-shadow:0 2px 8px rgba(0,0,0,.05); }
        .bl-pill:hover { border-color:rgba(232,118,26,.35); background:#FFF6EA; transform:translateY(-2px); box-shadow:0 4px 14px rgba(232,118,26,.14); }
        .bl-pill.active { background:linear-gradient(135deg,var(--or),var(--gd)); border-color:var(--or); color:#fff; box-shadow:0 6px 18px rgba(232,118,26,.35); transform:translateY(-2px); }
        .bl-pill-count { font-size:10px; font-weight:800; padding:1px 7px; border-radius:50px; }
        .bl-result-count { margin-top:12px; font-size:13px; color:var(--txt3); font-weight:600; }
        .bl-section-label { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
        .bl-section-bar   { width:4px; height:24px; border-radius:2px; background:linear-gradient(to bottom,var(--or),var(--gd)); flex-shrink:0; }
        .bl-section-text  { font-family:'Playfair Display',serif; font-size:13px; font-weight:700; color:var(--txt3); letter-spacing:1px; text-transform:uppercase; }
        @keyframes spin { to { transform: rotate(360deg) } }
        @media (max-width:768px) { .bl-pills { flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch; } .bl-pills::-webkit-scrollbar { display:none; } .bl-pill { padding:7px 13px; font-size:12px; } }
      `}</style>

      <div>
        {/* Search */}
        <div className="bl-search-wrap">
          <span className="bl-search-icon"><FaSearch size={14}/></span>
          <input className="bl-search" value={search} onChange={function(e){ setSearch(e.target.value) }} placeholder="Search posts, events, notices..." />
          {search && <button className="bl-search-clear" onClick={function(){ setSearch('') }}>✕</button>}
        </div>

        {/* Category pills */}
        <div className="bl-pills">
          {CATS.map(function(c) {
            var isActive = filter === c.id
            var count    = c.id === 'All' ? posts.length : posts.filter(function(p){ return p.category === c.id }).length
            return (
              <button key={c.id} className={'bl-pill' + (isActive ? ' active' : '')} onClick={function(){ setFilter(c.id) }}>
                {c.icon}
                {c.id}
                <span className="bl-pill-count" style={{background:isActive?'rgba(255,255,255,.25)':'var(--bg2)',color:isActive?'#fff':'var(--txt3)'}}>{count}</span>
              </button>
            )
          })}
        </div>

        {(search || filter !== 'All') && (
          <div className="bl-result-count">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {filter !== 'All' ? ' in ' + filter : ''}
            {search ? ' for "' + search + '"' : ''}
          </div>
        )}

        <div style={{marginBottom:'36px'}} />

        {loading ? (
          <div style={{textAlign:'center',padding:'80px 20px'}}>
            <div style={{width:'44px',height:'44px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 16px'}}/>
            <div style={{color:'var(--txt3)',fontSize:'14px',fontWeight:600}}>Loading posts...</div>
          </div>
        ) : error ? (
          <div style={{textAlign:'center',padding:'80px 20px'}}>
            <FaExclamationTriangle size={40} color="var(--or)" style={{marginBottom:'12px'}}/>
            <div style={{color:'var(--or)',fontSize:'15px',fontWeight:700,marginBottom:'6px'}}>Could not load posts</div>
            <div style={{color:'var(--txt3)',fontSize:'13px',marginBottom:'20px'}}>{error}</div>
            <button onClick={function(){ window.location.reload() }} style={{padding:'10px 24px',borderRadius:'50px',border:'none',cursor:'pointer',background:'var(--or)',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700'}}>Try Again</button>
          </div>
        ) : (
          <>
            {featured && (
              <div style={{marginBottom:'36px'}}>
                <div className="bl-section-label">
                  <div className="bl-section-bar" />
                  <span className="bl-section-text">Featured Story</span>
                </div>
                <BlogCard post={featured} featured={true} />
              </div>
            )}
            {rest.length > 0 && (
              <>
                <div className="bl-section-label">
                  <div className="bl-section-bar" />
                  <span className="bl-section-text">{filter === 'All' ? 'All Posts' : filter} · {rest.length} article{rest.length !== 1 ? 's' : ''}</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:'20px'}}>
                  {rest.map(function(post){ return <BlogCard key={post.slug} post={post} featured={false} /> })}
                </div>
              </>
            )}
            {filtered.length === 0 && !loading && (
              <div style={{textAlign:'center',padding:'80px 20px'}}>
                <FaInbox size={56} color="var(--txt3)" style={{marginBottom:'16px'}}/>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'var(--dark)',marginBottom:'8px'}}>No posts found</div>
                <div style={{fontSize:'14px',color:'var(--txt3)',marginBottom:'20px'}}>Try a different search or category</div>
                <button onClick={function(){ setSearch(''); setFilter('All') }} style={{padding:'10px 24px',borderRadius:'50px',border:'none',cursor:'pointer',background:'var(--or)',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700'}}>Clear filters</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}