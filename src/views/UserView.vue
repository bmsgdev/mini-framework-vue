<script setup>
import DynamicTable from "@/components/DynamicTable.vue";
import { useRouter } from "vue-router";
import { useFormStore } from "@/stores/formStore";
import { ref, watch,onMounted } from "vue";
import FormPrevsualizer from "@/components/FormPrevsualizer.vue";

const formStore = useFormStore();
const router = useRouter();
let showFormList = ref(false);
let data = ref([]);

onMounted(() => {
 formStore.preview = false ; 
 formStore.useForm();
});
const actions1 = [
  {
    label: "Modifier",
    method: (item) => formStore.editFormFields(item),
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    label: "Supprimer",
    method: (item) => formStore.deleteElement(item),
    color: "bg-red-500 hover:bg-red-600",
  },
];


// Fonction pour extraire et mettre à jour les champs
function updateFieldNamesAndValues() {
  console.log("Mise à jour des champs et des valeurs...");
  let fields = formStore.allData[0];
  let newData = fields.map((field) => ({
    [field.fieldName]: field.fieldValue,
  }));
console.log(newData);
  // Remplace entièrement `data.value` pour éviter les doublons
  data.value = newData;
}

// Mettre à jour une ligne
function updateRow(rowIndex, fieldName, fieldValue) {
  if (data.value[rowIndex]) {
    data.value[rowIndex][fieldName] = fieldValue;
  }
}

// // Watchers pour mettre à jour les données en fonction des changements
// watch(() => formStore.currentForm, updateFieldNamesAndValues, {
//   immediate: true,
// });

// watch(formStore.allData, updateFieldNamesAndValues);
</script>

<template>
  <div class="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 class="text-center text-3xl font-bold mb-8 text-gray-800">
      Utiliser un Formulaire
    </h1>

    <!-- Formulaire modale (si nécessaire) -->
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      v-if="showFormList"
    >
      <div class="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl">
        <button
          @click="showFormList = false"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-200"
        >
          ✖
        </button>

        <DynamicTable
          :data="formStore.getFieldsInfo(formStore.forms)"
          :actions="actions1"
        />
      </div>
    </div>

    <!-- Preview du formulaire -->
    <FormPrevsualizer class="my-8 w-full max-w-4xl" />

    <!-- Tableau principal -->
    <div class="w-full max-w-4xl mb-8">
      <DynamicTable :data="formStore.allData" :actions="actions1" />
    </div>

    <!-- Texte explicatif -->
    <div class="text-center mt-6 text-gray-600">
      <p>Sur cette page, un utilisateur peut remplir un formulaire existant.</p>
    </div>
  </div>
</template>
