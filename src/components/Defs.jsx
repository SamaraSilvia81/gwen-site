/** Símbolo do G reaproveitado por <use href="#g" /> no site inteiro */
export default function Defs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <g id="g">
          <path d="M32 19 A13 13 0 0 0 32 45" fill="none" stroke="currentColor" strokeWidth="10" />
          <rect x="32" y="14" width="18" height="10" fill="currentColor" />
          <rect x="32" y="40" width="18" height="10" fill="currentColor" />
          <rect x="40" y="30" width="10" height="20" fill="currentColor" />
          <rect x="30" y="30" width="20" height="8" fill="currentColor" />
        </g>
      </defs>
    </svg>
  )
}
