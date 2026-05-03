import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mandatoryAPI } from '../../api'
import {
  FaSchool, FaClipboardList, FaChartBar, FaChalkboardTeacher,
  FaBuilding, FaBus, FaInfoCircle, FaPhone, FaEnvelope, FaClock,
  FaEye, FaHourglassHalf,
} from 'react-icons/fa'

var CERT_FILES = {
  'Fire Certificate 2023':                   { file: 'Fire Certificate 2023.pdf',                      ready: true },
  'New Fire Certificate 2026':               { file: 'Fire Certificate 2026.pdf',                      ready: true },
  'NEW Bullding Safety Certificate 2023':    { file: 'NEW Bullding Safety Certificate 2023.pdf',       ready: true },
  'No Objection Certificate (NOC)':          { file: 'NOC.pdf',                                        ready: true },
  'Society Update Certificate 2024':         { file: 'Society Update Certificate 2024.pdf',            ready: true },
  'New Land Certtificate 2023-24':           { file: 'New Land Certtificate 2023-24 2.pdf',            ready: true },
  'New Affliation Cenfermation Letter 2024': { file: 'New Affliation Cenfermation Letter 2024-29.pdf', ready: true },
  'Society Update Member List 2024':         { file: 'Society Update Member List 2024.pdf',            ready: true },
  'List Of School Management Committee':     { file: 'School Management Committee.pdf',                ready: true },
}

var CERT_ROWS = Object.keys(CERT_FILES).map(function(name) { return [name, 'View Document'] })

function renderCertBtn(certInfo) {
  if (!certInfo) return null
  var soonStyle = {
    display:'inline-flex', alignItems:'center', gap:'5px',
    padding:'6px 13px', borderRadius:'8px',
    background:'rgba(0,0,0,.05)', color:'var(--txt3)',
    fontSize:'11.5px', fontWeight:'700',
    whiteSpace:'nowrap', cursor:'default'
  }
  var readyStyle = {
    display:'inline-flex', alignItems:'center', gap:'5px',
    padding:'6px 13px', borderRadius:'8px',
    background:'linear-gradient(135deg,var(--or),var(--gd))',
    color:'#fff', fontSize:'11.5px', fontWeight:'800',
    textDecoration:'none', whiteSpace:'nowrap',
    boxShadow:'0 3px 10px rgba(232,118,26,.28)'
  }
  if (certInfo.ready) {
    return (
      <a
        href={'/pdfs/' + encodeURIComponent(certInfo.file)}
        target="_blank"
        rel="noopener noreferrer"
        style={readyStyle}
      >
        <FaEye size={11}/> View
      </a>
    )
  }
  return (
    <span style={soonStyle}>
      <FaHourglassHalf size={11}/> Soon
    </span>
  )
}

