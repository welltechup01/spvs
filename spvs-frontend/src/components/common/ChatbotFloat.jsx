import { useState, useEffect, useRef } from 'react'

var API = 'https://api.ayka.site'
var BIZ = '69a305f398f94563b73c6ef3'

const ChatIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C7.03 3 3 6.58 3 11c0 2.12.9 4.05 2.38 5.5L4 21l4.75-1.55A9.7 9.7 0 0 0 12 20c4.97 0 9-3.58 9-8s-4.03-9-9-9z" fill="white"/>
    <circle cx="8.5" cy="11" r="1.2" fill="#E8761A"/>
    <circle cx="12" cy="11" r="1.2" fill="#E8761A"/>
    <circle cx="15.5" cy="11" r="1.2" fill="#E8761A"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5L5 15M5 5l10 10" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
)

const RobotIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="13" rx="3" fill="#F5B800"/>
    <rect x="7" y="11" width="3" height="3" rx="1" fill="#1C0A00"/>
    <rect x="14" y="11" width="3" height="3" rx="1" fill="#1C0A00"/>
    <rect x="9" y="16" width="6" height="1.5" rx="0.75" fill="#1C0A00"/>
    <path d="M12 8V5" stroke="#F5B800" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="12" cy="4" r="1.5" fill="#F5B800"/>
    <path d="M3 13H1.5a1 1 0 0 0 0 2H3" stroke="#F5B800" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M21 13h1.5a1 1 0 0 1 0 2H21" stroke="#F5B800" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ChatbotFloat() {
  var [open,      setOpen]      = useState(false)
  var [messages,  setMessages]  = useState([])
  var [input,     setInput]     = useState('')
  var [loading,   setLoading]   = useState(false)
  var [sessionId, setSessionId] = useState(null)
  var [visitorId, setVisitorId] = useState(null)
  var [initDone,  setInitDone]  = useState(false)
  var bottomRef = useRef(null)

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
        text: data.welcomeMessage || "Hello! I'm Priya from Sant Pathik Vidyalaya. How can I help you with admissions today?"
      }])
    })
    .catch(function() {
      setInitDone(true)
      setMessages([{
        role: 'bot',
        text: "Hello! I'm Priya from Sant Pathik Vidyalaya. How can I help you today?"
      }])
    })
  }, [open])

  useEffect(function() {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
      {/* Float button */}
      <div className="chat-float">
        <button
          className="chat-btn"
          onClick={function(){ setOpen(function(o){ return !o }) }}
          aria-label={open ? 'Close chat' : 'Open chat'}
          style={{
            transform:  open ? 'rotate(90deg) scale(1.05)' : 'scale(1)',
            transition: 'all .3s cubic-bezier(.34,1.56,.64,1)',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {open ? <CloseIcon /> : <ChatIcon />}
        </button>
        {!open && <span className="chat-tip">Say Hi</span>}
      </div>

      {/* Chat popup */}
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
        <div style={{
          background:   'linear-gradient(135deg,#1C0A00,#3D1A00)',
          padding:      '16px 18px',
          display:      'flex',
          alignItems:   'center',
          gap:          '12px',
          flexShrink:   0
        }}>
          <div style={{
            width:           '40px',
            height:          '40px',
            borderRadius:    '50%',
            background:      '#2A1500',
            border:          '2px solid #F5B800',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            flexShrink:      0
          }}>
            <RobotIcon />
          </div>
          <div>
            <div style={{
              fontFamily: "'Playfair Display',serif",
              fontSize:   '15px',
              fontWeight: '700',
              color:      '#FFCF40'
            }}>
              SPV Assistant
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'5px',marginTop:'2px'}}>
              <div style={{
                width:      '7px',
                height:     '7px',
                borderRadius:'50%',
                background: '#22c55e',
                boxShadow:  '0 0 6px #22c55e'
              }}/>
              <span style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize:   '11px',
                color:      'rgba(255,220,150,.7)'
              }}>
                Online Now
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex:          1,
          overflowY:     'auto',
          padding:       '16px',
          display:       'flex',
          flexDirection: 'column',
          gap:           '10px',
          maxHeight:     '320px',
          minHeight:     '160px',
          background:    '#FFFDF8'
        }}>
          {messages.map(function(m, i){
            var isBot = m.role === 'bot'
            return (
              <div key={i} style={{display:'flex',justifyContent:isBot?'flex-start':'flex-end'}}>
                <div style={{
                  maxWidth:     '82%',
                  padding:      '10px 14px',
                  borderRadius: isBot ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  background:   isBot ? '#fff' : 'linear-gradient(135deg,#E8761A,#F5B800)',
                  color:        isBot ? '#1C0A00' : '#fff',
                  fontSize:     '13px',
                  lineHeight:   '1.6',
                  fontFamily:   "'Poppins',sans-serif",
                  boxShadow:    isBot ? '0 2px 8px rgba(28,10,0,.08)' : '0 4px 14px rgba(232,118,26,.3)',
                  border:       isBot ? '1px solid rgba(232,118,26,.1)' : 'none'
                }}>
                  {m.text}
                </div>
              </div>
            )
          })}
          {loading && (
            <div style={{display:'flex',justifyContent:'flex-start'}}>
              <div style={{
                padding:      '10px 16px',
                borderRadius: '4px 16px 16px 16px',
                background:   '#fff',
                border:       '1px solid rgba(232,118,26,.1)',
                boxShadow:    '0 2px 8px rgba(28,10,0,.08)',
                display:      'flex',
                gap:          '5px',
                alignItems:   'center'
              }}>
                {[0,1,2].map(function(i){
                  return (
                    <div key={i} style={{
                      width:          '7px',
                      height:         '7px',
                      borderRadius:   '50%',
                      background:     '#E8761A',
                      animation:      'dotBounce 1.2s infinite',
                      animationDelay: i * 0.2 + 's'
                    }}/>
                  )
                })}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Quick questions */}
        {messages.length <= 1 && (
          <div style={{
            padding:    '8px 14px',
            display:    'flex',
            gap:        '6px',
            flexWrap:   'wrap',
            background: '#FFFDF8',
            borderTop:  '1px solid rgba(232,118,26,.08)'
          }}>
            {['Admissions','Fee Structure','Hostel','Transport'].map(function(q){
              return (
                <button key={q}
                  onClick={function(){
                    setInput(q)
                    setTimeout(function(){ send() }, 50)
                  }}
                  style={{
                    padding:     '5px 11px',
                    borderRadius:'50px',
                    border:      '1.5px solid rgba(232,118,26,.25)',
                    background:  '#FFF6EA',
                    color:       '#E8761A',
                    fontSize:    '11px',
                    fontWeight:  '600',
                    cursor:      'pointer',
                    fontFamily:  "'Poppins',sans-serif",
                    transition:  'all .2s'
                  }}
                  onMouseEnter={function(e){
                    e.currentTarget.style.background='#E8761A'
                    e.currentTarget.style.color='#fff'
                  }}
                  onMouseLeave={function(e){
                    e.currentTarget.style.background='#FFF6EA'
                    e.currentTarget.style.color='#E8761A'
                  }}
                >
                  {q}
                </button>
              )
            })}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding:    '10px 12px',
          borderTop:  '1px solid rgba(232,118,26,.1)',
          display:    'flex',
          gap:        '8px',
          alignItems: 'center',
          background: '#fff',
          flexShrink: 0
        }}>
          <input
            value={input}
            onChange={function(e){ setInput(e.target.value) }}
            onKeyDown={handleKey}
            placeholder="Type your question..."
            style={{
              flex:        1,
              padding:     '9px 14px',
              borderRadius:'50px',
              border:      '1.5px solid rgba(232,118,26,.2)',
              background:  '#FFFDF8',
              color:       '#1C0A00',
              fontFamily:  "'Poppins',sans-serif",
              fontSize:    '13px',
              outline:     'none',
              transition:  'border .2s'
            }}
            onFocus={function(e){ e.target.style.borderColor='#E8761A' }}
            onBlur={function(e){  e.target.style.borderColor='rgba(232,118,26,.2)' }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            style={{
              width:          '36px',
              height:         '36px',
              borderRadius:   '50%',
              background:     input.trim() ? 'linear-gradient(135deg,#E8761A,#F5B800)' : 'rgba(232,118,26,.2)',
              border:         'none',
              cursor:         input.trim() ? 'pointer' : 'default',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              color:          input.trim() ? '#fff' : 'rgba(232,118,26,.4)',
              flexShrink:     0,
              transition:     'all .2s'
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dotBounce {
          0%,80%,100% { transform: translateY(0) }
          40%          { transform: translateY(-6px) }
        }
      `}</style>
    </>
  )
}