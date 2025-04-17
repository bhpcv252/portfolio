<template>
  <div class="blog" id="blog">
    <div class="container">
      <nuxt-link to="/">
        <h1 class="name">
          <span>Sonu</span>
          <span class="line"></span>
          <span>Singh</span>
        </h1>
      </nuxt-link>
      <div class="wrapper">
        <!-- Filter UI -->
        <div class="filters">
          <!-- Search Filter -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search posts..."
            @input="changePage(1)"
          />

          <!-- Category Filter -->
          <select v-model="selectedCategory" @change="changePage(1)">
            <option value="">All Categories</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>

          <!-- Tag Filter -->
          <select v-model="selectedTag" @change="changePage(1)">
            <option value="">All Tags</option>
            <option v-for="tag in tags" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>

          <!-- Date Filter -->
          <label>
            From
            <input v-model="startDate" type="date" @change="changePage(1)" />
          </label>
          <label>
            To
            <input v-model="endDate" type="date" @change="changePage(1)" />
          </label>
        </div>
        <div class="moneta-55-regular page-title">
          <span class="line"></span>
          <span>Blog</span>
        </div>
      </div>

      <hr />

      <!-- Posts List -->
      <div v-if="posts.length" class="posts">
        <div v-for="post in posts" :key="post._path" class="post max-width">
          <nuxt-link :to="post._path">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-description">{{ post.description }}</p>
          </nuxt-link>
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
        </div>
      </div>

      <div v-else>
        <p>No posts found.</p>
      </div>

      <!-- Pagination -->
      <Pagination
        :current="currentPage"
        :total="totalPages"
        @change="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import Pagination from "~/components/Pagination.vue";
import { extractTextFromAST } from "~/utils/blog.ts";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Sonu's Blog` : "Sonu's Blog";
  },
});

const route = useRoute();
const router = useRouter();

const perPage = 5;
const currentPage = computed(() => Number.parseInt(route.query.page || "1"));

const searchQuery = computed(() => route.query.search || "");
const selectedCategory = computed(() => route.query.category || "");
const selectedTag = computed(() => route.query.tag || "");
const startDate = computed(() => route.query.start || "");
const endDate = computed(() => route.query.end || "");

// Fetch categories and tags
const { data: allPostsData } = await useAsyncData("all-posts", async () => {
  return await queryContent("blog").find();
});

const categories = computed(() => {
  const catSet = new Set(allPostsData.value?.map((post) => post.category));
  return Array.from(catSet);
});

const tags = computed(() => {
  const tagSet = new Set(allPostsData.value?.flatMap((post) => post.tags));
  return Array.from(tagSet);
});

// Filter and paginate posts
const { data: filteredPostsData } = await useAsyncData(
  "filtered-posts",
  async () => {
    let query = queryContent("blog").sort({ date: -1 });

    if (selectedCategory.value) {
      query = query.where({ category: { $eq: selectedCategory.value } });
    }

    if (selectedTag.value) {
      query = query.where({ tags: { $in: selectedTag.value } });
    }

    if (startDate.value) {
      query = query.where({ date: { $gte: startDate.value } });
    }

    if (endDate.value) {
      query = query.where({ date: { $lte: endDate.value } });
    }

    const all = await query.find();

    // Client-side search filter
    let filtered = all;
    if (searchQuery.value) {
      const searchText = searchQuery.value.toLowerCase();
      filtered = all.filter((post) => {
        const bodyText = extractTextFromAST(post.body) || "";
        return (
          post.title.toLowerCase().includes(searchText) ||
          bodyText.toLowerCase().includes(searchText)
        );
      });
    }

    return filtered;
  },
);

const totalPages = computed(() => {
  return Math.ceil((filteredPostsData.value?.length || 0) / perPage);
});

const posts = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredPostsData.value?.slice(start, start + perPage) || [];
});

const changePage = (page) => {
  router.push({
    query: {
      page,
      search: searchQuery.value,
      category: selectedCategory.value,
      tag: selectedTag.value,
      start: startDate.value,
      end: endDate.value,
    },
  });
};
</script>

<style lang="scss" scoped>
.container {
  h1.name {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      display: inline-block;
    }

    .line {
      height: 1px;
      width: utils.pxToRem(940);
      background-color: variables.$textColor;
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .page-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;

      span {
        display: inline-block;
      }

      .line {
        height: 1px;
        width: utils.pxToRem(60);
        background-color: variables.$textColor;

        @media (max-width: #{variables.$baseMobileWidth}px) {
          display: none;
        }
      }
    }

    @media (max-width: #{variables.$baseMobileWidth}px) {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 0;
    }
  }

  .post {
    margin: utils.pxToRem(120) 0;

    @media (max-width: #{variables.$baseMobileWidth}px) {
      margin: utils.pxToRem(70) 0;
    }
  }

  .post-title {
    font-weight: bold;
    margin-bottom: utils.pxToRem(20);
  }

  .post-description {
    margin-bottom: utils.pxToRem(20);
  }

  .filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin: utils.pxToRem(50) 0;
  }

  input,
  select {
    padding: utils.pxToRem(10);
    background-color: white;
    border-radius: 0;
    font-size: 1rem;

    &:focus {
      outline-color: variables.$textColor;
    }
  }

  @media (max-width: #{variables.$baseMobileWidth}px) {
    h1 {
      font-size: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 0;
      gap: 10px;
      font-weight: bold;

      span {
        display: inline-block;
      }

      .line {
        height: 1px;
        width: 100%;
        background-color: variables.$textColor;
      }
    }
  }

  label input {
    margin-left: 0.4rem;
  }
}
</style>
