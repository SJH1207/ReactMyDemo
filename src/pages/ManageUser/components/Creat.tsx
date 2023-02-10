import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, Modal } from 'antd';
import { addUsers } from '@/services/user';

const Creat = (props) => {

    const {isModalVisible}=props
    const {isShowModal}=props
    const {actionRef}=props

    

  // 添加用户，表单数据提交
  const creatUser = async (values) => {
    console.log(values);
    // 发送请求添加用户
    const response = await addUsers(values);
    console.log('res', response);
    if (response.status === undefined) {
      message.success('添加成功');
      // 属性表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowModal(false);
    }
  };
  
  return (
    <Modal 
        title="添加用户" 
        footer={null} 
        visible={isModalVisible} 
        onCancel={() => isShowModal(false)}
        destroyOnClose={true}
    >
      <ProForm onFinish={(values) => creatUser(values)}>
        <ProFormText
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
        />

        <ProFormText.Password
          name="password"
          label="密码"
          placeholder="请输入密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码最少6位' },
          ]}
        />

        <ProFormText
          name="name"
          label="昵称"
          placeholder="请输入昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        />
      </ProForm>
    </Modal>
  );
};

export default Creat;
