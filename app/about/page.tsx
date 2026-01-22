"use client";

export default function About() {
  return (
    <div className="bg-warm-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-900/40 to-warm-900/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')",
          }}
        />
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-playfair text-warm-50 mb-6 tracking-wide">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-warm-100 font-light tracking-wide max-w-2xl mx-auto">
            Where Fashion Meets Artistry and Sophistication
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Introduction Section */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-6">
                Welcome to Élégance
              </h2>
              <div className="space-y-6 text-warm-700 font-light leading-relaxed text-lg">
                <p>
                  We are dedicated to curating the finest collection of women&apos;s fashion,
                  combining exotic designs with timeless elegance. Each piece in our collection
                  is carefully selected to embody luxury, quality, and feminine grace.
                </p>
                <p>
                  Our mission is to empower women to express their unique style through
                  high-end fashion that celebrates individuality and sophistication. We believe
                  that true elegance comes from confidence, and our pieces are designed to
                  enhance that confidence.
                </p>
                <p>
                  Inspired by the world&apos;s most beautiful destinations, our collections
                  reflect the artistry and culture of fashion capitals from Paris to Milan,
                  bringing global sophistication to your wardrobe.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-[400px] lg:h-[500px]">
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80')",
                }}
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-4">
              Our Values
            </h2>
            <p className="text-warm-600 font-light text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-playfair text-warm-900 mb-4">
                Quality First
              </h3>
              <p className="text-warm-700 font-light leading-relaxed">
                We source only the finest materials and craftsmanship, ensuring every piece
                meets our exacting standards of excellence.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-playfair text-warm-900 mb-4">
                Elegant Design
              </h3>
              <p className="text-warm-700 font-light leading-relaxed">
                Every piece reflects sophistication and modern aesthetics, inspired by
                the world&apos;s most beautiful fashion destinations.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-playfair text-warm-900 mb-4">
                Sustainability
              </h3>
              <p className="text-warm-700 font-light leading-relaxed">
                Committed to ethical and sustainable fashion practices, ensuring our
                beautiful pieces also respect our planet.
              </p>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative h-[400px] lg:h-[500px]">
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80')",
                }}
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair text-warm-900 mb-6">
                Our Journey
              </h2>
              <div className="space-y-6 text-warm-700 font-light leading-relaxed text-lg">
                <p>
                  Founded with a vision to bring global fashion excellence to discerning
                  women worldwide, Élégance has grown from a small boutique to a trusted
                  name in luxury fashion.
                </p>
                <p>
                  Our team travels the world, discovering unique pieces and collaborating
                  with talented designers to bring you collections that celebrate both
                  tradition and innovation.
                </p>
                <p>
                  From the ateliers of Paris to the fashion houses of Milan, we curate
                  pieces that tell a story—your story, told through the language of
                  exquisite fashion.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
