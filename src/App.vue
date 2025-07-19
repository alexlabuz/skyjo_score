<template>
	<component :is="currentView" />
</template>

<script setup lang="js">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import Names from '@/pages/Names.vue';
import Score from '@/pages/Score.vue';
import Ranking from './pages/Ranking.vue';
import Stats from '@/pages/Stats.vue';
import NotFound from '@/pages/NotFound.vue';
import { useScoreStore } from './stores/score';

const score = useScoreStore();

const routes = {
	'/': Names,
	'/score': Score,
	'/rank': Ranking,
	'/stats': Stats,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', changeHash)

function changeHash() {
	if(window.location.hash != "#/" && !score.data.gameStart){
		window.location.hash = '/';
	}
    
    if(currentPath.value != window.location.hash) {
		currentPath.value = window.location.hash;
	}
}

const currentView = computed(() => {
	return routes[currentPath.value.slice(1) || '/'] ?? NotFound;
})


onBeforeMount(() => {
	score.loadData();
})

onMounted(() => {
    changeHash();
})

</script>