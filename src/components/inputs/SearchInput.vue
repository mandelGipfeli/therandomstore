<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from "vue-router"

const emit = defineEmits<{
  search: [input: string]
}>()

let router = useRouter()
let route = useRoute()
let input: Ref<any> = ref('')

function search(){
    emit('search', input.value)
}

/** Capture urls with text params when router is active */
onMounted(async() => {
    await router.isReady()
    
    if(route.query.text){
        input.value = route.query.text
    }
})

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

