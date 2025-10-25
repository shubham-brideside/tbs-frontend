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
      img: "https://bridesideimages.blob.core.windows.net/tbs-website-images/WhatsApp Image 2025-10-25 at 13.54.55.jpeg",
      align: "right",
      to: "/photos",
      desc: "Discover beautiful bridal makeup looks for every occasion",
      categoryClass: "makeup"
    },
    {
      title: "Planning & Decor",
      img: "https://bridesideimages.blob.core.windows.net/tbs-website-images/AMMAN_ANNISHA_WEDDING-4551.jpg",
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

             <section id="wedding-categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: '#F9F9F9' }}>
          <div className="mx-auto max-w-4xl text-center">
            <div className="relative">
              <AnimatedTextReveal 
                text="Wedding Categories"
                className="text-5xl md:text-7xl font-normal leading-tight"
              style={{
                fontFamily: "'Times New Roman', serif",
                color: '#000000',
              }}
                delay={0}
                duration={80}
              />
              <div className="mt-2 h-1 bg-gradient-to-r from-black to-white rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-black to-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-4 text-lg md:text-xl" style={{ color: '#1A1A1A' }}>Browse through curated collections of wedding inspiration</p>
          </div>

               <div className="mt-14 grid gap-8">
                 {categories.map((c, i) => (
                   <div key={i} className="rounded-2xl border p-6 shadow-sm ring-1 transition-all duration-700 ease-out will-change-transform hover:shadow-xl hover:scale-[1.02]" style={{ background: '#FFFFFF', borderColor: 'rgba(209, 213, 219, 0.5)', boxShadow: '0 4px 6px -1px rgba(209, 213, 219, 0.12), 0 2px 4px -1px rgba(209, 213, 219, 0.06)' }}>
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
                             c.categoryClass === "makeup" ? "object-[center_40%]" : ""
                           }`}
                           onError={(e) => {
                             console.log('Image failed to load:', c.img);
                             e.currentTarget.src = 'https://picsum.photos/800/600?random=99';
                           }}
                           onLoad={() => console.log('Image loaded successfully:', c.img)}
                         />
                       </div>
                       <div className="space-y-4">
                        <AnimatedCategoryHeading 
                          className={`text-3xl md:text-4xl font-normal category-heading ${c.categoryClass} animated-underline`}
                          style={{ color: '#000000', fontFamily: "'Times New Roman', serif" }}
                        >
                          {c.title}
                        </AnimatedCategoryHeading>
                         <p className="text-lg leading-relaxed" style={{ color: '#1A1A1A' }}>{c.desc}</p>
                         <div className="pt-4">
                           <span className="inline-flex items-center font-semibold transition-colors duration-300" style={{ color: '#000000' }}>
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
        <SimpleScrollArrow targetId="latest-blog" className="mt-4 mb-4" />
      </section>

             <section id="latest-blog" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: '#F9F9F9' }}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative">
            <AnimatedTextReveal 
              text="Latest Blog"
              className="text-5xl md:text-7xl font-normal leading-tight"
            style={{
              fontFamily: "'Times New Roman', serif",
              color: '#000000',
            }}
              delay={0}
              duration={80}
            />
            <div className="mt-2 h-1 bg-gradient-to-r from-black to-white rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-black to-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-lg md:text-xl" style={{ color: '#1A1A1A' }}>Expert tips, inspiration, and guides for your perfect wedding</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "10 Trending Pre-Wedding Photoshoot Ideas for 2025", badge: "Photography" },
            { title: "The Ultimate Guide to Bridal Makeup", badge: "Beauty" },
            { title: "Mehndi & Jewelry: Wedding Essentials", badge: "Traditions" },
            { title: "Sangeet Night: Planning the Perfect Celebration", badge: "Events" },
          ].map((b, i) => (
                   <div key={i} className="blog-card group overflow-hidden rounded-xl will-change-transform" style={{ background: '#FFFFFF', borderColor: 'rgba(209, 213, 219, 0.5)', boxShadow: '0 4px 6px -1px rgba(209, 213, 219, 0.12), 0 2px 4px -1px rgba(209, 213, 219, 0.06)', border: '1px solid' }}>
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
                       <span className="blog-badge absolute left-3 top-3 rounded-lg px-3 py-1 text-xs font-medium border" style={{ background: '#FFFFFF', color: '#000000', borderColor: 'rgba(209, 213, 219, 0.5)' }}>
                  {b.badge}
                </span>
              </div>
                     <div className="blog-card-content p-6">
                       <h3 className="blog-title font-normal text-sm leading-tight" style={{ color: '#000000', fontFamily: "'Times New Roman', serif" }}>{b.title}</h3>
                       <p className="blog-description mt-3 text-sm" style={{ color: '#1A1A1A' }}>Read more</p>
                       <div className="blog-link mt-2 text-sm font-medium" style={{ color: '#000000' }}>
                         <span>Explore</span>
                         <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                         </svg>
                       </div>
              </div>
            </div>
          ))}
        </div>
        <SimpleScrollArrow targetId="wedding-journey" className="mt-8" />
      </section>
    </>
  );
}


function HowItWorks() {
  return (
    <section id="wedding-journey" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-1 pb-4 relative" style={{ 
      backgroundImage: "url('https://bridesideimages.blob.core.windows.net/tbs-website-images/WhatsApp Image 2025-10-25 at 15.39.35.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Background overlay with blue tint effect and blur for aesthetic look */}
      <div className="absolute inset-0 bg-blue-50/20 backdrop-blur-sm"></div>
      <div className="relative z-10">
      <div className="mx-auto max-w-4xl text-center">
        <div className="relative">
          <AnimatedTextReveal 
            text="Your Wedding Journey"
            className="text-5xl md:text-7xl font-normal leading-tight"
          style={{
            fontFamily: "'Times New Roman', serif",
            color: '#000000',
          }}
            delay={0}
            duration={80}
          />
          <div className="mt-2 h-1 bg-gradient-to-r from-black to-white rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-black to-white rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-lg md:text-xl" style={{ color: '#1A1A1A' }}>From the first consultation to your special day, we'll be with you every step of the way</p>
      </div>

      {/* Timeline grid: left/right cards with centered markers */}
      <div className="relative mx-auto mt-14 grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-10">
        {/* Vertical line spanning entire timeline */}
        <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden lg:block -translate-x-1/2 z-0">
          <div className="h-full w-1" style={{ backgroundColor: '#000000' }} />
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
      </div>
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
      className={`text-4xl md:text-6xl font-normal tracking-tight transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{
        fontFamily: "'Times New Roman', serif",
        color: '#000000'
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
      className={`rounded-2xl border p-6 shadow-sm ring-1 transition-all duration-700 ease-out will-change-transform hover:shadow-xl hover:scale-[1.02] ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`}
      style={{ background: '#FFFFFF', borderColor: 'rgba(209, 213, 219, 0.5)', boxShadow: '0 4px 6px -1px rgba(209, 213, 219, 0.12), 0 2px 4px -1px rgba(209, 213, 219, 0.06)' }}
    >
      <AnimatedTextReveal 
        text={title}
        className="text-4xl md:text-5xl font-normal leading-tight"
        style={{
          fontFamily: "'Times New Roman', serif",
          color: '#000000',
        }}
        delay={isVisible ? 200 : 0}
        duration={80}
      />
      <p className="mt-3 max-w-xl" style={{ color: '#1A1A1A' }}>{text}</p>
    </div>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <div className="relative z-10">
      <div className="h-12 w-12 -translate-x-px rounded-full border-4 text-black grid place-items-center font-bold shadow-md" style={{ backgroundColor: '#FFFFFF', borderColor: '#000000' }}>{n}</div>
    </div>
  );
}

