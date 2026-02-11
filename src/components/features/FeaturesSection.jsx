import React from "react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full px-6 md:px-12 py-20 bg-gray-50">
      {/* Title */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Fonctionnalités clés
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tout ce dont vous avez besoin pour communiquer efficacement, en toute
          sécurité, sur mobile et sur le web.
        </p>
      </div>

      {/* Features grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureCard
          title="Messagerie instantanée"
          description="Conversations en temps réel avec accusés de réception et statut en ligne."
          icon="💬"
        />

        <FeatureCard
          title="Gestion des utilisateurs"
          description="Inscription sécurisée, profils personnalisés et vérification par email."
          icon="👥"
        />

        <FeatureCard
          title="Sécurité & confidentialité"
          description="Authentification JWT, protection des données et sessions sécurisées."
          icon="🔐"
        />

        <FeatureCard
          title="Personnalisation"
          description="Thèmes clair et sombre, couleurs personnalisées et interface adaptable."
          icon="🎨"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
