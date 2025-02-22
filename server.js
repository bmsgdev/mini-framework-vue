import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const PORT = 5000;
const server = createServer(app);

// Configuration CORS pour autoriser les connexions de ton frontend (par exemple localhost:3000)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // Assurez-vous que c'est l'URL correcte de ton frontend
    methods: ["GET", "POST"],
    // credentials: true  // Permet l'envoi de cookies si besoin
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Exemple d'événement que le serveur peut émettre
  socket.emit("server-response", { message: "Hello from the server!" });

  socket.on("client-message", (data) => {
    console.log("Received data from client:", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
