<script setup lang="ts">
const {signOut, data} = useAuth()
const {t} = useI18n()


const actions = [
  {
    label: t('account.settings'),
    href: '/account/settings',
  },
  {
    label: t('account.logout'),
    action: signOut,
  },
]

const handleAction = (event: any) => {
  const item = event.id
  if(item.href) {
    navigateTo(item.href)
  } else if(item.action) {
    item.action()
  }
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" append-icon="mdi-account-circle">{{ data.username }}</v-btn>
    </template>

    <v-list
        :items="actions"
        item-title="label"
        return-object
        @click:select="handleAction"
    >
    </v-list>
  </v-menu>
</template>