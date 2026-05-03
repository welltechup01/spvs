import { useState, useEffect, useRef } from 'react'

var API = 'https://api.ayka.site'
var BIZ = '69a305f398f94563b73c6ef3'

export default function ChatbotFloat() {
  var [open,      setOpen]      = useState(false)
  var [messages,  setMessages]  = useState([])
  var [input,     setInput]     = useState('')
  var [loading,   setLoading]   = useState(false)
  var [sessionId, setSessionId] = useState(null)
  var [visitorId, setVisitorId] = useState(null)
  var [initDone,  setInitDone]  = useState(false)
  var bottomRef = useRef(null)

  /* ── Init session when chat opens first time ── */
  useEffect(function() {
    if (!open || initDone) return

    fetch(API + '/widget/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessId: BIZ })
    })
    .then(function(r){ return r.json() })
    .then(function(data) {
      setSessionId(data.sessionId || data.session_id || null)
      setVisitorId(data.visitorId || data.visitor_id || null)
      setInitDone(true)
      setMessages([{
        role: 'bot',
        text: data.welcomeMessage || "👋 Hello! I'm Priya from Sant Pathik Vidyalaya. How can I help you with admissions today?"
      }])
    })
    .catch(function() {
      setInitDone(true)
      setMessages([{
        role: 'bot',
        text: "👋 Hello! I'm Priya from Sant Pathik Vidyalaya. How can I help you today?"
      }])
    })
  }, [open])

  /* ── Auto scroll to bottom ── */
  useEffect(function() {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* ── Send message ── */
  function send() {
    var text = input.trim()
    if (!text || loading) return

    setMessages(function(m){ return [...m, { role:'user', text:text }] })
    setInput('')
    setLoading(true)

    fetch(API + '/widget/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessId:  BIZ,
        message:     text,
        sessionId:   sessionId,
        visitorId:   visitorId,
        source:      'web_widget',
        sessionMode: 'cookie'
      })
    })
    .then(function(r){ return r.json() })
    .then(function(data) {
      setMessages(function(m){ return [...m, { role:'bot', text: data.response || "I'll get back to you shortly!" }] })
      if (data.conversationId) setSessionId(data.conversationId)
    })
    .catch(function() {
      setMessages(function(m){ return [...m, { role:'bot', text:'Sorry, something went wrong. Please call +91 9198783830.' }] })
    })
    .finally(function(){ setLoading(false) })
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* ── Float button — uses .chat-float & .chat-btn from global CSS ──
          Your CSS already defines:
            .chat-float { position:fixed; right:16px; bottom:24px; z-index:500; ... }
            .wa-float   { position:fixed; left:16px;  bottom:24px; z-index:500; ... }
          Both have the same bottom:24px so they align perfectly.
          On mobile your CSS sets both to bottom:72px automatically.
      ── */}
      <div className="chat-float">
        <button
          className="chat-btn"
          onClick={function(){ setOpen(function(o){ return !o }) }}
          aria-label="Open chat"
          style={{
            transform:  open ? 'rotate(45deg) scale(1.05)' : 'scale(1)',
            transition: 'all .3s cubic-bezier(.34,1.56,.64,1)'
          }}
        >
          {open ? '✕' : '🤖'}
        </button>
        {!open && <span className="chat-tip">AI Chat</span>}
      </div>

      {/* ── Chat popup — uses .chat-popup & .open from global CSS ── */}
      <div
        className={'chat-popup' + (open ? ' open' : '')}
        style={{
          display:       'flex',
          flexDirection: 'column',
          overflow:      'hidden',
          padding:       0,
          width:         'min(340px, calc(100vw - 32px))',
        }}
      >
        {/* Header */}
        <div style={{background:'linear-gradient(135deg,#1C0A00,#3D1A00)',padding:'16px 18px',display:'flex',alignItems:'center',gap:'12px',flexShrink:0}}>
          <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'linear-gradient(135deg,#E8761A,#F5B800)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>🤖</div>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',color:'#FFCF40'}}>SPVS Assistant</div>
            <div style={{display:'flex',alignItems:'center',gap:'5px',marginTop:'2px'}}>
              <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e'}}/>
              <span style={{fontFamily:"'Poppins',sans-serif",fontSize:'11px',color:'rgba(255,220,150,.7)'}}>Online Now</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:'10px',maxHeight:'320px',minHeight:'160px',background:'#FFFDF8'}}>
          {messages.map(function(m, i){
            var isBot = m.role === 'bot'
            return (
              <div key={i} style={{display:'flex',justifyContent:isBot?'flex-start':'flex-end'}}>
                <div style={{
                  maxWidth:'82%',padding:'10px 14px',
                  borderRadius:isBot?'4px 16px 16px 16px':'16px 4px 16px 16px',
                  background:isBot?'#fff':'linear-gradient(135deg,#E8761A,#F5B800)',
                  color:isBot?'#1C0A00':'#fff',
                  fontSize:'13px',lineHeight:'1.6',
                  fontFamily:"'Poppins',sans-serif",
                  boxShadow:isBot?'0 2px 8px rgba(28,10,0,.08)':'0 4px 14px rgba(232,118,26,.3)',
                  border:isBot?'1px solid rgba(232,118,26,.1)':'none'
                }}>
                  {m.text}
                </div>
              </div>
            )
          })}
          {loading && (
            <div style={{display:'flex',justifyContent:'flex-start'}}>
              <div style={{padding:'10px 16px',borderRadius:'4px 16px 16px 16px',background:'#fff',border:'1px solid rgba(232,118,26,.1)',boxShadow:'0 2px 8px rgba(28,10,0,.08)',display:'flex',gap:'5px',alignItems:'center'}}>
                {[0,1,2].map(function(i){
                  return <div key={i} style={{width:'7px',height:'7px',borderRadius:'50%',background:'#E8761A',animation:'dotBounce 1.2s infinite',animationDelay:i*0.2+'s'}}/>
                })}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Quick questions */}
        {messages.length <= 1 && (
          <div style={{padding:'8px 14px',display:'flex',gap:'6px',flexWrap:'wrap',background:'#FFFDF8',borderTop:'1px solid rgba(232,118,26,.08)'}}>
            {['Admissions','Fee Structure','Hostel','Transport'].map(function(q){
              return (
                <button key={q}
                  onClick={function(){
                    setInput(q)
                    setTimeout(function(){ send() }, 50)
                  }}
                  style={{padding:'5px 11px',borderRadius:'50px',border:'1.5px solid rgba(232,118,26,.25)',background:'#FFF6EA',color:'#E8761A',fontSize:'11px',fontWeight:'600',cursor:'pointer',fontFamily:"'Poppins',sans-serif",transition:'all .2s'}}
                  onMouseEnter={function(e){e.currentTarget.style.background='#E8761A';e.currentTarget.style.color='#fff'}}
                  onMouseLeave={function(e){e.currentTarget.style.background='#FFF6EA';e.currentTarget.style.color='#E8761A'}}
                >
                  {q}
                </button>
              )
            })}
          </div>
        )}

        {/* Input */}
        <div style={{padding:'10px 12px',borderTop:'1px solid rgba(232,118,26,.1)',display:'flex',gap:'8px',alignItems:'center',background:'#fff',flexShrink:0}}>
          <input
            value={input}
            onChange={function(e){ setInput(e.target.value) }}
            onKeyDown={handleKey}
            placeholder="Type your question..."
            style={{flex:1,padding:'9px 14px',borderRadius:'50px',border:'1.5px solid rgba(232,118,26,.2)',background:'#FFFDF8',color:'#1C0A00',fontFamily:"'Poppins',sans-serif",fontSize:'13px',outline:'none',transition:'border .2s'}}
            onFocus={function(e){e.target.style.borderColor='#E8761A'}}
            onBlur={function(e){e.target.style.borderColor='rgba(232,118,26,.2)'}}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{width:'36px',height:'36px',borderRadius:'50%',background:input.trim()?'linear-gradient(135deg,#E8761A,#F5B800)':'rgba(232,118,26,.2)',border:'none',cursor:input.trim()?'pointer':'default',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0,transition:'all .2s'}}
          >
            →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
      `}</style>
    </>
  )
}