import React from "react";
import { Link } from "react-router-dom";

export default function Celebrity() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Celebrity Weddings</h1>
          <p className="mt-1 text-gray-600">Big fat weddings and intimate ceremonies of your favourite celebs</p>
        </div>
        <div className="flex gap-2">
          <Link to="/celebrities" className="rounded-full border px-4 py-2 text-sm border-pink-400 bg-pink-50 text-pink-700">Weddings</Link>
          <Link to="/celebrities/brides" className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50">Brides</Link>
          <Link to="/celebrities/rings" className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50">Rings</Link>
        </div>
      </div>

      <section className="mt-8">
        <div className="grid gap-6 rounded-xl border bg-white p-4 shadow-sm md:grid-cols-2">
          <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1600&auto=format&fit=crop" className="h-60 w-full rounded object-cover" />
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold">Jeet Adani And Diva Shah, Ahmedabad</h3>
            <p className="mt-2 text-gray-600">A quiet and elegant celebration with close friends and family.</p>
            <button className="mt-4 self-start rounded bg-pink-600 px-4 py-2 text-white">Know More →</button>
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {["Selena Gomez and Benny Blanco","Jeff Bezos and Lauren Sanchez","Prajakta Koli & Vrishank Khanal","Jeet Adani & Diva Shah"].map((t,i)=>(
            <article key={i} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <img src={`https://images.unsplash.com/photo-1520975867597-0af37a22e31f?q=80&w=1200&auto=format&fit=crop&i=${i}`} className="h-40 w-full object-cover" />
              <div className="p-3"><h4 className="font-semibold">{t}</h4></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}


