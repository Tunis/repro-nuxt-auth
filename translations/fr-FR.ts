// @ts-ignore
import fr from "vuetify/lib/locale/fr"
export default defineI18nLocale(async (locale) => {
    return {
        locale: 'Français',
        locales: {
            'en': 'Anglais',
            'fr': 'Français',
        },
        errors: {
            credentials: 'Les identifiants sont incorrects',
        },
        home: 'Accueil',
        account: {
            settings: 'Paramètres du compte',
            logout: 'Déconnexion',
        },
        form: {
            login: {
                submit: 'Connexion',
                subtitle: 'Pas encore de compte? {register}',
                register: 'Créez-en un ici',
                forgottenPassword: 'Mot de passe oublié ?',
                title: 'Connectez-vous à votre compte',
                username: {
                    label: 'Nom d\'utilisateur',
                },
                password: {
                    label: 'Mot de passe',
                    hint: 'Doit contenir au moins 8 caractères',
                },
            },
            register: {
                title: 'Créez votre compte',
                submit: 'Créer un compte',
                login: 'Se connecter',
                subtitle: 'Merci de remplir les champs suivants',
                username: {
                    label: 'Nom d\'utilisateur',
                },
                password: {
                    label: 'Mot de passe',
                    hint: 'Doit contenir au moins 8 caractères',
                },
                email: {
                    label: 'Adresse email',
                    hint: 'Servira pour vous envoyez des notifications',
                }
            }
        },
        $vuetify: {
            ...fr,
        },
    }
})