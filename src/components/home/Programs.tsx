export const Programs = () => {
  return (
    <section className="py-12 bg-surface">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="text-center mb-8">
          <h2 className="font-headline-lg text-[24px] md:text-[28px] text-on-surface mb-2">
            Explore Our Programs
          </h2>
          <p className="font-body-md text-[13px] text-on-surface-variant max-w-xl mx-auto">
            Discover tailored wellness journeys designed for every age group and activity level.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Kids Yoga */}
          <div className="md:col-span-8 group relative rounded-lg overflow-hidden h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Close-up of a young child sitting in a meditative lotus pose"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa9ZauOwyi8HdKzjtEUbTvxAjDhuIuZMNECwUMPPwAfDXCFL6v6eewl6on71xIIm_pVwfxW2VwmX_BZV1SBMIyx4ShoYfHff5swGoyGXoJ05i4bE6-O1oBrmZNmmaPCs2IVfOGChCzDi8iDPbRbcO1stEWltfCaHyb1vEFXUqAftA9xgPktM7xqwU-9yMGYUuzoykIm_qweFRadlTHtZ8-MkbsYDU1cJQoDyvU1fjUMY4H0XxCaWi3V0Q5bLhYip_RTiHWlQYS1xA"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <span className="bg-primary px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest mb-1.5 inline-block">
                Popular
              </span>
              <h3 className="font-headline-lg text-[20px] mb-1">Kids Yoga</h3>
              <p className="font-body-md text-[13px] text-white/80 max-w-md">
                Interactive storytelling and movement to improve focus and flexibility.
              </p>
            </div>
          </div>
          {/* Online Classes */}
          <div className="md:col-span-4 bg-primary-container rounded-lg p-6 flex flex-col justify-between text-on-primary-container">
            <div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[20px]">video_library</span>
              </div>
              <h3 className="font-headline-md text-[18px] mb-1">Online Classes</h3>
              <p className="font-body-md text-[13px] opacity-80">
                Stream live and recorded sessions from the comfort of your home.
              </p>
            </div>
            <a
              className="inline-flex items-center gap-2 font-label-md text-label-md hover:translate-x-1 transition-transform"
              href="#"
            >
              Explore Library <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
          {/* Adult Meditation */}
          <div className="md:col-span-4 group relative rounded-lg overflow-hidden h-[250px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="A peaceful adult woman sitting in a zen-like, minimalist white room"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU-STOpCAqGGa6qnYF1CY75cQMXuo6s9IA5KQkdMaLYyJrN0NUuzV1IkiY9HhgSSwmHnkjGihW6CMyKZP6Guty7pNrhT2B8pYNoIH7MC07d7PqfTzlvisDJ72U8YDqbxTcnL0R0gP0t9NZZEwpUCA57DwWAlmy0IqUShtkiQwehd3w4lVx4WbDWS_ISiU7S52yrErogipAzxQvu5LUsSpGmmX6wRZ9xZbItyiV972cN1g41ElA8iGa7-z4LD5-BPiCG8qgzX8p_Jw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col text-white p-4 text-center">
              <h3 className="font-headline-md text-[18px] mb-1">Adult Meditation</h3>
              <p className="font-caption text-[9px] uppercase tracking-widest">
                Mindfulness for Parents
              </p>
            </div>
          </div>
          {/* More Programs */}
          <div className="md:col-span-8 bg-surface-container-low rounded-lg p-6 flex items-center gap-6 border border-outline-variant/30">
            <div className="flex-1">
              <h3 className="font-headline-md text-[18px] text-on-surface mb-1.5">
                Certified Curriculum
              </h3>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-3">
                Our programs are built on science-backed pediatric wellness frameworks.
              </p>
              <button className="text-primary font-label-md text-label-md flex items-center gap-1 group">
                Learn about our method{" "}
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </button>
            </div>
            <div className="hidden sm:grid grid-cols-2 gap-4">
              <div className="w-24 h-24 bg-secondary-fixed/30 rounded-lg flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-secondary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  school
                </span>
              </div>
              <div className="w-24 h-24 bg-primary-fixed/30 rounded-lg flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
