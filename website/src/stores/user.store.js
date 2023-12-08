import { defineStore } from 'pinia';
import { $axios } from '@/config/axios';

export const useUserStore = defineStore({
	id: 'userStore',
	state: () => ({
		users: [], // Store the list of users
		currentUser: null, // Store the selected user
	}),
	getters: {
		getUsers() {
			return this.users;
		},
		getCurrentUser() {
			return this.currentUser;
		},
	},
	actions: {
		async createUser(user) {
			try {
				const response = await $axios.post('/user', user);
				this.users.push(response.data);
				this.currentUser = response.data;
				return response.data;
			} catch (error) {
				console.error('Error creating user:', error);
				throw error;
			}
		},
		async getAllUsers() {
			try {
				const response = await $axios.get('/user');
				this.users = response.data;
				return response.data;
			} catch (error) {
				console.error('Error fetching users:', error);
				throw error;
			}
		},
		async getUserById(id) {
			try {
				const response = await $axios.get(`/user/${id}`);
				this.currentUser = response.data;
				return response.data;
			} catch (error) {
				console.error('Error fetching user by ID:', error);
				throw error;
			}
		},
		async searchUsers(searchCriteria) {
			try {
				const response = await $axios.post(
					'/user/search',
					searchCriteria
				);
				this.users = response.data;
				return response.data;
			} catch (error) {
				console.error('Error searching movie sessions:', error);
				throw error;
			}
		},
		async updateUser(id, user) {
			try {
				const response = await $axios.patch(`/user/${id}`, user);
				this.currentUser = response.data;
				this.users = this.users.map((u) => {
					if (u.id === id) {
						return response.data;
					} else {
						return u;
					}
				});
				return response.data;
			} catch (error) {
				console.error('Error updating user:', error);
				throw error;
			}
		},
		async deleteUser(id) {
			try {
				const response = await $axios.delete(`/user/${id}`);
				this.users = this.users.filter((u) => u.id !== id);
				return response;
			} catch (error) {
				console.error('Error deleting user:', error);
				throw error;
			}
		},
	},
});
