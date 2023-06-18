import { IUser } from '@/interface';
import {defineStore} from 'pinia';

interface IUserState {
  user?: IUser
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => ({ user: undefined }),
  getters: {
    hasUser: (state): boolean => !!state.user?.name,
  },
  actions: {
    setupUser(user:IUser) {
      console.log('> userStore -> setupUser: ', { user });
      this.user = user;
    },
  },
  persist: true
});