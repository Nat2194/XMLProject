<template>
	<div>
		<h2>Liste des Films</h2>

		<!-- Barre de recherche pour les films -->
		<SearchBar
			v-model="searchKeyword"
			placeholder="Rechercher un film"
			@input="searchMovies"
		/>

		<!-- Liste des films -->
		<ul>
			<li v-for="movie in filteredMovies" :key="movie.id">
				{{ movie.title }}
			</li>
		</ul>

		<h3>Chercher des séances de film :</h3>

		<!-- Barre de recherche pour les séances -->
		<!-- Utilisation du composant DateTimeInput pour la date -->
		<DateTimeInput
			v-model="sessionDate"
			placeholder="Sélectionnez une date"
			input-type="date"
			@input="searchSessions"
		/>

		<!-- Utilisation du composant SearchBar pour la ville -->
		<SearchBar
			v-model="sessionCity"
			placeholder="Ville"
			@input="searchSessions"
		/>

		<!-- Utilisation du composant TextInput pour le nom du film -->
		<TextInput
			v-model="sessionMovieName"
			placeholder="Nom du film"
			@input="searchSessions"
		/>

		<!-- Utilisation du composant TextArea pour des informations supplémentaires (facultatif) -->
		<TextArea
			v-model="sessionInfo"
			placeholder="Informations supplémentaires"
		/>

		<!-- Liste des séances de films (à remplir avec les données appropriées) -->
		<ul>
			<li v-for="session in filteredSessions" :key="session.id">
				{{ session.startTime }} - {{ session.location }}
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useMovieStore } from '@/stores/movie.store.js';
import { useMovieSessionStore } from '@/stores/movie-session.store.js';
import SearchBar from '@/components/Inputs/SearchBar.vue';
import DateTimeInput from '@/components/Inputs/DateTimeInput.vue';
import TextInput from '@/components/Inputs/TextInput.vue';
import TextArea from '@/components/Inputs/TextAeraInput.vue';

const movieStore = useMovieStore();
const movieSessionStore = useMovieSessionStore();
const searchKeyword = ref('');
const sessionDate = ref('');
const sessionCity = ref('');
const sessionMovieName = ref('');
const sessionInfo = ref('');

// Observez les changements de la recherche de films
watch(searchKeyword, () => {
	searchMovies();
});

// Observez les changements de la recherche de séances
watch([sessionDate, sessionCity, sessionMovieName, sessionInfo], () => {
	searchSessions();
});

// Fonction pour rechercher les films en fonction du mot-clé
const searchMovies = () => {
	movieStore.getAllMovies(); // Utilisez le store pour charger tous les films
};

// Fonction pour rechercher des séances de film en fonction des critères
const searchSessions = () => {
	const date = sessionDate.value;
	const city = sessionCity.value;
	const movieName = sessionMovieName.value;

	// Utilisez les stores pour rechercher des séances en fonction des critères
	if (city) {
		movieSessionStore.findMovieSessionsByCity(city); // Recherche par ville
	}
	if (date) {
		movieSessionStore.findMovieSessionsByDate(date); // Recherche par date
	}
	if (movieName) {
		// Recherche par nom de film en utilisant le store
		movieSessionStore.findMovieSessionsByMovieName(movieName);
	}
};

// Obtenez la liste des films filtrés en fonction du mot-clé de recherche
const filteredMovies = computed(() => {
	const keyword = searchKeyword.value.toLowerCase();
	return movieStore.getMovies.filter((movie) =>
		movie.title.toLowerCase().includes(keyword)
	);
});

// Obtenez la liste des séances de films filtrées en fonction des critères de recherche
const filteredSessions = computed(() => {
	// Utilisez les résultats du store pour les séances de films
	return movieSessionStore.movieSessions;
});
</script>
