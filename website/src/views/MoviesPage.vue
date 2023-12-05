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
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useMovieStore } from '@/stores/movie.store.js';
import SearchBar from '@/components/Inputs/SearchBar.vue';
import MovieCarousel from '@/components/MovieCarousel.vue';
import MovieDetails from '@/components/MovieDetails.vue';

const movieStore = useMovieStore();
const searchKeyword = ref('');

const selectedMovie = ref(null); // Ajout de la réf pour le film sélectionné

// Définition de la méthode pour sélectionner un film
const selectMovie = (movie) => {
	selectedMovie.value = movie;
};

// Méthode pour gérer le retour au carrousel
const backToCarousel = () => {
	selectedMovie.value = null;
};

const searchMovies = () => {
	movieStore.getAllMovies();
};
</script>
