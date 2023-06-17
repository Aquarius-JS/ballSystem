<template>
	<div class="login">
		<el-input
			v-model="account"
			maxlength="11"
			minlength="11"
			placeholder="phone"
			show-word-limit
			type="text"
		/>
		<el-input
			type="password"
			placeholder="Please input password"
			show-password
			v-model="passwd"
		/>
		<el-button type="primary" plain @click="login">LOGIN</el-button>
	</div>
</template>

<script setup>
	import axios from "axios";
	import { ref } from "vue";
	import { useShow, useAccounter } from "../stores/index";
	const show = useShow();
	const accounter = useAccounter();
	let account = ref();
	let passwd = ref();
	async function login() {
		let res=ref('');
		try {
			res = await axios.post("/api/login/password", {
				phone: account.value,
				username: account.value,
				password: passwd.value,
			});
			if (res.data.code === 200 && res.data.message === "成功") {
				console.log(res);
				localStorage.setItem("loginToken", res.data.data);
				show.allow = true;
				accounter.setAccount(account.value);
			}
		} catch (e) {
			console.log(e);
		}
	}
</script>

<style scoped>
	.login {
		margin: 50px auto;
		width: 300px;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
</style>
