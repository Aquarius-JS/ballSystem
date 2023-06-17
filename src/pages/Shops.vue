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
					<hr />
					<el-table :data="places" style="width: 100%">
						<el-table-column prop="type" label="类型" width="110" />
						<el-table-column prop="description" label="场号" width="80" />
						<el-table-column prop="cost" label="单价" width="80" />
						<el-table-column label="日期" width="140">
							<el-select v-model="dayOffSet" class="m-2" placeholder="beginTime">
								<el-option
									v-for="item in dayOffSetOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</el-table-column>
						<el-table-column label="开始时间" width="140">
							<el-select v-model="beginTime" class="m-2" placeholder="beginTime">
								<el-option
									v-for="item in beginTimeOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</el-table-column>
						<el-table-column label="时长" width="100">
							<el-select v-model="rentTime" class="m-2" placeholder="时长">
								<el-option
									v-for="item in rentTimeOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</el-table-column>
						<el-table-column label="选择" prop="id" v-slot="id">
							<el-button
								type="info"
								plain
								@click.prevent="createOrder(shop.id, id.row.id)"
								>预定</el-button
							>
						</el-table-column>
					</el-table>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script setup>
	import { onBeforeMount, reactive, ref } from "vue";
	import axios from "axios";
	import { useRouter } from "vue-router";
	const router = useRouter();
	const activeName = ref("1");
	//店铺信息
	let shops = ref();
	async function getShops() {
		try {
			let res = await axios.get("/api/shop/list/1/10");
			console.log(res);
			if (res.data.code === 200 && res.data.message === "成功") {
				shops.value = res.data.data;

				console.log(shops, shops.length);
			}
		} catch (e) {
			console.log(e);
		}
	}
	getShops();
	//获取场地信息
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
				console.log(res.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	//下单
	let dayOffSet = ref("");
	let beginTime = ref("");
	let rentTime = ref("");
	const dayOffSetOptions = [
		{
			value: "1",
			label: getLaterDate(1),
		},
		{
			value: "2",
			label: getLaterDate(2),
		},
		{
			value: "3",
			label: getLaterDate(3),
		},
		{
			value: "4",
			label: getLaterDate(4),
		},
		{
			value: "5",
			label: getLaterDate(5),
		},
		{
			value: "6",
			label: getLaterDate(6),
		},
	];
	const beginTimeOptions = [
		{
			value: "8",
			label: "8:00",
		},
		{
			value: "9",
			label: "9:00",
		},
		{
			value: "10",
			label: "11:00",
		},
		{
			value: "11",
			label: "11:00",
		},
		{
			value: "12",
			label: "12:00",
		},
		{
			value: "13",
			label: "13:00",
		},
		{
			value: "14",
			label: "14:00",
		},
		{
			value: "15",
			label: "15:00",
		},
		{
			value: "16",
			label: "16:00",
		},
		{
			value: "17",
			label: "17:00",
		},
		{
			value: "18",
			label: "18:00",
		},
		{
			value: "19",
			label: "19:00",
		},
		{
			value: "20",
			label: "20:00",
		},
		{
			value: "21",
			label: "21:00",
		},
	];
	const rentTimeOptions = [
		{
			value: "1",
			label: "1h",
		},
		{
			value: "2",
			label: "2h",
		},
		{
			value: "3",
			label: "3h",
		},
		{
			value: "4",
			label: "4h",
		},
	];
	async function createOrder(shopId, placeId) {
		try {
			let res = await axios.post(
				"/api/order/create",
				{
					shopId: shopId,
					placeId: placeId,
					dayOffSet: dayOffSet.value,
					beginTime: beginTime.value,
					rentTime: rentTime.value,
				},
				{
					headers: {
						Authorization: localStorage.getItem("loginToken"),
					},
				}
			);
			console.log(res);
			if (res.data.code === 200 && res.data.message === "成功") {
				console.log(res);
			}
		} catch (e) {
			console.log(e);
		}
		console.log(shopId, placeId);
	}
	//计算日期
	function getLaterDate(dayNum, dateTime = null) {
		// 如果为null,则格式化当前时间为时间戳
		if (!dateTime) dateTime = +new Date();
		// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
		if (dateTime.toString().length == 10) dateTime *= 1000;
		const timestamp = +new Date(Number(dateTime));

		const one_day = 86400000; // 24 * 60 * 60 * 1000;
		const addVal = dayNum * one_day + timestamp;
		//x天后的日期
		const date = new Date(addVal);

		//格式化日期
		const filters = n => {
			return n < 10 ? (n = "0" + n) : n;
		};
		const month = filters(date.getMonth() + 1);
		const day = filters(date.getDate());
		const hours = filters(date.getHours());
		const minutes = filters(date.getMinutes());
		const seconds = filters(date.getSeconds());

		const lastTime = `${date.getFullYear()}/${month}/${day}`;
		return lastTime;
	}
</script>

<style>
	.shopList {
		width: 250px;
		height: 50px;
		margin-bottom: 20px;
		background-color: gray;
		display: flex;
		flex-direction: column;
	}
	.places {
		float: right;
	}

	.demo-date-picker {
		display: flex;
		width: 100%;
		padding: 0;
		flex-wrap: wrap;
	}

	.demo-date-picker .block {
		padding: 30px 0;
		text-align: center;
		border-right: solid 1px var(--el-border-color);
		flex: 1;
	}

	.demo-date-picker .block:last-child {
		border-right: none;
	}

	.demo-date-picker .demonstration {
		display: block;
		color: var(--el-text-color-secondary);
		font-size: 14px;
		margin-bottom: 20px;
	}
</style>
