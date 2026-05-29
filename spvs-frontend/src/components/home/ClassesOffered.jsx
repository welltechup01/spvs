import { useState, useEffect } from 'react'
import { FaSeedling, FaBook, FaDraftingCompass, FaFlask, FaAtom, FaBriefcase } from 'react-icons/fa'

var CLASSES = [
  { icon:<FaSeedling size={48} color="#E8761A"/>, image:'/images/Pre Primary.webp', title:'Pre-Primary', sub:'Play Group, Nursery, LKG, UKG', desc:'NEP-2020 aligned early childhood education focusing on listening, speaking, reading, writing, numeracy and cognitive development through play.', students:'160' },
  { icon:<FaBook size={48} color="#E8761A"/>, image:'/images/Primary.webp', title:'Primary (I–V)', sub:'Classes I to V', desc:'Strong foundation in English, Hindi, Maths, EVS, Science, Social Science with Computer, Art, Music and Physical Education.', students:'376' },
  { icon:<FaDraftingCompass size={48} color="#E8761A"/>, image:'/images/Middle.webp', title:'Middle (VI–VIII)', sub:'Classes VI to VIII', desc:'Core subjects plus Sanskrit, Computer Education, GK, Art & Craft, Music, and Physical Education for all-round development.', students:'285' },
  { icon:<FaFlask size={48} color="#E8761A"/>, image:'/images/Secondary.webp', title:'Secondary (IX–X)', sub:'Classes IX to X', desc:'CBSE curriculum with Mathematics, Science, Social Science, English, Hindi and Information Technology. Strong board exam preparation.', students:'315' },
  { icon:<FaAtom size={48} color="#E8761A"/>, image:'/images/Science stream.webp', title:'Science Stream (XI–XII)', sub:'Physics · Chemistry · Biology/Maths', desc:'PCB / PCM with English Core, Hindi/CS/PE. Well-equipped labs and experienced PGT faculty ensuring 100% results.', students:'274' },
  { icon:<FaBriefcase size={48} color="#E8761A"/>, image:'/images/Commerce stream.webp', title:'Commerce Stream (XI–XII)', sub:'Accountancy · Business Studies · Economics', desc:'Commerce with English Core, Hindi/CS/PE. Building future entrepreneurs, accountants and business leaders.', students:'274' },
]

export default function ClassesOffered() {
  const [act, setAct] = useState(0)

  // Preload ALL images immediately on mount so browser caches them
  useEffect(() => {
    CLASSES.forEach(c => {
      const img = new Image()
      img.src = c.image
    })
  }, [])

  return (
    <section className="curr-sect sect">
      <div className="s-cont">
        <div className="rv" style={{marginBottom:'0'}}>
          <div className="chip"><span className="chip-dot"></span>Classes Offered</div>
          <h2 className="sec-title">From <span className="hl">Nursery</span> to <span className="hl">Class XII</span></h2>
          <div className="s-bar"></div>
          <p className="s-desc">Comprehensive education across all levels — CBSE curriculum, experienced faculty, modern infrastructure.</p>
        </div>
        <div className="curr-lay">
          <div className="curr-tl">
            {CLASSES.map((c,i) => (
              <div key={i} className={`ci${act===i?' act':''}`} onClick={() => setAct(i)}>
                <div className="ci-dot">
                  <span className="ci-em" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {i===0 && <FaSeedling size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===1 && <FaBook size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===2 && <FaDraftingCompass size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===3 && <FaFlask size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===4 && <FaAtom size={18} color={act===i?'#fff':'#E8761A'}/>}
                    {i===5 && <FaBriefcase size={18} color={act===i?'#fff':'#E8761A'}/>}
                  </span>
                </div>
                <div>
                  <div className="ci-title">{c.title}</div>
                  <div className="ci-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="curr-vis rv" style={{background:'#111',padding:0,overflow:'hidden',position:'relative'}}>

            {/* All images stacked — only the active one is visible. 
                Since all are already in DOM and preloaded, switching is instant — no fetch delay. */}
            {CLASSES.map((c,i) => (
              <img
                key={i}
                src={c.image}
                alt={c.title}
                style={{
                  position:'absolute',
                  inset:0,
                  width:'100%',
                  height:'100%',
                  objectFit:'cover',
                  display:'block',
                  opacity: act===i ? 1 : 0,
                  transition:'opacity 0.45s ease',
                  willChange:'opacity',
                }}
              />
            ))}

            {/* Dark gradient overlay */}
            <div style={{
              position:'absolute',
              inset:0,
              background:'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
              zIndex:1,
            }}/>

            {/* Bottom-left text overlay */}
            <div style={{position:'absolute',bottom:'24px',left:'28px',zIndex:2}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#fff',lineHeight:'1.3'}}>{CLASSES[act].title}</div>
              <div style={{fontSize:'13px',color:'rgba(255,255,255,0.80)',marginTop:'4px',fontWeight:'500',letterSpacing:'0.3px'}}>CBSE · Sant Pathik Vidyalaya</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}