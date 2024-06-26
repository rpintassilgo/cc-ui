import { ref, inject } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const axios = inject('axios')

    if (!axios) {
        throw new Error('Axios could not be injected')
    }

    const user = ref(null)
     
    async function login(credentials) {
        try {
            const response = await axios.post('auth/authenticate', credentials)

            user.value = {
                id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                avatar: response.data.avatar || null,
            }
            sessionStorage.setItem('user', JSON.stringify(user.value))
            
            return true       
        } 
        catch(error) {
            clearUser()
            return false
        }
    }

    async function register(credentials) {
        try {
            await axios.post('auth/register', credentials)
            return true       
        } 
        catch(error) {
            return false
        }
    }
    
    async function logout () {
        try {
            await axios.post('auth/logout')
            clearUser()
            return true
        } catch (error) {
            return false
        }
    }

    async function restoreUser () {
        let storedUser = JSON.parse(sessionStorage.getItem('user'))
        if (storedUser) {
            user.value = storedUser
        }
    }

    async function updateAvatar(avatarUrl) {
        try {
            user.value.avatar = avatarUrl;
            sessionStorage.setItem('user', JSON.stringify(user.value));
        } catch (error) {
            console.error('Error updating avatar:', error);
        }
    }

    function clearUser () {
        sessionStorage.removeItem('user')
        user.value = null
    }  
    
    return { user, login, register, logout, restoreUser, clearUser, updateAvatar }
})
