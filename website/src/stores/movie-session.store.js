import { defineStore } from 'pinia';
import { $axios } from '@/config/axios';

export const useMovieSessionStore = defineStore({
	id: 'movieSessionStore',
	state: () => ({
		movieSessions: [],
		currentSession: null,
	}),
	actions: {
		async createMovieSession(sessionData) {
			try {
				const response = await $axios.post('/session', sessionData);
				this.movieSessions.push(response.data);
				return response.data;
			} catch (error) {
				console.error('Error creating movie session:', error);
				throw error;
			}
		},
		async getAllMovieSessions() {
			try {
				const response = await $axios.get('/session');
				this.movieSessions = response.data;
			} catch (error) {
				console.error('Error fetching movie sessions:', error);
				throw error;
			}
		},
		async getMovieSessionById(id) {
			try {
				const response = await $axios.get(`/session/${id}`);
				this.currentSession = response.data;
			} catch (error) {
				console.error('Error fetching movie session by ID:', error);
				throw error;
			}
		},
		async getMovieSessionsByMovieId(movieId) {
			try {
				const response = await $axios.get(`/session/movie/${movieId}`);
				this.movieSessions = response.data;
			} catch (error) {
				console.error(
					'Error fetching movie sessions by movie ID:',
					error
				);
				throw error;
			}
		},
		async getMovieSessionsByMovieName(movieName) {
			try {
				const response = await $axios.get(
					`/session/movie-name/${movieName}`
				);
				this.movieSessions = response.data;
			} catch (error) {
				console.error(
					'Error fetching movie sessions by movie ID:',
					error
				);
				throw error;
			}
		},
		async getMovieSessionsByCity(cityName) {
			try {
				const response = await $axios.get(`/session/city/${cityName}`);
				this.movieSessions = response.data;
			} catch (error) {
				console.error(
					'Error fetching movie sessions by city name:',
					error
				);
				throw error;
			}
		},
		async getMovieSessionsByDateRange(startDate, endDate) {
			try {
				const response = await $axios.get(
					`/session/date/${startDate}/${endDate}`
				);
				this.movieSessions = response.data;
			} catch (error) {
				console.error('Error fetching movie sessions by date:', error);
				throw error;
			}
		},
		async getMovieSessionsByDate(date) {
			try {
				const response = await $axios.get(`/session/date/${date}`);
				this.movieSessions = response.data;
			} catch (error) {
				console.error('Error fetching movie sessions by date:', error);
				throw error;
			}
		},
		async updateMovieSession(id, dto) {
			try {
				const response = await $axios.patch(`/session/${id}`, dto);
				this.currentSession = response.data;
				this.movieSessions = this.movieSessions.map((session) => {
					if (session.id === id) {
						return response.data;
					} else {
						return session;
					}
				});
				return response.data;
			} catch (error) {
				console.error('Error updating movie session:', error);
				throw error;
			}
		},
		async deleteMovieSession(id) {
			try {
				await $axios.delete(`/session/${id}`);
				this.movieSessions = this.movieSessions.filter(
					(session) => session.id !== id
				);
				return true;
			} catch (error) {
				console.error('Error deleting movie session:', error);
				throw error;
			}
		},
	},
});
