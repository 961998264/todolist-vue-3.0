<template>
  <div class='main-wrap'>
    <div class="toggle-box">
      <div class="toggle-header">
        <img src="../../assets/img/right.png" alt="" class="icon" @click="onToggle"
          :style="{transform:toggle?'rotate(90deg)':'rotate(0deg)'}">
        <span>未完成</span>
      </div>
      <div class="list-content" v-if="toggle">
        <ListItem v-for="(item,index) in list" :key='index' :data='item'></ListItem>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, computed, watch, onMounted, ref, } from 'vue'
import ListItem from './listItem'
export default {
  name: '',
  components: {
    ListItem
  },
  data () {
    return {

    }
  },
  props: {
    list: {
      type: Array,
    }
  }, // 一定要写这个props选项，否则 setup 的props为undefined
  setup () {
    const count = ref(0)
    const toggle = ref(true)
    const onToggle = () => {
      toggle.value = !toggle.value
    }
    return {
      count,
      toggle,
      onToggle,
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
.main-wrap {
}
.toggle-header {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.icon {
  width: 10px;
  margin-right: 5px;
  transition: all 0.2s ease-in-out;
}
.list-content {
  padding-left: 40px;
}
</style>
