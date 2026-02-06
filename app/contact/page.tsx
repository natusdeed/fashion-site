"use client";

import { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleBlur = (field: keyof FormErrors) => {
    // Validate individual field on blur
    const newErrors: FormErrors = { ...errors };

    if (field === "name") {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else {
        delete newErrors.name;
      }
    }

    if (field === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }

    if (field === "subject") {
      if (!formData.subject.trim()) {
        newErrors.subject = "Subject is required";
      } else if (formData.subject.trim().length < 3) {
        newErrors.subject = "Subject must be at least 3 characters";
      } else {
        delete newErrors.subject;
      }
    }

    if (field === "message") {
      if (!formData.message.trim()) {
        newErrors.message = "Message is required";
      } else if (formData.message.trim().length < 10) {
        newErrors.message = "Message must be at least 10 characters";
      } else {
        delete newErrors.message;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-warm-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-900/50 to-warm-900/70 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/contact-header.png')",
          }}
        />
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-playfair text-warm-50 mb-6 tracking-wide">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
            We&apos;d love to hear from you - Get in touch with us
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Column: Contact Info Cards */}
          <div className="space-y-10">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-white p-6 border border-warm-200 hover:border-gold-400 transition-all duration-300 hover:shadow-lg">
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
                      href="mailto:info@loladrip.com"
                      className="text-warm-800 hover:text-gold-600 transition-colors duration-300 font-light text-lg"
                    >
                      info@loladrip.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white p-6 border border-warm-200 hover:border-gold-400 transition-all duration-300 hover:shadow-lg">
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

              {/* No physical location */}
              <div className="bg-white p-6 border border-warm-200 hover:border-gold-400 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-light text-warm-600 uppercase tracking-[0.2em] mb-2">
                      Location
                    </h3>
                    <p className="text-warm-800 font-light text-lg leading-relaxed">
                      Online only. Based in Richmond, Texas 77407. We ship worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-10 pt-10 border-t border-warm-200">
              <p className="text-warm-700 font-light leading-relaxed text-lg italic">
                An online boutique delivering curated styles straight to your door.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white p-8 lg:p-10 border border-warm-200">
            <h2 className="text-3xl font-playfair text-warm-900 mb-8">
              Send Us a Message
            </h2>
            
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-gold-50 border border-gold-200 text-gold-800 text-sm font-light">
                Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
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
                  onBlur={() => handleBlur("name")}
                  className={`w-full px-4 py-3.5 bg-warm-50 border text-warm-900 placeholder-warm-400 rounded-sm focus:outline-none focus:ring-2 transition-all duration-300 font-light ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-warm-300 focus:border-gold-500 focus:ring-gold-500/20"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 font-light animate-fade-in">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
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
                  onBlur={() => handleBlur("email")}
                  className={`w-full px-4 py-3.5 bg-warm-50 border text-warm-900 placeholder-warm-400 rounded-sm focus:outline-none focus:ring-2 transition-all duration-300 font-light ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-warm-300 focus:border-gold-500 focus:ring-gold-500/20"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 font-light animate-fade-in">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-light text-warm-700 uppercase tracking-[0.15em] mb-3"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={() => handleBlur("subject")}
                  className={`w-full px-4 py-3.5 bg-warm-50 border text-warm-900 placeholder-warm-400 rounded-sm focus:outline-none focus:ring-2 transition-all duration-300 font-light ${
                    errors.subject
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-warm-300 focus:border-gold-500 focus:ring-gold-500/20"
                  }`}
                  placeholder="What is this regarding?"
                />
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-500 font-light animate-fade-in">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
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
                  onBlur={() => handleBlur("message")}
                  rows={6}
                  className={`w-full px-4 py-3.5 bg-warm-50 border text-warm-900 placeholder-warm-400 rounded-sm focus:outline-none focus:ring-2 transition-all duration-300 resize-none font-light ${
                    errors.message
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-warm-300 focus:border-gold-500 focus:ring-gold-500/20"
                  }`}
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-500 font-light animate-fade-in">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-warm-900 hover:bg-warm-800 text-warm-50 px-8 py-4 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-light mt-4 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-warm-900 focus:ring-offset-2"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
