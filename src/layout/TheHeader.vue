<script setup lang="ts">
import SearchInput from '../components/inputs/SearchInput.vue';
import ShoppingBagIndicator from '../components/indicators/ShoppingBagIndicator.vue';
import { Brush } from '@element-plus/icons-vue'
import { useRouter } from "vue-router"

let router = useRouter()

function search(text: string){

    router.push({
        name: 'products',
        query: {
            text
        }
    })
}
</script>

<template>
    <header
      class="grid grid-cols-3 max-sm:grid-cols-2"
    >
        <router-link
            to="/"
            class="flex items-center text-xl max-sm:text-md text-left"
        >
            <div
                class="pr-2 max-sm:hidden"
            >
                The Random Store
            </div>

            <el-icon size="24">
                <Brush />
            </el-icon>
        </router-link>
        <!-- Brand -->

        <div
            class="max-sm:order-1 max-sm:mt-2 max-sm:col-span-2"
        >
            <SearchInput 
                class="border-gray-500"
                @search="search"    
            />
        </div>
        <!-- Search bar -->

        <div
            class="text-right"
        >
            <ShoppingBagIndicator />
        </div>
        <!-- Bag / Checkout indicator -->
    </header>
</template>
