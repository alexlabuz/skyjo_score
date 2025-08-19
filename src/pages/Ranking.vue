<template>
<div class="page">
    <div class="header">
        <img @click="backName" src="/src/assets/icons/back.svg" class="pointer"/>
        <p>Classement</p>
        <div></div>
    </div>

    <table class="row_rang">
        <tr v-for="(u, i) in ranking">
            <td class="position">{{ (i + 1) }}</td>
            <td class="point" :class="{lostPoint: u.hasLost()}">
                <span>{{ u.getSumPoint() }}</span>
                <span style="font-size: 12px;"> pts</span>
            </td>
            <td>{{ u.name }}</td>
        </tr>
    </table>
</div>
</template>

<script setup lang="ts">
import { useScoreStore } from '@/stores/score';
import { computed } from 'vue';

const score = useScoreStore();
const ranking = computed(() => [...score.data.users].sort((a,b) => a.getSumPoint() - b.getSumPoint()))

function backName() {
    window.location.hash = "/score";
}

</script>

<style scoped>
.row_rang{
    width: 100%;
    border-collapse: collapse;
}

.row_rang tr{
    background-color: var(--secondary);
}

.row_rang tr:nth-child(even) {
    filter: brightness(115%);
}

.row_rang td{
    padding: 5px;
}

.row_rang td.position{
    width: 40px;
    text-align: center;
    font-weight: bolder;
}

.row_rang td.point{
    width: 60px;
}

.row_rang td.lostPoint{
    color: var(--danger);
    font-weight: bold;
}
</style>