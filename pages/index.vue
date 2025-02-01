<script setup>
 import { ref, onMounted } from 'vue';
 import axios from 'axios';

    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.API_BASE_URL;
    const dashboard = ref([]);
    
    const fetchPurchase = async (page = 1) => {
            try {
                const response = await axios.get(`${apiBaseUrl}/dashboard`);
                dashboard.value = response.data;
            } catch (error) {
                console.error('Error fetching purchase:', error);
            }
        };

    onMounted(() => {
        fetchPurchase();
    });
</script>
<template>
   <div>
     <!-- Dashboard Cards -->
     <div class="grid grid-cols-4 gap-6 mb-6">
        <!-- Categories -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-3">Categories</h3>
            <p class="text-4xl font-bold text-red-800">{{ dashboard.categories }}</p>
        </div>
        <!-- Products -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-3">Products</h3>
            <p class="text-4xl font-bold text-blue-800">{{ dashboard.products }}</p>
        </div>
        <!-- Suppliers -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-3">Suppliers</h3>
            <p class="text-4xl font-bold text-green-600">{{ dashboard.suppliers }}</p>
        </div>
        <!-- Purchases -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-3">Purchases</h3>
            <p class="text-4xl font-bold text-yellow-600">{{ dashboard.purchases }}</p>
        </div>
    </div>
   </div>
</template>
<style scoped>

</style>