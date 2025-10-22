import HeroSection from "../components/HeroSection";
import SimpleScrollArrow from "../components/SimpleScrollArrow";
import LuxuryHeading from "../components/LuxuryHeading";
import AnimatedTextReveal from "../components/AnimatedTextReveal";
import AnimatedCategoryHeading from "../components/AnimatedCategoryHeading";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { IMAGES } from "../assets/images";
import "../styles/glassmorphism.css";

export default function Home() {
  const categories = [
    {
      title: "Photography",
      img: IMAGES.photographyCategory,
      align: "left",
      to: "/photos",
      desc: "Capture your special moments with stunning styles and poses",
      categoryClass: "photography"
    },
    {
      title: "Makeup",
      img: IMAGES.makeupCategory,
      align: "right",
      to: "/photos",
      desc: "Discover beautiful bridal makeup looks for every occasion",
      categoryClass: "makeup"
    },
    {
      title: "Planning & Decor",
      img: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_MEHENDI&HALDI1164.jpg",
      align: "left",
      to: "/photos",
      desc: "Explore creative decor ideas and planning inspiration",
      categoryClass: "planning"
    },
  ];
  
  return (
    <>
      <HeroSection />
      <SimpleScrollArrow targetId="wedding-journey" />

      <HowItWorks />

             <section id="wedding-categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: '#F9EAFB' }}>
          <div className="mx-auto max-w-4xl text-center">
            <LuxuryHeading 
              className="text-4xl md:text-6xl font-black tracking-tight"
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                color: '#4a0000',
              }}
            >
              Wedding Categories
            </LuxuryHeading>
            <p className="mt-4 text-lg md:text-xl text-gray-600">Browse through curated collections of wedding inspiration</p>
          </div>

               <div className="mt-14 grid gap-8">
                 {categories.map((c, i) => (
                   <div key={i} className="rounded-2xl border p-6 shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out will-change-transform hover:shadow-xl hover:scale-[1.02]" style={{ backgroundColor: '#F4D9EA' }}>
              <div
                       className={`group grid items-center gap-8 md:grid-cols-2 ${
                         c.align === "right" ? "md:[&>*:first-child]:order-2" : ""
                       }`}
                     >
                       <div className="relative overflow-hidden rounded-2xl">
                         <img 
                           src={c.img} 
                           alt={c.title} 
                           className={`h-80 w-full object-cover transition duration-500 group-hover:scale-110 ${
                             c.categoryClass === "makeup" ? "object-top" : ""
                           }`}
                           onError={(e) => {
                             console.log('Image failed to load:', c.img);
                             e.currentTarget.src = 'https://picsum.photos/800/600?random=99';
                           }}
                           onLoad={() => console.log('Image loaded successfully:', c.img)}
                         />
                         <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       </div>
                       <div className="space-y-4">
                        <AnimatedCategoryHeading 
                          className={`text-3xl md:text-4xl font-bold category-heading ${c.categoryClass} animated-underline`}
                        >
                          {c.title}
                        </AnimatedCategoryHeading>
                         <p className="text-gray-600 text-lg leading-relaxed">{c.desc}</p>
                         <div className="pt-4">
                           <span className="inline-flex items-center text-pink-600 font-semibold group-hover:text-pink-700 transition-colors duration-300">
                             View Gallery 
                             <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                             </svg>
                           </span>
                </div>
                </div>
              </div>
                   </div>
            ))}
        </div>
        <SimpleScrollArrow targetId="latest-blog" />
      </section>

             <section id="latest-blog" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" style={{ backgroundColor: '#F9EAFB' }}>
        <div className="mx-auto max-w-4xl text-center">
          <LuxuryHeading 
            className="text-4xl md:text-6xl font-black tracking-tight"
            style={{
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              color: '#4a0000',
            }}
          >
            Latest Blog
          </LuxuryHeading>
          <p className="mt-4 text-lg md:text-xl text-gray-600">Expert tips, inspiration, and guides for your perfect wedding</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "10 Trending Pre-Wedding Photoshoot Ideas for 2025", badge: "Photography" },
            { title: "The Ultimate Guide to Bridal Makeup", badge: "Beauty" },
            { title: "Mehndi & Jewelry: Wedding Essentials", badge: "Traditions" },
            { title: "Sangeet Night: Planning the Perfect Celebration", badge: "Events" },
          ].map((b, i) => (
                   <Link key={i} to="/blog" className="blog-card group overflow-hidden rounded-xl will-change-transform">
                     <div className="blog-image relative h-40 overflow-hidden">
                       <img
                        src={
                          i === 0 ? "https://bridesideimages.blob.core.windows.net/tbs-website-images/WhatsAppImage3.jpeg" : // Pre-wedding photoshoot
                          i === 1 ? "https://bridesideimages.blob.core.windows.net/tbs-website-images/900ebac2-9bbe-499c-a565-6debc8f4864a.jpeg" : // Bridal makeup
                          i === 2 ? "https://bridesideimages.blob.core.windows.net/tbs-website-images/99ce097a-a135-4bc8-8d83-60aae1ce63d3.jpeg" : // Mehndi & jewelry
                          "https://bridesideimages.blob.core.windows.net/tbs-website-images/fd04e187-92b3-4c80-9c8e-b7df8877ae3d.jpeg" // Sangeet night
                        }
                         className={`h-full w-full object-cover ${
                           i === 0 ? 'object-[60%_center]' : 
                           i === 1 ? 'object-top' : ''
                         }`}
                  alt="Blog"
                         onError={(e) => {
                           console.log('Blog image failed to load');
                           e.currentTarget.src = 'https://picsum.photos/800/600?random=99';
                         }}
                         onLoad={() => console.log('Blog image loaded successfully')}
                />
                       <span className="blog-badge absolute left-3 top-3 rounded-lg bg-yellow-100/90 px-3 py-1 text-xs font-medium text-amber-700 border border-amber-200">
                  {b.badge}
                </span>
              </div>
                     <div className="blog-card-content p-6">
                       <h3 className="blog-title font-semibold text-gray-900 text-sm leading-tight">{b.title}</h3>
                       <p className="blog-description mt-3 text-sm text-gray-600">Read more</p>
                       <div className="blog-link mt-2 text-sm text-amber-600 font-medium">
                         <span>Explore</span>
                         <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                         </svg>
                       </div>
              </div>
            </Link>
          ))}
        </div>
        <SimpleScrollArrow targetId="wedding-journey" className="mt-8" />
      </section>
    </>
  );
}


