const debug = require('debug')('vuexsync');
const ReconnectingWebSocket = require('reconnecting-websocket');
const createLogger = require('vuex/dist/logger');
const Store = require('./Store.js');
const Sync = require('vuexsync');

const socket = new ReconnectingWebSocket('ws://'+document.location.host+'/',[],{
	minReconnectionDelay: 250,
	reconnectionDelayGrowFactor: 2
});

const stream = new Sync.TransportStream(socket);
const plugin = Sync.Plugin( stream, {
	initSync: true,
 	filter: {
		blacklist: ['add']
	}
} );
const store = Store([plugin,createLogger()]);
stream.on('data',(e) => {
	store.dispatch("log","< "+JSON.stringify(e.action));
})
stream.on('send',msg => {
	store.dispatch("log","> "+msg);
})

window.store = store;

console.log("initialized",store);

const Vue = require('vue')
const App = require('./App.vue')

new Vue({
	el: '#app',
	store,
	render: function (createElement) {
		return createElement(App)
	}
})