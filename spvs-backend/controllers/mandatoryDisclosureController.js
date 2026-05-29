const MandatoryDisclosure = require('../models/MandatoryDisclosure')

const DEFAULT_DATA = {
  schoolInfo: [
    { key: 'Name of School',            value: 'Sant Pathik Vidyalaya' },
    { key: 'Affiliation No.',           value: '2130176' },
    { key: 'School No.',                value: '70178' },
    { key: 'UDISE Code',                value: '09500707504' },
    { key: 'Year of Establishment',     value: '1987' },
    { key: 'Principal Name',            value: 'Mrs. Puja Agarwal' },
    { key: 'Principal Qualification',   value: 'M.A. B.Ed' },
    { key: 'Email',                     value: 'spvbrh@gmail.com' },
    { key: 'Contact No.',               value: '+91 9198783830' },
    { key: 'Address',                   value: 'Pashupati Nagar, Bahraich, UP 271802' },
    { key: 'Area of School',            value: '10 Acres' },
    { key: 'Area of Playground',        value: '5 Acres' },
    { key: 'No. of Students',           value: '1410' },
    { key: 'No. of Teachers',           value: '73' },
    { key: 'No. of Non-Teaching Staff', value: '35' },
  ],
  infrastructure: [
    { key: 'No. of Classrooms',           value: '73' },
    { key: 'No. of Labs',                 value: '8' },
    { key: 'No. of Computer Lab Systems', value: '60' },
    { key: 'No. of Library Books',        value: '5000+' },
    { key: 'No. of School Buses',         value: '22' },
    { key: 'Toilet Blocks (Boys)',        value: '10' },
    { key: 'Toilet Blocks (Girls)',       value: '12' },
    { key: 'Drinking Water',              value: 'Yes — RO Purified' },
    { key: 'Fire Extinguishers',          value: 'Yes — All Floors' },
    { key: 'CCTV Cameras',               value: 'Yes — 40+ cameras' },
    { key: 'Ramp for Disabled',           value: 'Yes — All Buildings' },
  ],
  academic: [
    { key: 'Board',                      value: 'CBSE — Central Board of Secondary Education' },
    { key: 'Affiliation Valid Till',     value: '31 March 2029' },
    { key: 'Classes Offered',            value: 'Play Group to Class XII' },
    { key: 'Streams (XI-XII)',           value: 'Science, Commerce, Humanities' },
    { key: 'Medium of Instruction',      value: 'Hindi & English' },
    { key: 'Academic Session',           value: 'April to March' },
    { key: 'Result (Class X 2024-25)',   value: '100% — All students passed' },
    { key: 'Result (Class XII 2024-25)', value: '100% — All students passed' },
    { key: 'Fee Structure',              value: 'As per CBSE norms. Available at school office.' },
  ],
  staff: [
    { key: 'Total Teaching Staff',                     value: '64 (14 PGT + 20 TGT + 30 PRT)' },
    { key: 'Principal',                                value: 'Mrs. Puja Agarwal — M.A., B.Ed' },
    { key: 'Vice Principal',                           value: 'Mr. Bhikha Ram Tripathi — M.Sc., B.Ed' },
    { key: 'No. of Administrative Staff',              value: '8' },
    { key: 'No. of Non-Teaching Staff',                value: '12' },
    { key: 'Teacher–Student Ratio',                    value: '1 : 22 (Approx.)' },
    { key: 'Details of Special Educator',              value: 'Available at School Office' },
    { key: 'Details of Counsellor / Wellness Teacher', value: 'Available at School Office' },
  ],
  transport: [
    { key: 'Own Buses',                    value: '22 Buses covering all major routes' },
    { key: 'Buses Hired on Contract',      value: 'None' },
    { key: 'Details of Transport Charges', value: 'As per route — available at school office' },
    { key: 'GPS Tracking',                 value: 'Available in all school buses' },
  ],
}

// ── GET /api/mandatory-disclosure  (PUBLIC) ───────────────────────────────────
exports.getDisclosure = async (req, res) => {
  try {
    let doc = await MandatoryDisclosure.findOne()

    if (!doc) {
      // First time — create with all default data
      doc = await MandatoryDisclosure.create(DEFAULT_DATA)
    } else {
      // ✅ Patch missing fields if doc existed before staff/transport were added
      var changed = false

      if (!doc.staff || doc.staff.length === 0) {
        doc.staff = DEFAULT_DATA.staff
        changed = true
      }
      if (!doc.transport || doc.transport.length === 0) {
        doc.transport = DEFAULT_DATA.transport
        changed = true
      }
      if (!doc.schoolInfo || doc.schoolInfo.length === 0) {
        doc.schoolInfo = DEFAULT_DATA.schoolInfo
        changed = true
      }
      if (!doc.infrastructure || doc.infrastructure.length === 0) {
        doc.infrastructure = DEFAULT_DATA.infrastructure
        changed = true
      }
      if (!doc.academic || doc.academic.length === 0) {
        doc.academic = DEFAULT_DATA.academic
        changed = true
      }

      if (changed) await doc.save()
    }

    res.json({ success: true, data: doc })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ── PUT /api/mandatory-disclosure  (ADMIN) ────────────────────────────────────
exports.updateDisclosure = async (req, res) => {
  try {
    const { schoolInfo, infrastructure, academic, staff, transport } = req.body

    let doc = await MandatoryDisclosure.findOne()

    if (!doc) {
      doc = await MandatoryDisclosure.create({
        schoolInfo,
        infrastructure,
        academic,
        staff,
        transport,
      })
    } else {
      if (schoolInfo)     doc.schoolInfo     = schoolInfo
      if (infrastructure) doc.infrastructure = infrastructure
      if (academic)       doc.academic       = academic
      if (staff)          doc.staff          = staff
      if (transport)      doc.transport      = transport
      await doc.save()
    }

    res.json({ success: true, message: 'Updated successfully', data: doc })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}