<script setup lang="ts">
import { useUsersStore } from '../../stores/usersStore.ts';
import { ref, onBeforeMount } from 'vue'
import type { Ref } from 'vue'
import { UserItem } from '../../interfaces.ts'

const userStore = useUsersStore()
let user: Ref<UserItem> = ref({
    firstName: '',
    lastName: '',
    address: {
        address: '',
        city: '',
        postalCode: '',
        state: ''
    },
    username: '',
    id: -1,
    image: ''
})

const props = defineProps<{
    index: number,
    address?: boolean
}>()

onBeforeMount(() => {
    user.value = userStore.users.filter((user) => user.id === props.index + 1)[0]
})

</script>

<template>
    <div
        v-if="userStore.users[index]"
        class="flex items-end font-medium italic text-md text-gray-400"
    >
        <div>
            Posted by 

            {{ user.firstName }}
            {{ user.lastName }}

            <span
                v-if="address"
            >
                from {{ user.address.city }}
                ,{{ user.address.state }}
            </span>
            <!-- user's locatoin -->
        </div>
    </div>
</template>

