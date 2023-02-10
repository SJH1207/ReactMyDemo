import React, { useRef, useState } from 'react';
import { getUser, lockUsers } from '@/services/user';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, message, Switch } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Creat from './components/Creat';
import Edit from './components/Edit';
import CreatOrEdit from './components/CreatOrEdit';

const ManageUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [editId, setEditId] = useState(undefined);

  // 表格的ref，便于自定义操作表格
  const actionRef = useRef();

  // 获取用户列表数据
  const getData = async (params) => {
    const response = await getUser(params);
    console.log(response);
    return {
      data: response.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response.meta.pagination.total,
    };
  };

  // 封禁和启用用户
  const lockUser = async (uid) => {
    const response = await lockUsers(uid);
    // console.log(response.status);
    if (response.status === undefined) {
      message.success('操作成功');
    }
  };

  // 控制新建模态框显示和隐藏
  const isShowModal = (show, id = undefined) => {
    setEditId(id);
    setIsModalVisible(show);
  };

  // // 控制编辑模态框显示和隐藏
  // const isShowModalEdit = (show,id) => {
  //   setEditId(id)
  //   setIsModalVisibleEdit(show);
  // };

  // 设置表头，并获得数据
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_, record) => <Avatar src={record.avatar_url} size={20} icon={<UserOutlined />} />,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否禁用',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          defaultChecked={record.is_locked === 0}
          onChange={() => lockUser(record.id)}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '更新时间时间',
      dataIndex: 'updated_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => (
        <a
          onClick={() => {
            isShowModal(true, record.id);
          }}
        >
          编辑
        </a>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => getData(params)}
        // request={async (params = {}) => getUser(params)}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          // 分页
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => isShowModal(true)}
          >
            新建
          </Button>,
        ]}
      />

      {/* <Creat 
        isModalVisible={isModalVisible} 
        isShowModal={isShowModal}
        actionRef={actionRef}
      />

      {
        isModalVisibleEdit?
          <Edit 
          isModalVisibleEdit={isModalVisibleEdit} 
          isShowModalEdit={isShowModalEdit}
          actionRef={actionRef}
          editId={editId}
        />
        :''
      } */}

      {
        // 模态框隐藏的时候不挂载组件:模态框显示的时候再挂载组件,这样能够触发子组件的生命周期
        isModalVisible ? (
          <CreatOrEdit
            isModalVisible={isModalVisible}
            isShowModal={isShowModal}
            actionRef={actionRef}
            editId={editId}
          />
        ) : (
          ''
        )
      }
    </PageContainer>
  );
};

export default ManageUser;
