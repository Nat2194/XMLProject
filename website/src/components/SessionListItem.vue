<!-- SessionListItem.vue -->

<template>
	<div class="p-4 border rounded">
		<p>Id : {{ session.sessionId }}</p>
		<p>
			{{ formattedDate }} - {{ session.theatreName }} -
			{{ session.theatreCity }}
		</p>
		<p>{{ movieTitle }}</p>
	</div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useMovieStore } from '@/stores/movie.store.js';
const movieStore = useMovieStore();

const props = defineProps(['session']);

const movieTitle = ref('Unknown Movie');

const formattedDate = computed(() => {
	const startDate = new Date(props.session.startDate);
	return startDate.toLocaleString();
});

watchEffect(async () => {
	const movie = await movieStore.getMovieById(props.session.movie);
	movieTitle.value = movie.title ? movie.title : 'Unknown Movie';
});
</script>
