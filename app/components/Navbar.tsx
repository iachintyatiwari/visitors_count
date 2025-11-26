import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar () {


  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6">
      <nav className="pointer-events-auto w-full max-w-6xl flex items-center justify-between gap-4 px-6 py-3 bg-dark-950/80 backdrop-blur-xl border border-dark-700/50 rounded-xl shadow-2xl shadow-black/20 transition-all duration-300 ring-1 ring-white/5">
        
        {/* Brand - Orange Square with Eye */}
        <div  className="flex items-center gap-3 cursor-pointer select-none group">
           {/* <div className="flex items-center justify-center w-9 h-9 rounded-lg shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform duration-300 overflow-hidden"> */}
               <Link href = "/">
               <Image
                src = '/logo.png'
                alt = 'OpenCount Logo'
                width={64}
                height={64}/>
                </Link>
           {/* </div> */}
           <span className="text-lg font-bold tracking-tight text-white font-display">
             OpenCount
           </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
       <Link href="/documentation"
        className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-orange-400 transition-colors"
        >
        <BookOpen size={16} strokeWidth={2} />
         <span>Docs</span>
          </Link>

            <div className="h-5 w-px bg-dark-800 hidden sm:block"></div>

            <div className="flex items-center gap-4">

  {/* Peerlist */}
  <a
    href="https://peerlist.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit Peerlist"
    className="flex items-center justify-center bg-green-500 rounded-lg w-24 h-10"  // 64x64
  >
    <Image
      src="/Peerlist.png"
      alt="Peerlist Logo"
      width={80}
      height={80}   // inside, smaller than container
    />
  </a>

  {/* Product Hunt */}
  <a
    href="https://producthunt.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit Product Hunt"
    className="flex items-center justify-center bg-orange-500 rounded-lg w-24 h-10"  // EXACT SAME SIZE
  >
    <Image
      src="/ProductHlogo.png"
      alt="Product Hunt Logo"
      width={110}
      height={110}
    />
  </a>

</div>

        </div>
      </nav>
    </div>
  );
};