import { useEffect, useState } from 'react'
import SchoolLogo from './SchoolLogo'

export default function Preloader() {
  const [hide, setHide] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 2900)
    const t2 = setTimeout(() => setGone(true), 3700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  return (
    <div id="preloader" className={hide ? 'hide' : ''}>
      <div
        className="pl-logo-ring"
        style={{ width: 'clamp(80px, 18vw, 130px)', height: 'clamp(80px, 18vw, 130px)' }}
      >
        <div className="pl-ring-orbit"><div className="pl-orb"></div></div>
        <div className="pl-ring-orbit2"><div className="pl-orb2"></div></div>
        <SchoolLogo size="100%" />
      </div>
      <div className="pl-school-name">SANT PATHIK VIDYALAYA</div>
      <div className="pl-tagline">Pashupati Nagar · Bahraich · Est. 1987</div>
      <div className="pl-progress"><div className="pl-prog-fill"></div></div>
    </div>
  )
}