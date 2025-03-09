<template>
  <component :is="currentView" />
</template>

<script setup lang="js">
import { computed, ref } from 'vue';
import Names from '@/pages/Names.vue';
import Score from '@/pages/Score.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = {
  '/': Names,
  '/score': Score
}

const currentPath = ref(window.location.hash)

console.log(`Page : ${currentPath.value}`)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
  console.log(`Page : ${currentPath.value}`)
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] ?? NotFound;
})
</script>