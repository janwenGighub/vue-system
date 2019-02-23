<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs.length>0">
          <el-submenu
            :index="item.index"
            :key="item.index"
          >
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
              >
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
          >
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { getMenu } from '@/services/api.js'
import bus from '../common/bus';
export default {
  data () {
    return {
      collapse: false,
      items: [],
      newArr: [],
      subs: []
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '');
      console.log(this.$route.path)
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  },
  mounted () {
    this.addMenu()
  },
  methods: {
    addMenu () { // 获取菜单
      getMenu().then((res) => {
        this.newArr = res.data.data
        for (let i = 0; i < this.newArr.length; i++) {
          let obj = {}
          obj.title = this.newArr[i].menuName
          obj.subs = new Array()
          if (this.newArr[i].menuName === '首页') {
            obj.index = 'dashboard'
            obj.icon = 'el-icon-lx-home'
          } else if (this.newArr[i].menuName === '内容管理') {
            obj.index = 'table'
            obj.icon = 'el-icon-lx-cascades'
          } else if (this.newArr[i].menuName === '会员中心') {
            obj.index = 'icon'
            obj.icon = 'el-icon-lx-copy'
          } else if (this.newArr[i].menuName === '商品中心') {
            obj.index = '3'
            obj.icon = 'el-icon-lx-calendar'
          } else if (this.newArr[i].menuName === '可视化管理') {
            obj.index = 'charts'
            obj.icon = 'el-icon-lx-favor'
          } else {
            obj.index = '7'
            obj.icon = 'el-icon-lx-rank'
          }
          this.items.push(obj)
          for (let k = 0; k < this.newArr[i].children.length; k++) {
            let obj2 = {}
            if (this.newArr[i].children[k].menuName === '商品分类') {
              obj2.title = '商品分类信息'
              obj2.index = '3-2'
            } else {
              obj2.title = '商品管理信息'
              obj2.index = 'form'
            }
            obj.subs.push(obj2)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
