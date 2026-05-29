import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/common/ScrollToTop'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import WhatsAppFloat from '../components/common/WhatsAppFloat'
import ChatbotFloat from '../components/common/ChatbotFloat'
import AdmissionCTA from '../components/home/AdmissionCTA'

export default function PublicLayout() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppFloat />
      <ChatbotFloat />
      <AdmissionCTA />

      {/* ── Scroll-to-top button ── sits directly above chatbot float ── */}
      <button
        className={`stbtn${showTop ? ' vis' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >↑</button>

      <style>{`
        /*
          RIGHT SIDE — bottom to top stack (desktop):
          ┌─────────────────────────────────────────┐
          │  .chat-float   right:16  bottom:24       │  btn 54px + tip ~22px = ~76px total
          │  .stbtn        right:16  bottom:112       │  (24 + 76 + 12px gap)
          └─────────────────────────────────────────┘

          LEFT SIDE (unchanged):
          └─ .wa-float     left:16   bottom:24
        */

        .stbtn {
          position: fixed;
          right: 16px;
          bottom: 112px;        /* 24 + 54px(btn) + 22px(tip+gap) + 12px breathing room */
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8761A, #F5B800);
          color: #fff;
          border: none;
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          z-index: 450;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 20px rgba(232,118,26,.4);
          opacity: 0;
          pointer-events: none;
          transform: translateY(12px);
          transition: opacity .3s ease, transform .3s ease, box-shadow .3s ease;
        }
        .stbtn.vis {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }
        .stbtn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(232,118,26,.55);
        }

        /*
          MOBILE right-side stack (bottom → top):
          ┌──────────────────────────────────────────────┐
          │  .mob-cta bar        bottom:0    height:~60px │
          │  .chat-float         bottom:72   (above cta)  │  46px btn + 16px tip = 62px
          │  .stbtn              bottom:146  (72+62+12)   │
          └──────────────────────────────────────────────┘
        */
        @media (max-width: 768px) {
          .stbtn {
            right: 14px;
            bottom: 146px;
            width: 38px;
            height: 38px;
            font-size: 15px;
          }
        }

        /* Very small phones */
        @media (max-width: 390px) {
          .stbtn {
            right: 12px;
            bottom: 140px;
            width: 36px;
            height: 36px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  )
}