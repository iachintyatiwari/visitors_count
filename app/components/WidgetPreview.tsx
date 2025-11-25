
import React from 'react';
import { WidgetStyle } from '@/types';

interface WidgetPreviewProps {
  styleConfig: WidgetStyle;
  count?: number;
}

export const WidgetPreview: React.FC<WidgetPreviewProps> = ({ styleConfig, count = 1234 }) => {
  // We inject the raw CSS into a style tag scoped to this specific instance's rendering context conceptually.
  
  let formattedCount = new Intl.NumberFormat('en-US').format(count);
  let IconComponent = null;

  // Custom logic based on style ID
  if (styleConfig.id === 'retro') {
      // Style 3: Retro - Use Green Dot (Explicit Hex #22c55e)
      formattedCount = count.toString().padStart(6, '0');
      IconComponent = <circle cx="12" cy="12" r="5" fill="#22c55e" />; 
      
  } else if (styleConfig.id === 'cyber') {
      // Style 4: Cyber
      IconComponent = <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />; // Zap

  } else if (styleConfig.id === 'bubble-1') {
      // Style 1: Bubble-1 - Orange Dot
      IconComponent = <circle cx="12" cy="12" r="10" />;

  } else {
      // Style 2: Bubble-2 - Crisp Eye Icon
      IconComponent = (
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleConfig.cssContent }} />
      <div className={styleConfig.className}>
        <span className="oc-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                {IconComponent}
            </svg>
        </span>
        <div className="oc-content flex flex-col items-start leading-none ml-0.5" style={{ alignItems: styleConfig.id === 'bubble-1' ? 'center' : 'flex-start', marginLeft: styleConfig.id === 'bubble-1' ? '0' : '0.125rem' }}>
            <span className="count">{formattedCount}</span>
            <span className="text-[0.55em] opacity-70 uppercase tracking-wider font-medium mt-0.5">Visitors</span>
        </div>
      </div>
    </>
  );
};