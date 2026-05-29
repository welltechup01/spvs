import { FaPalette, FaMusic, FaFutbol, FaFlask, FaBook, FaCampground, FaHandshake, FaLaptop, FaSun, FaBookOpen, FaAppleAlt, FaPaintBrush, FaUtensils, FaMicroscope, FaBus, FaRunning, FaGraduationCap, FaFlag, FaUsers, FaCalendarAlt, FaTrophy } from 'react-icons/fa'

var ACTIVITIES = [
  { icon:<FaPalette size={26} color="#E8761A"/>,   title:'Art & Craft',          desc:'Annual art exhibitions, craft workshops and painting competitions nurture creativity in every student.',      clr:'#E8761A' },
  { icon:<FaMusic size={26} color="#6C3FC5"/>,     title:'Music & Dance',         desc:'Classical and contemporary music classes, annual cultural fest with solo and group performances.',             clr:'#6C3FC5' },
  { icon:<FaFutbol size={26} color="#22a35a"/>,    title:'Sports & Athletics',    desc:'Inter-school tournaments, athletics meets, yoga sessions and daily PT on our 10-acre sports ground.',         clr:'#22a35a' },
  { icon:<FaFlask size={26} color="#F5B800"/>,     title:'Science Club',          desc:'Weekly experiments, science olympiad preparation and STEM project competitions.',                              clr:'#F5B800' },
  { icon:<FaBook size={26} color="#E8761A"/>,      title:'Quiz & Debate',         desc:'Regular inter-class quiz contests, essay writing and public speaking events to build confidence.',            clr:'#E8761A' },
  { icon:<FaCampground size={26} color="#6C3FC5"/>,title:'Excursions & Trips',   desc:'Annual educational tours, nature camps and historical site visits to broaden horizons.',                      clr:'#6C3FC5' },
  { icon:<FaHandshake size={26} color="#22a35a"/>, title:'Community Service',     desc:'NCC, NSS and social awareness drives — students actively contribute to the local community.',                 clr:'#22a35a' },
  { icon:<FaLaptop size={26} color="#F5B800"/>,    title:'Tech & Coding',         desc:'Computer lab projects, coding workshops and digital literacy programmes for Classes VI and above.',           clr:'#F5B800' },
]

var TIMELINE = [
  { icon:<FaSun size={18} color="#E8761A"/>,         time:'6:30 AM',  label:'Morning Assembly',      desc:'Prayer, news reading, thought for the day and national anthem.' },
  { icon:<FaBookOpen size={18} color="#E8761A"/>,    time:'7:00 AM',  label:'Classes Begin',          desc:'Structured academic sessions with experienced teachers.' },
  { icon:<FaAppleAlt size={18} color="#E8761A"/>,    time:'10:30 AM', label:'Break Time',             desc:'Nutritious mid-morning snack and outdoor play time.' },
  { icon:<FaPaintBrush size={18} color="#E8761A"/>,  time:'11:00 AM', label:'Activity Period',        desc:'Art, music, PT or library period depending on the day.' },
  { icon:<FaUtensils size={18} color="#E8761A"/>,    time:'1:00 PM',  label:'Lunch Break',            desc:'30-minute lunch break — healthy food, rest and recreation.' },
  { icon:<FaMicroscope size={18} color="#E8761A"/>,  time:'1:30 PM',  label:'Afternoon Sessions',     desc:'Subject classes, lab practicals and project work.' },
  { icon:<FaBus size={18} color="#E8761A"/>,         time:'3:00 PM',  label:'School Dispersal',       desc:'Buses depart. Hostel students move to study hall.' },
  { icon:<FaRunning size={18} color="#E8761A"/>,     time:'4:00 PM',  label:'Sports & Co-curricular', desc:'Evening games, club activities and hobby classes for hostel students.' },
]

var EVENTS = [
  { month:'April',     event:'New Academic Session Begins',  type:'Academic'  },
  { month:'August',    event:'Independence Day Celebration', type:'National'  },
  { month:'September', event:'Science Exhibition',           type:'Academic'  },
  { month:'October',   event:'Annual Sports Meet',           type:'Sports'    },
  { month:'November',  event:'Cultural Fest',                type:'Cultural'  },
  { month:'December',  event:'Winter Carnival & Prize Day',  type:'Cultural'  },
  { month:'January',   event:'Republic Day Celebration',     type:'National'  },
  { month:'February',  event:'Annual Examination Begins',    type:'Academic'  },
  { month:'March',     event:'Results & Farewell',           type:'Academic'  },
]

var TYPE_CLR = { Academic:'#6C3FC5', National:'#22a35a', Sports:'#E8761A', Cultural:'#F5B800' }
var TYPE_ICONS = {
  Academic: <FaGraduationCap size={16}/>,
  National: <FaFlag size={16}/>,
  Sports:   <FaTrophy size={16}/>,
  Cultural: <FaUsers size={16}/>,
}

