import { Link } from 'react-router-dom'
import DownloadList from '../../components/downloads/DownloadList'
import { FaFileAlt, FaFolderOpen, FaCheckCircle, FaFilePdf } from 'react-icons/fa'

var STATS = [
  ['40+', 'Documents',     <FaFileAlt size={16} color="#fff"/>    ],
  ['8',   'Categories',    <FaFolderOpen size={16} color="#fff"/>  ],
  ['Free','All Downloads', <FaCheckCircle size={16} color="#fff"/> ],
  ['PDF', 'Format',        <FaFilePdf size={16} color="#fff"/>     ],
]

export default function DownloadsPage() {
  return (
    <>
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}>
            <FaFileAlt size={12}/> Downloads
          </div>
          <h1 className="pb-title">Downloads & <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Documents</span></h1>
          <p className="pb-sub">Admission forms, fee structure, syllabus, circulars and all official SPV documents in one place</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Downloads</span>
          </div>
        </div>
      </div>

      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))',padding:'18px 0'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 20px',display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'16px'}}>
          {STATS.map(function(s) {
            return (
              <div key={s[1]} style={{textAlign:'center',color:'#fff'}}>
                <div style={{display:'flex',justifyContent:'center',marginBottom:'2px'}}>{s[2]}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:'700',lineHeight:'1'}}>{s[0]}</div>
                <div style={{fontSize:'11px',fontWeight:'700',opacity:'.8',letterSpacing:'1px',textTransform:'uppercase',marginTop:'3px'}}>{s[1]}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{background:'var(--bg)',padding:'60px 20px',minHeight:'60vh'}}>
        <div style={{maxWidth:'1000px',margin:'0 auto'}}>
          <DownloadList />
        </div>
      </div>
    </>
  )
}