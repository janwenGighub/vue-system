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
      <template v-for="item in newArr">
        <template v-if="item.children.length>0">
          <el-submenu
            :index="item.menuPage"
            :key="item.index"
          >
            <template slot="title">
              <i :class="item.menuIcon"></i><span slot="title">{{ item.menuName }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu
                v-if="subItem.children.length>0"
                :index="subItem.menuPage"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.menuName }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="threeItem.menuPage"
                >
                  {{ threeItem.menuName }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.menuPage"
                :key="subItem.index"
              >
                {{ subItem.menuName }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.menuPage"
            :key="item.index"
          >
            <i :class="item.menuIcon"></i><span slot="title">{{ item.menuName }}</span>
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
      // items: [
      //   {
      //     menuIcon: null,
      //     menuPage: 'home',
      //     menuName: '系统首页',
      //     children: []
      //   },
      //   {
      //     menuIcon: null,
      //     menuPage: null,
      //     menuName: '基础表格',
      //     children: []
      //   },
      //   {
      //     menuIcon: null,
      //     menuPage: null,
      //     menuName: 'tab选项卡',
      //     children: []
      //   },
      //   {
      //     menuIcon: null,
      //     menuPage: null,
      //     menuName: '表单相关',
      //     children: [
      //       {
      //         menuPage: null,
      //         menuName: '基本表单',
      //         children: []
      //       },
      //       {
      //         menuPage: null,
      //         menuName: null,
      //         children: [
      //           {
      //             menuPage: null,
      //             menuName: '富文本编辑器',
      //             children: []
      //           },
      //           {
      //             menuPage: null,
      //             menuName: 'markdown编辑器',
      //             children: []
      //           },
      //         ]
      //       },
      //       {
      //         menuPage: null,
      //         menuName: '文件上传',
      //         children: []
      //       }
      //     ]
      //   },
      //   {
      //     menuIcon: null,
      //     menuPage: null,
      //     menuName: '自定义图标',
      //     children: []
      //   },
      //   {
      //     menuIcon: null,
      //     menuPage: null,
      //     menuName: 'schart图表',
      //     children: []
      //   },
      //   {
      //     menuIcon: null,
      //     menuPage: null,
      //     menuName: '拖拽组件',
      //     children: [
      //       {
      //         menuPage: null,
      //         menuName: '拖拽列表',
      //         children: []
      //       },
      //       {
      //         menuPage: null,
      //         menuName: '拖拽弹框',
      //         children: []
      //       }
      //     ]
      //   },
      //   {
      //     menuIcon: null,
      //     menuPage: null,
      //     menuName: '错误处理',
      //     children: [
      //       {
      //         menuPage: null,
      //         menuName: '权限测试',
      //         children: []
      //       },
      //       {
      //         menuPage: null,
      //         menuName: '404页面',
      //         children: []
      //       }
      //     ]
      //   }
      // ],
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
