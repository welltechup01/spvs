import { useRef, useEffect } from "react"

function useReveal(cls = "", delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.classList.add("sr")
    if (cls) el.classList.add(cls)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add("in"), delay)
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Nunito+Sans:wght@300;400;600;700&display=swap');

.lm *, .lm *::before, .lm *::after { box-sizing:border-box; margin:0; padding:0; }
.lm {
  font-family:'Nunito Sans',sans-serif;
  background:#FFFDF8; color:#1C0A00;
  padding:80px 72px; position:relative; overflow-x:hidden;
}

.sr { opacity:0; transform:translateY(32px); transition:opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1); }
.sr.from-left  { transform:translateX(-48px); }
.sr.from-right { transform:translateX( 48px); }
.sr.from-up    { transform:translateY( 32px); }
.sr.in         { opacity:1 !important; transform:none !important; }

@keyframes lmFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes lmSpin  { to{transform:rotate(360deg)} }
@keyframes lmPulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
@keyframes lmGrow  { from{width:0} to{width:32px} }

.lm-label {
  display:inline-flex; align-items:center; gap:10px;
  font-size:11px; letter-spacing:4px; text-transform:uppercase;
  color:#E8761A; font-weight:700; margin-bottom:12px;
}
.lm-label::before { content:''; display:block; width:32px; height:1.5px; background:#E8761A; animation:lmGrow .9s ease both; }
.lm-section-title {
  font-family:'Playfair Display',serif;
  font-size:clamp(1.6rem,3vw,2.6rem);
  font-weight:900; color:#1C0A00; line-height:1.12; margin-bottom:48px;
}
.lm-section-title em { font-style:italic; color:#E8761A; }

.lm-star { position:absolute; top:56px; right:15%; animation:lmFloat 5s ease-in-out infinite; pointer-events:none; }
.lm-dot  { position:absolute; bottom:120px; right:4%; width:14px; height:14px; border-radius:50%; background:linear-gradient(135deg,#F5B800,#E8761A); animation:lmPulse 3s ease-in-out infinite; pointer-events:none; }

/* ── Card ── */
.lm-card-b {
  display:flex; flex-direction:row; align-items:flex-start; gap:0;
  border-radius:28px; background:#FFF6EA;
  border:1px solid rgba(232,118,26,.12);
  box-shadow:0 6px 36px rgba(28,10,0,.05);
  padding:56px 64px; position:relative;
  transition:box-shadow .4s, transform .4s;
}
.lm-card-b:hover { box-shadow:0 14px 52px rgba(28,10,0,.09); transform:translateY(-4px); }
.lm-card-b-star { position:absolute; top:24px; right:200px; animation:lmFloat 5s ease-in-out infinite; pointer-events:none; }

.lm-text-b { flex:1; min-width:0; padding-right:72px; }
.lm-msg-title {
  font-family:'Playfair Display',serif;
  font-size:clamp(1.6rem,3vw,3rem); font-weight:900; color:#1C0A00;
  margin-bottom:22px; display:flex; align-items:center; gap:16px; flex-wrap:wrap;
}
.lm-title-decos { display:inline-flex; align-items:center; gap:6px; flex-shrink:0; }
.lm-salutation { font-family:'Playfair Display',serif; font-style:italic; font-size:clamp(.85rem,1.2vw,1rem); color:#C45F0A; margin-bottom:22px; }
.lm-para { font-size:clamp(.82rem,1.1vw,.94rem); line-height:1.92; color:#7A4010; font-weight:300; margin-bottom:14px; }
.lm-para:last-of-type { margin-bottom:28px; }
.lm-para.dc::first-letter { float:left; font-family:'Playfair Display',serif; font-size:3.2em; line-height:.76; font-weight:900; color:#E8761A; margin:4px 10px 0 0; }
.lm-warm { font-size:.86rem; color:#7A4010; font-style:italic; margin-bottom:8px; }
.lm-sig-name { font-family:'Playfair Display',serif; font-size:clamp(1rem,1.8vw,1.4rem); font-weight:800; color:#1C0A00; margin-bottom:3px; }
.lm-sig-role { font-size:.76rem; color:#E8761A; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:14px; }
.lm-phone { display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:30px; background:rgba(232,118,26,.1); border:1px solid rgba(232,118,26,.25); color:#C45F0A; font-size:13px; font-weight:600; text-decoration:none; transition:all .2s; }
.lm-phone:hover { background:rgba(232,118,26,.22); }
.lm-quote-block { margin-top:24px; padding:16px 20px; border-radius:16px; background:rgba(232,118,26,.08); border:1px solid rgba(232,118,26,.18); display:inline-block; max-width:100%; }
.lm-quote-block-text { font-family:'Playfair Display',serif; font-size:14px; font-style:italic; color:#C45F0A; margin-bottom:5px; }
.lm-quote-block-attr { font-size:12px; color:#B87832; font-weight:600; }

/* circle photo */
.lm-photo-circle-wrap { flex-shrink:0; width:200px; position:relative; display:flex; flex-direction:column; align-items:center; }
.lm-quote-badge-b { position:absolute; top:-24px; left:-20px; font-family:Georgia,serif; font-size:5rem; font-weight:900; color:#E8761A; line-height:1; opacity:.18; pointer-events:none; z-index:0; }
.lm-circle-frame { position:relative; width:200px; height:200px; border-radius:50%; overflow:hidden; box-shadow:0 16px 48px rgba(28,10,0,.12); transition:transform .6s cubic-bezier(.25,.46,.45,.94); display:block; }
.lm-circle-frame:hover { transform:scale(1.04); }
.lm-circle-frame img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
.lm-emoji-avatar { width:200px; height:200px; border-radius:50%; background:linear-gradient(135deg,#E8761A,#F5B800); display:flex; align-items:center; justify-content:center; font-size:70px; box-shadow:0 16px 48px rgba(28,10,0,.15); }
.lm-b-name { font-family:'Playfair Display',serif; font-size:clamp(.9rem,1.4vw,1.2rem); font-weight:800; color:#1C0A00; text-align:center; margin-top:20px; margin-bottom:4px; }
.lm-b-role { font-size:.72rem; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#E8761A; text-align:center; }
.lm-b-rule { width:36px; height:3px; border-radius:2px; margin:10px auto 0; background:linear-gradient(to right,#E8761A,#F5B800); }

/* ═══ LAPTOP ≤ 1024px ═══ */
@media (max-width:1024px) {
  .lm { padding:72px 48px; }
  .lm-card-b { padding:48px 48px; }
  .lm-text-b { padding-right:48px; }
  .lm-card-b-star { right:160px; }
}

/* ═══ TABLET ≤ 768px ═══ */
@media (max-width:768px) {
  .lm { padding:60px 32px; }
  .lm-card-b { padding:40px 32px; }
  .lm-text-b { padding-right:32px; }
  .lm-card-b-star { right:120px; }
  .lm-section-title { margin-bottom:36px; }
  .lm-photo-circle-wrap { width:160px; }
  .lm-circle-frame, .lm-emoji-avatar { width:160px !important; height:160px !important; }
}

/* ═══ PHONE ≤ 640px ═══ */
@media (max-width:640px) {
  .lm { padding:48px 20px; }
  .lm-card-b {
    flex-direction:column;
    padding:28px 20px;
    gap:28px;
    border-radius:20px;
  }
  .lm-card-b:hover { transform:none; }
  .lm-card-b-star { display:none; }
  .lm-text-b { padding-right:0; }
  .lm-section-title { margin-bottom:28px; }
  .lm-msg-title { font-size:clamp(1.3rem,5vw,1.8rem); gap:8px; }
  .lm-photo-circle-wrap { width:100%; flex-direction:row; align-items:center; gap:20px; }
  .lm-circle-frame, .lm-emoji-avatar { width:120px !important; height:120px !important; font-size:44px !important; flex-shrink:0; }
  .lm-quote-badge-b { display:none; }
  .lm-b-name { text-align:left; margin-top:0; font-size:.95rem; }
  .lm-b-role { text-align:left; }
  .lm-b-rule { margin:8px 0 0; }
  .lm-quote-block { display:block; }
}

/* ═══ SMALL PHONE ≤ 400px ═══ */
@media (max-width:400px) {
  .lm { padding:40px 14px; }
  .lm-circle-frame, .lm-emoji-avatar { width:90px !important; height:90px !important; font-size:34px !important; }
  .lm-card-b { padding:24px 14px; }
}
`

function CardB({ photo, emoji, name, role, phone, msgTitle, salutation, paragraphs, quote, delay }) {
  const cardRef = useReveal("from-up",    delay)
  const textRef = useReveal("from-left",  delay + 60)
  const imgRef  = useReveal("from-right", delay + 100)

  return (
    <div ref={cardRef} className="lm-card-b">
      <div className="lm-card-b-star">
        <svg viewBox="0 0 22 22" fill="none" width="18">
          {[0,45,90,135].map(a=>(
            <line key={a} x1="11" y1="1" x2="11" y2="21" stroke="#E8761A" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 11 11)`}/>
          ))}
        </svg>
      </div>

      {/* text left */}
      <div ref={textRef} className="lm-text-b">
        <div className="lm-msg-title">
          {msgTitle}
          <span className="lm-title-decos">
            <svg viewBox="0 0 12 12" width="10" fill="#E8761A"><rect x="0" y="0" width="12" height="12" rx="2" transform="rotate(45 6 6)"/></svg>
            <svg viewBox="0 0 22 22" fill="none" width="18">
              {[0,45,90,135].map(a=>(<line key={a} x1="11" y1="1" x2="11" y2="21" stroke="#F5B800" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 11 11)`}/>))}
            </svg>
          </span>
        </div>
        <div className="lm-salutation">{salutation}</div>
        {paragraphs.map((p, i) => (
          <p key={i} className={`lm-para${i === 0 ? " dc" : ""}`}>{p}</p>
        ))}
        {quote && (
          <div className="lm-quote-block">
            <div className="lm-quote-block-text">"{quote.text}"</div>
            <div className="lm-quote-block-attr">— {quote.author}</div>
          </div>
        )}
        <div style={{ marginTop:24 }}>
          <div className="lm-warm">Warm Regards,</div>
          <div className="lm-sig-name">{name}</div>
          <div className="lm-sig-role">{role}</div>
          {phone && <a href={`tel:${phone.replace(/\s/g,'')}`} className="lm-phone">📞 {phone}</a>}
        </div>
      </div>

      {/* spinning circle photo right */}
      <div ref={imgRef} className="lm-photo-circle-wrap">
        <div className="lm-quote-badge-b">"</div>
        <div style={{ position:"relative", flexShrink:0 }}>
          <svg viewBox="0 0 216 216" fill="none"
            style={{ position:"absolute", inset:-8, width:"calc(100% + 16px)", height:"calc(100% + 16px)", animation:"lmSpin 18s linear infinite", pointerEvents:"none" }}>
            <circle cx="108" cy="108" r="102" stroke="#E8761A" strokeWidth="1.5" strokeDasharray="7 5"/>
          </svg>
          {photo
            ? <div className="lm-circle-frame"><img src={photo} alt={name} /></div>
            : <div className="lm-emoji-avatar">{emoji || '👔'}</div>
          }
        </div>
        <div className="lm-b-name">{name}</div>
        <div className="lm-b-role">{role}</div>
        <div className="lm-b-rule" />
      </div>
    </div>
  )
}

const LEADERS = [
  {
    photo: "/images/Director.webp",
    name: "Sh. Awadhesh Narayan Agarwal",
    role: "Director & Manager",
    phone: "+91 9198783830",
    msgTitle: "From The Director's Desk",
    salutation: "Dear Students, Parents & Staff,",
    paragraphs: [
      "We truly believe that our education should now move from knowledge to skill and wisdom, from competition to cooperation, and from division to unity — and finally from 'how to earn a livelihood' to 'how to live'.",
      "We aim to make our students capable enough to be self-directed and self-managed individuals who can confront the challenges of life without wavering. S.P.V. emphasizes imparting strong ethical and moral values alongside academic learning.",
      "We believe that problems exist in everyone's life, but we frequently remind our students — do not be afraid of failure. Instead, strive hard to achieve success, excellence and good leadership.",
      "I extend a hearty and warm welcome to all parents, students and staff of this great institution.",
    ],
    quote: { text:"Great things are done by a series of small things brought together.", author:"Vincent Van Gogh" },
    delay: 0,
  },
]

export default function LeaderMessages() {
  useEffect(() => {
    const s = document.createElement("style")
    s.id = "lm-css"; s.textContent = CSS
    document.head.appendChild(s)
    return () => document.getElementById("lm-css")?.remove()
  }, [])

  const headRef = useReveal("from-up", 0)

  return (
    <section className="lm">
      <div className="lm-star">
        <svg viewBox="0 0 26 26" fill="none" width="22">
          {[0,45,90,135].map(a=>(<line key={a} x1="13" y1="2" x2="13" y2="24" stroke="#E8761A" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 13 13)`}/>))}
        </svg>
      </div>
      <div className="lm-dot" />
      <div ref={headRef}>
        <div className="lm-label">Leadership</div>
        <h2 className="lm-section-title">Message from Our <em>Leadership</em></h2>
      </div>
      {LEADERS.map((l, i) => <CardB key={i} {...l} />)}
    </section>
  )
}