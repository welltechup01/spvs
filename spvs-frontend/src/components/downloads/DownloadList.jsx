import { useState } from 'react'
import DownloadCard from './DownloadCard'

var DOWNLOADS = [
  {
    category: 'Admission Forms',
    icon: '📋',
    items: [
      { title:'Admission Form 2026–27 (General)',         type:'PDF', size:'420 KB', date:'Jan 2026', url:'#' },
      { title:'Admission Form 2026–27 (Hostel)',          type:'PDF', size:'380 KB', date:'Jan 2026', url:'#' },
      { title:'Transfer Certificate Application Form',    type:'PDF', size:'210 KB', date:'Jan 2026', url:'#' },
      { title:'Scholarship Application Form 2026–27',     type:'PDF', size:'300 KB', date:'Jan 2026', url:'#' },
    ]
  },
  {
    category: 'SLC — School Leaving Certificate',
    icon: '🎓',
    items: [
      { title:'SLC Application Form (School Leaving Certificate)', type:'PDF', size:'250 KB', date:'Jan 2026', url:'#' },
      { title:'SLC Request Letter Format',                type:'PDF', size:'180 KB', date:'Jan 2026', url:'#' },
      { title:'SLC Checklist — Documents Required',       type:'PDF', size:'160 KB', date:'Jan 2026', url:'#' },
    ]
  },
  {
    category: 'TC & Migration Certificate',
    icon: '📜',
    items: [
      { title:'Transfer Certificate (TC) Application Form', type:'PDF', size:'230 KB', date:'Jan 2026', url:'#' },
      { title:'Migration Certificate Application Form',   type:'PDF', size:'240 KB', date:'Jan 2026', url:'#' },
      { title:'TC & Migration — Documents Checklist',     type:'PDF', size:'170 KB', date:'Jan 2026', url:'#' },
      { title:'Character Certificate Application Form',   type:'PDF', size:'190 KB', date:'Jan 2026', url:'#' },
    ]
  },
  {
    category: 'Academic Calendar & Syllabus',
    icon: '📅',
    items: [
      { title:'Academic Calendar 2026–27',                type:'PDF', size:'540 KB', date:'Apr 2026', url:'#' },
      { title:'Class X Syllabus 2025–26 (CBSE)',          type:'PDF', size:'1.2 MB', date:'Apr 2025', url:'#' },
      { title:'Class XII Science Syllabus 2025–26',       type:'PDF', size:'980 KB', date:'Apr 2025', url:'#' },
      { title:'Class XII Commerce Syllabus 2025–26',      type:'PDF', size:'870 KB', date:'Apr 2025', url:'#' },
      { title:'Class XII Humanities Syllabus 2025–26',    type:'PDF', size:'820 KB', date:'Apr 2025', url:'#' },
      { title:'Holiday List 2026',                        type:'PDF', size:'180 KB', date:'Jan 2026', url:'#' },
    ]
  },
  {
    category: 'Fee Structure',
    icon: '💰',
    items: [
      { title:'Fee Structure 2026–27 (All Classes)',      type:'PDF', size:'310 KB', date:'Jan 2026', url:'#' },
      { title:'Hostel Fee Structure 2026–27',             type:'PDF', size:'250 KB', date:'Jan 2026', url:'#' },
      { title:'Transport Fee Chart 2026–27',              type:'PDF', size:'220 KB', date:'Jan 2026', url:'#' },
    ]
  },
  {
    category: 'Exam & Results',
    icon: '📊',
    items: [
      { title:'Class X Board Result 2025 (School Topper List)', type:'PDF', size:'420 KB', date:'Jun 2025', url:'#' },
      { title:'Class XII Board Result 2025 (School Topper List)', type:'PDF', size:'440 KB', date:'Jun 2025', url:'#' },
      { title:'Unit Test Schedule — Term 1 2026',         type:'PDF', size:'190 KB', date:'Apr 2026', url:'#' },
      { title:'Half-Yearly Exam Schedule 2025',           type:'PDF', size:'200 KB', date:'Sep 2025', url:'#' },
      { title:'Annual Exam Schedule 2026',                type:'PDF', size:'210 KB', date:'Feb 2026', url:'#' },
    ]
  },
  {
    category: 'Circulars & Notices',
    icon: '📢',
    items: [
      { title:'School Reopening Notice — April 2026',     type:'PDF', size:'150 KB', date:'Mar 2026', url:'#' },
      { title:'Parent-Teacher Meeting Notice — Feb 2026', type:'PDF', size:'140 KB', date:'Feb 2026', url:'#' },
      { title:'Sports Day Notice 2026',                   type:'PDF', size:'160 KB', date:'Jan 2026', url:'#' },
      { title:'Annual Day Circular 2025',                 type:'PDF', size:'155 KB', date:'Nov 2025', url:'#' },
      { title:'CBSE Guidelines for Students 2025–26',     type:'PDF', size:'600 KB', date:'Apr 2025', url:'#' },
    ]
  },
  {
    category: 'Holidays List',
    icon: '📅',
    items: [
      { title:'School Holiday List 2026 — Full Year',     type:'PDF', size:'280 KB', date:'Jan 2026', url:'#' },
      { title:'Summer Vacation Schedule 2026',            type:'PDF', size:'160 KB', date:'Apr 2026', url:'#' },
      { title:'Exam Break & Winter Holiday Schedule 2025–26', type:'PDF', size:'190 KB', date:'Nov 2025', url:'#' },
    ]
  },
  {
    category: 'Mandatory Disclosure Documents',
    icon: '🏛️',
    items: [
      { title:'CBSE Affiliation Certificate',             type:'PDF', size:'780 KB', date:'2024', url:'#' },
      { title:'School Recognition Certificate',           type:'PDF', size:'650 KB', date:'2024', url:'#' },
      { title:'Fire Safety Certificate',                  type:'PDF', size:'420 KB', date:'2024', url:'#' },
      { title:'Building Safety Certificate',              type:'PDF', size:'510 KB', date:'2024', url:'#' },
      { title:'Self Certification to CBSE',               type:'PDF', size:'390 KB', date:'2024', url:'#' },
    ]
  },
]

