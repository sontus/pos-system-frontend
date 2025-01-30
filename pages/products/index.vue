<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);

// Fetch products
const fetchProducts = async (page = 1) => {
  try {
    const response = await axios.get(`http://pos-system-api.test/api/v1/products?page=${page}`);
    products.value = response.data.data;
    currentPage.value = response.data.current_page;
    lastPage.value = response.data.last_page;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Delete product
const deleteProduct = async (id) => {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    await axios.delete(`http://pos-system-api.test/api/v1/products/${id}`);
    products.value = products.value.filter(product => product.product_id !== id);
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Failed to delete product');
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Product List</h2>
      <NuxtLink to="/products/create" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add Product</NuxtLink>
    </div>
    
    <table class="min-w-full table-auto text-left">
      <thead class="bg-blue-800 text-white">
        <tr>
          <th class="py-3 px-4">#</th>
          <th class="py-3 px-4">Product Name</th>
          <th class="py-3 px-4">SKU</th>
          <th class="py-3 px-4">Price</th>
          <th class="py-3 px-4">Stock</th>
          <th class="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.product_id" class="border-t">
          <td class="py-3 px-4">{{ index + 1 }}</td>
          <td class="py-3 px-4">{{ product.name }}</td>
          <td class="py-3 px-4">{{ product.sku }}</td>
          <td class="py-3 px-4">{{ product.price }}</td>
          <td class="py-3 px-4">{{ product.current_stock_quantity }}</td>
          <td class="py-3 px-4">
            <NuxtLink :to="`/products/edit/${product.product_id}`" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Edit</NuxtLink>
            <button @click="deleteProduct(product.product_id)" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="mt-6 flex justify-between items-center">
      <button 
        :disabled="currentPage === 1" 
        @click="fetchProducts(currentPage - 1)" 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
        Prev
      </button>
      <span class="text-gray-700">Page {{ currentPage }} of {{ lastPage }}</span>
      <button 
        :disabled="currentPage === lastPage" 
        @click="fetchProducts(currentPage + 1)" 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
        Next
      </button>
    </div>
  </div>
</template>
