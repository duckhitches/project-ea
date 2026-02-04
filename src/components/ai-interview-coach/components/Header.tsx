
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 md:px-8 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-md flex items-center justify-between z-10 relative">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-pink-500 rounded-none animate-pulse" />
        <h1 className="text-lg md:text-xl font-boldonse uppercase tracking-widest text-black dark:text-white">
          AI Interview Coach
        </h1>
      </div>
      <div className="hidden sm:block">
         <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2 py-1 uppercase">
            Beta v1.0
         </span>
      </div>
    </header>
  );
};

export default Header;
