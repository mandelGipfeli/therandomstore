<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

interface Option {
    value: number;
    label: string;
}

const options: Ref<Option[]> = ref([
    {value: 0, label: 'Price'},
    {value: 100, label: '$100+'},
    {value: 500, label: '$500+'},
    {value: 1000, label: '$1000+'}
])

let selected: Ref<number> = ref(0)

const emit = defineEmits<{
  search: [selected: number, type: string]
}>()

</script>

<template>
    <el-select v-model="selected" @change="emit('search', selected, 'price')" class="m-2" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

