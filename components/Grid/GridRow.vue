<template>
    <div class="grid-row">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.grid-row {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
}
</style>