<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const router = useRouter();
    const supplier = ref({
        name: '',
        contact_info: '',
        address: '',
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

    const createSupplier = async () => {
        try {
            loading.value = true;
            await axios.post('http://pos-system-api.test/api/v1/supplier', supplier.value);
            router.push('/suppliers');
        } catch (error) {
            console.error('Error creating Supplier:', error);
            errorMessage.value = 'Failed to create Supplier';
        } finally {
            loading.value = false;
        }
    };
</script>

<template>
    <div class="bg-white p-6 rounded-lg shadow-md  mx-auto">
        <h2 class="text-2xl font-semibold mb-6">Create Supplier</h2>
        <div v-if="errorMessage" class="text-red-600 mb-4">{{ errorMessage }}</div>
        <form @submit.prevent="createSupplier">
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <!-- Supplier Name -->
                <div class="sm:col-span-3">
                    <label class="block text-lg font-medium text-gray-700">Supplier Name</label>
                    <input v-model="supplier.name" type="text" class="w-full p-2 border rounded" required />
                </div>
                
            
                <!-- Contact info  -->
                <div class="sm:col-span-3">
                    <label class="block text-lg font-medium text-gray-700">Contact info</label>
                    <input v-model="supplier.contact_info" type="text" class="w-full p-2 border rounded" required />
                </div>
                 <!-- Address  -->
                 <div class="sm:col-span-3">
                    <label class="block text-lg font-medium text-gray-700">Address</label>
                    <input v-model="supplier.address" type="text" class="w-full p-2 border rounded" required />
                </div>
               
            </div>
            <div class="flex justify-center mt-8">
                <button type="button" @click="router.push('/Suppliers')"
                    class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
                <button type="submit" :disabled="loading"
                    class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 ml-4">
                    {{ loading ? 'Creating...' : 'Create Supplier' }}
                </button>
            </div>
        </form>
    </div>
</template>
