
import { provide, ref, Ref, inject, computed } from 'vue'
import { getListApi } from 'api/home'
type list = listItem[]
interface listItem {
  title: string,
  context: string,
  id: number,
  status: number,

}
type loading = boolean

interface ListContext {
  list: Ref<list>,
  getList: () => {},
  changeStatus: (id: number, status: number) => void,
  loading: loading,
  addList: (item: listItem) => void,
  delList: (id: number) => void,
  finished: Ref<list>,
  unFinish: Ref<list>,
  setContext: (id: number, context: string) => void,
  activeItem: Ref<list>,
  setActiveItem: () => void,
}

const listymbol = Symbol()

export const useListProvide = () => {
  // 全部事件 
  let loading = ref<loading>(false)
  const list = ref<list>([]);
  const activeItem = ref<listItem | null>(null)
  const setActiveItem = (item: listItem | null) => {
    activeItem.value = item
  }
  // 获取list
  const getList = async function () {
    console.log('getListgetList')
    loading.value = true
    const res = await getListApi()
    list.value = res
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
  const addList = (item: listItem) => {
    list.value.push(item)
  }
  //修改状态
  const changeStatus = (id: number, status: number) => {
    console.log('status', status)
    const removeIndex = list.value.findIndex((listItem: listItem) => listItem.id === id)
    if (removeIndex !== -1) {
      list.value[removeIndex].status = status
    }
  };
  const setContext = (id: number, context: string) => {

    console.log("setContext -> context", context)

    const Index = list.value.findIndex((listItem: listItem) => listItem.id === id)
    if (Index !== -1) {
      list.value[Index].context = context
    }
  }
  const delList = (id: number) => {
    console.log("delList -> id", id)
    for (let i = 0; i < list.value.length; i++) {
      if (list.value[i].id === id) {
        list.value.splice(i, 1)
        break
      }
    }
  }
  // 未完成事件列表
  const unFinish = computed(() => {
    return list.value.filter(item => item.status === 0)
  })
  // 已完成事件列表
  const finished = computed(() => {
    return list.value.filter(item => item.status === 1)
  })
  provide(listymbol, {
    list,
    unFinish,
    finished,
    loading,
    changeStatus,
    getList,
    addList,
    delList,
    activeItem,
    setActiveItem,
    setContext
  })

}

export const useListInject = () => {
  const listContext = inject<ListContext>(listymbol);
  if (!listContext) {
    throw new Error(`useListInject must be used after useListProvide`);
  }
  return listContext
};