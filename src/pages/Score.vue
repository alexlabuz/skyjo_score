<template>
<div class="page">
    <div class="header">
        <img @click="backName" src="/src/assets/icons/back.svg" class="pointer"/>
        <p>Score</p>
        <div></div>
    </div>
    <table class="table_score">
        <thead>
            <tr>
                <th>Round</th>
                <th class="name" v-for="name in score.data.users">{{ name.name }}</th>
            </tr>
        </thead>
        <tbody>
            <!--Points history-->
            <tr v-for="indexRound in score.data.round">
                <td class="round_number">{{ indexRound }}</td>
                <td class="user_point" v-for="point in score.data.users.map((u) => u.points)">
                    {{ point.find((p) => p.round === indexRound-1)?.point }}
                    <span v-if="(point.find((p) => p.round === indexRound-1)?.multiplicator ?? 1) > 1" class="multiplicator_span">
                        {{ `x ${point.find((p) => p.round === indexRound-1)?.multiplicator}` }}
                    </span>
                </td>
            </tr>

            <!--Points inputs-->
            <tr class="point_input">
                <td class="round_number">{{ score.data.round + 1 }}</td>
                <td class="input_point" v-for="(u, i) in score.data.users">
                    <input type="number" v-model="u.pointCurrentRound" max="120" min="-17">
                    <div>
                        <input :id="'end' + i" type="radio" :value="u" v-model="score.data.endRound"/>
                        <label :for="'end' + i">Fin</label>
                    </div>
                </td>
            </tr>

            <!--Total-->
            <tr class="total">
                <td class="round_number">Total</td>
                <td class="total_user_point" v-for="totalPoint in score.data.users.map((u) => u.getSumPoint())">
                    {{ totalPoint }}
                </td>
            </tr>
        </tbody>
    </table>
    <div class="header">
        <div></div>
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

onUnmounted(() => score.saveData());

onBeforeMount(() => {
    score.saveData();
    if(!score.data.gameStart){
	    window.location.hash = '/';
    }
});

</script>

<style scoped>

.page{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
/*-Table-*/
.table_score{
    border-collapse: collapse;
    display: block;
    overflow-y: auto;
    width: 100%;
    flex-grow: 1;
    font-size: 20px;
}

.table_score{
    text-align: center;
}

/*-tr-*/
tr.total{
    background-color: gray;
    color: white;
}
tr.point_input{
    background-color: antiquewhite;
}

/*-td-*/
td.round_number{
    font-weight: bold;
}
td.user_point{
}
td.total_user_point{

}

td.input_point{
    font-size: 16px;
}

.multiplicator_span{
    background-color: gray;
    color: white;
    padding: 1px;
    font-size: 11px;
    font-weight: bold;
}
</style>