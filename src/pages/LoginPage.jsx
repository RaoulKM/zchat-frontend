import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@stores/useAuthStore";
import AuthImagePattern from "@components/AuthImagePattern";
import { MessageSquare, Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthImageCarousel from "../components/AuthImageCarousel";
import Logo from "../components/ui/Logo";
import AnimatedBackground from "../components/ui/AnimatedBackground";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggin } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Format d'email invalide");

    if (formData.password.length < 6)
      return toast.error("Le mot de passe doit contenir au moins 6 caractères");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      try {
        await login(formData);
        navigate("/");
      } catch (error) {
        console.error("Erreur de connexion", error);
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-14">
      {/* Background */}
      {/* côté gauche */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-transparent">
        <div className="w-full max-w-md space-y-5">
          {/* LOGO */}
          <div className="text-center md-8">
            <div className="flex flex-col items-center gap-2 group">
              <Logo />
              <h1 className="text-2xl font-bold mt-2">Connexion</h1>
              <p className="text-base-content/60">
                Connectez-vous à votre compte
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute z-100 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/50" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 text-gray-400"
                  placeholder="Entrez votre email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Mot de passe</span>
              </label>
              <div className="relative mb-2">
                <div className="absolute z-100 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 text-gray-400"
                  placeholder="Entrez votre mot de passe"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/50" />
                  ) : (
                    <Eye className="size-5 text-base-content/50" />
                  )}
                </div>
              </div>
              <Link to={"/forgot-password"} className="text-primary text-sm">
                Mot de passe oublié ?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoggin}
              >
                {isLoggin ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Vous n’avez pas de compte ?{" "}
              <Link to="/signup" className="link link-primary">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* côté droit */}
      <AuthImageCarousel />
    </div>
  );
};

export default LoginPage;
