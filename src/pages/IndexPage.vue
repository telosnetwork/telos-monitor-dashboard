<template>
  <q-page>
    <h2 class="text-h4"><span>TASKS</span></h2>
    <div id="filters">
      <div v-for='category in taskStore.categories' :key='category.id' class="auto col">
        <div>{{ category.name.toUpperCase() }}</div>
        <div v-for='task in category.tasks' @click="toggleTask(task.id)" :key='task.id' :class="taskStore.filtered_tasks.includes(task) == false  && 'col auto label off' || task.error == false && 'col auto label success' || 'col auto label'">{{ task.name }}</div>
      </div>
    </div>
    <h2 class="text-h4"><span>LOGS</span></h2>
    <StatusTable :tasks="taskStore.filtered_tasks" :key='taskStore.filtered_tasks.length'  />
  </q-page>
</template>
<style  lang="scss">
  #filters {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .label.success:hover, .label:hover, .label.off {
    background: $dark;
    text-decoration: line-through;
  }
  .label.success {
    background: $positive;
  }
  .label {
    transition: 300ms background-color ease;
    color: white;
    background: $negative;
    cursor: pointer;
    padding: 5px; margin-right: 5px; margin-bottom: 5px;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
  }
</style>
<script>
import { defineComponent} from 'vue';
import { useTaskStore } from "../stores/task";
import StatusTable  from '../components/StatusTable.vue';

const taskStore = useTaskStore();

export default defineComponent({
  name: 'IndexPage',

  components: {
    StatusTable
  },

  setup() {
    taskStore.fetchTasks();
    return {
      taskStore
    }
  },
  methods: {
    async toggleTask(id){
      let found = false;
      let array = await taskStore.filtered_tasks;
      array.forEach((task, i) => {
        if(task.id == id){
          array[i] = array[array.length - 1];
          array.pop();
          found = true;
        }
      })
      if(!found){
        taskStore.tasks.forEach(task => {
          if(task.id == id){
            array.push(task);
          }
        })
      }
      taskStore.filtered_tasks = array;
    }
  }
})
</script>
