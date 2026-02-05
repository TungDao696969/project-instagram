import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Auth/Login";
import RegisterPage from "@/pages/Auth/Register";
import VerifyEmailPage from "@/pages/Auth/VerifyEmail";
import HomePage from "@/pages/Home/Home";
import MainLayout from "@/Layouts/MainLayout";
import ForgotPasswordPage from "@/pages/Auth/ForgotPassword";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
import ChangePasswordPage from "@/pages/Auth/ChangePassword";
import ProfilePage from "@/pages/Profile/Profile";
import EditProfilePage from "@/pages/Profile/EditProfilePage";
import { UserProfilePage } from "@/pages/User/UserProfilePage";
import ExplorePage from "@/pages/Explore/ExplorePage";
import MessagesLayout from "@/pages/Messages/MessagesLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route path="/change/password" element={<ChangePasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          // Users
          <Route path="/users/:userId" element={<UserProfilePage />} />
          //Explore // router
          <Route path="/explore" element={<ExplorePage />} />
          //Message
          <Route path="/messages" element={<MessagesLayout />} />
        </Route>
      </Route>
    </Routes>
  );
}
