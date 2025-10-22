import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Item = {
  id: string;
  title: string;
  couple: string;
  location: string;
  main: "photography" | "makeup" | "decor";
  sub: string;
  src: string;
};

const ITEMS: Item[] = [
  {
    id: "p-1",
    title: "Bride entry pose",
    couple: "Vinny and Safal",
    location: "Jaipur",
    main: "photography",
    sub: "bridal-portraits",
    src: "https://images.unsplash.com/photo-1587271613732-77336cd06c27?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "m-1",
    title: "Wedding Makeup Photo",
    couple: "Pooja and Neeraj",
    location: "Mumbai",
    main: "makeup",
    sub: "bridal",
    src: "https://images.unsplash.com/photo-1585260159943-cdfc36d1b1a8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "d-1",
    title: "Entrance decor for home wedding",
    couple: "Gala Events",
    location: "Hyderabad",
    main: "decor",
    sub: "entrance",
    src: "https://images.unsplash.com/photo-1625591340550-7190fb70d137?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function PhotosGallery() {
  const categories = useMemo(() => ["All", "Photography", "Makeup", "Planning & Decor", "Traditional", "Modern"], []);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = ITEMS.filter((i) => {
    const matchCat =
      active === "All" ||
      (active === "Photography" && i.main === "photography") ||
      (active === "Makeup" && i.main === "makeup") ||
      (active === "Planning & Decor" && i.main === "decor");
    const matchQ = i.title.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-center text-3xl font-extrabold text-gray-900">Wedding Photo Gallery</h1>
      <p className="mt-2 text-center text-gray-600">Browse through thousands of beautiful Indian wedding photos</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={pill(active === c)}>{c}</button>
          ))}
        </div>
        <div className="ml-auto flex-1 min-w-[240px] max-w-xs">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Photos & Ideas..." className="w-full rounded border px-3 py-2" />
        </div>
      </div>

      <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 [&_article]:mb-4">
        {filtered.map((i) => (
          <article key={i.id} className="break-inside-avoid overflow-hidden rounded-xl border bg-white shadow-sm">
            <Link to={`/photos/${i.id}`}>
              <img src={i.src} alt={i.title} className="w-full object-cover" />
            </Link>
            <div className="p-3 text-sm">
              <p className="font-semibold">{i.title}</p>
              <p className="text-gray-600">{i.couple} — {i.location}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function pill(active: boolean) {
  return (
    "rounded-full border px-3 py-1 text-sm " +
    (active ? "border-pink-400 bg-pink-50 text-pink-700" : "hover:bg-gray-50")
  );
}


