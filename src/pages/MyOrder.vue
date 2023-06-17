<template>
	<div>
		<el-table :data="myOrders" style="width: 100%">
			<el-table-column prop="id" label="shop name" width="180" />
			<el-table-column prop="id" label="location" width="180" />
			<el-table-column prop="id" label="Serial" width="100" />
			<el-table-column prop="certainTime" label="certain time" width="130" />
			<el-table-column prop="rentTime" label="rent time" />
			<el-table-column label="操作" prop="id" v-slot="id">
				<el-button type="danger" plain @click="deleteOrde(id.row.id + '')"
					>取消订单</el-button
				>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
	import { useAccounter } from "../stores/index";
	import { ref } from "vue";
	import axios from "axios";
	const account = useAccounter();
	let myOrders = ref();
	async function getMyOrder() {
		let loginToken = localStorage.getItem("loginToken");
		console.log(loginToken);
		try {
			let res = await axios.get("/api/order/get", {
				headers: {
					Authorization: localStorage.getItem("loginToken"),
				},
			});
			console.log(res);
			if (res.data.code === 200 && res.data.message) {
				myOrders.value = res.data.data;
			}
		} catch (e) {
			console.log(e);
		}
	}
	getMyOrder();

	async function deleteOrde(orderId) {
		try {
			console.log(orderId);
			let res = await axios.get(`/api/order/delete/${orderId}`, {
				headers: {
					Authorization: localStorage.getItem("loginToken"),
				},
			});
			console.log(res);
			if (res.data.code === 200 && res.data.message === "成功") {
				console.log("删除成功");
				getMyOrder();
			}
		} catch (e) {
			console.log(e);
		}
	}
</script>

<style></style>
