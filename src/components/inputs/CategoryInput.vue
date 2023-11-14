<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { getProductCategories } from '../../api/products.ts'
import type { Ref } from 'vue';

interface Option {
    value: number;
    label: string;
}

onBeforeMount(() => {
    getProductCategories().then((categories: any) => {
        options.value = categories.map((cat: string) => {
            return {
                value: cat,
                label: cat.split('-').map(c => {
                    return c.charAt(0).toUpperCase() + c.slice(1);
                }).join(' ')
            }
        })

        options.value.unshift({
            value: 0,
            label: 'Category'
        })
    })
})

const options: Ref<Option[]> = ref([])

let selected: Ref<string> = ref('Category')

const emit = defineEmits<{
  search: [selected: string, type: string]
}>()

</script>


<template>
    <el-select v-model="selected" @change="emit('search', selected, 'category')" class="m-2" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

