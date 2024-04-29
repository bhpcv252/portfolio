<script setup lang="ts">
const { isDesktop } = useDevice();


useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Sonu's Portfolio` : "Sonu's Portfolio";
    }
})

</script>

<template>
    <NuxtLayout>
        <div class="desktop-page" v-if="isDesktop">
            <Title>Home</Title>
            <SectionBanner />
            <SectionAbout />
            <SectionWork />
            <SectionExperiments />
            <SectionContact />
        </div>
        <MobileInfo v-else />
    </NuxtLayout>
</template>