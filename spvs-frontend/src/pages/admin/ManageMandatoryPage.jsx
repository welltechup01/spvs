import { useState, useEffect } from 'react'
import { mandatoryAPI } from '../../api'
import {
  FaSchool, FaBuilding, FaBook, FaChalkboardTeacher, FaBus,
  FaSave, FaSpinner, FaCheckCircle, FaExclamationTriangle,
} from 'react-icons/fa'

var INIT_DATA = {
  schoolInfo: [
    ['Name of School','Sant Pathik Vidyalaya'],['Affiliation No.','2130176'],['School No.','70178'],['UDISE Code','09500707504'],['Year of Establishment','1987'],['Principal Name','Mrs. Puja Agarwal'],['Principal Qualification','M.A. B.Ed'],['Email','spvbrh@gmail.com'],['Contact No.','+91 9198783830'],['Address','Pashupati Nagar, Bahraich, UP 271802'],['Area of School','10 Acres'],['Area of Playground','5 Acres'],['No. of Students','1410'],['No. of Teachers','73'],['No. of Non-Teaching Staff','35'],
  ],
  infrastructure: [
    ['No. of Classrooms','73'],['No. of Labs','8'],['No. of Computer Lab Systems','60'],['No. of Library Books','5000+'],['No. of School Buses','22'],['Toilet Blocks (Boys)','10'],['Toilet Blocks (Girls)','12'],['Drinking Water','Yes — RO Purified'],['Fire Extinguishers','Yes — All Floors'],['CCTV Cameras','Yes — 40+ cameras'],['Ramp for Disabled','Yes — All Buildings'],
  ],
  academic: [
    ['Board','CBSE — Central Board of Secondary Education'],['Affiliation Valid Till','31 March 2029'],['Classes Offered','Play Group to Class XII'],['Streams (XI-XII)','Science, Commerce, Humanities'],['Medium of Instruction','Hindi & English'],['Academic Session','April to March'],['Result (Class X 2024-25)','100% — All students passed'],['Result (Class XII 2024-25)','100% — All students passed'],['Fee Structure','As per CBSE norms. Available at school office.'],
  ],
  staff: [
    ['Total Teaching Staff','64 (14 PGT + 20 TGT + 30 PRT)'],['Principal','Mrs. Puja Agarwal — M.A., B.Ed'],['Vice Principal','Mr. Bhikha Ram Tripathi — M.Sc., B.Ed'],['No. of Administrative Staff','8'],['No. of Non-Teaching Staff','12'],['Teacher–Student Ratio','1 : 22 (Approx.)'],['Details of Special Educator','Available at School Office'],['Details of Counsellor / Wellness Teacher','Available at School Office'],
  ],
  transport: [
    ['Own Buses','22 Buses covering all major routes'],['Buses Hired on Contract','None'],['Details of Transport Charges','As per route — available at school office'],['GPS Tracking','Available in all school buses'],
  ],
}

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', boxShadow:'0 2px 12px rgba(232,118,26,.06)' },
  input: { width:'100%', padding:'9px 12px', borderRadius:'9px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#1C0A00', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'600', outline:'none', boxSizing:'border-box' },
  h2:    { fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'#1C0A00', margin:0 },
}

var TABS = [
  { key:'schoolInfo',     label:'School Info',    icon:<FaSchool size={14} color="#E8761A"/> },
  { key:'infrastructure', label:'Infrastructure', icon:<FaBuilding size={14} color="#6C3FC5"/> },
  { key:'academic',       label:'Academic',       icon:<FaBook size={14} color="#22a35a"/> },
  { key:'staff',          label:'Staff',          icon:<FaChalkboardTeacher size={14} color="#C45F0A"/> },
  { key:'transport',      label:'Transport',      icon:<FaBus size={14} color="#E8761A"/> },
]

function dbToUi(arr) { return arr.map(function(r){ return [r.key, r.value] }) }

