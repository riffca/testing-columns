<template>

	<div class="history">
		<div class="history-row" v-for="item in historyItems" :key="item.id">
			<div> {{ item.id }} </div>
			<div> {{ item.name }} </div>
			<div> {{ item.changeTime.toLocaleString() }} </div>
			<div> {{ item.type === 'saved' ? 'сохранено' : 'удалено' }} </div>
		</div>
	</div>
	

</template>

<script>

import { mapGetters } from 'vuex'
export default {

	data(){
		return {
			historyItems: []
		}
	},
	mounted() {
		this.setItems()
	},
	computed: {
		...mapGetters(['fetched'])
	},
	methods: {
		setItems(){
			let type = this.$route.params.type

			if(type) {
				this.historyItems = this.$store.state.data.fetched.filter(item=>{
					return item.type === type
				})
			} else {
				this.historyItems = this.$store.state.data.fetched.filter(item=>item.type)
			}

		}
	},
	watch: {
		$route() {
			this.setItems()
		},
		fetched(){
			this.setItems()

		}
	}

}


</script>

<style lang="scss">

.history-row {

	display: flex;
	justify-content: center;
	border-bottom: 1px oslid black;
	padding: 0.2vw 0.2vw;
	margin: .5vw .6vw;

	div {
		margin: 2vw;
	}
}


</style>