function HowItWorks() {
  return (
    <section id="wedding-journey" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-1 pb-4" style={{ backgroundColor: '#F9EAFB' }}>
      <div className="mx-auto max-w-4xl text-center">
        <LuxuryHeading 
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{
            fontFamily: "'Playfair Display', 'Times New Roman', serif",
            color: '#4a0000',
          }}
        >
          Your Wedding Journey
        </LuxuryHeading>
        <p className="mt-4 text-lg md:text-xl text-gray-600">From the first consultation to your special day, we'll be with you every step of the way</p>
      </div>

      {/* Timeline grid: left/right cards with centered markers */}
      <div className="relative mx-auto mt-14 grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-10">
        {/* Vertical line spanning entire timeline */}
        <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden lg:block -translate-x-1/2 z-0">
          <div className="h-full w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-indigo-400" />
        </div>

        {/* Step 1 - left */}
        <div className="col-start-1">
          <StepCard _number={1} title="Share your requirements" text="Tell us about your date, venue, budget, and preferences." />
        </div>
        <div className="hidden lg:flex col-start-2 items-center justify-center">
          <Badge n={1} />
        </div>
        <div className="lg:col-start-3" />

        {/* Step 2 - right */}
        <div className="col-start-1 lg:col-start-1" />
        <div className="hidden lg:flex col-start-2 items-center justify-center">
          <Badge n={2} />
        </div>
        <div className="lg:col-start-3">
          <StepCard _number={2} title="Get a personalized proposal" text="Get the best deals on venue, catering, and decor as per your preferences." />
        </div>

        {/* Step 3 - left */}
        <div className="col-start-1">
          <StepCard _number={3} title="Confirm and book" text="Choose what you love and let us handle the rest." />
        </div>
        <div className="hidden lg:flex col-start-2 items-center justify-center">
          <Badge n={3} />
        </div>
        <div className="lg:col-start-3" />
      </div>
      <SimpleScrollArrow targetId="wedding-categories" />
    </section>
  );
}

function AnimatedHeading({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      className={`text-4xl md:text-6xl font-extrabold tracking-tight transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{
        fontFamily: "'Playfair Display', 'Times New Roman', serif",
        color: '#4a0000',
        textShadow: isVisible ? '0 0 20px rgba(74, 0, 0, 0.4)' : 'none',
        filter: isVisible ? 'drop-shadow(0 4px 8px rgba(74, 0, 0, 0.3))' : 'none'
      }}
    >
      {children}
    </h2>
  );
}

function StepCard({ _number, title, text }: { _number?: number; title: string; text: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`rounded-2xl border p-6 shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out will-change-transform hover:shadow-xl hover:scale-[1.02] ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`}
      style={{ backgroundColor: '#F4D9EA' }}
    >
      <AnimatedTextReveal 
        text={title}
        className="text-4xl md:text-5xl font-extrabold leading-tight"
        style={{
          fontFamily: "'Playfair Display', 'Times New Roman', serif",
          color: '#4a0000',
        }}
        delay={isVisible ? 200 : 0}
        duration={80}
      />
      <p className="mt-3 max-w-xl text-gray-600">{text}</p>
    </div>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <div className="relative z-10">
      <div className="h-12 w-12 -translate-x-px rounded-full border-4 border-amber-500 bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-900 grid place-items-center font-bold shadow-md">{n}</div>
    </div>
  );
}
