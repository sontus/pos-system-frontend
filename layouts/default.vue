<script setup>
    import Sidebar from '~/components/Sidebar.vue'
</script>
<template>
    <div class="bg-gray-100">
        <div class="flex">
        <Sidebar/>

        <!-- Main Content -->
        <div class="flex-1 p-8">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-semibold">Admin Dashboard</h1>
                <div>
                    <button class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">Logout</button>
                </div>
            </div>

            <!-- Page Content -->
            <slot/>
        </div>
    </div>
    </div>

</template>
<style scoped>

</style>