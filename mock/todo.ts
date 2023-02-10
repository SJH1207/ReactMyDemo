let list=[
    { id: 1, title: 'TodoList列表', status: 1 },
    { id: 2, title: 'TodoList添加', status: 2 },
    { id: 3, title: 'TodoList编辑', status: 0 },
    { id: 4, title: 'TodoList查看', status: 0 },
    { id: 5, title: 'TodoList总结', status: 2 },
    { id: 6, title: 'TodoList修改状态', status: 0 },
]


export default {
  'GET /api/todolists': list,

  'POST /api/todo': (req, res) => {
    // 获得提交的来的数据
    // req.body   // {todo:'xxx'}
    // 添加todo
    const item={
      id:list.length+1,
      title:req.body.todo,
      status:0
    }
    list.unshift(item)
    // const list1=[item,...list ]
    // list=list1

    // 返回添加结果
    res.send({
      code:0,
      message:'添加待办事项成功'
    })
  },

  'PUT /api/edit': (req, res) => {
    const {id,status}=req.body
    // 筛选todo，进行修改
    // res.send(id,status)
    list.map((item,index)=>{
      if (item.id===id) list[index].status=status
     })

    // 返回添加结果
    res.send({
      code:0,
      message:'修改状态成功'
    })
  },
};
