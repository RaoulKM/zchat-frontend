import React from "react";

const CTASection = () => {
  return (
    <section className="px-6 md:px-12 py-20 text-center bg-gray-50">
      <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
      <p className="mb-6">
        Rejoignez Z-Chat et découvrez une nouvelle façon de communiquer.
      </p>
      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded">
          Créer un compte
        </button>
        <button className="px-6 py-3 border rounded">Se connecter</button>
      </div>
    </section>
  );
};

export default CTASection;
