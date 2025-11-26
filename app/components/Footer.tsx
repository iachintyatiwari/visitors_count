
import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';
import Link from 'next/link';


export default function Footer() {
  return (
    <footer className="bg-dark-950 pt-20 pb-10 relative overflow-hidden border-t border-dark-900">
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(255,100,0,0.03),transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Big Typography Section - Now the main container */}
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-display font-bold text-[16vw] leading-[0.8] text-dark-900 select-none tracking-tighter transition-colors duration-500 hover:text-dark-800 cursor-default">
                OPENCOUNT
            </h1>
            
            <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-8 px-2 text-xs text-gray-600 font-medium uppercase tracking-widest border-t border-dark-900/50 pt-6 gap-6 sm:gap-0">
                {/* Left Side: Taglines */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <span>Designed for Developers</span>
                    <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
                    <a href="https://twitter.com/iachintyatiwari" target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors">
                        BY Achintya
                    </a>
                </div>

                {/* Right Side: Links & Socials */}
                <div className="flex items-center gap-6 sm:gap-8">
                    <Link href="/documentation" className="hover:text-orange-500 transition-colors uppercase">
                        Documentation
                    </Link>

                    <div className="flex items-center gap-4">
                         <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors" aria-label="GitHub">
                             <Github size={16} />
                         </a>
                         <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors" aria-label="Twitter">
                             <Twitter size={16} />
                         </a>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </footer>
  );
};