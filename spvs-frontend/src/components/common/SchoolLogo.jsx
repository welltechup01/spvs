export default function SchoolLogo({ size = 58 }) {
  return (
    <img
      src="/logo/school.PNG"
      alt="Sant Pathik Vidyalaya Logo"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}