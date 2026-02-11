import React from "react";
import WhyItem from "./WhyItem";

const WhyZChatSection: React.FC = () => {
  return (
    <section className="px-8 py-16">
      <h2 className="text-3xl font-bold mb-8">Pourquoi Z-Chat ?</h2>
      <div className="grid grid-cols-2 gap-6">
        <WhyItem title="Rapide" description="Messages en temps réel." />
        <WhyItem
          title="Sécurisé"
          description="Protection avancée des données."
        />
        <WhyItem title="Personnalisable" description="Thèmes et couleurs." />
        <WhyItem title="Multi-plateforme" description="Mobile et web." />
      </div>
    </section>
  );
};

export default WhyZChatSection;
