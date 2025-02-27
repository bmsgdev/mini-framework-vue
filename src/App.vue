<script setup>
import { io } from "socket.io-client";
import { onMounted, defineAsyncComponent, ref } from "vue";
import { useFormStore } from "@/stores/formStore";
import { useToast } from "vue-toastification"; 
const toast = useToast(); 
// Créer une connexion WebSocket avec le serveur
const socket = io("http://localhost:5000");

const FormEditor = defineAsyncComponent(() =>
  import('./components/FormEditorComponent.vue')
);

const formStore = useFormStore();

// Écouter les événements WebSocket
onMounted(() => {
  // Connexion réussie au serveur WebSocket
  socket.on("connect", () => {
    toast.success("Connecté au serveur WebSocket !");
  });

  // Écouter un événement personnalisé 'server-response' émis par le serveur
  socket.on("server-response", (data) => {
    toast.info(`Réponse du serveur : ${data.message || "Aucune donnée"}`);
  });
});

// Fonction pour créer un formulaire (envoi de données au serveur)
function createForm() {
  const formData = formStore.formData;  

  // Emission de l'événement 'client-message' au serveur
  socket.emit("client-message", formData);
  
  toast.success("Données envoyées au serveur !");
  console.log("Données envoyées au serveur:", formData);
}
</script>

<template>
  <div>
    <nav class="flex gap-4 p-4 bg-gray-200">
      <router-link to="/" class="text-blue-500 hover:underline">Admin</router-link>
      <router-link to="/utilisation" class="text-blue-500 hover:underline">Utilisation</router-link>
    </nav>
    
    <router-view />
  </div>
</template>

<style scoped>
</style>
