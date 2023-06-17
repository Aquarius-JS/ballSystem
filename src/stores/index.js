import { defineStore } from "pinia";
import { ref } from "vue";
export const useShow = defineStore("show", () => {
	let allow = ref(false);
	return {
		allow,
	};
});
export const useAccounter = defineStore("account", () => {
	let account = ref("");
	let loginToken = ref("");
	function setAccount(newVal) {
		account.value = newVal;
	}
	return {
		account,
		loginToken,
		setAccount
	};
});
