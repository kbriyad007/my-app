import React, { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-bl from-purple-200/25 via-pink-200/20 to-rose-200/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-60 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-200/20 via-teal-200/15 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-amber-200/20 via-orange-200/15 to-red-200/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Sophisticated Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25px 25px, rgb(59 130 246 / 0.1) 2px, transparent 2px),
                radial-gradient(circle at 75px 75px, rgb(168 85 247 / 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px, 150px 150px",
            }}
          ></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping opacity-50"></div>
          <div className="absolute bottom-1/3 right-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping opacity-30"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20 xl:pt-24">
        {/* Content Container with Advanced Glassmorphism */}
        <div className="relative group">
          {/* Main Glass Container */}
          <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] border border-white/30 shadow-2xl shadow-black/10 p-6 sm:p-8 lg:p-12 xl:p-16 transition-all duration-700 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.15)]">
            
            {/* Multiple Layered Backgrounds for Depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/30 to-purple-50/20 rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] pointer-events-none opacity-60"></div>
            
            {/* Subtle Inner Border Glow */}
            <div className="absolute inset-px bg-gradient-to-br from-blue-400/15 via-purple-400/10 to-pink-400/15 rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] pointer-events-none opacity-80"></div>
            
            {/* Content Layer */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
          
          {/* Enhanced Floating Elements */}
          <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 lg:-top-12 lg:-right-12">
            <div className="relative">
              <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-full opacity-25 blur-2xl animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-tr from-cyan-300 to-blue-400 rounded-full opacity-40 blur-xl animate-pulse"></div>
            </div>
          </div>
          
          <div className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 lg:-bottom-16 lg:-left-16">
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-gradient-to-tr from-purple-400 via-pink-500 to-rose-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute inset-6 bg-gradient-to-bl from-violet-300 to-purple-400 rounded-full opacity-35 blur-xl animate-pulse"></div>
            </div>
          </div>
          
          {/* Additional Corner Accents */}
          <div className="absolute top-8 left-8 sm:top-12 sm:left-12 lg:top-16 lg:left-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-full opacity-15 blur-2xl animate-pulse"></div>
          </div>
          
          <div className="absolute bottom-12 right-12 sm:bottom-16 sm:right-16 lg:bottom-20 lg:right-20">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-tl from-amber-400 via-orange-500 to-red-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
          </div>
        </div>
        
        {/* Enhanced Bottom Decorative Elements */}
        <div className="mt-12 sm:mt-16 lg:mt-20 flex justify-center items-center">
          <div className="flex items-center space-x-3">
            {/* Animated Dots with Different Sizes and Colors */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-bounce shadow-lg shadow-blue-400/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 animate-bounce shadow-lg shadow-purple-400/50" style={{animationDelay: '100ms'}}></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 animate-bounce shadow-lg shadow-pink-400/50" style={{animationDelay: '200ms'}}></div>
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 animate-bounce shadow-lg shadow-indigo-400/50" style={{animationDelay: '300ms'}}></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 animate-bounce shadow-lg shadow-teal-400/50" style={{animationDelay: '400ms'}}></div>
            </div>
          </div>
        </div>
        
        {/* Additional Ambient Elements */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <div className="w-1 h-32 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent blur-sm"></div>
        </div>
        
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <div className="w-1 h-40 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent blur-sm"></div>
        </div>
        
        {/* Subtle Top Accent Line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-sm"></div>
        </div>
      </main>
    </div>
  );
}
