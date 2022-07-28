import { defineStore } from 'pinia'
import axios from "axios"

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
                const data = await axios.get('http://46.101.109.199:3000/task_categories')
                this.categories = data.data
            }
            catch (error) {
                console.log(error)
            }
        }
    },
})
