import React from 'react';

interface SafeSpaceLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  subtitle?: string;
  className?: string;
}

export const SafeSpaceLogo: React.FC<SafeSpaceLogoProps> = ({
  size = 'md',
  showText = true,
  subtitle,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Home Renovation + Assurance Symbol */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        {/* Background Shield/Hexagon Badge */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-xl shadow-md shadow-teal-500/15 flex items-center justify-center p-0.5">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
            {/* Custom SVG combining House roof structure (Renovation) + Shield & Check (Assured) */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3/4 h-3/4"
            >
              {/* Outer Protective Shield Outline */}
              <path
                d="M16 3L5 7V14C5 21.2 9.8 27.8 16 30C22.2 27.8 27 21.2 27 14V7L16 3Z"
                fill="url(#shield-grad)"
                fillOpacity="0.12"
                stroke="url(#shield-stroke)"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Renovation House Apex Line / Gable Roof */}
              <path
                d="M10 16.5L16 11.5L22 16.5"
                stroke="#0f766e"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* House Foundation / Wall framing */}
              <path
                d="M12 16.5V22.5C12 23.05 12.45 23.5 13 23.5H19C19.55 23.5 20 23.05 20 22.5V16.5"
                stroke="#0f766e"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Assurance Checkmark Badge */}
              <path
                d="M13.5 19.5L15.5 21.5L19 17"
                stroke="#059669"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <defs>
                <linearGradient id="shield-grad" x1="5" y1="3" x2="27" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id="shield-stroke" x1="5" y1="3" x2="27" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#059669" />
                  <stop offset="1" stopColor="#0d9488" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Small Verified Sparkle / Check Accent */}
        <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm border border-white">
          <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Brand Name Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-extrabold tracking-tight text-slate-900 ${textSizes[size]}`}>
              SAFE<span className="text-teal-600">SPACE</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80">
              Assured
            </span>
          </div>
          {subtitle ? (
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">{subtitle}</p>
          ) : (
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 hidden sm:block">
              Singapore Home Renovation Trust & Directory
            </p>
          )}
        </div>
      )}
    </div>
  );
};
