<script setup lang="ts">
import { ShoppingBag } from '@element-plus/icons-vue'
import { useCheckoutStore } from '../../stores/checkoutStore.ts'

const store = useCheckoutStore()

function openCheckout() {
    store.viewCheckout = true
}

</script>

<template>
    <div
        @click="openCheckout"
    >
        <el-badge :hidden="store.bag.length < 1" :value="store.getBagCount" class="item">
            <el-button
            >
                <el-icon size="24">
                    <ShoppingBag />
                </el-icon>
            </el-button>
        </el-badge>
    </div>
</template>

