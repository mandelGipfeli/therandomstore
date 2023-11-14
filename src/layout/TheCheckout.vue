<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useCheckoutStore } from '../stores/checkoutStore.ts';
import { Close, Minus, Plus } from '@element-plus/icons-vue'
import PrimaryButton from '../components/buttons/PrimaryButton.vue';
import { useShoppingBag } from '../composables/shoppingBag.ts';


const { addToBag, subtractFromBag, removeFromBag } = useShoppingBag()
const checkoutStore = useCheckoutStore()

onBeforeMount(() => {
    changeBodyPosition('fixed')
})

function close(){
    changeBodyPosition('static')
    checkoutStore.viewCheckout = false
}

function changeBodyPosition(position: string){
    document.getElementsByTagName("body")[0].style.position = position
}

</script>

<template>
    <div
        class="overlay fixed h-vh top-0 bottom-0 left-0 right-0"
    >
        <div
            class="vacant"
            @click="close"
        >

        </div>
        <div
            class="sidebar flex flex-col p-4"
        >
            <div
                class="flex justify-between mb-4"
            >
                <el-icon 
                    @click="close"
                    size="24"
                    class="cursor-pointer hover:scale-110"
                >
                    <Close />
                </el-icon>
                <!-- Close icon -->

                <h2
                    class="text-sm text-gray-700"
                >
                    Your shopping bag
                </h2>
                <!-- Title -->
            </div>

            <div
                class="relative flex-1 overflow-auto"
            >
                <div
                    v-if="checkoutStore.bag.length < 1"
                >
                    You have no products in your bag yet   
                </div>
                <!-- Empty bag message -->

                <div class="absolute top-0 right-0 left-0 bottom-0">
                    <div
                        class="w-full"
                    >
                        <div
                            v-for="(product, index) in checkoutStore.bag"
                            :key="index"
                            class="flex w-full mb-8 pr-2"
                        >   
                            <div
                                class="w-full flex"
                                v-if="product.title"
                            >
                                    <el-image 
                                        class="rounded-md border border-gray-200 h-36" 
                                        style="width: auto;" 
                                        :src="product.images[0]"  
                                        fit="contain" 
                                    />  
                                
                                    <div
                                        class="flex flex-col flex-1 justify-between pl-4"
                                    >
                                        <div>
                                            <div
                                                class="text-lg font-bold text-left"
                                            >{{ product.title }}</div>
                                            <div
                                                class="text-lg text-left"
                                            >${{ product.price }}</div>
                                        </div>

                                        <div
                                            class="flex flex-col "
                                        >
                                            <div class="flex justify-between items-end">
                                                <div
                                                    class="flex items-center"
                                                >
                                                    <div>
                                                        <button
                                                            :disabled="product.count < 2"
                                                            class="flex text-blue-700 hover:text-orange-500 hover:border-yellow-500 hover:disabled:border-gray-100 disabled:text-gray-400 disabled:bg-gray-100"
                                                            @click="subtractFromBag(product)"
                                                        >
                                                            <el-icon 
                                                                class="text-black"
                                                                size="18">
                                                                <Minus />
                                                            </el-icon>
                                                        </button>
                                                    </div>
                                                    <div class="pl-4 pr-4">{{ product.count }}</div>
                                                    <div>
                                                        <button
                                                            class="flex text-blue-700 hover:text-orange-500 hover:border-yellow-500"
                                                            @click="addToBag(product)"
                                                        >
                                                            <el-icon size="18">
                                                                <Plus />
                                                            </el-icon>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div
                                                    class="flex items-end underline text-sm cursor-pointer text-gray-400 hover:text-black"
                                                    @click="removeFromBag(product)"
                                                >
                                                    Remove
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Products in bag -->
                </div>
                <div
                    class="flex flex-col pt-2"
                >
                    <div
                        class="flex justify-between mb-2"
                        :class="{'text-gray-200': checkoutStore.bag.length < 1}"
                    >
                        <div
                            class="font-bold text-xl"
                        >
                            Total
                        </div>

                        <div
                            class="font-bold text-xl"
                        >
                            ${{ checkoutStore.getBagTotal }}
                        </div>
                    </div>

                    <PrimaryButton
                        class="w-full large-button"
                        type="warning"
                        :disabled="checkoutStore.bag.length < 1"
                    >
                        Checkout
                    </PrimaryButton>
                </div>
                <!-- Controls -->
            </div>

           
    </div>
</template>

<style lang="scss" scoped>
    .large-button {
        font-size: 18px;
        height: 50px;
    }
    .el-image {
        width: 150px !important;
    }
    .overlay {
        display: flex;
        z-index: 1;

        .vacant {
            flex-grow: 1;
            background-color: black;
            opacity: 0.4;
        }
        .sidebar {
            width: 500px;
            background-color: white;
        }
    }
    
</style>
../composables/shoppingBag.ts