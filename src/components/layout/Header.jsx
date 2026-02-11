import React from "react";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="text-xl font-bold">Z-Chat</div>

      <nav className="flex gap-6">
        <a href="#features">Fonctionnalités</a>
        <a href="#tech">Technologie</a>
        <a href="#about">À propos</a>
      </nav>

      <div className="flex gap-4">
        <button className="px-4 py-2 border rounded">Se connecter</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Créer un compte
        </button>
      </div>
    </header>
  );
};

export default Header;
