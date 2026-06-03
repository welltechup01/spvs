import { useState, useEffect } from 'react'
import { academicsAPI } from '../../api'
import {
  FaSchool, FaBook, FaFileAlt, FaUpload, FaDownload,
  FaTrash, FaCheckCircle, FaExclamationTriangle, FaSave, FaSpinner,
  FaTrophy, FaBullseye, FaClipboardList,
} from 'react-icons/fa'

var INIT_STREAMS = [
  { id:1, name:'Science',    icon:'🔬', clr:'#22a35a', subjects:['Physics','Chemistry','Biology','Mathematics','Computer Science','English Core','Physical Education'], description:'For students aiming at engineering, medicine, and research careers.', eligibility:'Min. 60% in Class X Science & Maths' },
  { id:2, name:'Commerce',   icon:'📈', clr:'#E8761A', subjects:['Accountancy','Business Studies','Economics','Mathematics','English Core','Information Practices'], description:'For students aiming at CA, MBA, banking, and business careers.', eligibility:'Min. 55% in Class X' },
  { id:3, name:'Humanities', icon:'🎭', clr:'#6C3FC5', subjects:['History','Political Science','Geography','Economics','English Core','Hindi Core','Sociology'], description:'For students aiming at UPSC, law, journalism, and social sciences.', eligibility:'Open to all Class X pass students' },
]
var INIT_CLASSES = [
  { id:1,  name:'Play Group',  age:'3–4 yrs',   students:'45', sections:'2' },
  { id:2,  name:'Nursery',     age:'4–5 yrs',   students:'60', sections:'2' },
  { id:3,  name:'KG',          age:'5–6 yrs',   students:'65', sections:'2' },
  { id:4,  name:'Class I',     age:'6–7 yrs',   students:'75', sections:'3' },
  { id:5,  name:'Class II',    age:'7–8 yrs',   students:'70', sections:'3' },
  { id:6,  name:'Class III',   age:'8–9 yrs',   students:'72', sections:'3' },
  { id:7,  name:'Class IV',    age:'9–10 yrs',  students:'68', sections:'3' },
  { id:8,  name:'Class V',     age:'10–11 yrs', students:'74', sections:'3' },
  { id:9,  name:'Class VI',    age:'11–12 yrs', students:'80', sections:'3' },
  { id:10, name:'Class VII',   age:'12–13 yrs', students:'78', sections:'3' },
  { id:11, name:'Class VIII',  age:'13–14 yrs', students:'76', sections:'3' },
  { id:12, name:'Class IX',    age:'14–15 yrs', students:'82', sections:'3' },
  { id:13, name:'Class X',     age:'15–16 yrs', students:'85', sections:'3' },
  { id:14, name:'Class XI',    age:'16–17 yrs', students:'90', sections:'3' },
  { id:15, name:'Class XII',   age:'17–18 yrs', students:'88', sections:'3' },
]
var INIT_CURRICULUM = {
  cbseNote:    'Sant Pathik Vidyalaya follows the CBSE curriculum from Play Group to Class XII.',
  examPattern: 'Classes I–VIII: CCE. Classes IX–XII: As per CBSE Board examination pattern.',
  activities:  ['Morning Assembly','Sports Period (Daily)','Library Period','Art & Craft','Music & Dance','Computer Lab','Science Experiments','Debate & Elocution','NCC/Scout'],
  achievements:['100% Board Results (2024-25)','12 District Level Sports Medals','State Level Science Olympiad Winners','Best School Award — Bahraich 2023'],
}
var SYLLABUS_LEVELS = ['Pre-Primary (PG – UKG)','Primary (Class I – V)','Middle (Class VI – VIII)','Secondary (Class IX – X)','Science Stream (Class XI – XII)','Commerce Stream (Class XI – XII)','Humanities Stream (Class XI – XII)']

