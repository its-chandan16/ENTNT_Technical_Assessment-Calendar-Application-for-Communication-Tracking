
const Header = () => {
  return (
    <div className="sticky top-0 z-50">
      <header className="bg-gradient-to-r from-gray-700 via-gray-800 to-black shadow-md
">
        {/* Subtle animated pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:10px_10px] animate-[gradient_2s_linear_infinite]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Company Logo - Compact but impactful */}
            <div className="group relative">
              <h1 className="text-3xl font-bold text-white transform transition-all duration-300 group-hover:scale-105">
                ENTNT
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </h1>
            </div>

            {/* Center Title - Streamlined design */}
            <div className="flex-grow mx-4">
              <div className="relative group flex justify-center">
                <div className="absolute inset-0 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors duration-300"></div>
                <div className="relative px-6 py-2 flex items-center space-x-3">
                  <span className="text-lg font-semibold text-white whitespace-nowrap">
                    COMMUNICATION TRACKING
                  </span>
                  <span className="text-sky-200">|</span>
                  <span className="text-lg font-medium text-sky-200 whitespace-nowrap group-hover:text-white transition-colors duration-300">
                    CHANDAN KUMAR
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Element - Minimal but interactive */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center transform transition-all duration-300 group-hover:rotate-90 group-hover:bg-white/20">
                <div className="w-6 h-6 rounded-sm border-2 border-sky-300/50 group-hover:border-white/50 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-sky-300/30 to-transparent"></div>
      </header>
    </div>
  );
};
export default Header;