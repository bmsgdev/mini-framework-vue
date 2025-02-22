<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  data: { type: Array, required: true }, // Données du tableau
  actions: { type: Array, default: () => [] }, // Liste des actions (ex: Edit, Delete)
});

// Générer dynamiquement les colonnes sauf les actions
const columns = computed(() =>
  props.data.length > 0 ? Object.keys(props.data[0]) : []
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
  <div class="overflow-x-auto shadow-lg rounded-lg mt-6 bg-white p-4">
    <table class="min-w-full border border-gray-200 rounded-lg">
      <thead class="bg-gray-200 text-gray-700">
        <tr>
          <th
            v-for="column in columns"
            :key="column"
            @click="sortBy(column)"
            class="py-3 px-4 text-left cursor-pointer hover:bg-gray-300 transition"
          >
            {{ column.toUpperCase() }}
            <span v-if="sortKey === column">
              {{ sortOrder === 1 ? "▲" : "▼" }}
            </span>
          </th>
          <th class="py-3 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="sortedData.length === 0">
          <td :colspan="columns.length + 1" class="text-center py-4 text-gray-500">
            Aucune donnée disponible
          </td>
        </tr>
        <tr
          v-for="(item, index) in sortedData"
          :key="index"
          class="hover:bg-gray-100 transition"
        >
          <td v-for="column in columns" :key="column" class="py-3 px-4 border-b">
            {{ item[column] }}
          </td>
          <td class="py-3 px-4 border-b flex space-x-2">
            <button
              v-for="action in actions"
              :key="action.label"
              @click="action.method(item)"
              class="px-3 py-1 rounded text-white text-sm transition"
              :class="action.color"
            >
              {{ action.label }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
