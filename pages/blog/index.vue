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
          <input v-model="startDate" type="date" @change="changePage(1)" />
          <input v-model="endDate" type="date" @change="changePage(1)" />
        </div>
        <div class="moneta-55-regular page-title">
          <span class="line"></span>
          <span>Blog</span>
        </div>
      </div>

      <!-- Posts List -->
      <div v-if="posts.length" class="posts">
        <div v-for="post in posts" :key="post._path" class="post">
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
import { ref, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Pagination from "~/components/Pagination.vue";
import { extractTextFromAST } from "~/utils/blog.ts";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Sonu's Blog` : "Sonu's Blog";
  },
});

const router = useRouter();
const route = useRoute();
const currentPage = ref(Number.parseInt(route.query.page || 1));
const perPage = 5;
const posts = ref([]);
const totalPages = ref(0);

// Filters
const searchQuery = ref(route.query.search || ""); // Default to empty search if not present
const selectedCategory = ref(route.query.category || ""); // Default to empty category if not present
const selectedTag = ref(route.query.tag || ""); // Default to empty tag if not present
const startDate = ref(route.query.start || ""); // Default to empty start date if not present
const endDate = ref(route.query.end || ""); // Default to empty end date if not present

const categories = ref([]);
const tags = ref([]);

const fetchPosts = async () => {
  let query = queryContent("blog").sort({ date: -1 });

  // Apply category filter
  if (selectedCategory.value) {
    query = query.where({ category: { $eq: selectedCategory.value } });
  }

  // Apply tag filter
  if (selectedTag.value) {
    query = query.where({ tags: { $in: selectedTag.value } });
  }

  // Apply date range filter
  if (startDate.value) {
    query = query.where({ date: { $gte: startDate.value } });
  }
  if (endDate.value) {
    query = query.where({ date: { $lte: endDate.value } });
  }

  // Fetch all posts
  const allPosts = await query.find();

  // Client-side search filter
  if (searchQuery.value) {
    const searchText = searchQuery.value.toLowerCase();
    // Filter posts by title or body content (case-insensitive search)
    posts.value = allPosts.filter((post) => {
      const bodyText = extractTextFromAST(post.body) || "";
      return (
        post.title.toLowerCase().includes(searchText) ||
        bodyText.toLowerCase().includes(searchText)
      );
    });
  } else {
    posts.value = allPosts;
  }

  totalPages.value = Math.ceil(posts.value.length / perPage);
  const start = (currentPage.value - 1) * perPage;
  posts.value = posts.value.slice(start, start + perPage);
};

const loadCategoriesAndTags = async () => {
  const allPosts = await queryContent("blog").find();

  // Extract unique categories and tags
  categories.value = [...new Set(allPosts.map((post) => post.category))];
  tags.value = [...new Set(allPosts.flatMap((post) => post.tags))];
};

// Load categories and tags when the component mounts
onMounted(() => {
  loadCategoriesAndTags();
  fetchPosts(); // Initial fetch of posts
});

watch(
  () => route.query,
  (newQuery) => {
    currentPage.value = Number.parseInt(newQuery.page || 1);
    searchQuery.value = newQuery.search || "";
    selectedCategory.value = newQuery.category || "";
    selectedTag.value = newQuery.tag || "";
    startDate.value = newQuery.start || "";
    endDate.value = newQuery.end || "";

    fetchPosts();
  },
  { immediate: true },
);

const changePage = (page) => {
  currentPage.value = page;
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
      }
    }
  }

  .posts {
    max-width: 70%;
  }

  .post {
    margin: utils.pxToRem(40) 0;
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
    font-size: 1rem;

    &:focus {
      outline-color: variables.$textColor;
    }
  }
}
</style>
