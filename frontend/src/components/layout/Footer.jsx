const socialLinks = [
  { name: "Twitter", icon: "𝕏", url: "https://x.com/TekunikTech" },
  { name: "GitHub", icon: "⌘", url: "https://github.com/Tekunik" },
  { name: "LinkedIn", icon: "in", url: "https://www.linkedin.com/company/tekunik-technologies/" },
  { name: "Instagram", icon: "📷", url: "https://www.instagram.com/tekuniktech/" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

const resourcesLinks = [
  { label: "Blog", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Community", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 ">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600"> */}
              {/* <span className="text-xl font-bold">T</span> */}
              {/* </div> */}
              <img
                src="https://tekunik.in/wp-content/uploads/2019/11/tekunik-logo-DARK.png.webp"
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              Building beautiful websites with modern technologies. Join our
              community and stay connected.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 
                             text-slate-400 transition-all duration-300 ease-out
                             hover:scale-110 hover:bg-brand-green hover:text-white 
                             hover:shadow-lg hover:shadow-brand-green/30"
                  aria-label={social.name}
                >
                  <span className="text-lg font-semibold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-slate-400 transition-all duration-300 ease-out
                               hover:translate-x-1 hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Resources
            </h3>

            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex w-fit items-center text-sm text-slate-400 transition-all duration-300 ease-out hover:text-white"
                  >
                    <span className="transition-all duration-300 group-hover:text-brand-cyan group-hover:translate-x-1">
                      {link.label}
                    </span>

                    <svg
                      className="ml-1 h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Stay Updated
            </h3>

            <p className="text-sm text-slate-400">
              Subscribe to our newsletter for the latest updates.
            </p>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm text-white
                           placeholder-slate-500 transition-all duration-300 ease-out
                           ring-1 ring-slate-700
                           hover:bg-slate-700 hover:ring-brand-green/50
                           focus:outline-none focus:ring-2 focus:ring-brand-green"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold
                           text-white transition-all duration-300 ease-out
                           hover:bg-linear-to-r hover:from-brand-green hover:to-brand-cyan
                           hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-green/30
                           active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-slate-800" />

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} TekUnik. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center lg:gap-6 gap-4 grid-cols-3 md:grid-cols-3">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 transition-colors duration-300 ease-out
                           hover:text-brand-cyan hover:underline hover:underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}