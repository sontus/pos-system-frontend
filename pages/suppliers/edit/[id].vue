<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';

    const route = useRoute();
    const router = useRouter();
    const supplierId = route.params.id;

    // Reactive supplier state
    const supplier = ref({
        name: '',
        contact_info: '',
        address: '',
    });

    // Fetch Supplier Details
    const fetchSupplier = async () => {
        try {
            const response = await axios.get(`http://pos-system-api.test/api/v1/supplier?supplier_id=${supplierId}`);
            supplier.value = response.data.data[0];

        } catch (error) {
            console.error('Error fetching supplier:', error);
        }
    };


    // Update Supplier
    const updateSupplier = async () => {
        try {
            await axios.put(`http://pos-system-api.test/api/v1/supplier/${supplierId}`, supplier.value);
            alert('Supplier updated successfully!');
            router.push('/suppliers'); 
        } catch (error) {
            console.error('Error updating supplier:', error);
            alert('Failed to update supplier');
        }
    };


    onMounted(() => {
        fetchSupplier();
    });
</script>

<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold">Edit Supplier</h2>
            <NuxtLink to="/suppliers" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Supplier List
            </NuxtLink>
        </div>

        <form @submit.prevent="updateSupplier">
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <!-- Supplier Name -->
                <div class="sm:col-span-3">
                    <label for="supplier-name" class="block text-lg font-medium text-gray-700">Supplier Name</label>
                    <input v-model="supplier.name" type="text" id="supplier-name"
                        class="mt-2 block w-full px-4 py-2 border rounded-md" required>
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

            <!-- Submit -->
            <div class="flex justify-center mt-8">
                <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                    Update Supplier
                </button>
            </div>
        </form>
    </div>
</template>
