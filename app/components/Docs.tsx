
import React from 'react';
import { ArrowLeft, Book, Code, Shield, Zap, Globe, Layout, Terminal } from 'lucide-react';
import Link from "next/link"


export default function Docs (){
  return (
    <div className="min-h-screen bg-dark-950 text-gray-300 pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}

        {/* <Link href="/"  className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500 mb-8 transition-colors">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
          </Link> */}

        <div className="grid lg:grid-cols-[240px_1fr] gap-12">
          
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block sticky top-32 h-fit">
            <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
              <Book size={18} className="text-orange-500" />
              Documentation
            </h3>
            <ul className="space-y-1 border-l border-dark-800 ml-2">
              <li>
                <a href="#introduction" className="block pl-4 py-1.5 border-l border-orange-500 text-orange-500 font-medium bg-orange-500/5 -ml-px rounded-r">
                  Introduction
                </a>
              </li>
              <li>
                <a href="#implementation" className="block pl-4 py-1.5 border-l border-transparent hover:border-dark-600 hover:text-white transition-colors -ml-px">
                  Implementation
                </a>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="space-y-16">
            
            {/* Section 1: About Project */}
            <section id="introduction" className="scroll-mt-32">
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                OpenCount Documentation
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                OpenCount is a privacy-first, open-source visitor analytics widget designed for modern web applications. It provides accurate traffic data without collecting personal data, using cookies, or compromising site performance.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8" id="features">
                <div className="p-6 bg-dark-900 border border-dark-800 rounded-xl">
                  <Shield className="text-orange-500 mb-3" size={24} />
                  <h3 className="text-white font-bold mb-2">GDPR Compliant</h3>
                  <p className="text-sm text-gray-500">No cookies, no IP tracking, no persistent identifiers. Safe by default.</p>
                </div>
                <div className="p-6 bg-dark-900 border border-dark-800 rounded-xl">
                  <Zap className="text-orange-500 mb-3" size={24} />
                  <h3 className="text-white font-bold mb-2">Ultra Lightweight</h3>
                  <p className="text-sm text-gray-500">Less than 2kb gzipped. Does not affect your Core Web Vitals.</p>
                </div>
                <div className="p-6 bg-dark-900 border border-dark-800 rounded-xl">
                  <Globe className="text-orange-500 mb-3" size={24} />
                  <h3 className="text-white font-bold mb-2">Edge Deployed</h3>
                  <p className="text-sm text-gray-500">Global low-latency delivery via Cloudflare CDN.</p>
                </div>
                <div className="p-6 bg-dark-900 border border-dark-800 rounded-xl">
                  <Layout className="text-orange-500 mb-3" size={24} />
                  <h3 className="text-white font-bold mb-2">Customizable</h3>
                  <p className="text-sm text-gray-500">Multiple preset styles to match your brand identity.</p>
                </div>
              </div>
            </section>

            <hr className="border-dark-800" />

            {/* Section 2: Implementation */}
            <section id="implementation" className="scroll-mt-32">
              <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                <Code className="text-orange-500" />
                How to Implement
              </h2>
              <p className="text-gray-400 mb-6">
                Integrating OpenCount takes less than 2 minutes. The widget is a self-contained Web Component that renders immediately upon script load.
              </p>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="bg-dark-900 rounded-xl border border-dark-800 overflow-hidden">
                  <div className="px-6 py-4 border-b border-dark-800 bg-dark-950/50 flex items-center justify-between">
                    <span className="font-bold text-white">1. Add the Script</span>
                    <span className="text-xs text-gray-500 font-mono">HTML / JSX</span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-400 mb-4">
                      Place the following snippet inside the <code className="text-orange-400 bg-orange-500/10 px-1 py-0.5 rounded text-xs">&lt;head&gt;</code> or just before the closing <code className="text-orange-400 bg-orange-500/10 px-1 py-0.5 rounded text-xs">&lt;body&gt;</code> tag of your main template (e.g., <code className="text-gray-300">index.html</code>, <code className="text-gray-300">layout.tsx</code>).
                    </p>
                    <div className="bg-dark-950 rounded-lg p-4 font-mono text-sm border border-dark-800 overflow-x-auto text-gray-300">
{`<script 
  src="https://cdn.opencount.com/widget.js" 
  data-domain="your-domain.com"
  data-style="bubble-1" 
  defer>
</script>`}
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-dark-900 rounded-xl border border-dark-800 overflow-hidden" id="configuration">
                  <div className="px-6 py-4 border-b border-dark-800 bg-dark-950/50 flex items-center justify-between">
                    <span className="font-bold text-white">2. Configuration Options</span>
                    <span className="text-xs text-gray-500 font-mono">Attributes</span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-400 mb-6">
                      Customize the behavior and look of your widget using data attributes.
                    </p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-dark-950 text-gray-400 font-medium">
                          <tr>
                            <th className="px-4 py-3 rounded-tl-lg">Attribute</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Required</th>
                            <th className="px-4 py-3 rounded-tr-lg">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-800">
                          <tr className="hover:bg-dark-800/50 transition-colors">
                            <td className="px-4 py-3 font-mono text-orange-400">src</td>
                            <td className="px-4 py-3 text-gray-500">string</td>
                            <td className="px-4 py-3 text-white"><CheckIcon /></td>
                            <td className="px-4 py-3 text-gray-400">The CDN URL of the script.</td>
                          </tr>
                          <tr className="hover:bg-dark-800/50 transition-colors">
                            <td className="px-4 py-3 font-mono text-orange-400">data-domain</td>
                            <td className="px-4 py-3 text-gray-500">string</td>
                            <td className="px-4 py-3 text-white"><CheckIcon /></td>
                            <td className="px-4 py-3 text-gray-400">Your registered domain name (without protocol).</td>
                          </tr>
                          <tr className="hover:bg-dark-800/50 transition-colors">
                            <td className="px-4 py-3 font-mono text-orange-400">data-style</td>
                            <td className="px-4 py-3 text-gray-500">string</td>
                            <td className="px-4 py-3 text-gray-600">-</td>
                            <td className="px-4 py-3 text-gray-400">Preset style ID: <code className="text-xs text-gray-300">bubble-1</code>, <code className="text-xs text-gray-300">bubble-2</code>, <code className="text-xs text-gray-300">retro</code>, <code className="text-xs text-gray-300">cyber</code>.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

// Helper Icon
const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);