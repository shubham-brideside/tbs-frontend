import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  read: string;
  cover: string;
};

const POSTS: Post[] = [
  {
    id: "prewedding-ideas",
    title: "10 Trending Pre-Wedding Photoshoot Ideas for 2025",
    excerpt: "Creative and romantic photoshoot ideas trending this year...",
    category: "Photography",
    author: "Priya Sharma",
    date: "Oct 10, 2025",
    read: "5 min read",
    cover: "https://images.unsplash.com/photo-1587271613732-77336cd06c27?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "bridal-makeup-guide",
    title: "The Ultimate Guide to Bridal Makeup: From Natural to Glamorous",
    excerpt: "Everything you need to know about choosing your bridal look...",
    category: "Beauty",
    author: "Ananya Verma",
    date: "Oct 8, 2025",
    read: "7 min read",
    cover: "https://images.unsplash.com/photo-1585260159943-cdfc36d1b1a8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "mehndi-jewelry-essentials",
    title: "Mehndi & Jewelry: Traditional Indian Wedding Essentials",
    excerpt: "Explore mehndi designs and the significance of traditional jewelry...",
    category: "Traditions",
    author: "Rahul Kapoor",
    date: "Oct 5, 2025",
    read: "6 min read",
    cover: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "sangeet-night-guide",
    title: "Sangeet Night: Planning the Perfect Pre-Wedding Celebration",
    excerpt: "Music, dance and unforgettable sangeet ideas for your wedding...",
    category: "Events",
    author: "Sneha Patel",
    date: "Oct 2, 2025",
    read: "8 min read",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Blog() {
  const categories = useMemo(() => ["All", "Photography", "Beauty", "Traditions", "Events"], []);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = POSTS.filter((p) => (active === "All" || p.category === active) && p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900">Blog</h1>
      <p className="mt-1 text-gray-600">Articles, guides and inspiration</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={pill(active === c)}>{c}</button>
          ))}
        </div>
        <div className="ml-auto flex-1 min-w-[240px] max-w-xs">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." className="w-full rounded border px-3 py-2" />
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link key={p.id} to={`/blog/${p.id}`} className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow">
            <div className="relative h-48 overflow-hidden">
              <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-xs font-medium text-pink-700 border border-pink-200">{p.category}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600">{p.excerpt}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{p.author} • {p.date}</span><span>{p.read}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="rounded border px-4 py-2 hover:bg-gray-50">Load more</button>
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


