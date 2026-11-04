/* global React */
// Line-style SVG icons, monochrome cream — used across Mission Control page

const stroke = "currentColor";
const sw = 1.5;
const baseSvg = (children, vb = "0 0 24 24") => (
  <svg viewBox={vb} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Icons = {
  Asymmetric: () => baseSvg(<>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="12" r="3"/>
    <path d="M9 10l6 4M9 14l6-4"/>
  </>),
  Voice: () => baseSvg(<>
    <rect x="9.5" y="3" width="5" height="11" rx="2.5"/>
    <path d="M6 11a6 6 0 0 0 12 0M12 18v3M9 21h6"/>
  </>),
  Clock: () => baseSvg(<>
    <circle cx="12" cy="13" r="8"/>
    <path d="M12 13V8M12 13l4 2M9 2h6"/>
  </>),
  Bolt: () => baseSvg(<>
    <path d="M13 2L4 14h7l-2 8 9-12h-7l2-8Z"/>
  </>),
  Panel: () => baseSvg(<>
    <rect x="3" y="4" width="18" height="16" rx="1"/>
    <path d="M3 9h18M7 14h2M11 14h2M15 14h2M7 17h10"/>
  </>),
  Missions: () => baseSvg(<>
    <circle cx="6" cy="6" r="2"/>
    <circle cx="18" cy="6" r="2"/>
    <circle cx="6" cy="18" r="2"/>
    <circle cx="18" cy="18" r="2"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M8 6h8M8 18h8M6 8v8M18 8v8"/>
  </>),
  Levels: () => baseSvg(<>
    <path d="M4 20V14M10 20V10M16 20V6M22 20V2"/>
  </>),
  Manual: () => baseSvg(<>
    <path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4V4Z"/>
    <path d="M20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8V4Z"/>
  </>),

  // Steps
  Power: () => baseSvg(<>
    <path d="M12 3v8"/>
    <path d="M8 6a7 7 0 1 0 8 0"/>
  </>),
  Book: () => baseSvg(<>
    <path d="M4 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H4V5Z"/>
    <path d="M20 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7V5Z"/>
  </>),
  Speech: () => baseSvg(<>
    <path d="M4 6h16v10H10l-4 4V6Z"/>
    <path d="M9 11h6M9 13.5h4"/>
  </>),
  Decode: () => baseSvg(<>
    <path d="M3 7h9l-3-3M21 7h-9M21 17h-9l3 3M3 17h9"/>
  </>),
  Repair: () => baseSvg(<>
    <path d="M14 4a4 4 0 1 0 5 5l-1.5 1.5L21 14l-1.5 1.5L17 13l-4 4L8 22l-3-3 5-5 4-4L11.5 7.5 14 4Z"/>
  </>),

  // Mission-specific badges
  LifeSupport: () => baseSvg(<>
    <circle cx="12" cy="12" r="8"/>
    <path d="M4 12h3l1.5-3 2 6 2-4 1.5 1H20"/>
  </>),
  Antenna: () => baseSvg(<>
    <path d="M12 4v14M8 8c2-2 6-2 8 0M6 6c3-3 9-3 12 0M9 10c1-1 5-1 6 0"/>
    <circle cx="12" cy="20" r="1"/>
  </>),
  Storm: () => baseSvg(<>
    <path d="M5 11a4 4 0 0 1 4-7 5 5 0 0 1 9 1 3 3 0 0 1 0 6H7"/>
    <path d="M11 14l-2 4h3l-2 4"/>
  </>),
  Nav: () => baseSvg(<>
    <circle cx="12" cy="12" r="8"/>
    <path d="M12 4v3M12 17v3M4 12h3M17 12h3M9 9l6 6M15 9l-6 6"/>
  </>),
  Cascade: () => baseSvg(<>
    <circle cx="6" cy="6" r="2"/>
    <circle cx="18" cy="6" r="2"/>
    <circle cx="6" cy="18" r="2"/>
    <circle cx="18" cy="18" r="2"/>
    <path d="M8 7l8 10M16 7L8 17M8 6h8M8 18h8"/>
  </>),
  Reentry: () => baseSvg(<>
    <path d="M20 4L4 20"/>
    <path d="M14 4h6v6"/>
    <path d="M4 20c4-1 8-3 11-5"/>
    <path d="M4 16c4 0 8-2 10-4"/>
  </>),

  // Navigation / utility
  Arrow: () => baseSvg(<>
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </>),
  Plus: () => baseSvg(<>
    <path d="M12 5v14M5 12h14"/>
  </>),
  Headset: () => baseSvg(<>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2"/>
    <rect x="3" y="13" width="4" height="6" rx="1"/>
    <rect x="17" y="13" width="4" height="6" rx="1"/>
    <path d="M17 19c0 1.5-1.5 3-5 3"/>
  </>),
  Speaker: () => baseSvg(<>
    <path d="M5 9v6h3l5 4V5L8 9H5Z"/>
    <path d="M16 8a4 4 0 0 1 0 8M19 5a8 8 0 0 1 0 14"/>
  </>),
  Eye: () => baseSvg(<>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/>
    <circle cx="12" cy="12" r="3"/>
  </>),
  Shield: () => baseSvg(<>
    <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3Z"/>
  </>),
  Spark: () => baseSvg(<>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>
  </>),
  Globe: () => baseSvg(<>
    <circle cx="12" cy="12" r="9"/>
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
  </>),
  Wave: () => baseSvg(<>
    <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>
  </>),
  Camera: () => baseSvg(<>
    <rect x="3" y="7" width="18" height="13" rx="2"/>
    <path d="M8 7l2-3h4l2 3"/>
    <circle cx="12" cy="13" r="3.5"/>
  </>),
  Grid: () => baseSvg(<>
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </>),
};

window.Icons = Icons;
