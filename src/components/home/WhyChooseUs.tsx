export const WhyChooseUs = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="glass-card p-6 md:p-8 rounded-lg shadow-sm border border-outline-variant/20">
          <div className="text-center mb-8">
            <h2 className="font-headline-lg text-[22px] md:text-[26px] text-on-surface mb-2">
              Why Families Trust Us
            </h2>
            <p className="font-body-md text-[13px] text-on-surface-variant max-w-xl mx-auto">
              We combine modern pedagogy with traditional yoga principles to create a sanctuary for growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white shadow-sm rounded-lg flex items-center justify-center mx-auto mb-4 border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
              </div>
              <h4 className="font-headline-md text-[16px] text-on-surface">Expert Trainers</h4>
              <p className="font-body-md text-[12px] text-on-surface-variant leading-relaxed">
                Pediatric-certified instructors who specialize in making wellness fun and engaging.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white shadow-sm rounded-lg flex items-center justify-center mx-auto mb-4 border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-2xl">calendar_month</span>
              </div>
              <h4 className="font-headline-md text-[16px] text-on-surface">Flexible Schedules</h4>
              <p className="font-body-md text-[12px] text-on-surface-variant leading-relaxed">
                Morning, after-school, and weekend sessions that fit into your busy family life.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white shadow-sm rounded-lg flex items-center justify-center mx-auto mb-4 border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
              </div>
              <h4 className="font-headline-md text-[16px] text-on-surface">Certified Curriculum</h4>
              <p className="font-body-md text-[12px] text-on-surface-variant leading-relaxed">
                Internationally recognized syllabus that ensures safety and holistic development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
