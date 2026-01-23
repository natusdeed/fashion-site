"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  // Quick Links
  const quickLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/size-guide", label: "Size Guide" },
    { href: "/refund-policy", label: "Return Policy" },
  ];

  // Customer Service Links
  const customerServiceLinks = [
    { href: "/shipping-policy", label: "Shipping" },
    { href: "/faq", label: "FAQ" },
    { href: "/terms-of-service", label: "Terms" },
  ];

  // Social Media Links
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "https://pinterest.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.599-.299-1.484c0-1.388.805-2.425 1.809-2.425.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.481 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.744 2.281a.3.3 0 01.069.288l.278 1.133c.044.183.145.223.334.134 1.249-.581 1.535-1.479 1.535-2.384 0-1.115-.6-2.188-1.832-2.188-1.482 0-2.671 1.524-2.671 3.54 0 1.307.443 2.188 1.108 2.188.272 0 .545-.139.636-.308.122-.255.38-.892.494-1.156.162-.39.104-.442-.307-.736-.61-.272-1.002-1.127-1.002-1.814 0-2.322 1.688-4.454 4.87-4.454 2.558 0 4.548 1.822 4.548 4.256 0 2.54-1.601 4.585-3.824 4.585-.747 0-1.451-.39-1.692-.852 0 0-.37 1.405-.459 1.75-.166.64-.615 1.44-.915 1.927A12 12 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-warm-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Column 1: Brand, Tagline, Newsletter */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] rounded-sm" aria-label="Lola Drip - Home">
              <span className="text-3xl font-dancing font-semibold text-warm-50 tracking-wide">
                Lola Drip
              </span>
            </Link>
            <p className="text-warm-300 text-sm leading-relaxed mb-6 font-light">
              Discover exquisite luxury women&apos;s fashion with our curated collection of designer pieces. Timeless elegance, exceptional craftsmanship.
            </p>
            {/* Newsletter Signup */}
            <div>
              <h3 className="text-warm-50 font-playfair text-sm font-normal mb-4 tracking-wider uppercase">
                Newsletter
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-warm-900/50 border border-warm-800 text-warm-50 placeholder-warm-500 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-300 font-light"
                />
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-600 text-warm-900 px-6 py-3 text-sm font-light tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-warm-50 font-playfair text-sm font-normal mb-6 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-gold-400 text-sm font-light tracking-wide transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] rounded-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-warm-50 font-playfair text-sm font-normal mb-6 tracking-wider uppercase">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-gold-400 text-sm font-light tracking-wide transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] rounded-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info & Social Media */}
          <div>
            <h3 className="text-warm-50 font-playfair text-sm font-normal mb-6 tracking-wider uppercase">
              Contact
            </h3>
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-warm-400 text-xs font-light uppercase tracking-wide mb-1">
                  Email
                </p>
                <a
                  href="mailto:info@loladrip.com"
                  className="text-warm-300 hover:text-gold-400 text-sm font-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] rounded-sm inline-block"
                >
                  info@loladrip.com
                </a>
              </div>
              <div>
                <p className="text-warm-400 text-xs font-light uppercase tracking-wide mb-1">
                  Phone
                </p>
                <a
                  href="tel:+15712342051"
                  className="text-warm-300 hover:text-gold-400 text-sm font-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] rounded-sm inline-block"
                >
                  +1 (571) 234-2051
                </a>
              </div>
            </div>
            {/* Social Media Icons */}
            <div>
              <h4 className="text-warm-400 text-xs font-light uppercase tracking-wide mb-4">
                Follow Us
              </h4>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                    className="text-warm-400 hover:text-gold-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] rounded-sm p-1"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Copyright Section */}
        <div className="border-t border-warm-800 pt-8">
          {/* Payment Methods */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="text-warm-400 text-xs font-light tracking-wide uppercase">
                We Accept:
              </span>
              <div className="flex items-center gap-3">
                {/* Visa */}
                <div className="bg-[#1434CB] hover:bg-[#1a45d4] px-4 py-2 rounded-sm text-white text-xs font-semibold flex items-center justify-center min-w-[70px] transition-colors duration-300">
                  Visa
                </div>
                {/* Mastercard */}
                <div className="bg-gradient-to-r from-[#EB001B] to-[#F79E1B] hover:from-[#F0122B] hover:to-[#FFB020] px-4 py-2 rounded-sm text-white text-xs font-semibold flex items-center justify-center min-w-[100px] transition-all duration-300">
                  Mastercard
                </div>
                {/* Amex */}
                <div className="bg-[#006FCF] hover:bg-[#0080E0] px-4 py-2 rounded-sm text-white text-xs font-semibold flex items-center justify-center min-w-[70px] transition-colors duration-300">
                  Amex
                </div>
                {/* PayPal */}
                <div className="bg-[#003087] hover:bg-[#0040A0] px-4 py-2 rounded-sm text-white text-xs font-semibold flex items-center justify-center min-w-[80px] transition-colors duration-300">
                  PayPal
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="text-center">
            <p className="text-warm-400 text-xs font-light">
              © {currentYear} Lola Drip. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
