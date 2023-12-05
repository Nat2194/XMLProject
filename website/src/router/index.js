import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/MoviesPage.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login/LoginPage.vue'),
	},
	{
		path: '/admin',
		name: 'Admin',
		component: () => import('@/views/AdminPage.vue'),
	},
	{
		path: '/movies',
		name: 'Movies',
		component: () => import('@/views/MoviesPage.vue'),
	},
	{
		path: '/sessions',
		name: 'Sessions',
		component: () => import('@/views/SessionsPage.vue'),
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
