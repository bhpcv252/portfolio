<template>
  <div class="container">
    <article>
      <ContentRenderer v-if="post" :value="post">
        <Title>{{ post.title }}</Title>
        <h1>{{ post.title }}</h1>
        <p>{{ post.date }} - {{ post.author }}</p>
        <p>Tags: {{ post.tags.join(", ") }}</p>
        <p>Category: {{ post.category }}</p>
        <ContentRendererMarkdown :value="post" />
      </ContentRenderer>
      <p v-else>Loading...</p>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Sonu's Blog` : "Sonu's Blog";
  },
});

const route = useRoute();
const post = ref(null);

onMounted(async () => {
  post.value = await queryContent("blog", route.params.slug).findOne();
});
</script>

<style lang="scss" scoped>
.container {
  h2 {
    font-family: "Moneta", serif;
    font-size: utils.pxToRem(135) !important;
    font-weight: bold;
  }
}
</style>
