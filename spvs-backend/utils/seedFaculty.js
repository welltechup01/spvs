// spvs-backend/utils/seedFaculty.js
// Run: node utils/seedFaculty.js
// This seeds all existing faculty into MongoDB

require('dotenv').config()
const mongoose = require('mongoose')
const Faculty  = require('../models/Faculty')

const FACULTY = [
  { name:'Sh. Awadhesh Narayan Agarwal', role:'Director',       dept:'Administration',    qual:'School Management', exp:'',       phone:'+91 9198783830', email:'', status:'Active', order:1 },
  { name:'Mrs. Puja Agarwal',           role:'Principal',      dept:'Administration',    qual:'M.A., B.Ed',        exp:'22 yrs', phone:'+91 8318842325', email:'', status:'Active', order:2 },
  { name:'Mr. Bhikha Ram Tripathi',      role:'Vice Principal', dept:'Science',           qual:'M.Sc., B.Ed',       exp:'18 yrs', phone:'+91 8318600231', email:'', status:'Active', order:3 },
  { name:'Mrs. Neena Chhabra',           role:'PRT',            dept:'English',           qual:'M.A., B.Ed',        exp:'',       phone:'+91 7007884235', email:'', status:'Active', order:4 },
  { name:'Mr. K.K. Srivastava',          role:'PGT',            dept:'Mathematics',       qual:'M.Sc., LT',         exp:'',       phone:'', email:'', status:'Active', order:5 },
  { name:'Mr. Pradeep Kr. Dubey',        role:'PGT',            dept:'Science',           qual:'M.Sc., B.Ed',       exp:'',       phone:'', email:'', status:'Active', order:6 },
  { name:'Mr. Awadhesh Kr. Shukla',      role:'PGT',            dept:'Commerce',          qual:'M.Com., B.Ed',      exp:'',       phone:'', email:'', status:'Active', order:7 },
  { name:'Mr. Sayeed Danish',            role:'PGT',            dept:'Commerce',          qual:'M.A., M.B.A',       exp:'',       phone:'', email:'', status:'Active', order:8 },
  { name:'Mr. Siraj Ali',                role:'PGT',            dept:'English',           qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:9 },
  { name:'Mr. Amit Kr. Dubey',           role:'PGT',            dept:'Social Science',    qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:10 },
  { name:'Mr. Ratandeep Ranjan',         role:'PGT',            dept:'Science',           qual:'M.Sc., B.Ed',       exp:'',       phone:'', email:'', status:'Active', order:11 },
  { name:'Mr. Shubham Tiwari',           role:'PGT',            dept:'Science',           qual:'M.Sc., B.Ed',       exp:'',       phone:'', email:'', status:'Active', order:12 },
  { name:'Mr. Shivam Verma',             role:'PGT',            dept:'Computer Science',  qual:'B.Tech',            exp:'',       phone:'', email:'', status:'Active', order:13 },
  { name:'Mr. K.K. Tripathi',            role:'PGT',            dept:'Social Science',    qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:14 },
  { name:'Ms. Sangeeta Singh',           role:'PGT',            dept:'Hindi',             qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:15 },
  { name:'Mr. Mohan Rai',                role:'PGT',            dept:'Physical Education',qual:'M.P.Ed',            exp:'',       phone:'', email:'', status:'Active', order:16 },
  { name:'Mr. Krishna Kr. Rai',          role:'TGT',            dept:'Mathematics',       qual:'M.Sc., M.Ed',       exp:'',       phone:'', email:'', status:'Active', order:17 },
  { name:'Mrs. Neelam Rai',              role:'TGT',            dept:'Hindi',             qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:18 },
  { name:'Mr. K.P. Singh',               role:'TGT',            dept:'Science',           qual:'M.Sc., B.Ed',       exp:'',       phone:'', email:'', status:'Active', order:19 },
  { name:'Mr. Santosh Singh',            role:'TGT',            dept:'Science',           qual:'B.Sc., B.Ed',       exp:'',       phone:'', email:'', status:'Active', order:20 },
  { name:'Mr. Prem N. Awasthi',          role:'TGT',            dept:'Social Science',    qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:21 },
  { name:'Ms. Pragya Dubey',             role:'TGT',            dept:'English',           qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:22 },
  { name:'Mr. Vivek Kalia',              role:'TGT',            dept:'Hindi',             qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:23 },
  { name:'Ms. Neha Pandey',              role:'TGT',            dept:'Social Science',    qual:'M.A.',              exp:'',       phone:'', email:'', status:'Active', order:24 },
  { name:'Mr. Manish Kr. Prajapati',     role:'TGT',            dept:'Mathematics',       qual:'M.Sc., B.Ed',       exp:'',       phone:'', email:'', status:'Active', order:25 },
  { name:'Mr. Lavlesh Shukla',           role:'TGT',            dept:'Science',           qual:'B.Sc., B.Ed',       exp:'',       phone:'', email:'', status:'Active', order:26 },
  { name:'Mr. Ajeet Kumar Yadav',        role:'TGT',            dept:'Mathematics',       qual:'B.Sc., B.Ed',       exp:'',       phone:'', email:'', status:'Active', order:27 },
  { name:'Ms. Shilpi Srivastava',        role:'TGT',            dept:'English',           qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:28 },
  { name:'Mr. Shivram Vishwakarma',      role:'TGT',            dept:'Social Science',    qual:'M.A., D.EL.Ed',     exp:'',       phone:'', email:'', status:'Active', order:29 },
  { name:'Mr. Raja Singh',               role:'TGT',            dept:'Social Science',    qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:30 },
  { name:'Mr. Jitendra Verma',           role:'TGT',            dept:'English',           qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:31 },
  { name:'Mr. Saif Abbas',               role:'TGT',            dept:'Science',           qual:'B.Sc., B.Ed',       exp:'',       phone:'', email:'', status:'Active', order:32 },
  { name:'Mr. G.B. Verma',               role:'TGT',            dept:'Computer Science',  qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:33 },
  { name:'Ms. Dhaneshwari Sahani',       role:'TGT',            dept:'Hindi',             qual:'M.A., B.Ed',        exp:'',       phone:'', email:'', status:'Active', order:34 },
  { name:'Ms. Amita Agarwal',            role:'TGT',            dept:'Arts',              qual:'M.A. Bombay Art',   exp:'',       phone:'', email:'', status:'Active', order:35 },
  { name:'Mr. D.D. Srivastava',          role:'TGT',            dept:'Arts',              qual:'B.A., B.Mus',       exp:'',       phone:'', email:'', status:'Active', order:36 },
  { name:'Mr. Arvind Pandey',            role:'TGT',            dept:'Physical Education',qual:'M.A., B.PEd',       exp:'',       phone:'', email:'', status:'Active', order:37 },
  { name:'Ms. Priyanka Singh',           role:'TGT',            dept:'Physical Education',qual:'B.A., B.PEd',       exp:'',       phone:'', email:'', status:'Active', order:38 },
  { name:'Mr. Akhilesh Kr. Mishra',      role:'Librarian',      dept:'Administration',    qual:'B.Com., B.Lib',     exp:'',       phone:'', email:'', status:'Active', order:39 },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB')

  // Clear existing faculty
  await Faculty.deleteMany({})
  console.log('Cleared existing faculty')

  // Insert all
  await Faculty.insertMany(FACULTY)
  console.log('✅ Seeded ' + FACULTY.length + ' faculty members!')

  mongoose.disconnect()
}

seed().catch(function(err){ console.error(err); mongoose.disconnect() })