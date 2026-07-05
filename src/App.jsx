// src/App.jsx

import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy loading halaman utama
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MembersPage = lazy(() => import("./pages/MembersPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const LoyaltyPage = lazy(() => import("./pages/LoyaltyPage"));
const SegmentationPage = lazy(() => import("./pages/SegmentationPage"));
const CampaignsPage = lazy(() => import("./pages/CampaignsPage"));
const QueuePage = lazy(() => import("./pages/QueuePage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

// Lazy loading halaman auth
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

function PublicLanding() {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LandingPage />;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<PublicLanding />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Auth Layout - halaman login/register/forgot */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/loyalty" element={<LoyaltyPage />} />
            <Route path="/segmentation" element={<SegmentationPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>   {/* ← TUTUP ProtectedRoute */}
      </Routes>
    </Suspense>
  );
}