var ALL_CATS = ['All'].concat(DOWNLOADS.map(function(d){ return d.category }))

export default function DownloadList() {
  var [filter, setFilter] = useState('All')
  var [search, setSearch] = useState('')

  var visible = DOWNLOADS.filter(function(sec) {
    if (filter !== 'All' && sec.category !== filter) return false
    return true
  }).map(function(sec) {
    var items = sec.items.filter(function(item) {
      return item.title.toLowerCase().includes(search.toLowerCase())
    })
    return { category: sec.category, icon: sec.icon, items: items }
  }).filter(function(sec) { return sec.items.length > 0 })

  var totalCount = DOWNLOADS.reduce(function(sum, s){ return sum + s.items.length }, 0)

  return (
    <div>
      {/* Summary bar */}
      <div style={{display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'28px', padding:'16px 20px', borderRadius:'14px', background:'var(--card)', border:'1.5px solid var(--brd)', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{fontSize:'13.5px', color:'var(--txt2)'}}>
          <strong style={{color:'var(--or)'}}>{totalCount} documents</strong> available across <strong style={{color:'var(--dark)'}}>{DOWNLOADS.length} categories</strong>
        </div>
        <div style={{fontSize:'12px', color:'var(--txt3)'}}>
          📌 All documents are in PDF format &nbsp;·&nbsp; 🔒 Official SPV documents
        </div>
      </div>

      {/* Search + filter */}
      <div style={{display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'32px', alignItems:'flex-start'}}>
        <input
          value={search} onChange={function(e){setSearch(e.target.value)}}
          placeholder="🔍 Search documents..."
          style={{flex:1, minWidth:'200px', padding:'11px 16px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', transition:'border-color .2s'}}
          onFocus={function(e){e.target.style.borderColor='var(--or)'}}
          onBlur={function(e){e.target.style.borderColor='var(--brd)'}}
        />
        <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
          {ALL_CATS.map(function(c) {
            var active = filter === c
            return (
              <button key={c} onClick={function(){setFilter(c)}} style={{padding:'8px 14px', borderRadius:'50px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'11.5px', fontWeight:'700', transition:'all .2s', background: active ? 'var(--or)' : 'var(--bg2)', color: active ? '#fff' : 'var(--txt2)', boxShadow: active ? '0 4px 14px rgba(232,118,26,.3)' : 'none', whiteSpace:'nowrap'}}>
                {c === 'All' ? 'All' : c.split(' ').slice(0,2).join(' ')}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sections */}
      {visible.length > 0 ? (
        <div style={{display:'flex', flexDirection:'column', gap:'28px'}}>
          {visible.map(function(sec) {
            return (
              <div key={sec.category}>
                {/* Section header */}
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px', paddingBottom:'12px', borderBottom:'2px solid var(--brd)'}}>
                  <span style={{fontSize:'22px'}}>{sec.icon}</span>
                  <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:'700', color:'var(--dark)', margin:0}}>{sec.category}</h3>
                  <span style={{marginLeft:'auto', fontSize:'11px', fontWeight:'800', color:'var(--txt3)', background:'var(--bg2)', padding:'3px 10px', borderRadius:'50px'}}>{sec.items.length} files</span>
                </div>
                {/* Items */}
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  {sec.items.map(function(item) {
                    return <DownloadCard key={item.title} item={item} />
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{textAlign:'center', padding:'60px', color:'var(--txt3)'}}>
          <div style={{fontSize:'48px', marginBottom:'14px'}}>📭</div>
          <div style={{fontSize:'18px', fontWeight:'600', color:'var(--txt2)'}}>No documents found for "{search}"</div>
        </div>
      )}

      {/* Help note */}
      <div style={{marginTop:'40px', padding:'18px 22px', borderRadius:'14px', background:'rgba(108,63,197,.05)', border:'1.5px solid rgba(108,63,197,.15)', display:'flex', gap:'12px', alignItems:'flex-start'}}>
        <span style={{fontSize:'22px', flexShrink:0}}>💡</span>
        <div style={{fontSize:'13px', color:'var(--txt2)', lineHeight:'1.7'}}>
          Can't find what you're looking for? Visit the school office or call <strong style={{color:'var(--or)'}}>+91 9198783830</strong> during school hours (Mon–Sat, 8:00 AM – 3:00 PM). Physical copies of all official documents are available at the office.
        </div>
      </div>
    </div>
  )
}