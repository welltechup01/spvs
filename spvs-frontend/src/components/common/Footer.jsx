import { Link } from 'react-router-dom'
import useSettings from '../../hooks/useSettings'

export default function Footer() {
  const { settings } = useSettings()
  const school    = settings.school    || {}
  const contact   = settings.contact   || {}
  const admission = settings.admission || {}

  const name      = school.name        || 'Sant Pathik Vidyalaya'
  const affNo     = school.affNo       || '2130176'
  const est       = school.established || '1987'
  const phone1    = contact.phone1     || '9198783830'
  const phone2    = contact.phone2     || '8318842325'
  const email     = contact.email      || 'spvbrh@gmail.com'
  const address   = school.address     || 'Pashupati Nagar, Bahraich UP 271802'
  const facebook  = contact.facebook   || 'https://www.facebook.com/share/1HXvF61Gqd/'
  const youtube   = contact.youtube    || 'https://youtube.com/@santpathikvidyalayabahraic9459?si=NccPMOyCjrsklcoc'
  const instagram = contact.instagram  || 'https://www.instagram.com/sant.pathikvidyalaya?igsh=MXRhMGY5ZzA2OGlvZg=='
  const whatsapp  = contact.whatsapp   || phone1

  return (
    <footer>
      <div className="foot-grid">

        {/* ── Brand ── */}
        <div>
          <div className="foot-brand-row">
            {/* ── Logo: same style as navbar — no clipping, full contain, with glow ring ── */}
            <div
              className="foot-logo-wrap"
              onMouseEnter={function(e){ e.currentTarget.style.transform='rotate(8deg) scale(1.06)' }}
              onMouseLeave={function(e){ e.currentTarget.style.transform='' }}
            >
              <img
                src="/logo/school.PNG"
                alt="Sant Pathik Vidyalaya Logo"
                width={62}
                height={62}
                style={{ objectFit:'contain', display:'block', width:'100%', height:'100%' }}
              />
            </div>
            <div>
              <div className="foot-sn">{name}</div>
              <div className="foot-st">{school.board||'CBSE'} Affiliated · Est. {est}</div>
            </div>
          </div>
          <p className="foot-desc">
            A co-educational Day &amp; Boarding Senior Secondary School committed to education with values and excellence since {est} in Pashupati Nagar, Bahraich, UP.
          </p>
          <div className="foot-motto">✨ "{school.tagline || 'Work is Worship'}"</div>
          <div className="foot-soc">
            {/* Instagram */}
            <a className="fsoc fsoc-ig" href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a className="fsoc fsoc-fb" href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a className="fsoc fsoc-yt" href={youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a className="fsoc fsoc-wa" href={'https://wa.me/91' + whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          {/* ── Welltechup credit ── */}
          <a href="https://www.welltechup.com" target="_blank" rel="noopener noreferrer" className="wtu-wrap">
            <img
              src="/images/welltechup_logo.jpg"
              alt="Welltechup"
              className="wtu-logo"
              onError={function(e){
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="wtu-fallback">W</div>
            <div>
              <div className="wtu-label">Designed &amp; Developed by</div>
              <div className="wtu-name">WELLTECHUP</div>
            </div>
          </a>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <div className="foot-col-h">Quick Links</div>
          <ul className="foot-ul">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About School</Link></li>
            <li><Link to="/about#vision">Vision &amp; Mission</Link></li>
            <li><Link to="/about#principal">Principal's Message</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/facilities">Facilities</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/alumni">Alumni</Link></li>
            <li><Link to="/campus-life">Campus Life</Link></li>
            <li><Link to="/campus-life?tab=jobs">Jobs &amp; Careers</Link></li>
            <li><Link to="/mandatory-disclosure">Mandatory Disclosure</Link></li>
          </ul>
        </div>

        {/* ── Academics ── */}
        <div>
          <div className="foot-col-h">Academics</div>
          <ul className="foot-ul">
            <li><Link to="/academics">Classes (PG – XII)</Link></li>
            <li><Link to="/academics#science">Science Stream</Link></li>
            <li><Link to="/academics#commerce">Commerce Stream</Link></li>
            <li><Link to="/academics#humanities">Humanities Stream</Link></li>
            <li><Link to="/academics/fees">Fee Structure</Link></li>
            <li><Link to="/downloads">Certificates</Link></li>
            <li><Link to="/blog">Updates &amp; News</Link></li>
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <div className="foot-col-h">Contact Us</div>
          <ul className="foot-ul" style={{marginBottom:'18px'}}>
            <li><a href={'tel:+91' + phone1}>+91 {phone1}</a></li>
            <li><a href={'tel:+91' + phone2}>+91 {phone2} (Principal)</a></li>
            <li><a href={'mailto:' + email}>{email}</a></li>
            <li><span style={{color:'rgba(255,255,255,.85)',fontFamily:"'Poppins',sans-serif"}}>{address}</span></li>
          </ul>
          {admission.open && (
            <div style={{padding:'10px 14px',borderRadius:'10px',background:'rgba(232,118,26,.15)',border:'1px solid rgba(232,118,26,.25)',marginBottom:'14px',fontSize:'12px',color:'#FFCF40',fontWeight:'600',fontFamily:"'Poppins',sans-serif"}}>
               {admission.notice || 'Admissions Open — Apply Now!'}
            </div>
          )}
          <div className="foot-acts">
            <Link className="fa fa1" to="/contact">APPLY NOW</Link>
            <a className="fa fa2" href={'https://wa.me/91' + whatsapp} target="_blank" rel="noopener noreferrer">WHATSAPP</a>
          </div>
        </div>
      </div>

      {/* Mobile bottom links */}
      <div className="foot-mob-wrap">
        <Link to="/about" className="foot-mob-lnk">Privacy Policy</Link>
        <Link to="/admin" className="foot-mob-lnk foot-mob-admin">Admin</Link>
      </div>

      {/* Bottom bar */}
      <div className="foot-bot">
        <div className="foot-copy">
          © {new Date().getFullYear()} {name}. All rights reserved. CBSE Affiliation No. {affNo}
        </div>
        <div className="foot-bl-desk">
          <Link to="/about" className="foot-bl-lnk">Privacy Policy</Link>
          <Link to="/admin" className="foot-bl-lnk foot-admin-lnk">Admin</Link>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap');

        footer {
          font-family:'Poppins',sans-serif;
          background:linear-gradient(145deg,#1C0A00 0%,#2E1200 40%,#3D1A00 70%,#1C0A00 100%);
          position:relative; overflow:hidden;
        }
        footer::before {
          content:'ॐ'; position:absolute; right:-50px; top:-40px;
          font-size:450px; color:rgba(232,118,26,.04);
          font-family:'Playfair Display',serif;
          pointer-events:none; user-select:none;
        }

        .foot-grid {
          display:grid;
          grid-template-columns:1.6fr 1fr 1fr 1.2fr;
          gap:24px; padding:36px 28px 24px;
          position:relative; z-index:2;
        }

        /* ── FIXED: Logo wrapper — exact white bg match to navbar ── */
        .foot-brand-row { display:flex; align-items:center; gap:14px; margin-bottom:16px; }

        .foot-logo-wrap {
          width:62px;
          height:62px;
          flex-shrink:0;
          border-radius:50%;
          /* Pure white background — exactly like navbar renders on light header */
          background:#ffffff;
          border:2.5px solid rgba(245,184,0,0.5);
          box-shadow:0 4px 18px rgba(245,184,0,0.3), 0 0 0 3px rgba(232,118,26,0.15);
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
          position:relative;
          transition:all .5s cubic-bezier(.34,1.56,.64,1);
          padding:3px;
        }

        .foot-logo-wrap img {
          width:100%;
          height:100%;
          object-fit:contain;
          display:block;
          /* No filter — let true colors show on white bg */
          filter:none;
        }

        .foot-sn {
          font-family:'Playfair Display',serif;
          font-size:clamp(14px,1.4vw,17px); font-weight:700;
          color:#fff; line-height:1.3; margin-bottom:3px;
        }
        .foot-st {
          font-family:'Poppins',sans-serif;
          font-size:10px; font-weight:400;
          color:rgba(255,255,255,.75); letter-spacing:.3px;
        }
        .foot-desc {
          font-family:'Poppins',sans-serif;
          font-size:13.5px; font-weight:400;
          color:rgba(255,255,255,.85); line-height:1.78; margin:0 0 14px;
        }
        .foot-motto {
          font-family:'Playfair Display',serif;
          font-size:13.5px; font-style:italic; font-weight:400;
          color:#FFCF40; margin-bottom:18px; line-height:1.5;
        }

        .foot-soc { display:flex; gap:7px; margin-top:18px; flex-wrap:wrap; }
        .fsoc {
          width:38px; height:38px; border-radius:10px;
          background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
          display:flex; align-items:center; justify-content:center;
          color:rgba(255,255,255,.8); text-decoration:none; transition:all .25s;
        }
        .fsoc:hover { transform:translateY(-3px); color:#fff; }
        .fsoc-ig:hover { background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); border-color:transparent; }
        .fsoc-fb:hover { background:#1877F2; border-color:transparent; }
        .fsoc-yt:hover { background:#FF0000; border-color:transparent; }
        .fsoc-wa:hover { background:#25D366; border-color:transparent; }

        .wtu-wrap {
          margin-top:20px; display:flex; align-items:center; gap:10px;
          padding:10px 14px; border-radius:12px;
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.25);
          text-decoration:none; transition:all .25s; width:fit-content;
        }
        .wtu-wrap:hover { background:rgba(255,255,255,.12); transform:translateY(-2px); }
        .wtu-logo {
          width:32px; height:32px; border-radius:8px;
          object-fit:cover; flex-shrink:0;
          box-shadow:0 4px 12px rgba(0,0,0,.3);
        }
        .wtu-fallback {
          display:none; width:32px; height:32px; border-radius:8px;
          background:linear-gradient(135deg,#6C3FC5,#9B59F5);
          align-items:center; justify-content:center;
          font-size:14px; font-weight:900; color:#fff; flex-shrink:0;
          box-shadow:0 4px 12px rgba(108,63,197,.4);
        }
        .wtu-label {
          font-family:'Poppins',sans-serif;
          font-size:10px; font-weight:500;
          color:rgba(255,255,255,.85);
          letter-spacing:1px; text-transform:uppercase; margin-bottom:2px;
        }
        .wtu-name {
          font-family:'Poppins',sans-serif;
          font-size:15px; font-weight:700;
          color:#FF3B3B;
          letter-spacing:.8px;
          text-transform:uppercase;
        }

        .foot-col-h {
          font-family:'Poppins',sans-serif;
          font-size:11px; font-weight:700; color:#FFBB7A;
          letter-spacing:2px; text-transform:uppercase;
          margin-bottom:16px; display:flex; align-items:center; gap:6px;
        }
        .foot-col-h::before { content:''; width:12px; height:2px; background:#FFBB7A; border-radius:2px; }

        .foot-ul { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:9px; }
        .foot-ul li a, .foot-ul li span {
          font-family:'Poppins',sans-serif; font-size:13.5px; font-weight:400;
          color:#fff; text-decoration:none; transition:all .22s;
          display:inline-flex; align-items:center; gap:6px;
        }
        .foot-ul li a::before { content:'›'; color:#FFBB7A; font-size:15px; transition:color .22s; }
        .foot-ul li a:hover { color:#FF9A3C; padding-left:5px; }
        .foot-ul li a:hover::before { color:#FF9A3C; }

        .foot-acts { display:flex; gap:10px; flex-wrap:wrap; }
        .fa {
          padding:10px 18px; border-radius:10px;
          font-family:'Poppins',sans-serif; font-size:12px; font-weight:600;
          text-transform:uppercase; letter-spacing:.8px;
          text-decoration:none; transition:all .22s; white-space:nowrap;
        }
        .fa1 { background:linear-gradient(135deg,#E8761A,#F5B800); color:#1C0A00; border:none; box-shadow:0 4px 14px rgba(232,118,26,.3); }
        .fa1:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(232,118,26,.4); }
        .fa2 { background:rgba(255,255,255,.08); color:rgba(255,255,255,.8); border:1px solid rgba(255,255,255,.15); }
        .fa2:hover { background:rgba(255,255,255,.14); color:#fff; transform:translateY(-2px); }

        .foot-bot {
          display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between;
          gap:8px; padding:12px 28px; border-top:1px solid rgba(255,255,255,.08);
          position:relative; z-index:2;
        }
        .foot-copy { font-family:'Poppins',sans-serif; font-size:12px; font-weight:400; color:rgba(255,255,255,.45); line-height:1.6; }
        .foot-bl-desk { display:flex; gap:16px; align-items:center; }
        .foot-bl-lnk { font-family:'Poppins',sans-serif; font-size:12px; font-weight:400; color:rgba(255,255,255,.45); text-decoration:none; white-space:nowrap; transition:color .2s; }
        .foot-bl-lnk:hover { color:#E8761A; }
        .foot-admin-lnk { color:rgba(255,255,255,.3) !important; }
        .foot-admin-lnk:hover { color:rgba(255,255,255,.6) !important; }

        .foot-mob-wrap {
          display:none; gap:10px; padding:14px 18px;
          border-top:1px solid rgba(255,255,255,.08);
          position:relative; z-index:2;
        }
        .foot-mob-lnk {
          flex:1; display:block; padding:12px 0; border-radius:10px;
          background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15);
          text-align:center; text-decoration:none; color:rgba(255,255,255,.75);
          font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; transition:all .2s;
        }
        .foot-mob-admin { background:rgba(255,255,255,.04) !important; border:1px solid rgba(255,255,255,.08) !important; color:rgba(255,255,255,.28) !important; }
        .foot-mob-admin:hover { color:rgba(255,255,255,.55) !important; }

        @media (max-width:1024px) {
          .foot-grid { grid-template-columns:1.4fr 1fr 1fr 1.1fr; gap:20px; padding:30px 24px 22px; }
          .foot-bot  { padding:12px 24px; }
        }
        @media (max-width:768px) {
          .foot-grid { grid-template-columns:1fr 1fr; gap:20px; padding:28px 20px 22px; }
          .foot-bot  { padding:12px 20px; }
          .foot-bl-desk  { display:none !important; }
          .foot-mob-wrap { display:flex !important; }
        }
        @media (max-width:540px) {
          .foot-grid { grid-template-columns:1fr; gap:22px; padding:24px 16px 18px; }
          .foot-bot  { flex-direction:column; align-items:stretch; padding:10px 16px 14px; gap:6px; }
          .foot-copy { font-size:11px; text-align:center; line-height:1.7; }
          .foot-acts { flex-direction:column; }
          .fa        { text-align:center; }
          .foot-soc  { justify-content:flex-start; }
          .wtu-wrap  { width:100%; }
          .foot-logo-wrap { width:54px; height:54px; background:#ffffff; }
        }
        @media (max-width:380px) {
          .foot-grid { padding:20px 12px 16px; gap:18px; }
          .foot-sn   { font-size:14px; }
          .foot-desc { font-size:12.5px; }
          .foot-logo-wrap { width:48px; height:48px; background:#ffffff; }
        }
      `}</style>
    </footer>
  )
}