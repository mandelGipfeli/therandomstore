<script setup lang="ts">

defineProps<{
    fullscreenLoading: boolean,
}>()

</script>

<template>
    <el-button
        v-if="fullscreenLoading"
        v-loading.fullscreen.lock="fullscreenLoading"
        type="primary"
        class="hide invisible"
    >
    </el-button>
</template>
