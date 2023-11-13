<!-- SessionListItem.vue -->

<template>
	<div class="p-4 border rounded">
		<p>{{ formattedDate }} - {{ session.theatreName }}</p>
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
	console.log(props.session);
	const startDate = new Date(props.session.startDate);
	return startDate.toLocaleString();
});

watchEffect(async () => {
	console.log('compute');
	const movie = await movieStore.getMovieById(props.session.movie);
	movieTitle.value = movie ? movie.title : 'Unknown Movie';
});
</script>
