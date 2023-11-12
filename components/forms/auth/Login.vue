<script lang="ts" setup>
import {object, string} from "yup";
import {useField, useForm} from 'vee-validate'
import {toTypedSchema} from "@vee-validate/yup";

const {t} = useI18n()
const {signIn} = useAuth()
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const {handleSubmit} = useForm({
  validationSchema: toTypedSchema(
      object({
        username: string().min(3).required(),
        password: string().min(8).required(),
      }),
  ),
})
const username = useField('username')
const password = useField('password')

const submit = handleSubmit(async (values: any) => {
  loading.value = true
  const result = await signIn('api_auth', {...values, redirect: false})
  if (result?.error) {
    // Do your custom error handling here
    error.value = t('errors.credentials')
    loading.value = false
  } else {
    loading.value = false
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(result?.url ?? '/', {external: true})
  }
})
</script>

<template>
  <form @submit.prevent="submit">
    <v-alert
        v-if="error"
        type="error">
      {{ error }}
    </v-alert>

    <v-text-field
        color="primary"
        variant="underlined"
        v-model="username.value.value"
        :error-messages="username.errorMessage.value"
        :label="$t('form.login.username.label')"
    ></v-text-field>

    <v-text-field
        color="primary"
        variant="underlined"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :label="$t('form.login.password.label')"
        :hint="$t('form.login.password.hint')"
        counter
        @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-row align="center" justify="center" class="actions">
      <v-btn color="primary" type="submit" :loading="loading">
        {{ $t('form.login.submit') }}
      </v-btn>
      <v-btn href="/auth/reset">
        {{ $t('form.login.forgottenPassword') }}
      </v-btn>
    </v-row>
  </form>
</template>

<style scoped>
form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

.actions {
  gap: 1rem;
}
</style>