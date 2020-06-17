<template>
	<div id="app">
		<div id="nav">
			<div class="button" @click="$router.push('/history')" :class="{active: check('history-home')}">История</div>
			<div class="button" @click="navigate('saved')" :class="{active: check('saved')}">
				История добавлений
			</div>
			<div class="button" @click="navigate('removed')" :class="{active: check('removed')}">
				История удалений
			</div>			

			<div class="button" @click="$router.push('/')" v-if="$route.path !== '/'">
				Главная
			</div>
		</div>
		<router-view/>
	</div>
</template>

<script>
export default {

	mounted(){

		this.$store.dispatch('loadData')
	},
	methods: {
		navigate(type){
			this.$router.push({name: 'history', params: {type}})
		},
		check(type){

			let param = this.$route.params.type
			let name = this.$route.name
			if(name !== null && !name.includes('history')) {
				return false
			}
			if(param === type) {
				return true
			}

			if(!param && type === 'history-home') {
				return true
			}

			return false

		}
	}

}

</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

.button {
	cursor: pointer;
	display: inline-block;
	border: 1px solid black;
	padding: .2vw .4vw;
	margin: .4vw .3vw;

	&.active {
		background: black;
		color: white;
	}
}

</style>