function SectionTable(props) {
  var rows      = props.rows
  var certFiles = props.certFiles
  return (
    <>
      <style>{`
        .md-table { width:100%; border-collapse:collapse; }
        .md-tr { transition:background .15s; }
        .md-td-label {
          padding:13px 20px; font-size:13px; font-weight:600;
          color:var(--txt3); width:38%; vertical-align:middle;
          word-break:break-word;
        }
        .md-td-value {
          padding:13px 20px; font-size:13px; font-weight:600;
          color:var(--dark); vertical-align:middle; word-break:break-word;
        }
        .md-td-action {
          padding:10px 14px; vertical-align:middle;
          white-space:nowrap; text-align:right;
        }

        @media (max-width:600px) {
          .md-table, .md-table tbody { display:block; width:100%; }

          .md-tr {
            display:grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            padding:12px 16px;
            border-top:1px solid var(--brd);
            box-sizing:border-box;
            gap:3px 10px;
          }
          .md-tr:first-child { border-top:none; }

          .md-td-label {
            display:block;
            padding:0;
            font-size:12px;
            font-weight:700;
            color:var(--txt3);
            grid-column:1;
            grid-row:1;
            width:auto;
          }

          .md-td-value {
            display:block;
            padding:0;
            font-size:13px;
            font-weight:600;
            color:var(--dark);
            grid-column:1;
            grid-row:2;
          }

          .md-td-action {
            display:flex;
            align-items:center;
            justify-content:flex-end;
            padding:0;
            grid-column:2;
            grid-row:1 / span 2;
          }
        }
      `}</style>
      <table className="md-table">
        <tbody>
          {rows.map(function(row, i) {
            var certInfo  = certFiles ? certFiles[row[0]] : null
            var borderTop = i === 0 ? 'none' : '1px solid var(--brd)'
            var rowBg     = i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,.012)'
            return (
              <tr
                key={row[0] + i}
                className="md-tr"
                style={{ borderTop: borderTop, background: rowBg }}
                onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(232,118,26,.03)' }}
                onMouseLeave={function(e) { e.currentTarget.style.background = rowBg }}
              >
                <td className="md-td-label">{row[0]}</td>
                <td className="md-td-value">{row[1]}</td>
                <td className="md-td-action">{renderCertBtn(certInfo)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default function MandatoryDisclosurePage() {
  var [dbData, setDbData]   = useState(null)
  var [loading, setLoading] = useState(true)

  useEffect(function() {
    mandatoryAPI.get()
      .then(function(res){ setDbData(res.data); setLoading(false) })
      .catch(function(err){ console.error('Failed to load mandatory disclosure:', err); setLoading(false) })
  }, [])

  function dbToRows(arr) {
    if (!arr || !arr.length) return []
    return arr.map(function(r) { return [r.key, r.value] })
  }

  var SECTION_ICONS = {
    'A. General Information':      <FaSchool size={20} color="#fff"/>,
    'B. Documents & Certificates': <FaClipboardList size={20} color="#fff"/>,
    'C. Result & Academics':       <FaChartBar size={20} color="#fff"/>,
    'D. Staff Information':        <FaChalkboardTeacher size={20} color="#fff"/>,
    'E. School Infrastructure':    <FaBuilding size={20} color="#fff"/>,
    'F. Transport':                <FaBus size={20} color="#fff"/>,
  }

  var sections = dbData ? [
    { title:'A. General Information',      rows:dbToRows(dbData.schoolInfo),     certFiles:null       },
    { title:'B. Documents & Certificates', rows:CERT_ROWS,                       certFiles:CERT_FILES },
    { title:'C. Result & Academics',       rows:dbToRows(dbData.academic),       certFiles:null       },
    { title:'D. Staff Information',        rows:dbToRows(dbData.staff),          certFiles:null       },
    { title:'E. School Infrastructure',    rows:dbToRows(dbData.infrastructure), certFiles:null       },
    { title:'F. Transport',                rows:dbToRows(dbData.transport),      certFiles:null       },
  ] : []

  return (
    <>
      <style>{`
        .md-info-box {
          background:rgba(108,63,197,.06);
          border:1.5px solid rgba(108,63,197,.2);
          border-radius:16px;
          padding:20px 24px;
          margin-bottom:44px;
          display:flex;
          gap:14px;
          align-items:flex-start;
        }
        .md-footer-box {
          margin-top:40px;
          padding:20px 24px;
          border-radius:14px;
          background:rgba(232,118,26,.05);
          border:1.5px solid rgba(232,118,26,.15);
          text-align:center;
          font-size:13.5px;
          color:var(--txt2);
          line-height:1.9;
        }
        .md-footer-box strong { color:var(--or); }
        .md-footer-sep { margin:0 6px; }

        @media (max-width:600px) {
          .md-info-box { padding:14px 14px; gap:10px; margin-bottom:28px; }
          .md-footer-box { padding:16px 14px; font-size:13px; }
          .md-footer-sep { display:block; height:4px; margin:0; }
        }
      `}</style>

      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}>
            <FaClipboardList size={12}/> Mandatory Disclosure
          </div>
          <h1 className="pb-title">
            Mandatory <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Disclosure</span>
          </h1>
          <p className="pb-sub">
            As per CBSE Affiliation Bye-Laws — complete school information for transparency and accountability
          </p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Mandatory Disclosure</span>
          </div>
        </div>
      </div>

      <div style={{background:'var(--bg)', padding:'clamp(32px,6vw,60px) clamp(14px,4vw,20px)'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>

          <div className="md-info-box">
            <FaInfoCircle size={28} color="#6C3FC5" style={{flexShrink:0}}/>
            <div>
              <div style={{fontWeight:'700', fontSize:'14px', color:'#6C3FC5', marginBottom:'4px'}}>
                CBSE Mandatory Disclosure
              </div>
              <div style={{fontSize:'clamp(12.5px,2.5vw,13.5px)', color:'var(--txt2)', lineHeight:'1.6'}}>
                This disclosure is published as per the requirements of CBSE Affiliation Bye-Laws.
                Sant Pathik Vidyalaya is affiliated to CBSE, New Delhi. Affiliation No. <strong>2130176</strong>.
              </div>
            </div>
          </div>

          {loading && (
            <div style={{
              textAlign:'center', padding:'60px', color:'var(--txt2)',
              fontSize:'14px', fontWeight:'600',
              display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'
            }}>
              <FaHourglassHalf size={16} color="var(--or)"/> Loading disclosure data...
            </div>
          )}

          {!loading && (
            <div style={{display:'flex', flexDirection:'column', gap:'clamp(16px,3vw,28px)'}}>
              {sections.map(function(sec) {
                return (
                  <div
                    key={sec.title}
                    style={{
                      borderRadius:'clamp(12px,2vw,20px)',
                      overflow:'hidden',
                      border:'1.5px solid var(--brd)',
                      boxShadow:'0 4px 20px rgba(0,0,0,.04)'
                    }}
                  >
                    <div style={{
                      background:'linear-gradient(135deg,var(--dark),var(--dark2))',
                      padding:'clamp(12px,3vw,16px) clamp(14px,3vw,24px)',
                      display:'flex', alignItems:'center', gap:'12px'
                    }}>
                      {SECTION_ICONS[sec.title]}
                      <span style={{
                        fontFamily:"'Playfair Display',serif",
                        fontSize:'clamp(14px,3vw,17px)',
                        fontWeight:'700',
                        color:'#fff'
                      }}>
                        {sec.title}
                      </span>
                    </div>
                    <SectionTable rows={sec.rows} certFiles={sec.certFiles} />
                  </div>
                )
              })}
            </div>
          )}

          <div className="md-footer-box">
            For any additional information or document verification, please contact the school office.<br/>
            <strong style={{display:'inline-flex', alignItems:'center', gap:'5px'}}>
              <FaPhone size={12}/> +91 9198783830
            </strong>
            <span className="md-footer-sep">|</span>
            <strong style={{display:'inline-flex', alignItems:'center', gap:'5px'}}>
              <FaEnvelope size={12}/> spvbrh@gmail.com
            </strong>
            <span className="md-footer-sep">|</span>
            <strong style={{display:'inline-flex', alignItems:'center', gap:'5px'}}>
              <FaClock size={12}/> Mon–Sat, 8:00 AM – 3:00 PM
            </strong>
          </div>

        </div>
      </div>
    </>
  )
}