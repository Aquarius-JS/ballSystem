<template>
	<div id="app">
		<Login v-show="!show.allow"></Login>
		<Main v-show="show.allow"></Main>
	</div>
</template>

<script setup>
	import Login from "./components/Login.vue";
	import Main from "./components/Main.vue";
	import { storeToRefs } from "pinia";

	import { useShow } from "./stores/index";
	const show = useShow();
</script>
<style>
.login-container{
	margin-bottom: 20px;
}
.main-container{
	margin-top: 20px;
}
</style>
