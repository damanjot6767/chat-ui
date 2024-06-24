import { create } from 'zustand'
import { UserModel } from '../(main)/lib/users/user-model'
import { persist } from "zustand/middleware"

interface UserState {
  isLoading: boolean,
  user: UserModel | null,
  users: UserModel[] | null,
  setLoading: (value: boolean) => void,
  setUser: (data: UserModel) => void,
  setUsers: (data: UserModel[]) => void
}

const useUserStore = create<UserState>()(persist(
  (set) => ({
    isLoading: false,
    user: null,
    users: null,
    setLoading: (value) => set((state) => ({ isLoading: value })),
    setUser: (data) => set((state) => ({ isLoading: false, user: data })),
    setUsers: (data) => set((state) => ({ isLoading: false, users: data })),
  }),
  {
    name: 'user store'
  }
))

export default useUserStore