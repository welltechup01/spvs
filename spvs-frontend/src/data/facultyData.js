// Shared faculty data — used by AboutPage (Faculty & Staff section)
// and AcademicsPage (Teachers Qualification tab)

export var FACULTY_PGT = [
  { name:'Mrs. Puja Agarwal',      designation:'Principal',    subject:'Biology',           qualification:'M.A. B.Ed',   experience:'22+ yrs', phone:'8318842325' },
  { name:'Mr. B.R. Tripathi',       designation:'Vice Principal', subject:'Mathematics',     qualification:'M.Sc B.Ed',   experience:'20+ yrs', phone:'8318600231' },
  { name:'Mr. K.K. Srivastava',     designation:'P.G.T',        subject:'Mathematics',       qualification:'M.Sc LT',     experience:'15+ yrs' },
  { name:'Mr. Mohan Rai',           designation:'P.G.T',        subject:'Physical Education', qualification:'M.P.Ed',     experience:'14+ yrs' },
  { name:'Mr. Pradeep Kr. Dubey',   designation:'P.G.T',        subject:'Chemistry',         qualification:'M.Sc B.Ed',   experience:'13+ yrs' },
  { name:'Mr. Awadhesh Kr. Shukla', designation:'P.G.T',        subject:'Commerce',          qualification:'M.Com B.Ed',  experience:'12+ yrs' },
  { name:'Ms. Neena Chhabra',       designation:'P.G.T',        subject:'English',           qualification:'M.A. B.Ed',   experience:'16+ yrs' },
  { name:'Mr. Sayeed Danish',       designation:'P.G.T',        subject:'Economics',         qualification:'M.A. M.B.A',  experience:'11+ yrs' },
  { name:'Mr. Siraj Ali',           designation:'P.G.T',        subject:'English',           qualification:'M.A. B.Ed',   experience:'10+ yrs' },
  { name:'Mr. Amit Kr. Dubey',      designation:'P.G.T',        subject:'History',           qualification:'M.A. B.Ed',   experience:'9+ yrs'  },
  { name:'Mr. Ratandeep Ranjan',    designation:'P.G.T',        subject:'Physics',           qualification:'M.Sc B.Ed',   experience:'8+ yrs'  },
  { name:'Mr. Shubham Tiwari',      designation:'P.G.T',        subject:'Physics',           qualification:'M.Sc B.Ed',   experience:'7+ yrs'  },
  { name:'Mr. Shivam Verma',        designation:'P.G.T',        subject:'Computer Science',  qualification:'Inter, B.Tech', experience:'6+ yrs' },
  { name:'Mr. K.K. Tripathi',       designation:'P.G.T',        subject:'Political Science', qualification:'M.A. B.Ed',   experience:'10+ yrs' },
]

export var FACULTY_TGT = [
  { name:'Ms. Sangeeta Singh',         designation:'T.G.T', subject:'Hindi',             qualification:'M.A. B.Ed',    experience:'9+ yrs'  },
  { name:'Mr. Krishna Kr. Rai',        designation:'T.G.T', subject:'Mathematics',        qualification:'M.Sc M.Ed',    experience:'11+ yrs' },
  { name:'Mrs. Neelam Rai',            designation:'T.G.T', subject:'Hindi & Sanskrit',   qualification:'M.A. B.Ed',    experience:'10+ yrs' },
  { name:'Mr. K.P. Singh',             designation:'T.G.T', subject:'Science',            qualification:'M.Sc B.Ed',    experience:'8+ yrs'  },
  { name:'Mr. Santosh Singh',          designation:'T.G.T', subject:'Science',            qualification:'B.Sc B.Ed',    experience:'7+ yrs'  },
  { name:'Mr. Prem Narayan Awasthi',   designation:'T.G.T', subject:'Social Science',     qualification:'M.A. B.Ed',    experience:'12+ yrs' },
  { name:'Ms. Pragya Dubey',           designation:'T.G.T', subject:'English',            qualification:'M.A. B.Ed',    experience:'6+ yrs'  },
  { name:'Mr. Vivek Kalia',            designation:'T.G.T', subject:'Hindi & Sanskrit',   qualification:'M.A. B.Ed',    experience:'9+ yrs'  },
  { name:'Ms. Neha Pandey',            designation:'T.G.T', subject:'Social Science',     qualification:'M.A.',         experience:'5+ yrs'  },
  { name:'Mr. Manish Kr. Prajapati',   designation:'T.G.T', subject:'Mathematics',        qualification:'M.Sc B.Ed',    experience:'7+ yrs'  },
  { name:'Mr. Lavlesh Shukla',         designation:'T.G.T', subject:'Science (Bio)',      qualification:'B.Sc B.Ed',    experience:'6+ yrs'  },
  { name:'Mr. Ajeet Kumar Yadav',      designation:'T.G.T', subject:'Mathematics',        qualification:'B.Sc B.Ed',    experience:'5+ yrs'  },
  { name:'Ms. Shilpi Srivastava',      designation:'T.G.T', subject:'English',            qualification:'M.A. B.Ed',    experience:'8+ yrs'  },
  { name:'Mr. Shivram Vishwakarma',    designation:'T.G.T', subject:'Social Science',     qualification:'M.A. D.EL.Ed', experience:'6+ yrs'  },
  { name:'Mr. Raja Singh',             designation:'T.G.T', subject:'Social Science',     qualification:'M.A. B.Ed',    experience:'7+ yrs'  },
]

export var OFFICE_STAFF = [
  { name:'Mr. Santosh Kumar Srivastava', designation:'Office', subject:'Office Superintendent', qualification:'M.A., L.L.B',        experience:'18+ yrs' },
  { name:'Mr. Jitendra Gaur',            designation:'Office', subject:'U.D.C.',                qualification:'M.A., PGDCA, MCA',   experience:'12+ yrs' },
  { name:'Mr. Sachin Prajapati',         designation:'Office', subject:'L.D.C.',                qualification:'M.Com, B.Ed, CCC',   experience:'8+ yrs'  },
  { name:'Ms. Shilpa Malhotra',          designation:'Office', subject:'Receptionist',          qualification:'M.A., M.B.A',        experience:'5+ yrs'  },
  { name:'Mr. Varun Kumar Srivastava',   designation:'Office', subject:'Lab Assistant',         qualification:'B.Com, L.L.B',       experience:'6+ yrs'  },
  { name:'Mr. Ravikant Srivastava',      designation:'Office', subject:'Transport Incharge',    qualification:'M.A.',               experience:'10+ yrs' },
]

export var ALL_FACULTY = [...FACULTY_PGT, ...FACULTY_TGT, ...OFFICE_STAFF]