<script setup>
import { useFormStore } from "@/stores/formStore";
import { ref } from "vue";

const formStore = useFormStore();
function saveForm() {
    formStore.createForm()
  console.log("Formulaire sauvegardé :");
  formStore.preview = false;
}
</script>
<template>
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">Prévisualisation du formulaire</h2>

      <h3 class="text-lg font-semibold">{{ formStore.formName }}</h3>

      <div v-for="(field, index) in formStore.formFields" :key="'preview-' + index" class="mb-3">
        <label class="block font-medium">{{ field.fieldName }}</label>
        <input 
          :type="field.fieldType"
          class="w-full border-2 border-gray-300 p-2 rounded-md mt-1"
          :placeholder="field.fieldplaceholder"
          v-model="field.fieldValue"
          disabled
        />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button 
          @click="formStore.preview = false"
          class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          Annuler
        </button>
        <button 
          @click="saveForm"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Sauvegarder
        </button>
      </div>
    </div>

</template>