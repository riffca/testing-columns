import { v4 as uuid } from 'uuid'




export default	{ 
	state: {
		fetched: [],
	},

	getters: {
		fetched(state){
			return state.fetched
		}
	},
	mutations: {

		'setLoads'(state,val){
			state.fetched = val
		},

		'updateHistory'(state,{ type, item }){

			state.fetched.forEach((one,index)=>{
				if(one.id === item.id) {
					state.fetched[index].type = type
					state.fetched[index].changeTime = new Date()
				} 
			})

		}

	},
	actions: {
		
		historyAction({commit}, {type, item}){
			commit('updateHistory',{type, item})
		},

		loadData({commit}){

			let data = [
				{
					id:uuid(),
					name: 'test',
					items: [
						{
							id: uuid(),
							name: 'test',
						},
						{
							id:uuid(),
							name: 'test',
						},
					],
				},
				{
					id: uuid(),
					name: 'test',
					items: [
						{
							id: uuid(),
							name: 'test',
						}
					],
				},
			]

			data.forEach((item,index)=>{
				data[index].type = ''
				data[index].changeTime = ''
			})

			setTimeout(()=>{
				commit('setLoads',data)
			},400)

		}
	},
}