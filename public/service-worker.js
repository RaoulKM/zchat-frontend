self.addEventListener("install", (event) => {
  console.log("Service Worker installé");
});

self.addEventListener("fetch", (event) => {
  // Ici tu peux gérer le cache si tu veux offline
});
