import React,{useEffect,useState} from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, Modal, Skeleton  } from 'antd';
import { updataUser, showUser } from '@/services/user';

const Edit = (props) => {
  const { isModalVisibleEdit } = props;
  const { isShowModalEdit } = props;
  const { actionRef } = props;
  const { editId } = props;
  const { useMessage } = props;

  const [initialValues,setinitialValues]=useState(undefined)

  useEffect(async ()=>{
    // 发送请求，获得用户详情
    if (editId!==undefined){
      const response=await showUser(editId)
      console.log(response);
      setinitialValues({
        name:response.name,
        email:response.email
      })
    }
  },[])

  // 修改用户，表单数据提交
  const editUser = async (values) => {
    console.log(values);
    // 发送请求更新用户
    const response = await updataUser(editId, values);
    console.log('res', response);
    if (response.status === undefined) {
      message.success('更新成功');
      // 属性表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowModalEdit(false);
    }
  };

  return (
    <Modal
      title="编辑用户"
      footer={null}
      visible={isModalVisibleEdit}
      onCancel={() => isShowModalEdit(false)}
      destroyOnClose={true}
    >
      {
        initialValues===undefined ? <Skeleton active={true} paragraph={{ rows: 4 }} />
        :
        <ProForm 
        onFinish={(values) => editUser(values)}
        initialValues={initialValues}
      >
        <ProFormText
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
        />

        <ProFormText
          name="name"
          label="昵称"
          placeholder="请输入昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        />
      </ProForm>
      }
      

      
    </Modal>
  );
};

export default Edit;
