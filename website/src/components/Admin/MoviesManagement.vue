<template>
	<div class="container my-auto mx-auto p-4">
		<h1 class="text-3xl font-semibold mb-4">Gestion des Films</h1>

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

		<!-- Formulaire de création de film -->
		<form
			v-if="activeForm === 'create'"
			class="mb-4"
			@submit.prevent="createMovie"
		>
			<div class="form-group">
				<label for="title" class="block">Titre *</label>
				<input
					id="title"
					v-model="movieData.title"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="duration" class="block">Durée (en minutes) *</label>
				<input
					id="duration"
					v-model.number="movieData.duration"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="language" class="block">Langue *</label>
				<input
					id="language"
					v-model="movieData.language"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="subtitles" class="block">Sous-titres *</label>
				<input
					id="subtitles"
					v-model="movieData.subtitles"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="director" class="block">Réalisateur *</label>
				<input
					id="director"
					v-model="movieData.director"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="mainActors" class="block"
					>Acteurs principaux *</label
				>
				<input
					id="mainActors"
					v-model="movieData.mainActors"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="minAgeRequired" class="block"
					>Âge minimal requis *</label
				>
				<input
					id="minAgeRequired"
					v-model.number="movieData.minAgeRequired"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="startDate" class="block">Date de début *</label>
				<VueDatePicker
					v-model="movieData.startDate"
					format="dd-MM-yyyy"
					placeholder="Date de début"
					:enable-time-picker="false"
				></VueDatePicker>
			</div>

			<div class="form-group">
				<label for="endDate" class="block">Date de fin *</label>
				<VueDatePicker
					v-model="movieData.endDate"
					format="dd-MM-yyyy"
					placeholder="Date de fin"
					:enable-time-picker="false"
				></VueDatePicker>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de mise à jour de film -->
		<form
			v-if="activeForm === 'update'"
			class="mb-4"
			@submit.prevent="updateMovie"
		>
			<div class="form-group">
				<label for="movieId" class="block">Id de Film:</label>
				<input id="movieId" v-model="movieId" class="input" required />
			</div>
			<div class="form-group">
				<label for="title" class="block">Titre</label>
				<input id="title" v-model="movieData.title" class="input" />
			</div>

			<div class="form-group">
				<label for="duration" class="block">Durée (en minutes)</label>
				<input
					id="duration"
					v-model.number="movieData.duration"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="language" class="block">Langue</label>
				<input
					id="language"
					v-model="movieData.language"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="subtitles" class="block">Sous-titres</label>
				<input
					id="subtitles"
					v-model="movieData.subtitles"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="director" class="block">Réalisateur</label>
				<input
					id="director"
					v-model="movieData.director"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="mainActors" class="block"
					>Acteurs principaux *</label
				>
				<input
					id="mainActors"
					v-model="movieData.mainActors"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="minAgeRequired" class="block"
					>Âge minimal requis</label
				>
				<input
					id="minAgeRequired"
					v-model.number="movieData.minAgeRequired"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="startDate" class="block">Date de début</label>
				<VueDatePicker
					v-model="movieData.startDate"
					format="dd-MM-yyyy"
					placeholder="Date de début"
					:enable-time-picker="false"
				></VueDatePicker>
			</div>

			<div class="form-group">
				<label for="endDate" class="block">Date de fin</label>
				<VueDatePicker
					v-model="movieData.endDate"
					format="dd-MM-yyyy"
					placeholder="Date de fin"
					:enable-time-picker="false"
				></VueDatePicker>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de suppression de film -->
		<form
			v-if="activeForm === 'delete'"
			class="mb-4"
			@submit.prevent="deleteMovie"
		>
			<div class="form-group">
				<label for="movieId" class="block">Id de Film:</label>
				<input
					id="sessionId"
					v-model="movieId"
					class="input"
					required
				/>
			</div>
			<button type="submit" class="btn-primary">Supprimer le film</button>
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
import VueDatePicker from '@vuepic/vue-datepicker';
import { useMovieStore } from '@/stores/movie.store';

const activeForm = ref('create');
const result = ref(null);

const movieStore = useMovieStore();

// Données pour les formulaires de création, mise à jour, lecture et suppression
const movieData = ref({
	title: '',
	duration: 0,
	language: '',
	subtitles: '',
	director: '',
	mainActors: '',
	minAgeRequired: 0,
	startDate: null,
	endDate: null,
});

const movieId = ref(0);

// Fonctions pour changer le formulaire actif
const changeForm = (formName) => {
	activeForm.value = formName;
	result.value = '';
	movieData.value = {
		title: '',
		duration: 0,
		language: '',
		subtitles: '',
		director: '',
		mainActors: '',
		minAgeRequired: 0,
		startDate: null,
		endDate: null,
	};
};

// Fonctions pour les actions (create, update, read, delete)
const createMovie = async () => {
	result.value = '';
	movieData.value.startDate = new Date(movieData.value.startDate);
	movieData.value.startDate.setHours(0, 0, 0, 0);
	movieData.value.endDate = new Date(movieData.value.endDate);
	movieData.value.endDate.setHours(23, 59, 59, 999);

	try {
		const response = await movieStore.createMovie(movieData.value);
		if (response) {
			result.value = 'Film créé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Un film possédant ce nom existe déjà'; // Message d'erreur
		}
	} catch (error) {
		result.value = 'Error creating movie: ' + error.message;
	}
};

const updateMovie = async () => {
	result.value = '';
	movieData.value.startDate = new Date(movieData.value.startDate);
	movieData.value.startDate.setHours(0, 0, 0, 0);
	movieData.value.endDate = new Date(movieData.value.endDate);
	movieData.value.endDate.setHours(23, 59, 59, 999);

	try {
		const response = await movieStore.updateMovie(
			movieId.value,
			movieData.value
		);
		if (response) {
			result.value = 'Film mis à jour'; // Message de succès ou autre traitement
		} else {
			result.value = 'Erreur lors de la mise à jour du film'; // Message d'erreur
		}
	} catch (error) {
		result.value = 'Error updating movie: ' + error.message;
	}
};

const deleteMovie = async () => {
	result.value = '';

	try {
		const response = await movieStore.deleteMovie(movieId.value);
		if (response) {
			result.value = 'Film supprimé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Film non supprimé'; // Message d'erreur
		}
	} catch (error) {
		result.value = 'Error deleting movie: ' + error.message;
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
