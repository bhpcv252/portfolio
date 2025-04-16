<template>
  <div class="pagination">
    <button @click="goToPage(current - 1)" :disabled="current <= 1">
      Previous
    </button>
    <span>Page {{ current }} of {{ total }}</span>
    <button @click="goToPage(current + 1)" :disabled="current >= total">
      Next
    </button>
  </div>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
});

defineEmits(["change"]);

const goToPage = (page) => {
  emit("change", page);
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.pagination button {
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  background-color: variables.$textColor;
  color: white;
  border: none;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
