import { defineStore } from "pinia";

export const mainStore = defineStore('main', {
    state: () => {
        return {
            token: 'token'
        }
    },
    getters: {

    },
    actions: {
        updateToken(token: string): void {
            this.token = token
        }
    }
})