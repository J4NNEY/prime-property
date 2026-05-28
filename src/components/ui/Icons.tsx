// Premium line-art icons - sophisticated alternative to emojis

export const IconPremium = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/>
  </svg>
);

export const IconShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/>
  </svg>
);

export const IconChart = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 14l3-3 3 3 5-5"/>
    <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
    <circle cx="10" cy="11" r="1.5" fill="currentColor"/>
    <circle cx="13" cy="14" r="1.5" fill="currentColor"/>
    <circle cx="18" cy="9" r="1.5" fill="currentColor"/>
  </svg>
);

export const IconHandshake = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v8m0 0l-3-3m3 3l3-3"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l2 4h6l2-4h4"/>
    <circle cx="12" cy="18" r="3"/>
  </svg>
);

export const IconBriefcase = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <rect x="3" y="7" width="18" height="13" rx="2"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18"/>
  </svg>
);

export const IconEye = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export const IconLightning = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
  </svg>
);

export const IconStar = ({ className = "w-6 h-6", filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/>
  </svg>
);

export const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <rect x="4" y="3" width="16" height="18" rx="1"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V14h6v7M8 7h2M14 7h2M8 11h2M14 11h2"/>
  </svg>
);

export const IconHome = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z"/>
  </svg>
);

export const IconLocation = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z"/>
    <circle cx="12" cy="9" r="3"/>
  </svg>
);

export const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6"/>
  </svg>
);

export const IconKey = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <circle cx="8" cy="15" r="4"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 12l9-9m-3 3l3 3m-6 0l3 3"/>
  </svg>
);

export const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);

export const IconQuote = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 21v-7c0-5.5 3.5-9.5 9-10.5l1 2c-2.5 1-4 3.5-4 6h4v10h-10zm-14 0v-7c0-5.5 3.5-9.5 9-10.5l1 2c-2.5 1-4 3.5-4 6h4v10H0z"/>
  </svg>
);
