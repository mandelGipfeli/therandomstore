<script setup lang="ts">
import 'element-plus/es/components/button/style/css';
import TheHeader from '../layout/TheHeader.vue';
import TheNav from '../layout/TheNav.vue';
import TheCheckout from '../layout/TheCheckout.vue';
import { onBeforeMount } from 'vue';
import { setCheckoutStore } from '../stores/persistStoreState.ts';
import { useUsersStore } from '../stores/usersStore.ts';
import { useCheckoutStore } from '../stores/checkoutStore.ts';
import { getUsers } from '../api/users.ts'

const userStore = useUsersStore()
const checkoutStore = useCheckoutStore()

function setUsersList(){
    getUsers().then((data: any) => {
      userStore.users = data.users
    })
}

/** Boot marketplace */
onBeforeMount(() => {
  setCheckoutStore()
  setUsersList()
})

</script>

<template>
  <TheHeader></TheHeader>
  
  <TheNav></TheNav>

  <Transition name="slide-fade">
    <TheCheckout
      v-if="checkoutStore.viewCheckout"
    ></TheCheckout>
  </Transition>
  
  <router-view></router-view>
</template>

<style>
  .slide-fade-enter-active {
    transition: all 0.1s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
