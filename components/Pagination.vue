<template>
    <div class="pagination">
      <button @click="goToPage(current - 1)" :disabled="current <= 1">Previous</button>
      <span>Page {{ current }} of {{ total }}</span>
      <button @click="goToPage(current + 1)" :disabled="current >= total">Next</button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    current: { type: Number, required: true },
    total: { type: Number, required: true }
  });
  
  defineEmits(['change']);
  
  const goToPage = (page) => {
    emit('change', page);
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .pagination button {
    padding: 5px 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  