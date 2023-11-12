<template>
  <v-app>
    <v-main>
      <v-row justify="center" align="center" class="row-container">
        <article class="auth-container">
          <slot/>
        </article>
      </v-row>
    </v-main>
  </v-app>
</template>

<style scoped>
.row-container {
  height: 100%;
}

.auth-container {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
}
</style>