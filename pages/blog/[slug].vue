<template>
  <article>
    <ContentRenderer v-if="post" :value="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.date }} - {{ post.author }}</p>
      <p>Tags: {{ post.tags.join(', ') }}</p>
      <p>Category: {{ post.category }}</p>
      <ContentRendererMarkdown :value="post" />
    </ContentRenderer>
    <p v-else>Loading...</p>
  </article>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);

onMounted(async () => {
  post.value = await queryContent('blog', route.params.slug).findOne();
});
</script>