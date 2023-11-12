<script lang="ts" setup>
import {object, string} from "yup";
import {useField, useForm} from 'vee-validate'
import {toTypedSchema} from "@vee-validate/yup";

const {t} = useI18n()
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const {handleSubmit} = useForm({
  validationSchema: toTypedSchema(
      object({
        username: string().min(3).required(),
        email: string().email().required(),
        password: string().min(8).required(),
      }),
  ),
})
const username = useField('username')
const email = useField('email')
const password = useField('password')

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
  // todo submit to api
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
        :label="$t('form.register.username.label')"
    ></v-text-field>

    <v-text-field
        color="primary"
        variant="underlined"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        :label="$t('form.register.email.label')"
        :hint="$t('form.register.email.hint')"
    ></v-text-field>

    <v-text-field
        color="primary"
        variant="underlined"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :label="$t('form.register.password.label')"
        :hint="$t('form.register.password.hint')"
        counter
        @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-row align="center" justify="center" class="actions">
      <v-btn color="primary" type="submit" :loading="loading">
        {{ $t('form.register.submit') }}
      </v-btn>
      <v-btn href="/auth/login">
        {{ $t('form.register.login') }}
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