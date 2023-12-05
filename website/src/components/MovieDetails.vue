<template>
	<div
		v-if="showDetails"
		class="bg-white shadow-lg rounded-lg overflow-hidden"
	>
		<div
			v-if="props.movie.posterUrl"
			class="bg-cover bg-center h-72 p-4"
			:style="{ backgroundImage: `url(${props.movie.posterUrl})` }"
		>
			<!-- Image du film -->
		</div>
		<div
			v-else
			class="h-72 p-4 flex items-center justify-center bg-gray-300"
		>
			<span class="text-6xl text-gray-700">?</span>
		</div>
		<div class="p-4">
			<h2 class="text-2xl font-bold mb-2">{{ props.movie.title }}</h2>
			<div class="flex justify-between items-center mb-4">
				<span class="text-sm text-gray-600"
					>Durée: {{ props.movie.duration }} min</span
				>
				<span
					class="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
				>
					{{ props.movie.minAgeRequired }}+
				</span>
			</div>
			<p><strong>Language:</strong> {{ props.movie.language }}</p>
			<p><strong>Subtitles:</strong> {{ props.movie.subtitles }}</p>
			<p><strong>Director:</strong> {{ props.movie.director }}</p>
			<p><strong>Main Actors:</strong> {{ props.movie.mainActors }}</p>
			<div class="mt-4">
				<button
					class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-8 rounded"
					@click="showSessionList"
				>
					Séances
				</button>
				<button
					class="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-8 rounded"
					@click="backToCarousel"
				>
					Retour
				</button>
			</div>
		</div>
	</div>
	<div v-else class="flex flex-col">
		<div class="flex justify-end">
			<button
				class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
				@click="showDetails = true"
			>
				Retour
			</button>
		</div>
		<SessionList :sessions="filteredSessions" />
	</div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import SessionList from '@/components/SessionList.vue';
import { useMovieSessionStore } from '@/stores/movie-session.store.js';

const movieSessionStore = useMovieSessionStore();

const filteredSessions = computed(() => {
	// Utilisez les résultats du store pour les séances de films
	return movieSessionStore.movieSessions;
});

const props = defineProps({
	movie: {
		type: Object,
		default: () => ({
			id: null,
			title: '',
			duration: 0,
			language: '',
			subtitles: '',
			director: '',
			mainActors: '',
			minAgeRequired: 0,
			startDate: null,
			endDate: null,
		}),
	},
});

const emit = defineEmits(['back']);

const backToCarousel = () => {
	emit('back');
};

const showDetails = ref(true);

const showSessionList = () => {
	showDetails.value = false;
	movieSessionStore.getMovieSessionsByMovieId(props.movie.movieId);
};
</script>
