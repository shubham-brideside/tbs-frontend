import React, { Suspense } from "react";
import { AppRoutes } from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<Loader />}>
          <AppRoutes />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
