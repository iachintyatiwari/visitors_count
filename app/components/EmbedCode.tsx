"use client"
import React, { useState, useEffect } from 'react';
import { WidgetStyle } from '@/types';
import { Copy, Check, Download,X, Minus, Maximize2, } from 'lucide-react';

interface EmbedCodeProps {
  styleConfig: WidgetStyle;
}

export const EmbedCode: React.FC<EmbedCodeProps> = ({ styleConfig }) => {
  const [copied, setCopied] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const codeSnippet = `<script 
  src="http://localhost:3000/widget"
  data-key="YOUR_UNIQUE_KEY"
  data-style="${styleConfig.id}">
</script>`;

  // Typing Effect
  useEffect(() => {
    setDisplayedCode('');
    setIsTyping(true);
    let i = 0;
    // Faster typing speed for better UX
    const intervalId = setInterval(() => {
      setDisplayedCode(codeSnippet.slice(0, i));
      i += 5; 
      if (i > codeSnippet.length) {
        setDisplayedCode(codeSnippet);
        setIsTyping(false);
        clearInterval(intervalId);
      }
    }, 15);

    return () => clearInterval(intervalId);
  }, [styleConfig.id, codeSnippet]);


  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCSS = () => {
    const element = document.createElement("a");
    const file = new Blob([styleConfig.cssContent], {type: 'text/css'});
    element.href = URL.createObjectURL(file);
    element.download = `${styleConfig.id}.css`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="embed-section" className="group relative rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl shadow-black/50 transition-all hover:border-white/10 hover:shadow-orange-500/5">
      
      {/* Mac-style Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5 select-none">
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
                        
                        <span className="ml-3 text-[10px] text-gray-600 font-mono tracking-tight">index.html</span>
      
                    </div>
          
        
        <div>
             {/* <button 
                onClick={downloadCSS}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300 transition-colors"
                title="Download CSS file"
             >
                <Download size={10} />
                CSS
             </button> */}
        </div>
      </div>

      {/* Code Body */}
      <div className="relative p-6 min-h-[200px] font-mono text-sm leading-loose">
        
        {/* Floating Copy Button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-20">
            <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors border backdrop-blur-md ${
                copied 
                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
            >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
        </div>

        <pre className="scrollbar-hide overflow-x-auto">
          <code className="block">
            {isTyping ? (
                <span className="text-gray-400 typing-cursor">{displayedCode}</span>
            ) : (
                /* Static Syntax Highlighting after typing finishes */
                <>
                    <span className="text-pink-500">&lt;script</span>
                    {'\n  '}
                    <span className="text-violet-400">src</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-emerald-400">"http://localhost:3000/widget"</span>
                    {'\n  '}
                    <span className="text-violet-400">data-key</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-emerald-400">"YOUR_UNIQUE_KEY"</span>
                    {'\n  '}
                    <span className="text-violet-400">data-style</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-emerald-400">"{styleConfig.id}"</span>
                    <span className="text-pink-500">&gt;</span>
                    {'\n'}
                    <span className="text-pink-500">&lt;/script&gt;</span>
                </>
            )}
          </code>
        </pre>
      </div>

      {/* Bottom Bar */}
      <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2 text-[10px] text-gray-600">
            <div className="w-1 h-1 rounded-full bg-orange-500"></div>
            <span>Ready to deploy</span>
         </div>
         <span className="text-[10px] text-gray-700 font-mono">UTF-8</span>
      </div>

    </div>
  );
};