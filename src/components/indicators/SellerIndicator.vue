<script setup lang="ts">
import { useUsersStore } from '../../stores/usersStore.ts';

const userStore = useUsersStore()

defineProps<{
    index: number,
    address?: boolean
}>()

</script>

<template>
    <div
        v-if="userStore.users[index]"
        class="flex items-end font-medium italic text-md text-gray-400"
    >
        <div>
            Posted by 
            {{ userStore.users[index].firstName }}
            {{ userStore.users[index].lastName }}
            <!-- user's name -->

            <span
                v-if="address"
            >
                from {{ userStore.users[index].address.city }}
                ,{{ userStore.users[index].address.state }}
            </span>
            <!-- user's locatoin -->
        </div>
    </div>
</template>

