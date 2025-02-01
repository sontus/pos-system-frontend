<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const purchases = ref([]);
    const currentPage = ref(1);
    const lastPage = ref(1);

    // Fetch purchase
    const fetchPurchase = async (page = 1) => {
        try {
            const response = await axios.get(`http://pos-system-api.test/api/v1/purchase?page=${page}`);
            purchases.value = response.data.data;
            currentPage.value = response.data.current_page;
            lastPage.value = response.data.last_page;
        } catch (error) {
            console.error('Error fetching purchase:', error);
        }
    };

    onMounted(() => {
        fetchPurchase();
    });
</script>

<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold">Purchases List</h2>
            <NuxtLink to="/purchases/create" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Create
                Purchases</NuxtLink>
        </div>

        <table class="min-w-full table-auto text-left">
            <thead class="bg-blue-800 text-white">
                <tr>
                    <th class="py-3 px-4">#</th>
                    <th class="py-3 px-4">Supplier Name</th>
                    <th class="py-3 px-4">Total Amount</th>
                    <th class="py-3 px-4">Date</th>
                    <th class="py-3 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(purchase, index) in purchases" :key="purchase.purchase_id" class="border-t">
                    <td class="py-3 px-4">{{ index + 1 }}</td>
                    <td class="py-3 px-4">{{ purchase.supplier.name }}</td>
                    <td class="py-3 px-4">{{ purchase.total_amount }}</td>
                    <td class="py-3 px-4">{{ purchase.purchase_date }}</td>
                    <td class="py-3 px-4">
                        <NuxtLink :to="`/purchases/detail/${purchase.purchase_id}`"
                            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Details</NuxtLink>
                       
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mt-6 flex justify-between items-center">
            <button :disabled="currentPage === 1" @click="fetchPurchase(currentPage - 1)"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
                Prev
            </button>
            <span class="text-gray-700">Page {{ currentPage }} of {{ lastPage }}</span>
            <button :disabled="currentPage === lastPage" @click="fetchPurchase(currentPage + 1)"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
                Next
            </button>
        </div>
    </div>
</template>
