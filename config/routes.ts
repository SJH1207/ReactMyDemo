export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path:'/dva',
    name:'dva',
    icon: 'RedditOutlined',
    routes:[
      {
        path: '/dva/todo',
        name: 'todo',
        component: './Todo',
      },
      {
        path: '/dva/todocopy',
        name: 'todocopy',
        component: './TodoCopy',
      },
      {
        path: '/dva/test',
        name: 'test',
        component: './TestModel',
      },
    ]
  },
  {
    path:'/welcome',
    name:'welcome',
    icon: 'smile',
    component:'./welcome'
  },
  {
    path:'/dashboard',
    name:'dashboard',
    icon: 'crown',
    component:'./Dashboard'
  },
  {
    path:'/manageuser',
    name:'manageuser',
    icon:'PicRightOutlined',
    component:'./ManageUser'
  },
  {
    path:'/managegoods',
    name:'managegoods',
    icon:'ShoppingOutlined',
    component:'./ManageGoods'
  },
  {
    path:'/managesort',
    name:'managesort',
    icon:'AppstoreAddOutlined',
    component:'./ManageSort'
  },
  {
    path:'/manageorder',
    name:'manageorder',
    icon:'DollarOutlined',
    component:'./ManageOrder'
  },
  {
    path: '/',
    redirect:'welcome'
  },
  {
    component: './404',
  },
];
