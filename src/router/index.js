import * as VueRouter from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import RetrievePW from "../pages/RetrievePW.vue";
import Shops from "../pages/Shops.vue";
import MyInfo from "../pages/MyInfo.vue";
import MyOrder from "../pages/MyOrder.vue";
import MyShops from "../pages/MyShops.vue";

const router = VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes: [
		{
			path:'/',
			redirect:{
				path:'/Login'
			}
		},
		{
			path: "/Login",
			components: {
				default: Login,
			},
		},
		{
			path: "/Register",
			component: Register,
		},
		{
			path: "/RetrievePW",
			component: RetrievePW,
		},
		{
			path: "/Shops",
			components: {
				shops: Shops,
			},
		},
		{
			path: "/MyInfo",
			component: MyInfo,
		},
		{
			path: "/MyOrder",
			components: {
				shops: MyOrder,
			},
		},
		{
			path: "/MyShops",
			components: {
				shops: MyShops,
			},
		},
	],
});
// router.beforeEach(to,from,next){
//     if(to.name === 'Child')
// }

export default router;
