"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Copy, ShieldCheck, Zap, Check, X, Minus, Maximize2, Lock, RotateCw, ChevronRight } from 'lucide-react';



export default function Hero(){




    const onCtaClick = () => {

        const section = document.getElementById('how-it-works');
        section?.scrollIntoView({ behavior: 'smooth' });
        
     }

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  
  // Address bar state
  const [domain, setDomain] = useState('your-portfolio.com');
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [isLoadingIframe, setIsLoadingIframe] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20, // -10 to 10
        y: (e.clientY / window.innerHeight - 0.5) * 20, // -10 to 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCopy = () => {
    // Disabled
  };

  // Handle URL loading
  const loadUrl = () => {
      if (!domain) return;
      setIsLoadingIframe(true);
      // Construct URL - prevent double protocol
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
      const targetUrl = `https://${cleanDomain}`;
      
      // Use Microlink API for screenshot
      const screenshotUrl = `https://api.microlink.io/?url=${targetUrl}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=955 `;
      setActiveUrl(screenshotUrl);

      // Failsafe: remove loader after 8s if image hangs
      setTimeout(() => setIsLoadingIframe(false), 8000);
  };

  const handleDomainKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        loadUrl();
    }
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Strip protocol if user pastes full URL
      const val = e.target.value.replace(/^https?:\/\//, '');
      setDomain(val);
  };

  const handleImageLoad = () => {
    setIsLoadingIframe(false);
  };

  const handleReload = () => {
      if (activeUrl) {
          setIsLoadingIframe(true);
          const currentUrl = activeUrl;
          setActiveUrl(null); 
          // Brief timeout to force React to re-render the img tag
          setTimeout(() => setActiveUrl(currentUrl), 50);
      }
  };

  // Reusable Widget Component for consistent look
  const DemoWidget = () => (
    <div className="relative z-30 transition-transform duration-300 hover:scale-110 origin-top-right">
        <div className="relative group cursor-pointer">
            {/* Solid orange color blur */}
            <div className="absolute -inset-0.5 bg-orange-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
            {/* Reduced size widget */}
            <div className="relative flex flex-col items-center justify-center gap-0.5 bg-zinc-900 text-white px-2.5 py-1 rounded-lg border border-zinc-700 shadow-lg min-w-[60px]">
                {/* Ping Dot Absolute */}
                <span className="absolute top-1 right-1 flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-orange-500"></span>
                </span>
                
                {/* Count Centered */}
                <span className="font-bold text-base tabular-nums leading-none tracking-tight">824</span>
                {/* Text Below */}
                <span className="text-[7px] text-gray-500 uppercase tracking-widest font-semibold">Visitors</span>
            </div>
        </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden pt-40 pb-20 lg:pt-48 lg:pb-32 transition-colors duration-300">
      
      {/* Technical Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,rgba(255,255,255,0.5),transparent)]"></div>
        
        {/* Dark Mode: Subtle Technical Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-dark-900/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl text-left relative z-10">
            
            {/* Version Tag - Animated Entrance */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-800 border border-dark-700 text-gray-300 text-xs font-medium mb-8 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              v1.0 is now available
            </div>

            {/* Headline - Space Grotesk - Staggered Entrance */}
            <h1 className="font-display text-5xl sm:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1] animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0">
              Privacy-first <br/>
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-500">
                    Visitor Analytics
                </span>
                {/* Underline decoration */}
                {/* <div className="absolute bottom-2 left-0 w-full h-3 bg-orange-500/20 -z-10 skew-x-12 rounded-sm origin-left scale-x-0 animate-[growX_1s_ease-out_1s_forwards]"></div> */}
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] opacity-0">
              A lightweight, open-source widget that respects user privacy. No cookies, no complex dashboards. Just the numbers you need.
            </p>

            {/* CTA Area */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-14 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] opacity-0">
              {/* Shimmer Button */}
              <button 
                onClick={onCtaClick}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold bg-white text-gray-900 rounded-lg overflow-hidden transition-transform active:scale-95"
              >
                {/* Shimmer Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                
                <span className="relative z-10">Create Widget</span>
                <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1 text-orange-600" />
              </button>
              
              {/* Interactive NPM Copy Box */}
              <div className="relative group">
                {/* Coming Soon Badge */}
                <div className="absolute -top-2.5 -right-2 z-20 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-orange-400 transform rotate-6">
                    Coming Soon
                </div>
                <button 
                  disabled
                  className="relative flex items-center gap-3 px-6 py-3.5 bg-dark-800 rounded-lg border border-dark-700 shadow-sm w-full sm:w-auto cursor-not-allowed opacity-60 grayscale"
                >
                    <span className="text-gray-400 select-none">$</span>
                    <code className="text-sm font-mono text-gray-200">npm install opencount</code>
                    <div className="ml-2 text-gray-400 transition-colors">
                        <Copy size={14} />
                    </div>
                </button>
              </div>
            </div>

            {/* Social Proof / Features */}
            <div className="flex items-center gap-8 text-sm font-medium text-gray-400 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] opacity-0">
                <div className="flex items-center gap-2 group cursor-default">
                    <ShieldCheck size={18} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-white transition-colors">GDPR Compliant</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-dark-700"></div>
                <div className="flex items-center gap-2 group cursor-default">
                    <Zap size={18} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-white transition-colors">&lt; 2kb Size</span>
                </div>
            </div>
          </div>

          {/* Right Visual - Interactive Parallax */}
          <div 
            className="relative hidden lg:block mt-8 perspective-1000 h-full min-h-[380px] animate-[fadeInUp_1s_ease-out_0.4s_forwards] opacity-0"
            style={{ perspective: '1000px' }}
          >
            
            {/* HEADER ANNOTATION - Enter website link */}
             <div className="absolute -top-8 left-4 z-40 pointer-events-none transition-transform duration-100"
                 style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}>
                <div className="relative flex flex-col items-start">
                    <span className="font-handwriting text-xl text-gray-400 -rotate-3 mb-0">
                        Enter your website link
                    </span>
                    <svg className="w-28 h-20 text-gray-500 transform rotate-3" viewBox="0 0 100 60" fill="none">
                        {/* Curve pointing from top-left (under text) to lock icon on the right */}
                        <path d="M 20 0 Q 50 8 85 35" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-input)"/>
                        <defs>
                            <marker id="arrowhead-input" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                            </marker>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* WIDGET ANNOTATION - OUTSIDE THE MOCKUP */}
            <div className="absolute top-20 -right-24 z-40 pointer-events-none xl:-right-2 transition-transform duration-100"
                 style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}>
                <div className="relative flex flex-col items-center">
                    <span className="font-handwriting text-xl text-gray-400 -rotate-6 mb-0 w-max translate-x-16">
                        Add to your header!
                    </span>
                    <svg className="w-28 h-28 text-gray-500 transform -translate-y-2 translate-x-[12px]" viewBox="0 0 100 100" fill="none">
                        {/* Arrow starts at top right (95, 25) near text, curves down and left to point at widget (around 15, 20) */}
                        <path d="M 95 25 Q 55 50 15 20" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-hero)"/>
                        <defs>
                            <marker id="arrowhead-hero" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                            </marker>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Main Browser Window - Parallax Tilt */}
            <div 
                className="relative z-20 bg-dark-900 rounded-xl shadow-2xl border border-dark-700 mt-4 transition-transform duration-100 ease-out flex flex-col max-w-lg"
                style={{ 
                    transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${mousePos.y * -0.5}deg)`
                }}
            >
                {/* Browser Toolbar */}
                <div className="bg-dark-800 px-3 py-2 border-b border-dark-700 flex items-center gap-3 rounded-t-xl relative z-20">
                    {/* Window Controls with Symbols */}
                    <div className="flex gap-2 group/window">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] flex items-center justify-center overflow-hidden cursor-default shadow-inner">
                            <X size={8} className="text-black/60 opacity-0 group-hover/window:opacity-100 transition-opacity" strokeWidth={3} />
                        </div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] flex items-center justify-center overflow-hidden cursor-default shadow-inner">
                             <Minus size={8} className="text-black/60 opacity-0 group-hover/window:opacity-100 transition-opacity" strokeWidth={3} />
                        </div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] flex items-center justify-center overflow-hidden cursor-default shadow-inner">
                             <Maximize2 size={6} className="text-black/60 opacity-0 group-hover/window:opacity-100 transition-opacity" strokeWidth={3} />
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center text-gray-500 gap-2">
                         <button onClick={handleReload} className="hover:text-white transition-colors" title="Reload"><RotateCw size={14} /></button>
                    </div>

                    {/* Editable Address Bar */}
                    <div className="flex-1 bg-dark-950 h-7 rounded-md border border-dark-700 flex items-center px-2.5 transition-colors hover:border-dark-600 focus-within:border-orange-500/30 focus-within:ring-1 focus-within:ring-orange-500/20 group/input">
                        <Lock size={10} className="text-green-500 mr-2 flex-shrink-0 transition-colors" />
                        
                        {/* Fixed Protocol */}
                        <span className="text-[10px] font-mono text-gray-500 select-none">https://</span>
                        
                        {/* Editable Domain */}
                        <input 
                            type="text" 
                            value={domain}
                            onChange={handleDomainChange}
                            onKeyDown={handleDomainKeyDown}
                            className="flex-1 bg-transparent text-[10px] text-gray-300 font-mono outline-none placeholder-gray-700 w-full ml-0.5"
                            spellCheck={false}
                            placeholder="your-website.com"
                        />
                        
                        {/* Go Button */}
                        <button 
                            onClick={loadUrl}
                            className="ml-1.5 text-gray-500 hover:text-orange-500 transition-colors"
                            title="Load Website"
                        >
                            <ChevronRight size={12} />
                        </button>
                    </div>
                </div>
                
                {/* Content Area */}
                <div className="relative bg-dark-900 min-h-[380px] rounded-b-xl overflow-hidden">
                    {/* Fake Loading Bar */}
                    {isLoadingIframe && (
                        <div className="absolute top-0 left-0 w-full h-0.5 z-50">
                            <div className="h-full bg-orange-500 animate-[shimmer_1s_infinite]"></div>
                        </div>
                    )}

                    {activeUrl ? (
                         // Live Website Mode
                         <div className="w-full h-full min-h-[380px] relative bg-white">
                             {isLoadingIframe && (
                                 <div className="absolute inset-0 flex items-center justify-center bg-dark-900 z-40">
                                     <span className="text-gray-500 text-xs animate-pulse font-mono">Loading your website...</span>
                                 </div>
                             )}
                             
                             <img 
                                src={activeUrl} 
                                alt={`Preview of ${domain}`}
                                className="w-full h-full object-contain" 
                                onLoad={handleImageLoad}
                             />

                             {/* Overlay Widget on top of image */}
                             <div className="absolute top-6 right-3 z-50">
                                 <DemoWidget />
                             </div>
                         </div>
                    ) : (
                        // Mock Layout Mode
                        <div className="p-4 relative h-full">
                             {/* Website Mock Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-24 h-6 bg-dark-700 rounded-md opacity-50 mt-2"></div>
                                
                                {/* THE WIDGET - Inside the mock layout */}
                                <div className="mt-1">
                                    <DemoWidget />
                                </div>
                            </div>
                            
                            {/* Rest of Mock Body */}
                            <div className="space-y-3 mb-8 opacity-60">
                                <div className="w-2/3 h-10 bg-dark-800 rounded-lg animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="w-full h-3 bg-dark-800/50 rounded"></div>
                                    <div className="w-5/6 h-3 bg-dark-800/50 rounded"></div>
                                </div>
                            </div>

                            {/* 3 Card Grid Mockup */}
                            <div className="grid grid-cols-3 gap-3 opacity-80">
                                <div className="aspect-[4/3] rounded-lg bg-dark-800 border border-dark-700 relative overflow-hidden group">
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 transition-all duration-300 group-hover:h-full group-hover:opacity-10"></div>
                                </div>
                                <div className="aspect-[4/3] rounded-lg bg-dark-800 border border-dark-700 relative overflow-hidden group">
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 transition-all duration-300 group-hover:h-full group-hover:opacity-10"></div>
                                </div>
                                <div className="aspect-[4/3] rounded-lg bg-dark-800 border border-dark-700 relative overflow-hidden group">
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 transition-all duration-300 group-hover:h-full group-hover:opacity-10"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Background Decoration Grid behind mockups */}
            <div className="absolute -z-10 top-[-10%] right-[-10%] w-[120%] h-[120%] opacity-[0.05] pointer-events-none">
                 <svg width="100%" height="100%">
                     <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                         <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                     </pattern>
                     <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                 </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};