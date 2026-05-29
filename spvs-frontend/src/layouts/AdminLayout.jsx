import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FaChartBar, FaNewspaper, FaImages, FaBullhorn, FaChalkboardTeacher,
  FaGraduationCap, FaTrophy, FaClipboardList, FaBus, FaBook, FaBriefcase,
  FaEnvelope, FaComments, FaClipboard, FaCog, FaSchool, FaGlobe, FaSignOutAlt,
} from 'react-icons/fa'

var NAV_GROUPS = [
  {
    group: 'Content',
    items: [
      { label:'Dashboard',       icon:<FaChartBar size={16}/>,       path:'/admin/dashboard'    },
      { label:'Blogs & Updates', icon:<FaNewspaper size={16}/>,      path:'/admin/blogs'        },
      { label:'Gallery',         icon:<FaImages size={16}/>,         path:'/admin/gallery'      },
      { label:'Announcements',   icon:<FaBullhorn size={16}/>,       path:'/admin/announcements' },
    ]
  },
  {
    group: 'School',
    items: [
      { label:'Faculty',         icon:<FaChalkboardTeacher size={16}/>, path:'/admin/faculty'    },
      { label:'Alumni',          icon:<FaGraduationCap size={16}/>,     path:'/admin/alumni'     },
      { label:'Results',         icon:<FaTrophy size={16}/>,            path:'/admin/results'    },
      { label:'Certificates',    icon:<FaClipboardList size={16}/>,     path:'/admin/certificates'},
      { label:'Transport',       icon:<FaBus size={16}/>,               path:'/admin/transport'  },
    ]
  },
  {
    group: 'Manage',
    items: [
      { label:'Academics',       icon:<FaBook size={16}/>,          path:'/admin/academics'    },
      { label:'Mandatory Disc.', icon:<FaClipboard size={16}/>,     path:'/admin/mandatory'    },
      { label:'Jobs',            icon:<FaBriefcase size={16}/>,     path:'/admin/jobs'         },
      { label:'Applications',    icon:<FaEnvelope size={16}/>,      path:'/admin/applications' },
      { label:'Testimonials',    icon:<FaComments size={16}/>,      path:'/admin/testimonials' },
    ]
  },
  {
    group: 'Enquiries',
    items: [
      { label:'Enquiries',       icon:<FaClipboardList size={16}/>, path:'/admin/enquiries'    },
      { label:'Settings',        icon:<FaCog size={16}/>,           path:'/admin/settings'     },
    ]
  },
]

var ALL_NAV = NAV_GROUPS.flatMap(function(g){ return g.items })

