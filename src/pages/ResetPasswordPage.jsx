import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuthStore } from "@stores/useAuthStore";
import AuthImagePattern from "@components/AuthImagePattern";
import {
  MessageSquare,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { resetPassword, validateResetToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        setIsTokenValid(false);
        toast.error("Aucun jeton de réinitialisation fourni");
        return;
      }

      try {
        const response = await validateResetToken(token);
        setIsTokenValid(response.valid);
        if (!response.valid) {
          toast.error("Lien de réinitialisation invalide ou expiré");
        }
      } catch (error) {
        setIsTokenValid(false);
        toast.error("Lien de réinitialisation invalide ou expiré");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token, validateResetToken]);

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
    return requirements;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Les mots de passe ne correspondent pas");
    }

    const requirements = validatePassword(formData.password);
    if (!requirements.length) {
      return toast.error("Le mot de passe doit contenir au moins 6 caractères");
    }

    setIsLoading(true);
    try {
      await resetPassword({
        token: token,
        newPassword: formData.password,
      });

      toast.success("Mot de passe réinitialisé avec succès !");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la réinitialisation du mot de passe",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = validatePassword(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword;
  const isFormValid =
    passwordsMatch &&
    passwordRequirements.length &&
    passwordRequirements.hasUppercase &&
    passwordRequirements.hasLowercase &&
    passwordRequirements.hasNumber;

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">
            Validation du lien de réinitialisation...
          </p>
        </div>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="min-h-screen grid lg:grid-cols-2 pt-14">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8 text-center">
            <div className="mx-auto size-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="size-8 text-red-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Lien de réinitialisation invalide
            </h1>

            <p className="text-gray-600">
              Ce lien de réinitialisation de mot de passe est invalide ou a
              expiré.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/forgot-password")}
                className="btn btn-primary w-full"
              >
                Obtenir un nouveau lien
              </button>

              <Link to="/login" className="btn btn-ghost w-full">
                Retour à la connexion
              </Link>
            </div>
          </div>
        </div>

        <AuthImagePattern
          title="Lien expiré"
          subtitle="La sécurité est notre priorité – les liens de réinitialisation expirent après 1 heure"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-14">
      {/* Côté gauche */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* En-tête */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              <Logo />
              <h1 className="text-2xl font-bold mt-2">Nouveau mot de passe</h1>
              <p className="text-base-content/60">
                Créez votre nouveau mot de passe
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nouveau mot de passe */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Nouveau mot de passe
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Entrez le nouveau mot de passe"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  autoComplete="new-password"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-gray-700 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-400" />
                  ) : (
                    <Eye className="size-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Exigences du mot de passe */}
              {formData.password && (
                <div className="mt-3 space-y-2 text-sm">
                  <div
                    className={`flex items-center gap-2 ${passwordRequirements.length ? "text-green-600" : "text-red-600"}`}
                  >
                    {passwordRequirements.length ? (
                      <CheckCircle className="size-4" />
                    ) : (
                      <XCircle className="size-4" />
                    )}
                    Au moins 6 caractères
                  </div>
                  <div
                    className={`flex items-center gap-2 ${passwordRequirements.hasUppercase ? "text-green-600" : "text-red-600"}`}
                  >
                    {passwordRequirements.hasUppercase ? (
                      <CheckCircle className="size-4" />
                    ) : (
                      <XCircle className="size-4" />
                    )}
                    Au moins une lettre majuscule
                  </div>
                  <div
                    className={`flex items-center gap-2 ${passwordRequirements.hasLowercase ? "text-green-600" : "text-red-600"}`}
                  >
                    {passwordRequirements.hasLowercase ? (
                      <CheckCircle className="size-4" />
                    ) : (
                      <XCircle className="size-4" />
                    )}
                    Au moins une lettre minuscule
                  </div>
                  <div
                    className={`flex items-center gap-2 ${passwordRequirements.hasNumber ? "text-green-600" : "text-red-600"}`}
                  >
                    {passwordRequirements.hasNumber ? (
                      <CheckCircle className="size-4" />
                    ) : (
                      <XCircle className="size-4" />
                    )}
                    Au moins un chiffre
                  </div>
                </div>
              )}
            </div>

            {/* Confirmer le mot de passe */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Confirmer le mot de passe
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                    formData.confirmPassword && !passwordsMatch
                      ? "input-error border-red-500"
                      : ""
                  }`}
                  placeholder="Confirmez le nouveau mot de passe"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  autoComplete="new-password"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-gray-700 z-10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5 text-gray-400" />
                  ) : (
                    <Eye className="size-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Indicateur de correspondance */}
              {formData.confirmPassword && (
                <div
                  className={`mt-2 text-sm flex items-center gap-2 ${
                    passwordsMatch ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {passwordsMatch ? (
                    <CheckCircle className="size-4" />
                  ) : (
                    <XCircle className="size-4" />
                  )}
                  {passwordsMatch
                    ? "Les mots de passe correspondent"
                    : "Les mots de passe ne correspondent pas"}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full disabled:cursor-not-allowed"
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Réinitialisation...
                  </>
                ) : (
                  "Réinitialiser le mot de passe"
                )}
              </button>
            </div>
          </form>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Vous vous souvenez de votre mot de passe ?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Retour à la connexion
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Côté droit */}
      <div className="hidden lg:block">
        <AuthImagePattern
          title="Réinitialisation sécurisée"
          subtitle="Choisissez un mot de passe fort pour sécuriser votre compte"
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
