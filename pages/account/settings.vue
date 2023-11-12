<script lang="ts" setup>
const { data, pending } = await useApi('/api/user/settings')

console.log('data : ', data)
</script>

<template>
  <div v-if="pending">
    loading...
  </div>
  <h1 v-else>Settings</h1>
</template>