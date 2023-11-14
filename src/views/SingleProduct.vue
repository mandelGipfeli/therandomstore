<script setup lang="ts">

import { useRoute } from 'vue-router';
import { getProduct } from '../api/products';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useShoppingBag } from '../composables/shoppingBag.ts';
import type { Ref } from 'vue';
import { ProductItem } from '../interfaces.ts';

const route = useRoute()

let queryId: Ref<any> = ref(0)
let selectedImage: Ref<string> =  ref('')
let product: Ref<ProductItem> = ref({
    brand: '',
    category: '',
    description: '',
    discountPercentage: 0,
    id: 0,
    images: [''],
    price: 0,
    rating: 0,
    stock: 0,
    thumbnail: '',
    title: '',
    count: 0
})
let loading: Ref<boolean> = ref(false)

const { addToBag } = useShoppingBag()

onBeforeMount(() => {
    queryId.value = route.params.id
    loading.value = true

    if(queryId.value){
        getProduct(queryId.value).then((data: any) => {
            product.value = data
            loading.value = false
        })
    }
})

onMounted(() => {
    let setImage = setInterval(() => {
        if(typeof product.value.images !== 'undefined'){
            selectedImage.value = product.value.images[0]
            clearInterval(setImage)
        }
    }, 300)
})

</script>

<template>
    <LoadingFullPage
        :fullscreen-loading="loading"
    ></LoadingFullPage>
    <div
        class="w-full flex justify-start"
    >
        <a
            @click="$router.go(-1)"
            class="cursor-pointer"
        >
            Back    
        </a>
    </div>
    <!-- Nav -->
    
    <div
        class="flex max-sm:flex-col max-sm:mt-4"
    >
        <div class="flex justify-center main-image-container w-6/12 max-md:w-full m-2 ml-0 p-2 pl-0 max-sm:p-0 max-sm:m-0 max-sm:h-[250px]">
            <el-image class="rounded-md	border border-gray-200" style="width: auto;" :src="selectedImage" fit="cover" />  
        </div>
        <!-- Main image -->

        <div class="main-content-container flex flex-col m-2 p-2 w-6/12 max-md:w-full">
                <div>
                    <h2
                    class="text-left mb-2 text-xl text-black"
                >
                    {{ product.title }}
                </h2>
                <!-- Title -->

                <div
                    class="text-left mb-8 text-2xl font-bold text-black"
                >
                    ${{ product.price }}
                </div>
                <!-- Price -->

                <div
                    class="flex mb-8"
                >
                    <div
                        v-for="(image, index) in product.images"
                        :key="index"
                        class="flex mr-2 cursor-pointer hover:scale-110	transition-transform"
                        @click="selectedImage = image"
                    >
                        <el-image class="rounded-md	border border-gray-200 h-24" style="width: 100%;" :src="image" fit="contain" /> 
                    </div>                    
                </div>    
                <!-- Images -->
                
                <div
                    class="text-left max-sm:w-full w-6/12 pt-2 pb-2"
                >
                    {{ product.description }}
                </div>
                <!-- Description -->

                <SellerIndicator
                    :index="product.id"
                    :address="true"
                ></SellerIndicator>
                <!-- Indicator -->
            </div>
            
            <div
                class="flex items-end flex-1 max-sm:w-full"
            >
                    <PrimaryButton
                        @click="addToBag(product)"
                        type="warning"
                        class="max-sm:w-full large-button"
                    >
                        Add to bag
                    </PrimaryButton>
                </div>
            </div>
            <!-- Controls -->
    </div>
</template>

<style lang="scss" scoped>

.large-button {
    font-size: 18px;
    height: 50px;
}

.main-image-container {
    .el-image{
        width: 300px;
        max-height: 500px !important;
    }
}
.main-content-container {
    height: 500px;
}
</style>
../composables/shoppingBag.ts