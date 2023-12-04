<template>
	<div class="container my-auto mx-auto p-4">
		<h1 class="text-3xl font-semibold mb-4">Gestion des Séances de Film</h1>

		<div class="space-x-4 mb-4">
			<!-- Style des boutons pour changer de formulaire -->
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'create' }"
				@click="changeForm('create')"
			>
				Créer
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'update' }"
				@click="changeForm('update')"
			>
				Modifier
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'delete' }"
				@click="changeForm('delete')"
			>
				Supprimer
			</button>
		</div>

		<!-- Formulaire de création de séance -->
		<form
			v-if="activeForm === 'create'"
			class="mb-4"
			@submit.prevent="createSession"
		>
			<div class="form-group">
				<label for="startDate" class="block">Date de début:</label>
				<input
					id="startDate"
					v-model="sessionData.startDate"
					type="datetime-local"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="endDate" class="block">Date de fin:</label>
				<input
					id="endDate"
					v-model="sessionData.endDate"
					type="datetime-local"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="theatreName" class="block">Nom du cinéma:</label>
				<input
					id="theatreName"
					v-model="sessionData.theatreName"
					type="text"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="theatreAddress" class="block"
					>Adresse du cinéma:</label
				>
				<input
					id="theatreAddress"
					v-model="sessionData.theatreAddress"
					type="text"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="theatreCity" class="block">Ville du cinéma:</label>
				<input
					id="theatreCity"
					v-model="sessionData.theatreCity"
					type="text"
					class="input"
					required
				/>
			</div>

			<div class="flex flex-col">
				<div class="block">Nom du film:</div>
				<div
					v-if="selectedMovie"
					class="flex flex-row justify-center items-center mb-10"
				>
					<div
						class="relative text-center py-2 px-4 bg-blue-100 rounded-lg shadow mt-2"
					>
						<span class="text-lg font-semibold text-gray-700"
							>{{ selectedMovie.title }}
						</span>
						<span
							class="absolute top-0 right-0 cursor-pointer text-xl text-gray-700"
							@click="selectedMovie = null"
						>
							×
						</span>
					</div>
				</div>
				<div v-else class="flex flex-col">
					<div class="flex flex-row justify-center items-center">
						<SearchBar
							v-model="searchKeyword"
							placeholder="Rechercher un film"
							class="mb-4 input"
							@input="searchMovies"
						/>
					</div>
					<div class="flex flex-row justify-center items-center">
						<MovieCarousel
							v-model:searchKeyword="searchKeyword"
							class="input"
							@select-movie="selectMovie"
						/>
					</div>
				</div>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de mise à jour de séance -->
		<form
			v-if="activeForm === 'update'"
			class="mb-4"
			@submit.prevent="updateSession"
		>
			<div class="form-group">
				<label for="sessionId" class="block">Id de Séance:</label>
				<input
					id="sessionId"
					v-model="sessionId"
					class="input"
					required
				/>
			</div>
			<div class="form-group">
				<label for="startDate" class="block">Date de début:</label>
				<input
					id="startDate"
					v-model="sessionData.startDate"
					type="datetime-local"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="endDate" class="block">Date de fin:</label>
				<input
					id="endDate"
					v-model="sessionData.endDate"
					type="datetime-local"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="theatreName" class="block">Nom du cinéma:</label>
				<input
					id="theatreName"
					v-model="sessionData.theatreName"
					type="text"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="theatreAddress" class="block"
					>Adresse du cinéma:</label
				>
				<input
					id="theatreAddress"
					v-model="sessionData.theatreAddress"
					type="text"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="theatreCity" class="block">Ville du cinéma:</label>
				<input
					id="theatreCity"
					v-model="sessionData.theatreCity"
					type="text"
					class="input"
				/>
			</div>

			<div class="flex flex-col">
				<div class="block">Nom du film:</div>
				<div
					v-if="selectedMovie"
					class="flex flex-row justify-center items-center mb-10"
				>
					<div
						class="relative text-center py-2 px-4 bg-blue-100 rounded-lg shadow mt-2"
					>
						<span class="text-lg font-semibold text-gray-700"
							>{{ selectedMovie.title }}
						</span>
						<span
							class="absolute top-0 right-0 cursor-pointer text-xl text-gray-700"
							@click="selectedMovie = null"
						>
							×
						</span>
					</div>
				</div>
				<div v-else class="flex flex-col">
					<div class="flex flex-row justify-center items-center">
						<SearchBar
							v-model="searchKeyword"
							placeholder="Rechercher un film"
							class="mb-4 input"
							@input="searchMovies"
						/>
					</div>
					<div class="flex flex-row justify-center items-center">
						<MovieCarousel
							v-model:searchKeyword="searchKeyword"
							class="input"
							@select-movie="selectMovie"
						/>
					</div>
				</div>
			</div>
			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de suppression de séance -->
		<form
			v-if="activeForm === 'delete'"
			class="mb-4"
			@submit.prevent="deleteSession"
		>
			<div class="form-group">
				<label for="sessionId" class="block">Id de Séance:</label>
				<input
					id="sessionId"
					v-model="sessionId"
					class="input"
					required
				/>
			</div>
			<button type="submit" class="btn-primary">
				Supprimer le compte
			</button>
		</form>

		<!-- Afficher les résultats des actions -->
		<div v-if="result" class="mb-4">
			<div class="result-message">
				<h2 class="text-xl font-semibold mb-2">Résultat:</h2>
				<p>{{ result }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useMovieSessionStore } from '@/stores/movie-session.store.js';
