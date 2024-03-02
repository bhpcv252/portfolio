<script lang="ts" setup>
const props = defineProps({
    from: Number,
    to: Number
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