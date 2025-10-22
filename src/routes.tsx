import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Photos = lazy(() => import("./pages/Photos"));
const PhotosGallery = lazy(() => import("./pages/PhotosGallery"));
const PhotoDetail = lazy(() => import("./pages/PhotoDetail"));
const RealWeddings = lazy(() => import("./pages/RealWeddings"));
const RealWeddingDetailPage = lazy(() => import("./pages/RealWeddingDetailPage"));
const Bride = lazy(() => import("./pages/Bride"));
const Groom = lazy(() => import("./pages/Groom"));
const Celebrity = lazy(() => import("./pages/Celebrity"));
const CelebrityBrides = lazy(() => import("./pages/CelebrityBrides"));
const CelebrityWeddings = lazy(() => import("./pages/CelebrityWeddings"));
const CelebrityRings = lazy(() => import("./pages/CelebrityRings"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const StartPlanning = lazy(() => import("./pages/StartPlanning"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFound = lazy(() => import("./pages/NotFound"));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photos" element={<Photos />} />
      <Route path="/photos/gallery" element={<PhotosGallery />} />
      <Route path="/photos/:id" element={<PhotoDetail />} />
      <Route path="/real-weddings" element={<RealWeddings />} />
      <Route path="/real-weddings/:id" element={<RealWeddingDetailPage />} />
      <Route path="/bride" element={<Bride />} />
      <Route path="/groom" element={<Groom />} />
      <Route path="/celebrities" element={<Celebrity />} />
      <Route path="/celebrities/brides" element={<CelebrityBrides />} />
      <Route path="/celebrities/weddings" element={<CelebrityWeddings />} />
      <Route path="/celebrities/rings" element={<CelebrityRings />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/start-planning" element={<StartPlanning />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
