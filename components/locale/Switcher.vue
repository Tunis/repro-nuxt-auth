<script setup lang="ts">
const {locale, locales} = useI18n()

const changeLocal = (event: any) => {
  locale.value = event.id.code
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn rounded v-bind="props">{{ locale }}</v-btn>
    </template>

    <v-list
        :items="locales"
        item-title="name"
        return-object
        @click:select="changeLocal"
    >
    </v-list>
  </v-menu>
</template>