<template>
	<div class="container mx-auto p-4">
		<div class="flex justify-between mb-4">
			<div>
				<router-link to="/movies">
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
					>
						Movies
					</button>
				</router-link>
				<router-link to="/sessions">
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
					>
						Sessions
					</button>
				</router-link>
			</div>
			<router-link to="/admin">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Admin
				</button>
			</router-link>
		</div>
		<div>
			<!-- Titre pour les séances de film -->
			<h3 class="text-2xl font-bold mt-8 mb-4">
				Chercher des séances de film :
			</h3>

			<!-- Barre de recherche pour la date -->
			<DateRangePicker v-model:sessionDate="sessionDate" />

			<!-- Barre de recherche pour la ville -->
			<TextInput
				v-model="sessionCity"
				placeholder="Ville"
				class="mb-4"
				@input="searchSessions"
			/>

			<!-- Barre de recherche pour le nom du film -->
			<TextInput
				v-model="sessionMovieName"
				placeholder="Nom du film"
				class="mb-4"
				@input="searchSessions"
			/>

			<!-- Utilisez le composant SessionList pour afficher les sessions -->
			<SessionList :sessions="filteredSessions" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useMovieSessionStore } from '@/stores/movie-session.store.js';
import TextInput from '@/components/Inputs/TextInput.vue';
import SessionList from '@/components/SessionList.vue';
import DateRangePicker from '@/components/Inputs/DateRangePicker.vue';

const movieSessionStore = useMovieSessionStore();
const sessionCity = ref('');
const sessionMovieName = ref('');

const sessionDate = ref({
	date: null,
	startTime: null,
	endTime: null,
});

// Obtenez la liste des séances de films filtrées en fonction des critères de recherche
const filteredSessions = computed(() => {
	// Utilisez les résultats du store pour les séances de films
	return movieSessionStore.movieSessions;
});

// Observez les changements de la recherche de séances
watch(
	[sessionDate, sessionCity, sessionMovieName],
	() => {
		searchSessions();
	},
	{ deep: true }
);

// Fonction pour rechercher des séances de film en fonction des critères
const searchSessions = () => {
	let searchCriteria = {};

	// Vérifiez si une plage horaire est sélectionnée
	if (sessionDate.value.startTime || sessionDate.value.endTime) {
		// Convertit la chaîne de date en objet Date
		const startDateTime = new Date(sessionDate.value.date);
		const endDateTime = new Date(sessionDate.value.date);

		let [hours, minutes] = sessionDate.value.startTime
			.split(':')
			.map(Number);
		startDateTime.setHours(hours, minutes);

		[hours, minutes] = sessionDate.value.endTime.split(':').map(Number);
		endDateTime.setHours(hours, minutes);

		// Définit la date de début
		searchCriteria = {
			startDate: startDateTime,
			endDate: endDateTime,
		};
	} else {
		// Utilisez la date seule si aucune plage horaire n'est sélectionnée
		searchCriteria = {
			startDate: sessionDate.value.date,
			endDate: null,
		};
	}

	// Ajoutez d'autres critères de recherche
	searchCriteria.city = sessionCity.value;
	searchCriteria.movieName = sessionMovieName.value.toLowerCase();

	// Appelez la méthode de recherche du store
	movieSessionStore.searchMovieSessions(searchCriteria);
};
</script>
