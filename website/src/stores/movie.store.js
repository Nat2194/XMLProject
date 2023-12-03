import { defineStore } from 'pinia';
import { $axios } from '@/config/axios';

export const useMovieStore = defineStore({
	id: 'movieStore',
	state: () => ({
		movies: [], // Store the list of movies
		currentMovie: null, // Store the selected movie
	}),
	getters: {
		getMovies() {
			return this.movies;
		},
		getCurrentMovie() {
			return this.currentMovie;
		},
	},
	actions: {
		async createMovie(dto) {
			console.log(dto);
			try {
				const response = await $axios.post('/movie', dto);
				this.movies.push(response.data);
				return response.data;
			} catch (error) {
				console.error('Error creating movie:', error);
				throw error;
			}
		},
		async getAllMovies() {
			try {
				const response = await $axios.get('/movie');
				this.movies = response.data;
				return response.data;
			} catch (error) {
				console.error('Error fetching movies:', error);
				throw error;
			}
		},
		async getMovieById(id) {
			try {
				const response = await $axios.get(`/movie/${id}`);
				this.currentMovie = response.data;
				return response.data;
			} catch (error) {
				console.error('Error fetching movie by ID:', error);
				throw error;
			}
		},
		async updateMovie(id, dto) {
			try {
				const response = await $axios.patch(`/movie/${id}`, dto);
				this.currentMovie = response.data;
				this.movies = this.movies.map((movie) => {
					if (movie.id === id) {
						return response.data;
					} else {
						return movie;
					}
				});
				return response.data;
			} catch (error) {
				console.error('Error updating movie:', error);
				throw error;
			}
		},
		async deleteMovie(id) {
			try {
				await $axios.delete(`/movie/${id}`);
				this.movies = this.movies.filter((movie) => movie.id !== id);
				return true;
			} catch (error) {
				console.error('Error deleting movie:', error);
				throw error;
			}
		},
	},
});
