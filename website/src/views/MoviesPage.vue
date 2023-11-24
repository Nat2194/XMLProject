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
			<div class="relative overflow-hidden">
				<ul
					v-show="filteredMovies.length > 0"
					class="flex transition-transform duration-500 ease-in-out"
					:style="{ transform: `translateX(${currentOffset}px)` }"
				>
					<li
						v-for="(movie, index) in filteredMovies"
						:key="index"
						class="p-4 border rounded w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
					>
						<img
							src="https://placehold.it/200x200"
							alt="Movie Poster"
						/>
						<div class="p-2">
							<p class="text-lg font-semibold">
								{{ movie.title }}
							</p>
							<div class="flex flex-wrap">
								<p
									v-for="(tag, tagIndex) in movie.tag"
									:key="tagIndex"
									class="tag"
									:class="{ secondary: tagIndex > 0 }"
								>
									{{ tag }}
								</p>
							</div>
						</div>
					</li>
				</ul>

				<button
					class="absolute top-1/2 left-2 transform -translate-y-1/2"
					@click="moveCarousel(-1)"
				>
					&lt;
				</button>
				<button
					class="absolute top-1/2 right-2 transform -translate-y-1/2"
					@click="moveCarousel(1)"
				>
					&gt;
				</button>
			</div>
		</div>

		<!-- Titre pour les séances de film -->
		<h3 class="text-2xl font-bold mt-8 mb-4">
			Chercher des séances de film :
		</h3>

		<!-- Barre de recherche pour la date -->
		<VueDatePicker v-model="sessionDate" range></VueDatePicker>

		<!-- Barre de recherche pour la ville -->
		<SearchBar
			v-model="sessionCity"
			placeholder="Ville"
			class="mb-4"
			@input="searchSessions"
		/>

		{{ sessionDate }}

		<!-- Barre de recherche pour le nom du film -->
		<TextInput
			v-model="sessionMovieName"
			placeholder="Nom du film"
			class="mb-4"
			@input="searchSessions"
		/>

		<!-- Zone de texte pour des informations supplémentaires -->
		<TextArea
			v-model="sessionInfo"
			placeholder="Informations supplémentaires"
			class="mb-4"
		/>

		<!-- Liste des séances de films -->
		<ul class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
			<li
				v-for="session in filteredSessions"
				:key="session.id"
				class="p-4 border rounded"
			>
				{{ session.startTime }} - {{ session.location }}
			</li>
		</ul>

		<!-- Utilisez le composant SessionList pour afficher les sessions -->
		<SessionList :sessions="filteredSessions" />
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie.store.js';
import { useMovieSessionStore } from '@/stores/movie-session.store.js';
import SearchBar from '@/components/Inputs/SearchBar.vue';
import TextInput from '@/components/Inputs/TextInput.vue';
import TextArea from '@/components/Inputs/TextAeraInput.vue';
import SessionList from '../components/SessionList.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const movieStore = useMovieStore();
const movieSessionStore = useMovieSessionStore();
const searchKeyword = ref('');
const sessionDate = ref();
const sessionCity = ref('');
const sessionMovieName = ref('');
const sessionInfo = ref('');

const currentOffset = ref(0);
const itemWidth = 100;

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

const moveCarousel = (direction) => {
	console.log('moving');
	const maxOffset = itemWidth * -1 * (filteredMovies.value.length - 1);
	if (direction === 1 && currentOffset.value > maxOffset) {
		currentOffset.value -= itemWidth;
	} else if (direction === -1 && currentOffset.value < 0) {
		currentOffset.value += itemWidth;
	}
};

const searchMovies = () => {
	currentOffset.value = 0;
	movieStore.getAllMovies();
	startCarousel();
};

const startCarousel = () => {
	const maxOffset =
		itemWidth * -1 * (filteredMovies.value.length - itemsPerPage);

	const move = () => {
		currentOffset.value -= itemWidth;

		if (currentOffset.value <= maxOffset) {
			currentOffset.value = 0;
		}

		setTimeout(move, 5000);
	};

	// Démarrez le carrousel après que les films ont été chargés
	watch(filteredMovies, () => {
		if (filteredMovies.value.length > 0) {
			move();
		}
	});
};

onMounted(() => {
	const startDate = new Date();
	startDate.setHours(0, 0, 0, 0); // Définit les heures, minutes, secondes et millisecondes à 0 pour obtenir minuit

	const endDate = new Date(startDate);
	endDate.setDate(startDate.getDate() + 7);
	endDate.setHours(23, 59, 59, 999);
	sessionDate.value = [startDate, endDate];

	startCarousel();
});

const itemsPerPage = 2; // Nombre de films à afficher sur une seule ligne

watch(searchKeyword, searchMovies);
// Observez les changements de la recherche de films
watch(searchKeyword, () => {
	searchMovies();
});

// Observez les changements de la recherche de séances
watch([sessionDate, sessionCity, sessionMovieName, sessionInfo], () => {
	searchSessions();
});

// Fonction pour rechercher des séances de film en fonction des critères
const searchSessions = () => {
	console.log('change');
	const startDate = sessionDate.value[0];
	const endDate = sessionDate.value[1];
	const city = sessionCity.value;
	const movieName = sessionMovieName.value.toLowerCase();
	console.log(startDate);
	console.log(endDate);

	// Utilisez les stores pour rechercher des séances en fonction des critères
	if (city) {
		movieSessionStore.getMovieSessionsByCity(city); // Recherche par ville
	}
	if (startDate && endDate) {
		console.log('by range');
		movieSessionStore.getMovieSessionsByDateRange(startDate, endDate); // Recherche par plage de dates
	} else if (startDate) {
		console.log('by date');
		// Recherche par date uniquement
		movieSessionStore.getMovieSessionsByDate(startDate);
	}
	if (movieName) {
		// Recherche par nom de film en utilisant le store
		movieSessionStore.getMovieSessionsByMovieName(movieName);
	}
};
</script>
