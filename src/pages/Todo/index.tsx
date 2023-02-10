import { PageContainer } from '@ant-design/pro-layout'
import React,{useEffect,useState} from 'react'
import { useRequest } from 'umi';
import { Alert, Button } from 'antd'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'
import { getTodoLists } from '@/services/todo';

const status=[
    <Alert message="待办" type="info" showIcon/>,
    <Alert message="已完成" type="success" showIcon/>,
    <Alert message="取消" type="error" showIcon/>,
]

const columns=[
    {
        title:'id',
        dataIndex:'id',
    },
    {
        title:'标题',
        dataIndex:'title',
    },
    {
        title:'状态',
        dataIndex:'status',
        render:(_,record)=>{
            console.log(record);
            return status[record.status]
        }
    },
    {
        title:'修改状态',
        render:()=>[
            <a >待办 </a>,
            <a >完成 </a>,
            <a >取消 </a>,
        ],
    },
]

// status  0待办  1完成  2取消
// const data=[
//     {id:1,title:'TodoList列表',status:1},
//     {id:2,title:'TodoList添加',status:2},
//     {id:3,title:'TodoList编辑',status:0},
//     {id:4,title:'TodoList查看',status:0},
//     {id:5,title:'TodoList总结',status:2},
//     {id:6,title:'TodoList修改状态',status:1},
// ]



const Tode = () => {

    // let [data,setData]=useState([])
    // useEffect(async ()=>{
    //     const resData=await getTodoLists()
    //     setData(resData)
    //     console.log(data);
    // },[])
    

    return (
        <PageContainer>
            <ProTable
                columns={columns}
                // dataSource={data}
                request={async () => ({data:await getTodoLists()})}
                rowKey="key"
                search={false}
                dateFormatter="string"
                headerTitle="表格标题"
                toolBarRender={() => [
                    <Button type="primary" key="primary">
                        <PlusOutlined/>新建
                    </Button>,
                ]}
            />
        </PageContainer>
    )
}

export default Tode
