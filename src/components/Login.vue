<template>
	<div>
		<div class="header">
			<h1>欢迎使用球场预约系统</h1>
		</div>
		<div class="main">
			<div class="router-container">
				<router-link to="/Login" class="login-button btn"
					><el-button type="primary">登录</el-button></router-link
				>
				<router-link to="/Register" class="register-button btn"
					><el-button type="success">注册</el-button></router-link
				>
				<router-link to="/RetrievePW" class="retrieve-button btn"
					><el-button type="info">找回</el-button></router-link
				>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup>
	import { onMounted } from "vue";
	import { useRoute } from "vue-router";
	import axios from "axios";
	import { useShow } from "../stores/index";
	onMounted(() => {
		const token = localStorage.getItem("loginToken");
		const show = useShow();
		if (token) {
			async function autoLogin() {
				try {
					response = await axios.get();
					if (response.data.isOK === 1) {
						//修改pinia的页面显示值为1
						show.allow = 1;
					}
				} catch (e) {
					console.log(e);
				}
			}
			autoLogin();
		} else {
			console.log("请登录");
		}
	});
	const router = useRoute();
</script>

<style scoped>
	.header {
		widows: 100%;
		height: 100px;
		background-color: #F2F6FC;
	}
	.header h1 {
		line-height: 100px;
		text-align: center;
	}
	.main {
		width: 400px;
		height: 500px;
		margin: 10px auto;
	}
	.router-container {
		margin: 0 auto;
		display: flex;
		width: 300px;
		height: 50px;
		/* background-color: rgb(138, 233, 233); */
		flex-direction: row;
		justify-content: space-around;
	}
	.btn {
		width: 200px;
		text-align: center;
		line-height: 50px;
		align-content: center;
		text-decoration: none;
	}
</style>
