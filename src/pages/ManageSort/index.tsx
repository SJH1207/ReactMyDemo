import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space, Table } from 'antd';
import CreatOrEdit from './components/CreatOrEdit';
import { getSort } from '@/services/sort';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';

const ManageUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);

  // 表格的ref，便于自定义操作表格
  const actionRef = useRef();

  // 获取用户列表数据
  const getData = async (params) => {
    const response = await getSort(params);
    return {
      data: response.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response.meta.pagination.total,
    };
  };

  // 控制新建模态框显示和隐藏
  const isShowModal = (show, id = undefined) => {
    setEditId(id);
    setIsModalVisible(show);
  };

  // 设置表头，并获得数据
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
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

  // 获取分类数据
  let [data, setData] = useState([]);
  useEffect(() => {
    const asyncFn = async () => {
      const resData = await getSort();
      setData(resData);
      console.log(data);
    };
    asyncFn();
  }, []);

  return (
    <PageContainer>
      <Space align="center" style={{ marginBottom: 16 }}>
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => isShowModal(true)}
        >
          新建
        </Button>
      </Space>
      <Table 
      columns={columns} 
      dataSource={data} 
      actionRef={actionRef} 
      />
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
