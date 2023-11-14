<script setup lang="ts">

</script>

<template>
    <nav
        class="flex justify-center mt-2 mb-2"
    >        
        <router-link 
            to="/"
            v-slot="{ isActive }"
        >
            <div
                :class="{'underline font-bold text-blue-500': isActive}"
                class="p-2 text-black hover:underline"
            >
                Bestsellers
                
            </div>
        </router-link>
        <!-- Option 1 -->

        <router-link 
            to="/products"
            v-slot="{ isActive }"
        >
            <div
                :class="{'underline font-bold text-blue-500': isActive}"
                class="p-2 text-black hover:underline"
            >
                All
            </div>
        </router-link>
        <!-- Option 2 -->
    </nav>
</template>

<style scoped>

</style>
