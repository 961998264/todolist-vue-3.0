// eslint-disable-next-line no-unused-vars
import { ref, onMounted } from "vue"
export const useAsync = (func: () => Promise<any>) => {
  const loading = ref(false)
  onMounted(async () => {
    try {
      loading.value = true
      await func()
    } catch (error) {
      error.value = error
    } finally {
      console.log('finally')
      loading.value = false
    }
  })
  return { loading, }
}