<template>
	<div class="relative">
		<div class="overflow-hidden">
			<ul
				v-show="filteredMovies.length > 0"
				class="flex flex-row justify-center transition-transform duration-500 ease-in-out"
				:style="{ transform: `translateX(${currentOffset}px)` }"
			>
				<!-- First slice: from startIndex to the end of the list -->
				<li
					v-for="(movie, index) in filteredMovies.slice(startIndex)"
					:key="index"
					class="p-4 border rounded w-80"
					@click="selectMovie(movie)"
				>
					<div class="flex-row justify-center">
						<div class="flex-col">
							<img
								v-if="movie.posterUrl"
								src="https://placehold.it/200x200"
								alt="Movie Poster"
							/>
							<div
								v-else
								class="h-52 w-52 flex items-center justify-center bg-gray-300"
							>
								<span class="text-6xl text-gray-700">?</span>
							</div>
							<div class="p-2">
								<p class="text-lg font-semibold">
									{{ movie.title }}
								</p>
								<div class="flex flex-wrap">
									<p
										v-for="(tag, tagIndex) in movie.tag"
										:key="tagIndex"
										class="tag"
										:class="{
											secondary: tagIndex > 0,
										}"
									>
										{{ tag }}
									</p>
								</div>
							</div>
						</div>
					</div>
				</li>

				<!-- Second slice: from the beginning of the list to endIndex -->
				<li
					v-for="(movie, index) in filteredMovies.slice(0, endIndex)"
					:key="`wrap-${index}`"
					class="p-4 border rounded w-80"
					@click="selectMovie(movie)"
				>
					<div class="flex-row justify-center">
						<div class="flex-col">
							<img
								v-if="movie.posterUrl"
								src="https://placehold.it/200x200"
								alt="Movie Poster"
							/>
							<div
								v-else
								class="h-52 w-52 flex items-center justify-center bg-gray-300"
							>
								<span class="text-6xl text-gray-700">?</span>
							</div>
							<div class="p-2">
								<p class="text-lg font-semibold">
									{{ movie.title }}
								</p>
								<div class="flex flex-wrap">
									<p
										v-for="(tag, tagIndex) in movie.tag"
										:key="tagIndex"
										class="tag"
										:class="{
											secondary: tagIndex > 0,
										}"
									>
										{{ tag }}
									</p>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<button
			v-show="filteredMovies.length > 0"
			class="absolute top-1/3 -left-8 transform -translate-y-1/2"
			style="width: 1em; height: 1em; font-size: 60px; font-weight: 900"
			@click="moveCarousel(-1)"
		>
			&lt;
		</button>
		<button
			v-show="filteredMovies.length > 0"
			class="absolute top-1/3 -right-8 transform -translate-y-1/2"
			style="width: 1em; height: 1em; font-size: 60px; font-weight: 900"
			@click="moveCarousel(1)"
		>
			&gt;
		</button>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, watchEffect } from 'vue';
import { useMovieStore } from '@/stores/movie.store.js';

const props = defineProps({
	searchKeyword: { type: String, default: '' },
});

const emit = defineEmits(['select-movie']);

const searchKeyword = ref(props.searchKeyword);

watchEffect(() => {
	searchKeyword.value = props.searchKeyword;
});

const movieStore = useMovieStore();

const currentOffset = ref(0);
const itemWidth = 100;

const itemsPerPage = 4; // Number of movies to display on a single line
let startIndex = 0;
let endIndex = itemsPerPage;

// Obtenez la liste des films filtrés en fonction du mot-clé de recherche
const filteredMovies = computed(() => {
	const keyword = searchKeyword.value.toLowerCase();
	startIndex = 0;
	endIndex = itemsPerPage;
	return movieStore.getMovies.filter((movie) =>
		movie.title.toLowerCase().includes(keyword)
	);
});

const searchMovies = () => {
	currentOffset.value = 0;
	movieStore.getAllMovies();
	startCarousel();
};

let carouselTimeoutId; // Variable to store the timeout ID

const move = () => {
	currentOffset.value += itemWidth;
	endIndex += 1;
	endIndex = endIndex % filteredMovies.value.length;
	setTimeout(() => {
		currentOffset.value = 0;
		startIndex += 1;
		startIndex = startIndex % filteredMovies.value.length;
	}, 500);
	// Schedule a new timeout
	clearTimeout(carouselTimeoutId);
	carouselTimeoutId = setTimeout(move, 10000);
};

const startCarousel = () => {
	console.log('startCarousel');
	// Start the carousel after the movies have been loaded
	watch(filteredMovies, () => {
		console.log('changes');
		if (filteredMovies.value.length > 0) {
			console.log('length');
			clearTimeout(carouselTimeoutId);
			move();
		}
	});
};

const moveCarousel = (direction) => {
	if (direction === 1) {
		console.log('1');
		currentOffset.value -= itemWidth;
		endIndex += 1;
	} else if (direction === -1) {
		console.log('2');
		currentOffset.value += itemWidth;
		endIndex -= 1;
	}
	endIndex = endIndex % filteredMovies.value.length;
	// Clear the previous timeout
	clearTimeout(carouselTimeoutId);
	carouselTimeoutId = setTimeout(move, 10000);
	console.log('6');

	setTimeout(() => {
		currentOffset.value = 0;
		if (direction === 1) {
			startIndex += 1;
		} else if (direction === -1) {
			startIndex -= 1;
		}
		startIndex = startIndex % filteredMovies.value.length;
	}, 500);
};

onMounted(() => {
	startCarousel();
	searchMovies();
});

watch(searchKeyword, searchMovies);
// Observez les changements de la recherche de films
watch(searchKeyword, () => {
	console.log('keyword');
	console.log(searchKeyword.value);
	searchMovies();
});

// Fonction pour sélectionner un film et notifier le parent
const selectMovie = (movie) => {
	emit('select-movie', movie);
};
</script>
