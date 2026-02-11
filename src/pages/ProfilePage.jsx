import React, { useState } from "react";
import {
  Camera,
  User,
  Mail,
  Calendar,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useAuthStore } from "@stores/useAuthStore";
import defaultProfile from "@components/default.png";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePicture: base64Image });
    };
  };

  return (
    <div className="h-screen bg-base-100 pt-20 flex justify-center">
      <div className="w-full max-w-6xl px-4 space-y-6">
        {/* HEADER PROFILE */}
        <div className="bg-base-200 rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="size-32 rounded-full overflow-hidden border-4 border-base-300 bg-base-300">
                <img
                  src={selectedImg || authUser.profilePicture || defaultProfile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0
                  bg-primary hover:bg-primary-focus
                  p-2.5 rounded-full cursor-pointer
                  shadow-lg transition-all duration-200
                  hover:scale-110 active:scale-95
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-70" : ""}
                `}
              >
                <Camera className="w-4 h-4 text-primary-content" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            {/* Name and Status */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-base-content">
                {authUser?.fullName}
              </h1>
              <p className="text-sm text-base-content/70 mt-1">
                {authUser?.email}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-xs text-success font-medium">
                  Active Account
                </span>
              </div>
            </div>
          </div>

          {isUpdatingProfile && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
              <p className="text-sm text-primary font-medium">
                Mise à jour de la photo de profil...
              </p>
            </div>
          )}
        </div>

        {/* INFORMATIONS PERSONNELLES */}
        <div className="bg-base-200 rounded-2xl p-6 shadow-md space-y-3">
          <h2 className="text-lg font-semibold">Informations personnelles</h2>
          <p className="text-sm text-base-content/70">
            Vos informations de compte
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Full Name */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-base-100 border border-base-300">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-base-content/60 mb-1">Nom complet</p>
                <p className="font-medium text-base-content truncate">
                  {authUser?.fullName}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-base-100 border border-base-300">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-base-content/60 mb-1">
                  Adresse email
                </p>
                <p className="font-medium text-base-content truncate">
                  {authUser?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DÉTAILS DU COMPTE */}
        <div className="bg-base-200 rounded-2xl p-6 shadow-md space-y-3">
          <h2 className="text-lg font-semibold">Détails du compte</h2>
          <p className="text-sm text-base-content/70">
            Informations sur votre compte
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Member Since */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-base-100 border border-base-300">
              <div className="p-2 rounded-lg bg-accent/10">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-base-content/60 mb-1">
                  Membre depuis
                </p>
                <p className="font-medium text-base-content">
                  {new Date(authUser?.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Account Status */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-base-100 border border-base-300">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-base-content/60 mb-1">
                  Statut du compte
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <p className="font-medium text-success">Actif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
