const express = require('express')
const dotenv  = require('dotenv')
const cors    = require('cors')
const path    = require('path')
const connectDB    = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

dotenv.config()
connectDB()

const app = express()   // ← THIS WAS MISSING

app.use(cors({
  origin: function (origin, callback) {
    // Allow any incoming origin (Hostinger domain, Vercel, localhost, etc.)
    callback(null, true)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/auth',                   require('./routes/authRoutes'))
app.use('/api/blogs',                  require('./routes/blogRoutes'))
app.use('/api/faculty',                require('./routes/facultyRoutes'))
app.use('/api/alumni',                 require('./routes/alumniRoutes'))
app.use('/api/gallery',                require('./routes/galleryRoutes'))
app.use('/api/announcements',          require('./routes/announcementRoutes'))
app.use('/api/academics',              require('./routes/academicsRoutes'))
app.use('/api/enquiries',              require('./routes/enquiryRoutes'))
app.use('/api/downloads',              require('./routes/downloadRoutes'))
app.use('/api/jobs',                   require('./routes/jobRoutes'))
app.use('/api/applications',           require('./routes/jobApplicationRoutes'))
app.use('/api/certificates',           require('./routes/certificateRoutes'))
app.use('/api/testimonials',           require('./routes/testimonialRoutes'))
app.use('/api/results',                require('./routes/resultRoutes'))
app.use('/api/tc',                     require('./routes/tcRoutes'))
app.use('/api/transport',              require('./routes/transportRoutes'))
app.use('/api/settings',               require('./routes/settingsRoutes'))
app.use('/api/site-status',            require('./routes/siteStatusRoutes'))
app.use('/api/mandatory-disclosure',   require('./routes/mandatoryDisclosureRoutes'))

// API Health Check
app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }))

// Serve React Frontend SPA for all non-API routes (Express 5 compatible)
app.use((req, res, next) => {
  if (req.method !== 'GET') return next()
  if (req.path.startsWith('/api')) return next()
  const indexPath = path.join(__dirname, 'public', 'index.html')
  const fs = require('fs')
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath)
  }
  res.json({ message: 'SPVS Backend Running ✅' })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))