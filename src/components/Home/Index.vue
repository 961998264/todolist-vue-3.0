<template>
  <div class="main">
    <div class="main-left">
      <div class="loading" v-if="loading">我是loading</div>
      <div v-else>
        <div class="header">
          <Header :addList='addList'></Header>
        </div>
        <UnFinish :list='unFinish'></UnFinish>
        <Finished :list='finished'></Finished>
      </div>
    </div>

    <div class="main-right" :style="{width:activeItem?'500px':'0'}">
      <ListItem :data='activeItem' :isDetail='true'></ListItem>
      <textarea name="content" v-model="textarea" maxlength="200" class="detail"
        placeholder="待办事件详情"></textarea>
      <div class="btn" v-if="activeItem" @click="submit">确定</div>
    </div>
  </div>
</template>

<script>
import ListItem from './listItem'
import Header from './Header'
import UnFinish from './unFinish'
import Finished from './finished'
// eslint-disable-next-line no-unused-vars
import { useListInject } from '../../context/home/index'
// eslint-disable-next-line no-unused-vars
import { reactive, computed, watch, onMounted, ref, watchEffect } from 'vue'
export default {
  name: 'Home',
  components: {
    Header,
    UnFinish,
    Finished,
    ListItem
  },
  props: {
    name: String,
  },
  // eslint-disable-next-line no-unused-vars
  setup (props, val) {
    const { list, changeStatus, getList, loading, unFinish, finished, addList, activeItem, setActiveItem, setContext } = useListInject()
    const textarea = ref('')
    if (activeItem)
      getList()
    const submit = () => {
      setContext(activeItem.value.id, textarea.value)
      textarea.value = ''
      activeItem.value = null
    }

    // watchEffect(() => {
    //   console.log(textarea, "textarea")
    // })
    watch(activeItem, (val, ) => {
      if (val) {
        textarea.value = val.context
      }

    })
    // // 未完成事件列表
    // const unFinish = computed(() => {
    //   list.value.filter(item => item.status === 0)
    // })
    // // 已完成事件列表
    // const Finished = computed(() => {
    //   list.value.filter(item => item.status === 0)
    // })
    return {
      list,
      changeStatus,
      loading,
      unFinish,
      finished,
      addList,
      activeItem,
      textarea,
      submit,
      setActiveItem
    }
  }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.main {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
}
.main-left {
  flex: 1;
  height: 100%;
  border-right: 1px solid #ccc;
  position: relative;
}
.main-right {
  transition: all 0.4s ease;
  height: 100%;
}
.header {
  height: 50px;
  padding: 0 20px;
}

.loading {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50% -50%);
}
.detail {
  width: 100%;
  height: 200px;
  border: none;
  resize: none;
  cursor: pointer;
  padding: 10px;
  outline: 1px solid #25baf1;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 10px;
}
.btn {
  width: 60px;
  height: 28px;
  border: 1px solid #25baf1;
  background: #25baf1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 28px;
  font-size: 14px;
  float: right;
  cursor: pointer;
  user-select: none;
}
</style>
