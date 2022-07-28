import { defineStore } from 'pinia'
import axios from "axios"

const ENDPOINT = process.env.API_ENDPOINT;

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: []
    }),
    getters: {
        getCategories(state){
            return state.categories
        }
    },
    actions: {
        async fetchCategories() {
            try {
                const data = await axios.get(ENDPOINT + '/task_categories')
                this.categories = data.data
            }
            catch (error) {
                console.log(error)
            }
        }
    },
})
