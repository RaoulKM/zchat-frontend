import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@stores/useAuthStore";
import AuthImagePattern from "@components/AuthImagePattern";
import { MessageSquare, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSignup } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Le nom d'utilisateur est requis");

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
        const result = await signup(formData);

        // Si la 2FA est requise, redirection vers la vérification
        if (result?.requires2FA) {
          navigate("/verify-2fa", {
            state: {
              type: "signup",
              tempUserId: result.tempUserId,
              email: result.email,
              fullName: formData.fullName,
            },
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-14">
      {/* côté gauche */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-5">
          {/* LOGO */}
          <div className="text-center md-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="flex items-center justify-center animate-bounce">
                <img src="./logo.svg" alt="" height={"100px"} width={"100px"} />
              </div>
              <h1 className="text-2xl font-bold mt-2">Créer un compte</h1>
              <p className="text-base-content/60">
                Commencez avec votre compte gratuit
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Nom d'utilisateur
                </span>
              </label>
              <div className="relative">
                <div className="absolute z-100 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/50" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 text-gray-400"
                  placeholder="Entrez votre nom d'utilisateur"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

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
              <div className="relative">
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
                  className="absolute inset-y-0 right-0 pr-3 z-10 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/50" />
                  ) : (
                    <Eye className="size-5 text-base-content/50" />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSignup}
            >
              {isSignup ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="link link-primary">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* côté droit */}
      <AuthImagePattern
        title="Rejoignez notre communauté"
        subtitle="Connectez-vous avec vos amis, partagez des moments et restez en contact"
      />
    </div>
  );
};

export default SignUpPage;
