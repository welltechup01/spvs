import { useState } from 'react'

export default function TcCertificate({ data, onBack }) {
  var [showPdf, setShowPdf] = useState(false)

  function handleDownload() {
    if (!data.pdfUrl) {
      alert('PDF not available. Please contact the school office.')
      return
    }
    window.open(data.pdfUrl, '_blank')
  }

  var summaryRows = [
    { l: 'Admission No.', v: data.admissionNo },
    { l: 'Date of Birth',  v: data.dob },
  ]

  // ── PDF VIEWER — covers everything including navbar ─────────────
  if (showPdf) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', flexDirection: 'column',
        background: '#FFFDF8',
        fontFamily: "'DM Sans',sans-serif",
        zIndex: 99999   // above navbar, above everything
      }}>

        {/* Top bar */}
        <div style={{
          flexShrink: 0,
          background: 'linear-gradient(135deg,#1C0A00,#3D1A00)',
          padding: '14px clamp(14px,4vw,24px)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '12px'
        }}>
          <button onClick={function () { setShowPdf(false) }}
            style={{ padding: '8px 16px', borderRadius: '10px', background: 'rgba(255,255,255,.08)', border: '1.5px solid rgba(255,255,255,.12)', color: '#FFCF40', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", whiteSpace: 'nowrap' }}>
            ← New Request
          </button>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(13px,2.5vw,16px)', fontWeight: '700', color: '#FFCF40', textAlign: 'center', flex: 1 }}>
            Sant Pathik Vidyalaya
          </div>
          <button onClick={handleDownload}
            style={{ padding: '8px 16px', borderRadius: '10px', background: 'linear-gradient(135deg,#E8761A,#F5B800)', border: 'none', color: '#1C0A00', fontWeight: '800', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", whiteSpace: 'nowrap' }}>
            ⬇ Download PDF
          </button>
        </div>

        {/* Full-page iframe */}
        <iframe
          src={data.pdfUrl}
          style={{ flex: 1, width: '100%', border: 'none', display: 'block' }}
          title="Transfer Certificate"
        />
      </div>
    )
  }

  // ── SUMMARY SCREEN ─────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes popIn  { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        @media (max-width: 400px) {
          .tc-btns { flex-direction: column !important; align-items: stretch !important; }
          .tc-btns button { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#FFFDF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px,5vw,48px) clamp(14px,4vw,20px)', fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center', animation: 'fadeUp .5s ease both' }}>

          {/* Green tick */}
          <div style={{ width: 'clamp(60px,10vw,72px)', height: 'clamp(60px,10vw,72px)', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(24px,5vw,32px)', color: '#fff', margin: '0 auto 20px', boxShadow: '0 8px 28px rgba(34,197,94,.3)', animation: 'popIn .5s cubic-bezier(.34,1.56,.64,1) both' }}>✓</div>

          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px,5vw,28px)', fontWeight: '700', color: '#1C0A00', marginBottom: '6px' }}>
            Verified Successfully!
          </div>
          <div style={{ fontSize: 'clamp(13px,3vw,14px)', color: '#7A4010', marginBottom: '28px' }}>
            Your Transfer Certificate is ready to download.
          </div>

          {/* Summary card */}
          <div style={{ background: 'linear-gradient(135deg,#FFF9F0,#FEF3DC)', borderRadius: 'clamp(14px,3vw,20px)', border: '1.5px solid rgba(232,118,26,.22)', padding: 'clamp(16px,4vw,22px) clamp(14px,4vw,20px)', marginBottom: '28px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,#E8761A,#F5B800)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: 'clamp(38px,8vw,46px)', height: 'clamp(38px,8vw,46px)', borderRadius: '12px', background: 'rgba(34,163,90,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(18px,4vw,22px)', flexShrink: 0 }}>📋</div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#B87832', letterSpacing: '1.1px', textTransform: 'uppercase', marginBottom: '2px' }}>Certificate Ready</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,3vw,16px)', fontWeight: '700', color: '#1C0A00' }}>Transfer Certificate</div>
              </div>
            </div>

            {summaryRows.map(function (row, i) {
              return (
                <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < summaryRows.length - 1 ? '1px dashed rgba(232,118,26,.15)' : 'none', fontSize: 'clamp(12px,2.5vw,13.5px)', gap: '12px' }}>
                  <span style={{ color: '#B87832', fontWeight: '700', flexShrink: 0 }}>{row.l}</span>
                  <span style={{ color: '#1C0A00', fontWeight: '700', textAlign: 'right' }}>{row.v || '—'}</span>
                </div>
              )
            })}

            <div style={{ marginTop: '16px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(34,163,90,.06)', border: '1px solid rgba(34,163,90,.15)', fontSize: 'clamp(11px,2.5vw,12.5px)', color: '#166534', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ flexShrink: 0 }}>📄</span>
              <span>Your TC PDF is ready. Click <strong>View TC</strong> to open it on this page.</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="tc-btns" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={function () { setShowPdf(true) }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: 'clamp(12px,3vw,14px) clamp(18px,4vw,28px)', borderRadius: '14px', background: 'linear-gradient(135deg,#E8761A,#F5B800)', color: '#1C0A00', fontWeight: '900', fontSize: 'clamp(13px,3vw,15px)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(232,118,26,.32)', fontFamily: "'DM Sans',sans-serif", transition: 'all .22s' }}
              onMouseEnter={function (e) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(232,118,26,.44)' }}
              onMouseLeave={function (e) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(232,118,26,.32)' }}>
              View TC
            </button>
            <button onClick={onBack}
              style={{ padding: 'clamp(12px,3vw,14px) clamp(16px,3vw,24px)', borderRadius: '14px', background: 'transparent', color: '#7A4010', fontWeight: '700', fontSize: 'clamp(13px,3vw,14px)', border: '1.5px solid rgba(232,118,26,.28)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all .2s' }}
              onMouseEnter={function (e) { e.currentTarget.style.background = '#FFF6EA' }}
              onMouseLeave={function (e) { e.currentTarget.style.background = 'transparent' }}>
              ← New Request
            </button>
          </div>

        </div>
      </div>
    </>
  )
}