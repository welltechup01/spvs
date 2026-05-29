import { Link } from 'react-router-dom'
import { FaLock, FaUserMd, FaYinYang, FaFutbol, FaUtensils, FaBook, FaShower, FaShieldAlt, FaHome, FaPhone, FaWifi } from 'react-icons/fa'

const amenities = [
  { icon:<FaLock size={14}/>,     label:'24×7 Security' },
  { icon:<FaUserMd size={14}/>,   label:'Visiting Doctor' },
  { icon:<FaYinYang size={14}/>,  label:'Yoga & Exercises' },
  { icon:<FaFutbol size={14}/>,   label:'Sports Stadium' },
  { icon:<FaUtensils size={14}/>, label:'Hygienic Mess' },
  { icon:<FaBook size={14}/>,     label:'Study Room' },
  { icon:<FaShower size={14}/>,   label:'Clean Bathrooms' },
  { icon:<FaShieldAlt size={14}/>,label:'Safe Campus' },
]

const hostelIcons = [
  { icon:<FaLock size={20}/>,     label:'24×7 Security' },
  { icon:<FaUserMd size={20}/>,   label:'Medical Care' },
  { icon:<FaFutbol size={20}/>,   label:'Sports' },
  { icon:<FaWifi size={20}/>,     label:'Wi-Fi' },
]

export default function HostelSection() {
  return (
    <section className="sect" style={{background:'linear-gradient(135deg,var(--dark) 0%,var(--dark2) 100%)',padding:'90px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 50%,rgba(245,184,0,.08),transparent 60%)'}}></div>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 20px',position:'relative',zIndex:2}}>
        <div className="hostel-grid">

          {/* LEFT */}
          <div className="rv">
            <div className="chip" style={{background:'rgba(245,184,0,.1)',borderColor:'rgba(245,184,0,.25)',color:'var(--gd2)'}}>
              <span style={{background:'var(--gd)'}} className="chip-dot"></span>Boarding Facility
            </div>
            <h2 className="sec-title" style={{color:'#fff'}}>Boys <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Hostel</span><br/>at SPV</h2>
            <div className="s-bar"></div>
            <p style={{fontSize:'16px',color:'rgba(255,255,255,.65)',lineHeight:'1.8',marginBottom:'28px'}}>
              Our boarding facility offers a safe, nurturing environment where students from far-off places can live, study and grow. Affordable shared dormitories with all essential amenities and round-the-clock care.
            </p>
            <div className="hostel-amenities">
              {amenities.map((a,i) => (
                <div key={i} className="hostel-ami">
                  <span style={{color:'#E8761A',display:'flex',alignItems:'center'}}>{a.icon}</span>
                  {a.label}
                </div>
              ))}
            </div>
            <div className="hostel-btns">
              <Link to="/facilities" className="btn-w" style={{display:'inline-flex',alignItems:'center',gap:'8px'}}>
                <FaHome size={14}/> Hostel Details
              </Link>
              <Link to="/contact" className="hostel-enquire-btn">
                <FaPhone size={13}/> Enquire Now
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rv" style={{transitionDelay:'.2s'}}>
            <div className="hostel-card">

              {/* ── Hostel Photo ── */}
              <div className="hostel-photo-wrap">
                <img
                  src="/images/Hostel.jpg"
                  alt="SPV Hostel Building"
                  className="hostel-photo"
                />
                {/* Gradient overlay at bottom of image */}
                <div className="hostel-photo-overlay"></div>
                {/* Badge on top of image */}
                <div className="hostel-photo-badge">Boys Hostel · SPV</div>
              </div>

              {/* ── Card Body ── */}
              <div className="hostel-card-body">
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'var(--gd2)',marginBottom:'4px'}}>
                  Safe &amp; Affordable
                </div>
                <div style={{fontSize:'13px',color:'rgba(255,255,255,.5)',marginBottom:'20px'}}>
                  Boys Only · All Amenities Included
                </div>

                <div className="hostel-icons">
                  {hostelIcons.map((item,i) => (
                    <div key={i} className="hostel-icon">
                      <div style={{display:'flex',justifyContent:'center',marginBottom:'6px',color:'#F5B800'}}>{item.icon}</div>
                      <div style={{fontSize:'11px',color:'rgba(255,255,255,.6)',fontWeight:'600'}}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hostel-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .hostel-amenities { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:32px; }
        .hostel-ami { display:flex; align-items:center; gap:8px; font-size:13.5px; color:rgba(255,255,255,.75); padding:8px 12px; background:rgba(255,255,255,.05); border-radius:8px; border:1px solid rgba(255,255,255,.08); }
        .hostel-btns { display:flex; gap:12px; flex-wrap:wrap; align-items:center; }
        .hostel-enquire-btn { display:inline-flex; align-items:center; gap:8px; padding:12px 24px; border-radius:12px; font-family:'Poppins',sans-serif; font-size:14px; font-weight:700; color:rgba(255,255,255,0.85) !important; text-decoration:none; border:1.5px solid rgba(255,255,255,.3); background:transparent; transition:background 0.25s,border-color 0.25s,color 0.25s,transform 0.2s; white-space:nowrap; }
        .hostel-enquire-btn:hover { background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.6); color:#fff !important; transform:translateY(-2px); }

        /* Card */
        .hostel-card { background:linear-gradient(135deg,rgba(245,184,0,.1),rgba(232,118,26,.08)); border-radius:24px; border:1.5px solid rgba(245,184,0,.18); overflow:hidden; }

        /* Photo section */
        .hostel-photo-wrap { position:relative; width:100%; height:220px; overflow:hidden; }
        .hostel-photo { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.5s ease; }
        .hostel-card:hover .hostel-photo { transform:scale(1.04); }
        .hostel-photo-overlay { position:absolute; inset:0; background:linear-gradient(to bottom, transparent 40%, rgba(15,15,25,0.85) 100%); }
        .hostel-photo-badge { position:absolute; top:12px; left:12px; background:rgba(245,184,0,0.92); color:#1a1200; font-size:11px; font-weight:800; font-family:'Poppins',sans-serif; padding:4px 12px; border-radius:20px; letter-spacing:0.5px; }

        /* Card body below photo */
        .hostel-card-body { padding:22px 28px 28px; }
        .hostel-icons { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .hostel-icon { text-align:center; background:rgba(255,255,255,.04); padding:14px; border-radius:12px; border:1px solid rgba(245,184,0,.12); transition:background 0.2s,border-color 0.2s; }
        .hostel-icon:hover { background:rgba(245,184,0,.08); border-color:rgba(245,184,0,.28); }

        @media (max-width:768px) {
          .hostel-grid { grid-template-columns:1fr; gap:28px; }
          .hostel-amenities { grid-template-columns:1fr 1fr; gap:8px; margin-bottom:20px; }
          .hostel-ami { font-size:12px; padding:7px 10px; }
          .hostel-photo-wrap { height:180px; }
          .hostel-card-body { padding:16px 18px 22px; }
          .hostel-btns { flex-direction:column; gap:10px; }
          .hostel-btns .btn-w, .hostel-btns .hostel-enquire-btn { width:100%; justify-content:center; text-align:center; }
          .hostel-icons { grid-template-columns:repeat(4,1fr); gap:8px; }
          .hostel-icon { padding:10px 6px; }
        }
        @media (max-width:480px) {
          .hostel-amenities { grid-template-columns:1fr; }
          .hostel-icons { grid-template-columns:repeat(4,1fr); }
          .hostel-photo-wrap { height:160px; }
        }
      `}</style>
    </section>
  )
}