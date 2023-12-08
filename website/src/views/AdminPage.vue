<template>
	<div class="container my-auto mx-auto p-4">
		<div class="flex flex-row items-center">
			<div class="absolute mt-12">
				<router-link
					to="/"
					class="!text-black mr-4"
					@click.prevent="authStore.logout()"
				>
					<img
						src="@/assets/img/logo/logo.svg"
						class="object-contain h-20"
					/>
				</router-link>
			</div>
			<div class="flex flex-row justify-center mb-4 w-full">
				<h1 class="text-3xl font-semibold">Admin Dashboard</h1>
			</div>
		</div>

		<div class="space-x-4 mb-4">
			<!-- Style des boutons pour changer de formulaire -->
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'movies' }"
				@click="changeForm('movies')"
			>
				Films
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'sessions' }"
				@click="changeForm('sessions')"
			>
				Séances
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'accounts' }"
				@click="changeForm('accounts')"
			>
				Comptes
			</button>
		</div>

		<!-- Ajout du trait horizontal bleu -->
		<div class="border-b-4 rounded-3xl border-blue-500 mb-4"></div>

		<!-- Rendu conditionnel en fonction de activeForm -->
		<component :is="activeFormComponent" />
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AccountsManagement from '../components/Admin/AccountsManagement.vue';
import MoviesManagement from '../components/Admin/MoviesManagement.vue';
import SessionsManagement from '../components/Admin/SessionsManagement.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

// Part to Hide the page for unlogged users
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
	const isLoggedIn = await authStore.isLoggedIn();
	if (!isLoggedIn) {
		router.push('/login');
	}
});

const activeForm = ref('create');

// Fonctions pour changer le formulaire actif
const activeFormComponent = computed(() => {
	switch (activeForm.value) {
		case 'accounts':
			return AccountsManagement;
		case 'movies':
			return MoviesManagement;
		case 'sessions':
			return SessionsManagement;
		default:
			return MoviesManagement; // Composant par défaut
	}
});

const changeForm = (formName) => {
	activeForm.value = formName;
};
</script>

<style scoped>
/* Styles spécifiques au composant */
.container {
	text-align: center;
	padding: 20px;
}

.btn-primary {
	background-color: #007bff;
	color: #fff;
	border: none;
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.btn-primary.btn-active {
	background-color: #0056b3;
}
</style>
s
