"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSections: FAQSection[] = [
    {
      title: "Orders & Shipping",
      items: [
        {
          question: "How long will it take to get my order?",
          answer: "We process all orders within 1-3 business days. Once shipped, domestic orders typically arrive within 5-8 business days. You will receive a tracking number via email as soon as your package ships.",
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer Free Standard Shipping on all US orders over $150. For orders under $150, shipping rates are calculated at checkout based on your location and the weight of the items.",
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to select countries worldwide. International shipping rates and delivery times vary depending on the destination. Please note that customers are responsible for any customs fees or import taxes that may apply.",
        },
        {
          question: "Can I change or cancel my order?",
          answer: "We try to fulfil orders as quickly as possible. If you need to make a change or cancel, please email us at hello@loladrip.com immediately. If the order has already been processed or shipped, we will not be able to make changes, but you can return the items once you receive them.",
        },
      ],
    },
    {
      title: "Returns & Exchanges",
      items: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and have original tags attached. Please note that sale items, gift cards, and intimate goods (bodysuits/swimwear without hygiene seals) are final sale.",
        },
        {
          question: "How do I start a return?",
          answer: "To initiate a return, simply email us at hello@loladrip.com with your order number and the reason for the return. We will provide you with instructions on where to send your package.",
        },
        {
          question: "Do you offer free return shipping?",
          answer: "Customers are responsible for return shipping costs unless the item arrived damaged or we sent the wrong product. We recommend using a trackable shipping method.",
        },
        {
          question: "Can I exchange an item?",
          answer: "The fastest way to ensure you get the size or style you want is to return the item you have. Once the return is accepted, you can make a separate purchase for the new item.",
        },
      ],
    },
    {
      title: "Products & Sizing",
      items: [
        {
          question: "How do I know which size to order?",
          answer: "We include a specific Size Chart on every product page to help you find the perfect fit. If you are between sizes, we generally recommend sizing up for a more comfortable fit, unless the description states the item runs large.",
        },
        {
          question: "Where is Lola Drip located?",
          answer: "We are based in Richmond, Texas (Houston Metro area). While we are strictly an online store, we are proud to serve our local community and customers worldwide.",
        },
        {
          question: "Will you be restocking sold-out items?",
          answer: "We try to keep our inventory fresh with the latest styles, so some items may not be restocked once they sell out. The best way to stay updated on restocks is to sign up for our newsletter or follow us on social media.",
        },
      ],
    },
    {
      title: "Payments",
      items: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.",
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use industry-standard encryption and secure payment gateways (like Shopify Payments and PayPal) to ensure your personal and financial details are protected.",
        },
      ],
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="bg-warm-50">
      {/* Hero Section - semantic landmark */}
      <header className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden" aria-label="FAQ page header">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-900/40 to-warm-900/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80')",
          }}
          aria-hidden="true"
        />
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-playfair text-warm-50 mb-6 tracking-wide" id="faq-title">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
            We&apos;re here to help
          </p>
        </div>
      </header>

      {/* Main Content - semantic main with sections */}
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20" role="main" aria-label="FAQ content">
        {/* FAQ Sections - proper heading hierarchy h1 → h2 → content */}
        {faqSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-16 last:mb-0" aria-labelledby={`section-${sectionIndex}`}>
            <h2 id={`section-${sectionIndex}`} className="text-3xl md:text-4xl font-playfair text-warm-900 mb-8">
              {section.title}
            </h2>
            <div className="space-y-4" role="list">
              {section.items.map((item, itemIndex) => {
                const currentIndex = questionIndex++;
                return (
                  <div
                    key={itemIndex}
                    className="bg-white border border-warm-200 overflow-hidden transition-all duration-300 hover:border-gold-400"
                    role="listitem"
                  >
                    <button
                      onClick={() => toggleQuestion(currentIndex)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
                      aria-expanded={openIndex === currentIndex}
                      aria-controls={`answer-${currentIndex}`}
                      id={`question-${currentIndex}`}
                    >
                      <span className="text-lg font-light text-warm-900 pr-8">
                        {item.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-warm-600 flex-shrink-0 transition-transform duration-300 ${
                          openIndex === currentIndex ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      id={`answer-${currentIndex}`}
                      role="region"
                      aria-labelledby={`question-${currentIndex}`}
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === currentIndex
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-warm-700 font-light leading-relaxed">
                          {item.answer.split("hello@loladrip.com").map((part, i, arr) => {
                            if (i === arr.length - 1) return part;
                            return (
                              <span key={i}>
                                {part}
                                <a
                                  href="mailto:hello@loladrip.com"
                                  className="text-gold-600 hover:text-gold-700 underline transition-colors duration-300"
                                >
                                  hello@loladrip.com
                                </a>
                              </span>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Still Have Questions Section */}
        <section className="bg-white border border-warm-200 p-8 lg:p-10 mt-16" aria-labelledby="contact-faq-heading">
          <h2 id="contact-faq-heading" className="text-3xl font-playfair text-warm-900 mb-6 text-center">
            Still Have Questions?
          </h2>
          <p className="text-warm-700 font-light text-center mb-8 text-lg">
            We&apos;re here to help!
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center" role="list">
            <div role="listitem">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center" aria-hidden="true">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xs font-light text-warm-600 uppercase tracking-[0.2em] mb-2">
                Email
              </h3>
              <a
                href="mailto:hello@loladrip.com"
                className="text-warm-800 hover:text-gold-600 transition-colors duration-300 font-light"
              >
                hello@loladrip.com
              </a>
            </div>
            <div role="listitem">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center" aria-hidden="true">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xs font-light text-warm-600 uppercase tracking-[0.2em] mb-2">
                Phone
              </h3>
              <a
                href="tel:+15712342051"
                className="text-warm-800 hover:text-gold-600 transition-colors duration-300 font-light"
              >
                (571) 234-2051
              </a>
            </div>
            <div role="listitem">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center" aria-hidden="true">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xs font-light text-warm-600 uppercase tracking-[0.2em] mb-2">
                Hours
              </h3>
              <p className="text-warm-800 font-light">
                Monday – Friday: 9:00 AM – 6:00 PM<br />
                Saturday: 10:00 AM – 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
