<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';

    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.API_BASE_URL;

    const route = useRoute();
    const router = useRouter();
    const purchaseId = route.params.id;

    // Reactive purchase state
    const purchase = ref(null);

   // Fetch Purchase Details
    const fetchPurchaseDetails = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/purchase?purchase_id=${purchaseId}`);
            purchase.value = response.data.data[0];
            console.log(purchase.value);
        } catch (error) {
            console.error('Error fetching Purchase:', error);
        }
    };

    // Fetch purchase details on page load
    onMounted(() => {
        fetchPurchaseDetails();
    });
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-md  mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Purchases Details</h2>
      <NuxtLink to="/purchases" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Purchases List
      </NuxtLink>
    </div>
<!-- Purchase Details -->
<div v-if="purchase" class="bg-white p-6 ">
      <!-- Supplier Info -->
      <h2 class="text-xl font-semibold mb-2">Supplier Details</h2>
      <div class="mb-4">
        <p><strong>Name:</strong> {{ purchase.supplier.name }}</p>
        <p><strong>Contact:</strong> {{ purchase.supplier.contact_info }}</p>
        <p><strong>Address:</strong> {{ purchase.supplier.address }}</p>
      </div>

      <!-- Purchase Summary -->
      <h2 class="text-xl font-semibold mb-2">Purchase Summary</h2>
      <p><strong>Total Amount:</strong> {{ purchase.total_amount }}</p>
      <p><strong>Purchase Date:</strong> {{ purchase.purchase_date }}</p>

      <!-- Purchased Items Table -->
      <h2 class="text-xl font-semibold mt-4 mb-2">Purchased Items</h2>
      <table class="w-full border-collapse border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-300 px-4 py-2">#</th>
            <th class="border border-gray-300 px-4 py-2">Product</th>
            <th class="border border-gray-300 px-4 py-2">Quantity</th>
            <th class="border border-gray-300 px-4 py-2">Unit Price</th>
            <th class="border border-gray-300 px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in purchase.items" :key="item.purchase_item_id" class="border border-gray-200">
            <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ item.product?.name }}</td>
            <td class="border border-gray-300 px-4 py-2 text-right">{{ item.quantity }}</td>
            <td class="border border-gray-300 px-4 py-2 text-right">{{ item.unit_price }}</td>
            <td class="border border-gray-300 px-4 py-2 text-right">{{ item.total_price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="border border-gray-300 px-4 py-2 text-right" colspan="4">Total Amount</td>
            <td class="border border-gray-300 px-4 py-2 text-right">{{ purchase.total_amount }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>