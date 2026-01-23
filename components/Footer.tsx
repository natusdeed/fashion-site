"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const policyLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/refund-policy", label: "Refund Policy" },
    { href: "/shipping-policy", label: "Shipping Policy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ];

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const customerService = [
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/size-guide", label: "Size Guide" },
    { href: "/returns", label: "Returns & Exchanges" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      color: "#E4405F",
      hoverColor: "#F56040",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      color: "#1877F2",
      hoverColor: "#42A5F5",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      color: "#FF0000",
      hoverColor: "#FF4444",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://tiktok.com",
      color: "#000000",
      hoverColor: "#FF0050",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-1.23-3.4V2.5h-3.26v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.07 6.07 0 0 0-1-.05A6.24 6.24 0 0 0 5 20.8a6.24 6.24 0 0 0 10.86-4.22v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.01z" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "https://pinterest.com",
      color: "#E60023",
      hoverColor: "#BD001C",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.599-.299-1.484c0-1.388.805-2.425 1.809-2.425.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.481 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.744 2.281a.3.3 0 01.069.288l.278 1.133c.044.183.145.223.334.134 1.249-.581 1.535-1.479 1.535-2.384 0-1.115-.6-2.188-1.832-2.188-1.482 0-2.671 1.524-2.671 3.54 0 1.307.443 2.188 1.108 2.188.272 0 .545-.139.636-.308.122-.255.38-.892.494-1.156.162-.39.104-.442-.307-.736-.61-.272-1.002-1.127-1.002-1.814 0-2.322 1.688-4.454 4.87-4.454 2.558 0 4.548 1.822 4.548 4.256 0 2.54-1.601 4.585-3.824 4.585-.747 0-1.451-.39-1.692-.852 0 0-.37 1.405-.459 1.75-.166.64-.615 1.44-.915 1.927A12 12 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      color: "#000000",
      hoverColor: "#1DA1F2",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-warm-900 text-warm-100 border-t border-warm-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6" aria-label="ÉLÉGANCE - Home">
              <span className="text-2xl font-playfair font-normal text-warm-50 tracking-[0.2em]">
                ÉLÉGANCE
              </span>
            </Link>
            <p className="text-warm-300 text-sm leading-relaxed mb-6 font-light">
              Discover exquisite luxury women&apos;s fashion with our curated collection of designer pieces. 
              Timeless elegance, exceptional craftsmanship.
            </p>
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h3 className="text-warm-50 font-playfair text-sm font-normal mb-3 tracking-wider uppercase">
                Newsletter
              </h3>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-warm-800 border border-warm-700 text-warm-50 placeholder-warm-400 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300 font-light"
                />
                <button
                  type="submit"
                  className="bg-gold-600 hover:bg-gold-700 text-warm-900 px-6 py-2.5 text-sm font-light tracking-wider uppercase transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-warm-50 font-playfair text-sm font-normal mb-6 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-gold-400 text-sm font-light tracking-wide transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-warm-50 font-playfair text-sm font-normal mb-6 tracking-wider uppercase">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-gold-400 text-sm font-light tracking-wide transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Legal */}
          <div>
            <h3 className="text-warm-50 font-playfair text-sm font-normal mb-6 tracking-wider uppercase">
              Policies
            </h3>
            <ul className="space-y-3 mb-8">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-gold-400 text-sm font-light tracking-wide transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Contact Info */}
            <div className="space-y-2">
              <p className="text-warm-300 text-sm font-light">
                <span className="text-warm-400">Email:</span>{" "}
                <a href="mailto:info@elegance.com" className="hover:text-gold-400 transition-colors duration-300">
                  info@elegance.com
                </a>
              </p>
              <p className="text-warm-300 text-sm font-light">
                <span className="text-warm-400">Phone:</span>{" "}
                <a href="tel:+15712342051" className="hover:text-gold-400 transition-colors duration-300">
                  +1 (571) 234-2051
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media & Payment Methods */}
        <div className="border-t border-warm-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Social Media Links */}
            <div>
              <h3 className="text-warm-50 font-playfair text-sm font-normal mb-4 tracking-wider uppercase text-center lg:text-left">
                Follow Us
              </h3>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                    className="transition-colors duration-300"
                    style={{ color: social.color }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = social.hoverColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = social.color)}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-warm-400 text-xs font-light tracking-wide uppercase mr-2">
                We Accept:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="bg-[#1434CB] px-3 py-1.5 rounded text-white text-xs font-semibold">
                  Visa
                </div>
                <div className="bg-[#EB001B] px-3 py-1.5 rounded text-white text-xs font-semibold">
                  Mastercard
                </div>
                <div className="bg-[#006FCF] px-3 py-1.5 rounded text-white text-xs font-semibold">
                  Amex
                </div>
                <div className="bg-[#003087] px-3 py-1.5 rounded text-white text-xs font-semibold">
                  PayPal
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-warm-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-warm-400 text-xs font-light">
            <p>
              © {currentYear} ÉLÉGANCE. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-gold-400 transition-colors duration-300">
                Privacy
              </Link>
              <span className="text-warm-600">•</span>
              <Link href="/terms-of-service" className="hover:text-gold-400 transition-colors duration-300">
                Terms
              </Link>
              <span className="text-warm-600">•</span>
              <Link href="/cookie-policy" className="hover:text-gold-400 transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
