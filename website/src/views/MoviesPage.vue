<template>
	<div class="container mx-auto p-4">
		<!-- Titre de la page -->
		<div>
			<h2 class="text-3xl font-bold mb-4">Liste des Films</h2>

			<!-- Barre de recherche pour les films -->
			<SearchBar
				v-model="searchKeyword"
				placeholder="Rechercher un film"
				class="mb-4"
				@input="searchMovies"
			/>
			<!-- Afficher les détails du film si un film est sélectionné -->
			<MovieDetails
				v-if="selectedMovie"
				:movie="selectedMovie"
				@back="backToCarousel"
			/>
			<!-- Afficher le carrousel si aucun film n'est sélectionné -->
			<MovieCarousel
				v-else
				v-model:searchKeyword="searchKeyword"
				@select-movie="selectMovie"
			/>
		</div>

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
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useMovieStore } from '@/stores/movie.store.js';
import { useMovieSessionStore } from '@/stores/movie-session.store.js';
import SearchBar from '@/components/Inputs/SearchBar.vue';
import TextInput from '@/components/Inputs/TextInput.vue';
import SessionList from '@/components/SessionList.vue';
import DateRangePicker from '@/components/Inputs/DateRangePicker.vue';
import MovieCarousel from '@/components/MovieCarousel.vue';
import MovieDetails from '@/components/MovieDetails.vue';

const movieStore = useMovieStore();
const movieSessionStore = useMovieSessionStore();
const searchKeyword = ref('');
const sessionCity = ref('');
const sessionMovieName = ref('');

const sessionDate = ref({
	date: null,
	startTime: null,
	endTime: null,
});

const selectedMovie = ref(null); // Ajout de la réf pour le film sélectionné

// Définition de la méthode pour sélectionner un film
const selectMovie = (movie) => {
	selectedMovie.value = movie;
};

// Méthode pour gérer le retour au carrousel
const backToCarousel = () => {
	selectedMovie.value = null;
};

// Obtenez la liste des séances de films filtrées en fonction des critères de recherche
const filteredSessions = computed(() => {
	// Utilisez les résultats du store pour les séances de films
	return movieSessionStore.movieSessions;
});

const searchMovies = () => {
	movieStore.getAllMovies();
};

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
