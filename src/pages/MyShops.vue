<template>
	<div>
		<div class="demo-collapse">
			<el-collapse v-model="activeName" accordion>
				<el-collapse-item
					v-for="shop in shops"
					:title="shop.name + '   ' + shop.location"
					:name="shop.id"
					:key="shop.id"
					@click="getPlaces(shop.id)"
				>
					<div>
						<el-select v-model="ballValue" class="m-2" placeholder="Select">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
						<el-input
							v-model="money"
							placeholder="单价: 元/小时"
							clearable
							class="elInput"
						/>
						<el-input
							v-model="placeIndex"
							placeholder="序号"
							clearable
							class="elInput"
						/>
						<el-button type="info" plain @click="addPlace(shop.id)">添加</el-button>
					</div>
					<hr />
					<el-table :data="places" style="width: 100%">
						<el-table-column prop="type" label="类型" width="180" />
						<el-table-column prop="description" label="序号" width="180" />
						<el-table-column prop="cost" label="单价" />
					</el-table>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script setup>
	import axios from "axios";
	import { ref } from "vue";
	import { InfoFilled } from "@element-plus/icons-vue";
	const activeName = ref("1");
	let shops = ref();
	async function getMyShops() {
		try {
			let res = await axios.get("/api/shop/query/mine", {
				headers: {
					Authorization: localStorage.getItem("loginToken"),
				},
			});
			console.log(res);
			if (res.data.code === 200 && res.data.message === "成功") {
				shops.value = res.data.data;
			}
		} catch (e) {
			console.log(e);
		}
	}
	getMyShops();

	const options = [
		{
			value: "badminton",
			label: "badminton",
		},
		{
			value: "table tennis",
			label: "table tennis",
		},
		{
			value: "basketball",
			label: "basketball",
		},
		{
			value: "football",
			label: "football",
		},
	];
	let places = ref();
	async function getPlaces(shopId) {
		try {
			let res = await axios.get("/api/get/place/list?id=" + shopId, {
				headers: {
					Authorization: localStorage.getItem("loginToken"),
				},
			});
			if (res.data.code === 200 && res.data.message === "成功") {
				places.value = res.data.data;
				console.logres.data.data;
			}
		} catch (e) {
			console.log(e);
		}
	}

	//添加场地
	let ballValue = ref("");
	let money = ref("");
	let placeIndex = ref();
	async function addPlace(shopId) {
		try {
			let res = await axios.post(
				"/api/add/place",
				{
					type: ballValue.value,
					cost: money.value,
					shopId: shopId,
					id: placeIndex.value,
					description: placeIndex.value,
				},
				{
					headers: {
						Authorization: localStorage.getItem("loginToken"),
					},
				}
			);
			if (res.data.code === 200 && res.data.message === "成功") {
				console.log("添加成功");
				getPlaces(shopId);
			}
		} catch (e) {
			console.log(e);
		}
	}
</script>

<style>
	.elInput {
		margin-left: 10px;
		width: 100px;
	}
</style>
