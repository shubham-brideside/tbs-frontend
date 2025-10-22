import React from "react";
import { Link, useParams } from "react-router-dom";

export default function PhotoDetail() {
  const { id } = useParams();

  const photo = {
    id,
    title: "Photo of Groom twirling bride for the pre-wedding shoot",
    src: "https://images.unsplash.com/photo-1587271613732-77336cd06c27?q=80&w=1600&auto=format&fit=crop",
    uploaded: "3 years ago",
    albumThumbs: [
      "https://images.unsplash.com/photo-1520975867597-0af37a22e31f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555685812-4b7432b6d651?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop",
    ],
    tags: [
      "Groom Twirling Bride",
      "Twirling Lehenga",
      "Twirling Lehenga Shot",
      "Bride Twirling",
      "Twirling Bride Shot",
      "Twirling Bride",
      "Pre Wedding Shoot Ideas",
      "Maroon",
      "Pre Wedding Shoot",
      "Save The Date",
      "Gold",
    ],
  };

  const similar = new Array(6).fill(0).map((_, i) => ({
    id: `similar-${i}`,
    src: `https://images.unsplash.com/photo-1604909052743-c414e8fbfdcf?q=80&w=1200&auto=format&fit=crop&i=${i}`,
    couple: i % 2 ? "Apoorva and Sanjay" : "Shikha and James",
    location: i % 2 ? "Florida" : "Italy",
  }));

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: dark viewer */}
        <div className="relative col-span-1 lg:col-span-8 flex items-center justify-center bg-black" style={{minHeight: "calc(100vh - 0px)"}}>
          <button aria-label="Prev" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-white/30">‹</button>
          <img src={photo.src} alt={photo.title} className="max-h-screen object-contain" />
          <button aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-white/30">›</button>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button className="rounded bg-white/10 px-3 py-1 text-white backdrop-blur">Pin</button>
            <button className="rounded bg-white/10 px-3 py-1 text-white backdrop-blur">♥ 30</button>
            <button className="rounded bg-white/10 px-3 py-1 text-white backdrop-blur">Share</button>
          </div>
        </div>
        {/* Right: info sidebar */}
        <aside className="col-span-1 lg:col-span-4 border-l bg-white">
          <div className="sticky top-0 max-h-screen overflow-y-auto p-5">
            <Link to="/photos" className="text-pink-600">← Back to Gallery</Link>
            <p className="mt-3 text-xs text-gray-500">Uploaded {photo.uploaded}</p>
            <h1 className="mt-2 text-lg font-semibold text-gray-900">{photo.title}</h1>
            <p className="mt-1 text-sm text-gray-700">Avaantika and Divyamm • Real Wedding, Jaipur</p>

            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium">View more photos from this album</h3>
              <div className="mt-2 flex gap-2">
                {photo.albumThumbs.map((t, i) => (
                  <img key={i} src={t} className="h-16 w-16 rounded object-cover" />
                ))}
                <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100 text-sm">+44 More</div>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium">Picture Tags</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {photo.tags.map((t) => (
                  <span key={t} className="rounded-full border px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-center text-lg font-semibold text-pink-700">Browse Similar Photos</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <Link key={s.id} to={`/photos/${s.id}`} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <img src={s.src} className="h-56 w-full object-cover" />
                <div className="p-3 text-sm"><p className="font-semibold">{s.couple}</p><p className="text-gray-600">{s.location}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


