import {create} from 'zustand';

const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useUserStore;

