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
import { ref, computed, watch, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie.store.js';
import { useMovieSessionStore } from '@/stores/movie-session.store.js';
import SearchBar from '@/components/Inputs/SearchBar.vue';
import TextInput from '@/components/Inputs/TextInput.vue';
import TextArea from '@/components/Inputs/TextAeraInput.vue';
import SessionList from '../components/SessionList.vue';
import DateRangePicker from '@/components/Inputs/DateRangePicker.vue';

const movieStore = useMovieStore();
const movieSessionStore = useMovieSessionStore();
const searchKeyword = ref('');
const sessionCity = ref('');
const sessionMovieName = ref('');

const currentOffset = ref(0);
const itemWidth = 100;

const sessionDate = ref({
	date: null,
	startTime: null,
	endTime: null,
});

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
	startCarousel();
});

const itemsPerPage = 2; // Nombre de films à afficher sur une seule ligne

watch(searchKeyword, searchMovies);
// Observez les changements de la recherche de films
watch(searchKeyword, () => {
	searchMovies();
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
		console.log(sessionDate.value);
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
