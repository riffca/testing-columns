import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

	const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},	

	{
		path: '/history',
		name: 'history-home',

		component: () => import('../views/History.vue')
	},
	{
		path: '/history/:type',
		name: 'history',
		component: () => import('../views/History.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})


export default router
