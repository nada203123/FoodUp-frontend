import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
    products: null,
    selectedProduct: null,

    setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
    setProducts: (products) => set({ products }),

    addProduct: (newProduct) => set((state) => ({ products: [...state.products, newProduct] })),
    updateProduct: (productId, updatedProduct) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === productId ? { ...product, ...updatedProduct } : product
            ),
        })),
    deleteProduct: (productId) =>
        set((state) => ({ products: state.products.filter((product) => product.id !== productId) })),

    fetchProducts: async () => {
        try {
            const response = await axios.get('http://localhost:5198/api/products');
            set({ products: response.data.products });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },
}));

useProductStore.getState().fetchProducts();

setInterval(() => {
    useProductStore.getState().fetchProducts();
}, 5 * 60 * 1000);

export default useProductStore;
