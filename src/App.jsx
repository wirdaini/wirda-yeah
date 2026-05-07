import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Loading from "./components/Loading";

// Lazy loading halaman utama
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MembersPage = lazy(() => import("./pages/MembersPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const LoyaltyPage = lazy(() => import("./pages/LoyaltyPage"));
const SegmentationPage = lazy(() => import("./pages/SegmentationPage"));
const CampaignsPage = lazy(() => import("./pages/CampaignsPage"));
const QueuePage = lazy(() => import("./pages/QueuePage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));

// Lazy loading halaman auth
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth Layout - halaman login/register/forgot */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Main Layout - halaman utama dengan sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          <Route path="/segmentation" element={<SegmentationPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}