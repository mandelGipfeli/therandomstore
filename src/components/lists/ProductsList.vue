<script setup lang="ts">
import PrimaryButton from '../buttons/PrimaryButton.vue';
import { ProductItem } from '../../interfaces.ts';
import { useShoppingBag } from '../../composables/shoppingBag.ts';
import { StarFilled } from '@element-plus/icons-vue';

const { addToBag } = useShoppingBag()

defineProps<{
    products: ProductItem[]
}>()

</script>

<template>
    <article
        class="products mt-4 grid grid-cols-2 gap-8 lg:grid-cols-4 md:grid-cols-3"
    >
        <router-link
            v-for="(product, index) in products"
            :key="index"
            :to="{ name: 'product', params: {id: product.id}}"
            class="group/product cursor-pointer"
        >
            <div>
                <div class="relative">
                    <el-image class="rounded-md	border border-gray-200 h-96 max-sm:h-56" style="width: auto;" :src="product.images[0]" fit="contain" />                    

                    <div class="absolute invisible bottom-5 right-5 group-hover/product:visible">
                        <PrimaryButton
                            size="large"
                            class="font-xl"
                            type="warning"
                            @click.prevent="addToBag(product)"
                        >
                            Add to bag
                        </PrimaryButton>
                    </div>
                    <!-- Hidden add to bag button -->
                </div>

                <div
                    class="flex flex-col"
                >
                    <div
                        class="flex justify-between"
                    >
                        <h2
                            class="text-left text-lg text-black mt-2"
                        >
                            {{ product.title }}
                        </h2>
                        <!-- Title -->

                        <div
                            class="flex mt-2 text-orange-600"
                        >
                            <el-icon size="24">
                                <StarFilled />
                            </el-icon>                                
                            ({{ product.rating }})
                        </div>
                        <!-- Rating -->
                    </div>
                   
                    <div>
                        <div
                            class="flex justify-between"
                        >
                            <div
                                class="text-left text-black mt-2 text-xl font-bold"
                            >
                                ${{  product.price }}
                            </div>
                            <!-- Price -->

                            <SellerIndicator
                                :index="product.id"
                            ></SellerIndicator>
                        </div>
                    </div>
                </div>
                <!-- Product details -->
            </div>
        </router-link>
    </article>
</template>
