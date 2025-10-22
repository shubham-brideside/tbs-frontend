import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Wedding = {
  id: string;
  couple: string;
  city: string;
  culture: string;
  style: string;
  cover: string;
  photosCount: number;
};

const WEDDINGS: Wedding[] = [
  {
    id: "mumbai-01",
    couple: "Nastasia and Jeet",
    city: "Mumbai",
    culture: "North Indian",
    style: "Grand",
    cover: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?q=80&w=1400&auto=format&fit=crop",
    photosCount: 57,
  },
  {
    id: "udaipur-01",
    couple: "Palak and Aarjav",
    city: "Udaipur",
    culture: "Marwari",
    style: "Destination",
    cover: "https://images.unsplash.com/photo-1623937454464-7b5b3f4be9b3?q=80&w=1400&auto=format&fit=crop",
    photosCount: 170,
  },
  {
    id: "delhi-01",
    couple: "Shradha and Nitesh",
    city: "Delhi NCR",
    culture: "Punjabi",
    style: "Modern",
    cover: "https://images.unsplash.com/photo-1604909052743-c414e8fbfdcf?q=80&w=1400&auto=format&fit=crop",
    photosCount: 211,
  },
];

export default function RealWeddings() {
  const [city, setCity] = useState<string>("");
  const [culture, setCulture] = useState<string>("");
  const [style, setStyle] = useState<string>("");

  const cities = useMemo(() => ["Top", "Popular", "Other", "Destination", "International"], []);
  const cultures = useMemo(
    () => ["North Indian", "South Indian", "Bengali", "Marathi", "Punjabi", "Others"],
    []
  );
  const styles = useMemo(
    () => ["Destination", "Grand", "Pocket Friendly", "Intimate", "Modern", "International"],
    []
  );

  const filtered = WEDDINGS.filter((w) => {
    const cityOk = !city || city === "Top" || city === "Popular" || city === "Other" || city === "Destination" || city === "International"; // placeholder buckets
    const cultureOk = !culture || w.culture === culture || culture === "Others";
    const styleOk = !style || w.style === style || style === "Pocket Friendly"; // placeholder mapping
    return cityOk && cultureOk && styleOk;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative h-48 w-full overflow-hidden rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1552439242-8c8431bd2f96?q=80&w=1800&auto=format&fit=crop"
          className="h-full w-full object-cover"
          alt="Real weddings hero"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl font-extrabold md:text-4xl">Real Weddings</h1>
          <p className="mt-2 max-w-2xl text-white/90">Real couples. Real inspiration.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded border px-3 py-2">
          <option value="">By Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={culture} onChange={(e) => setCulture(e.target.value)} className="rounded border px-3 py-2">
          <option value="">By Culture</option>
          {cultures.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={style} onChange={(e) => setStyle(e.target.value)} className="rounded border px-3 py-2">
          <option value="">By Style</option>
          {styles.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input placeholder="Search couples, city" className="rounded border px-3 py-2" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {filtered.map((w) => (
          <Link key={w.id} to={`/real-weddings/${w.id}`} className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow">
            <div className="grid grid-cols-2 gap-1 p-1">
              <img src={w.cover} alt={w.couple} className="col-span-2 h-44 w-full rounded object-cover" />
              <img src={w.cover + "&1"} alt="thumb" className="h-24 w-full rounded object-cover" />
              <div className="relative">
                <img src={w.cover + "&2"} alt="thumb" className="h-24 w-full rounded object-cover" />
                <span className="absolute inset-0 flex items-center justify-center rounded bg-black/40 text-sm font-semibold text-white">
                  + {w.photosCount} Photos
                </span>
              </div>
            </div>
            <div className="px-4 pb-4 pt-2">
              <h3 className="font-semibold">{w.couple}</h3>
              <p className="text-sm text-gray-600">{w.city} • {w.culture} • {w.style}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


