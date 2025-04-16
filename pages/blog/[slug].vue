<template>
  <div class="container">
    <article>
      <ContentRenderer v-if="post" :value="post">
        <Title>{{ post.title }}</Title>
        <h1>{{ post.title }}</h1>
        <p class="max-width description">{{ post.description }}</p>
        <p class="grotesk-22-light">{{ post.date }}</p>
        <p class="grotesk-22-light">
          Tags:
          <span v-for="(tag, index) in post.tags" :key="tag">
            <nuxt-link
              :to="{
                path: '/blog',
                query: {
                  page: 1,
                  tag: tag,
                },
              }"
            >
              {{ tag }}
            </nuxt-link>
            <span v-if="index < post.tags.length - 1">, </span>
          </span>
        </p>

        <p class="grotesk-22-light">
          Category:
          <nuxt-link
            :to="{
              path: '/blog',
              query: {
                page: 1,
                category: post.category,
              },
            }"
          >
            {{ post.category }}
          </nuxt-link>
        </p>

        <hr />

        <div class="markdown-body">
          <ContentRendererMarkdown :value="post" />
        </div>
      </ContentRenderer>

      <p v-else>Loading...</p>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import "github-markdown-css/github-markdown-light.css";

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
  .description {
    margin: 1rem 0;
  }
}
</style>
