import React from 'react';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-brand-dark">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-serif font-bold italic">Blome</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="hover:opacity-70">Collection</a>
          <a href="#" className="hover:opacity-70">About</a>
          <a href="#" className="hover:opacity-70">Stories</a>
          <a href="#" className="hover:opacity-70">Contact</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2">🔍</button>
          <button className="bg-brand-green text-white px-5 py-2 rounded-full text-sm hover:bg-brand-cyan transition-colors">
            Book Now
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="max-w-7xl mx-auto px-8 pt-12 pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side: Image of person */}
          <div className="relative z-10">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              alt="Professional Woman"
              className="w-full max-w-md h-auto mix-blend-multiply opacity-90"
            />
          </div>

          {/* Right Side: Text & Headline */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif leading-tight text-brand-dark">
              Acts office dits book <br />
              <span className="italic text-brand-cyan">Ilove Tis lijch</span>
            </h1>
            <p className="max-w-md mx-auto lg:mx-0 text-slate-600 leading-relaxed">
              Discover our new collection of minimalist office furniture designed
              to bring comfort and aesthetic peace to your daily workspace.
            </p>
            <button className="bg-brand-green text-white px-8 py-3 rounded-full hover:bg-brand-cyan transition-all shadow-lg">
              Discover More
            </button>
          </div>
        </div>

        {/* Decorative Floating Elements (The product row at the bottom) */}
        <div className="mt-12 flex flex-wrap justify-center lg:justify-end items-end gap-6 md:gap-12">
          {/* Vase/Flower Item */}
          <div className="flex flex-col items-center">
            <img src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=200"
              alt="Vase" className="w-24 h-24 object-contain" />
          </div>

          {/* Sphere/Ball Decor */}
          <div className="w-32 h-32 bg-brand-cyan/20 rounded-full shadow-inner flex items-center justify-center">
            <div className="w-24 h-24 bg-brand-cyan/30 rounded-full blur-sm opacity-50"></div>
          </div>

          {/* Product Bottle */}
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg">
            <div className="w-12 h-20 bg-white/50 rounded shadow-sm"></div>
          </div>

          {/* Designer Lamp */}
          <div className="relative">
            <div className="w-1 h-40 bg-slate-800/20 absolute -bottom-4 right-10"></div>
            <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=300"
              alt="Lamp" className="w-48 h-auto mix-blend-multiply" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;