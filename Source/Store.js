const Vue = require('vue');
const Vuex = require('vuex');
const debug = require('debug')('vuex2vuex');

Vue.use(Vuex);


module.exports = (plugins) => {
	return new Vuex.Store({
		plugins: plugins,
		modules: {
			base: {
				state(){ return {
					count: 0
				}; },
				mutations: {
					increment (state,n) {
						debug("store.increment",n);
						state.count += n;
					}
				},
				actions: {
					run ({ commit }, params) {
						let n = params.n || 1;
						commit('increment',n);
					}
				}
			},
			testlog: {
				state(){ return {
					entries: [],
				}},
				mutations: {
					add (state,e) {
						debug("store.add",arguments);
						state.entries.push(e);
						if (state.entries.length > 10) {
							state.entries.shift();
						}
					}
				},
				actions: {
					log ({ commit }, json) {
						commit('add',json);
					}
				}
			}
		}
	});
}

