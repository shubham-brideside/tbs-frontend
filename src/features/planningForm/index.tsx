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
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(0); // 0: categories, 1..5 steps
  const [selectedCategories, setSelectedCategories] = useState<Record<CategoryKey, boolean>>({
    photography: false,
    makeup: false,
    decor: false,
  });
  const [city, setCity] = useState<string>("");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [year, setYear] = useState<number | null>(2025);
  const [month, setMonth] = useState<string>(() => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[new Date().getMonth()];
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
                        if (b.key === "not_listed") { setCity("Not listed"); setStep(2); return; }
                        setShowCityPicker(true);
                      }}
                      className={"rounded-2xl border p-6 text-center shadow-sm hover:shadow " + (city && city!=="Not listed"?"":"")} style={{ background: '#FFFFFF', borderColor: '#000000', color: '#000000', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-between"><button onClick={()=>setStep(0)} className="rounded border px-4 py-2" style={{ borderColor: '#000000', color: '#000000' }}>Back</button><button disabled={!city} onClick={()=>setStep(2)} className={"rounded px-6 py-2 text-white " + (city?"hover:opacity-95":"bg-gray-300")} style={{ backgroundColor: city ? '#000000' : undefined, borderColor: city ? '#000000' : undefined }}>Next</button></div>

                {showCityPicker && (
                  <CityPicker onClose={()=>setShowCityPicker(false)} onSelect={(c)=>{setCity(c); setShowCityPicker(false); setStep(2);}} />
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mt-2 text-3xl font-extrabold" style={{ color: '#000000', fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>When do you plan to have your wedding?</h2>
                <div className="mt-4 flex gap-2">
                  {[2025,2026,2027].map((y)=> (
                    <button key={y} onClick={()=>setYear(y)} className={"rounded-full px-4 py-2 " + (year===y?"":"")} style={{ background: year===y ? '#000000' : '#FFFFFF', borderColor: '#000000', color: year===y ? '#FFFFFF' : '#000000', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>{y}</button>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <select value={month} onChange={(e)=>setMonth(e.target.value)} className="rounded border px-3 py-2" style={{ borderColor: '#000000', background: '#FFFFFF', color: '#000000' }}>
                    {"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ").map((m)=>(<option key={m} value={m}>{m}</option>))}
                  </select>
                  <input 
                    value={selectedDate ? selectedDate.toString() : ""} 
                    onChange={(e)=>setDateRange(e.target.value)} 
                    placeholder="Select your date" 
                    onClick={() => setShowCalendar(!showCalendar)}
                    readOnly
                    className="rounded border px-3 py-2 cursor-pointer" style={{ borderColor: '#000000', background: '#FFFFFF', color: '#000000' }} 
                  />
                </div>
                <label className="mt-3 flex items-center gap-2"><input type="checkbox" checked={dateNotConfirmed} onChange={(e)=>setDateNotConfirmed(e.target.checked)} /> The wedding date isn't confirmed yet</label>
                
                {showCalendar && (
                  <MiniCalendar 
                    year={year || 2025} 
                    month={month} 
                    selectedDate={selectedDate}
                    onDateSelect={(date) => {
                      setSelectedDate(date);
                      setDateRange(date.toString());
                      setShowCalendar(false);
                      // Automatically proceed to next step after date selection
                      setStep(3);
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
                <input value={guests} onChange={(e)=>{
                  const value = e.target.value.replace(/\D/g,"");
                  setGuests(value);
                  // Auto-advance to next step if 3-digit number is entered
                  if (value.length === 3) {
                    setStep(4);
                  }
                }} placeholder="e.g., 150" className="mt-4 w-full rounded border px-3 py-3" style={{ borderColor: '#000000', background: '#FFFFFF', color: '#000000' }} />
                <p className="mt-2 text-sm" style={{ color: '#1A1A1A' }}>💡 Mention the total guests of your wedding day</p>
                <label className="mt-3 flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={guestsNotDecided} 
                    onChange={(e)=>setGuestsNotDecided(e.target.checked)} 
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
                      // Check if all selected categories have budgets set
                      const newBudget = {...budget, photography: v};
                      const allBudgetsSet = Object.keys(selectedCategories).every(key => 
                        !selectedCategories[key as CategoryKey] || newBudget[key as keyof typeof newBudget] !== undefined
                      );
                      if (allBudgetsSet) {
                        setStep(5);
                      }
                    }} helper="Professional photography and videography services" />
                  )}
                  {selectedCategories.makeup && (
                    <BudgetSlider label="Makeup" min={40000} max={600000} value={budget.makeup} onChange={(v)=>{
                      setBudget(b=>({...b, makeup:v}));
                      // Check if all selected categories have budgets set
                      const newBudget = {...budget, makeup: v};
                      const allBudgetsSet = Object.keys(selectedCategories).every(key => 
                        !selectedCategories[key as CategoryKey] || newBudget[key as keyof typeof newBudget] !== undefined
                      );
                      if (allBudgetsSet) {
                        setStep(5);
                      }
                    }} helper="Bridal makeup and beauty services for all events" />
                  )}
                  {selectedCategories.decor && (
                    <BudgetSlider label="Planning & Decor" min={300000} max={10000000} value={budget.decor} onChange={(v)=>{
                      setBudget(b=>({...b, decor:v}));
                      // Check if all selected categories have budgets set
                      const newBudget = {...budget, decor: v};
                      const allBudgetsSet = Object.keys(selectedCategories).every(key => 
                        !selectedCategories[key as CategoryKey] || newBudget[key as keyof typeof newBudget] !== undefined
                      );
                      if (allBudgetsSet) {
                        setStep(5);
                      }
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
                      venue: city || undefined,
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
                        const detailsPayload = { name, categories: catObjs };
                        await fetch(
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
                      } else {
                        // fallback: create if no id present
                        await fetch(
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
                      }
                    } catch(e) {
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

function CityPicker({ onClose, onSelect }:{ onClose: ()=>void; onSelect:(city:string)=>void }){
  const sections: Array<{ title: string; cities: string[] }> = [
    {
      title: "Top Cities",
      cities: [
        "All Cities","Delhi NCR","Mumbai","Bangalore","Hyderabad","Chennai","Pune","Lucknow","Jaipur","Kolkata","Chandigarh"
      ],
    },
    {
      title: "Popular Cities",
      cities: [
        "Gurgaon","Goa","Udaipur","Jim Corbett","Indore","Agra","Kanpur","Ahmedabad","Navi Mumbai","Kochi"
      ],
    },
    {
      title: "Other Cities",
      cities: [
        "Ludhiana","Jodhpur","Patna","Ranchi","Agra","Amritsar","Rishikesh","Varanasi","Nainital","Alwar","Shimla","Srinagar","Mysore","Coimbatore","Bhopal","Indore","Patiala","Surat","Ahmedabad","Nagpur","Jammu","Mount Abu","Mahabalipuram","Darjeeling","Bhubaneswar","Tirupati","Guwahati","Pondicherry","Bikaner","Vishakhapatnam","Kottayam","Kumarakom","Ranthambhore","Dehradun","Thane","Vadodara","Raipur"
      ],
    },
    {
      title: "States",
      cities: [
        "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
      ],
    },
    { title: "International Cities", cities: ["Dubai","Thailand","Bali","Abu Dhabi","Vietnam"] },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-4 sm:p-10" onClick={onClose}>
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Select City</h3>
          <button onClick={onClose} className="rounded border px-3 py-1" style={{ color: '#000000', borderColor: '#000000' }}>Close</button>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-y-6 gap-x-16">
          {sections.map(sec => (
            <div
              key={sec.title}
              className={
                "min-w-0 " +
                (sec.title === "Other Cities" ? "pr-4 " : "") +
                (sec.title === "States" ? "pl-4 " : "")
              }
            >
              <h4 className="font-semibold" style={{ color: '#000000' }}>{sec.title}</h4>
              {sec.title === "Other Cities" ? (
                <div className="mt-2 grid grid-cols-2 gap-x-8">
                  <div className="space-y-2 pr-2">
                    {sec.cities.slice(0, Math.ceil(sec.cities.length/2)).map(c => (
                      <button key={c} className="block text-left hover:underline break-words" onClick={()=>onSelect(c)}>{c}</button>
                    ))}
                  </div>
                  <div className="space-y-2 pl-2">
                    {sec.cities.slice(Math.ceil(sec.cities.length/2)).map(c => (
                      <button key={c} className="block text-left hover:underline break-words" onClick={()=>onSelect(c)}>{c}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="mt-2 space-y-2 pr-2">
                  {sec.cities.map(c => (
                    <li key={c}>
                      <button className="text-left hover:underline break-words" onClick={()=>onSelect(c)}>{c}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && onDateSelect(day)}
            disabled={!day}
            className={`p-2 text-sm rounded hover:bg-amber-100 ${
              day === selectedDate 
                ? 'text-white' 
                : day 
                  ? 'hover:text-[#000000]' 
                  : 'text-transparent cursor-default'
            }`}
            style={{
              backgroundColor: day === selectedDate ? '#000000' : undefined,
              color: day === selectedDate ? '#000000' : day ? '#000000' : undefined
            }}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}


