<template>
    <canvas id="chart"></canvas>
</template>

<script setup lang="ts">
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Colors, type ChartDataset } from 'chart.js';
import { onMounted, type PropType } from "vue";
import { User } from "@/models/Entity.ts";

const props = defineProps({
    users: Object as PropType<User[]>,
    round: Number,
})

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Legend, Colors);

function loadChart() {
    const ctx = document.getElementById('chart') as HTMLCanvasElement | null;
    const statsDatasets: ChartDataset[] = [];

    props.users!.forEach((u) => {
        statsDatasets.push({
            data: u.getProgressionPoints(),
            label: u.name,
        });
    });

    new Chart(ctx!, {
        type: "line",
        data: {
            datasets: statsDatasets,
            labels: Array.from({length: props.round!}, (_, i) => `Round ${i + 1}`),
        },
        options: {
            responsive: true,
            animation: false,
            aspectRatio: window.innerWidth > 800 ? 2 : 1,
        },
    });
}

onMounted(() => loadChart());
</script>