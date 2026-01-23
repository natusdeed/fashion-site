"use client";

export default function TermsOfService() {
  return (
    <div className="bg-warm-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-900/40 to-warm-900/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80')",
          }}
        />
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-playfair text-warm-50 mb-6 tracking-wide">
            Terms of Service
          </h1>
          <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
            Please read these terms carefully
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="bg-white border border-warm-200 p-8 lg:p-12">
          {/* Last Updated */}
          <p className="text-warm-600 text-sm font-light mb-8 italic">
            Last Updated: January 21, 2026
          </p>

          {/* Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              1. Overview
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                This website is operated by Lola Drip. Throughout the site, the terms &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to Lola Drip. Lola Drip offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
              </p>
              <p>
                By visiting our site and/or purchasing something from us, you engage in our &quot;Service&quot; and agree to be bound by the following terms and conditions (&quot;Terms of Service&quot;, &quot;Terms&quot;), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
              </p>
            </div>
          </section>

          {/* Online Store Terms */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              2. Online Store Terms
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
              </p>
              <p>
                You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
              </p>
            </div>
          </section>

          {/* General Conditions */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              3. General Conditions
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
            </p>
          </section>

          {/* Products and Services */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              4. Products and Services
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
              </p>
              <p>
                We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor&apos;s display of any color will be accurate.
              </p>
            </div>
          </section>

          {/* Modifications to the Service and Prices */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              5. Modifications to the Service and Prices
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
            </p>
          </section>

          {/* Billing and Account Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              6. Billing and Account Information
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
              </p>
              <p>
                You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              7. Third-Party Links
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              Certain content, products, and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites.
            </p>
          </section>

          {/* User Comments, Feedback, and Other Submissions */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              8. User Comments, Feedback, and Other Submissions
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, &apos;comments&apos;), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us.
            </p>
          </section>

          {/* Personal Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              9. Personal Information
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              Your submission of personal information through the store is governed by our{" "}
              <a href="/privacy-policy" className="text-gold-600 hover:text-gold-700 underline transition-colors duration-300">
                Privacy Policy
              </a>.
            </p>
          </section>

          {/* Errors, Inaccuracies, and Omissions */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              10. Errors, Inaccuracies, and Omissions
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).
            </p>
          </section>

          {/* Prohibited Uses */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              11. Prohibited Uses
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
            </p>
            <ul className="list-disc list-inside space-y-2 text-warm-700 font-light leading-relaxed ml-4">
              <li>(a) for any unlawful purpose;</li>
              <li>(b) to solicit others to perform or participate in any unlawful acts;</li>
              <li>(c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</li>
              <li>(d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
              <li>(e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability.</li>
            </ul>
          </section>

          {/* Disclaimer of Warranties; Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              12. Disclaimer of Warranties; Limitation of Liability
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
              </p>
              <p>
                In no case shall Lola Drip, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              13. Indemnification
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              You agree to indemnify, defend and hold harmless Lola Drip and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys&apos; fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              14. Governing Law
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the State of Texas and the United States.
            </p>
          </section>

          {/* Changes to Terms of Service */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              15. Changes to Terms of Service
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              16. Contact Information
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              Questions about the Terms of Service should be sent to us at:
            </p>
            <div className="bg-warm-50 p-6 border border-warm-200 space-y-3">
              <p className="text-warm-800 font-light">
                <strong className="font-normal">Lola Drip</strong>
              </p>
              <p className="text-warm-700 font-light">
                <strong className="font-normal">Email:</strong>{" "}
                <a href="mailto:hello@loladrip.com" className="hover:text-gold-600 transition-colors duration-300 underline">
                  hello@loladrip.com
                </a>
              </p>
              <p className="text-warm-700 font-light">
                <strong className="font-normal">Phone:</strong>{" "}
                <a href="tel:+15712342051" className="hover:text-gold-600 transition-colors duration-300 underline">
                  (571) 234-2051
                </a>
              </p>
              <p className="text-warm-700 font-light">
                <strong className="font-normal">Address:</strong> Richmond, Texas 77407
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
