<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const productId = route.params.id;

// Reactive product state
const product = ref({
    name: '',
    sku: '',
    price: 0,
    initial_stock_quantity: 0,
    category_id: ''
});

// Categories List
const categories = ref([]);
const errors = ref({}); // Store validation errors

// Fetch Product Details
const fetchProduct = async () => {
    try {
        const response = await axios.get(`http://pos-system-api.test/api/v1/products?product_id=${productId}`);
        product.value = response.data.data[0];
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

// Fetch Categories
const fetchCategories = async () => {
    try {
        const response = await axios.get('http://pos-system-api.test/api/v1/categories');
        categories.value = response.data.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Update Product
const updateProduct = async () => {
    errors.value = {}; // Reset errors before request
    try {
        await axios.put(`http://pos-system-api.test/api/v1/products/${productId}`, product.value);
        alert('Product updated successfully!');
        router.push('/products'); // Redirect to product list
    } catch (error) {
        console.error('Error updating product:', error);
        if (error.response && error.response.data.errors) {
            errors.value = error.response.data.errors; // Capture validation errors
        } else {
            alert('Failed to update product');
        }
    }
};

onMounted(() => {
    fetchProduct();
    fetchCategories();
});
</script>

<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold">Edit Product</h2>
            <NuxtLink to="/products" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Product List
            </NuxtLink>
        </div>

        <form @submit.prevent="updateProduct">
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <!-- Product Name -->
                <div class="sm:col-span-3">
                    <label for="product-name" class="block text-lg font-medium text-gray-700">Product Name</label>
                    <input v-model="product.name" type="text" id="product-name"
                        class="mt-2 block w-full px-4 py-2 border rounded-md" required>
                    <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name[0] }}</p>
                </div>

                <!-- Category -->
                <div class="sm:col-span-3">
                    <label for="category" class="block text-lg font-medium text-gray-700">Category</label>
                    <select v-model="product.category_id" id="category"
                        class="mt-2 block w-full px-4 py-2 border rounded-md" required>
                        <option value="">Select a category</option>
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                            {{ cat.name }}
                        </option>
                    </select>
                    <p v-if="errors.category_id" class="text-red-600 text-sm mt-1">{{ errors.category_id[0] }}</p>
                </div>

                <!-- SKU -->
                <div class="sm:col-span-3">
                    <label for="sku" class="block text-lg font-medium text-gray-700">SKU</label>
                    <input v-model="product.sku" type="text" id="sku"
                        class="mt-2 block w-full px-4 py-2 border rounded-md" required>
                    <p v-if="errors.sku" class="text-red-600 text-sm mt-1">{{ errors.sku[0] }}</p>
                </div>

                <!-- Price -->
                <div class="sm:col-span-3">
                    <label for="price" class="block text-lg font-medium text-gray-700">Price</label>
                    <input v-model="product.price" type="number" id="price"
                        class="mt-2 block w-full px-4 py-2 border rounded-md" required min="0">
                    <p v-if="errors.price" class="text-red-600 text-sm mt-1">{{ errors.price[0] }}</p>
                </div>

                <!-- Initial Stock Quantity -->
                <div class="sm:col-span-3">
                    <label for="initial-stock" class="block text-lg font-medium text-gray-700">Initial Stock</label>
                    <input v-model="product.initial_stock_quantity" type="number" id="initial-stock"
                        class="mt-2 block w-full px-4 py-2 border rounded-md" required min="0">
                    <p v-if="errors.initial_stock_quantity" class="text-red-600 text-sm mt-1">{{ errors.initial_stock_quantity[0] }}</p>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-center mt-8">
                <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                    Update Product
                </button>
            </div>
        </form>
    </div>
</template>
