import React, { Suspense, useEffect } from "react";
import { AppRoutes } from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  useEffect(() => {
    console.log("✅ App component mounted!");
    return () => {
      console.log("⚠️ App component unmounting!");
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
