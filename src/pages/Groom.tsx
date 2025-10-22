import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Groom() {
  const q = useQuery();
  const tab = (q.get("tab") || "looks") as "looks" | "outfits" | "guides";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900">Groom</h1>
      <p className="mt-1 text-gray-600">Looks, outfit ideas, and style guides</p>

      <div className="mt-6 flex gap-3">
        <a href="?tab=looks" className={btn(tab === "looks")}>
          Groom Looks
        </a>
        <a href="?tab=outfits" className={btn(tab === "outfits")}>
          Outfit Ideas
        </a>
        <a href="?tab=guides" className={btn(tab === "guides")}>
          Style Guides
        </a>
      </div>

      {tab === "looks" && <LooksSection />}
      {tab === "outfits" && <OutfitSection />}
      {tab === "guides" && <GuidesSection />}
    </div>
  );
}

function LooksSection() {
  return (
    <section className="mt-8">
      <HeroArticle
        img="https://images.unsplash.com/photo-1599256630548-8336d46f8d92?q=80&w=1600&auto=format&fit=crop"
        title="Stand A Cut Above With Versatile Groomsmen Outfits"
        excerpt="Gear up for groom and groomsmen duty with elegant, affordable looks."
      />
      <ArticleGrid keys={["standout", "new-age", "designer-labels", "wardrobe", "real-grooms", "couture", "elegant", "footwear"]} />
    </section>
  );
}

function OutfitSection() {
  return (
    <section className="mt-8">
      <HeroArticle
        img="https://images.unsplash.com/photo-1541726260-e6b6a6a08bd0?q=80&w=1600&auto=format&fit=crop"
        title="15+ Wedding Outfit Ideas For Every Ceremony"
        excerpt="Sherwani, suits and indo-western picks for haldi, sangeet, reception."
      />
      <ArticleGrid keys={["sherwani", "sangeet", "reception", "haldi", "cocktail", "coordination", "pastel", "classic"]} />
    </section>
  );
}

function GuidesSection() {
  return (
    <section className="mt-8">
      <HeroArticle
        img="https://images.unsplash.com/photo-1578926374602-38f5b7e85e61?q=80&w=1600&auto=format&fit=crop"
        title="The Groom’s Style Guide: From Head To Toe"
        excerpt="Accessories, grooming, footwear and styling tips for modern grooms."
      />
      <ArticleGrid keys={["accessories", "grooming", "shoes", "watches", "turban", "pocket-square", "belts", "fragrance"]} />
    </section>
  );
}

function HeroArticle({ img, title, excerpt }: { img: string; title: string; excerpt: string }) {
  return (
    <div className="grid gap-6 rounded-xl border bg-white p-4 shadow-sm md:grid-cols-2">
      <img src={img} className="h-60 w-full rounded object-cover" alt="hero" />
      <div className="flex flex-col justify-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{excerpt}</p>
        <button className="mt-4 self-start rounded bg-pink-600 px-4 py-2 text-white">Know More →</button>
      </div>
    </div>
  );
}

function ArticleGrid({ keys }: { keys: string[] }) {
  const cards = keys.map((k, i) => ({
    id: `${k}-${i}`,
    title: labelize(k),
    img: `https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop&k=${k}-${i}`,
  }));
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <article key={c.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <img src={c.img} alt={c.title} className="h-40 w-full object-cover" />
          <div className="p-3">
            <h4 className="font-semibold">{c.title}</h4>
          </div>
        </article>
      ))}
    </div>
  );
}

function btn(active: boolean) {
  return (
    "rounded-full border px-4 py-2 text-sm " +
    (active ? "border-pink-400 bg-pink-50 text-pink-700" : "hover:bg-gray-50")
  );
}

function labelize(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}


