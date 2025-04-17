<template>
  <div class="container">
    <article>
      <ContentRenderer v-if="post" :value="post">
        <Title>{{ post.title }}</Title>
        <h1>{{ post.title }}</h1>
        <p class="max-width description">{{ post.description }}</p>
        <div class="post-fields max-width">
          <div>
            <p class="grotesk-22-light">
              {{ post.date }} &middot; by
              <nuxt-link to="/blog">{{ post.author }}</nuxt-link>
            </p>
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
          </div>
          <div class="moneta-55-regular">
            <nuxt-link to="/blog"> cd ../ </nuxt-link>
          </div>
        </div>

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
  try {
    post.value = await queryContent("blog", route.params.slug).findOne();

    if (!post.value) {
      throw new Error("Content not found.");
    }
  } catch (error) {
    throw showError({
      statusCode: 404,
      fatal: true,
      message: "Page Not Found",
    });
  }
});
</script>

<style lang="scss" scoped>
.container {
  .description {
    margin: 0.5rem 0 1rem 0;

    @media (max-width: #{variables.$baseMobileWidth}px) {
      margin: 0.4rem 0;
    }
  }

  .post-fields {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem;
  }

  @media (max-width: #{variables.$baseMobileWidth}px) {
    h1 {
      font-size: 36px;
      font-weight: bold;
    }
  }
}
</style>
