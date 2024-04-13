<script setup lang="ts">
const { isDesktop } = useDevice();



</script>

<template>
    <div class="home" v-if="isDesktop">
        <Title>Home</Title>
        <SectionBanner />
        <SectionAbout />
        <SectionWork />
        <SectionExperiments />
        <SectionContact />
    </div>
    <MobileInfo v-else />
</template>

<style lang="scss" scoped></style>