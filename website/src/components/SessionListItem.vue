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
	const endDate = new Date(props.session.endDate);

	// Options pour formater la date
	const optionsDate = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	};

	// Options pour formater l'heure
	const optionsTime = {
		hour: 'numeric',
		minute: 'numeric',
	};

	// Formatage des dates et heures en chaînes
	const formattedStartDateString = startDate.toLocaleDateString(
		undefined,
		optionsDate
	);
	const formattedStartTimeString = startDate.toLocaleTimeString(
		undefined,
		optionsTime
	);
	const formattedEndTimeString = endDate
		? endDate.toLocaleTimeString(undefined, optionsTime)
		: '';

	// Construction de la chaîne finale
	const formattedString = `${formattedStartDateString} ${formattedStartTimeString} - ${formattedEndTimeString}`;

	return formattedString.trim(); // Supprime les espaces en trop s'il n'y a pas de date de fin
});

watchEffect(async () => {
	const movie = await movieStore.getMovieById(props.session.movie);
	movieTitle.value = movie.title ? movie.title : 'Unknown Movie';
});
</script>
