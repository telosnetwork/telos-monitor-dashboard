<template>
    <q-table
            v-model:pagination="pagination"
            @request="onRequest"
            :columns="columns"
            :rows="rows" row-key="id"
            :filter="filter"
            :loading="loading"
    >
        <template v-slot:body-cell-checked_at="props">
            <q-td :props="props">
                {{ moment.utc(props.row.checked_at).fromNow() }}
            </q-td>
        </template>
        <template v-slot:body-cell-status="props">
            <q-td :props="props">
                <q-icon color="negative" name="warning" v-if="props.row.message != ''"></q-icon>
                <q-icon name="check" color="positive" v-else ></q-icon>
            </q-td>
        </template>
    </q-table>
</template>

<script>
    import moment from 'moment';
    import { defineComponent, ref, onMounted } from 'vue';
    import { useTaskStatusStore } from "../stores/task_status";
    import { useTaskStore } from "../stores/task";
    const taskStore = useTaskStore();

    export default defineComponent({
        name: 'StatusTable',
        setup () {
            const rows = ref([]);
            const filter = ref('');
            const loading = ref(false);
            const statusStore = useTaskStatusStore();
            const pagination = ref({
                sortBy: 'id',
                descending: true,
                page: 1,
                rowsPerPage: 30,
                rowsNumber: statusStore.getRowsNumberCount()
            });
            async function onRequest (props) {
                const { page, rowsPerPage, sortBy, descending } = props.pagination;
                let tfilter = '';
                if(taskStore.filtered_tasks.length > 0){
                    tfilter = 'or=(';
                    taskStore.filtered_tasks.forEach(task => {
                        tfilter = tfilter + 'task.eq.'+task.id+',';
                    });
                    tfilter = tfilter.slice(0, -1);
                    tfilter += ')';
                }
                loading.value = true

                // update rowsCount with appropriate value
                pagination.value.rowsNumber = await statusStore.getRowsNumberCount(tfilter)

                // get all rows if "All" (0) is selected
                const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

                // calculate starting row of data
                const startRow = (page - 1) * rowsPerPage

                // fetch data from "server"
                const returnedData = await statusStore.fetchTaskStatuses(startRow, fetchCount, tfilter, sortBy, descending)
                returnedData.forEach(row => {
                    taskStore.tasks.forEach(task => {
                        if(task.id == row.task){
                            row.task_name = task.name;
                        }
                    })
                })
                // clear out existing data and add new
                rows.value.splice(0, rows.value.length, ...returnedData)

                // update local pagination object
                pagination.value.page = page
                pagination.value.rowsPerPage = rowsPerPage
                pagination.value.sortBy = sortBy
                pagination.value.descending = descending

                // ...and turn of loading indicator
                loading.value = false
            }

            onMounted(() => {
                // get initial data from server (1st page)
                onRequest({
                    pagination: pagination.value,
                    filter: undefined
                })
            })
            let columns = [{name: 'status', field:'error', label: 'Status', align: 'left'}, {name: 'task', field:'task_name', label: 'Task', align: 'left', sortable: true, required: true}, {name: 'message', field:'message', align: 'left', required: true, label: 'Message'}, {name: 'checked_at', field:'checked_at', align: 'left', label: 'Checked at', sortable: true}];
            return {
                moment,
                filter,
                pagination,
                statusStore,
                loading,
                columns,
                rows,
                onRequest
            }
        }
    })
</script>
