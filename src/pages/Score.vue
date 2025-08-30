<template>
<div class="page">
    <div class="header">
        <img @click="backName" src="/src/assets/icons/back.svg" class="pointer"/>
        <p>Score</p>
        <div></div>
    </div>

    <div class="container_table">
        <table class="table_score">
            <thead>
            <tr>
                <th class="fixed_col">Round</th>
                <th class="name" v-for="name in score.data.users">{{ name.name }}</th>
            </tr>
            </thead>
            <tbody>
            <!--Points history-->
            <tr class="point_history" v-for="indexRound in score.data.round">
                <td class="fixed_col round_number">{{ indexRound }}</td>
                <td v-for="point in score.data.users.map((u) => u.points)">
                    {{ point.find((p) => p.round === indexRound-1)?.point }}
                    <span v-if="(point.find((p) => p.round === indexRound-1)?.multiplicator ?? 1) > 1" class="multiplicator_span">
                        {{ `x ${point.find((p) => p.round === indexRound-1)?.multiplicator}` }}
                    </span>
                </td>
            </tr>

            <!--Points inputs-->
            <tr class="point_input">
                <td class="fixed_col round_number">{{ score.data.round + 1 }}</td>
                <td class="input_point" v-for="(u, i) in score.data.users">
                    <input class="input" type="number" v-model="u.pointCurrentRound" max="120" min="-17">
                    <div>
                        <input :id="'end' + i" type="radio" :value="u" v-model="score.data.endRound"/>
                        <label :for="'end' + i"><b>Fin</b></label>
                    </div>
                </td>
            </tr>

            <!--Total-->
            <tr class="total">
                <td class="fixed_col round_number">Total</td>
                <td v-for="user in score.data.users" :class="{lostPoint: user.hasLost()}">
                    {{ user.getSumPoint() }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="header">
        <div style="display: flex; gap: 1em;">
            <img @click="goRanking" src="/src/assets/icons/ranking.svg" class="pointer"/>
            <img @click="goStats" src="/src/assets/icons/stats.svg" class="pointer"/>
        </div>
        <button @click="score.validRound" :disabled="!getValidScore" class="btn">Valider la manche</button>
        <img src="/src/assets/icons/delete.svg" @click="score.removeData()" class="pointer" />
    </div>
</div>
</template>

<script setup lang="ts">
import { useScoreStore } from '@/stores/score';
import { computed, onBeforeMount, onUnmounted } from 'vue';

const score = useScoreStore();

const getValidScore = computed(() => {
    const isExistEmptyCurrentScore = score.data.users
        .map((u) => u.pointCurrentRound)
        .some((p) => (p == null || p.toString().length <= 0));

    const isEndUserSelected = score.data.endRound != null;

    return !isExistEmptyCurrentScore && isEndUserSelected;
});

function backName() {
    window.location.hash = "/";
}

function goRanking() {
    window.location.hash = "/rank"
}

function goStats() {
    window.location.hash = "/stats"
}

onUnmounted(() => score.saveData());

onBeforeMount(() => {
    score.saveData();
});

</script>

<style scoped>

.page{
    justify-content: space-between;
}

/*-Table-*/

.container_table {
    flex-grow: 1;
}

.table_score{
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
    font-size: 18px;
    text-align: center;
    padding-bottom: 5px;
}

.fixed_col {
    width: 80px;
    position: sticky;
    left: 0;
}

/*-th-*/
th.name{
    width: 120px;
    min-width: 80px;
    font-style: italic;
}

/*-tr-*/
tr.point_history:nth-child(even) {
    background-color: whitesmoke;
}
tr.point_input{
    background-color: var(--secondary);
}
tr.total{
    background-color: var(--primary);
    color: white;
}

/*-td-*/
td.round_number{
    font-weight: bold;
}

.lostPoint{
    background-color: var(--danger);
}

td.input_point{
    font-size: 16px;
}

td.input_point input{
    padding: 2px;
}

.multiplicator_span{
    background-color: gray;
    color: white;
    padding: 1px;
    font-size: 11px;
    font-weight: bold;
}
</style>