import Link from "next/link";

// Custom SVG Icons for Brands
const Facebook = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-surface-container dark:bg-inverse-surface">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-gutter py-12 max-w-container-max mx-auto">
        <div className="space-y-3">
          <div className="font-headline-md text-[18px] font-bold text-primary dark:text-inverse-primary">
            Happy Fit Club
          </div>
          <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
            Nurturing wellness for every generation. A sanctuary for growth, balance, and joy.
          </p>
        </div>
        <div>
          <h6 className="font-label-md text-label-md text-on-surface font-bold mb-4 uppercase tracking-wider">
            Programs
          </h6>
          <ul className="space-y-2">
            <li>
              <Link
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
                href="#"
              >
                Kids Yoga
              </Link>
            </li>
            <li>
              <Link
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
                href="#"
              >
                Adult Meditation
              </Link>
            </li>
            <li>
              <Link
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
                href="#"
              >
                Online Library
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-label-md text-label-md text-on-surface font-bold mb-4 uppercase tracking-wider">
            Company
          </h6>
          <ul className="space-y-2">
            <li>
              <Link
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
                href="#"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
                href="#"
              >
                Trainers
              </Link>
            </li>
            <li>
              <Link
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
                href="#"
              >
                Branch Locations
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-label-md text-label-md text-on-surface font-bold mb-4 uppercase tracking-wider">
            Legal
          </h6>
          <ul className="space-y-2">
            <li>
              <Link
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
                href="#"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
                href="#"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-outline-variant/30 px-gutter py-6 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label-md text-[11px] text-on-surface-variant">
          © 2024 Happy Fit Club. Nurturing wellness for every generation.
        </p>
        <div className="flex gap-4">
          <Link
            className="text-on-surface-variant hover:text-primary transition-all"
            href="#"
          >
            <Facebook className="w-6 h-6" />
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-all"
            href="#"
          >
            <Instagram className="w-6 h-6" />
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-all"
            href="#"
          >
            <Twitter className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
