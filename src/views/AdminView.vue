<script setup>
import FormEditorComponent from "@/components/FormEditorComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="p-6">
    <h1 class="text-center text-2xl font-bold mb-4">Gestion des Formulaires</h1>
    <div class="mt-6">
      <FormEditorComponent />
    </div>
  </div>
</template>
