import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MessageSquare } from "lucide-react";
import { useAuthStore } from "@stores/useAuthStore";
import NavBar from "@components/NavBar";
import HomePage from "@pages/HomePage";
import SignUpPage from "@pages/SignUpPage";
import LoginPage from "@pages/LoginPage";
import Verify2FAPage from "@pages/Verify2FAPage";
import ForgotPasswordPage from "@pages/ForgotPasswordPage";
import ResetPasswordPage from "@pages/ResetPasswordPage";
import SettingsPage from "@pages/SettingsPage";
import ProfilePage from "@pages/ProfilePage";
import { useThemeStore } from "@stores/useThemeStore";
import { useSocketCleanup } from "@hooks/useSocketCleanup";
import AnimatedBackground from "./components/ui/AnimatedBackground";
import ZChatLanding from "./pages/LandingPage";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useSocketCleanup();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex flex-col justify-center items-center h-screen mt-3.5">
        <div className="w-70 h-70 flex items-center justify-center">
          <img src="./logo.svg" />
        </div>
        <h1 className="font-bold text-5xl "> ZChat</h1>
        <span className="loading loading-dots  mt-3.5 space-x-2.5"></span>
      </div>
    );
  }
  return (
    <div className="overflow-y-scroll" data-theme={theme}>
      {/* <AnimatedBackground /> */}
      <NavBar />
      <Routes>
        <Route path="/landing" element = {<ZChatLanding />} />
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route path="/verify-2fa" element={<Verify2FAPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