export default function CampusLife() {
  return (
    <div>
      {/* Activities grid */}
      <div style={{marginBottom:'56px'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{display:'inline-block',fontSize:'11px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--or)',background:'rgba(232,118,26,.1)',padding:'6px 16px',borderRadius:'50px',marginBottom:'12px'}}>Student Life</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'30px',fontWeight:'700',color:'var(--dark)',margin:0}}>Life Beyond <span style={{color:'var(--or)',fontStyle:'italic'}}>Textbooks</span></h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'16px'}}>
          {ACTIVITIES.map(function(a) {
            return (
              <div key={a.title}
                style={{padding:'24px',borderRadius:'18px',background:'var(--card)',border:'1.5px solid var(--brd)',transition:'all .3s cubic-bezier(.34,1.56,.64,1)'}}
                onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 14px 36px '+a.clr+'22';e.currentTarget.style.borderColor=a.clr+'44'}}
                onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)'}}
              >
                <div style={{width:'52px',height:'52px',borderRadius:'16px',background:a.clr+'18',border:'1.5px solid '+a.clr+'30',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}}>{a.icon}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:'700',color:'var(--dark)',marginBottom:'8px'}}>{a.title}</div>
                <div style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.6'}}>{a.desc}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Day in life timeline */}
      <div style={{marginBottom:'56px'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{display:'inline-block',fontSize:'11px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--or)',background:'rgba(232,118,26,.1)',padding:'6px 16px',borderRadius:'50px',marginBottom:'12px'}}>Daily Schedule</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'30px',fontWeight:'700',color:'var(--dark)',margin:0}}>A Day in <span style={{color:'var(--or)',fontStyle:'italic'}}>SPV</span></h2>
        </div>
        <div style={{maxWidth:'700px',margin:'0 auto',position:'relative'}}>
          <div style={{position:'absolute',left:'68px',top:'24px',bottom:'24px',width:'2px',background:'linear-gradient(180deg,var(--or),var(--gd))',borderRadius:'2px'}} />
          <div style={{display:'flex',flexDirection:'column'}}>
            {TIMELINE.map(function(t, i) {
              return (
                <div key={i} style={{display:'flex',alignItems:'flex-start',paddingBottom:'28px'}}>
                  <div style={{width:'60px',flexShrink:0,textAlign:'right',paddingRight:'8px',paddingTop:'10px'}}>
                    <div style={{fontSize:'11px',fontWeight:'800',color:'var(--or)',letterSpacing:'.3px'}}>{t.time}</div>
                  </div>
                  <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'linear-gradient(135deg,var(--or),var(--gd))',border:'3px solid var(--bg)',flexShrink:0,marginTop:'8px',zIndex:1,boxShadow:'0 0 0 3px rgba(232,118,26,.2)'}} />
                  <div style={{flex:1,paddingLeft:'16px',paddingTop:'4px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
                      <span>{t.icon}</span>
                      <span style={{fontWeight:'700',color:'var(--dark)',fontSize:'14.5px'}}>{t.label}</span>
                    </div>
                    <div style={{fontSize:'13px',color:'var(--txt2)',lineHeight:'1.5'}}>{t.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Annual events */}
      <div>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{display:'inline-block',fontSize:'11px',fontWeight:'800',letterSpacing:'2px',textTransform:'uppercase',color:'var(--or)',background:'rgba(232,118,26,.1)',padding:'6px 16px',borderRadius:'50px',marginBottom:'12px'}}>Academic Calendar</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'30px',fontWeight:'700',color:'var(--dark)',margin:0}}>Annual <span style={{color:'var(--or)',fontStyle:'italic'}}>Events</span></h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'12px'}}>
          {EVENTS.map(function(ev) {
            var clr  = TYPE_CLR[ev.type] || '#E8761A'
            var icon = TYPE_ICONS[ev.type] || <FaCalendarAlt size={16}/>
            return (
              <div key={ev.event}
                style={{display:'flex',gap:'14px',alignItems:'center',padding:'16px 18px',borderRadius:'14px',background:'var(--card)',border:'1.5px solid var(--brd)',transition:'all .3s cubic-bezier(.34,1.56,.64,1)',cursor:'default'}}
                onMouseEnter={function(e){e.currentTarget.style.transform='translateY(-5px) scale(1.02)';e.currentTarget.style.boxShadow='0 12px 32px '+clr+'30';e.currentTarget.style.borderColor=clr+'55';e.currentTarget.style.background=clr+'08'}}
                onMouseLeave={function(e){e.currentTarget.style.transform='translateY(0) scale(1)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='var(--brd)';e.currentTarget.style.background='var(--card)'}}
              >
                <div style={{width:'48px',height:'48px',borderRadius:'12px',background:clr+'15',border:'1.5px solid '+clr+'25',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:clr,transition:'all .3s'}}>
                  <div style={{fontSize:'10px',fontWeight:'800',textAlign:'center',letterSpacing:'.3px',textTransform:'uppercase',lineHeight:'1.3'}}>{ev.month.slice(0,3)}</div>
                </div>
                <div>
                  <div style={{fontWeight:'700',fontSize:'13.5px',color:'var(--dark)',marginBottom:'4px'}}>{ev.event}</div>
                  <div style={{display:'inline-flex',alignItems:'center',gap:'5px',fontSize:'11px',fontWeight:'700',color:clr,background:clr+'12',padding:'2px 8px',borderRadius:'50px'}}>
                    {icon} {ev.type}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}