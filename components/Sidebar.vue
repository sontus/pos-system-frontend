<script setup>

</script>
<template>
    <div>
        <div class="w-64 bg-blue-900 text-white h-screen p-5">
            <h2 class="text-xl font-semibold mb-6">Dashboard</h2>
            <ul>
                <li><NuxtLink to="/" class="text-white hover:bg-blue-700 px-4 py-2 rounded block">Dashboard</NuxtLink></li>
                <li><NuxtLink to="/products" class="text-white hover:bg-blue-700 px-4 py-2 rounded block">Products</NuxtLink></li>
                <li><NuxtLink to="/suppliers" class="text-white hover:bg-blue-700 px-4 py-2 rounded block">Suppliers</NuxtLink></li>
                <li><NuxtLink to="/purchases" class="text-white hover:bg-blue-700 px-4 py-2 rounded block">Purchases</NuxtLink></li>
            </ul>
        </div>
    </div>
</template>
<style scoped>

</style>