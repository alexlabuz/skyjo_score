<template>
    <div class="page">
        <div class="header">
            <img @click="backName" src="/src/assets/icons/back.svg" class="pointer" alt=""/>
            <p>Evolution des scores</p>
            <div></div>
        </div>

        <div class="containerChart">
            <ChartScore :users="score.data.users" :round="score.data.round" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useScoreStore } from '@/stores/score';
import { defineAsyncComponent } from 'vue';

const ChartScore = defineAsyncComponent(() => import("@/component/ChartScore.vue"));

const score = useScoreStore();

function backName() {
    window.location.hash = "/score";
}

</script>

<style scoped>
.containerChart{
    max-width: 800px;
    width: 100%;
}

.page{
    align-items: center;
}
</style>