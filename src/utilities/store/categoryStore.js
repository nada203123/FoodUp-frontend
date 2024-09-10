import { create } from 'zustand';
import axios from 'axios';

const useCategoryStore = create((set) => ({
    categories: [],

    selectedCategory: null,
    fetchCategories: async () => {
        try {
            const response = await axios.get('http://localhost:5198/api/categories');
            set({ categories: response.data.categories  });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    },

    setSelectedCategory: (selectedCategory) => set({selectedCategory}),

    setCategories: (categories) => set({ categories }),

    addCategory: (formData) => set((state) => ({ categories: [...state.categories, formData] })),

    updateCategory: (categoryId, updatedCategory) =>
        set((state) => ({
            categories: state.categories.map((category) =>
                category.id === categoryId ? { ...category, ...updatedCategory } : category
            ),
        })),

    deleteCategory: (categoryId) =>
        set((state) => ({ categories: state.categories.filter((category) => category.id !== categoryId) })),

    
}));

useCategoryStore.getState().fetchCategories();

setInterval(() => {
    useCategoryStore.getState().fetchCategories();
}, 5 * 60 * 1000); 

export default useCategoryStore;
