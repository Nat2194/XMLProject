<!-- SessionList.vue -->

<template>
	<div>
		<h3 class="text-2xl font-bold mt-8 mb-4">Liste des Séances</h3>
		<ul>
			<li v-for="session in sessions" :key="session.id">
				<SessionListItem :session="session" />
			</li>
		</ul>
	</div>
</template>

<script setup>
import SessionListItem from './SessionListItem.vue';

const props = defineProps(['sessions']);
</script>
