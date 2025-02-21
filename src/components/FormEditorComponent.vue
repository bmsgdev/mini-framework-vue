<script setup>
import { useFormStore } from "@/stores/formStore";
import { ref } from "vue";
import FormPrevsualizer from "./FormPrevsualizer.vue";

const formStore = useFormStore();
const isModalOpen = ref(false);

function addNewLine() {
  formStore.formFields.push({
    fieldName: "",
    fieldType: "text",
    fieldplaceholder: "un placeholder(optional)",
    fieldValue: "",
  });
}

function removeField(index) {
  formStore.formFields.splice(index, 1);
}

function generatePreview() {
  formStore.preview = true;
}

function saveForm() {
  console.log("Formulaire sauvegardé :", formStore);
  isModalOpen.value = false;
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Bienvenue sur Form CRUD</h1>

    <!-- Nom du formulaire -->
    <input 
      type="text" 
      class="w-full border-2 border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Nom du formulaire" 
      v-model="formStore.formName"
    />

    <!-- Bouton d'ajout d'un champ -->
    <button 
      @click="addNewLine"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-4"
    >
      Ajouter un champ
    </button>

    <!-- Champs dynamiques -->
    <div v-for="(field, index) in formStore.formFields" :key="index" class="flex items-center gap-2 mb-3">
      <input 
        type="text" 
        class="border-2 border-gray-300 p-2 rounded-md w-1/3"
        placeholder="Nom du champ" 
        required
        v-model="field.fieldName" 
      />
      <select 
        v-model="field.fieldType" 
        required
        class="border-2 border-gray-300 p-2 rounded-md w-1/4"
      >
        <option value="text">Texte</option>
        <option value="email">Email</option>
        <option value="number">Nombre</option>
        <option value="password">Mot de passe</option>
      </select>
      <input 
        :type="field.fieldType"
        class="border-2 border-gray-300 p-2 rounded-md w-1/3"
      
        v-model="field.fieldValue"
      />
      <button 
        @click="removeField(index)"
        class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
      >
        X
      </button>
    </div>

    <!-- Bouton pour ouvrir la prévisualisation -->
    <button 
      @click="generatePreview"
      class="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mt-4"
    >
      Générer et prévisualiser
    </button>
  </div>

  <!-- Modal de prévisualisation -->
  <div v-if="formStore.preview" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <FormPrevsualizer />
  </div>
</template>

<style scoped>
</style>
