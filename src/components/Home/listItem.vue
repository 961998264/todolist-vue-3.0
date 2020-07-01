<template>
  <div class='list-item' @click="setActiveId(data.id)" v-if="data"
    :class="{'active':activeId === data.id && !isDetail}">
    <div v-if="data&&data.status===0">
      <input type="checkbox" @click='changeStatus(data.id,1)'>
      <span>
        {{data.title}}
      </span>
    </div>
    <div v-else class="finished">
      <img src="../../assets/img/finished.png" alt="" class="finished-icon"
        @click='changeStatus(data.id,0)'>
      <span v-if="isDetail">{{data.title}}</span>
      <s v-else>{{data.title}}</s>
    </div>
    {{activeitem}}
  </div>
</template>

<script>
import { useListInject } from '../../context/home/index'
// eslint-disable-next-line no-unused-vars
import { reactive, computed, watch, onMounted, } from 'vue'
export default {
  name: '',
  data () {
    return {

    }
  },
  props: {
    data: {
      type: Object,
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const { changeStatus, activeId, } = useListInject()
    const setActiveId = (id) => {
      activeId.value = id
    }
    return {
      changeStatus,
      setActiveId,
      activeId
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
.list-item {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
}
.finished {
  display: flex;
  align-items: center;
  color: #ccc;
}
.finished-icon {
  margin-right: 5px;
}
.active {
  background: #edf7ee;
}
</style>
