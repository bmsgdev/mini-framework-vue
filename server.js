import express from 'express';
import { Server } from "socket.io";
import {createServer } from 'http';
const app = express();
const PORT = 5000;
const server = createServer(app);

const io = new Server(server);

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});
io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});