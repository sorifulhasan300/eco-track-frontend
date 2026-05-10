interface EcoTrackLogoProps {
  className?: string;
  size?: number;
}

export default function EcoTrackLogo({ className = "", size = 32 }: EcoTrackLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="EcoTrack logo"
    >
      {/* Outer rounded square */}
      <rect width="32" height="32" rx="7" fill="url(#logoGrad)" />
      {/* Leaf shape */}
      <path
        d="M16 6C12 6 9 9 9 14c0 4 3 8 7 12 4-4 7-8 7-12 0-5-3-8-7-8z"
        fill="white"
        fillOpacity="0.15"
      />
      <path
        d="M16 6c-2.5 0-4.5 1.5-5.5 4C11 8.5 13.5 8 16 8s5 0.5 5.5 2C20.5 7.5 18.5 6 16 6z"
        fill="white"
        fillOpacity="0.25"
      />
      {/* Circuit / track lines */}
      <path
        d="M16 10v8M12 14h8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      {/* Nodes */}
      <circle cx="16" cy="10" r="1.5" fill="white" />
      <circle cx="16" cy="18" r="1.5" fill="white" />
      <circle cx="12" cy="14" r="1.5" fill="white" />
      <circle cx="20" cy="14" r="1.5" fill="white" />
      {/* Gradient */}
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
}
