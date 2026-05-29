import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogList from '../../components/blog/BlogList'
import { blogAPI } from '../../api'
import { FaNewspaper, FaTags, FaCalendarAlt, FaTrophy } from 'react-icons/fa'

export default function BlogPage() {
  var [count, setCount] = useState('...')

  useEffect(function() {
    blogAPI.getAll()
      .then(function(res){ setCount((res.data || []).length + '+') })
      .catch(function(){ setCount('10+') })
  }, [])

  var STATS = [
    [count,  'Posts',      <FaNewspaper size={14}/>],
    ['6',    'Categories', <FaTags size={14}/>],
    ['2026', 'Latest Year',<FaCalendarAlt size={14}/>],
    ['100%', 'Results',    <FaTrophy size={14}/>],
  ]

  return (
    <>
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip" style={{display:'inline-flex',alignItems:'center',gap:'6px'}}><FaNewspaper size={12}/> Blog & Updates</div>
          <h1 className="pb-title">Latest <span style={{color:'var(--gd2)',fontStyle:'italic'}}>News & Updates</span></h1>
          <p className="pb-sub">School announcements, achievements, events and academic updates — stay informed with SPV</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span className="bc-cur">Blog & Updates</span>
          </div>
        </div>
      </div>

      <div style={{background:'linear-gradient(90deg,var(--or),var(--or3),var(--gd))',padding:'16px 0'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 16px',display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'10px'}}>
          {STATS.map(function(s) {
            return (
              <div key={s[1]} style={{textAlign:'center',color:'#fff',minWidth:'52px'}}>
                <div style={{display:'flex',justifyContent:'center',marginBottom:'2px'}}>{s[2]}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',lineHeight:'1'}}>{s[0]}</div>
                <div style={{fontSize:'9px',fontWeight:'700',opacity:'.8',letterSpacing:'1px',textTransform:'uppercase',marginTop:'3px'}}>{s[1]}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{background:'var(--bg)',padding:'40px 16px',minHeight:'60vh'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <BlogList />
        </div>
      </div>
    </>
  )
}