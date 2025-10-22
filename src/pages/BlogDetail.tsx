import React from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogDetail() {
  const { slug } = useParams();
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/blog" className="text-pink-600">← Back to Blog</Link>
      <h1 className="mt-2 text-3xl font-extrabold text-gray-900">{titleize(slug || "Article")}</h1>
      <p className="mt-2 text-gray-600">By Editorial Team • Oct 2025 • 7 min read</p>

      <img
        src="https://images.unsplash.com/photo-1587271613732-77336cd06c27?q=80&w=1800&auto=format&fit=crop"
        className="mt-6 h-72 w-full rounded object-cover"
      />

      <article className="prose prose-pink mt-6 max-w-none">
        <p>
          This is a sample article body. Replace with content from your backend. We cover the latest trends,
          tips and inspiration for your perfect Indian wedding.
        </p>
        <h2>Key Tips</h2>
        <ul>
          <li>Plan your theme and color palette early.</li>
          <li>Schedule pre-wedding shoots with golden-hour lighting.</li>
          <li>Coordinate accessories to elevate your look.</li>
        </ul>
        <p>
          Keep exploring TheBrideSide for more guides and curated galleries.
        </p>
      </article>
    </div>
  );
}

function titleize(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}


