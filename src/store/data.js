import { v4 as uuid } from 'uuid'

import axios from 'axios'


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

			let payload = {
					token: "db5yybdJQaNSpmIILhK1RQ",
					data: {
						name: "nameFirst",
						names: 'functionArray|3|nameFirst',
						_repeat: 100
					}
			};

			axios({
				method: "post",
				url: "https://app.fakejson.com/q",
				data: payload
			}).then(function(resp) {

				let json = resp.data

				json.forEach((item,index)=>{
					json[index].type = ''
					json[index].id = uuid()
					json[index].changeTime = ''
					json[index].items= []
					json[index].names.forEach(one=>{
						json[index].items.push({
							name: one, id: uuid()
						})
					})

				})

				commit('setLoads',json)

			});

		}
	},
}