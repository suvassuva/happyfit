export const Testimonials = () => {
  return (
    <section className="py-12 bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="max-w-xl">
            <h2 className="font-headline-lg text-[22px] md:text-[26px] text-on-surface mb-1">Hear from our Community</h2>
            <p className="font-body-md text-[13px] text-on-surface-variant">Real stories from parents who have seen their children thrive with Happy Fit Club.</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Testimonial 1 */}
          <div className="bg-secondary-fixed/10 p-5 rounded-lg border border-secondary-fixed/20 flex flex-col justify-between">
            <div>
              <div className="flex text-secondary mb-3">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-lg text-[14px] text-on-surface italic mb-6 leading-relaxed">
                &quot;The change in Leo&apos;s concentration levels since starting the Kids Yoga program has been incredible. He&apos;s more calm and mindful every day.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Sarah Mitchell"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN9yuHJEMzZWbeRdgKt3SF5HWsKkLye9z5_skgLOCIKLnd9H1MCRGdcS1n_JTRISXCDyHDXw8EPgo59WuSEmaMxIIR6M10JM1gwW3XwMNJOuVrKIh-xckPxwztsfw9NAQf67ytNiZFX8Uhp-MMm30HhVjAdl6WFzjc-0bbIbMBvvxalFzGytR467r0KG8mMR0_PSLKQDccLBu1a51Vj8XGu8YweVwWamdYa5rAa-D3CTV-fpoPVjoTQiReOtLZ9NO_-MiOtGnIlPA"
                />
              </div>
              <div>
                <h5 className="font-label-md text-[13px] text-on-surface font-bold">Sarah Mitchell</h5>
                <p className="font-caption text-[11px] text-on-surface-variant">Parent of Leo, 7yrs</p>
              </div>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-primary-fixed/10 p-5 rounded-lg border border-primary-fixed/20 flex flex-col justify-between">
            <div>
              <div className="flex text-primary mb-3">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-lg text-[14px] text-on-surface italic mb-6 leading-relaxed">
                &quot;The online classes are a lifesaver. Being able to join from home during busy weekdays has made wellness a consistent part of our family routine.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="David Chen"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTcIBTcSoEQtjGWWsXortP6_hK7R1aVrY8qHI1aEqHC4LeJk0HWYrjIK9xrQOhFM0a2K_-7yhkl_nB9g4dR2sqv3wFL7kNoNs2IZVILKLqrk-tq_qBAoJPtK47BN4EUfXQ-Z3g8MH7cGZcg_uJY6No3S8VO4IFQ7dTFiIpFJaMDj6uqUDWmO2b_JnRhZrWbejs8N_6giO5hyxg5FbRPG7yaINoZEXgbIoAAdvPmfdqmOtxLqQv6efxdKvZS-iZYx6PATwkbQCUQYY"
                />
              </div>
              <div>
                <h5 className="font-label-md text-[13px] text-on-surface font-bold">David Chen</h5>
                <p className="font-caption text-[11px] text-on-surface-variant">Parent of Maya, 10yrs</p>
              </div>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-secondary-fixed/10 p-5 rounded-lg border border-secondary-fixed/20 flex flex-col justify-between">
            <div>
              <div className="flex text-secondary mb-3">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-lg text-[14px] text-on-surface italic mb-6 leading-relaxed">
                &quot;Finding a space that welcomes both children and adults with such care is rare. We love the community events.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Elena Rodriguez"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFa9GdUPgbEt0UHLDtnRuEeq9vQc8lXLVGhwbXE9IWYNMYb9xfEjzaqJDZah22JlGfVIFHV0upyTYX9PKGDvozCDclk7YswHuMkNXiWpGXMse9o8g5KMrHahXerzjwFDi2BYi2amvHmUnTO7P9yeTh4DP35HIkwWYspJVfqr1eqQd6BFPKyL6qw12ldvYE1Cv1vU45Czkh95LSF68Tt-9p_8ZvV6pYijeY5nCzJn9_a1VAXzrQpjYWK_uN_EnBHY9tf72BT-GfIKw"
                />
              </div>
              <div>
                <h5 className="font-label-md text-[13px] text-on-surface font-bold">Elena Rodriguez</h5>
                <p className="font-caption text-[11px] text-on-surface-variant">Parent of Sofia, 5yrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
