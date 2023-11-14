<script setup lang="ts">
import PriceInput from '../components/inputs/PriceInput.vue';
import CategoryInput from '../components/inputs/CategoryInput.vue';
import RatingInput from '../components/inputs/RatingInput.vue';

const emit = defineEmits<{
  filter: [selected: any, type: string]
}>()


function search(selected: any, type: string){
    emit('filter', selected, type)
}

</script>


<template>
    <div
        class="grid lg:flex md:grid-cols-3 sm:grid-cols-1 mb-4"
    >
        <PriceInput 
            class="m-0 ml-0 mr-2 w-auto"
            @search="search"
        />
        <CategoryInput 
            class="m-0 mr-2 max-md:ml-0 max-sm:ml-0 w-auto"
            @search="search"
        />
        <RatingInput 
            class="m-0 max-md:ml-0 max-sm:ml-0 w-auto"
            @search="search"
        />
    </div>
</template>

