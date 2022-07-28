import { defineStore } from 'pinia'
import axios from "axios"

const ENDPOINT = process.env.API_ENDPOINT;

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    filtered_tasks: [],
    categories: [],
  }),
  getters: {
    getTasks(state){
      return state.tasks
    }
  },
  actions: {
    async fetchTasks() {
      if(this.tasks.length > 0) return;
      try {
        const response_categories = await axios.get(ENDPOINT + '/task_categories');
        this.categories = response_categories.data;
        this.categories.forEach(category => {
          category.tasks = [];
        })
        const response = await axios.get(ENDPOINT + '/tasks');
        this.tasks = response.data;
        this.tasks.forEach(async task => {
          let response_status = await axios.get(ENDPOINT + '/task_status?task=eq.' + task.id + '&limit=1&order=id.desc');
          task.error = (response_status.data[0].message != "");
          this.categories.forEach(category => {
            if(task.category == category.id){
              task.toggle = true;
              category.tasks.push(task);
            }
          })
        })
        this.filtered_tasks = [...this.tasks];
        return this.tasks;

        // todo: fetch last status of each task
      }
      catch (error) {
        console.log(error)
      }
    }
  },
})
