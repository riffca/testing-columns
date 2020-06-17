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

			fetch('https://jsonplaceholder.typicode.com/posts')
				.then(response => response.json())
				.then(json => {

					json.forEach((item,index)=>{

						let names = json[index].title.split(' ')

						json[index].type = ''
						json[index].name = names[0]
						json[index].id = uuid()
						json[index].changeTime = ''
						json[index].items= [
							{
								id: uuid(),
								name: names[1],
							},							
							{
								id: uuid(),
								name: names[2],
							}

						]


					})

					commit('setLoads',json)

			});

		}
	},
}