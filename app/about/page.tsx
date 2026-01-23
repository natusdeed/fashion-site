"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function About() {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const image1ParallaxRef = useRef<HTMLDivElement>(null);
  const image2ParallaxRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;

      // Hero parallax
      if (heroParallaxRef.current) {
        const parallaxSpeed = 0.5;
        heroParallaxRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }

      // Image 1 parallax (clothing rack)
      if (image1ParallaxRef.current) {
        const rect = image1ParallaxRef.current.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
          const parallaxSpeed = 0.3;
          const offset = (scrolled + windowHeight - elementTop) * parallaxSpeed;
          image1ParallaxRef.current.style.transform = `translateY(${offset}px)`;
        }
      }

      // Image 2 parallax (journey image)
      if (image2ParallaxRef.current) {
        const rect = image2ParallaxRef.current.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
          const parallaxSpeed = 0.3;
          const offset = (scrolled + windowHeight - elementTop) * parallaxSpeed;
          image2ParallaxRef.current.style.transform = `translateY(${offset}px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-cream-100" style={{ backgroundColor: "#F5F1E8" }}>
      {/* Hero Section with Boutique/Workshop Image */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          ref={heroParallaxRef}
          className="absolute inset-0 w-full h-[120%]"
        >
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
            alt="About us hero"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        
        {/* Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-900/50 to-warm-900/70 z-10" />
        
        {/* Overlay Text */}
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair text-warm-50 mb-6 tracking-wide font-normal">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-warm-100 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
            Where Passion Meets Beauty and Sophistication
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32" style={{ backgroundColor: "#F5F1E8" }}>
        {/* Welcome to Elegance Section - Two Column Layout */}
        <section className="mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-warm-900 mb-8 font-normal tracking-[0.02em]">
                Welcome to Elegance
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
                <p>
                  Every garment tells a story—a story of craftsmanship, passion, and the
                  pursuit of perfection. We invite you to become part of this narrative,
                  where each piece is not just clothing, but a work of art that celebrates
                  the beauty within you.
                </p>
              </div>
            </div>
            
            {/* Right: Clothing Rack Image with Parallax */}
            <div className="order-1 lg:order-2 relative h-[400px] lg:h-[600px] overflow-hidden rounded-sm">
              <div 
                ref={image1ParallaxRef}
                className="absolute inset-0 w-full h-[120%]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
                  alt="Fashion collection"
                  fill
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-24 lg:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-warm-900 mb-4 font-normal tracking-[0.02em]">
              Our Values
            </h2>
            <p className="text-warm-600 font-light text-lg max-w-2xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Quality First - Diamond Icon */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center shadow-lg">
                  <svg 
                    className="w-10 h-10 text-gold-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" 
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-playfair text-warm-900 mb-4 font-normal">
                Quality First
              </h3>
              <p className="text-warm-700 font-light leading-relaxed">
                We source only the finest materials and craftsmanship, ensuring every piece
                meets our exacting standards of excellence.
              </p>
            </div>

            {/* Elegant Design - Palette Icon */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center shadow-lg">
                  <svg 
                    className="w-10 h-10 text-gold-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M9.53 16.122a3 3 0 00-5.78 1.128 3 3 0 005.78-1.128zM12 9v6m-3-3h6m-6 0h6m6-6a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-playfair text-warm-900 mb-4 font-normal">
                Elegant Design
              </h3>
              <p className="text-warm-700 font-light leading-relaxed">
                Every piece reflects sophistication and modern aesthetics, inspired by
                the world&apos;s most beautiful fashion destinations.
              </p>
            </div>

            {/* Sustainability - Leaf Icon */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center shadow-lg">
                  <svg 
                    className="w-10 h-10 text-gold-600" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66c.69-2.34 1.94-4.5 3.29-6.24C10.5 14.5 12.5 13 15 13c.83 0 1.5-.67 1.5-1.5S15.83 10 15 10c-1.5 0-2.83.67-3.75 1.75C9.5 10.5 8.5 9 7 9c-.83 0-1.5.67-1.5 1.5S6.17 12 7 12c.5 0 .9-.2 1.2-.5C9.5 13.5 11 15 13 16c-1.5 1.5-3 3.5-4.5 5.5l1.5 1c1.5-2 3-4 4.5-6 1.5-1.5 3-3 4.5-4.5C19.5 12.5 20 11.5 20 10.5c0-1.38-1.12-2.5-2.5-2.5C16.5 8 16.83 8 17 8z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-playfair text-warm-900 mb-4 font-normal">
                Sustainability
              </h3>
              <p className="text-warm-700 font-light leading-relaxed">
                Committed to ethical and sustainable fashion practices, ensuring our
                beautiful pieces also respect our planet.
              </p>
            </div>
          </div>
        </section>

        {/* Our Journey Section with Parallax Image */}
        <section className="relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image with Parallax */}
            <div className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-sm">
              <div 
                ref={image2ParallaxRef}
                className="absolute inset-0 w-full h-[120%]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80"
                  alt="Fashion elegance"
                  fill
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Right: Narrative Text */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-warm-900 mb-8 font-normal tracking-[0.02em]">
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
                <p>
                  Today, we continue to honor our commitment to excellence, bringing you
                  collections that blend timeless elegance with contemporary sophistication,
                  ensuring every piece you choose becomes a cherished part of your wardrobe.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
