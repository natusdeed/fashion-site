"use client";

export default function ShippingPolicy() {
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
            Shipping Policy
          </h1>
          <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
            Fast and reliable delivery
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

          {/* General Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              1. General Information
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              All orders are subject to product availability. If an item is not in stock at the time you place your order, we will notify you and refund you the total amount of your order, using the original method of payment.
            </p>
          </section>

          {/* Processing Time */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              2. Processing Time
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                Please note that &quot;Processing Time&quot; is different from &quot;Shipping Time.&quot;
              </p>
              <div className="space-y-3">
                <p>
                  <strong>Processing Time:</strong> This is the time it takes for us to prepare your order for shipment (checking stock, quality control, and packing). All orders are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email.
                </p>
                <p>
                  <strong>Notification:</strong> You will receive another notification when your order has shipped.
                </p>
                <p className="text-warm-600 italic">
                  Please note: High volume periods (such as sales or holidays) may extend processing time by an additional 1-2 business days.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Rates and Delivery Estimates */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              3. Shipping Rates and Delivery Estimates
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-6">
              Shipping charges for your order will be calculated and displayed at checkout.
            </p>

            {/* Domestic Shipping */}
            <div className="mb-8">
              <h3 className="text-xl font-playfair text-warm-900 mb-4">
                Domestic Shipping (United States)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-warm-300 mb-4">
                  <thead>
                    <tr className="bg-warm-100">
                      <th className="border border-warm-300 px-4 py-3 text-left text-warm-900 font-normal text-sm uppercase tracking-wide">Shipping Option</th>
                      <th className="border border-warm-300 px-4 py-3 text-left text-warm-900 font-normal text-sm uppercase tracking-wide">Estimated Delivery Time</th>
                      <th className="border border-warm-300 px-4 py-3 text-left text-warm-900 font-normal text-sm uppercase tracking-wide">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-warm-300 px-4 py-3 text-warm-700 font-light">Standard Shipping</td>
                      <td className="border border-warm-300 px-4 py-3 text-warm-700 font-light">5–8 business days</td>
                      <td className="border border-warm-300 px-4 py-3 text-warm-700 font-light">Calculated at checkout</td>
                    </tr>
                    <tr className="bg-warm-50">
                      <td className="border border-warm-300 px-4 py-3 text-warm-700 font-light">Express Shipping</td>
                      <td className="border border-warm-300 px-4 py-3 text-warm-700 font-light">2–3 business days</td>
                      <td className="border border-warm-300 px-4 py-3 text-warm-700 font-light">Calculated at checkout</td>
                    </tr>
                    <tr>
                      <td className="border border-warm-300 px-4 py-3 text-warm-700 font-light">Free Shipping</td>
                      <td className="border border-warm-300 px-4 py-3 text-warm-700 font-light">5–8 business days</td>
                      <td className="border border-warm-300 px-4 py-3 text-warm-700 font-light">Free on orders over $150</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-warm-600 text-sm font-light italic">
                (Note: Delivery delays can occasionally occur due to carrier issues or weather conditions. Lola Drip is not responsible for delays caused by the carrier.)
              </p>
            </div>

            {/* International Shipping */}
            <div>
              <h3 className="text-xl font-playfair text-warm-900 mb-4">
                International Shipping
              </h3>
              <div className="space-y-3 text-warm-700 font-light leading-relaxed">
                <p>
                  We offer international shipping to select countries.
                </p>
                <p>
                  <strong>Estimated Delivery:</strong> 7–21 business days, depending on the destination.
                </p>
                <p>
                  <strong>Rates:</strong> Calculated at checkout based on weight and destination.
                </p>
                <p className="bg-warm-50 p-4 border-l-4 border-gold-500">
                  Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. Lola Drip is not responsible for these charges if they are applied; they are the responsibility of the customer.
                </p>
              </div>
            </div>
          </section>

          {/* P.O. Boxes and APO/FPO Addresses */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              4. P.O. Boxes and APO/FPO Addresses
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              Yes, we ship to addresses within the U.S., U.S. Territories, and APO/FPO/DPO addresses.
            </p>
          </section>

          {/* How Do I Check the Status of My Order? */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              5. How Do I Check the Status of My Order?
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
              </p>
              <p>
                If you haven&apos;t received your order within the estimated delivery days stated in your shipping confirmation email, please contact us at{" "}
                <a href="mailto:hello@loladrip.com" className="text-gold-600 hover:text-gold-700 underline transition-colors duration-300">
                  hello@loladrip.com
                </a>{" "}
                with your name and order number, and we will look into it for you.
              </p>
            </div>
          </section>

          {/* Shipping to Multiple Addresses */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              6. Shipping to Multiple Addresses
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              We are unable to ship to multiple addresses in a single order. If you need to ship to multiple locations, please place separate orders for each address.
            </p>
          </section>

          {/* Lost, Stolen, or Damaged Packages */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              7. Lost, Stolen, or Damaged Packages
            </h2>
            <div className="space-y-4 text-warm-700 font-light leading-relaxed">
              <p>
                Lola Drip is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.
              </p>
              <p>
                Please save all packaging materials and damaged goods before filing a claim.
              </p>
              <p>
                <strong>Stolen Packages:</strong> If your package is marked as &quot;Delivered&quot; by the carrier but you cannot find it, please check with neighbors and look around your property. If it is still missing, you must contact the carrier directly. Lola Drip does not cover stolen packages once they have been successfully delivered to the address provided.
              </p>
            </div>
          </section>

          {/* Incorrect Address */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              8. Incorrect Address
            </h2>
            <p className="text-warm-700 font-light leading-relaxed">
              Please ensure that your shipping address is correct at checkout. We are not responsible for orders shipped to an incorrectly provided address. If a package is returned to us due to an incorrect address, the customer will be responsible for the redelivery shipping costs.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-3xl font-playfair text-warm-900 mb-6">
              9. Contact Us
            </h2>
            <p className="text-warm-700 font-light leading-relaxed mb-4">
              If you have any further questions, please don&apos;t hesitate to contact us at:
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
