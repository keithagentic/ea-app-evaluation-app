import { create } from 'zustand';
import { Rubric, RubricCategory, RubricSubcategory } from '../types';
import { mockRubrics } from './mockData';

interface RubricState {
  rubrics: Rubric[];
  selectedRubric: Rubric | null;
  loading: boolean;
  error: string | null;
}

interface RubricActions {
  fetchRubrics: () => Promise<void>;
  getRubric: (id: string) => Rubric | undefined;
  selectRubric: (rubric: Rubric | null) => void;
  getCategory: (rubricId: string, categoryId: string) => RubricCategory | undefined;
  getSubcategory: (rubricId: string, categoryId: string, subcategoryId: string) => RubricSubcategory | undefined;
}

export const useRubricStore = create<RubricState & RubricActions>((set, get) => ({
  // State
  rubrics: [],
  selectedRubric: null,
  loading: false,
  error: null,

  // Actions
  fetchRubrics: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      set({ rubrics: mockRubrics, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch rubrics', loading: false });
    }
  },

  getRubric: (id: string) => {
    const { rubrics } = get();
    return rubrics.find(rubric => rubric.id === id);
  },

  selectRubric: (rubric: Rubric | null) => {
    set({ selectedRubric: rubric });
  },

  getCategory: (rubricId: string, categoryId: string) => {
    const { rubrics } = get();
    const rubric = rubrics.find(r => r.id === rubricId);
    return rubric?.categories.find(cat => cat.id === categoryId);
  },

  getSubcategory: (rubricId: string, categoryId: string, subcategoryId: string) => {
    const { rubrics } = get();
    const rubric = rubrics.find(r => r.id === rubricId);
    const category = rubric?.categories.find(cat => cat.id === categoryId);
    return category?.subcategories.find(sub => sub.id === subcategoryId);
  }
}));