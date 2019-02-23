import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/1'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/home',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: {
            title: '系统首页'
          }
        },
        {
          path: '/icon',
          component: resolve => require(['../components/page/Icon.vue'], resolve),
          meta: {
            title: '自定义图标'
          }
        },
        {
          path: '/table',
          component: resolve => require(['../components/page/content/BaseTable.vue'], resolve),
          meta: {
            // title: '基础表格'
            title: '内容管理'
          }
        },
        {
          path: '/2',
          component: resolve => require(['../components/page/Tabs.vue'], resolve),
          meta: {
            title: 'tab选项卡'
          }
        },
        {
          path: '/form',
          component: resolve => require(['../components/page/BaseForm.vue'], resolve),
          meta: {
            title: '基本表单'
          }
        },
        {
          // 富文本编辑器组件
          path: '/editor',
          component: resolve => require(['../components/page/VueEditor.vue'], resolve),
          meta: {
            title: '富文本编辑器'
          }
        },
        {
          // markdown组件
          path: '/markdown',
          component: resolve => require(['../components/page/Markdown.vue'], resolve),
          meta: {
            title: 'markdown编辑器'
          }
        },
        {
          // 图片上传组件
          path: '/upload',
          component: resolve => require(['../components/page/Upload.vue'], resolve),
          meta: {
            title: '文件上传'
          }
        },
        {
          // vue-schart组件
          path: '/charts',
          component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
          meta: {
            title: 'schart图表'
          }
        },
        {
          // 拖拽列表组件
          path: '/drag',
          component: resolve => require(['../components/page/DragList.vue'], resolve),
          meta: {
            title: '拖拽列表'
          }
        },
        {
          // 拖拽Dialog组件
          path: '/dialog',
          component: resolve => require(['../components/page/DragDialog.vue'], resolve),
          meta: {
            title: '拖拽弹框'
          }
        },
        {
          // 权限页面
          path: '/permission',
          component: resolve => require(['../components/page/Permission.vue'], resolve),
          meta: {
            title: '权限测试',
            permission: true
          }
        },
        {
          path: '/404',
          component: resolve => require(['../components/page/404.vue'], resolve),
          meta: {
            title: '404'
          }
        },
        {
          path: '/403',
          component: resolve => require(['../components/page/403.vue'], resolve),
          meta: {
            title: '403'
          }
        },
        {
          path: '/menber_customer',
          component: () => import('../components/page/system/clientele-manage.vue'),
          meta: {
            title: '客户管理'
          }
        },
        {
          path: '/system_user',
          component: () => import('../components/page/system/user-manage.vue'),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/system_role',
          component: () => import('../components/page/system/role-manage.vue'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/system_menu',
          component: () => import('../components/page/system/menu-manage.vue'),
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: '/system_department',
          component: () => import('../components/page/system/department-manage.vue'),
          meta: {
            title: '部门管理'
          }
        },
        {
          path: '/system_monitor',
          component: () => import('../components/page/system/monitoring-manage.vue'),
          meta: {
            title: '监控管理'
          }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})