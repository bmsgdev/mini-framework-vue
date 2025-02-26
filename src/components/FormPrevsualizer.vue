<script setup>
import { useFormStore } from "@/stores/formStore";
import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

const formStore = useFormStore();
const socket = io("http://localhost:5000");

// Écoute des réponses du serveur en temps réel
onMounted(() => {
  socket.on("server-response", (data) => {
    console.log("Réponse du serveur :", data);
    // Ici, tu peux mettre à jour ton store si besoin
  });
});

onUnmounted(() => {
  socket.off("server-response"); // Nettoyage de l'écouteur
});

function saveForm() {
  formStore.createForm();
  formStore.preview = false;

  // Émettre un événement pour notifier le serveur d'une action de sauvegarde
  socket.emit("form-action", {
    action: "saveForm",
    formName: formStore.formName,
  });
}

function saveData() {
  const data = formStore.formFields.reduce((acc, { fieldName, fieldValue }) => {
    acc[fieldName] = fieldValue;
    return acc;
  }, {});
  const uniqueId = Math.random().toString(36).substr(2, 9);
  data.id = uniqueId;

  formStore.saveData({ formName: formStore.formName, data });

  // Réinitialisation des champs après l'enregistrement
  formStore.resetAllFieldsValueInformFields();

  // Émettre un événement pour notifier la modification des données
  socket.emit("form-action", {
    action: "saveData",
    formName: formStore.formName,
    data,
  });
}

function updateField() {
  formStore.updateFieldValue();

  // Émettre un événement en temps réel lorsqu'une modification est faite
  socket.emit("form-action", { action: "updateField" });
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
    <h2 class="text-xl font-bold mb-4">Prévisualisation du formulaire</h2>

    <h3 class="text-lg font-semibold">{{ formStore.formName }}</h3>

    <div
      v-for="(field, index) in formStore.formFields"
      :key="'preview-' + index"
      class="mb-3"
    >
      <label class="block font-medium">{{ field.fieldName }}</label>
      <input
        :type="field.fieldType"
        class="w-full border-2 border-gray-300 p-2 rounded-md mt-1"
        :placeholder="field.fieldplaceholder"
        v-model="field.fieldValue"
        :disabled="formStore.preview"
      />
    </div>

    <div class="flex justify-end gap-2 mt-4" v-if="formStore.editForm">
      <button
        @click="updateField()"
        class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
      >
        Modifier
      </button>
    </div>
    <div class="flex justify-end gap-2 mt-4" v-if="!formStore.editForm">
      <button
        v-if="formStore.preview"
        @click="formStore.preview = false"
        class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
      >
        Annuler
      </button>
      <button
        @click="formStore.preview ? saveForm() : saveData()"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Sauvegarder
      </button>
    </div>
  </div>
</template>
