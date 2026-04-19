const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function authHeader() {
  var token = localStorage.getItem('spvs_token')
  return token ? { Authorization: 'Bearer ' + token } : {}
}

async function req(method, path, body, isFormData) {
  var headers = { ...authHeader() }
  if (!isFormData) headers['Content-Type'] = 'application/json'
  var res = await fetch(BASE + path, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  })
  var data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

// ── AUTH ──────────────────────────────────────
export var authAPI = {
  login:          (body) => req('POST', '/auth/login', body),
  changePassword: (body) => req('POST', '/auth/change-password', body),
  logout: () => {
    localStorage.removeItem('spvs_token')
    localStorage.removeItem('spvs_admin')
  },
}

// ── BLOG ──────────────────────────────────────
export var blogAPI = {
  getAll:  () =>          req('GET',    '/blogs'),
  getById: (id) =>        req('GET',    '/blogs/' + id),
  create:  (fd) =>        req('POST',   '/blogs', fd, true),
  update:  (id, fd) =>    req('PUT',    '/blogs/' + id, fd, true),
  delete:  (id) =>        req('DELETE', '/blogs/' + id),
}

// ── GALLERY ───────────────────────────────────
export var galleryAPI = {
  getAll:  () =>          req('GET',    '/gallery'),
  create:  (fd) =>        req('POST',   '/gallery', fd, true),
  delete:  (id) =>        req('DELETE', '/gallery/' + id),
}

// ── FACULTY ───────────────────────────────────
export var facultyAPI = {
  getAll:  () =>          req('GET',    '/faculty'),
  create:  (fd) =>        req('POST',   '/faculty', fd, true),
  update:  (id, fd) =>    req('PUT',    '/faculty/' + id, fd, true),
  delete:  (id) =>        req('DELETE', '/faculty/' + id),
}

// ── ALUMNI ────────────────────────────────────
export var alumniAPI = {
  getAll:         () =>       req('GET',    '/alumni'),
  create:         (fd) =>     req('POST',   '/alumni', fd, true),
  update:         (id, fd) => req('PUT',    '/alumni/' + id, fd, true),
  delete:         (id) =>     req('DELETE', '/alumni/' + id),
  toggleFeatured: (id) =>     req('PATCH',  '/alumni/' + id + '/feature'),
}

// ── ANNOUNCEMENTS ─────────────────────────────
export var announcementAPI = {
  getAll:  () =>            req('GET',    '/announcements'),
  create:  (body) =>        req('POST',   '/announcements', body),
  update:  (id, body) =>    req('PUT',    '/announcements/' + id, body),
  delete:  (id) =>          req('DELETE', '/announcements/' + id),
}

// ── ENQUIRY / CONTACT ─────────────────────────
export var enquiryAPI = {
  submit:   (body) =>   req('POST',   '/enquiries', body),
  getAll:   () =>       req('GET',    '/enquiries'),
  markRead: (id) =>     req('PATCH',  '/enquiries/' + id + '/read'),
  delete:   (id) =>     req('DELETE', '/enquiries/' + id),
}

// ── JOBS ──────────────────────────────────────
export var jobAPI = {
  getAll:  () =>            req('GET',    '/jobs'),
  getById: (id) =>          req('GET',    '/jobs/' + id),
  create:  (body) =>        req('POST',   '/jobs', body),
  update:  (id, body) =>    req('PUT',    '/jobs/' + id, body),
  delete:  (id) =>          req('DELETE', '/jobs/' + id),
}

// ── JOB APPLICATIONS ──────────────────────────
export var jobAppAPI = {
  apply:        (fd) =>       req('POST',  '/applications', fd, true),
  getAll:       () =>         req('GET',   '/applications'),
  updateStatus: (id, body) => req('PATCH', '/applications/' + id, body),
}

// ── CERTIFICATES ──────────────────────────────
export var certificateAPI = {
  submit:       (body) =>     req('POST',  '/certificates', body),
  getAll:       () =>         req('GET',   '/certificates'),
  updateStatus: (id, body) => req('PATCH', '/certificates/' + id + '/status', body),
}

// ── DOWNLOADS ─────────────────────────────────
export var downloadAPI = {
  getAll:  () =>      req('GET',    '/downloads'),
  create:  (fd) =>    req('POST',   '/downloads', fd, true),
  delete:  (id) =>    req('DELETE', '/downloads/' + id),
}

// ── RESULTS ───────────────────────────────────
export var resultAPI = {
  getAll:  () =>            req('GET',    '/results'),
  getById: (id) =>          req('GET',    '/results/' + id),
  create:  (body) =>        req('POST',   '/results', body),
  update:  (id, body) =>    req('PUT',    '/results/' + id, body),
  delete:  (id) =>          req('DELETE', '/results/' + id),
  verify:  (body) =>        req('POST',   '/results/verify', body),
}

// ── TC (TRANSFER CERTIFICATE) ─────────────────
export var tcAPI = {
  getAll:  () =>            req('GET',    '/tc'),
  getById: (id) =>          req('GET',    '/tc/' + id),
  create:  (fd) =>          req('POST',   '/tc', fd, true),       // FormData (PDF upload)
  update:  (id, fd) =>      req('PUT',    '/tc/' + id, fd, true), // FormData (PDF upload)
  delete:  (id) =>          req('DELETE', '/tc/' + id),
  verify:  (body) =>        req('POST',   '/tc/verify', body),
}
 

// ── TESTIMONIALS ──────────────────────────────
export var testimonialAPI = {
  getAll:   () =>           req('GET',    '/testimonials'),
  create:   (body) =>       req('POST',   '/testimonials', body),
  update:   (id, body) =>   req('PUT',    '/testimonials/' + id, body),
  approve:  (id) =>         req('PATCH',  '/testimonials/' + id + '/approve'),
  delete:   (id) =>         req('DELETE', '/testimonials/' + id),
}

// ── TRANSPORT ─────────────────────────────────
export var transportAPI = {
  getAll:  () =>            req('GET',    '/transport'),
  create:  (body) =>        req('POST',   '/transport', body),
  update:  (id, body) =>    req('PUT',    '/transport/' + id, body),
  delete:  (id) =>          req('DELETE', '/transport/' + id),
}

// ── ACADEMICS ─────────────────────────────────────────────────────────────────
export var academicsAPI = {
  get:             () =>            req('GET',    '/academics'),
  update:          (body) =>        req('PUT',    '/academics', body),
  uploadSyllabus:  (fd) =>          req('POST',   '/academics/upload-syllabus', fd, true),
  deleteSyllabus:  (level) =>       req('DELETE', '/academics/syllabus/' + encodeURIComponent(level)),
}

// ── SETTINGS ──────────────────────────────────
export var settingsAPI = {
  getAll:  () =>            req('GET', '/settings'),
  get:     (key) =>         req('GET', '/settings/' + key),
  save:    (body) =>        req('PUT', '/settings', body),
  saveKey: (key, value) =>  req('PUT', '/settings/' + key, { value }),
}

// ── SITE STATUS ───────────────────────────────
export var siteStatusAPI = {
  getAll:     () =>         req('GET',   '/site-status'),
  updatePage: (id, body) => req('PATCH', '/site-status/' + id, body),
  updateAll:  (body) =>     req('PATCH', '/site-status', body),
}

// ── MANDATORY DISCLOSURE ──────────────────────
export var mandatoryAPI = {
  get:    () =>       req('GET', '/mandatory-disclosure'),
  update: (body) =>   req('PUT', '/mandatory-disclosure', body),
}

