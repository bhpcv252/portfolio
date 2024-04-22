<script setup lang="ts">
const { isDesktop } = useDevice();

</script>

<template>
    <div class="home" v-if="isDesktop">
        <Title>Home</Title>
        <!-- Location Modal should be client only instead of this -->
        <ClientOnly> 
            <SectionBanner />
        </ClientOnly>
        <SectionAbout />
        <SectionWork />
        <SectionExperiments />
        <SectionContact />
    </div>
    <MobileInfo v-else />
</template>

<style lang="scss" scoped></style>