export default function ManageMandatoryPage() {
  var [tab,     setTab]     = useState('schoolInfo')
  var [data,    setData]    = useState(INIT_DATA)
  var [saved,   setSaved]   = useState(false)
  var [saving,  setSaving]  = useState(false)
  var [loading, setLoading] = useState(true)
  var [error,   setError]   = useState(null)

  useEffect(function() {
    mandatoryAPI.get()
      .then(function(res) {
        var d = res.data
        setData({
          schoolInfo:     dbToUi(d.schoolInfo),
          infrastructure: dbToUi(d.infrastructure),
          academic:       dbToUi(d.academic),
          staff:          d.staff     && d.staff.length     ? dbToUi(d.staff)     : INIT_DATA.staff,
          transport:      d.transport && d.transport.length ? dbToUi(d.transport) : INIT_DATA.transport,
        })
        setLoading(false)
      })
      .catch(function(){ setLoading(false) })
  }, [])

  function updateRow(section, rowIdx, colIdx, val) {
    setData(function(prev) {
      var updated = prev[section].map(function(row, i) {
        if (i !== rowIdx) return row
        var newRow = row.slice(); newRow[colIdx] = val; return newRow
      })
      var n = {}; for (var k in prev) n[k] = prev[k]; n[section] = updated; return n
    })
  }

  async function handleSave() {
    setSaving(true); setError(null)
    try {
      var payload = {
        schoolInfo:     data.schoolInfo.map(function(r){     return { key:r[0], value:r[1] } }),
        infrastructure: data.infrastructure.map(function(r){ return { key:r[0], value:r[1] } }),
        academic:       data.academic.map(function(r){       return { key:r[0], value:r[1] } }),
        staff:          data.staff.map(function(r){          return { key:r[0], value:r[1] } }),
        transport:      data.transport.map(function(r){      return { key:r[0], value:r[1] } }),
      }
      await mandatoryAPI.update(payload)
      setSaved(true); setTimeout(function(){ setSaved(false) }, 2500)
    } catch(err) { setError('Save failed: ' + err.message) }
    finally { setSaving(false) }
  }

  function renderTable(section, rows) {
    return (
      <div>
        {rows.map(function(row, ri) {
          return (
            <div key={ri} style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'10px',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(232,118,26,.07)'}}>
              <input value={row[0]} onChange={function(e){updateRow(section,ri,0,e.target.value)}} style={{...s.input,fontSize:'12.5px',color:'#7A4010',fontWeight:'700',background:'#FFF6EA'}} placeholder="Field name" />
              <input value={row[1]} onChange={function(e){updateRow(section,ri,1,e.target.value)}} style={s.input} placeholder="Value" />
            </div>
          )
        })}
        <button onClick={function(){setData(function(prev){ var n={}; for(var k in prev) n[k]=prev[k]; n[section]=prev[section].concat([['New Field','']]); return n })}}
          style={{marginTop:'12px',padding:'8px 16px',borderRadius:'8px',border:'1.5px dashed rgba(232,118,26,.3)',background:'transparent',color:'#E8761A',fontSize:'12px',fontWeight:'700',cursor:'pointer'}}>
          + Add Row
        </button>
      </div>
    )
  }

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'200px',color:'#B87832',fontSize:'14px',fontWeight:'600',gap:'10px'}}>
      <FaSpinner size={16} style={{animation:'spin .8s linear infinite'}}/> Loading Mandatory Disclosure data...
    </div>
  )

  return (
    <div style={{maxWidth:'960px'}}>
      <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{...s.h2,fontSize:'22px',marginBottom:'4px'}}>Mandatory Disclosure</h1>
          <p style={{fontSize:'13px',color:'#B87832',margin:0}}>Edit all CBSE mandatory disclosure information</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{padding:'10px 24px',borderRadius:'10px',border:'none',background:saved?'linear-gradient(135deg,#22a35a,#16a34a)':'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',fontSize:'13px',fontWeight:'800',cursor:saving?'not-allowed':'pointer',opacity:saving?0.7:1,transition:'all .25s',display:'inline-flex',alignItems:'center',gap:'7px'}}>
          {saving ? <><FaSpinner size={13} style={{animation:'spin .8s linear infinite'}}/> Saving...</> : saved ? <><FaCheckCircle size={13}/> Saved!</> : <><FaSave size={13}/> Save Changes</>}
        </button>
      </div>

      {error && (
        <div style={{marginBottom:'16px',padding:'12px 16px',borderRadius:'10px',background:'rgba(220,38,38,.08)',border:'1px solid rgba(220,38,38,.2)',color:'#dc2626',fontSize:'13px',fontWeight:'600',display:'inline-flex',alignItems:'center',gap:'7px'}}>
          <FaExclamationTriangle size={13}/> {error}
        </div>
      )}

      <div style={{display:'flex',gap:'4px',marginBottom:'20px',background:'#fff',padding:'5px',borderRadius:'12px',border:'1.5px solid rgba(232,118,26,.12)',width:'fit-content',flexWrap:'wrap'}}>
        {TABS.map(function(t) {
          var isActive = tab === t.key
          return (
            <button key={t.key} onClick={function(){ setTab(t.key) }}
              style={{padding:'8px 14px',borderRadius:'9px',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:'12px',whiteSpace:'nowrap',transition:'all .18s',fontWeight:isActive?'800':'600',background:isActive?'linear-gradient(135deg,#E8761A,#F5B800)':'transparent',color:isActive?'#fff':'#B87832',display:'inline-flex',alignItems:'center',gap:'6px'}}>
              {t.icon} {t.label}
            </button>
          )
        })}
      </div>

      <div style={{...s.card,padding:'24px'}}>
        {TABS.map(function(t) {
          if (tab !== t.key) return null
          return (
            <div key={t.key}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'16px',paddingBottom:'14px',borderBottom:'1.5px solid rgba(232,118,26,.1)'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'9px',background:'rgba(232,118,26,.1)',display:'flex',alignItems:'center',justifyContent:'center'}}>{t.icon}</div>
                <div style={s.h2}>{t.label} Details</div>
              </div>
              {renderTable(t.key, data[t.key])}
            </div>
          )
        })}
      </div>

      <div style={{marginTop:'16px',padding:'12px 16px',borderRadius:'10px',background:'rgba(232,118,26,.06)',border:'1px solid rgba(232,118,26,.15)',fontSize:'12px',color:'#7A4010'}}>
        <strong>Note:</strong> Changes saved here update the public Mandatory Disclosure page instantly. Certificate PDFs are stored in <code>public/pdfs/</code> folder.
      </div>
    </div>
  )
}