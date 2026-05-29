import useSettings from '../../hooks/useSettings'
import { FaGraduationCap, FaTrophy, FaTree, FaBus, FaSchool } from 'react-icons/fa'

export default function SchoolIntro() {
  const { settings } = useSettings()
  const school = settings.school || {}

  const name       = school.name        || 'Sant Pathik Vidyalaya'
  const est        = school.established || '1987'
  const students   = school.students    || '1410+'
  const teachers   = '64+'
  const classrooms = school.classrooms  || '73'
  const labs       = school.labs        || '8'
  const area       = school.area        || '10 Acres'
  const buses      = school.buses       || '22'
  const affNo      = school.affNo       || '2130176'
  const board      = school.board       || 'CBSE'
  const years      = new Date().getFullYear() - Number(est)

  const POINTS = [
    { icon:<FaGraduationCap size={22} color="#000"/>, t:board + ' Curriculum', d:'Aligned with national standards · Affiliation No. ' + affNo + ' · Science, Commerce & Humanities streams at Senior Secondary level.' },
    { icon:<FaTrophy size={22} color="#000"/>,        t:'Consistent Strong Results', d:'Excellent board results in Classes 10 & 12 every year with dedicated and supportive teaching staff.' },
    { icon:<FaTree size={22} color="#000"/>,          t:'Safe & Green Campus', d:'Safe, green and disciplined campus environment spread across ' + area + ' in Pashupati Nagar, Bahraich.' },
    { icon:<FaBus size={22} color="#000"/>,           t:'Transport Network', d:buses + ' school buses covering all routes in and around Bahraich. Safe, punctual and reliable.' },
  ]

  return (
    <section className="about-sect sect">
      <div className="s-cont">
        <div className="about-grid">
          <div className="about-vis rv">

            {/*
              KEY FIX: a dedicated hard-clip shell sits OUTSIDE .about-main
              and masks every child — image, overlay, text — to the same
              rounded rectangle. Nothing can paint outside it.
            */}
            <div className="spv-clip-shell">

              {/* .about-main keeps its original class for height / shadow */}
              <div className="about-main spv-img-inner">
                <img
                  src="/images/about_school.png"
                  alt={name}
                  className="about-school-img"
                  onError={function(e){
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback shown when image fails */}
                <div className="about-fallback">
                  <FaSchool size={72} color="#E8761A"/>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',color:'var(--dark2)',textAlign:'center',padding:'0 16px'}}>{area} Campus</div>
                  <div style={{fontSize:'13px',color:'var(--txt2)',textAlign:'center',padding:'0 20px'}}>{classrooms} Classrooms · {labs} Labs · Sports Stadium</div>
                </div>
              </div>

              {/* Gradient overlay — now INSIDE the clip shell */}
              <div className="about-main-ov"></div>

              {/* Bottom text — now INSIDE the clip shell */}
              <div className="about-main-txt">
                <div className="about-motto">"Education with Values"</div>
                <div className="about-motto-s">{name}, Est. {est}</div>
              </div>

            </div>{/* /spv-clip-shell */}

            {/* Float badge stays OUTSIDE (it overlaps the frame deliberately) */}
            <div className="about-float">
              <div className="af-n">{years}</div>
              <div className="af-l">Years of<br/>Excellence</div>
            </div>

          </div>

          <div>
            <div className="chip rv"><span className="chip-dot"></span>About Our School</div>
            <h2 className="sec-title rv">37+ Years of Quality Education <span className="hl">in Bahraich</span></h2>
            <div className="s-bar rv"></div>
            <p className="s-desc rv">
              Founded in {est}, {name} (SPV) is a {board} Senior Secondary school located in Pashupati Nagar, Bahraich. For more than three decades, the school has focused on strong academics along with moral values. Guided by the motto "Work is Worship," SPV provides education from Class 1 to Class 12 with discipline and dedication.
            </p>
            <div className="about-pts">
              {POINTS.map(function(p,i) {
                return (
                  <div className="apt rv3d" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                    <div className="apt-ic" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{p.icon}</div>
                    <div><div className="apt-t">{p.t}</div><div className="apt-d">{p.d}</div></div>
                  </div>
                )
              })}
            </div>
            <div className="about-stats-row rv" style={{transitionDelay:'.4s'}}>
              <div className="asr"><div className="asr-n">{students}</div><div className="asr-l">Students</div></div>
              <div className="asr"><div className="asr-n">{teachers}</div><div className="asr-l">Teachers</div></div>
              <div className="asr"><div className="asr-n">{classrooms}</div><div className="asr-l">Classrooms</div></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ══════════════════════════════════════
           HARD CLIP SHELL — the single source
           of truth for the rounded rectangle.
           Every child is masked inside this box.
        ══════════════════════════════════════ */
        .spv-clip-shell {
          position: relative;
          width: 100%;
          height: 490px;               /* matches original .about-main height */
          border-radius: 32px;
          overflow: hidden;            /* primary clip */

          /* Belt-and-suspenders: GPU compositing layer forces the
             browser to honour overflow:hidden on ALL four corners,
             even for mosaic/grid children that try to paint outside */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: transform;

          /* SVG mask — the nuclear option that works in every browser */
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' rx='32' ry='32' fill='white'/%3E%3C/svg%3E");
                  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' rx='32' ry='32' fill='white'/%3E%3C/svg%3E");
          -webkit-mask-size: 100% 100%;
                  mask-size: 100% 100%;

          /* Visual frame */
          border: 3px solid rgba(232,118,26,.25);
          box-shadow: 0 20px 60px rgba(232,118,26,.18),
                      0 0 0 6px rgba(232,118,26,.06);
        }

        /* ── Strip .about-main of its own radius/overflow
           (the shell now handles that) ── */
        .about-main.spv-img-inner {
          border-radius: 0 !important;
          overflow: hidden !important;
          border: none !important;
          box-shadow: none !important;
          height: 100% !important;
          width: 100% !important;
          position: absolute !important;
          inset: 0 !important;
        }

        /* ── Image: smooth continuous zoom in → out ── */
        .about-school-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          display: block !important;
          border-radius: 0 !important;
          animation: spv-zoom 8s ease-in-out infinite !important;
          will-change: transform !important;
          transform-origin: center center !important;
        }

        /* Pause zoom on hover so users can look at the image */
        .spv-clip-shell:hover .about-school-img {
          animation-play-state: paused !important;
        }

        @keyframes spv-zoom {
          0%   { transform: scale(1);    }
          50%  { transform: scale(1.10); }
          100% { transform: scale(1);    }
        }

        /* ── Overlay and text are positioned inside the shell ── */
        .spv-clip-shell .about-main-ov {
          position: absolute !important;
          inset: 0 !important;
          background: linear-gradient(0deg, rgba(28,10,0,.7) 0%, transparent 55%) !important;
          z-index: 2 !important;
          border-radius: 0 !important;
        }

        .spv-clip-shell .about-main-txt {
          position: absolute !important;
          bottom: 26px !important;
          left: 26px !important;
          right: 26px !important;
          z-index: 3 !important;
        }

        /* ── Fallback ── */
        .about-fallback {
          display: none;
          width: 100%;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, #FFF8DC, #FFE0A0);
          position: absolute;
          inset: 0;
        }

        /* ── Responsive height adjustment ── */
        @media (max-width: 768px) {
          .spv-clip-shell { height: 280px; border-radius: 22px; }
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' rx='22' ry='22' fill='white'/%3E%3C/svg%3E");
                  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' rx='22' ry='22' fill='white'/%3E%3C/svg%3E");
        }
        @media (max-width: 480px) {
          .spv-clip-shell { height: 240px; border-radius: 18px; }
        }
      `}</style>
    </section>
  )
}