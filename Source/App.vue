<template>
	<div id="app">

 		<h1>VueX-Sync Test Page</h1>

		<div>
			<label>State:</label>
			<span>{{ $store.state.base.count }}</span>
		</div>
		<div>
			<label>Input:</label>
			<input type="number" v-model="num" />
			<button @click="commit">Increment</button>
		</div>
		<h2>Network Log</h2>
		<ul>
			<li v-for="log in $store.state.testlog.entries">
				{{ log }}
			</li>
		</ul>
	</div>
</template>

<script>
module.exports = {
	data () {
		return {
			num: 1
		}
	},

	methods: {
		commit() {
			this.$store.dispatch("run",{ n: ~~(this.num)});
		}
	},

	created(){
		console.log("created",this);
	}
}
</script>