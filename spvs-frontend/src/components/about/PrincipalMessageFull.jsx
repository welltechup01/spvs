import { useRef, useEffect } from "react"

function useReveal(dir = "up", delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const from = dir === "up"    ? "translateY(36px)"
               : dir === "left"  ? "translateX(-48px)"
               : dir === "right" ? "translateX(48px)"
               : "translateY(36px)"
    el.style.opacity = "0"
    el.style.transform = from
    el.style.transition = `opacity .9s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .9s cubic-bezier(.22,1,.36,1) ${delay}ms`
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "none"; obs.disconnect() }
    }, { threshold: 0.07 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Nunito+Sans:wght@300;400;600;700&display=swap');

.lm1 *, .lm1 *::before, .lm1 *::after { box-sizing:border-box; margin:0; padding:0; }
.lm1 {
  font-family:'Nunito Sans',sans-serif;
  background:linear-gradient(180deg,#FFF6EA 0%,#FFFDF8 100%);
  color:#1C0A00; padding:80px 72px; position:relative; overflow-x:hidden;
}

@keyframes lm1Float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes lm1Spin  { to{transform:rotate(360deg)} }
@keyframes lm1Pulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
@keyframes lm1Grow  { from{width:0} to{width:32px} }
@keyframes lm1Dash  { to{stroke-dashoffset:-24} }

.lm1-label { display:inline-flex; align-items:center; gap:10px; font-size:11px; letter-spacing:4px; text-transform:uppercase; color:#E8761A; font-weight:700; margin-bottom:12px; }
.lm1-label::before { content:''; display:block; width:32px; height:1.5px; background:#E8761A; animation:lm1Grow .9s ease both; }
.lm1-title { font-family:'Playfair Display',serif; font-size:clamp(1.6rem,3vw,2.6rem); font-weight:900; color:#1C0A00; line-height:1.12; margin-bottom:48px; }
.lm1-title em { font-style:italic; color:#E8761A; }

.lm1-star { position:absolute; top:56px; right:15%; animation:lm1Float 5s ease-in-out infinite; pointer-events:none; }
.lm1-dot  { position:absolute; bottom:120px; right:4%; width:14px; height:14px; border-radius:50%; background:linear-gradient(135deg,#F5B800,#E8761A); animation:lm1Pulse 3s ease-in-out infinite; pointer-events:none; }

/* ── Card B: text left, sidebar right ── */
.lm1-card-b {
  display:flex; flex-direction:row; align-items:flex-start; gap:40px;
  border-radius:28px; background:#FFF6EA;
  border:1px solid rgba(232,118,26,.12);
  box-shadow:0 6px 36px rgba(28,10,0,.05);
  padding:56px 64px; position:relative;
  transition:box-shadow .4s, transform .4s;
}
.lm1-card-b:hover { box-shadow:0 14px 52px rgba(28,10,0,.09); transform:translateY(-4px); }
.lm1-card-b-star { position:absolute; top:24px; right:200px; animation:lm1Float 5s ease-in-out infinite; pointer-events:none; }

.lm1-text { flex:1; min-width:0; }
.lm1-msg-title { font-family:'Playfair Display',serif; font-size:clamp(1.5rem,3vw,2.4rem); font-weight:900; color:#1C0A00; margin-bottom:10px; line-height:1.1; }
.lm1-salutation { font-family:'Playfair Display',serif; font-style:italic; font-size:clamp(.85rem,1.2vw,1rem); color:#C45F0A; margin-bottom:22px; }
.lm1-poem { background:linear-gradient(135deg,#FFF6EA,#FEF0D4); border-radius:16px; border:1.5px solid rgba(232,118,26,.18); border-left:4px solid #E8761A; padding:20px 24px; margin-bottom:24px; position:relative; overflow:hidden; }
.lm1-poem::after { content:'"'; position:absolute; bottom:-10px; right:-10px; font-size:60px; color:rgba(232,118,26,.06); line-height:1; pointer-events:none; }
.lm1-poem-text { font-family:'Playfair Display',serif; font-size:14px; font-style:italic; color:#3D1A00; line-height:2.1; position:relative; z-index:1; }
.lm1-para { font-size:clamp(.82rem,1.1vw,14.5px); line-height:1.82; color:#3D1A00; margin-bottom:14px; }
.lm1-para:last-of-type { margin-bottom:24px; }
.lm1-warm { font-size:.86rem; color:#7A4010; font-style:italic; margin-bottom:8px; }
.lm1-sig-name { font-family:'Playfair Display',serif; font-size:clamp(1rem,1.8vw,1.4rem); font-weight:800; color:#1C0A00; margin-bottom:3px; }
.lm1-sig-role { font-size:.76rem; color:#E8761A; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; }
.lm1-phone { display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:30px; background:rgba(232,118,26,.1); border:1px solid rgba(232,118,26,.25); color:#C45F0A; font-size:13px; font-weight:600; text-decoration:none; transition:all .2s; margin-top:8px; }
.lm1-phone:hover { background:rgba(232,118,26,.22); }

/* sidebar */
.lm1-sidebar { flex-shrink:0; width:240px; display:flex; flex-direction:column; gap:14px; }
.lm1-stats-card { background:#fff; border-radius:22px; border:1.5px solid rgba(232,118,26,.12); padding:24px; box-shadow:0 8px 32px rgba(232,118,26,.08); text-align:center; position:relative; overflow:hidden; }
.lm1-stats-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#E8761A,#F5B800); }

/* spinning ring */
.lm1-ring-wrap { position:relative; width:140px; height:140px; margin:0 auto 16px; flex-shrink:0; }
.lm1-spin-ring { position:absolute; inset:-10px; width:calc(100% + 20px); height:calc(100% + 20px); animation:lm1Spin 18s linear infinite; pointer-events:none; }
.lm1-avatar-circle { width:140px; height:140px; border-radius:50%; background:linear-gradient(135deg,#E8761A,#F5B800); display:flex; align-items:center; justify-content:center; font-size:56px; box-shadow:0 8px 32px rgba(232,118,26,.28); overflow:hidden; position:relative; z-index:1; transition:transform .55s cubic-bezier(.25,.46,.45,.94); }
.lm1-avatar-circle:hover { transform:scale(1.06); }
.lm1-avatar-circle img { width:100%; height:100%; object-fit:cover; object-position:top center; }

.lm1-stat-row { display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid rgba(232,118,26,.08); }
.lm1-stat-row:last-child { border-bottom:none; }
.lm1-stat-label { font-size:11px; color:#B87832; font-weight:700; }
.lm1-stat-val   { font-size:11.5px; color:#1C0A00; font-weight:700; }
.lm1-vp-card { background:linear-gradient(135deg,#1C0A00,#3D1A00); border-radius:18px; padding:20px; text-align:center; }

/* ═══ LAPTOP ≤ 1024px ═══ */
@media (max-width:1024px) {
  .lm1 { padding:72px 48px; }
  .lm1-card-b { padding:48px 48px; gap:32px; }
  .lm1-card-b-star { right:160px; }
  .lm1-sidebar { width:220px; }
}

/* ═══ TABLET ≤ 768px ═══ */
@media (max-width:768px) {
  .lm1 { padding:60px 32px; }
  .lm1-card-b { padding:36px 32px; gap:28px; }
  .lm1-card-b-star { right:100px; }
  .lm1-sidebar { width:200px; }
  .lm1-ring-wrap { width:110px; height:110px; }
  .lm1-avatar-circle { width:110px !important; height:110px !important; font-size:42px !important; }
  .lm1-title { margin-bottom:36px; }
}

/* ═══ PHONE ≤ 640px ═══ */
@media (max-width:640px) {
  .lm1 { padding:48px 20px; }
  .lm1-card-b {
    flex-direction:column;
    padding:28px 20px;
    gap:24px;
    border-radius:20px;
  }
  .lm1-card-b:hover { transform:none; }
  .lm1-card-b-star { display:none; }
  .lm1-title { margin-bottom:28px; }
  .lm1-msg-title { font-size:clamp(1.3rem,5vw,1.8rem); }
  .lm1-sidebar {
    width:100%;
    flex-direction:row;
    flex-wrap:wrap;
    gap:12px;
  }
  .lm1-stats-card { flex:1; min-width:200px; }
  .lm1-vp-card    { flex:1; min-width:200px; }
  .lm1-ring-wrap  { width:100px; height:100px; margin-bottom:12px; }
  .lm1-avatar-circle { width:100px !important; height:100px !important; font-size:36px !important; }
  .lm1-poem-text { font-size:13px; line-height:1.9; }
}

/* ═══ SMALL PHONE ≤ 400px ═══ */
@media (max-width:400px) {
  .lm1 { padding:40px 14px; }
  .lm1-card-b { padding:24px 14px; }
  .lm1-sidebar { flex-direction:column; }
  .lm1-stats-card, .lm1-vp-card { min-width:unset; width:100%; }
}
`

function CardA({ photo, emoji, name, role, phone, msgTitle, salutation, poem, paragraphs, delay }) {
  const imgRef  = useReveal("left",  delay)
  const textRef = useReveal("right", delay + 120)
  return (
    <div style={{ display:"flex", flexDirection:"row", alignItems:"flex-start", gap:"64px", padding:"56px 0", borderBottom:"1px solid rgba(232,118,26,.12)" }}>
      <div ref={imgRef} className="lm1-photo-rect" style={{ position:"relative", flexShrink:0, width:280 }}>
        <div style={{ position:"absolute", top:"-24px", left:"-20px", fontFamily:"Georgia,serif", fontSize:"5rem", fontWeight:900, color:"#E8761A", lineHeight:1, opacity:.18, pointerEvents:"none", zIndex:0 }}>"</div>
        <svg viewBox="0 0 308 368" fill="none" style={{ position:"absolute", inset:-14, width:"calc(100% + 28px)", height:"calc(100% + 28px)", pointerEvents:"none" }}>
          <rect x="1" y="1" width="306" height="366" rx="17" stroke="rgba(232,118,26,.32)" strokeWidth="2" strokeDasharray="10 6" style={{ animation:"lm1Dash 2.5s linear infinite" }} />
        </svg>
        {photo
          ? <img src={photo} alt={name} style={{ width:280, height:340, objectFit:"cover", objectPosition:"top center", borderRadius:14, display:"block", boxShadow:"0 16px 48px rgba(28,10,0,.12)" }} />
          : <div style={{ width:280, height:340, borderRadius:14, background:"linear-gradient(135deg,#E8761A,#F5B800)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:90, boxShadow:"0 16px 48px rgba(28,10,0,.12)" }}>{emoji || '👩‍🏫'}</div>
        }
      </div>
      <div ref={textRef} className="lm1-text">
        <div className="lm1-msg-title">{msgTitle}</div>
        <div className="lm1-salutation">{salutation}</div>
        {poem && <div className="lm1-poem"><div className="lm1-poem-text" dangerouslySetInnerHTML={{ __html: poem }} /></div>}
        {paragraphs.map((p, i) => (
          <p key={i} className="lm1-para" dangerouslySetInnerHTML={{ __html: p.replace(/<b>(.*?)<\/b>/g, '<strong style="color:#E8761A">$1</strong>') }} />
        ))}
        <div className="lm1-warm">Warm Regards,</div>
        <div className="lm1-sig-name">{name}</div>
        <div className="lm1-sig-role">{role}</div>
        {phone && <a href={`tel:${phone.replace(/\s/g,'')}`} className="lm1-phone">📞 {phone}</a>}
      </div>
    </div>
  )
}

function CardB({ photo, emoji, name, role, phone, msgTitle, salutation, poem, paragraphs, stats, vpCard, delay }) {
  const cardRef = useReveal("up",    delay)
  const imgRef  = useReveal("right", delay + 100)
  const textRef = useReveal("left",  delay + 60)

  return (
    <div ref={cardRef} className="lm1-card-b">
      <div className="lm1-card-b-star">
        <svg viewBox="0 0 22 22" fill="none" width="18">
          {[0,45,90,135].map(a=>(<line key={a} x1="11" y1="1" x2="11" y2="21" stroke="#E8761A" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 11 11)`}/>))}
        </svg>
      </div>

      {/* text left */}
      <div ref={textRef} className="lm1-text">
        <div className="lm1-msg-title">{msgTitle}</div>
        <div className="lm1-salutation">{salutation}</div>
        {poem && <div className="lm1-poem"><div className="lm1-poem-text" dangerouslySetInnerHTML={{ __html: poem }} /></div>}
        {paragraphs.map((p, i) => (
          <p key={i} className="lm1-para" dangerouslySetInnerHTML={{ __html: p.replace(/<b>(.*?)<\/b>/g, '<strong style="color:#E8761A">$1</strong>') }} />
        ))}
        <div className="lm1-warm">Warm Regards,</div>
        <div className="lm1-sig-name">{name}</div>
        <div className="lm1-sig-role">{role}</div>
        {phone && <a href={`tel:${phone.replace(/\s/g,'')}`} className="lm1-phone">📞 {phone}</a>}
      </div>

      {/* sidebar right */}
      <div ref={imgRef} className="lm1-sidebar">
        <div className="lm1-stats-card">
          <div className="lm1-ring-wrap">
            <svg className="lm1-spin-ring" viewBox="0 0 160 160" fill="none">
              <circle cx="80" cy="80" r="74" stroke="#E8761A" strokeWidth="1.5" strokeDasharray="7 5"/>
            </svg>
            <div className="lm1-avatar-circle">
              {photo ? <img src={photo} alt={name} /> : (emoji || '👩‍🏫')}
            </div>
          </div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"15px", fontWeight:700, color:"#1C0A00", marginBottom:"4px" }}>{name}</div>
          <div style={{ fontSize:"11px", fontWeight:800, color:"#E8761A", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:"14px" }}>{role}</div>
          {stats && stats.map(d => (
            <div key={d.l} className="lm1-stat-row">
              <span className="lm1-stat-label">{d.l}</span>
              <span className="lm1-stat-val">{d.v}</span>
            </div>
          ))}
        </div>
        {vpCard && (
          <div className="lm1-vp-card">
            <div style={{ width:"52px", height:"52px", borderRadius:"50%", background:"linear-gradient(135deg,#E8761A,#F5B800)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", margin:"0 auto 10px", boxShadow:"0 4px 16px rgba(232,118,26,.3)" }}>{vpCard.emoji || '👨‍🏫'}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"14px", fontWeight:700, color:"#FFCF40", marginBottom:"3px" }}>{vpCard.name}</div>
            <div style={{ fontSize:"10px", fontWeight:800, color:"rgba(245,184,0,.5)", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"6px" }}>{vpCard.role}</div>
            <div style={{ fontSize:"12px", color:"rgba(255,220,150,.65)" }}>{vpCard.creds}</div>
          </div>
        )}
      </div>
    </div>
  )
}

const POEM = `A child is like a butterfly in the wind,<br/>
Same can fly higher than others,<br/>
But each one flies the best it can —<br/>
<strong style="color:#E8761A">Why compare one against the other?<br/>
Each one is special. Each one is beautiful.</strong>`

const LEADERS = [
  {
    type: "b",
    photo: "/images/Principal.webp",
    name: "Mrs. Puja Agarwal",
    role: "Principal",
    phone: "+91 8318842325",
    msgTitle: "Principal's Message",
    salutation: "Dear Students, A Warm & Heartfelt Welcome To The New Academic Year!",
    poem: POEM,
    paragraphs: [
      "Our children are not only taught to fly high in the open sky of tremendous opportunities but also to <b>stay attached to their roots</b>. Our Vidyalaya imparts value and skill-based education, bringing out the best in every child.",
      "Our earnest effort is to provide a <b>conducive learning environment</b> to each and every student so that when they go out of our portals, they brim with confidence and emerge as the leading human beings of tomorrow.",
      "The essence of Sant Pathik Vidyalaya lies in its <b>inclusiveness</b>. The mentors at our school are competent, hardworking, dedicated and committed to excellence. Education is not just the transfer of information — it is the transformation of character.",
      "We strive to make SPV a place where <b>curiosity is celebrated, creativity is nurtured</b>, and every student is equipped with the skills, values and confidence to make a meaningful difference in the world.",
    ],
    stats: [
      { l:'Qualification', v:'M.A. B.Ed' },
      { l:'Experience',    v:'22+ Years' },
      { l:'Mobile',        v:'+91 8318842325' },
      { l:'Board',         v:'CBSE' },
    ],
    vpCard: { emoji:'👨‍🏫', name:'Mr. Bhikha Ram Tripathi', role:'Vice Principal', creds:'M.Sc B.Ed  |  +91 8318600231' },
    delay: 0,
  },
]

export default function LeaderMessages_1() {
  useEffect(() => {
    const s = document.createElement("style")
    s.id = "lm1-css"; s.textContent = CSS
    document.head.appendChild(s)
    return () => document.getElementById("lm1-css")?.remove()
  }, [])

  const headRef = useReveal("up", 0)

  return (
    <section className="lm1">
      <div className="lm1-star">
        <svg viewBox="0 0 26 26" fill="none" width="22">
          {[0,45,90,135].map(a=>(<line key={a} x1="13" y1="2" x2="13" y2="24" stroke="#E8761A" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 13 13)`}/>))}
        </svg>
      </div>
      <div className="lm1-dot" />
      <div ref={headRef}>
        <div className="lm1-label">Academic Leadership</div>
        <h2 className="lm1-title">Message from the <em>Principal's Desk</em></h2>
      </div>
      {LEADERS.map((l, i) =>
        l.type === "a"
          ? <CardA key={i} {...l} />
          : <CardB key={i} {...l} />
      )}
    </section>
  )
}