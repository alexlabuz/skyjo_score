<template>
    <div class="page">
        <div class="header">
            <img @click="backName" src="/src/assets/icons/back.svg" class="pointer"/>
            <p>Evolution des scores</p>
            <div></div>
        </div>

        <div class="containerChart">
            <canvas id="chart"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useScoreStore } from '@/stores/score';
import { onMounted, ref } from 'vue';
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Colors, type ChartDataset } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Legend, Colors);

const score = useScoreStore();
const chart = ref<Chart | null>(null);

function backName() {
    window.location.hash = "/score";
}

onMounted(() => {
    const ctx = document.getElementById('chart') as HTMLCanvasElement | null;
    var statsDatasets: ChartDataset[] = [];

    score.data.users.forEach((u) => {
        statsDatasets.push({
            data: u.getProgressionPoints(),
            label: u.name,
        });
    });

    chart.value = new Chart(ctx!, {
        type: "line",
        data: {
            datasets: statsDatasets,
            labels: Array.from({ length: score.data.round }, (_, i) => `Round ${i+1}` ),
        },
        options: {
            responsive: true,
            animation: false,
            aspectRatio: window.innerWidth > 800 ? 2 : 1,
        },
    });
});
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