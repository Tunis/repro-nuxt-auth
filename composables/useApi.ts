
export const useApi: typeof useFetch = async (request, options?) => {
        const response = await useFetch(request, options)
        console.log('useApi ', response)

        if (response.error?.statusCode === 401) {
            const auth = useAuth()
            await auth.signOut()
        }

        return response
}