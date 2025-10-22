import React from "react";
import { useParams, Link } from "react-router-dom";

export default function RealWeddingDetailPage() {
  const { id } = useParams();

  const wedding = {
    id,
    couple: "Nastasia and Jeet",
    venue: "Grand Palace, Mumbai",
    date: "Dec 12, 2024",
    budget: "₹30L - ₹50L",
    story:
      "A grand celebration blending traditional rituals with modern elegance. The couple chose pastel decor with floral accents and a royal mandap.",
    gallery: new Array(8).fill(0).map((_, i) =>
      `https://images.unsplash.com/photo-1604909052743-c414e8fbfdcf?q=80&w=1400&auto=format&fit=crop&img=${i}`
    ),
    ideas: ["Pastel floral mandap", "Bridesmaids coordinated outfits", "Sparkler exit"],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/real-weddings" className="text-pink-600">← Back to Real Weddings</Link>
      <h1 className="mt-2 text-3xl font-extrabold text-gray-900">{wedding.couple}</h1>
      <p className="mt-1 text-gray-600">{wedding.venue} • {wedding.date} • Budget {wedding.budget}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {wedding.gallery.map((g, i) => (
          <img key={i} src={g} alt="Wedding" className="h-56 w-full rounded object-cover" />
        ))}
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold">Couple Story</h2>
          <p className="mt-2 text-gray-700">{wedding.story}</p>
        </div>
        <div>
          <div className="rounded-xl border bg-white p-4">
            <h3 className="font-semibold">Inspiration Points</h3>
            <ul className="mt-2 list-disc pl-5 text-gray-700">
              {wedding.ideas.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <div className="mt-4 flex gap-2">
              <button className="rounded border px-3 py-2">Share</button>
              <button className="rounded bg-pink-600 px-3 py-2 text-white">Save</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Similar Weddings</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map((n) => (
            <Link key={n} to="/real-weddings/delhi-01" className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <img src={`https://images.unsplash.com/photo-1623937454464-7b5b3f4be9b3?q=80&w=1200&auto=format&fit=crop&n=${n}`} className="h-40 w-full object-cover" />
              <div className="p-3"><p className="font-semibold">Grand Palace Wedding</p><p className="text-sm text-gray-600">Delhi NCR</p></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


