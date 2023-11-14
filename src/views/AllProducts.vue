<script setup lang="ts">

import { onBeforeMount, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { getProducts } from '../api/products.ts';
import { ProductObject, ProductItem } from '../interfaces.ts';
import { useRoute } from 'vue-router';
import TheFilters from '../layout/TheFilters.vue';

type ActiveFilter = {
    price: string | number,
    rating: string | number,
    category: string | number,
}

let products: Ref<any> = ref([])
let route = useRoute()
let activeFilters = ref<ActiveFilter>({
    price:0,
    rating:0,
    category:'',
})
let loading: Ref<boolean> = ref(false)


function filterProducts(products: ProductObject){
    const filterText: any = route.query.text
     
    let array = products.products.filter((product: ProductItem) => {        
        if(filterText){
            if(!product.title.toLowerCase().includes(filterText.toLowerCase()) && !product.description.toLowerCase().includes(filterText.toLowerCase())){
                return
            }
        }
        if(activeFilters.value['category']){
            if(product.category !== activeFilters.value['category']){
                return
            }
        }
        if(activeFilters.value['price'] && typeof activeFilters.value['price'] === 'number'){
            if(product.price < activeFilters.value['price']){
                return
            }
        }
        if(activeFilters.value['rating'] && typeof activeFilters.value['rating'] === 'number'){
            if(product.rating < activeFilters.value['rating']){
                return
            }
        }

        return product
    })
    
    return array
}

/**
 * As products cannot be be filtered by the api (bar categories) 
 * the filters run client-side
 * */
function addFilters(selected: any, type: string){

    /**
     * Set or remove filter
     * Filters will only be ran with positive values
     */
    switch (type) {
        case 'category':
        selected ? activeFilters.value['category'] = selected : activeFilters.value['category'] = '' 
        break;

        case 'rating':
        selected ? activeFilters.value['rating'] = selected : activeFilters.value['rating'] = 0 
        break;
        
        case 'price':
        selected ? activeFilters.value['price'] = selected : activeFilters.value['price'] = 0 
        break;
    
        default:
            break;
    }

    setProducts()
}

function setProducts(){
    loading.value = true
    getProducts().then((data: any) => {
        products.value = filterProducts(data)
        loading.value = false
    })
}

onBeforeMount(() => {
    setProducts()
})

/** Refresh products on route change */
watch(
    route,
    () => {
        /** guard against triggering before component is unmounted */
        if(route.name === 'products'){
            setProducts()
        }
    }    
)

</script>


<template>
    <div>
        <LoadingFullPage
            :fullscreen-loading="loading"
        ></LoadingFullPage>
        <!-- Loading indicator -->

        <div
            class="mb-12"
        >
            <h1 class="text-3xl pr-5 pb-5 pt-5 text-left">
                Search all products
            </h1>

            <p
                class="text-xl text-left w-3/4 max-sm:w-full mb-4"
            >
                Welcome to "The Random Store," your go-to online destination for a serendipitous selection of retail wonders curated by public users worldwide. 
            </p>

            <TheFilters 
                @filter="addFilters"
            />
        </div>
        <!-- Controls -->

        <main>
            <ProductsList
                :products="products"
            ></ProductsList>
        </main>
    </div>        
</template>

