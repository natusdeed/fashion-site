"use client";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
            Your privacy is important to us
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

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              1. Introduction
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                Welcome to Lola Drip (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://loladrip.com, use our services, or make a purchase.
              </p>
              <p>
                By accessing or using our website, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms of Service.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              2. Information We Collect
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-playfair text-warm-900 mb-3">
                  A. Information You Provide to Us
                </h3>
                <ul className="list-disc list-inside space-y-2 text-warm-700 font-light leading-relaxed ml-4">
                  <li><strong>Personal Identification:</strong> Name, billing address, shipping address, email address, and telephone number.</li>
                  <li><strong>Payment Information:</strong> Credit card details and billing information (processed securely by our third-party payment processors).</li>
                  <li><strong>Account Credentials:</strong> Username and password if you create an account.</li>
                  <li><strong>Customer Support Data:</strong> Information you provide when contacting us for help or inquiries.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-playfair text-warm-900 mb-3">
                  B. Information We Collect Automatically
                </h3>
                <ul className="list-disc list-inside space-y-2 text-warm-700 font-light leading-relaxed ml-4">
                  <li><strong>Device Data:</strong> IP address, browser type, operating system, and device information.</li>
                  <li><strong>Usage Data:</strong> Pages viewed, links clicked, time spent on pages, and referring websites.</li>
                  <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to track the activity on our service and hold certain information.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              3. How We Use Your Information
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              We use the information we collect for various business purposes, including to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-warm-700 font-light leading-relaxed ml-4">
              <li>Process and fulfill your orders, including sending emails to confirm your order status and shipment.</li>
              <li>Communicate with you regarding your account, new products, and services.</li>
              <li>Screen our orders for potential risk or fraud.</li>
              <li>Improve and optimize our website (for example, by generating analytics about how our customers browse and interact with the Site).</li>
              <li>Comply with applicable laws and regulations.</li>
            </ul>
          </section>

          {/* Sharing Your Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              4. Sharing Your Information
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              We do not sell your personal information. We may share your information with third parties only in the following situations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-warm-700 font-light leading-relaxed ml-4">
              <li><strong>Service Providers:</strong> We share information with third-party vendors who help us operate our business (e.g., Shopify, payment processors like Stripe/PayPal, and shipping carriers).</li>
              <li><strong>Compliance with Laws:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
            </ul>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              5. Third-Party Links
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              Our website may contain links to third-party websites or services that are not owned or controlled by Lola Drip. We are not responsible for the privacy practices or the content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              6. Data Security
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          {/* Your Privacy Rights */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              7. Your Privacy Rights (Texas Residents)
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              Under the Texas Data Privacy and Security Act (TDPSA), Texas residents have specific rights regarding their personal data, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-warm-700 font-light leading-relaxed ml-4 mb-4">
              <li><strong>Right to Access:</strong> You have the right to confirm whether we are processing your personal data and to access that data.</li>
              <li><strong>Right to Correction:</strong> You have the right to correct inaccuracies in your personal data.</li>
              <li><strong>Right to Deletion:</strong> You have the right to delete personal data provided by or obtained about you.</li>
              <li><strong>Right to Portability:</strong> You have the right to obtain a copy of your personal data in a portable and heavily usable format.</li>
              <li><strong>Right to Opt-Out:</strong> You have the right to opt out of the processing of personal data for purposes of targeted advertising, the sale of personal data, or profiling.</li>
            </ul>
            <p className="text-warm-700 font-light leading-relaxed">
              To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 45 days.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              8. Children&apos;s Privacy
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete such information from our files immediately.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              10. Contact Us
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              If you have questions or comments about this Privacy Policy, or if you wish to exercise your rights, please contact us at:
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
