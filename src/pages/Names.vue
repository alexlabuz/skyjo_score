<template>
<div class="page">
	<h1>Saisir les noms</h1>

	<div class="list_user">
		<div v-for="(u, index) in score.data.users" class="user_name_input">
			<input type="text" v-model="u.name" :placeholder="`Nom n°${index + 1}`" maxlength="12" :disabled="score.data.gameStart" />
			<button @click="deleteUser(u)" :disabled="score.data.gameStart">Suppimer</button>
		</div>
	</div>

	<button @click="addUser" :disabled="score.data.gameStart" style="margin-bottom: 1em;">Ajouter utilisateur</button>
	<button :disabled="!getValidNames" @click="startGame">{{ !score.data.gameStart ? 'Commencer la partie' : 'Afficher les score'}}</button>
</div>
</template>

<script setup lang="ts">
import { User } from '@/models/Entity';
import { useScoreStore } from '@/stores/score';
import { computed } from 'vue';

const score = useScoreStore();

const getValidNames = computed(() => !score.data.users.some(u => u.name === null || u.name.length <= 0))

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
    height: 100%;
    display: flex;
    flex-direction: column;
	align-items: start;
}
.user_name_input {
	display: flex;
}

.user_name_input input {
	width: 100%;
}
</style>