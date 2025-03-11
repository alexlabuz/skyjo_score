<template>
    <table class="tableScore">
        <thead>
            <tr>
                <th>Round</th>
                <th v-for="name in score.data.users">{{ name.name }}</th>
            </tr>
        </thead>
        <tbody>
            <!--Points history-->
            <tr v-for="indexRound in score.data.round">
                <td class="round_number">{{ indexRound }}</td>
                <td v-for="point in score.data.users.map((u) => u.points)">
                    {{ point.find((p) => p.round === indexRound-1)?.point }}
                    <span v-if="(point.find((p) => p.round === indexRound-1)?.multiplicator ?? 1) > 1" class="multiplicator_span">
                        {{ `x ${point.find((p) => p.round === indexRound-1)?.multiplicator}` }}
                    </span>
                </td>
            </tr>

            <!--Points inputs-->
            <tr class="point_input">
                <td class="round_number">{{ score.data.round + 1 }}</td>
                <td v-for="(u, i) in score.data.users">
                    <input type="number" v-model="u.pointCurrentRound" max="144" min="-20">
                    <div>
                        <input :id="'end' + i" type="radio" :value="u" v-model="score.data.endRound"/>
                        <label :for="'end' + i">Fin</label>
                    </div>
                </td>
            </tr>

            <!--Total-->
            <tr class="total">
                <td class="round_number">Total</td>
                <td v-for="totalPoint in score.data.users.map((u) => u.getSumPoint())">
                    {{ totalPoint }}
                </td>
            </tr>
        </tbody>
    </table>

    <button @click="score.validRound" :disabled="!getValidScore">Valider la manche</button>
    <button @click="score.saveData()">Sauvagarder</button><br><br>
    <button @click="score.removeData()">Supprimer score</button>
</template>

<script setup lang="ts">
import { useScoreStore } from '@/stores/score';
import { computed, onBeforeMount } from 'vue';

const score = useScoreStore();

const getValidScore = computed(() => {
    const isExistEmptyCurrentScore = score.data.users
        .map((u) => u.pointCurrentRound)
        .some((p) => (p == null || p.toString().length <= 0));

    const isEndUserSelected = score.data.endRound != null;

    return !isExistEmptyCurrentScore && isEndUserSelected;
});

onBeforeMount(() => {
    if(!score.data.gameStart){
	    window.location.hash = '/';
    }
});

</script>

<style scoped>
.tableScore{
    display: block;
    overflow-y: auto;
    border: 2px solid black;
    width: 100%;
}

.tableScore td{
    text-align: center;
}

.tableScore .total{
    background-color: gray;
    color: white;
}

.tableScore .point_input{
    background-color: antiquewhite;
}

.tableScore td.round_number{
    width: 0;
}

.multiplicator_span{
    background-color: gray;
    color: white;
    padding: 1px;
    font-size: 11px;
    font-weight: bold;
}
</style>