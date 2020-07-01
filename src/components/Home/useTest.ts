
// eslint-disable-next-line no-unused-vars
import { reactive, computed, watch, onMounted, ref, watchEffect } from 'vue'
export const useMouse = () => {
  const x = ref(0)
  const y = ref(0)
  return { x, y }
}