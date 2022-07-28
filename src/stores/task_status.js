import { defineStore } from 'pinia'
import axios from "axios"
import { useTaskStore } from "../stores/task";

const ENDPOINT = process.env.API_ENDPOINT;

export const useTaskStatusStore = defineStore('task_status', {
  state: () => ({
    statuses: [],
    rows: 0
  }),
  getters: {
    getTaskStatuses(state){
      return state.statuses
    },
  },
  actions: {
    async getRowsNumberCount(filter){
      try {
        const response = await axios.get(ENDPOINT + '/task_status?' + filter, {
          headers: {
            'Range-Unit': 'tasks',
            'Range': '1-1',
            'Prefer': 'count=exact'
          }
        });
        return response.headers['content-range'].split('/')[1];
      }
      catch (error) {
          console.log(error)
      }
      return 0;
    },
    async fetchTaskStatuses(startRow, fetchCount, filter, sortBy, descending) {
      filter = (filter.length > 0) ? '&' + filter : '';
      try {
        const sort = (sortBy) ? 'order='+sortBy+'.'+((descending) ? 'desc': 'asc') + '&' : '';
        const response = await axios.get(ENDPOINT + '/task_status?' + sort +'limit=' + fetchCount +"&offset=" + startRow + filter)
        this.statuses = response.data;
        return this.statuses;
      }
      catch (error) {
        console.log(error)
      }
    }
  },
})
