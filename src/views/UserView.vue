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
    label: "Utiliser",
    method: (item) => formStore.useForm(item),
    color: "bg-blue-500 hover:bg-blue-600",
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
  <div class="p-6">
    <h1 class=" text-center text-2xl font-bold mb-4">Utiliser un Formulaire</h1>
    <!-- <button
      @click="showFormList = true"
      class="mr-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md border-2 border-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
    >
      Sélectionner un formulaire
    </button> -->
    <!-- <button
      @click="updateFieldNamesAndValues()"
      class="px-6 py-2 mt-4 bg-green-500 text-white font-semibold rounded-lg shadow-md border-2 border-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
    >
      Changer de Formulaire
    </button> -->

    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      v-if="showFormList"
    >
      <div class="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl">
        <button
          @click="showFormList = false"
          class="absolute top-2 right-2 text-red-500 transition"
        >
          ✖
        </button>

        <DynamicTable
          :data="formStore.getFieldsInfo(formStore.forms)"
          :actions="actions1"
        />
      </div>
    </div>

      <FormPrevsualizer />

    <div>
      <DynamicTable :data="formStore.allData" :actions="actions1" />
    </div>

    <div class="text-center mt-6">
      <p>Sur cette page, un utilisateur peut remplir un formulaire existant.</p>
    </div>
  </div>
</template>
