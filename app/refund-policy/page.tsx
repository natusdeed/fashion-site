"use client";

export default function RefundPolicy() {
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
            Refund and Return Policy
          </h1>
          <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
            We want you to love what you ordered
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
            <p className="text-warm-700 font-light leading-relaxed">
              At Lola Drip, we want you to love what you ordered. If something isn&apos;t right, let us know. We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
            </p>
          </section>

          {/* Eligibility for Returns */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              2. Eligibility for Returns
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              To be eligible for a return, your item must be in the same condition that you received it:
            </p>
            <ul className="list-disc list-inside space-y-2 text-warm-700 font-light leading-relaxed ml-4">
              <li>Unworn, unwashed, and unused.</li>
              <li>With all original tags attached.</li>
              <li>In its original packaging.</li>
              <li>You must also have the receipt or proof of purchase.</li>
            </ul>
          </section>

          {/* Non-Returnable Items */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              3. Non-Returnable Items
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              Certain types of items cannot be returned. Please get in touch if you have questions or concerns about your specific item. We cannot accept returns on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-warm-700 font-light leading-relaxed ml-4">
              <li><strong>Sale items:</strong> Only regular-priced items may be refunded. Sale items are final sale.</li>
              <li><strong>Intimate Goods:</strong> For hygiene reasons, we do not accept returns on swimwear, bodysuits, or lingerie if the hygiene seal has been removed or broken.</li>
              <li><strong>Gift Cards:</strong> Gift cards are non-refundable.</li>
              <li><strong>Custom Products:</strong> Special orders or personalized items cannot be returned.</li>
            </ul>
          </section>

          {/* How to Initiate a Return */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              4. How to Initiate a Return
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                To start a return, you can contact us at{" "}
                <a href="mailto:hello@loladrip.com" className="text-gold-600 hover:text-gold-700 underline transition-colors duration-300">
                  hello@loladrip.com
                </a>.
              </p>
              <p>
                If your return is accepted, we will send you instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
              </p>
              <div className="bg-warm-50 p-6 border border-warm-200 mt-4">
                <p className="text-warm-800 font-light mb-2">
                  <strong className="font-normal">Return Address:</strong>
                </p>
                <p className="text-warm-700 font-light">
                  Lola Drip Returns<br />
                  Richmond, Texas 77407
                </p>
                <p className="text-warm-600 text-sm font-light italic mt-3">
                  (Note: Please contact us for the specific street address before mailing your return.)
                </p>
              </div>
            </div>
          </section>

          {/* Return Shipping */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              5. Return Shipping
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                Unless the item is defective or we made an error in fulfillment, you will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping may be deducted from your refund depending on the shipping method used.
              </p>
              <p>
                We recommend using a trackable shipping service or purchasing shipping insurance for items over $75. We cannot guarantee that we will receive your returned item.
              </p>
            </div>
          </section>

          {/* Damages and Issues */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              6. Damages and Issues
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you received the wrong item so that we can evaluate the issue and make it right.
              </p>
              <p>
                <strong>Defective Items:</strong> If you receive a defective item, please email us at{" "}
                <a href="mailto:hello@loladrip.com" className="text-gold-600 hover:text-gold-700 underline transition-colors duration-300">
                  hello@loladrip.com
                </a>{" "}
                with photos of the defect within 48 hours of delivery.
              </p>
            </div>
          </section>

          {/* Exchanges */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              7. Exchanges
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
            </p>
          </section>

          {/* Refunds */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              8. Refunds
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                We will notify you once we&apos;ve received and inspected your return, and let you know if the refund was approved or not.
              </p>
              <div className="space-y-3">
                <p>
                  <strong>Approval:</strong> If approved, you&apos;ll be automatically refunded on your original payment method within 10 business days.
                </p>
                <p>
                  <strong>Processing Time:</strong> Please remember it can take some time for your bank or credit card company to process and post the refund too.
                </p>
                <p>
                  <strong>Late or Missing Refunds:</strong> If more than 15 business days have passed since we approved your return, please contact us at{" "}
                  <a href="mailto:hello@loladrip.com" className="text-gold-600 hover:text-gold-700 underline transition-colors duration-300">
                    hello@loladrip.com
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              9. Contact Us
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              If you have any questions regarding your return, please contact us:
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
                <strong className="font-normal">Location:</strong> Richmond, Texas 77407
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
