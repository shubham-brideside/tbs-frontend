import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { getHeroImages } from "../assets/images";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedTextReveal from "./AnimatedTextReveal";
import FloatingElements from "./FloatingElements";
import Loader from "./Loader";
import "../styles/animations.css";

export default function HeroSection() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("+91");
  const isValid = useMemo(() => /^\d{10}$/.test(phone.trim()), [phone]);
  const images = getHeroImages();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % images.length
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  async function onStart() {
    // If phone is valid, hit init API then go; otherwise, just navigate to form
    if (!isValid) {
      navigate("/start-planning");
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    const contact = `${code}${phone}`;
    try {
      const res = await fetch(
        "https://thebrideside-agdnavgxhhcffpby.centralindia-01.azurewebsites.net/api/deals/init",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ contact_number: contact }),
        }
      );
      let dealId: string | undefined;
      try {
        const data = await res.json();
        if (data && (data.id || data.deal_id || data.dealId)) {
          dealId = String(data.id || data.deal_id || data.dealId);
        }
      } catch (_) {}
      const q = new URLSearchParams({ phone: contact });
      if (dealId) q.set("dealId", dealId);
      navigate(`/start-planning?${q.toString()}`);
    } catch (e) {
      navigate("/start-planning");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <>
      {submitting && <Loader />}
      
      <section className="relative h-[100vh] sm:h-[85vh] md:h-[80vh] min-h-[600px] sm:min-h-[520px] w-full overflow-hidden">
        {/* Slideshow Images */}
      {images.map((imgSrc, index) => (
        <img
          key={index}
          src={imgSrc}
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/800/600?random=99";
          }}
          alt={`Wedding Image ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-ivory-50/30 to-cream-50/30" />

      {/* Logo now in Navbar; keep hero clean */}

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <span className="mb-3 sm:mb-4 inline-block rounded-full border px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap" style={{ color: '#000000', borderColor: 'rgba(209, 213, 219, 0.5)', background: '#FFFFFF' }}>
          India's Trusted Wedding Platform
        </span>
        <div className="w-full max-w-full overflow-hidden">
          <AnimatedTextReveal 
            text="Every Bride Needs a Side"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight break-words"
            style={{
              fontFamily: "'Times New Roman', serif",
              fontWeight: 'normal',
              color: '#FFFFFF'
            }}
            delay={200}
            duration={80}
          />
        </div>
        <div className="w-full max-w-full overflow-hidden mt-2 sm:mt-4">
          <AnimatedTextReveal 
            text="The Bride Side"
            className="max-w-2xl text-xl sm:text-2xl md:text-3xl font-bold break-words"
            style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              fontWeight: 'bold',
              color: '#FFFFFF'
            }}
            delay={3500}
            duration={80}
          />
        </div>
        <div className="mt-4 sm:mt-6 md:mt-8 flex w-full max-w-xl flex-col items-stretch gap-2 sm:gap-3">
          <div className="flex w-full items-stretch gap-2">
            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="rounded border bg-white px-2 sm:px-3 py-2 sm:py-3 text-sm flex-shrink-0"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isValid && !submitting) {
                  onStart();
                }
              }}
              className="flex-1 min-w-0 rounded border px-3 py-2 sm:py-3 text-sm sm:text-base"
            />
          </div>
          <button
            onClick={onStart}
            disabled={!isValid || submitting}
            className={
              "w-full inline-flex items-center justify-center rounded-md px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow whitespace-nowrap " +
              (isValid && !submitting
                ? "hover:opacity-95 text-white border"
                : "bg-gray-300 cursor-not-allowed text-gray-500")
            }
            style={{
              backgroundColor: isValid && !submitting ? '#000000' : undefined,
              borderColor: isValid && !submitting ? '#000000' : undefined,
              boxShadow: isValid && !submitting ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : undefined
            }}
          >
            {submitting ? "Submitting..." : "Start Wedding Planning"}
          </button>
        </div>
        {!isValid && phone.length > 0 && (
          <p className="mt-1 text-xs sm:text-sm w-full max-w-xl" style={{ color: '#1A1A1A' }}>Enter a valid 10-digit number</p>
        )}
        <div className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm flex flex-wrap gap-x-2 gap-y-1 w-full max-w-xl" style={{ color: '#1A1A1A' }}>
          <span className="whitespace-nowrap"><span className="font-semibold">10K+</span> Happy Couples</span>
          <span className="hidden sm:inline">|</span>
          <span className="whitespace-nowrap"><span className="font-semibold">50K+</span> Wedding Photos</span>
          <span className="hidden sm:inline">|</span>
          <span className="whitespace-nowrap"><span className="font-semibold">500+</span> Real Weddings</span>
        </div>
      </div>
      </section>
    </>
  );
}
