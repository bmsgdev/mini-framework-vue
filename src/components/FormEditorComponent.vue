<script setup>
import { useFormStore } from "@/stores/formStore";
import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";
import FormPrevsualizer from "./FormPrevsualizer.vue";
import DynamicTable from "./DynamicTable.vue";
import { useToast } from "vue-toastification"; 
const toast = useToast(); 

const formStore = useFormStore();
const isModalOpen = ref(false);
const socket = io("http://localhost:5000"); 

const actions = [
  {
    label: "Modifier",
    method: (item) => {
      formStore.editFormFields(item);
      socket.emit("form-action", { action: "edit", item });
    },
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    label: "Supprimer",
    method: (item) => {
      formStore.deleteForm(item);
      socket.emit("form-action", { action: "delete", item });
    },
    color: "bg-red-500 hover:bg-red-600",
  },
];

// Écoute des réponses du serveur
onMounted(() => {
  // socket.on("server-response", (data) => {
  //   toast.info(`Réponse du serveur : ${data || "Aucune donnée"}`);
  // });
});

onUnmounted(() => {
  socket.off("server-response"); // Nettoyage de l'écouteur
});

// Ajouter une nouvelle ligne
function addNewLine() {
  const newField = {
    fieldName: "",
    fieldType: "text",
    fieldplaceholder: "un placeholder (optional)",
    fieldValue: "",
  };
  
  formStore.formFields.push(newField);
  socket.emit("form-action", { action: "add", field: newField });
}

// Supprimer un champ
function removeField(index) {
  const removedField = formStore.formFields[index];
  formStore.formFields.splice(index, 1);
  socket.emit("form-action", { action: "remove", field: removedField });
}

// Générer un aperçu
function generatePreview() {
  formStore.preview = true;
  socket.emit("form-action", { action: "preview", formName: formStore.formName });
}

// Sauvegarder le formulaire
function saveForm() {
  console.log("Formulaire sauvegardé :", formStore);
  isModalOpen.value = false;
  socket.emit("form-action", { action: "save", formName: formStore.formName, fields: formStore.formFields });
}

// Fonction pour récupérer nom + description des champs
function getFieldsInfo(fields) {
  console.log(fields);
  return fields.map(({ formName, formDescription }) => ({
    name: formName,
    description: formDescription,
  }));
}
</script>


<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">FormMaker</h1>

    <!-- Nom du formulaire -->
    <input 
      type="text" 
      class="w-full border-2 border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Nom du formulaire" 
      v-model="formStore.formName"
    />
    <input 
      type="text" 
      class="w-full border-2 border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Description du formulaire" 
      v-model="formStore.formDescription"
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
    <button v-if="!formStore.editForm"
      @click="generatePreview"
      class="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mt-4"
    >
      Générer et prévisualiser
    </button>
    <button  v-else
      @click="formStore.updateForm()"
      class="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mt-4"
    >
      Modifier
    </button>
    
  </div>

  <!-- Modal de prévisualisation -->
  <div v-if="formStore.preview" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <FormPrevsualizer />
  </div>
  <DynamicTable :data="formStore.getFieldsInfo(formStore.forms)" :actions="actions"  />
</template>

<style scoped>
</style>
