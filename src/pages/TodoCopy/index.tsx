import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { Alert, Button, Form, Input, message, Select } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { getTodoLists, add, edit } from '@/services/todo';
import { connect } from 'umi';
import Modal from 'antd/lib/modal/Modal';
import ProForm, { ProFormText } from '@ant-design/pro-form';

// status  0待办  1完成  2取消
// const data=[
//     {id:1,title:'TodoList列表',status:1},
//     {id:2,title:'TodoList添加',status:2},
//     {id:3,title:'TodoList编辑',status:0},
//     {id:4,title:'TodoList查看',status:0},
//     {id:5,title:'TodoList总结',status:2},
//     {id:6,title:'TodoList修改状态',status:1},
// ]

const TodeCopy = (props) => {
  let [isModalVisible, setIsModalVisible] = useState(false);

  const status = [
    <Alert message="待办" type="info" showIcon />,
    <Alert message="已完成" type="success" showIcon />,
    <Alert message="取消" type="error" showIcon />,
  ];

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        // console.log(record);
        return status[record.status];
      },
    },
    {
      title: '修改状态',
      render: (_, record) => {
        let editOperation = [];
        if (record.status !== 0) {
          editOperation.push(
            <a onClick={() => changeStatus(record.id, 0)} key={0}>
              待办{' '}
            </a>,
          );
        }
        if (record.status !== 1) {
          editOperation.push(
            <a onClick={() => changeStatus(record.id, 1)} key={1}>
              完成{' '}
            </a>,
          );
        }
        if (record.status !== 2) {
          editOperation.push(
            <a onClick={() => changeStatus(record.id, 2)} key={2}>
              取消{' '}
            </a>,
          );
        }
        return editOperation;
      },
    },
  ];

  // 方法1：发送请求获得数据
  // let [data,setData]=useState([])
  // useEffect(async ()=>{
  //     const resData=await getTodoLists()
  //     setData(resData)
  //     console.log(data);
  // },[])

  // 方法2：使用model获得数据
  // console.log(props);
  /*  // 在用户模块书写过  useEffect(){dispatch}
        const { dispatch } = props
        useEffect(async () => {
            //使用model，获取数据
            await dispatch({
                type: 'todo/getTodeList',
                payload: null
            })
        }, []) 
    */
  // 获得props里的todoList并改名为data
  const { todoList: data } = props.todo;

  // 打开添加表单事件
  const showFrom = () => {
    setIsModalVisible(true);
  };

  // 点击模态框关闭时间
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 表单验证通过后执行的方法
  const handleForm = async (value) => {
    // console.log(value);

    // 执行添加的方法
    const res = await add(value);

    if (res.code === 0) {
      // 刷新todolist
      getData();
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  // 修改状态的方法
  const changeStatus = async (id, status) => {
    // console.log(id,status);
    // 调用services中的方法，修改状态
    const res = await edit({ id, status });

    // 判断执行结果
    if (res.code === 0) {
      getData();
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  // 刷新页面的方法
  const getData = () => {
    props.dispatch({
      type: 'todo/getTodoList',
      payload: null,
    });
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dataSource={data}
        // 请求方法
        // request={async () => ({data:await getTodoLists()})}
        rowKey="key"
        search={false}
        dateFormatter="string"
        headerTitle="表格标题"
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showFrom}>
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
      <Modal title="添加待办事项" footer={null} visible={isModalVisible} onCancel={handleCancel}>
        <ProForm onFinish={(value) => handleForm(value)}>
          <ProFormText name="todo" label="待办事项" rules={[{ required: true }]} />
        </ProForm>
      </Modal>
      ,
    </PageContainer>
  );
};

// export default TodeCopy
export default connect(({ todo }) => ({ todo }))(TodeCopy);
