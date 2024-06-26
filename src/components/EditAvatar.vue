<script setup>
import { ref, inject } from "vue";
import { useUserStore } from "../stores/user.js";

const axios = inject('axios');
const userStore = useUserStore();
const fileInput = ref(null);
const selectedFile = ref(null);
const toast = inject("toast")

const uploadAvatar = async () => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);

    try {
      const response = await axios.post(`avatar/upload/${userStore.user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const avatarUrl = response.data.url;
      await userStore.updateAvatar(avatarUrl);
      toast.success('Avatar uploaded successfully');
    } catch (error) {
      toast.error('Error uploading avatar')
    }
  } else {

  }
};

const selectFile = (event) => {
  selectedFile.value = event.target.files[0];
}
</script>

<template>
  <div>
    <h3 class="mt-5 mb-3">Edit Avatar</h3>
    <hr>
    <div class="mb-3">
      <label for="formFile" class="form-label">Choose Avatar</label>
      <input 
        class="form-control" 
        type="file" 
        id="formFile" 
        ref="fileInput" 
        @change="selectFile" 
      />
    </div>
    <button class="btn btn-xs btn-dark" @click="uploadAvatar">Upload</button>
  </div>
</template>

<style scoped>
</style>