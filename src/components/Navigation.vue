<template>
	<div class="nav-container">
		<el-row class="tac">
			<el-col :span="12">
				<el-menu
					active-text-color="#ffd04b"
					background-color="#545c64"
					class="el-menu-vertical-demo"
					default-active="2"
					text-color="#fff"
					@open="handleOpen"
					@close="handleClose"
				>
					<el-menu-item index="1" @click="push('/Shops')">
						<el-icon><icon-menu /></el-icon>
						<span>球场</span>
					</el-menu-item>
					<el-menu-item index="2" @click="push('/MyOrder')">
						<el-icon><icon-menu /></el-icon>
						<span>我的订单</span>
					</el-menu-item>
					<el-menu-item index="3" @click="push('/MyShops')">
						<el-icon><icon-menu /></el-icon>
						<span>我的店铺</span>
					</el-menu-item>
					<el-menu-item index="4" @click="push('/MyInfo')">
						<el-icon><setting /></el-icon>
						<span>个人中心</span>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
		<router-view name="shops" class="rview"></router-view>
	</div>
</template>

<script setup>
	import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
	import { useRouter } from "vue-router";
	const handleOpen = (key, keyPath) => {
		console.log(key, keyPath);
	};
	const handleClose = (key, keyPath) => {
		console.log(key, keyPath);
	};

	const router = useRouter();
	function push(r) {
		router.push(r);
	}
</script>

<style scoped>
	.nav-container {
		display: flex;
		flex-direction: row;
	}
	.tac {
		width: 400px;
	}
	.rview {
		width: 800px;
		height: 500px;
	}
</style>
