import { useEffect, useRef, useState } from 'react'
import { FaLandmark, FaFileAlt, FaGraduationCap, FaHome, FaLaptop, FaUsers, FaRocket } from 'react-icons/fa'

var MILESTONES = [
  { year:'1987', title:'Foundation',              icon:<FaLandmark size={20} color="#fff"/>,     desc:'Sant Pathik Vidyalaya established by the visionary Sant Pathik Ji Maharaj in Bahraich, UP — beginning with just 70–80 students and a dream of "Education with Values and Excellence".' },
  { year:'1995', title:'CBSE Affiliation',        icon:<FaFileAlt size={20} color="#fff"/>,      desc:'School received official CBSE affiliation (No. 2130176), marking a new era of quality education under national board standards.' },
  { year:'2002', title:'Senior Secondary Wing',   icon:<FaGraduationCap size={20} color="#fff"/>,desc:'Expanded to Class XI–XII with Science, Commerce and Humanities streams, offering complete K-12 education under one roof.' },
  { year:'2010', title:'Hostel Facility',         icon:<FaHome size={20} color="#fff"/>,         desc:'Residential hostel launched on the 10-acre campus, enabling students from distant areas to access quality education.' },
  { year:'2015', title:'Smart Infrastructure',    icon:<FaLaptop size={20} color="#fff"/>,       desc:'School upgraded with smart classrooms, digital projectors, Wi-Fi campus, 8 specialized laboratories and expanded library.' },
  { year:'2020', title:'1000+ Students',          icon:<FaUsers size={20} color="#fff"/>,        desc:'School crossed the 1000 enrolled students milestone, reflecting the growing trust of families across Bahraich.' },
  { year:'2026', title:'1410 Students & Growing', icon:<FaRocket size={20} color="#fff"/>,       desc:'Today SPV stands proud with 1410 students, 64+ expert faculty, 22 school buses and a legacy of 100% board results.' },
]

