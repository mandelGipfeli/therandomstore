import { defineStore } from 'pinia';
import { UsersState } from '../interfaces.ts';


export const useUsersStore = defineStore('users', {
    state: (): UsersState => {
      return {
        users: []
      }
    },
  })