// Fee Structure tab removed — fees are static in FeeStructure.jsx
var TABS = ['Streams (XI-XII)', 'Classes & Sections', 'Curriculum Info', 'Syllabus Upload']

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', boxShadow:'0 2px 12px rgba(232,118,26,.06)' },
  h2:    { fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'#1C0A00', margin:0 },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'.8px', textTransform:'uppercase', display:'block', marginBottom:'4px' },
  input: { width:'100%', padding:'8px 11px', borderRadius:'8px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#1C0A00', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', outline:'none', boxSizing:'border-box', fontWeight:'600' },
}

function dbToStreams(arr) { return arr.map(function(s, i) { return {...s, id: i+1} }) }
function dbToClasses(arr) { return arr.map(function(c, i) { return {...c, id: i+1} }) }

function SyllabusRow({ level, syllabuses, uploading, onUpload, onDelete }) {
  var existing    = syllabuses.find(function(s) { return s.level === level })
  var isUploading = uploading === level
  var hasFile     = !!(existing && existing.fileUrl)
  return (
    <div style={{background:'#FFFFFF',borderRadius:'14px',border:'1.5px solid rgba(232,118,26,.12)',padding:'14px 16px',display:'flex',alignItems:'flex-start',gap:'12px',flexWrap:'wrap'}}>
      <div style={{flex:1,minWidth:'140px'}}>
        <div style={{fontSize:'14px',fontWeight:'700',color:'#1C0A00',marginBottom:'3px'}}>{level}</div>
        <div style={{fontSize:'11.5px',color:hasFile?'#22a35a':'#B87832',display:'inline-flex',alignItems:'center',gap:'5px'}}>
          {hasFile ? <><FaCheckCircle size={11}/> Uploaded — {existing.year||'2026-27'}</> : <><FaExclamationTriangle size={11}/> No syllabus uploaded yet</>}
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
        <label style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'8px 14px',borderRadius:'8px',border:'1.5px solid rgba(232,118,26,.25)',background:'rgba(232,118,26,.06)',color:'#E8761A',fontSize:'12px',fontWeight:'700',cursor:isUploading?'not-allowed':'pointer',opacity:isUploading?0.6:1}}>
          {isUploading ? <><FaSpinner size={11} style={{animation:'spin .8s linear infinite'}}/> Uploading...</> : hasFile ? <><FaUpload size={11}/> Replace PDF</> : <><FaUpload size={11}/> Upload PDF</>}
          <input type="file" accept="application/pdf" disabled={isUploading} style={{display:'none'}} onChange={function(e){var f=e.target.files[0];if(f)onUpload(level,f)}} />
        </label>
        {hasFile && <a href={existing.fileUrl} download target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'5px',padding:'8px 14px',borderRadius:'8px',background:'rgba(34,163,90,.08)',border:'1px solid rgba(34,163,90,.2)',color:'#22a35a',fontSize:'12px',fontWeight:'700',textDecoration:'none'}}><FaDownload size={11}/> Download</a>}
        {hasFile && <button onClick={function(){onDelete(level)}} style={{display:'inline-flex',alignItems:'center',gap:'5px',padding:'8px 12px',borderRadius:'8px',border:'1.5px solid rgba(220,38,38,.2)',background:'rgba(220,38,38,.06)',color:'#dc2626',fontSize:'12px',fontWeight:'700',cursor:'pointer'}}><FaTrash size={11}/> Delete</button>}
      </div>
    </div>
  )
}

