import { useState, useCallback, useEffect } from 'react'
import GalleryFilter from '../../components/gallery/GalleryFilter'
import GalleryGrid   from '../../components/gallery/GalleryGrid'
import Lightbox      from '../../components/gallery/Lightbox'
import { galleryAPI } from '../../api'

// Map backend category strings → our filter cat keys
function mapCat(c) {
  if (!c) return 'campus'
  var s = c.toLowerCase()
  if (s.includes('event'))   return 'events'
  if (s.includes('sport'))   return 'sports'
  if (s.includes('lab'))     return 'labs'
  if (s.includes('cultur'))  return 'cultural'
  if (s.includes('prize') || s.includes('award')) return 'prize'
  return 'campus'
}

// Normalise backend doc → shape GalleryGrid expects
function normalise(item, idx) {
  return {
    id:   item._id,
    cat:  mapCat(item.category),
    title: item.title,
    year:  item.createdAt ? new Date(item.createdAt).getFullYear().toString() : '2024',
    img:   item.image,
    span:  idx % 5 === 0 ? 2 : 1,   // every 5th card gets wide span for visual interest
  }
}

export default function GalleryPage() {
  var [photos,    setPhotos]    = useState([])
  var [loading,   setLoading]   = useState(true)
  var [error,     setError]     = useState(null)
  var [activeCat, setActiveCat] = useState('all')
  var [search,    setSearch]    = useState('')
  var [lightbox,  setLightbox]  = useState(null)

  // ── Fetch from backend ──
  useEffect(function() {
    setLoading(true)
    galleryAPI.getAll()
      .then(function(res) {
        var mapped = (res.data || []).map(normalise)
        setPhotos(mapped)
        setLoading(false)
      })
      .catch(function(err) {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  var filtered = photos.filter(function(p) {
    var matchCat    = activeCat === 'all' || p.cat === activeCat
    var matchSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  var lbIdx = lightbox ? filtered.findIndex(function(p){ return p.id === lightbox.id }) : -1

  var openLightbox  = useCallback(function(photo){ setLightbox(photo) }, [])
  var closeLightbox = useCallback(function(){ setLightbox(null) }, [])
  var prevPhoto     = useCallback(function(){ if(lbIdx > 0) setLightbox(filtered[lbIdx-1]) }, [lbIdx, filtered])
  var nextPhoto     = useCallback(function(){ if(lbIdx < filtered.length-1) setLightbox(filtered[lbIdx+1]) }, [lbIdx, filtered])

  function handleCatChange(cat) {
    setActiveCat(cat)
    setSearch('')
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  return (
    <>
      <style>{`
        .gp-stat-chip {
          padding: 13px 20px; border-radius: 14px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.09);
          backdrop-filter: blur(8px);
          min-width: 80px; text-align: center;
          transition: all .25s; cursor: default;
        }
        .gp-stat-chip:hover {
          background: rgba(232,118,26,.13);
          border-color: rgba(232,118,26,.32);
          transform: translateY(-2px);
        }
        .gp-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 14px;
          background: linear-gradient(135deg,#1C0A00,#3D1A00);
          color: #FFCF40; font-weight: 800; font-size: 14.5px;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(28,10,0,.22);
          border: 1.5px solid rgba(232,118,26,.22);
          transition: all .22s;
        }
        .gp-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 34px rgba(28,10,0,.3); }
        @keyframes spin { to { transform: rotate(360deg) } }
        @media (max-width: 480px) {
          .gp-hero-stats { gap: 8px !important; }
          .gp-stat-chip  { padding: 10px 14px; min-width: 64px; }
          .gp-stat-chip .stat-n { font-size: 18px !important; }
          .gp-stat-chip .stat-l { font-size: 9.5px !important; }
          .gp-grid-pad { padding: 28px 14px 60px !important; }
        }
      `}</style>

      <div style={{fontFamily:"'DM Sans',sans-serif",minHeight:'100vh',background:'#FFFDF8'}}>

        {/* ── HERO ── */}
        <section style={{background:'linear-gradient(135deg,#1C0A00 0%,#3D1A00 50%,#1C0A00 100%)',padding:'clamp(70px,10vw,110px) 24px clamp(60px,8vw,90px)',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
            <div style={{position:'absolute',width:'520px',height:'520px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,118,26,.1),transparent 70%)',top:'-180px',right:'-150px'}} />
            <div style={{position:'absolute',width:'360px',height:'360px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,184,0,.07),transparent 70%)',bottom:'-100px',left:'-80px'}} />
            <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle,rgba(232,118,26,.05) 1px,transparent 1px)',backgroundSize:'34px 34px'}} />
          </div>
          <div style={{maxWidth:'740px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
            <div className="chip" style={{background:'rgba(245,184,0,.1)',borderColor:'rgba(245,184,0,.25)',color:'#F5B800',display:'inline-flex',marginBottom:'20px',gap:'8px',alignItems:'center'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#F5B800',animation:'blink 2s infinite',flexShrink:0}} />
              School Life &amp; Memories
            </div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(30px,5vw,58px)',fontWeight:'700',color:'#FFFDF8',margin:'0 0 14px',lineHeight:'1.15'}}>
              Our Photo{' '}
              <span style={{background:'linear-gradient(90deg,#E8761A,#F5B800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Gallery</span>
            </h1>
            <div style={{display:'flex',alignItems:'center',gap:'12px',justifyContent:'center',marginBottom:'16px'}}>
              <div style={{height:'1.5px',width:'40px',background:'linear-gradient(90deg,transparent,rgba(232,118,26,.5))'}} />
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#E8761A'}} />
              <div style={{height:'1.5px',width:'40px',background:'linear-gradient(90deg,rgba(232,118,26,.5),transparent)'}} />
            </div>
            <p style={{fontSize:'clamp(13.5px,2vw,16.5px)',color:'rgba(255,220,150,.6)',lineHeight:'1.8',marginBottom:'40px',maxWidth:'480px',margin:'0 auto 40px'}}>
              Precious moments from classrooms, stages, fields and celebrations — the living story of Sant Pathik Vidyalaya.
            </p>
            <div className="gp-hero-stats" style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
              {[
                { n: loading ? '...' : photos.length + '+', l:'Photos'     },
                { n:'6',                                     l:'Categories' },
                { n:'2023–24',                               l:'Sessions'   },
                { n:'1410+',                                 l:'Students'   },
              ].map(function(st){
                return (
                  <div key={st.l} className="gp-stat-chip">
                    <div className="stat-n" style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#FFCF40',marginBottom:'4px',lineHeight:1}}>{st.n}</div>
                    <div className="stat-l" style={{fontSize:'10.5px',fontWeight:'700',color:'rgba(255,220,150,.4)',letterSpacing:'.7px',textTransform:'uppercase'}}>{st.l}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <GalleryFilter
          activeCat={activeCat}
          onCatChange={handleCatChange}
          search={search}
          onSearchChange={setSearch}
          photos={photos}
          filteredCount={filtered.length}
        />

        {/* ── GRID / STATES ── */}
        <div className="gp-grid-pad" style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 24px 80px'}}>
          {loading ? (
            <div style={{textAlign:'center',padding:'80px 20px'}}>
              <div style={{width:'44px',height:'44px',border:'4px solid rgba(232,118,26,.2)',borderTopColor:'#E8761A',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 16px'}}/>
              <div style={{color:'#B87832',fontSize:'14px',fontWeight:600}}>Loading gallery...</div>
            </div>
          ) : error ? (
            <div style={{textAlign:'center',padding:'80px 20px'}}>
              <div style={{fontSize:'40px',marginBottom:'12px'}}>⚠️</div>
              <div style={{color:'#C45F0A',fontSize:'15px',fontWeight:700,marginBottom:'6px'}}>Could not load gallery</div>
              <div style={{color:'#B87832',fontSize:'13px',marginBottom:'20px'}}>{error}</div>
              <button onClick={function(){ window.location.reload() }}
                style={{padding:'10px 24px',borderRadius:'10px',background:'#E8761A',color:'#fff',border:'none',cursor:'pointer',fontWeight:700,fontSize:'13px'}}>
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{textAlign:'center',padding:'80px 20px'}}>
              <div style={{fontSize:'40px',marginBottom:'12px'}}>🖼️</div>
              <div style={{color:'#7A4010',fontSize:'15px',fontWeight:700}}>No photos found</div>
              <div style={{color:'#B87832',fontSize:'13px',marginTop:'6px'}}>Try a different category or search term</div>
            </div>
          ) : (
            <GalleryGrid photos={filtered} onPhotoClick={openLightbox} />
          )}
        </div>

        {/* ── LIGHTBOX ── */}
        {lightbox && (
          <Lightbox
            photo={lightbox}
            photos={filtered}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}

        {/* ── BOTTOM CTA ── */}
        <section style={{background:'linear-gradient(135deg,#FFF3CC,#FFE8A0,#FFD8A0)',padding:'60px 24px',textAlign:'center',borderTop:'1.5px solid rgba(232,118,26,.1)'}}>
          <div style={{maxWidth:'520px',margin:'0 auto'}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,27px)',fontWeight:'700',color:'#1C0A00',marginBottom:'10px'}}>Want to see more?</div>
            <p style={{fontSize:'14.5px',color:'rgba(60,25,0,.6)',lineHeight:'1.75',marginBottom:'26px'}}>Visit our campus and experience the SPV environment in person. Admissions open for 2026-27.</p>
            <a href="tel:+919198783830" className="gp-cta-btn">📞 Call Us — +91 91987 83830</a>
          </div>
        </section>

      </div>
    </>
  )
}