import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../../api'
import { FaSchool, FaEye, FaEyeSlash, FaExclamationTriangle, FaSpinner } from 'react-icons/fa'

export default function AdminLoginPage() {
  var navigate              = useNavigate()
  var [form, setForm]       = useState({ username:'', password:'' })
  var [error, setError]     = useState('')
  var [loading, setLoading] = useState(false)
  var [showPw, setShowPw]   = useState(false)

  function handleChange(e) {
    var k = e.target.name, v = e.target.value
    setForm(function(p){ var n={};for(var x in p)n[x]=p[x];n[k]=v;return n })
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.username.trim() || !form.password.trim()) {
      setError('Please enter both username and password'); return
    }
    setLoading(true)
    try {
      var res = await authAPI.login({ username: form.username.trim(), password: form.password })
      localStorage.setItem('spvs_token', res.token)
      localStorage.setItem('spvs_admin', JSON.stringify(res.admin))
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  var inp = {
    width:'100%', padding:'13px 16px', borderRadius:'12px',
    border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8',
    color:'#2C1500', fontFamily:"'DM Sans',sans-serif", fontSize:'14px',
    outline:'none', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s'
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#FFF6EA 0%,#FFFDF8 50%,#FEF0D4 100%)',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,118,26,.08),transparent 70%)',top:'-150px',right:'-150px',pointerEvents:'none'}} />
      <div style={{position:'absolute',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,184,0,.06),transparent 70%)',bottom:'-100px',left:'-100px',pointerEvents:'none'}} />

      <div style={{width:'100%',maxWidth:'420px',position:'relative',zIndex:1}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{width:'68px',height:'68px',borderRadius:'20px',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',boxShadow:'0 8px 32px rgba(232,118,26,.3)'}}>
            <FaSchool size={30} color="#1C0A00"/>
          </div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(18px,5vw,22px)',fontWeight:'700',color:'#1C0A00',marginBottom:'4px'}}>Sant Pathik Vidyalaya</div>
          <div style={{fontSize:'11px',fontWeight:'700',color:'#B87832',letterSpacing:'2.5px',textTransform:'uppercase'}}>Admin Portal</div>
        </div>

        <div style={{background:'#FFFFFF',borderRadius:'24px',border:'1.5px solid rgba(232,118,26,.15)',padding:'clamp(22px,5vw,36px)',boxShadow:'0 20px 60px rgba(232,118,26,.1)'}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(18px,4vw,22px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 4px'}}>Welcome Back</h2>
          <p style={{fontSize:'13px',color:'#B87832',margin:'0 0 22px'}}>Sign in to manage school content</p>

          {error && (
            <div style={{background:'rgba(239,68,68,.06)',border:'1.5px solid rgba(239,68,68,.2)',borderRadius:'10px',padding:'11px 14px',marginBottom:'16px',display:'inline-flex',gap:'8px',alignItems:'center',width:'100%',boxSizing:'border-box'}}>
              <FaExclamationTriangle size={13} color="#dc2626"/>
              <span style={{fontSize:'12.5px',color:'#dc2626',fontWeight:'600'}}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'15px'}}>
            <div>
              <label style={{fontSize:'11px',fontWeight:'800',color:'#B87832',letterSpacing:'1px',textTransform:'uppercase',display:'block',marginBottom:'7px'}}>Username</label>
              <input name="username" value={form.username} onChange={handleChange} placeholder="Enter admin username" autoComplete="username" style={inp}
                onFocus={function(e){e.target.style.borderColor='#E8761A';e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)'}}
                onBlur={function(e){e.target.style.borderColor='rgba(232,118,26,.2)';e.target.style.boxShadow='none'}} />
            </div>
            <div>
              <label style={{fontSize:'11px',fontWeight:'800',color:'#B87832',letterSpacing:'1px',textTransform:'uppercase',display:'block',marginBottom:'7px'}}>Password</label>
              <div style={{position:'relative'}}>
                <input name="password" type={showPw?'text':'password'} value={form.password} onChange={handleChange} placeholder="Enter admin password" autoComplete="current-password"
                  style={{...inp,paddingRight:'46px'}}
                  onFocus={function(e){e.target.style.borderColor='#E8761A';e.target.style.boxShadow='0 0 0 3px rgba(232,118,26,.1)'}}
                  onBlur={function(e){e.target.style.borderColor='rgba(232,118,26,.2)';e.target.style.boxShadow='none'}} />
                <button type="button" onClick={function(){setShowPw(function(s){return !s})}}
                  style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#B87832',padding:'4px',display:'flex',alignItems:'center'}}>
                  {showPw ? <FaEyeSlash size={15}/> : <FaEye size={15}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              style={{marginTop:'4px',padding:'14px',borderRadius:'12px',border:'none',cursor:loading?'wait':'pointer',background:loading?'rgba(232,118,26,.5)':'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'15px',fontWeight:'800',boxShadow:'0 8px 24px rgba(232,118,26,.3)',transition:'all .2s',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
              {loading ? <><FaSpinner size={15} style={{animation:'spin .8s linear infinite'}}/> Signing in...</> : 'Sign In to Dashboard'}
            </button>
          </form>

          <div style={{marginTop:'18px',padding:'12px',borderRadius:'10px',background:'#FFF6EA',border:'1px solid rgba(232,118,26,.12)',textAlign:'center'}}>
            <div style={{fontSize:'11px',color:'#B87832',fontWeight:'600'}}>Secure Admin Access · SPV 2026</div>
          </div>
        </div>

        <div style={{textAlign:'center',marginTop:'16px'}}>
          <a href="/" style={{fontSize:'12.5px',color:'#B87832',textDecoration:'none',fontWeight:'600'}}
            onMouseEnter={function(e){e.currentTarget.style.color='#E8761A'}}
            onMouseLeave={function(e){e.currentTarget.style.color='#B87832'}}>
            ← Back to School Website
          </a>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
    </div>
  )
}