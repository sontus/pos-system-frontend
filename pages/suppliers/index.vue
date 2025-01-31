<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const suppliers = ref([]);
    const currentPage = ref(1);
    const lastPage = ref(1);

    // Fetch suppliers
    const fetchSuppliers = async (page = 1) => {
        try {
            const response = await axios.get(`http://pos-system-api.test/api/v1/supplier?page=${page}`);
            suppliers.value = response.data.data;
            currentPage.value = response.data.current_page;
            lastPage.value = response.data.last_page;
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    // Delete supplier
    const deleteSupplier = async (id) => {
        if (!confirm('Are you sure you want to delete this supplier?')) return;

        try {
            await axios.delete(`http://pos-system-api.test/api/v1/supplier/${id}`);
            suppliers.value = suppliers.value.filter(supplier => supplier.supplier_id !== id);
        } catch (error) {
            console.error('Error deleting supplier:', error);
            alert('Failed to delete supplier');
        }
    };

    onMounted(() => {
        fetchSuppliers();
    });
</script>

<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold">Supplier List</h2>
            <NuxtLink to="/suppliers/create" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add
                Supplier</NuxtLink>
        </div>

        <table class="min-w-full table-auto text-left">
            <thead class="bg-blue-800 text-white">
                <tr>
                    <th class="py-3 px-4">#</th>
                    <th class="py-3 px-4">Name</th>
                    <th class="py-3 px-4">Contact Info</th>
                    <th class="py-3 px-4">Address</th>
                    <th class="py-3 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(supplier, index) in suppliers" :key="supplier.supplier_id" class="border-t">
                    <td class="py-3 px-4">{{ index + 1 }}</td>
                    <td class="py-3 px-4">{{ supplier.name }}</td>
                    <td class="py-3 px-4">{{ supplier.contact_info }}</td>
                    <td class="py-3 px-4">{{ supplier.address }}</td>
                    <td class="py-3 px-4">
                        <NuxtLink :to="`/suppliers/edit/${supplier.supplier_id}`"
                            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Edit</NuxtLink>
                        <button @click="deleteSupplier(supplier.supplier_id)"
                            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mt-6 flex justify-between items-center">
            <button :disabled="currentPage === 1" @click="fetchSuppliers(currentPage - 1)"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
                Prev
            </button>
            <span class="text-gray-700">Page {{ currentPage }} of {{ lastPage }}</span>
            <button :disabled="currentPage === lastPage" @click="fetchSuppliers(currentPage + 1)"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
                Next
            </button>
        </div>
    </div>
</template>
