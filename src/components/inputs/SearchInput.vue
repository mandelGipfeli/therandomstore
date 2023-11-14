<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits<{
  search: [input: string]
}>()

let input: Ref<string> = ref('')

function search(){
    emit('search', input.value)
}


</script>


<template>
    <el-input 
        v-model="input"
        placeholder="To search, type a word and press enter"
        @keypress.enter="search"
        type="text"
        size="large"
    >
        <template #prefix>
            <el-icon size="16">
                <Search />
            </el-icon>
        </template>    
    </el-input>
</template>

