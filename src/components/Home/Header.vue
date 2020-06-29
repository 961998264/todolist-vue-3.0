<template>
  <div class='main-wrap'>
    <input type="text" v-model="inputValue" v-on:keyup.enter="handleAddList" class="input"
      placeholder="添加今天的任务至清单">
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, computed, watch, onMounted, ref } from 'vue'
export default {
  name: '',
  data () {
    return {

    }
  },
  props: {
    addList: {
      type: Function
    }
  },
  setup (props) {
    const inputValue = ref('')
    // 生成随机id
    const genID = (length) => {
      return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
    }
    // 新增 未完成事件
    const handleAddList = () => {
      const obj = {
        title: inputValue,
        id: genID(7),
        context: '',
        status: 0,
      }
      props.addList(obj)
    }
    return {
      inputValue,
      handleAddList
    }
  },
  methods: {
    async initData () { }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.initData()
  },
  mounted () { },
}
</script>

<style lang='less' scoped>
.input {
  height: 30px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0 0 0 10px;
  outline: 0;
  font-size: 12px;
}
</style>
