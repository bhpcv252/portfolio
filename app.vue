<script setup lang="ts">

useHead({
    meta: [
        { name: 'description', content: "I'm all about making the web look awesome and function smoothly! From crafting beautiful HTML5 and CSS designs to bringing them to life with JavaScript and TypeScript magic, I've got you covered. Whether it's adding that extra flair with SCSS and SASS or diving deep into frameworks like React and Vue, I'm here to make your projects shine. I've even dabbled in cool animation stuff with GSAP and Three.js!" },
        { name: 'ogDescription', content: "I'm all about making the web look awesome and function smoothly! From crafting beautiful HTML5 and CSS designs to bringing them to life with JavaScript and TypeScript magic, I've got you covered. Whether it's adding that extra flair with SCSS and SASS or diving deep into frameworks like React and Vue, I'm here to make your projects shine. I've even dabbled in cool animation stuff with GSAP and Three.js!" }
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