import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./Loader";

export default function FloatingContactButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("+91");
  const [submitting, setSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const isValid = useMemo(() => /^\d{10}$/.test(phone.trim()), [phone]);
  
  // Hide button on start-planning page
  const isOnPlanningPage = location.pathname === "/start-planning";

  // Show tooltip briefly on mount (only if not on planning page)
  useEffect(() => {
    if (isOnPlanningPage) return;
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOnPlanningPage]);

  async function handleSubmit() {
    if (!isValid || submitting) return;
    
    setSubmitting(true);
    const contact = `${code}${phone}`;
    const q = new URLSearchParams({ phone: contact });

    try {
      console.log("📤 Calling POST /api/deals/init from floating button");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(
        "https://thebrideside-agdnavgxhhcffpby.centralindia-01.azurewebsites.net/api/deals/init",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ contact_number: contact }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      try {
        const data = await res.json();
        console.log("✅ API Response:", data);
        if (data && (data.id || data.deal_id || data.dealId)) {
          const dealId = String(data.id || data.deal_id || data.dealId);
          q.set("dealId", dealId);
          console.log("✅ Got dealId:", dealId);
        } else {
          console.log("⚠️ No dealId in response");
        }
      } catch (parseError) {
        console.log("⚠️ Failed to parse API response");
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") {
        console.log("⏱️ API call timed out after 3 seconds");
      } else {
        console.error("❌ API call failed:", e);
      }
    } finally {
      setSubmitting(false);
    }

    // Close modal before navigation to ensure smooth transition
    setIsOpen(false);
    
    console.log("🔗 Navigating to:", `/start-planning?${q.toString()}`);
    navigate(`/start-planning?${q.toString()}`);
  }

  // Don't render button on planning page
  if (isOnPlanningPage) {
    return <>{submitting && <Loader />}</>;
  }

  return (
    <>
      {submitting && <Loader />}

      {/* Floating Button Container */}
      <div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div 
            className="hidden sm:block px-4 py-2 rounded-lg shadow-lg animate-fade-in-left"
            style={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              whiteSpace: "nowrap",
              animation: "slideInFromRight 0.5s ease-out"
            }}
          >
            <p className="text-sm font-medium">Start Planning Your Wedding!</p>
          </div>
        )}

        {/* Floating Button with Pulse Animation */}
        <div className="relative">
          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: "#000000" }} />
          
          {/* Main Button */}
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
            style={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
            }}
            aria-label="Start Wedding Planning"
          >
            {/* Sparkle Effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)"
              }} 
            />
            
            {/* Phone Icon */}
            <svg
              className="w-5 h-5 sm:w-7 sm:h-7 relative z-10 transform group-hover:rotate-12 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.16.37 2.41.57 3.67.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.61.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal Backdrop with Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in overflow-y-auto"
          style={{ 
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.3s ease-out"
          }}
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Card */}
          <div
            className="relative w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-scale-up mt-auto sm:mt-0"
            style={{ 
              backgroundColor: "#FFFFFF",
              animation: "scaleUp 0.3s ease-out",
              maxHeight: "95vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Header Background */}
              <div 
              className="absolute top-0 left-0 right-0 h-24 sm:h-32 opacity-5"
              style={{
                background: "radial-gradient(circle at top right, #000000, transparent)"
              }}
            />

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 hover:rotate-90"
              aria-label="Close"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="relative p-5 sm:p-8 md:p-10">
              {/* Icon */}
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#000000",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3 leading-tight px-2"
                style={{
                  color: "#000000",
                  fontFamily: "'Playfair Display', 'Times New Roman', serif",
                }}
              >
                Let's Plan Your
                <br />
                <span style={{ 
                  background: "linear-gradient(135deg, #000000 0%, #434343 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  Dream Wedding
                </span>
              </h2>
              
              <p className="text-center text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed px-2" style={{ color: "#6B7280" }}>
                Share your contact number and our expert team will guide you through every step of your special day
              </p>

              {/* Phone Input Section */}
              <div className="space-y-4">
                <div className="flex gap-2 sm:gap-3">
                  <select
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="rounded-xl border-2 bg-white px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base flex-shrink-0 transition-all duration-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <input
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isValid && !submitting) {
                        handleSubmit();
                      }
                    }}
                    className="flex-1 rounded-xl border-2 px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base transition-all duration-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>

                {!isValid && phone.length > 0 && (
                  <div className="flex items-center gap-2 px-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm" style={{ color: "#DC2626" }}>
                      Please enter a valid 10-digit phone number
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!isValid || submitting}
                  className={
                    "w-full rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 transform " +
                    (isValid && !submitting
                      ? "hover:scale-[1.02] hover:shadow-xl text-white active:scale-[0.98]"
                      : "bg-gray-200 cursor-not-allowed text-gray-400")
                  }
                  style={{
                    backgroundColor: isValid && !submitting ? "#000000" : undefined,
                  }}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Start Your Wedding Journey →</span>
                      <span className="sm:hidden">Start Journey →</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t" style={{ borderColor: "#E5E7EB" }}>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="text-xl sm:text-2xl font-bold" style={{ color: "#000000" }}>10K+</div>
                    <div className="text-[10px] sm:text-xs" style={{ color: "#6B7280" }}>Happy Couples</div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="text-xl sm:text-2xl font-bold" style={{ color: "#000000" }}>50K+</div>
                    <div className="text-[10px] sm:text-xs" style={{ color: "#6B7280" }}>Wedding Photos</div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="text-xl sm:text-2xl font-bold" style={{ color: "#000000" }}>500+</div>
                    <div className="text-[10px] sm:text-xs" style={{ color: "#6B7280" }}>Real Weddings</div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-4 sm:mt-6 flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs px-2" style={{ color: "#9CA3AF" }}>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-center">Your information is secure and confidential</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scale-up {
          animation: scaleUp 0.3s ease-out;
        }

        .animate-fade-in-left {
          animation: slideInFromRight 0.5s ease-out;
        }
      `}</style>
    </>
  );
}

