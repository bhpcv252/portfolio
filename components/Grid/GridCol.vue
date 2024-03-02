<script lang="ts" setup>
const props = defineProps({
    from: String,
    to: String
})
</script>

<template>
    <div class="grid-col">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.grid-col {
    grid-column: v-bind(from)/v-bind(to);
}
</style>