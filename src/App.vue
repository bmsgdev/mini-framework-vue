<script setup>
import { io } from "socket.io-client";
import { onMounted, defineAsyncComponent, ref } from "vue";
import { useFormStore } from "@/stores/formStore";  

// Créer une connexion WebSocket avec le serveur
const socket = io("http://localhost:5000");

// Charger le composant du formulaire dynamiquement
const FormEditor = defineAsyncComponent(() =>
  import('./components/FormEditorComponent.vue')
);


const formStore = useFormStore();

// Écouter les événements WebSocket
onMounted(() => {
  // Connexion réussie au serveur WebSocket
  socket.on("connect", () => {
    console.log("Connected to WebSocket server!");
  });

  // Écouter un événement personnalisé 'server-response' émis par le serveur
  socket.on("server-response", (data) => {
    console.log("Réponse du serveur:", data);
     });
});

// Fonction pour créer un formulaire (envoi de données au serveur)
function createForm() {
  const formData = formStore.formData;  // Récupérer les données du formulaire depuis ton store

  // Emission de l'événement 'client-message' au serveur
  socket.emit("client-message", formData);

  console.log("Données envoyées au serveur:", formData);
}
</script>


<style scoped>

</style>



<template>
  <div>
    <nav class="flex gap-4 p-4 bg-gray-200">
      <router-link to="/" class="text-blue-500 hover:underline">Admin</router-link>
      <router-link to="/utilisation" class="text-blue-500 hover:underline">Utilisation</router-link>
    </nav>
    
    <router-view />
  </div>
</template>
