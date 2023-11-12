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
  <v-card
      border rounded flat
      :title="$t('form.login.title')"
  >
    <template v-slot:subtitle>
      <i18n-t keypath="form.login.subtitle" tag="p">
        <template v-slot:link>
          <a href="/auth/register">{{ $t('form.login.register') }}</a>
        </template>
      </i18n-t>
    </template>
    <forms-auth-login/>
  </v-card>
</template>