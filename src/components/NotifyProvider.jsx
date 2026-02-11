import { createContext, useContext, useState } from "react";

const NotifyContext = createContext();

export function NotifyProvider({ children }) {
  const [message, setMessage] = useState("");

  const notifyIfEmpty = (data) => {
    if (
      !data ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === "string" && data.trim() === "")
    ) {
      setMessage("⚠️ Cette fonctionnalité est en cours de développement !");
      return true;
    }
    return false;
  };

  const closeModal = () => setMessage("");

  return (
    <NotifyContext.Provider value={{ notifyIfEmpty }}>
      {children}
      {message && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
            }}
          >
            <p>{message}</p>
            <button onClick={closeModal}>Fermer</button>
          </div>
        </div>
      )}
    </NotifyContext.Provider>
  );
}

export function useNotify() {
  return useContext(NotifyContext);
}
