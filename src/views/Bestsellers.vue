<script setup lang="ts">

import { onBeforeMount, ref } from 'vue';
import type { Ref } from 'vue';
import { getProducts } from '../api/products.ts';

let products: Ref<any> = ref([])
let loading: Ref<boolean> = ref(false)


onBeforeMount(() => {
    loading.value = true

    getProducts().then((data: any) => {
        products.value = data.products
        loading.value = false
    })
})
</script>


<template>
    <LoadingFullPage
        :fullscreen-loading="loading"
    ></LoadingFullPage>
    <!-- Loading indicator -->

    <div
        class="mb-12"
    >
        <h1 class="text-3xl pr-5 pb-5 pt-5 text-left">
            Best selling products
        </h1>

        <p
            class="text-xl text-left w-3/4 max-sm:w-full"
        >
            Welcome to "The Random Store," your go-to online destination for a serendipitous selection of retail wonders curated by public users worldwide. 
        </p>
    </div>
    <!-- Titles -->
    <main>
        <ProductsList
            :products="products"
        ></ProductsList>  
    </main>
</template>

