import { create } from 'zustand';
import { Application } from '../types';
import { mockApplications } from './mockData';

interface ApplicationState {
  applications: Application[];
  selectedApplication: Application | null;
  loading: boolean;
  error: string | null;
}

interface ApplicationActions {
  fetchApplications: () => Promise<void>;
  getApplication: (id: string) => Application | undefined;
  selectApplication: (application: Application | null) => void;
  addApplication: (application: Omit<Application, 'id' | 'created_at' | 'updated_at'>) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
}

export const useApplicationStore = create<ApplicationState & ApplicationActions>((set, get) => ({
  // State
  applications: [],
  selectedApplication: null,
  loading: false,
  error: null,

  // Actions
  fetchApplications: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ applications: mockApplications, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch applications', loading: false });
    }
  },

  getApplication: (id: string) => {
    const { applications } = get();
    return applications.find(app => app.id === id);
  },

  selectApplication: (application: Application | null) => {
    set({ selectedApplication: application });
  },

  addApplication: (applicationData) => {
    const newApplication: Application = {
      ...applicationData,
      id: `app-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    set(state => ({
      applications: [...state.applications, newApplication]
    }));
  },

  updateApplication: (id: string, updates: Partial<Application>) => {
    set(state => ({
      applications: state.applications.map(app =>
        app.id === id
          ? { ...app, ...updates, updated_at: new Date().toISOString() }
          : app
      )
    }));
  },

  deleteApplication: (id: string) => {
    set(state => ({
      applications: state.applications.filter(app => app.id !== id),
      selectedApplication: state.selectedApplication?.id === id ? null : state.selectedApplication
    }));
  }
}));