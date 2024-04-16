<script setup lang="ts">

useHead({
    meta: [
        { name: 'description', content: "I'm a seasoned web developer with a knack for crafting stunning frontend and rock-solid backend solutions. Over the years, I've had the privilege of collaborating with notable clients like Equinox and Tlnthub, bringing their digital visions to life with my expertise." },
        { name: 'ogDescription', content: "I'm a seasoned web developer with a knack for crafting stunning frontend and rock-solid backend solutions. Over the years, I've had the privilege of collaborating with notable clients like Equinox and Tlnthub, bringing their digital visions to life with my expertise." }
    ],
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Sonu's Portfolio` : "Sonu's Portfolio";
    }
})

</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>