import SearchBar from '../Inputs/SearchBar.vue';
import MovieCarousel from '@/components/MovieCarousel.vue';

const activeForm = ref('create');
const result = ref(null);

const sessionStore = useMovieSessionStore();

// Données pour les formulaires de création, mise à jour et suppression
const sessionData = ref({
	startDate: null,
	endDate: null,
	theatreName: '',
	theatreAddress: '',
	theatreCity: '',
	movieId: null,
});

const sessionId = ref(null);

const selectedMovie = ref(null); // Ajout de la réf pour le film sélectionné
const searchKeyword = ref('');

// Définition de la méthode pour sélectionner un film
const selectMovie = (movie) => {
	console.log(movie);
	selectedMovie.value = movie;
};

const searchMovies = () => {
	movieStore.getAllMovies();
};

// Fonctions pour changer le formulaire actif
const changeForm = (formName) => {
	activeForm.value = formName;
	result.value = '';
};

// Fonctions pour les actions (create, update, read, delete)
const createSession = async () => {
	result.value = '';
	if (!selectedMovie.value) {
		result.value = 'Choisissez un film';
		return null;
	}
	sessionData.value.movieId = selectedMovie.value.movieId;
	console.log(sessionData.value);
	try {
		const response = await sessionStore.createMovieSession(
			sessionData.value
		);
		if (response) {
			result.value = 'Séance créée'; // Message de succès ou autre traitement
		} else {
			result.value = 'Cette séance existe déjà'; // Message d'erreur
		}
	} catch (error) {
		result.value = 'Error creating session: ' + error.message;
	}
};

const updateSession = async () => {
	result.value = '';
	try {
		const response = await sessionStore.updateMovieSession(
			sessionId.value,
			sessionData.value
		);
		if (response.data === false) {
			result.value = 'Séance non trouvée'; // Message d'erreur
		} else {
			result.value = 'Séance modifiée'; // Message de succès ou autre traitement
		}
	} catch (error) {
		result.value = 'Error updating session: ' + error.message;
	}
};

const deleteSession = async () => {
	result.value = '';
	try {
		const response = await sessionStore.deleteMovieSession(sessionId.value);
		if (response.data === true) {
			result.value = 'Séance supprimée'; // Message de succès ou autre traitement
		} else {
			result.value = 'Séance non trouvée'; // Message d'erreur
		}
	} catch (error) {
		result.value = error.message;
	}
};
</script>

<style scoped>
/* Styles spécifiques au composant */
.container {
	text-align: center;
	padding: 20px;
}
.form-group {
	margin-bottom: 20px;
}

.input {
	width: 40%;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 20px;
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

.result-message {
	background-color: #f2f2f2;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px;
	text-align: left;
}
</style>
