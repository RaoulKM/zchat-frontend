import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@stores/useAuthStore";
import AuthImagePattern from "@components/AuthImagePattern";
import { MessageSquare, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { forgotPassword } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error("Veuillez entrer une adresse e-mail valide");
    }

    setIsLoading(true);
    try {
      await forgotPassword({ email });
      setEmailSent(true);
      toast.success(
        "Si un compte existe, un lien de réinitialisation a été envoyé à votre e-mail",
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de l'envoi de l'e-mail de réinitialisation",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen grid lg:grid-cols-2 pt-14">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8 text-center">
            <div className="mx-auto size-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="size-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold">Vérifiez votre e-mail</h1>

            <p className="text-base-content/60">
              Nous avons envoyé un lien de réinitialisation de mot de passe à
              <br />
              <strong className="text-primary">{email}</strong>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p>
                💡 <strong>Vous n'avez pas reçu l'e-mail ?</strong>
              </p>
              <p className="mt-1">
                Vérifiez votre dossier spam ou réessayez dans quelques minutes.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setEmailSent(false)}
                className="btn btn-ghost w-full"
              >
                Essayer avec un autre e-mail
              </button>

              <Link to="/login" className="btn btn-primary w-full">
                Retour à la connexion
              </Link>
            </div>
          </div>
        </div>

        <AuthImagePattern
          title="Sécurité avant tout"
          subtitle="Nous prenons la sécurité de votre compte très au sérieux"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-14">
      {/* Côté gauche */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-5">
          {/* En-tête */}
          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-ghost btn-circle absolute top-4 left-4"
            >
              <ArrowLeft className="size-5" />
            </button>

            <div className="flex flex-col items-center gap-2 group">
              <Logo />
              <h1 className="text-2xl font-bold mt-2">
                Réinitialiser le mot de passe
              </h1>
              <p className="text-base-content/60">
                Entrez votre e-mail pour réinitialiser votre mot de passe
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Adresse e-mail</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/50" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="Entrez votre adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Envoyer le lien de réinitialisation"
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Vous vous souvenez de votre mot de passe ?{" "}
              <Link to="/login" className="link link-primary">
                Retour à la connexion
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Côté droit */}
      <AuthImagePattern
        title="Récupération sécurisée du compte"
        subtitle="Nous vous aiderons à retrouver l'accès à votre compte en toute sécurité"
      />
    </div>
  );
};

export default ForgotPasswordPage;
