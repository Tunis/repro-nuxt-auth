<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
  layout: 'auth',
})
</script>

<template>
  <v-card border rounded flat :title="$t('form.register.title')" :subtitle="$t('form.register.subtitle')">
    <forms-auth-register/>
  </v-card>
</template>