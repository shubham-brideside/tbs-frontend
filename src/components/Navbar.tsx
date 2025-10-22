import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-start">
        <Link to="/" className="leading-none">
          <div className="text-black font-extrabold tracking-tight text-2xl md:text-3xl">TBS</div>
          <div className="text-black text-[10px] md:text-xs tracking-[0.35em] uppercase">The Bride Side</div>
        </Link>
      </div>
    </header>
  );
}

