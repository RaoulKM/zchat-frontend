import React from "react";

const HeroText = () => {
  return (
    <div className="max-w-xl text-center md:text-left mb-8 md:mb-0">
      <h1 className="text-4xl font-bold mb-4">
        Z-Chat, la messagerie nouvelle génération
      </h1>
      <p className="mb-6">
        Communiquez simplement, rapidement et en toute sécurité sur mobile et
        web.
      </p>
      <div className="flex justify-center md:justify-start gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded">
          Créer un compte
        </button>
        <button className="px-6 py-3 border rounded">Se connecter</button>
      </div>
    </div>
  );
};

export default HeroText;
