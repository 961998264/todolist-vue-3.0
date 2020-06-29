import { useListProvide, useListInject } from './home/index'
console.log("useListInject", useListInject)

export { useListInject }
export const useProvider = () => {
  useListProvide()
}