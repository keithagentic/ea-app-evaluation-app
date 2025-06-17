import { create } from 'zustand';
import { User } from '../types';
import { currentUser } from './mockData';

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

interface UserActions {
  setCurrentUser: (user: User | null) => void;
  fetchCurrentUser: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  // State
  currentUser: null,
  loading: false,
  error: null,

  // Actions
  setCurrentUser: (user: User | null) => {
    set({ currentUser: user });
  },

  fetchCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200));
      set({ currentUser, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch user', loading: false });
    }
  },

  logout: () => {
    set({ currentUser: null });
  }
}));