<script setup>
import TasksTable from "./TasksTable.vue";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { ref, onMounted } from "vue";
import { useTaskStore } from '../../stores/tasks.js';

const visible = ref(false);
const task = ref({
  name: "",
  description: "",
  status: "TD"
});

const taskStore = useTaskStore();

const setDialogVisible = () => {
  visible.value = true;
}

const addTask = async () => {
  try {
    await taskStore.addTask(task.value);
    task.value.name = "";
    task.value.description = "";
    visible.value = false;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

onMounted(() => {
  taskStore.fetchTasks();
});
</script>

<template>
  <div class="tasks-header flex justify-content-between align-items-center mb-3">
    <h3 class="mt-5 mb-3">Tasks</h3>
    <Button class="btn btn-xs btn-dark" @click="setDialogVisible">
      Create Task
    </Button>
  </div>

  <Dialog v-model:visible="visible" modal header="New Task" :style="{ width: '30rem' }">
    <div class="p-fluid">
      <div class="field">
        <label for="task" class="font-semibold">Name</label>
        <input id="task" type="text" class="p-inputtext p-component" autocomplete="off" v-model="task.name" />
      </div>
      <div class="field">
        <label for="description" class="font-semibold">Description</label>
        <textarea id="description" class="p-inputtextarea p-component" rows="5" autocomplete="off" v-model="task.description"></textarea>
      </div>
      <div class="flex justify-content-end gap-2">
        <Button class="btn btn-xs btn-dark" type="button" label="Save" @click="addTask"></Button>
      </div>
    </div>
  </Dialog>

  <hr>
  <TasksTable :tasks="taskStore.tasks" />
</template>
