import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { galleryAPI } from '../../api'
import { FaCamera, FaRunning, FaGraduationCap, FaMusic, FaTrophy, FaStar, FaMicrophone, FaAward } from 'react-icons/fa'

var CATS = ['All', 'Events', 'Sports', 'Academic', 'Cultural']

function mapCat(c) {
  if (!c) return 'Events'
  var s = c.toLowerCase()
  if (s.includes('sport'))   return 'Sports'
  if (s.includes('lab') || s.includes('academic')) return 'Academic'
  if (s.includes('cultur'))  return 'Cultural'
  return 'Events'
}

var COLORS = [
  'linear-gradient(135deg,#FFF3CC,#FFD94A)',
  'linear-gradient(135deg,#FFE0A0,#E8761A33)',
  'linear-gradient(135deg,#FFF8DC,#F5B80033)',
  'linear-gradient(135deg,#FEF0D4,#FF9A3C33)',
  'linear-gradient(135deg,#FFF3E0,#FFBB7A33)',
]

var PLACEHOLDER = [
  { cat:'Events',   icon:<FaStar size={32} color="#E8761A"/>,        lbl:'Independence Day Celebration' },
  { cat:'Sports',   icon:<FaRunning size={32} color="#E8761A"/>,     lbl:'District Sports Champions'    },
  { cat:'Cultural', icon:<FaMusic size={32} color="#E8761A"/>,       lbl:'Annual Function 2024'         },
  { cat:'Academic', icon:<FaGraduationCap size={32} color="#E8761A"/>,lbl:'Art & Craft Exhibition'      },
  { cat:'Events',   icon:<FaCamera size={32} color="#E8761A"/>,      lbl:'Science Exhibition'           },
  { cat:'Sports',   icon:<FaTrophy size={32} color="#E8761A"/>,      lbl:'Kabaddi Champions'            },
  { cat:'Cultural', icon:<FaMicrophone size={32} color="#E8761A"/>,  lbl:'Music Competition'            },
  { cat:'Events',   icon:<FaAward size={32} color="#E8761A"/>,       lbl:'Prize Distribution Ceremony'  },
]

export default function GallerySection() {
  var [active, setActive]   = useState('All')
  var [photos, setPhotos]   = useState([])
  var [loading, setLoading] = useState(true)

  useEffect(function() {
    galleryAPI.getAll()
      .then(function(res){ setPhotos(res.data || []); setLoading(false) })
      .catch(function(){ setLoading(false) })
  }, [])

  var source = photos.length > 0 ? photos.map(function(p, i) {
    return { _id: p._id, cat: mapCat(p.category), lbl: p.title, image: p.image, icon:<FaCamera size={32} color="#E8761A"/> }
  }) : PLACEHOLDER

  var filtered = active === 'All' ? source : source.filter(function(i){ return i.cat === active })
  var display  = filtered.slice(0, 8)

  return (
    <section className="sect" style={{background:'var(--bg)'}}>
      <div className="s-cont">

        <div className="gallery-header rv">
          <div>
            <div className="chip"><span className="chip-dot"></span>Gallery</div>
            <h2 className="sec-title">Life at <span className="hl">SPVS</span></h2>
            <div className="s-bar" style={{marginBottom:0}}></div>
          </div>
          <Link to="/gallery" className="btn-out gallery-view-btn">View All Photos →</Link>
        </div>

        <div className="gallery-filters rv">
          {CATS.map(function(c) {
            return (
              <button key={c} onClick={function(){setActive(c)}} className={'gal-tab' + (active===c ? ' gal-tab-act' : '')}>
                {c}
              </button>
            )
          })}
        </div>

        <div className="gallery-grid">
          {loading ? (
            [0,1,2,3,4,5,6,7].map(function(i){
              return (
                <div key={i} className="gallery-item" style={{background:COLORS[i%COLORS.length],animation:'pulse 1.5s ease-in-out infinite'}}>
                  <div className="gallery-item-inner">
                    <FaCamera size={32} color="#E8761A"/>
                  </div>
                </div>
              )
            })
          ) : display.length === 0 ? (
            <div style={{gridColumn:'1/-1',textAlign:'center',padding:'40px',color:'var(--txt3)',fontSize:'14px'}}>No photos yet</div>
          ) : display.map(function(item, i) {
            return (
              <div key={item._id || i} className="gallery-item" style={{transitionDelay:(i%4)*0.07+'s',background:item.image?'transparent':COLORS[i%COLORS.length]}}>
                {item.image ? (
                  <img src={item.image} alt={item.lbl} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                ) : (
                  <div className="gallery-item-inner">
                    <div style={{display:'flex',justifyContent:'center',marginBottom:'8px'}}>{item.icon}</div>
                    <div className="gallery-lbl">{item.lbl}</div>
                    <div className="gallery-cat">{item.cat}</div>
                  </div>
                )}
                <div className="gi-ov"><span>{item.lbl}</span></div>
              </div>
            )
          })}
        </div>

        <div className="gallery-mob-btn">
          <Link to="/gallery" className="btn-or" style={{width:'100%',justifyContent:'center'}}>View Full Gallery →</Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .gallery-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px; flex-wrap:wrap; gap:16px; }
        .gallery-view-btn { flex-shrink:0; }
        .gallery-filters { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:28px; }
        .gal-tab { padding:7px 16px; border-radius:50px; font-family:'Poppins',sans-serif; font-size:12.5px; font-weight:700; cursor:pointer; transition:all .25s; background:transparent; color:var(--txt2); border:1.5px solid rgba(232,118,26,.2); }
        .gal-tab-act { background:var(--or); color:#fff; border-color:var(--or); box-shadow:0 5px 18px var(--shd); }
        .gallery-grid { display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:170px; gap:12px; }
        .gallery-item { border-radius:16px; overflow:hidden; cursor:pointer; position:relative; border:1.5px solid var(--brd); transition:all .4s cubic-bezier(.34,1.56,.64,1); }
        .gallery-item:hover { transform:scale(1.04); z-index:10; box-shadow:0 20px 50px var(--shd); }
        .gallery-item:hover .gi-ov { opacity:1; }
        .gallery-item-inner { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding:12px; }
        .gallery-lbl { font-size:12px; font-weight:700; color:var(--txt2); text-align:center; line-height:1.3; }
        .gallery-cat { font-size:10px; font-weight:700; color:var(--or); letter-spacing:1px; text-transform:uppercase; background:rgba(232,118,26,.08); padding:3px 10px; border-radius:50px; }
        .gi-ov { position:absolute; inset:0; background:linear-gradient(0deg,rgba(28,10,0,.75),transparent 55%); opacity:0; transition:.3s; display:flex; align-items:flex-end; padding:12px; }
        .gi-ov span { color:#fff; font-size:12px; font-weight:700; }
        .gallery-mob-btn { display:none; }
        @media (max-width:900px) { .gallery-grid { grid-template-columns:repeat(3,1fr); grid-auto-rows:150px; } }
        @media (max-width:768px) { .gallery-header { flex-direction:column; align-items:flex-start; gap:12px; } .gallery-view-btn { display:none; } .gallery-filters { gap:6px; } .gal-tab { font-size:11.5px; padding:6px 12px; } .gallery-grid { grid-template-columns:repeat(2,1fr); grid-auto-rows:130px; gap:8px; } .gallery-mob-btn { display:flex; margin-top:16px; padding:0 2px; } }
        @media (max-width:480px) { .gallery-grid { grid-template-columns:repeat(2,1fr); grid-auto-rows:110px; gap:6px; } .gal-tab { font-size:11px; padding:5px 10px; } }
      `}</style>
    </section>
  )
}