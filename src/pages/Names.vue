<template>
	<h1>Saisir les noms</h1>

	<div class="list_user">
		<div v-for="(u, index) in score.data.users" class="user_name_input">
			<input type="text" v-model="u.name" :placeholder="`Nom n°${index + 1}`" maxlength="12" />
			<button @click="deleteUser(u)">Suppimer</button>
		</div>
	</div>

	<button @click="addUser">Ajouter utilisateur</button>
	<button :disabled="!getValidNames" @click="startGame">Commencer la partie</button>
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
.user_name_input {
	display: flex;
}

.user_name_input input {
	width: 100%;
}
</style>