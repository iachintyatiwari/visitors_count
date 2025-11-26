"use client"
import React, { useState } from 'react';
import { StyleGrid } from './StyleGrid';
import { EmbedCode } from './EmbedCode';
import { Key, Copy, Check, Loader2, Globe } from 'lucide-react';
import { WIDGET_STYLES } from '@/constants';



export default function HowItWorks(){
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [domain, setDomain] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error,setError] = useState("");
    const [selectedStyleId, setSelectedStyleId] = useState<string>(WIDGET_STYLES[0].id);
     const selectedStyleConfig = WIDGET_STYLES.find(s => s.id === selectedStyleId) || WIDGET_STYLES[0];
     const styles=WIDGET_STYLES;



  const handleSelectStyle = (id: string) => {
    setSelectedStyleId(id);
  };


  async function handelGenrateKey(){

    try{
        if(!domain) {
             setError("Enter Your Domain Name") ;
             return
            }
             

      setIsGenerating(true);    

      const res = await fetch("/api/getKey",{
        method:'POST',
          headers: {
    "Content-Type": "application/json",
  },
        body:JSON.stringify({domainName:domain})
    });

    const resBody = await res.json();
    const apiKey = resBody.id;
    setApiKey(apiKey);
       if (!res.ok) {
      setError(resBody.error || "Something went wrong");
      return;
    }

  
}catch(error:any){

  setError(error.message || "Unexpected error occurred");


}
finally{
       setIsGenerating(false);

}


  };

    const copyKey = () => {
        if(apiKey) {
            navigator.clipboard.writeText(apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    return (
        <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-dark-950 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                
                {/* Section Header */}
                <div className="text-center mb-24 relative z-10">
                    <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-6">
                        Launch in <span className="text-orange-500">3 simple steps</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        No complex setup. No credit card required. Just generate, customize, and paste.
                    </p>
                </div>

                <div className="relative">
                    {/* Illuminated Vertical Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-dark-800 hidden md:block transform -translate-x-1/2">
                        {/* Gradient Glow */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-orange-500/50 to-transparent"></div>
                         {/* Moving Light Beam */}
                        <div className="absolute top-0 left-1/2 w-[2px] h-32 -translate-x-1/2 bg-gradient-to-b from-transparent via-orange-400 to-transparent animate-float"></div>
                    </div>
                    
                    {/* Mobile Vertical Line */}
                     <div className="absolute left-8 top-0 bottom-0 w-px bg-dark-800 md:hidden"></div>


                    {/* STEP 1: API KEY */}
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 mb-32 group">
                        
                        {/* Center Marker Desktop */}
                        <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 justify-center">
                            <div className="w-12 h-12 rounded-full bg-dark-900 border-4 border-dark-950 ring-1 ring-orange-500/50 flex items-center justify-center text-orange-500 font-bold font-display text-xl z-20 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                                1
                            </div>
                        </div>
                        {/* Mobile Marker */}
                         <div className="md:hidden absolute left-8 -translate-x-1/2 top-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-dark-900 border-4 border-dark-950 ring-1 ring-orange-500/50 flex items-center justify-center text-orange-500 font-bold font-display z-20">
                                1
                            </div>
                        </div>


                        {/* Content Left (Text) */}
                        <div className="pl-16 md:pl-0 md:text-right md:pr-16 pt-2">
                            <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-orange-400 transition-colors">Get your API Key</h3>
                            <p className="text-gray-400 leading-relaxed text-base">
                                Create a free account to generate your unique project key. This tracks your specific domain's traffic securely without compromising user privacy.
                            </p>
                        </div>

                        {/* Visual Right (Card) */}
                        <div className="pl-16 md:pl-16">
                             {/* Updated to bg-dark-900 for a darker/blackish look */}
                             <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 shadow-2xl relative overflow-hidden group hover:border-orange-500/40 transition-all duration-300 w-full max-w-md shadow-black/50">
                                 {/* Background Glow */}
                                 <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/10 transition-colors"></div>

                                 <div className="flex items-center gap-3 mb-6 border-b border-dark-800 pb-4">
                                     <div className="p-2 rounded-lg bg-dark-800 border border-dark-700 text-orange-500 shadow-inner">
                                         <Key size={18} />
                                     </div>
                                     <span className="font-mono text-sm text-gray-300 font-medium">Credentials</span>
                                 </div>

                                 {apiKey ? (
                                     <div className="animate-in fade-in zoom-in duration-300">
                                         <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2 block">Public Key</label>
                                         <div className="flex items-center gap-2 mb-3">
                                             <div className="flex-1 bg-dark-950 border border-dark-800 rounded-lg px-3 py-2.5 font-mono text-sm text-gray-200 truncate select-all shadow-inner">
                                                 {apiKey}
                                             </div>
                                             <button onClick={copyKey} className="p-2.5 rounded-lg bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700 transition-colors border border-dark-700 shadow-md">
                                                 {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                             </button>
                                         </div>
                                         <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full w-fit">
                                             <span className="font-medium">Key activated for {domain}</span>
                                         </div>
                                     </div>
                                 ) : (
                                     <div className="flex flex-col gap-5 py-2">
                                         <div>
                                            <label className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block">Project Domain</label>
                                            <div className="relative">
                                                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                                <input 
                                                    type="text" 
                                                    value={domain}
                                                    onChange={(e) => setDomain(e.target.value)}
                                                    placeholder="e.g. my-awesome-project.com"
                                                    className="w-full bg-dark-950 border border-dark-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-dark-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-colors text-sm shadow-inner"
                                                />
                                            </div>
                                         </div>
                                         {error && (
                                       <div className="flex items-center gap-2 text-xs text-red-400 ">
                                        <span className="font-medium">{error}</span>
                                          </div>
                                            )}
                                         
                                         <button 
                                            onClick={handelGenrateKey}
                                            disabled={isGenerating}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-lg font-bold transition-all shadow-lg shadow-orange-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 justify-center"
                                         >
                                             {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Key size={18} />}
                                             {isGenerating ? 'Generating...' : 'Generate Key'}
                                         </button>
                                     </div>
                                 )}
                             </div>
                        </div>
                    </div>

                    {/* STEP 2: CHOOSE STYLE */}
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 mb-32 group">
                        
                        {/* Center Marker */}
                        <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 justify-center">
                            <div className="w-12 h-12 rounded-full bg-dark-900 border-4 border-dark-950 ring-1 ring-orange-500/50 flex items-center justify-center text-orange-500 font-bold font-display text-xl z-20 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                                2
                            </div>
                        </div>
                         {/* Mobile Marker */}
                         <div className="md:hidden absolute left-8 -translate-x-1/2 top-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-dark-900 border-4 border-dark-950 ring-1 ring-orange-500/50 flex items-center justify-center text-orange-500 font-bold font-display z-20">
                                2
                            </div>
                        </div>

                        {/* Visual Left (StyleGrid) */}
                         <div className="pl-16 md:pl-0 md:pr-16 order-2 md:order-1">
                             <StyleGrid selectedId={selectedStyleId} onSelect={handleSelectStyle} />
                        </div>

                         {/* Text Right */}
                        <div className="pl-16 md:pl-16 pt-2 order-1 md:order-2">
                            <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-orange-400 transition-colors">Choose your Style</h3>
                            <p className="text-gray-400 leading-relaxed text-base mb-6">
                                Match your brand identity. Select from our pre-built presets: from minimal pill shapes to retro digital clocks.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {styles.map(s => (
                                    <button 
                                        key={s.id} 
                                        onClick={() => handleSelectStyle(s.id)}
                                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selectedStyleId === s.id ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-900/20' : 'bg-dark-800 border-dark-700 text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {s.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* STEP 3: EMBED */}
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 group">
                        
                         {/* Center Marker */}
                        <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 justify-center">
                            <div className="w-12 h-12 rounded-full bg-dark-900 border-4 border-dark-950 ring-1 ring-orange-500/50 flex items-center justify-center text-orange-500 font-bold font-display text-xl z-20 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                                3
                            </div>
                        </div>
                         {/* Mobile Marker */}
                         <div className="md:hidden absolute left-8 -translate-x-1/2 top-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-dark-900 border-4 border-dark-950 ring-1 ring-orange-500/50 flex items-center justify-center text-orange-500 font-bold font-display z-20">
                                3
                            </div>
                        </div>

                        {/* Content Left (Text) */}
                        <div className="pl-16 md:pl-0 md:text-right md:pr-16 pt-2">
                            <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-orange-400 transition-colors">Embed & Deploy</h3>
                            <p className="text-gray-400 leading-relaxed text-base">
                                Copy the snippet below and paste it into your website's <code className="text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20 text-sm font-mono">&lt;head&gt;</code> tag. The counter will start tracking instantly.
                            </p>
                        </div>

                        {/* Visual Right (EmbedCode) */}
                        <div className="pl-16 md:pl-16">
                             <EmbedCode styleConfig={selectedStyleConfig} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};