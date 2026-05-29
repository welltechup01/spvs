import { useState, useEffect } from 'react'
import { testimonialAPI } from '../../api'
import { FaStar } from 'react-icons/fa'

var FALLBACK = [
  { message:"The teachers at SPV are very dedicated. My daughter improved tremendously in academics and also developed her personality. Best school in Bahraich!", name:"Rajesh Kumar", role:"Parent — Class X" },
  { message:"My son won a prize at KBC! The school environment gave him the confidence to participate. We are so proud of SPV and their encouragement.", name:"Sunita Raghuvansh", role:"Parent — Class V" },
  { message:"I passed Class XII from SPV and now I'm at IIT BHU. The foundation built here prepared me for everything. Grateful to all my teachers.", name:"Shrami Agarwal", role:"Alumni — IIT BHU Student" },
]

function avatar(name){ return (name||'?').split(' ').slice(0,2).map(function(w){return w[0]}).join('').toUpperCase() }

export default function Testimonials() {
  var [items, setItems]     = useState([])
  var [loading, setLoading] = useState(true)

  useEffect(function() {
    testimonialAPI.getAll()
      .then(function(res){ setItems(res.data||[]); setLoading(false) })
      .catch(function(){ setLoading(false) })
  }, [])

  var display = items.length > 0 ? items.slice(0,3) : FALLBACK

  return (
    <section className="testi-sect sect">
      <div className="s-cont">
        <div className="rv" style={{marginBottom:'0'}}>
          <div className="chip"><span className="chip-dot"></span>Testimonials</div>
          <h2 className="sec-title">Words from Our <span className="hl">School Family</span></h2>
          <div className="s-bar"></div>
        </div>
        <div className="testi-lay">

          {/* Left — school_students.jpg */}
          <div className="vid-box rv" style={{position:'relative',overflow:'hidden',borderRadius:'24px',border:'3px solid rgba(232,118,26,.2)',boxShadow:'0 20px 60px rgba(232,118,26,.15)'}}>
            <img
              src="/images/school_students.jpg"
              alt="SPV Students"
              className="testi-img"
              style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',display:'block',transition:'transform .5s cubic-bezier(.25,.46,.45,.94)'}}
              onError={function(e){
                e.target.style.display='none'
                e.target.nextSibling.style.display='flex'
              }}
            />
            <div style={{display:'none',width:'100%',height:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',padding:'40px',background:'linear-gradient(135deg,var(--or),var(--gd))',position:'absolute',inset:0}}>
              <FaStar size={60} color="#fff"/>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#fff',textAlign:'center',lineHeight:'1.3'}}>"Best School<br/>in Bahraich"</div>
              <div style={{fontSize:'14px',color:'rgba(255,255,255,.8)',textAlign:'center'}}>Rated 4.9/5 by 1000+ families</div>
            </div>
            <div className="vid-ov" style={{background:'linear-gradient(0deg,rgba(28,10,0,.45) 0%,transparent 50%)'}} />
            <div className="vid-caption">1410+ Happy Students</div>
          </div>

          {/* Right — cards */}
          <div className="t-cards">
            {loading ? (
              [0,1,2].map(function(i){
                return (
                  <div key={i} className="tcard" style={{opacity:.5,animation:'pulse 1.5s ease-in-out infinite'}}>
                    <div style={{height:'12px',background:'rgba(232,118,26,.15)',borderRadius:'6px',marginBottom:'8px'}}/>
                    <div style={{height:'48px',background:'rgba(232,118,26,.08)',borderRadius:'6px',marginBottom:'12px'}}/>
                    <div style={{height:'12px',background:'rgba(232,118,26,.1)',borderRadius:'6px',width:'60%'}}/>
                  </div>
                )
              })
            ) : display.map(function(t, i) {
              return (
                <div className={'tcard d' + (i+1)} key={t._id||i}>
                  <div className="tstars" style={{display:'flex',gap:'2px'}}>
                    {[1,2,3,4,5].map(function(s){
                      return <FaStar key={s} size={13} color={s<=(t.rating||5)?'#F5B800':'rgba(232,118,26,.2)'}/>
                    })}
                  </div>
                  <div className="tq">"{t.message}"</div>
                  <div className="tauth">
                    <div className="tav" style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:'800',background:'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',borderRadius:'50%',width:'38px',height:'38px',flexShrink:0}}>
                      {avatar(t.name)}
                    </div>
                    <div>
                      <div className="tname">{t.name}</div>
                      <div className="trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:.2} }
        .vid-box:hover .testi-img { transform: scale(1.05) !important; }
      `}</style>
    </section>
  )
}