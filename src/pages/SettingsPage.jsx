import React from "react";
import { THEMES } from "@constants/index.js";
import { Send } from "lucide-react";
import { useThemeStore } from "@stores/useThemeStore";

// Polices disponibles
const FONTS = [
  { id: "inter", name: "Inter" },
  { id: "roboto", name: "Roboto" },
  { id: "serif", name: "Serif" },
  { id: "mono", name: "Monospace" },
];

const PREVIEW_MESSAGE = [
  { id: 1, content: "Hey! How's it going?", isSent: false, houre: "12:00 PM" },
  {
    id: 2,
    content: "All good! Just working on the project.",
    isSent: true,
    houre: "13:00 PM",
  },
  { id: 3, content: "Cool bro.", isSent: false, houre: "14:00 PM" },
];

const SettingsPage = () => {
  const { theme, setTheme, font, setFont } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl space-y-6 overflow-y-auto pb-10">
      {/* Langage */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Langue</h2>
        <p className="text-sm text-base-content/70">
          Choisissez la langue de votre interface
        </p>
      </div>
      <div>
        <select className="select select-bordered w-full max-w-xs">
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
          <option value="zh">Chinois</option>
        </select>
      </div>

      {/* Theme */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Thème</h2>
        <p className="text-sm text-base-content/70">
          Choisissez un thème pour votre interface
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {THEMES.map((t) => (
          <button
            key={t}
            className={`group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200
              ${
                theme === t
                  ? "bg-base-100 shadow-lg border-2 border-primary"
                  : "bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-md"
              }`}
            onClick={() => setTheme(t)}
          >
            <div
              className="relative h-10 w-full rounded-lg overflow-hidden shadow-sm"
              data-theme={t}
            >
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>
            </div>
            <span
              className={`text-xs font-medium truncate w-full text-center transition-colors
              ${theme === t ? "text-primary" : "text-base-content/70 group-hover:text-base-content"}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Font Selection */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Police</h2>
        <p className="text-sm text-base-content/70">
          Choisissez la police de votre interface
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FONTS.map((f) => (
          <button
            key={f.id}
            className={`group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200
              ${
                font === f.id
                  ? "bg-base-100 shadow-lg border-2 border-primary"
                  : "bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-md"
              }`}
            onClick={() => setFont(f.id)}
          >
            <div className="h-14 w-full flex items-center justify-center rounded-lg bg-base-200/50">
              <span
                className="text-2xl font-medium text-base-content"
                style={{ fontFamily: f.name }}
              >
                Aa
              </span>
            </div>
            <span
              className={`text-xs font-medium truncate w-full text-center transition-colors
              ${font === f.id ? "text-primary" : "text-base-content/70 group-hover:text-base-content"}`}
            >
              {f.name}
            </span>
          </button>
        ))}
      </div>

      {/* Preview Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Aperçu</h2>
        <p className="text-sm text-base-content/70">
          Prévisualisation de votre thème et police
        </p>
      </div>
      <div className="rounded-xl border border-base-300 overflow-hidden mb-5 bg-base-200 shadow-lg">
        <div className="p-6">
          <div className="max-w-lg mx-auto">
            {/* Mock Chat Header */}
            <div className="px-4 py-3 border border-base-300 bg-base-100 rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold shadow-sm">
                  J
                </div>
                <div>
                  <h3 className="font-semibold text-sm">John Doe</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <p className="text-xs text-success font-medium">En ligne</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-3 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100 border-x border-base-300">
              {PREVIEW_MESSAGE.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all
                      ${
                        message.isSent
                          ? "bg-primary text-primary-content rounded-br-sm"
                          : "bg-base-200 text-base-content rounded-bl-sm"
                      }`}
                    style={{ fontFamily: font }}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p
                      className={`text-[10px] mt-1.5 ${message.isSent ? "text-primary-content/60" : "text-base-content/50"}`}
                    >
                      {message.houre}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border border-base-300 bg-base-100 rounded-b-xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1 text-sm h-10 bg-base-200"
                  placeholder="Tapez un message..."
                  value="Ceci est un aperçu"
                  readOnly
                  style={{ fontFamily: font }}
                />
                <button className="btn btn-primary h-10 min-h-0 px-6">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
