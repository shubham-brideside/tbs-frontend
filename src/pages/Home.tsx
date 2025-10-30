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
      <SimpleScrollArrow targetId="wedding-journey" className="mt-3 mb-3 md:mt-4 md:mb-4" />
      <HowItWorks />

      <section id="wedding-categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 md:py-7 lg:py-9" style={{ backgroundColor: '#F9F9F9' }}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative">
            <AnimatedTextReveal 
              text="Wedding Categories"
              className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight"
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
          <p className="mt-3 md:mt-4 text-base md:text-lg lg:text-xl" style={{ color: '#1A1A1A' }}>Browse through curated collections of wedding inspiration</p>
        </div>

        <div className="mt-5 md:mt-7 lg:mt-9 grid gap-4 md:gap-5 lg:gap-6">
          {categories.map((c, i) => (
            <div key={i} className="rounded-2xl border p-4 md:p-6 shadow-sm ring-1 transition-all duration-700 ease-out will-change-transform hover:shadow-xl hover:scale-[1.02]" style={{ background: '#FFFFFF', borderColor: 'rgba(209, 213, 219, 0.5)', boxShadow: '0 4px 6px -1px rgba(209, 213, 219, 0.12), 0 2px 4px -1px rgba(209, 213, 219, 0.06)' }}>
              <div
                className={`group grid items-center gap-3 md:gap-5 lg:gap-6 md:grid-cols-2 ${
                  c.align === "right" ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={c.img} 
                    alt={c.title} 
                    className={`h-64 md:h-80 w-full object-cover transition duration-500 group-hover:scale-110 ${
                      c.categoryClass === "makeup" ? "object-[center_40%]" : ""
                    }`}
                    onError={(e) => {
                      console.log('Image failed to load:', c.img);
                      e.currentTarget.src = 'https://picsum.photos/800/600?random=99';
                    }}
                    onLoad={() => console.log('Image loaded successfully:', c.img)}
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <AnimatedCategoryHeading 
                    className={`text-xl md:text-2xl lg:text-3xl font-normal category-heading ${c.categoryClass} animated-underline`}
                    style={{ color: '#000000', fontFamily: "'Times New Roman', serif" }}
                  >
                    {c.title}
                  </AnimatedCategoryHeading>
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: '#1A1A1A' }}>{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SimpleScrollArrow targetId="latest-blog" className="mt-5 md:mt-7" />
      </section>

      <section id="latest-blog" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 md:py-7 lg:py-9" style={{ backgroundColor: '#F9F9F9' }}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative">
            <AnimatedTextReveal 
              text="Latest Blog"
              className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight"
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
          <p className="mt-3 md:mt-4 text-base md:text-lg lg:text-xl" style={{ color: '#1A1A1A' }}>Expert tips, inspiration, and guides for your perfect wedding</p>
        </div>
        <div className="mt-5 md:mt-7 grid gap-3 md:gap-4 lg:gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="blog-card-content p-4 md:p-6">
                <h3 className="blog-title font-normal text-sm md:text-base leading-tight" style={{ color: '#000000', fontFamily: "'Times New Roman', serif" }}>{b.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <SimpleScrollArrow scrollToTop={true} className="mt-6 md:mt-8" />
      </section>
    </>
  );
}


function HowItWorks() {
  return (
    <section id="wedding-journey" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-7 lg:py-9 relative" style={{ 
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
              className="text-2xl md:text-4xl lg:text-5xl font-normal leading-tight"
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
        <p className="mt-2 md:mt-4 text-sm md:text-lg lg:text-xl" style={{ color: '#1A1A1A' }}>From the first consultation to your special day, we'll be with you every step of the way</p>
      </div>

      {/* Timeline grid: left/right cards with centered markers */}
      <div className="relative mx-auto max-w-6xl mt-6 md:mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-6 md:gap-9 lg:gap-14">
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
        <div className="hidden lg:block lg:col-start-3" />

        {/* Step 2 - right */}
        <div className="hidden lg:block lg:col-start-1" />
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
          <div className="hidden lg:block lg:col-start-3" />
        </div>
        <SimpleScrollArrow targetId="wedding-categories" className="mt-5 md:mt-7" />
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
      className={`mx-auto w-full max-w-[560px] sm:max-w-[640px] rounded-2xl border p-2 md:p-4 shadow-sm ring-1 transition-all duration-700 ease-out will-change-transform hover:shadow-xl hover:scale-[1.02] ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`}
      style={{ background: '#FFFFFF', borderColor: 'rgba(209, 213, 219, 0.5)', boxShadow: '0 4px 6px -1px rgba(209, 213, 219, 0.12), 0 2px 4px -1px rgba(209, 213, 219, 0.06)' }}
    >
      <AnimatedTextReveal 
        text={title}
        className="text-lg md:text-2xl lg:text-3xl font-normal leading-tight"
        style={{
          fontFamily: "'Times New Roman', serif",
          color: '#000000',
        }}
        delay={isVisible ? 200 : 0}
        duration={80}
      />
      <p className="mt-1 text-sm md:text-base leading-relaxed" style={{ color: '#1A1A1A' }}>{text}</p>
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

