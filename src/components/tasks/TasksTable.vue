<script setup>
import { useTaskStore } from '../../stores/tasks.js';
import Button from 'primevue/button';

const taskStore = useTaskStore();

const updateStatus = async (task) => {
  try {
    await taskStore.updateTaskStatus(task);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

const deleteTask = async (task) => {
  try {
    await taskStore.deleteTask(task);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th class="align-middle">Name</th>
        <th class="align-middle">Description</th>
        <th class="align-middle">Status</th>
        <th class="align-middle">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in taskStore.tasks" :key="task.name">
        <td class="align-middle">{{ task.name }}</td>
        <td class="align-middle">{{ task.description }}</td>
        <td class="align-middle">{{ task.status == 'TD' ? 'To be started': task.status == 'IP' ? 'In progress' : 'Done' }}</td>
        <td class="align-middle">
          <template v-if="task.status === 'TD'">
            <Button @click="updateStatus(task)" label="Start" severity="success" raised />
          </template>
          <template v-else-if="task.status === 'IP'">
            <Button @click="updateStatus(task)" label="Complete" severity="warn" raised />
          </template>
          <Button @click="deleteTask(task)" label="Delete" severity="danger" raised></Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
