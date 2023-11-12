<template>
  <v-app>
    <v-app-bar
        color="primary"
        density="default"
    >
      <template v-slot:title>
        <v-toolbar-title>My App</v-toolbar-title>
      </template>
      <template v-slot:append>
        <locale-switcher/>
        <menus-user/>
      </template>
    </v-app-bar>
    <v-navigation-drawer
        expand-on-hover rail permanent>
      <v-list color="transparent">
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
        <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <slot/>
    </v-main>
  </v-app>
</template>