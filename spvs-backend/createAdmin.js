const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

async function createAdmin() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB')

  const db = mongoose.connection.db
  const admins = db.collection('admins')

  // Delete old admin if exists
  await admins.deleteMany({ username: 'spvs_admin' })

  // Hash password
  const salt     = await bcrypt.genSalt(10)
  const password = await bcrypt.hash('Admin@SPVS2026', salt)

  // Create new admin
  await admins.insertOne({
    username:  'spvs_admin',
    password:  password,
    role:      'superadmin',
    createdAt: new Date()
  })

  console.log('✅ Admin created successfully!')
  console.log('Username: spvs_admin')
  console.log('Password: Admin@SPVS2026')
  process.exit(0)
}

createAdmin().catch(function(err) {
  console.error('❌ Error:', err)
  process.exit(1)
})