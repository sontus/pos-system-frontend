<script setup>

</script>

<template>
    <div>
        <!-- Product Table -->
    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold mb-6">Product List</h2>
            <div>
                <NuxtLink to="/products/create" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add Product</NuxtLink>
            </div>
        </div>
       
        
        <!-- Table -->
        <table class="min-w-full table-auto text-left">
            <thead class="bg-blue-800 text-white">
                <tr>
                    <th class="py-3 px-4">#</th>
                    <th class="py-3 px-4">Product Name</th>
                    <th class="py-3 px-4">SKU</th>
                    <th class="py-3 px-4">Category</th>
                    <th class="py-3 px-4">Price</th>
                    <th class="py-3 px-4">Stock</th>
                    <th class="py-3 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- Example Product Row 1 -->
                <tr class="border-t">
                    <td class="py-3 px-4">1</td>
                    <td class="py-3 px-4">Product 1</td>
                    <td class="py-3 px-4">456</td>
                    <td class="py-3 px-4">Category A</td>
                    <td class="py-3 px-4">$29.99</td>
                    <td class="py-3 px-4">50</td>
                    <td class="py-3 px-4">
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Edit</button>
                        <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2">Delete</button>
                    </td>
                </tr>
               
            </tbody>
        </table>
        
        <!-- Pagination Controls -->
        <div class="mt-6 flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <span class="text-gray-700">Page 1 of 5</span>
            </div>
            <div class="flex space-x-2">
                <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Prev</button>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Next</button>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>

</style>