export default function SchoolHistory() {
  var [visible, setVisible] = useState([])
  var refs = useRef([])

  useEffect(function(){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          var i = Number(en.target.dataset.idx)
          setVisible(function(p){ return p.includes(i) ? p : [...p, i] })
        }
      })
    },{ threshold:0.18 })
    refs.current.forEach(function(r){ if(r) obs.observe(r) })
    return function(){ obs.disconnect() }
  },[])

  return (
    <section id="history" style={{padding:'80px 0',background:'linear-gradient(180deg,#FFFDF8 0%,#FFF6EA 50%,#FFFDF8 100%)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
        <div style={{position:'absolute',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,118,26,.05),transparent 70%)',top:'-150px',right:'-150px'}} />
        <div style={{position:'absolute',width:'350px',height:'350px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,184,0,.06),transparent 70%)',bottom:'-80px',left:'-80px'}} />
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:1}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div className="chip"><span className="chip-dot"/>Our Journey</div>
          <h2 className="sec-title">A Legacy Built <span className="hl">Over Decades</span></h2>
          <div className="s-bar" style={{margin:'0 auto 16px'}} />
          <p className="s-desc" style={{margin:'0 auto',textAlign:'center'}}>From humble beginnings in 1987 to becoming Bahraich's most trusted school — every chapter is a story of dedication.</p>
        </div>

        {/* Desktop timeline */}
        <div className="hist-desktop">
          <div style={{position:'absolute',left:'50%',top:0,bottom:0,width:'3px',background:'linear-gradient(to bottom,transparent,#E8761A 8%,#F5B800 50%,#E8761A 92%,transparent)',transform:'translateX(-50%)',borderRadius:'3px'}} />
          {MILESTONES.map(function(m,i){
            var isLeft = i%2===0
            var isVis  = visible.includes(i)
            return (
              <div key={i} ref={function(el){refs.current[i]=el}} data-idx={i}
                style={{display:'flex',justifyContent:isLeft?'flex-start':'flex-end',marginBottom:'48px',position:'relative',opacity:isVis?1:0,transform:isVis?'none':isLeft?'translateX(-40px)':'translateX(40px)',transition:'opacity .6s ease '+(i*0.09)+'s, transform .6s ease '+(i*0.09)+'s'}}>
                <div style={{position:'absolute',left:'50%',top:'20px',transform:'translateX(-50%)',zIndex:3}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 0 4px #FFF6EA,0 0 0 7px rgba(232,118,26,.18),0 8px 24px rgba(232,118,26,.3)',transition:'transform .25s'}}
                    onMouseEnter={function(e){e.currentTarget.style.transform='scale(1.18)'}}
                    onMouseLeave={function(e){e.currentTarget.style.transform='scale(1)'}}>
                    {m.icon}
                  </div>
                </div>
                <div style={{width:'43%',background:'#FFFFFF',borderRadius:'20px',border:'1.5px solid rgba(232,118,26,.1)',padding:'22px 24px',boxShadow:'0 4px 20px rgba(232,118,26,.07)',transition:'all .28s'}}
                  onMouseEnter={function(e){e.currentTarget.style.boxShadow='0 14px 44px rgba(232,118,26,.14)';e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.borderColor='rgba(232,118,26,.28)'}}
                  onMouseLeave={function(e){e.currentTarget.style.boxShadow='0 4px 20px rgba(232,118,26,.07)';e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(232,118,26,.1)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'9px'}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:'26px',fontWeight:'700',background:'linear-gradient(135deg,#E8761A,#F5B800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{m.year}</span>
                    <div style={{height:'2px',flex:1,background:'linear-gradient(90deg,#E8761A,transparent)',borderRadius:'2px'}} />
                  </div>
                  <div style={{fontSize:'14.5px',fontWeight:'700',color:'#1C0A00',marginBottom:'8px'}}>{m.title}</div>
                  <div style={{fontSize:'13px',color:'#7A4010',lineHeight:'1.72'}}>{m.desc}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile timeline */}
        <div className="hist-mobile">
          {MILESTONES.map(function(m,i){
            return (
              <div key={i} style={{display:'flex',gap:'0',marginBottom:'0'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0,width:'52px'}}>
                  <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 16px rgba(232,118,26,.35)',flexShrink:0,border:'3px solid #FFF6EA',zIndex:1}}>
                    {m.icon}
                  </div>
                  {i < MILESTONES.length - 1 && (
                    <div style={{width:'2px',flex:1,minHeight:'32px',background:'linear-gradient(to bottom,#E8761A,rgba(232,118,26,.18))',marginTop:'4px',borderRadius:'2px'}} />
                  )}
                </div>
                <div style={{flex:1,marginLeft:'12px',marginBottom:'20px'}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'linear-gradient(135deg,#E8761A,#F5B800)',borderRadius:'20px',padding:'3px 12px',marginBottom:'10px'}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:'13px',fontWeight:'800',color:'#1C0A00'}}>{m.year}</span>
                  </div>
                  <div style={{background:'#FFFFFF',borderRadius:'18px',border:'1.5px solid rgba(232,118,26,.14)',padding:'18px',boxShadow:'0 6px 24px rgba(232,118,26,.09)',position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:'linear-gradient(90deg,#E8761A,#F5B800)',borderRadius:'18px 18px 0 0'}} />
                    <div style={{fontSize:'13px',fontWeight:'800',color:'#1C0A00',marginBottom:'8px'}}>{m.title}</div>
                    <div style={{fontSize:'12.5px',color:'#7A4010',lineHeight:'1.72'}}>{m.desc}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .hist-desktop { position:relative; display:block; }
        .hist-mobile  { display:none; }
        @media (max-width:768px) { .hist-desktop { display:none !important; } .hist-mobile { display:block !important; } }
      `}</style>
    </section>
  )
}