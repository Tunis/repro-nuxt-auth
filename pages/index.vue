<script setup lang="ts">
let loading = ref(false)
let done = ref(false)
let apiCall = ref(null)

const makeRequest = async () => {
  apiCall = await $fetch('/api/user/settings/')
}
</script>

<template>
  <h1>{{ $t('home')}}</h1>

  <div v-if="apiCall">loading ...</div>
  <div v-else>
    <button @click="makeRequest">request</button>
  </div>
  <div v-if="apiCall">
    <div>
      {{ apiCall }}
    </div>
  </div>
</template>