import React from "react";
import { Download, MessageSquare, Phone, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "./ui/AnimatedBackground";

const NoChatSelected = () => {
  return (
    <div className="w-full hidden sm:flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Affichage de l'icône */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 
                        flex items-center justify-center animate-bounce"
            >
              <div className="flex items-center justify-center animate-bounce">
                <img
                  src="./logo.svg"
                  alt="Logo ZChat"
                  height={"200px"}
                  width={"200px"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Texte d'accueil */}
        <h2 className="text-2xl font-bold">Bienvenue sur ZChat !</h2>
        <p className="text-base-content/60">
          Sélectionnez une conversation dans la barre latérale pour commencer à
          discuter
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Link to="#" className="btn btn-primary mt-6 flex items-center gap-2">
          <h1>Telecharger L'application ZChat</h1>
          <Smartphone />
        </Link>
      </div>
    </div>
  );
};

export default NoChatSelected;
