import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from './user.js';

export const useTaskStore = defineStore('tasks', () => {
  const axios = inject('axios');
  const tasks = ref([]);
  const userStore = useUserStore();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`tasks/${userStore.user.id}`);
      tasks.value = response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post(`tasks/${userStore.user.id}`, task);
      task.id = response.data.id;
      tasks.value.push({ ...task });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = async (task) => {
    try {
      await axios.get(`tasks/update/${task.id}`);
      task.status = task.status === 'TD' ? 'IP' : 'D';
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (task) => {
    try {
      await axios.delete(`tasks/${task.id}`);
      tasks.value = tasks.value.filter((t) => t.id !== task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return {
    tasks,
    fetchTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
  };
});
