<template>
  <div>
    <h1>Blog</h1>

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
        <option v-for="category in categories" :key="category" :value="category">
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
      <input
        v-model="startDate"
        type="date"
        @change="changePage(1)"
      />
      <input
        v-model="endDate"
        type="date"
        @change="changePage(1)"
      />
    </div>

    <!-- Posts List -->
    <div v-if="posts.length" class="posts">
      <div v-for="post in posts" :key="post._path" class="post">
        <nuxt-link :to="post._path">
          <h2>{{ post.title }}</h2>
        </nuxt-link>
        <p>{{ post.date }} - {{ post.author }}</p>
        <p>Tags: {{ post.tags.join(', ') }}</p>
        <p>Category: {{ post.category }}</p>
      </div>
    </div>

    <div v-else>
      <p>No posts found.</p>
    </div>

    <!-- Pagination -->
    <Pagination :current="currentPage" :total="totalPages" @change="changePage" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Pagination from '~/components/Pagination.vue';
import { extractTextFromAST } from '~/utils/blog.ts'

const router = useRouter();
const route = useRoute();
const currentPage = ref(parseInt(route.query.page || 1));
const perPage = 5;
const posts = ref([]);
const totalPages = ref(0);

// Filters
const searchQuery = ref(route.query.search || ''); // Default to empty search if not present
const selectedCategory = ref(route.query.category || ''); // Default to empty category if not present
const selectedTag = ref(route.query.tag || ''); // Default to empty tag if not present
const startDate = ref(route.query.start || ''); // Default to empty start date if not present
const endDate = ref(route.query.end || ''); // Default to empty end date if not present

const categories = ref([]);
const tags = ref([]);

const fetchPosts = async () => {
  let query = queryContent('blog').sort({ date: -1 });

  // Apply category filter
  if (selectedCategory.value) {
    query = query.where({'category': { $eq: selectedCategory.value }});
  }

  // Apply tag filter
  if (selectedTag.value) {
    query = query.where({'tags': { $in: selectedTag.value }});
  }

  // Apply date range filter
  if (startDate.value) {
    query = query.where({'date': { $gte: startDate.value}});
  }
  if (endDate.value) {
    query = query.where({'date': { $lte: endDate.value }});
  }

  // Fetch all posts
  const allPosts = await query.find();

  // Client-side search filter
  if (searchQuery.value) {
    const searchText = searchQuery.value.toLowerCase();
    // Filter posts by title or body content (case-insensitive search)
    posts.value = allPosts.filter(post => {
      const bodyText = extractTextFromAST(post.body) || '';
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
  const allPosts = await queryContent('blog').find();
  
  // Extract unique categories and tags
  categories.value = [...new Set(allPosts.map(post => post.category))]; 
  tags.value = [...new Set(allPosts.flatMap(post => post.tags))]; 
};

// Load categories and tags when the component mounts
onMounted(() => {
  loadCategoriesAndTags();
  fetchPosts(); // Initial fetch of posts
});

watch([currentPage, searchQuery, selectedCategory, selectedTag, startDate, endDate], fetchPosts, { immediate: true });

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
    }
  });
};
</script>

<style scoped>
/* Add some basic styles for the filters */
.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

input, select {
  padding: 8px;
  font-size: 1rem;
}
</style>
