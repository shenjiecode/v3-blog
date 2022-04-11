<template>
    {{ token }}
    <button class="btn" @click="changeToken">change</button>
    <button class="btn" @click="apiRequest">api</button>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts" setup>
    import HelloWorld from '@/components/HelloWorld.vue'
    import { mainStore } from '../../store';
    import { storeToRefs } from 'pinia';
    import { apiTest } from '../../api/user'

    const storeEntity = mainStore()
    const { token } = storeToRefs(storeEntity)

    function changeToken(): void{
        storeEntity.updateToken('changeed')
    }

    async function apiRequest(): Promise<any>{
        await apiTest()
    } 
</script>