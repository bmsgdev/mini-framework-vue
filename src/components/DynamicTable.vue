<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  data: { type: Array, required: true }, // Données du tableau
  actions: { type: Array, default: () => [] }, // Liste des actions (ex: Edit, Delete)
});

// Générer dynamiquement les colonnes sauf les actions et l'id
const columns = computed(() =>
  props.data.length > 0 ? Object.keys(props.data[0]).filter(column => column !== 'id') : []
);

// Gestion du tri
const sortKey = ref(null);
const sortOrder = ref(1);

function sortBy(column) {
  if (sortKey.value === column) {
    sortOrder.value *= -1;
  } else {
    sortKey.value = column;
    sortOrder.value = 1;
  }
}

// Trier les données
const sortedData = computed(() => {
  if (!sortKey.value) return props.data;
  return [...props.data].sort((a, b) => {
    const valA = a[sortKey.value];
    const valB = b[sortKey.value];
    return (valA > valB ? 1 : -1) * sortOrder.value;
  });
});
</script>

<template>
  <div class="overflow-x-auto shadow-xl rounded-2xl mt-6 bg-white p-6">
    <table class="min-w-full table-auto border-separate border-spacing-0 rounded-lg">
      <!-- HEADER -->
      <thead class="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm uppercase">
        <tr>
          <th
            v-for="column in columns"
            :key="column"
            @click="sortBy(column)"
            class="py-3 px-5 text-left cursor-pointer hover:bg-gray-300 transition rounded-tl-lg"
          >
            <div class="flex items-center space-x-1">
              <span>{{ column.toUpperCase() }}</span>
              <span v-if="sortKey === column">
                {{ sortOrder === 1 ? "▲" : "▼" }}
              </span>
            </div>
          </th>
          <th class="py-3 px-5 text-left rounded-tr-lg">Actions</th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        <!-- Cas où il n'y a pas de données -->
        <tr v-if="sortedData.length === 0">
          <td :colspan="columns.length + 1" class="text-center py-6 text-gray-500">
            Aucune donnée disponible
          </td>
        </tr>
        
        <!-- Lignes de données -->
        <tr
          v-for="(item, index) in sortedData"
          :key="index"
          class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
        >
          <td
            v-for="column in columns"
            :key="column"
            class="py-4 px-5 border-b text-gray-700"
          >
            {{ item[column] }}
          </td>

          <!-- Actions -->
          <td class="py-4 px-5 border-b text-gray-700">
            <div class="flex justify-start space-x-3">
              <button
                v-for="action in actions"
                :key="action.label"
                @click="action.method(item)"
                class="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md transition"
                :class="action.color"
              >
                {{ action.label }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
