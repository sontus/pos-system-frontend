<script setup>

</script>

<template>
    <div>
        <!-- Product Table -->
    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold mb-6">Create Product</h2>
            <div>
                <NuxtLink to="/products" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Product List</NuxtLink>
            </div>
        </div>
       
        <!-- Form -->
     
        <form action="#" method="POST">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                     <!-- Product Name -->
                    <label for="product-name" class="block text-lg font-medium text-gray-700">Product Name</label>
                    <input type="text" id="product-name" name="product-name" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter product name" required>
                    
                </div>
                <div class="sm:col-span-3">
                    <!-- Category -->
                    <label for="category" class="block text-lg font-medium text-gray-700">Category</label>
                    <select id="category" name="category" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                        <option value="">Select a category</option>
                        <option value="category-a">Category A</option>
                        <option value="category-b">Category B</option>
                        <option value="category-c">Category C</option>
                    </select>
                    
                </div>
                <div class="sm:col-span-3">
                    <!-- SKU -->
                    <label for="sku" class="block text-lg font-medium text-gray-700">SKU</label>
                    <input type="text" id="sku" name="sku" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter product SKU" required>
                   
                </div>
                <div class="sm:col-span-3">
                    <!-- Price -->
                    <div class="mb-6">
                        <label for="price" class="block text-lg font-medium text-gray-700">Price</label>
                        <input type="number" id="price" name="price" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter price" required min="0">
                    </div>
                </div>
                <!-- Initial Stock Quantity -->
                <div  class="sm:col-span-3">
                    <label for="initial-stock" class="block text-lg font-medium text-gray-700">Initial Stock Quantity</label>
                    <input type="number" id="initial-stock" name="initial-stock" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter initial stock quantity" required min="0">
                </div>
                <!-- Current Stock Quantity -->
                <div class="sm:col-span-3">
                    <label for="current-stock" class="block text-lg font-medium text-gray-700">Current Stock Quantity</label>
                    <input type="number" id="current-stock" name="current-stock" class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter current stock quantity" required min="0">
                </div>
            </div>
            <!-- Submit Button -->
            <div class="flex justify-center mt-8">
                <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">Create Product</button>
            </div>
        </form>        
    
    </div>
    </div>
</template>

<style scoped>

</style>