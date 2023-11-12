// @ts-ignore
import en from "vuetify/lib/locale/en"

export default defineI18nLocale(async (locale) => {
    return {
        locale: 'English',
        locales: {
            'en': 'English',
            'fr': 'French',
        },
        home: 'Home',
        account: {
            settings: 'Account Settings',
            logout: 'Logout',
        },
        form: {
            login: {
                username: {
                    label: 'Username',
                },
                password: {
                    label: 'Password',
                    hint: 'Must be at least 8 characters long',
                },
                submit: 'Login',
                forgottenPassword: 'Forgotten password ?',
                title: 'Login to your account',
                subtitle: 'Don\'t have an account yet? {link}',
                register: 'Create one here',
            },
            register: {
                title: 'Create your account',
                subtitle: 'Please fill in the following fields',
                submit: 'Login',
                login: 'Create an account',
                username: {
                    label: 'Username',
                },
                password: {
                    label: 'Password',
                    hint: 'Must be at least 8 characters long',
                },
                email: {
                    label: 'Email address',
                    hint: 'Will be used to send you notifications',
                }
            }
        },
        $vuetify: {
            ...en,
        },
    }
})