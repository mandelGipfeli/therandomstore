<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';


interface Option {
    value: number;
    label: string;
}

const options: Ref<Option[]> = ref([
    {value: 0, label: 'Rating'},
    {value: 4.5, label: '4.5+'},
])

let selected: Ref<number> = ref(0)

const emit = defineEmits<{
  search: [selected: number, type: string]
}>()

</script>


<template>
    <el-select v-model="selected" class="m-2" @change="emit('search', selected, 'rating')" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

