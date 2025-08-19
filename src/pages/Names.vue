<template>
    <div class="page">
        <div class="header">
            <div></div>
            <p>Skyjo Calculator</p>
            <div></div>
        </div>

        <div class="list_user" style="margin: 5px">
            <div v-for="(u, index) in score.data.users" class="user_name_input">
                <input class="input" type="text" v-model="u.name" :placeholder="`Nom n°${index + 1}`" maxlength="12" :disabled="score.data.gameStart" />
                <button class="btn" @click="deleteUser(u)" :disabled="isDeleteUserDisabled">
                    <div class="icon_delete"></div>
                </button>
            </div>

            <button class="btn btn_add" @click="addUser" :disabled="isAddUserDisabled" style="margin-bottom: 1em;">Ajouter joueur +</button>
        </div>

        <div class="header">
            <div></div>
            <button class="btn" :disabled="!getValidNames" @click="startGame">{{ !score.data.gameStart ? 'Commencer la partie' : 'Afficher les score'}}</button>
            <div></div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { User } from '@/models/Entity';
import { useScoreStore } from '@/stores/score';
import { computed } from 'vue';

const score = useScoreStore();

const isAddUserDisabled = computed(() => score.data.gameStart || score.data.users.length >= 8);
const isDeleteUserDisabled = computed(() => score.data.gameStart || score.data.users.length <= 2);

const getValidNames = computed(() => !score.data.users.some(u => u.name === null || u.name.length <= 0));

function startGame() {
	score.data.gameStart = true;
	window.location.hash = '/score';
}

function addUser() {
	score.data.users.push(new User())
}

function deleteUser(user: User) {
	const i = score.data.users.indexOf(user);
	score.data.users.splice(i, 1);
}

</script>

<style scoped>
.page{
    justify-content: space-between;
}

.list_user {
    flex-grow: 1;
}

.user_name_input {
	display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 8px;
}

.user_name_input input {
	width: 100%;
}

.user_name_input button{
    height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon_delete {
    width: 16px;
    height: 18px;
    background-color: white;
    mask: url('/src/assets/icons/delete.svg') no-repeat center;
}

.user_name_input button:disabled .icon_delete{
    background-color: darkgray;
}

.btn_add{
    width: 100%;
}

</style>