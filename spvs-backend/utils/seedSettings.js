// spvs-backend/utils/seedSettings.js
// Run: node utils/seedSettings.js
require('dotenv').config()
const mongoose = require('mongoose')
const Settings = require('../models/Settings')

const DEFAULTS = {
  school: {
    name:'Sant Pathik Vidyalaya', tagline:'Excellence in Education Since 1987',
    affNo:'2130176', schoolNo:'70178', udise:'09500707504', established:'1987',
    students:'1410', classrooms:'73', labs:'8', buses:'22', area:'10 Acres',
    board:'CBSE', medium:'Hindi & English', session:'2026-27',
    address:'Bahraich, Uttar Pradesh — 271801',
    principalName:'Mrs. Puja Agarwal', principalQual:'M.A. B.Ed', principalPhone:'8318842325',
    vpName:'Mr. Bhikha Ram Tripathi', vpQual:'M.Sc B.Ed', vpPhone:'8318600231',
    directorName:'Sh. Awadhesh Narayan Agarwal', directorPhone:'9198783830',
  },
  contact: {
    phone1:'9198783830', phone2:'8318842325',
    email:'spvbrh@gmail.com', whatsapp:'9198783830',
    facebook:'', youtube:'', instagram:'', mapEmbed:'',
    admissionEmail:'admissions@spvs.edu',
  },
  admission: {
    open:true, session:'2026-27', classesFrom:'Nursery', classesTo:'Class XII',
    lastDate:'30 Apr 2026', fee:'500',
    notice:'Admissions are open for the academic session 2026-27. Limited seats available.',
    showBanner:true,
  },
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB')
  for (const [key, value] of Object.entries(DEFAULTS)) {
    await Settings.findOneAndUpdate({ key }, { value }, { upsert: true, returnDocument: 'after' })
    console.log('Seeded: ' + key)
  }
  console.log('✅ Settings seeded!')
  mongoose.disconnect()
}

seed().catch(function(err){ console.error(err); mongoose.disconnect() })