<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const router = useRouter();
    const product = ref({
        name: '',
        sku: '',
        price: '',
        initial_stock_quantity: '',
        category_id: ''
    });
    const categories = ref([]);
    const loading = ref(false);
    const errorMessage = ref(null);

    onMounted(async () => {
        try {
            const response = await axios.get('http://pos-system-api.test/api/v1/categories');
            categories.value = response.data.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    });

    const createProduct = async () => {
        try {
            loading.value = true;
            await axios.post('http://pos-system-api.test/api/v1/products', product.value);
            router.push('/products');
        } catch (error) {
            console.error('Error creating product:', error);
            errorMessage.value = 'Failed to create product';
        } finally {
            loading.value = false;
        }
    };
</script>

<template>
    <div class="bg-white p-6 rounded-lg shadow-md  mx-auto">
        <h2 class="text-2xl font-semibold mb-6">Create Product</h2>
        <div v-if="errorMessage" class="text-red-600 mb-4">{{ errorMessage }}</div>
        <form @submit.prevent="createProduct">
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <label class="block text-lg font-medium text-gray-700">Product Name</label>
                    <input v-model="product.name" type="text" class="w-full p-2 border rounded" required />
                </div>
                <!-- Product Name -->
                <div class="sm:col-span-3">
                    <label class="block text-lg font-medium text-gray-700">Category</label>
                    <select v-model="product.category_id" class="w-full p-2 border rounded" required>
                        <option value="">Select a category</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name
                            }}</option>
                    </select>
                </div>
                <!-- SKU -->
                <div class="sm:col-span-3">
                    <label class="block text-lg font-medium text-gray-700">SKU</label>
                    <input v-model="product.sku" type="text" class="w-full p-2 border rounded" required />
                </div>
                <!-- Price -->
                <div class="sm:col-span-3">
                    <label class="block text-lg font-medium text-gray-700">Price</label>
                    <input v-model="product.price" type="number" step="0.01" class="w-full p-2 border rounded"
                        required />
                </div>
                <!-- Initial Stock Quantity -->
                <div class="sm:col-span-3">
                    <label class="block text-lg font-medium text-gray-700">Initial Stock Quantity</label>
                    <input v-model="product.initial_stock_quantity" type="number" class="w-full p-2 border rounded"
                        required />
                </div>

            </div>
            <div class="flex justify-center mt-8">
                <button type="button" @click="router.push('/products')"
                    class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
                <button type="submit" :disabled="loading"
                    class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 ml-4">
                    {{ loading ? 'Creating...' : 'Create Product' }}
                </button>
            </div>
        </form>
    </div>
</template>
