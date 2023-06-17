<template>
	<div class="register">
		<el-input
			v-model="account"
			maxlength="11"
			minlength="11"
			placeholder="phone"
			show-word-limit
			type="text"
		/>
		<el-input type="password" placeholder="password" show-password v-model="passwd" />
		<el-input
			v-model="confirmPasswd"
			type="confirmPasswd"
			placeholder="confirmPasswd"
			show-password
		/>
		<div class="verificationCode-container">
			<el-input
				v-model="verificationCode"
				maxlength="4"
				minlength="4"
				placeholder="验证码"
				show-word-limit
				type="text"
				class="verificationCode"
			/>
			<el-button type="primary" loading class="sendVcode-btn" v-if="loading">{{
				time
			}}</el-button>
			<el-button type="primary" @click="sendVcode" class="sendVcode-btn" v-if="!loading"
				>发送验证码</el-button
			>
		</div>
		<el-button type="info" plain @click="registe">RetrievePW</el-button>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import axios from "axios";
	let account = ref("");
	let passwd = ref("");
	let confirmPasswd = ref("");
	let verificationCode = ref("");
	let loading = ref(false);
	let time = ref(60);
	async function sendVcode() {
		try {
			let res = await axios.get(`/api/sendMsg?phone=${account.value}`);
			loading.value = !loading.value;
			const timer = setInterval(() => {
				if (time.value <= 0) {
					time.value = 60;
					loading.value = !loading.value;
					clearInterval(timer);
				}
				time.value--;
			}, 1000);
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	}
	async function registe() {
		try {
			let res = await axios.post("/api/register", {
				code: verificationCode.value,
				phone: account.value,
				username: account.value,
				password: passwd.value,
			});
			// if(res.data)
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	}
</script>

<style>
	.register {
		margin: 50px auto;
		width: 300px;
		height: 300px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.verificationCode {
		width: 180px;
		margin-right: 15px;
	}
	.sendVcode-btn {
		width: 105px;
	}
</style>
