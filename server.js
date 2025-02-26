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
    console.log(`📩 Action reçue : ${data.action}`, data);

    // Diffuser à tous les clients sauf l'émetteur
    socket.broadcast.emit("server-update", {
      message: `Mise à jour : ${data.action}`,
      data,
    });

    // Répondre uniquement à l'émetteur
    socket.emit("server-response", { message: `Action ${data.action} bien reçue` });
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client déconnecté : ${socket.id}`);
  });
});

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`🚀 Serveur WebSocket en ligne sur http://localhost:${PORT}`);
});
