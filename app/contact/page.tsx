"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-warm-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-900/40 to-warm-900/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80')",
          }}
        />
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-playfair text-warm-50 mb-6 tracking-wide">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
            We&apos;d love to hear from you. Get in touch with us.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-warm-700 mb-10 font-light leading-relaxed text-lg">
                Have a question or want to learn more about our collections?
                We&apos;re here to help. Visit us, call us, or send us a message.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white p-6 border border-warm-200 hover:border-gold-400 transition-colors duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-light text-warm-600 uppercase tracking-[0.2em] mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:info@elegance.com"
                      className="text-warm-800 hover:text-gold-600 transition-colors duration-300 font-light text-lg"
                    >
                      info@elegance.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-warm-200 hover:border-gold-400 transition-colors duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-light text-warm-600 uppercase tracking-[0.2em] mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+15712342051"
                      className="text-warm-800 hover:text-gold-600 transition-colors duration-300 font-light text-lg"
                    >
                      +1 (571) 234-2051
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-warm-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-light text-warm-600 uppercase tracking-[0.2em] mb-3">
                      Hours
                    </h3>
                    <div className="text-warm-800 font-light leading-relaxed space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="mt-10 pt-10 border-t border-warm-200">
              <h3 className="text-2xl font-playfair text-warm-900 mb-4">
                Visit Our Boutique
              </h3>
              <p className="text-warm-700 font-light leading-relaxed mb-6">
                Experience our collections in person at our flagship boutique.
                Our expert stylists are ready to help you find the perfect piece.
              </p>
              <div className="relative h-[250px] rounded-sm overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-warm-900/30" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 lg:p-10 border border-warm-200">
            <h2 className="text-3xl font-playfair text-warm-900 mb-8">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-light text-warm-700 uppercase tracking-[0.15em] mb-3"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-warm-50 border border-warm-300 text-warm-900 placeholder-warm-400 rounded-none focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-300 font-light"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-light text-warm-700 uppercase tracking-[0.15em] mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-warm-50 border border-warm-300 text-warm-900 placeholder-warm-400 rounded-none focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-300 font-light"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-light text-warm-700 uppercase tracking-[0.15em] mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3.5 bg-warm-50 border border-warm-300 text-warm-900 placeholder-warm-400 rounded-none focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-300 resize-none font-light"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-warm-900 text-warm-50 px-8 py-4 hover:bg-warm-800 transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-light mt-4"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
