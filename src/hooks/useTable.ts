// eslint-disable-next-line no-unused-vars
import { ref, onMounted, reactive } from "vue"
export const useAsync = (func: (option: object) => Promise<any>, option = {}) => {
  let loading = ref(false)
  let error = reactive(null)
  let pageInfo = reactive({
    total: 0,
    pagesize: 10,
    page: 1,
    total_page: 1
  })
  let tableList = reactive(null)
  onMounted(async () => {
    execute()
  })
  // 执行外部传入的函数
  const execute = async () => {
    try {
      loading.value = true
      const res = await func(option)
      if (res.code === 0) {
        // 需要和后端约定要定义的字段
        const { list, total, pagesize, page, total_page } = res.data
        tableList = list
        pageInfo = {
          total,
          pagesize,
          page,
          total_page,
        }
      }
    } catch (err) {
      error = err
    } finally {
      loading.value = false
    }
  }
  // 改变每页条数
  const handleSizeChange = (val) => {
    pageInfo.page = 1
    pageInfo.pagesize = val || 10
    execute()
  }
  // 改变当前页码
  const handleCurrentChange = (val) => {
    this.pageInfo.page = val
    execute()
  }
  return { loading, pageInfo, error, tableList, handleSizeChange, handleCurrentChange }
}