<script setup>
import { io } from "socket.io-client";
import { onMounted,defineAsyncComponent } from "vue";
const socket = io("http://localhost:5000");
import {useFormStore } from "@/stores/formStore";
const FormEditor = defineAsyncComponent(() =>
  import('./components/FormEditorComponent.vue')
)
const formStore = useFormStore();
onMounted(() => {
  socket.on("connection", () => {
    console.log("connected");
  });
});

// Fonction pour créer un formulaire
function createForm() {

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
