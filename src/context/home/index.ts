
import { provide, ref, Ref, inject, computed, } from 'vue'
import { getListApi } from 'api/home'
type list = listItem[]
interface listItem {
  title: string,
  context: string,
  id: number,
  status: number,

}
interface ListContext {
  list: Ref<list>,
  getList: () => {},
  changeStatus: (id: number, status: number) => void,
  addList: (item: listItem) => void,
  delList: (id: number) => void,
  finished: Ref<list>,
  unFinish: Ref<list>,
  setContext: (id: number, context: string) => void,
  setActiveItem: () => void,
}
// provide名称，推荐用Symbol
export const listymbol = Symbol()
// 提供provide的函数
export const useListProvide = () => {
  // 全部事件 
  const list = ref<list>([]);
  // 当前查看的事件id
  const activeId = ref<number | null>(null)
  // 当前查看的事件
  const activeItem = computed(
    () => {
      if (activeId.value || activeId.value === 0) {
        const item = list.value.filter((item: listItem) => item.id === activeId.value)
        return item[0]
      } else {
        return null
      }
    })
  // 获取list
  const getList = async function () {
    const res: any = await getListApi()
    console.log("useListProvide -> res", res)
    if (res.code === 0) {
      list.value = res.data
    }
  }
  // 新增list
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
  // 修改事件信息
  const setContext = (id: number, context: string) => {
    const Index = list.value.findIndex((listItem: listItem) => listItem.id === id)
    if (Index !== -1) {
      list.value[Index].context = context
    }
  }
  // 删除事件
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
    changeStatus,
    getList,
    addList,
    delList,
    setContext,
    activeItem,
    activeId
  })
}
// 
export const useListInject = () => {
  const listContext = inject<ListContext>(listymbol);
  if (!listContext) {
    throw new Error(`useListInject must be used after useListProvide`);
  }
  return listContext
};