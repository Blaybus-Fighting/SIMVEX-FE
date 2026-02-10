import { create } from 'zustand';
import type { AuthUser } from '@/types/auth';

interface UserState {
    user: AuthUser | null;
    isLogin: boolean;
    setUser: (user: AuthUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLogin: false,

    setUser: (user: AuthUser) => set({ user: user, isLogin: true }),

    clearUser: () => set({ user: null, isLogin: false }),
}));