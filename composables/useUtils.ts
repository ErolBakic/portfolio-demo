export const useUtils = async () => {
    const { pending, data } = await useLazyFetch('/api/posts');

    return {
        pending, data
    }
}