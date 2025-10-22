import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Bride() {
  const q = useQuery();
  const tab = (q.get("tab") || "fashion") as "fashion" | "beauty" | "bridesmaid";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900">Bride</h1>
      <p className="mt-1 text-gray-600">Fashion, beauty, and bridesmaid inspiration</p>

      <div className="mt-6 flex gap-3">
        <a href="?tab=fashion" className={btn(tab === "fashion")}>
          Fashion
        </a>
        <a href="?tab=beauty" className={btn(tab === "beauty")}>
          Beauty
        </a>
        <a href="?tab=bridesmaid" className={btn(tab === "bridesmaid")}>
          Bridesmaid
        </a>
      </div>

      {tab === "fashion" && <FashionSection />}
      {tab === "beauty" && <BeautySection />}
      {tab === "bridesmaid" && <BridesmaidSection />}
    </div>
  );
}

function FashionSection() {
  return (
    <section className="mt-8">
      <header className="mb-4">
        <h2 className="text-2xl font-semibold">Fashion</h2>
        <p className="text-gray-600">Lehenga, saree, and indo-western trends</p>
      </header>
      <HeroArticle
        img="https://images.unsplash.com/photo-1614850715849-6f1d36c9fb16?q=80&w=1600&auto=format&fit=crop"
        title="10+ Real Brides Who Picked Marwar Couture For Their Wedding Day!"
        excerpt="Royal wedding dreams? Get inspired by stunning couture looks."
      />
      <ArticleGrid keys={["lehenga", "saree", "indo-western", "jewellery", "footwear", "payal", "care", "dupattas"]} />
    </section>
  );
}

function BeautySection() {
  return (
    <section className="mt-8">
      <header className="mb-4">
        <h2 className="text-2xl font-semibold">Beauty</h2>
        <p className="text-gray-600">Bridal makeup, hair, skincare and more</p>
      </header>
      <HeroArticle
        img="https://images.unsplash.com/photo-1585260159943-cdfc36d1b1a8?q=80&w=1600&auto=format&fit=crop"
        title="What Brides-To-Be Need To Know About Bridal Facials"
        excerpt="Dermat experts share what to know before your big day."
      />
      <ArticleGrid keys={["pre-wedding", "top-mua", "eye-makeup", "hairstyles", "hacks", "hair-color", "floral-hair", "skin"]} />
    </section>
  );
}

function BridesmaidSection() {
  return (
    <section className="mt-8">
      <header className="mb-4">
        <h2 className="text-2xl font-semibold">Bridesmaids</h2>
        <p className="text-gray-600">Outfits, parties and coordination tips</p>
      </header>
      <HeroArticle
        img="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
        title="Chic Chanel-Themed Bridal Shower In Mumbai"
        excerpt="A luxe bridesmaid celebration with iconic details."
      />
      <ArticleGrid keys={["outfits", "checklist", "sister-of-groom", "accessories", "trending", "party-ideas", "coordination", "gifts"]} />
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
    img: `https://images.unsplash.com/photo-1555685812-4b7432b6d651?q=80&w=1200&auto=format&fit=crop&k=${k}-${i}`,
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


