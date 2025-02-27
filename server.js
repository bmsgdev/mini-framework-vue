import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const PORT = 5000;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // URL du frontend
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🔗 Client connecté : ${socket.id}`);

  // Envoyer un message au client connecté
  socket.emit("server-response", { message: "Bienvenue sur le serveur WebSocket!" });

  // Écoute des actions du formulaire
  socket.on("form-action", (data) => {
    // Diffuser à tous les clients sauf l'émetteur
    socket.broadcast.emit("server-response", {
      message: `Mise à jour : ${data.action}`,
      data,
    });

    const firstKey = Object.keys(data)[0]; // Récupère la première clé
    socket.emit("server-response", { [firstKey]: data[firstKey] });
    
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client déconnecté : ${socket.id}`);
  });
});

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`🚀 Serveur WebSocket en ligne sur http://localhost:${PORT}`);
});
