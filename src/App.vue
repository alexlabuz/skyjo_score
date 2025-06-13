<template>
  <component :is="currentView" />
</template>

<script setup lang="js">
import { computed, onBeforeMount, ref } from 'vue';
import Names from '@/pages/Names.vue';
import Score from '@/pages/Score.vue';
import Ranking from './pages/Ranking.vue';
import NotFound from '@/pages/NotFound.vue';
import { useScoreStore } from './stores/score';

const routes = {
  '/': Names,
  '/score': Score,
  '/rank': Ranking
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] ?? NotFound;
})


const score = useScoreStore();

onBeforeMount(() => {
  score.loadData();
})

</script>