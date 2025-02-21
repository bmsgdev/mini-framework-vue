<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Remplir un Formulaire</h1>

    <router-link 
      to="/" 
      class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
    >
      Retour à l'Admin
    </router-link>

    <div class="mt-6">
      <p>Sur cette page, un utilisateur peut remplir un formulaire existant.</p>
      <!-- Ici, tu affiches un formulaire sauvegardé -->
    </div>
  </div>
</template>
