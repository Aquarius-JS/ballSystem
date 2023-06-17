<template>
	<div class="header">
		<h1 class="title">球场预约系统</h1>
		<span class="account">{{ accounter.account }}</span>
		<el-button type="info" round @click="exit" class="exit-btn">退出登录</el-button>
	</div>
</template>

<script setup>
	import { Check, Delete, Edit, Message, Search, Star } from "@element-plus/icons-vue";
	import { useAccounter, useShow } from "../stores/index";
	let accounter = useAccounter();
	let show = useShow();
	function exit() {
		localStorage.removeItem("loginToken");
		show.allow = false;
	}
</script>

<style scoped>
	.header {
		width: 100%;
		height: 100px;
		background-color: beige;
		display: flex;
		flex-direction: column;
	}
	.title {
		margin: 10px 100px;
		width: 200px;
	}
	.account {
		margin: -20px 35px auto auto;
		font-size: 12px;
	}
	.exit-btn {
		margin: 0px 30px auto auto;
	}
</style>
