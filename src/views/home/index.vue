<template>
    {{ token }}
    <button class="bg-red-500" @click="changeToken">change</button>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts" setup>
    import HelloWorld from '@/components/HelloWorld.vue'
    import { mainStore } from '../../store';
    import { storeToRefs } from 'pinia';

    const storeEntity = mainStore()
    const { token } = storeToRefs(storeEntity)

    function changeToken(): void{
        storeEntity.updateToken('changeed')
    }
</script>