export default function ManageAcademicsPage() {
  var [tab,        setTab]        = useState('Streams (XI-XII)')
  var [streams,    setStreams]    = useState(INIT_STREAMS)
  var [classes,    setClasses]    = useState(INIT_CLASSES)
  var [curr,       setCurr]       = useState(INIT_CURRICULUM)
  var [syllabuses, setSyllabuses] = useState([])
  var [saved,      setSaved]      = useState(false)
  var [saving,     setSaving]     = useState(false)
  var [loading,    setLoading]    = useState(true)
  var [error,      setError]      = useState(null)
  var [editStream, setEditStream] = useState(null)
  var [uploading,  setUploading]  = useState('')

  useEffect(function() {
    academicsAPI.get()
      .then(function(res) {
        var d = res.data
        if (d.streams    && d.streams.length)    setStreams(dbToStreams(d.streams))
        if (d.classes    && d.classes.length)    setClasses(dbToClasses(d.classes))
        if (d.curriculum) setCurr(d.curriculum)
        if (d.syllabuses) setSyllabuses(d.syllabuses)
        // d.fees intentionally ignored — fees are static
        setLoading(false)
      })
      .catch(function() { setLoading(false) })
  }, [])

  async function handleSave() {
    setSaving(true); setError(null)
    try {
      var payload = {
        streams:    streams.map(function(s)  { return { name:s.name, icon:s.icon, clr:s.clr, description:s.description, eligibility:s.eligibility, subjects:s.subjects } }),
        classes:    classes.map(function(c)  { return { name:c.name, age:c.age, students:c.students, sections:c.sections } }),
        curriculum: curr,
        // fees intentionally omitted from payload
      }
      await academicsAPI.update(payload)
      setSaved(true); setTimeout(function() { setSaved(false) }, 2500)
    } catch (err) { setError('Save failed: ' + err.message) }
    finally { setSaving(false) }
  }

  async function handleSyllabusUpload(level, file) {
    setUploading(level); setError(null)
    try {
      var fd = new FormData(); fd.append('pdf',file); fd.append('level',level); fd.append('year','2026-27')
      var res = await academicsAPI.uploadSyllabus(fd)
      setSyllabuses(function(prev) {
        var exists = prev.find(function(s) { return s.level === level })
        if (exists) return prev.map(function(s) { return s.level===level ? {...s,fileUrl:res.fileUrl} : s })
        return prev.concat([{ level, fileUrl:res.fileUrl, year:'2026-27' }])
      })
    } catch (err) { setError('Upload failed: ' + err.message) }
    finally { setUploading('') }
  }

  async function handleSyllabusDelete(level) {
    setError(null)
    try {
      await academicsAPI.deleteSyllabus(level)
      setSyllabuses(function(prev) { return prev.filter(function(s) { return s.level !== level }) })
    } catch (err) { setError('Delete failed: ' + err.message) }
  }

  function updateClass(id,field,val)  { setClasses(function(p){return p.map(function(c){return c.id===id?{...c,[field]:val}:c})}) }
  function updateStream(id,field,val) { setStreams(function(p){return p.map(function(s){return s.id===id?{...s,[field]:val}:s})}) }
  function updateStreamSubject(id,idx,val) {
    setStreams(function(prev){return prev.map(function(s){
      if(s.id!==id)return s; var subs=s.subjects.slice(); subs[idx]=val; return {...s,subjects:subs}
    })})
  }

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'200px',color:'#B87832',fontSize:'14px',fontWeight:'600',gap:'10px'}}>
      <FaSpinner size={16} style={{animation:'spin .8s linear infinite'}}/> Loading academics data...
    </div>
  )

  return (
    <div style={{maxWidth:'1100px',width:'100%',boxSizing:'border-box'}}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes spin { to { transform:rotate(360deg) } }
        .mac-hdr { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; gap:12px; flex-wrap:wrap; }
        .mac-save { padding:10px 24px; border-radius:10px; border:none; font-size:13px; font-weight:800; cursor:pointer; white-space:nowrap; transition:all .25s; flex-shrink:0; display:inline-flex; align-items:center; gap:7px; justify-content:center; }
        .mac-tabs { display:flex; gap:4px; margin-bottom:18px; background:#fff; padding:5px; border-radius:12px; border:1.5px solid rgba(232,118,26,.12); overflow-x:auto; scrollbar-width:none; }
        .mac-tabs::-webkit-scrollbar { display:none; }
        .mac-tab-btn { padding:8px 14px; border-radius:9px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12px; transition:all .18s; white-space:nowrap; flex-shrink:0; }
        .mac-streams { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:16px; }
        .mac-currgrid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .mac-tbl-wrap { overflow-x:auto; } .mac-tbl-wrap table { min-width:480px; width:100%; border-collapse:collapse; }
        @media (max-width:900px) { .mac-streams { grid-template-columns:1fr 1fr; } }
        @media (max-width:640px) { .mac-hdr { flex-direction:column; align-items:stretch; } .mac-save { width:100%; } .mac-streams { grid-template-columns:1fr; } .mac-currgrid { grid-template-columns:1fr; } .mac-tab-btn { font-size:11px; padding:7px 11px; } }
      `}</style>

      <div className="mac-hdr">
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(18px,3vw,22px)',fontWeight:'700',color:'#1C0A00',margin:'0 0 4px'}}>Academics Management</h1>
          <p style={{fontSize:'13px',color:'#B87832',margin:0}}>Edit streams, classes, curriculum and syllabus PDFs</p>
        </div>
        {tab !== 'Syllabus Upload' && (
          <button className="mac-save" onClick={handleSave} disabled={saving}
            style={{background:saved?'linear-gradient(135deg,#22a35a,#16a34a)':'linear-gradient(135deg,#E8761A,#F5B800)',color:'#fff',opacity:saving?0.7:1,cursor:saving?'not-allowed':'pointer'}}>
            {saving ? <><FaSpinner size={13} style={{animation:'spin .8s linear infinite'}}/> Saving...</> : saved ? <><FaCheckCircle size={13}/> Saved!</> : <><FaSave size={13}/> Save Changes</>}
          </button>
        )}
      </div>

      {error && (
        <div style={{marginBottom:'16px',padding:'12px 16px',borderRadius:'10px',background:'rgba(220,38,38,.08)',border:'1px solid rgba(220,38,38,.2)',color:'#dc2626',fontSize:'13px',fontWeight:'600',display:'inline-flex',alignItems:'center',gap:'7px'}}>
          <FaExclamationTriangle size={13}/> {error}
        </div>
      )}

      <div className="mac-tabs">
        {TABS.map(function(t) {
          var active = tab === t
          return (
            <button key={t} className="mac-tab-btn" onClick={function(){ setTab(t) }}
              style={{fontWeight:active?'800':'600',background:active?'linear-gradient(135deg,#E8761A,#F5B800)':'transparent',color:active?'#fff':'#B87832'}}>
              {t}
            </button>
          )
        })}
      </div>

      {tab === 'Streams (XI-XII)' && (
        <div className="mac-streams">
          {streams.map(function(stream) {
            var isEdit = editStream === stream.id
            return (
              <div key={stream.id} style={{...s.card,padding:'20px',border:'1.5px solid '+(isEdit?stream.clr+'55':'rgba(232,118,26,.12)')}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px',gap:'8px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:'38px',height:'38px',borderRadius:'10px',background:stream.clr+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>{stream.icon}</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:'17px',fontWeight:'700',color:'#1C0A00'}}>{stream.name}</div>
                  </div>
                  <button onClick={function(){ setEditStream(isEdit?null:stream.id) }}
                    style={{padding:'5px 12px',borderRadius:'7px',border:'1.5px solid '+(isEdit?stream.clr+'55':'rgba(232,118,26,.2)'),background:isEdit?stream.clr+'12':'transparent',color:isEdit?stream.clr:'#B87832',fontSize:'11.5px',fontWeight:'800',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>
                    {isEdit?'Done':'Edit'}
                  </button>
                </div>
                {isEdit ? (
                  <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    <div><label style={s.label}>Description</label><textarea value={stream.description} rows={2} onChange={function(e){updateStream(stream.id,'description',e.target.value)}} style={{...s.input,resize:'vertical',lineHeight:'1.5'}} /></div>
                    <div><label style={s.label}>Eligibility</label><input value={stream.eligibility} onChange={function(e){updateStream(stream.id,'eligibility',e.target.value)}} style={s.input} /></div>
                    <div>
                      <label style={s.label}>Subjects</label>
                      {stream.subjects.map(function(sub,idx){ return <input key={idx} value={sub} onChange={function(e){updateStreamSubject(stream.id,idx,e.target.value)}} style={{...s.input,marginBottom:'5px'}} placeholder={'Subject '+(idx+1)} /> })}
                      <button onClick={function(){setStreams(function(prev){return prev.map(function(s){return s.id===stream.id?{...s,subjects:s.subjects.concat([''])}:s})})}}
                        style={{marginTop:'4px',padding:'6px 12px',borderRadius:'7px',border:'1.5px dashed rgba(232,118,26,.3)',background:'transparent',color:'#E8761A',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>+ Add Subject</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p style={{fontSize:'12.5px',color:'#7A4010',marginBottom:'10px',lineHeight:'1.6'}}>{stream.description}</p>
                    <div style={{fontSize:'11.5px',color:'#B87832',marginBottom:'12px',display:'inline-flex',alignItems:'center',gap:'5px'}}><FaClipboardList size={11}/> {stream.eligibility}</div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
                      {stream.subjects.map(function(sub){ return <span key={sub} style={{fontSize:'11px',padding:'3px 9px',borderRadius:'50px',background:stream.clr+'12',color:stream.clr,fontWeight:'700'}}>{sub}</span> })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab === 'Classes & Sections' && (
        <div style={{...s.card,padding:'0',overflow:'hidden'}}>
          <div style={{padding:'14px 18px',borderBottom:'1px solid rgba(232,118,26,.1)',display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'30px',height:'30px',borderRadius:'8px',background:'rgba(232,118,26,.1)',display:'flex',alignItems:'center',justifyContent:'center'}}><FaSchool size={14} color="#E8761A"/></div>
            <div style={s.h2}>Classes & Sections</div>
          </div>
          <div className="mac-tbl-wrap">
            <table>
              <thead><tr style={{background:'#FFF6EA'}}>{['Class','Age Group','Students','Sections'].map(function(h){ return <th key={h} style={{padding:'10px 14px',fontSize:'11px',fontWeight:'800',color:'#B87832',letterSpacing:'.8px',textTransform:'uppercase',textAlign:'left',borderBottom:'1.5px solid rgba(232,118,26,.1)',whiteSpace:'nowrap'}}>{h}</th> })}</tr></thead>
              <tbody>
                {classes.map(function(cls,i){
                  return (
                    <tr key={cls.id} style={{borderBottom:'1px solid rgba(232,118,26,.06)',background:i%2===0?'#fff':'#FFFDF8'}}>
                      <td style={{padding:'7px 14px',fontWeight:'700',fontSize:'13px',color:'#1C0A00',whiteSpace:'nowrap'}}>{cls.name}</td>
                      <td style={{padding:'7px 14px'}}><input value={cls.age} onChange={function(e){updateClass(cls.id,'age',e.target.value)}} style={{...s.input,width:'110px',padding:'5px 8px',fontSize:'12.5px'}} /></td>
                      <td style={{padding:'7px 14px'}}><input value={cls.students} onChange={function(e){updateClass(cls.id,'students',e.target.value)}} style={{...s.input,width:'70px',padding:'5px 8px',fontSize:'12.5px',textAlign:'center'}} /></td>
                      <td style={{padding:'7px 14px'}}><input value={cls.sections} onChange={function(e){updateClass(cls.id,'sections',e.target.value)}} style={{...s.input,width:'55px',padding:'5px 8px',fontSize:'12.5px',textAlign:'center'}} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'Curriculum Info' && (
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{...s.card,padding:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}><div style={{width:'30px',height:'30px',borderRadius:'8px',background:'rgba(108,63,197,.1)',display:'flex',alignItems:'center',justifyContent:'center'}}><FaBook size={14} color="#6C3FC5"/></div><div style={s.h2}>CBSE Curriculum Note</div></div>
            <textarea value={curr.cbseNote} rows={3} onChange={function(e){setCurr(function(p){return{...p,cbseNote:e.target.value}})}} style={{...s.input,resize:'vertical',lineHeight:'1.6'}} />
          </div>
          <div style={{...s.card,padding:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}><div style={{width:'30px',height:'30px',borderRadius:'8px',background:'rgba(232,118,26,.1)',display:'flex',alignItems:'center',justifyContent:'center'}}><FaFileAlt size={14} color="#E8761A"/></div><div style={s.h2}>Exam Pattern</div></div>
            <textarea value={curr.examPattern} rows={2} onChange={function(e){setCurr(function(p){return{...p,examPattern:e.target.value}})}} style={{...s.input,resize:'vertical',lineHeight:'1.6'}} />
          </div>
          <div className="mac-currgrid">
            <div style={{...s.card,padding:'20px'}}>
              <div style={{marginBottom:'14px',display:'flex',alignItems:'center',gap:'8px'}}><FaBullseye size={14} color="#E8761A"/><div style={s.h2}>Co-curricular Activities</div></div>
              {curr.activities.map(function(act,i){ return (<div key={i} style={{display:'flex',gap:'6px',marginBottom:'6px',alignItems:'center'}}><span style={{color:'#E8761A',fontSize:'12px',flexShrink:0}}>◆</span><input value={act} onChange={function(e){setCurr(function(p){var a=p.activities.slice();a[i]=e.target.value;return{...p,activities:a}})}} style={{...s.input,padding:'6px 10px',fontSize:'12.5px'}} /></div>) })}
              <button onClick={function(){setCurr(function(p){return{...p,activities:p.activities.concat([''])}})}} style={{marginTop:'6px',padding:'6px 12px',borderRadius:'7px',border:'1.5px dashed rgba(232,118,26,.3)',background:'transparent',color:'#E8761A',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>+ Add Activity</button>
            </div>
            <div style={{...s.card,padding:'20px'}}>
              <div style={{marginBottom:'14px',display:'flex',alignItems:'center',gap:'8px'}}><FaTrophy size={14} color="#22a35a"/><div style={s.h2}>Key Achievements</div></div>
              {curr.achievements.map(function(ach,i){ return (<div key={i} style={{display:'flex',gap:'6px',marginBottom:'6px',alignItems:'center'}}><span style={{color:'#22a35a',fontSize:'12px',flexShrink:0}}>◆</span><input value={ach} onChange={function(e){setCurr(function(p){var a=p.achievements.slice();a[i]=e.target.value;return{...p,achievements:a}})}} style={{...s.input,padding:'6px 10px',fontSize:'12.5px'}} /></div>) })}
              <button onClick={function(){setCurr(function(p){return{...p,achievements:p.achievements.concat([''])}})}} style={{marginTop:'6px',padding:'6px 12px',borderRadius:'7px',border:'1.5px dashed rgba(34,163,90,.3)',background:'transparent',color:'#22a35a',fontSize:'11.5px',fontWeight:'700',cursor:'pointer'}}>+ Add Achievement</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'Syllabus Upload' && (
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          <div style={{...s.card,padding:'20px',marginBottom:'4px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}><div style={{width:'30px',height:'30px',borderRadius:'8px',background:'rgba(108,63,197,.1)',display:'flex',alignItems:'center',justifyContent:'center'}}><FaFileAlt size={14} color="#6C3FC5"/></div><div style={s.h2}>Syllabus PDFs</div></div>
            <p style={{fontSize:'12.5px',color:'#B87832',margin:0}}>Upload syllabus PDF for each class level. Students can view and download from the Academics page.</p>
          </div>
          {SYLLABUS_LEVELS.map(function(level){ return <SyllabusRow key={level} level={level} syllabuses={syllabuses} uploading={uploading} onUpload={handleSyllabusUpload} onDelete={handleSyllabusDelete} /> })}
        </div>
      )}
    </div>
  )
}