export default function AdminLayout({ children }) {
  var adminRaw  = localStorage.getItem('spvs_admin')
  var user      = adminRaw ? JSON.parse(adminRaw).username : 'Admin'
  var location  = useLocation()
  var navigate  = useNavigate()
  var [collapsed, setCollapsed] = useState(false)
  var [mobOpen,   setMobOpen]   = useState(false)

  function handleLogout() {
    localStorage.removeItem('spvs_token')
    localStorage.removeItem('spvs_admin')
    navigate('/admin/login')
  }

  function closeMob() { setMobOpen(false) }

  var active = ALL_NAV.find(function(n){ return n.path === location.pathname })

  function SidebarNav({ isDrawer }) {
    return (
      <>
        {/* Logo */}
        <div style={{
          padding: (!isDrawer && collapsed) ? '16px 0' : '16px 14px',
          borderBottom:'1px solid rgba(232,118,26,.18)',
          display:'flex', alignItems:'center', gap:'10px',
          minHeight:'66px',
          justifyContent: (!isDrawer && collapsed) ? 'center' : 'flex-start',
          flexShrink:0
        }}>
          <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 4px 14px rgba(232,118,26,.45)'}}>
            <FaSchool size={18} color="#1C0A00"/>
          </div>
          {(isDrawer || !collapsed) && (
            <div style={{overflow:'hidden',whiteSpace:'nowrap'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'13.5px',fontWeight:'700',color:'#FFCF40',lineHeight:'1.2'}}>SPV Admin</div>
              <div style={{fontSize:'9px',color:'rgba(255,207,64,.38)',fontWeight:'600',letterSpacing:'1px',textTransform:'uppercase',marginTop:'2px'}}>Management Portal</div>
            </div>
          )}
          {isDrawer && (
            <button onClick={closeMob} style={{marginLeft:'auto',background:'none',border:'none',color:'rgba(255,207,64,.5)',fontSize:'20px',cursor:'pointer',padding:'4px',flexShrink:0}}>✕</button>
          )}
        </div>

        {/* Nav items */}
        <nav style={{flex:1,padding:(!isDrawer && collapsed)?'8px 6px':'8px 10px',display:'flex',flexDirection:'column',overflowY:'auto'}}>
          {NAV_GROUPS.map(function(group) {
            return (
              <div key={group.group} style={{marginBottom:'2px'}}>
                {(isDrawer || !collapsed) && (
                  <div style={{fontSize:'9px',fontWeight:'900',color:'rgba(255,207,64,.22)',letterSpacing:'2px',textTransform:'uppercase',padding:'12px 10px 5px',userSelect:'none'}}>{group.group}</div>
                )}
                {!isDrawer && collapsed && <div style={{height:'1px',background:'rgba(232,118,26,.1)',margin:'8px 4px 6px'}} />}
                {group.items.map(function(item) {
                  var isActive = location.pathname === item.path
                  return (
                    <Link key={item.path} to={item.path}
                      onClick={isDrawer ? closeMob : undefined}
                      title={(!isDrawer && collapsed) ? item.label : ''}
                      style={{
                        display:'flex',alignItems:'center',gap:'10px',
                        padding:(!isDrawer && collapsed)?'9px 0':'9px 10px',
                        justifyContent:(!isDrawer && collapsed)?'center':'flex-start',
                        borderRadius:'10px',textDecoration:'none',
                        transition:'all .15s ease',
                        background:isActive?'rgba(232,118,26,.18)':'transparent',
                        color:isActive?'#F5B800':'rgba(255,207,64,.5)',
                        borderLeft:(!isDrawer && collapsed)?'none':(isActive?'3px solid #E8761A':'3px solid transparent'),
                        marginBottom:'1px',overflow:'hidden',whiteSpace:'nowrap',minHeight:'38px'
                      }}
                      onMouseEnter={function(e){if(!isActive){e.currentTarget.style.background='rgba(232,118,26,.1)';e.currentTarget.style.color='rgba(255,207,64,.8)'}}}
                      onMouseLeave={function(e){if(!isActive){e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,207,64,.5)'}}}>
                      <span style={{flexShrink:0,width:'20px',display:'flex',alignItems:'center',justifyContent:'center'}}>{item.icon}</span>
                      {(isDrawer || !collapsed) && <span style={{fontSize:'13px',fontWeight:isActive?'700':'500',flex:1}}>{item.label}</span>}
                      {isActive && (isDrawer || !collapsed) && <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#F5B800',flexShrink:0,marginRight:'2px'}} />}
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </nav>

        {/* Collapse / Logout */}
        <div style={{padding:(!isDrawer && collapsed)?'10px 6px':'10px',borderTop:'1px solid rgba(232,118,26,.12)',flexShrink:0}}>
          {isDrawer ? (
            <button onClick={handleLogout}
              style={{width:'100%',padding:'10px',borderRadius:'9px',border:'none',background:'rgba(220,38,38,.12)',cursor:'pointer',color:'rgba(255,100,100,.7)',display:'flex',alignItems:'center',gap:'10px',justifyContent:'flex-start',fontFamily:"'DM Sans',sans-serif",fontSize:'12.5px'}}>
              <FaSignOutAlt size={14}/><span>Logout</span>
            </button>
          ) : (
            <button onClick={function(){setCollapsed(function(c){return !c})}}
              style={{width:'100%',padding:collapsed?'9px 0':'9px 10px',borderRadius:'9px',border:'none',background:'rgba(232,118,26,.08)',cursor:'pointer',color:'rgba(255,207,64,.5)',display:'flex',alignItems:'center',gap:'10px',justifyContent:collapsed?'center':'flex-start',fontFamily:"'DM Sans',sans-serif",fontSize:'12.5px',transition:'all .15s'}}
              onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.18)';e.currentTarget.style.color='rgba(255,207,64,.8)'}}
              onMouseLeave={function(e){e.currentTarget.style.background='rgba(232,118,26,.08)';e.currentTarget.style.color='rgba(255,207,64,.5)'}}>
              <span style={{fontSize:'14px',flexShrink:0}}>{collapsed?'→':'←'}</span>
              {!collapsed && <span>Collapse</span>}
            </button>
          )}
        </div>
      </>
    )
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#FFF6EA',fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        .adm-overlay { display:none; position:fixed; inset:0; background:rgba(28,10,0,.55); z-index:200; backdrop-filter:blur(2px); }
        .adm-overlay.open { display:block; }
        .adm-drawer { position:fixed; top:0; left:0; bottom:0; width:260px; background:#1C0A00; z-index:201; display:flex; flex-direction:column; transform:translateX(-100%); transition:transform .28s cubic-bezier(.4,0,.2,1); box-shadow:4px 0 32px rgba(28,10,0,.35); overflow-y:auto; }
        .adm-drawer.open { transform:translateX(0); }
        .adm-sidebar { display:flex; flex-direction:column; }
        @media (max-width:768px) { .adm-sidebar { display:none !important; } .adm-topbar-views { display:none !important; } .adm-topbar-user-name { display:none !important; } .adm-topbar-role { display:none !important; } }
        @media (min-width:769px) { .adm-drawer { display:none !important; } .adm-overlay { display:none !important; } .adm-mob-menu { display:none !important; } }
      `}</style>

      <div className={'adm-overlay' + (mobOpen?' open':'')} onClick={closeMob} />
      <div className={'adm-drawer' + (mobOpen?' open':'')}><SidebarNav isDrawer={true} /></div>

      <div className="adm-sidebar" style={{width:collapsed?'64px':'228px',minHeight:'100vh',background:'#1C0A00',transition:'width .25s ease',flexShrink:0,position:'sticky',top:0,height:'100vh',overflowY:'auto',overflowX:'hidden',zIndex:100,boxShadow:'4px 0 24px rgba(28,10,0,.18)'}}>
        <SidebarNav isDrawer={false} />
      </div>

      <div style={{flex:1,display:'flex',flexDirection:'column',minWidth:0}}>
        {/* Topbar */}
        <div style={{height:'66px',background:'#FFFFFF',borderBottom:'1.5px solid rgba(232,118,26,.12)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(12px,3vw,28px)',flexShrink:0,position:'sticky',top:0,zIndex:50,boxShadow:'0 2px 16px rgba(232,118,26,.07)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <button className="adm-mob-menu" onClick={function(){setMobOpen(true)}}
              style={{width:'38px',height:'38px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFF6EA',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'5px',flexShrink:0}}>
              <div style={{width:'16px',height:'2px',background:'#E8761A',borderRadius:'2px'}} />
              <div style={{width:'16px',height:'2px',background:'#E8761A',borderRadius:'2px'}} />
              <div style={{width:'16px',height:'2px',background:'#E8761A',borderRadius:'2px'}} />
            </button>
            <span style={{color:'#E8761A'}}>{active ? active.icon : <FaChartBar size={18}/>}</span>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(13px,3vw,16px)',fontWeight:'700',color:'#1C0A00',lineHeight:'1.2'}}>{active?active.label:'Dashboard'}</div>
              <div className="adm-topbar-role" style={{fontSize:'10.5px',color:'#B87832',fontWeight:'600'}}>Sant Pathik Vidyalaya Admin</div>
            </div>
          </div>

          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <a href="/" target="_blank" rel="noreferrer" className="adm-topbar-views"
              style={{padding:'7px 14px',borderRadius:'9px',border:'1.5px solid rgba(232,118,26,.25)',color:'#E8761A',textDecoration:'none',fontSize:'12.5px',fontWeight:'700',transition:'all .15s',display:'inline-flex',alignItems:'center',gap:'5px',whiteSpace:'nowrap'}}
              onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.08)'}}
              onMouseLeave={function(e){e.currentTarget.style.background='transparent'}}>
              <FaGlobe size={13}/> View Site
            </a>
            <div style={{display:'flex',alignItems:'center',gap:'7px',padding:'5px 10px 5px 6px',borderRadius:'10px',background:'#FFF6EA',border:'1.5px solid rgba(232,118,26,.18)'}}>
              <div style={{width:'30px',height:'30px',borderRadius:'8px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:'900',color:'#fff',boxShadow:'0 3px 10px rgba(232,118,26,.3)',flexShrink:0}}>
                {user[0].toUpperCase()}
              </div>
              <div className="adm-topbar-user-name">
                <div style={{fontSize:'12px',color:'#3D1A00',fontWeight:'700',lineHeight:'1.1'}}>{user}</div>
                <div style={{fontSize:'9.5px',color:'#B87832'}}>Administrator</div>
              </div>
              <button onClick={handleLogout} title="Logout"
                style={{marginLeft:'2px',background:'none',border:'none',cursor:'pointer',color:'#B87832',fontSize:'17px',lineHeight:1,transition:'color .15s',padding:'2px',flexShrink:0,display:'flex',alignItems:'center'}}
                onMouseEnter={function(e){e.currentTarget.style.color='#dc2626'}}
                onMouseLeave={function(e){e.currentTarget.style.color='#B87832'}}>
                <FaSignOutAlt size={15}/>
              </button>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div style={{padding:'6px clamp(12px,3vw,28px)',background:'#FFFFFF',borderBottom:'1px solid rgba(232,118,26,.08)',display:'flex',alignItems:'center',gap:'6px'}}>
          <Link to="/admin/dashboard" style={{fontSize:'12px',color:'#B87832',textDecoration:'none',fontWeight:'600',transition:'color .15s',display:'inline-flex',alignItems:'center',gap:'4px'}}
            onMouseEnter={function(e){e.currentTarget.style.color='#E8761A'}}
            onMouseLeave={function(e){e.currentTarget.style.color='#B87832'}}>
            <FaSchool size={11}/> Dashboard
          </Link>
          {active && active.path !== '/admin/dashboard' && (
            <>
              <span style={{color:'rgba(184,120,50,.35)',fontSize:'12px'}}>›</span>
              <span style={{fontSize:'12px',color:'#E8761A',fontWeight:'700'}}>{active.label}</span>
            </>
          )}
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:'auto',padding:'clamp(14px,3vw,28px)',background:'#FFF6EA'}}>
          {children}
        </div>
      </div>
    </div>
  )
}