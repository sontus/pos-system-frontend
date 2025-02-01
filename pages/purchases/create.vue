<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";

  const router = useRouter();
  const suppliers = ref([]);
  const products = ref([]);
  const selectedSupplier = ref(null);
  const purchase_date = ref("");
  const purchaseItems = ref([{
    product_id: "",
    purchase_date: "",
    quantity: 1,
    price: 0,
    total_price: 0
  }]);

  const isSubmitting = ref(false);
  const errorMessage = ref(null);

  // Fetch suppliers and products on page load
  const fetchData = async () => {
    try {
      // Fetch suppliers
      const supplierResponse = await axios.get(`http://pos-system-api.test/api/v1/supplier`);
      suppliers.value = supplierResponse.data.data;

      // Fetch products
      const productResponse = await axios.get(`http://pos-system-api.test/api/v1/products`);
      products.value = productResponse.data.data;
    } catch (error) {
      errorMessage.value = "Failed to load suppliers or products.";
    }
  };

  onMounted(fetchData);

  // Update product details when a product is selected
  const updateProductDetails = (item) => {
    const selectedProduct = products.value.find(p => p.product_id === item.product_id);
    if (selectedProduct) {
      item.price = parseFloat(selectedProduct.price);
      item.total_price = item.quantity * item.price;
    }
  };

  // Calculate total price for each item
  const updateTotalPrice = (item) => {
    item.total_price = item.quantity * item.price;
  };

  // Compute overall total amount
  const totalAmount = computed(() => {
    return purchaseItems.value.reduce((sum, item) => sum + item.total_price, 0);
  });

  // Add new product row
  const addProduct = () => {
    purchaseItems.value.push({ purchase_date: "", product_id: "", quantity: 1, price: 0, total_price: 0 });
  };

  // Remove product row
  const removeProduct = (index) => {
    purchaseItems.value.splice(index, 1);
  };

  // Submit purchase form
  const submitPurchase = async () => {
    if (!selectedSupplier.value) {
      toast.error("Please select a supplier.");
      return;
    }

    if (purchaseItems.value.some(item => !item.product_id)) {
      toast.error("Please select a product for all rows.");
      return;
    }

    isSubmitting.value = true;

    try {
      const payload = {
        purchase_date: purchase_date.value,
        supplier_id: selectedSupplier.value,
        total_amount: totalAmount.value,
        items: purchaseItems.value,
      };

      await axios.post("http://pos-system-api.test/api/v1/purchase", payload);
      selectedSupplier.value = null;
      purchaseItems.value = [{ product_id: "", quantity: 1, price: 0, total_price: 0 }];
      router.push('/purchases');
    } catch (error) {
    } finally {
      isSubmitting.value = false;
    }
  };
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md  mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Create Purchases</h2>
      <NuxtLink to="/purchases" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Purchases List
      </NuxtLink>
    </div>
    <!-- Error Message -->
    <div v-if="errorMessage" class="text-red-600 mb-4">{{ errorMessage }}</div>
    <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <!-- Supplier Selection -->
      <div class="sm:col-span-3">
        <label class="block text-lg font-medium">Select Supplier</label>
        <select v-model="selectedSupplier" class="w-full px-4 py-2 border rounded-md">
          <option value="" disabled>Select a supplier</option>
          <option v-for="supplier in suppliers" :key="supplier.supplier_id" :value="supplier.supplier_id">
            {{ supplier.name }}
          </option>
        </select>
      </div>
      <!-- Purchase Date -->
      <div class="sm:col-span-3">
        <label class="block text-lg font-medium">Select Purchase Date</label>
        <input v-model="purchase_date" type="date" class="w-full border px-2 py-1" placeholder="Enter purchase date" />
      </div>
    </div>
    <!-- Purchase Items Table -->
    <h2 class="text-lg font-semibold mt-4 mb-2">Purchase Items</h2>
    <table class="w-full border-collapse border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2">Product</th>
          <th class="border border-gray-300 px-4 py-2">Quantity</th>
          <th class="border border-gray-300 px-4 py-2">Unit Price</th>
          <th class="border border-gray-300 px-4 py-2">Total Price</th>
          <th class="border border-gray-300 px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in purchaseItems" :key="index">
          <!-- Product Selection -->
          <td class="border px-4 py-2">
            <select v-model="item.product_id" class="w-full border px-2 py-1" @change="updateProductDetails(item)">
              <option value="" disabled>Select a product</option>
              <option v-for="product in products" :key="product.product_id" :value="product.product_id">
                {{ product.name }}
              </option>
            </select>
          </td>
          <!-- Quantity -->
          <td class="border px-4 py-2">
            <input v-model.number="item.quantity" type="number" class="w-full border px-2 py-1" min="1"
              @input="updateTotalPrice(item)" />
          </td>
          <!-- Unit Price (Auto-filled) -->
          <td class="border px-4 py-2">
            <input v-model="item.price" type="number" class="w-full border px-2 py-1" readonly />
          </td>
          <!-- Total Price -->
          <td class="border px-4 py-2">{{ item.total_price.toFixed(2) }}</td>
          <!-- Remove Button -->
          <td class="border px-4 py-2 text-center">
            <button @click="removeProduct(index)" class="text-red-600 hover:underline">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4">
      <button @click="addProduct" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
        Add Product
      </button>
    </div>

    <!-- Total Amount -->
    <div class="mt-6">
      <p class="text-lg font-semibold">Total Amount: {{ totalAmount.toFixed(2) }}</p>
    </div>

    <!-- Submit Button -->
    <div class="mt-6">
      <button @click="submitPurchase" :disabled="isSubmitting"
        class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
        {{ isSubmitting ? "Submitting..." : "Create Purchase" }}
      </button>
    </div>
  </div>

</template>
