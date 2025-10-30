import React, { useMemo, useState, useEffect } from "react";
import { IMAGES } from "../../assets/images";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

type CategoryKey = "photography" | "makeup" | "decor";

export default function PlanningForm() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const contactFromQuery = params.get("phone") || "";
  const dealIdFromQuery = params.get("dealId") || "";
  
  // Debug: Log query params on mount
  useEffect(() => {
    console.log("📋 Planning Form Query Params:", {
      phone: contactFromQuery,
      dealId: dealIdFromQuery,
      hasPhone: !!contactFromQuery,
      hasDealId: !!dealIdFromQuery,
    });
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(0); // 0: categories, 1..5 steps
  const [selectedCategories, setSelectedCategories] = useState<Record<CategoryKey, boolean>>({
    photography: false,
    makeup: false,
    decor: false,
  });
  const [city, setCity] = useState<string>("");
  const [manualVenue, setManualVenue] = useState<string>("");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [selectedCitySection, setSelectedCitySection] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(() => {
    const istDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    return istDate.getFullYear();
  });
  const [month, setMonth] = useState<string>(() => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const istDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    return monthNames[istDate.getMonth()];
  });
  const [dateRange, setDateRange] = useState<string>("");
  const [dateNotConfirmed, setDateNotConfirmed] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [guests, setGuests] = useState<string>("");
  const [guestsNotDecided, setGuestsNotDecided] = useState(false);
  const [budget, setBudget] = useState<{ photography?: number; makeup?: number; decor?: number }>({});
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Simulate initial page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Clear selected date if it becomes invalid when month/year changes
  useEffect(() => {
    if (!selectedDate || !year || !month || dateNotConfirmed) return;
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = monthNames.indexOf(month);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    // Check if selected date exists in the new month (e.g., Feb doesn't have day 31)
    if (selectedDate > daysInMonth) {
      setSelectedDate(null);
      setDateRange("");
      return;
    }
    
    // Check if the date is in the past
    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    
    const isPast = 
      year < todayYear ||
      (year === todayYear && monthIndex < todayMonth) ||
      (year === todayYear && monthIndex === todayMonth && selectedDate < todayDate);
    
    if (isPast) {
      setSelectedDate(null);
      setDateRange("");
    }
  }, [year, month, selectedDate, dateNotConfirmed]);

  const canProceedCategories = useMemo(
    () => Object.values(selectedCategories).some(Boolean),
    [selectedCategories]
  );

  function toggleCategory(k: CategoryKey) {
    setSelectedCategories((s) => ({ ...s, [k]: !s[k] }));
  }

  const stepsTotal = 5;

  if (isLoading) {
    return <Loader />;
  }

  if (showThankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9F9F9' }}>
        <div className="text-center p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#000000', fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
              Thank You !!
            </h1>
          </div>
          
          <div className="rounded-2xl shadow-lg p-8 mb-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#000000', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            <p className="text-xl mb-6 leading-relaxed" style={{ color: '#000000' }}>
              🌸 Your dream wedding journey begins now! 🌸
            </p>
            <p className="text-lg mb-4" style={{ color: '#1A1A1A' }}>
              Our expert team will connect with you shortly
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#FFFFFF', borderColor: '#000000', border: '1px solid' }}>
                <p className="font-semibold" style={{ color: '#000000' }}>Photographers</p>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#FFFFFF', borderColor: '#000000', border: '1px solid' }}>
                <p className="font-semibold" style={{ color: '#000000' }}>Makeup Artists</p>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#FFFFFF', borderColor: '#000000', border: '1px solid' }}>
                <p className="font-semibold" style={{ color: '#000000' }}>Decor & Planning</p>
              </div>
            </div>
            <p className="text-lg mb-4" style={{ color: '#1A1A1A' }}>
              <strong>Our Success Stats:</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFFFFF', borderColor: '#000000', border: '1px solid' }}>
                <div className="text-2xl font-bold" style={{ color: '#000000' }}>10K+</div>
                <div className="text-sm" style={{ color: '#1A1A1A' }}>Happy Couples</div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFFFFF', borderColor: '#000000', border: '1px solid' }}>
                <div className="text-2xl font-bold" style={{ color: '#000000' }}>500+</div>
                <div className="text-sm" style={{ color: '#1A1A1A' }}>Real Weddings</div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFFFFF', borderColor: '#000000', border: '1px solid' }}>
                <div className="text-2xl font-bold" style={{ color: '#000000' }}>98%</div>
                <div className="text-sm" style={{ color: '#1A1A1A' }}>Satisfaction Rate</div>
              </div>
            </div>
          </div>
          
          <p className="text-lg font-medium" style={{ color: '#000000' }}>
            🌸 We can't wait to make your special day absolutely magical! 🌸
          </p>
          <p className="text-sm mt-4" style={{ color: '#1A1A1A' }}>
            You'll receive a call within 24 hours from our wedding planning experts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {submitting && <Loader />}
      
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2" style={{ backgroundColor: '#F9F9F9' }}>
        {/* Left: wedding image background */}
        <div className="hidden lg:flex relative items-end justify-center p-10 overflow-hidden">
        <img
          src="https://bridesideimages.blob.core.windows.net/tbs-website-images/WhatsApp Image 2025-10-25 at 16.19.44.jpeg"
          alt="Beautiful Wedding Photography"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = IMAGES.placeholder;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="relative z-10 text-center text-white pb-16">
          <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
            Your Dream Wedding Awaits
          </h3>
          <p className="text-xl opacity-90">
            Let us help you plan the perfect celebration
          </p>
        </div>
      </div>

      {/* Right: steps */}
      <div className="flex flex-col justify-center p-6 sm:p-10" style={{ backgroundColor: '#F9F9F9' }}>
        {/* Step header */}
        {step === 0 ? (
          <>
            <h2 className="text-2xl font-extrabold" style={{ color: '#000000', fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>Select Your Wedding Services</h2>
            <p className="mt-1" style={{ color: '#1A1A1A' }}>Choose one or more services</p>
            <div className="mt-6 grid gap-4">
              {[
                { k: "photography", title: "Photography", desc: "Professional wedding photography and videography" },
                { k: "makeup", title: "Makeup", desc: "Bridal makeup and beauty services" },
                { k: "decor", title: "Planning & Decor", desc: "Complete wedding planning and decoration" },
              ].map((c: any) => {
                const active = selectedCategories[c.k as CategoryKey];
                return (
                  <label key={c.k} className={"flex cursor-pointer items-start gap-4 rounded-2xl border p-4 shadow-sm " + (active ? "border-black" : "border-gray-200 hover:shadow hover:border-gray-300") } style={{ background: active ? '#FFFFFF' : '#FFFFFF', borderColor: '#000000', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                    <input type="checkbox" className="mt-1" checked={active} onChange={() => toggleCategory(c.k as CategoryKey)} />
                    <span className="flex-1">
                      <span className="block text-lg font-semibold" style={{ color: '#000000' }}>{c.title}</span>
                      <span className="block text-sm" style={{ color: '#1A1A1A' }}>{c.desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <button disabled={!canProceedCategories} onClick={() => setStep(1)} className={"mt-8 w-full rounded-md px-6 py-3 font-semibold text-white shadow " + (canProceedCategories ? "hover:opacity-95" : "bg-gray-300 cursor-not-allowed")} style={{ backgroundColor: canProceedCategories ? '#000000' : undefined, borderColor: canProceedCategories ? '#000000' : undefined }}>Next</button>
          </>
        ) : (
          <>
            <p className="text-sm" style={{ color: '#1A1A1A' }}>{step}/{stepsTotal} steps</p>
            {step === 1 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold" style={{ color: '#000000', fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>Where do you want to host your wedding?</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {label: "Top Cities", key: "top"},
                    {label: "Popular Cities", key: "popular"},
                    {label: "Other Cities", key: "other"},
                    {label: "States", key: "states"},
                    {label: "International Cities", key: "intl"},
                    {label: "Not listed here", key: "not_listed"},
                  ].map(b => (
                    <button
                      key={b.key}
                      onClick={() => {
                        if (b.key === "not_listed") { setCity("Not listed"); setManualVenue(""); return; }
                        setSelectedCitySection(b.key);
                        setShowCityPicker(true);
                      }}
                      className={"rounded-2xl border p-6 text-center shadow-sm hover:shadow " + (city && city!=="Not listed"?"":"")} style={{ background: '#FFFFFF', borderColor: '#000000', color: '#000000', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
                
                {city && city !== "Not listed" && (
                  <div className="mt-6 p-4 rounded-xl border-2 border-black bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>Selected Venue:</p>
                        <p className="text-2xl font-bold mt-1" style={{ color: '#000000', fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>{city}</p>
                      </div>
                      <button 
                        onClick={() => { setCity(""); setManualVenue(""); }}
                        className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
                        style={{ borderColor: '#000000', color: '#000000' }}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}

                {city === "Not listed" && (
                  <div className="mt-6 p-4 rounded-xl border-2 border-black bg-white">
                    <label className="block text-sm font-medium" style={{ color: '#1A1A1A' }}>Enter your city/venue</label>
                    <input
                      value={manualVenue}
                      onChange={(e)=>setManualVenue(e.target.value)}
                      placeholder="Type your venue or city"
                      className="mt-2 w-full rounded border px-3 py-3"
                      style={{ borderColor: '#000000', background: '#FFFFFF', color: '#000000' }}
                    />
                    <div className="flex justify-end mt-3">
                      <button 
                        onClick={() => { setCity(""); setManualVenue(""); }}
                        className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
                        style={{ borderColor: '#000000', color: '#000000' }}
                      >
                        Change selection
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  <button onClick={()=>setStep(0)} className="rounded border px-4 py-2" style={{ borderColor: '#000000', color: '#000000' }}>Back</button>
                  <button 
                    disabled={!city || (city === "Not listed" && !manualVenue.trim())}
                    onClick={()=>setStep(2)} 
                    className={"rounded px-6 py-2 text-white " + ((city && (city !== "Not listed" || manualVenue.trim()))?"hover:opacity-95":"bg-gray-300")} 
                    style={{ backgroundColor: (city && (city !== "Not listed" || manualVenue.trim())) ? '#000000' : undefined, borderColor: (city && (city !== "Not listed" || manualVenue.trim())) ? '#000000' : undefined }}
                  >
                    Next
                  </button>
                </div>

                {showCityPicker && (
                  <CityPicker 
                    onClose={()=>{setShowCityPicker(false); setSelectedCitySection(null);}} 
                    onSelect={(c)=>{setCity(c); setShowCityPicker(false); setSelectedCitySection(null);}} 
                    defaultSection={selectedCitySection}
                  />
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold" style={{ color: '#000000', fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>When do you plan to have your wedding?</h2>
                <div className="mt-4 flex gap-2">
                  {[2025,2026,2027].map((y)=> (
                    <button 
                      key={y} 
                      onClick={()=>!dateNotConfirmed && setYear(y)} 
                      disabled={dateNotConfirmed}
                      className={"rounded-full px-4 py-2 " + (year===y?"":"") + (dateNotConfirmed ? " opacity-50 cursor-not-allowed" : "")} 
                      style={{ 
                        background: year===y && !dateNotConfirmed ? '#000000' : '#FFFFFF', 
                        borderColor: '#000000', 
                        color: year===y && !dateNotConfirmed ? '#FFFFFF' : '#000000', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <select 
                    value={month} 
                    onChange={(e)=>setMonth(e.target.value)} 
                    disabled={dateNotConfirmed}
                    className={"rounded border px-3 py-2" + (dateNotConfirmed ? " opacity-50 cursor-not-allowed" : "")} 
                    style={{ borderColor: '#000000', background: dateNotConfirmed ? '#F3F4F6' : '#FFFFFF', color: '#000000' }}
                  >
                    {"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ").map((m)=>(<option key={m} value={m}>{m}</option>))}
                  </select>
                  <input 
                    value={selectedDate ? selectedDate.toString() : ""} 
                    onChange={(e)=>setDateRange(e.target.value)} 
                    placeholder="Select your date" 
                    onClick={() => !dateNotConfirmed && setShowCalendar(!showCalendar)}
                    disabled={dateNotConfirmed}
                    readOnly
                    className={"rounded border px-3 py-2" + (dateNotConfirmed ? " opacity-50 cursor-not-allowed" : " cursor-pointer")} 
                    style={{ borderColor: '#000000', background: dateNotConfirmed ? '#F3F4F6' : '#FFFFFF', color: '#000000' }} 
                  />
                </div>
                <label className="mt-3 flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={dateNotConfirmed} 
                    onChange={(e)=>{
                      setDateNotConfirmed(e.target.checked);
                      if (e.target.checked) {
                        setShowCalendar(false);
                      }
                    }} 
                  /> 
                  The wedding date isn't confirmed yet
                </label>
                
                {showCalendar && (
                  <MiniCalendar 
                    year={year || 2025} 
                    month={month} 
                    selectedDate={selectedDate}
                    onDateSelect={(date) => {
                      setSelectedDate(date);
                      setDateRange(date.toString());
                      setShowCalendar(false);
                    }}
                    onClose={() => setShowCalendar(false)}
                  />
                )}
                
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(1)} className="rounded border px-4 py-2" style={{ borderColor: '#000000', color: '#000000' }}>Back</button><button onClick={()=>setStep(3)} className="rounded hover:opacity-95 px-6 py-2 text-white" style={{ backgroundColor: '#000000', borderColor: '#000000' }}>Next</button></div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold" style={{ color: '#000000', fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>How many guests are you expecting?</h2>
                <input 
                  value={guests} 
                  onChange={(e)=>{
                    const value = e.target.value.replace(/\D/g,"");
                    setGuests(value);
                  }} 
                  placeholder="e.g., 150" 
                  disabled={guestsNotDecided}
                  className={"mt-4 w-full rounded border px-3 py-3" + (guestsNotDecided ? " opacity-50 cursor-not-allowed" : "")} 
                  style={{ borderColor: '#000000', background: guestsNotDecided ? '#F3F4F6' : '#FFFFFF', color: '#000000' }} 
                />
                <p className="mt-2 text-sm" style={{ color: '#1A1A1A' }}>💡 Mention the total guests of your wedding day</p>
                <label className="mt-3 flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={guestsNotDecided} 
                    onChange={(e)=>{
                      setGuestsNotDecided(e.target.checked);
                      if (e.target.checked) {
                        setGuests("");
                      }
                    }} 
                  /> 
                  Not Decided yet
                </label>
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(2)} className="rounded border px-4 py-2" style={{ borderColor: '#000000', color: '#000000' }}>Back</button><button disabled={!guests && !guestsNotDecided} onClick={()=>setStep(4)} className={"rounded px-6 py-2 text-white " + ((guests || guestsNotDecided)?"hover:opacity-95":"bg-gray-300")} style={{ backgroundColor: (guests || guestsNotDecided) ? '#000000' : undefined, borderColor: (guests || guestsNotDecided) ? '#000000' : undefined }}>Next</button></div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold" style={{ color: '#000000', fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>What is your estimated budget?</h2>
                <div className="mt-6 grid gap-6">
                  {selectedCategories.photography && (
                    <BudgetSlider label="Photography" min={100000} max={5000000} value={budget.photography} onChange={(v)=>{
                      setBudget(b=>({...b, photography:v}));
                    }} helper="Professional photography and videography services" />
                  )}
                  {selectedCategories.makeup && (
                    <BudgetSlider label="Makeup" min={40000} max={600000} value={budget.makeup} onChange={(v)=>{
                      setBudget(b=>({...b, makeup:v}));
                    }} helper="Bridal makeup and beauty services for all events" />
                  )}
                  {selectedCategories.decor && (
                    <BudgetSlider label="Planning & Decor" min={300000} max={10000000} value={budget.decor} onChange={(v)=>{
                      setBudget(b=>({...b, decor:v}));
                    }} helper="Complete wedding planning and decoration" />
                  )}
                </div>
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(3)} className="rounded border px-4 py-2" style={{ borderColor: '#000000', color: '#000000' }}>Back</button><button onClick={()=>setStep(5)} className="rounded hover:opacity-95 px-6 py-2 text-white" style={{ backgroundColor: '#000000', borderColor: '#000000' }}>Next</button></div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold" style={{ color: '#000000', fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>What shall we call you?</h2>
                <input 
                  value={name} 
                  onChange={(e)=>setName(e.target.value)} 
                  placeholder="Your name" 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && name && !submitting) {
                      // Trigger submit
                      const submitButton = document.querySelector('button[type="button"]') as HTMLButtonElement;
                      if (submitButton && !submitButton.disabled) {
                        submitButton.click();
                      }
                    }
                  }}
                  className="mt-4 w-full rounded border px-3 py-3" style={{ borderColor: '#000000', background: '#FFFFFF', color: '#000000' }} 
                />
                <button
                  disabled={!name || submitting}
                  onClick={async ()=>{
                    if (!name || submitting) return;
                    setSubmitting(true);
                    // Build payload per spec
                    const selectedNames: Array<"Photography"|"Makeup"|"Planning & Decor"> = [];
                    if (selectedCategories.photography) selectedNames.push("Photography");
                    if (selectedCategories.makeup) selectedNames.push("Makeup");
                    if (selectedCategories.decor) selectedNames.push("Planning & Decor");
                    const monthIndex = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].indexOf(month);
                    const deriveDate = () => {
                      const trimmed = (dateRange || "").trim();
                      // if already YYYY-MM-DD
                      if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
                      // if only day like "22", combine with selected year+month
                      if (/^\d{1,2}$/.test(trimmed) && year && monthIndex >= 0) {
                        const d = trimmed.padStart(2, '0');
                        const m = String(monthIndex + 1).padStart(2,'0');
                        return `${year}-${m}-${d}`;
                      }
                      // if date not confirmed or missing, omit
                      if (dateNotConfirmed) return undefined as unknown as string;
                      // fallback to first of month when year+month known
                      if (year && monthIndex >= 0) {
                        const m = String(monthIndex + 1).padStart(2,'0');
                        return `${year}-${m}-01`;
                      }
                      return undefined as unknown as string;
                    };
                    const eventDate = deriveDate();
                    const catObjs = selectedNames.map((n)=>({
                      name: n,
                      venue: (city === "Not listed" ? manualVenue : city) || undefined,
                      budget:
                        n === "Photography" ? budget.photography :
                        n === "Makeup" ? budget.makeup :
                        budget.decor,
                      event_date: eventDate,
                      expected_gathering: guests ? Number(guests) : undefined,
                    }));
                    const payload = {
                      name,
                      categories: catObjs,
                      contact_number: contactFromQuery || undefined,
                    };
                    try {
                      if (dealIdFromQuery) {
                        console.log("📤 Calling PUT /api/deals/{id}/details with dealId:", dealIdFromQuery);
                        const detailsPayload = { name, categories: catObjs };
                        console.log("📦 Payload:", detailsPayload);
                        const response = await fetch(
                          `https://thebrideside-agdnavgxhhcffpby.centralindia-01.azurewebsites.net/api/deals/${dealIdFromQuery}/details`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              accept: "application/json",
                            },
                            body: JSON.stringify(detailsPayload),
                          }
                        );
                        console.log("✅ PUT /api/deals/{id}/details response:", response.status, response.statusText);
                      } else {
                        console.log("📤 No dealId found, calling POST /api/deals/init");
                        console.log("📦 Contact number:", contactFromQuery);
                        // fallback: create if no id present
                        const response = await fetch(
                          "https://thebrideside-agdnavgxhhcffpby.centralindia-01.azurewebsites.net/api/deals/init",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              accept: "application/json",
                            },
                            body: JSON.stringify({ contact_number: contactFromQuery || undefined }),
                          }
                        );
                        console.log("✅ POST /api/deals/init response:", response.status, response.statusText);
                      }
                    } catch(e) {
                      console.error("❌ API call failed:", e);
                      // ignore errors; you can surface a toast if needed
                    } finally {
                      setSubmitting(false);
                      setShowThankYou(true);
                    }
                  }}
                  className={
                    "mt-6 w-full rounded px-6 py-3 font-semibold text-white " +
                    (name && !submitting ? "hover:opacity-95" : "bg-gray-300 cursor-not-allowed")
                  }
                  style={{ backgroundColor: (name && !submitting) ? '#000000' : undefined, borderColor: (name && !submitting) ? '#000000' : undefined }}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                <div className="mt-4 text-sm" style={{ color: '#1A1A1A' }}>We will contact you with personalized recommendations.</div>
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(4)} className="rounded border px-4 py-2" style={{ borderColor: '#000000', color: '#000000' }}>Back</button></div>
              </div>
            )}
          </>
        )}
      </div>
      </div>
    </>
  );
}

function CityPicker({ onClose, onSelect, defaultSection }: { onClose: () => void; onSelect: (city: string) => void; defaultSection?: string | null }) {
  const sections: Array<{ title: string; cities: string[]; key: string }> = [
    {
      title: "Top Cities",
      key: "top",
      cities: [
        "Delhi NCR","Mumbai","Bangalore","Hyderabad","Chennai","Pune","Lucknow","Jaipur","Kolkata","Chandigarh"
      ],
    },
    {
      title: "Popular Cities",
      key: "popular",
      cities: [
        "Gurgaon","Goa","Udaipur","Jim Corbett","Indore","Agra","Kanpur","Ahmedabad","Navi Mumbai","Kochi"
      ],
    },
    {
      title: "Other Cities",
      key: "other",
      cities: [
        "Ludhiana","Jodhpur","Patna","Ranchi","Agra","Amritsar","Rishikesh","Varanasi","Nainital","Alwar","Shimla","Srinagar","Mysore","Coimbatore","Bhopal","Indore","Patiala","Surat","Ahmedabad","Nagpur","Jammu","Mount Abu","Mahabalipuram","Darjeeling","Bhubaneswar","Tirupati","Guwahati","Pondicherry","Bikaner","Vishakhapatnam","Kottayam","Kumarakom","Ranthambhore","Dehradun","Thane","Vadodara","Raipur"
      ],
    },
    {
      title: "States",
      key: "states",
      cities: [
        "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
      ],
    },
    { title: "International Cities", key: "intl", cities: ["Dubai","Thailand","Bali","Abu Dhabi","Vietnam"] },
  ];

  // Filter sections based on defaultSection - show only the selected section
  const filteredSections = defaultSection 
    ? sections.filter(sec => sec.key === defaultSection)
    : sections;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ 
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden"
        style={{ 
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "#E5E7EB" }}>
          <h3 
            className="text-2xl font-bold"
            style={{ 
              color: '#000000',
              fontFamily: "'Playfair Display', 'Times New Roman', serif"
            }}
          >
            Select City
          </h3>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-all duration-200"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5 text-gray-600"
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
        </div>
        {/* Content */}
        <div className="p-6 sm:p-8">
          {filteredSections.map(sec => {
            return (
              <div
                key={sec.title}
                id={`city-section-${sec.key}`}
                className="w-full"
              >
                <h4 
                  className="text-lg font-semibold mb-4 pb-2 border-b"
                  style={{ 
                    color: '#000000',
                    borderColor: "#E5E7EB",
                    fontFamily: "'Playfair Display', 'Times New Roman', serif"
                  }}
                >
                  {sec.title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sec.cities.map(c => (
                    <button
                      key={c}
                      className="w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 group active:scale-[0.98]"
                      style={{ 
                        borderColor: "#E5E7EB",
                        color: '#000000'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#000000';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = '#000000';
                        e.currentTarget.style.borderColor = '#E5E7EB';
                      }}
                      onClick={() => onSelect(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BudgetSlider({ label, min, max, value, onChange, helper }:{ label:string; min:number; max:number; value:number|undefined; onChange:(v:number)=>void; helper:string }){
  const current = value ?? min;
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: '#000000', background: '#FFFFFF', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <div className="flex items-center justify-between"><h3 className="text-lg font-semibold" style={{ color: '#000000' }}>{label} Budget</h3><span className="font-bold" style={{ color: '#000000' }}>₹{Math.round(current/1000)}K</span></div>
      <input type="range" min={min} max={max} value={current} onChange={(e)=>onChange(Number(e.target.value))} className="mt-3 w-full" />
      <div className="mt-2 flex justify-between text-sm" style={{ color: '#1A1A1A' }}><span>₹{Math.round(min/1000)}K</span><span>₹{Math.round(max/100000)} Lakhs</span></div>
      <p className="mt-3 text-sm" style={{ color: '#000000' }}>💡 {helper}</p>
    </div>
  );
}

function MiniCalendar({ year, month, selectedDate, onDateSelect, onClose }: {
  year: number;
  month: string;
  selectedDate: number | null;
  onDateSelect: (date: number) => void;
  onClose: () => void;
}) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = monthNames.indexOf(month);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
  
  // Get today's date in IST timezone
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  
  // Helper function to check if a date is in the past
  const isPastDate = (day: number): boolean => {
    if (year < todayYear) return true;
    if (year === todayYear && monthIndex < todayMonth) return true;
    if (year === todayYear && monthIndex === todayMonth && day < todayDate) return true;
    return false;
  };
  
  const days = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="mt-4 p-4 rounded-lg shadow-lg border" style={{ background: '#FFFFFF', borderColor: '#000000', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold" style={{ color: '#000000' }}>{month} {year}</h4>
        <button onClick={onClose} className="hover:text-gray-700" style={{ color: '#1A1A1A' }}>✕</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 font-medium" style={{ color: '#1A1A1A' }}>{day}</div>
        ))}
        {days.map((day, index) => {
          const isPast = day !== null && isPastDate(day);
          return (
            <button
              key={index}
              onClick={() => day && !isPast && onDateSelect(day)}
              disabled={!day || isPast}
              className={`p-2 text-sm rounded ${
                !day 
                  ? 'text-transparent cursor-default' 
                  : isPast
                    ? 'opacity-40 cursor-not-allowed bg-gray-100'
                    : day === selectedDate
                      ? 'text-white'
                      : 'hover:bg-amber-100 hover:text-[#000000]'
              }`}
              style={{
                backgroundColor: day === selectedDate ? '#000000' : undefined,
                color: day === selectedDate ? '#FFFFFF' : day && !isPast ? '#000000' : undefined
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}


