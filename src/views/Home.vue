<template>
	<div class="home">
		<div class="columns">
				<div class="left">

					<div class="input-wrapper">
						<input type="text" v-model="filterName">
					</div>

					<div v-for="item in shown" :key="item.id">

						{{ item.name }}

						<div class="button" @click="addHistory(item, 'saved')">+</div>
						
						<div class="nested">
							<div v-for="nested in item.items" :key="nested.id">

								{{ nested.name }}

							</div>
							
						</div>
					</div>

				</div>
				<div class="right">
					<div v-for="item in saved" :key="item.id">
						{{ item.name }}
						<div class="button" @click="addHistory(item, 'removed')">-</div>
					</div>
				</div>
		</div>



	</div>
</template>

<script>
// @ is an alias to /src

export default {
	data(){
		return {
			filterName: '',
		}
	},
	methods: {
		addHistory(item, type){
			this.$store.dispatch('historyAction',{ item, type })
		}
	},



	computed:{


		saved(){

			return this.$store.state.data.fetched.filter(item=>item.type==='saved')

		},

		shown(){

			let all = this.$store.state.data.fetched.filter(item=> {
				return !item.type ||  item.type !== 'saved'
			})


			return all

				.map(item=>{

					let string = item.name.slice()

					item.items.forEach(one=>{
						string+=one.name
					})
					let rexp = string.match(new RegExp(this.filterName, 'gi')) 
					item.matches = rexp === null ? 0 : rexp.length
					return item

				})

				.filter(item=>{

					return item.matches !== 0
				})

				.sort((a,b)=>{
					return a.matches - b.matches
				})

		}
	}
}
</script>

<style lang="scss">

.input-wrapper {
	text-align:center;
	input {
		font-size: 1.4vw;
	}

	margin: 2vw;
}

.home {

	.columns {
		display: flex;
		justify-content: center;
	}

	.left, .right {
		width: 40vw;
		border: 1px solid rgba(0,0,0,.2);

	}
	
}

</style>
