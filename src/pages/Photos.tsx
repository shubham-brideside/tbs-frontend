import React, { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";

type PhotoItem = {
  id: string;
  title: string;
  couple: string;
  location: string;
  main: "photography" | "makeup" | "decor";
  sub: string;
  city: string;
  style: string;
  event: string;
  src: string;
};

const MOCK: PhotoItem[] = [
  {
    id: "1",
    title: "Bridal portrait at the mandap",
    couple: "Aanya & Rohit",
    location: "Jaipur",
    main: "photography",
    sub: "bridal-portraits",
    city: "Jaipur",
    style: "Traditional",
    event: "Wedding",
    src: "https://images.unsplash.com/photo-1587271613732-77336cd06c27?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Sangeet couple pose",
    couple: "Meera & Kunal",
    location: "Udaipur",
    main: "photography",
    sub: "sangeet",
    city: "Udaipur",
    style: "Grand",
    event: "Sangeet",
    src: "https://images.unsplash.com/photo-1520975867597-0af37a22e31f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Bridal makeup glamour",
    couple: "—",
    location: "Mumbai",
    main: "makeup",
    sub: "bridal",
    city: "Mumbai",
    style: "Glam",
    event: "Reception",
    src: "https://images.unsplash.com/photo-1585260159943-cdfc36d1b1a8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Mandap entrance decor",
    couple: "—",
    location: "Goa",
    main: "decor",
    sub: "entrance",
    city: "Goa",
    style: "Beach",
    event: "Wedding",
    src: "https://images.unsplash.com/photo-1625591340550-7190fb70d137?q=80&w=1200&auto=format&fit=crop",
  },
];

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Photos() {
  const q = useQuery();
  const [city] = useState<string>("");
  const [style] = useState<string>("");
  const [event] = useState<string>("");

  const main = (q.get("main") as PhotoItem["main"]) || "photography";
  const sub = q.get("sub") || "bridal-portraits";

  const filtered = MOCK.filter((p) => {
    if (p.main !== main) return false;
    if (sub && p.sub !== sub) return false;
    if (city && p.city !== city) return false;
    if (style && p.style !== style) return false;
    if (event && p.event !== event) return false;
    return true;
  });

  const heading =
    main === "photography"
      ? "Photography Gallery"
      : main === "makeup"
      ? "Makeup Gallery"
      : "Planning & Decor Gallery";

  const subchips: Record<string, string[]> = {
    photography: [
      "bridal-portraits",
      "couple-poses",
      "family-poses",
      "bridesmaids-groomsmen",
      "getting-ready",
      "engagement",
      "reception",
      "haldi",
      "sangeet",
      "cocktail",
    ],
    makeup: ["bridal", "engagement", "reception", "sangeet", "cocktail", "party", "simple"],
    decor: [
      "entrance",
      "haldi-backdrop",
      "couple-stage",
      "welcome-board",
      "view-blocker",
      "photo-booth",
      "food-area",
      "entertainment-stage",
      "casual-seating",
      "bar-decor",
      "props-fillers",
    ],
  } as const;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900">{heading}</h1>
      <p className="mt-2 text-gray-600">Stunning wedding inspiration</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {subchips[main].map((s) => (
          <a
            key={s}
            href={`?main=${main}&sub=${s}`}
            className={
              "inline-flex items-center rounded-full border px-3 py-1 text-sm " +
              (s === sub ? "border-pink-400 bg-pink-50 text-pink-700" : "hover:bg-gray-50")
            }
          >
            {labelize(s)}
          </a>
        ))}
      </div>

      {/* Filters removed as requested */}

      <Grid items={filtered} />
    </div>
  );
}

function Grid({ items }: { items: PhotoItem[] }) {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  return (
    <>
      <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 [&_img]:mb-4">
        {items.map((p) => (
          <figure key={p.id} className="break-inside-avoid overflow-hidden rounded-xl border bg-white shadow-sm">
            <Link to={`/photos/${p.id}`}>
              <img src={p.src} alt={p.title} className="w-full object-cover" />
            </Link>
            <figcaption className="p-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-gray-600">{p.couple} — {p.location}</p>
                </div>
                <button
                  aria-label="Save to wishlist"
                  className={
                    "ml-2 rounded-full border px-3 py-1 " +
                    (wishlist[p.id] ? "border-pink-400 bg-pink-50 text-pink-700" : "hover:bg-gray-50")
                  }
                  onClick={() => setWishlist((w) => ({ ...w, [p.id]: !w[p.id] }))}
                >
                  ♥
                </button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

function labelize(key: string) {
  return key
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace("Groomsmen", "Groomsmen");
}


