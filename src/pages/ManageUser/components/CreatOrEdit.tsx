import React,{useEffect,useState} from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, Modal, Skeleton  } from 'antd';
import { updataUser, showUser, addUsers } from '@/services/user';

const CreatOrEdit = (props) => {

  // 将表单初始化的值设置成状态，在编辑的时候，使用这个状态
  const [initialValues,setinitialValues]=useState(undefined)

  const { isModalVisible } = props;// 模态框是否显示
  const { isShowModal } = props;// 操作模态框显示隐藏的方法
  const { actionRef } = props;// 父组件传来的表格的引用，用来操作表格，比如刷新表格
  const { editId } = props;// 要编辑的用户id，添加的时候是undefined，只有编辑的时候才有

  // 添加  或是  编辑  的文字描述
  const type=editId === undefined?'添加':'编辑'


/*   

  useEffect(async ()=>{
    // 发送请求，获得用户详情
    if (editId!==undefined){
      const response=await showUser(editId)
      console.log('用户详情',response);
      // 获取数据之后，修改状态，状态改变，组件重新渲染，骨架屏消失，表单出现
      setinitialValues({
        name:response.name,
        email:response.email
      })
    }
  },[]) 
*/
  // useEffect更推荐下面这种写法
  useEffect(()=>{
    const asyncFn =async ()=>{
      // 发送请求，获得用户详情
      if (editId!==undefined){
        const response=await showUser(editId)
        console.log('用户详情',response);
        // 获取数据之后，修改状态，状态改变，组件重新渲染，骨架屏消失，表单出现
        setinitialValues({
          name:response.name,
          email:response.email
        })
      }
    }
    asyncFn()
  },[])

  // 提交表单,执行编辑或者添加
  const handleSubmit=async (values)=>{
    let response={}
    if (editId===undefined){
      // 执行添加
      response = await addUsers(values);
    }else{
      // 执行编辑
      response = await updataUser(editId, values);
    }

    if (response.status === undefined) {
      message.success(`${type}成功`);
      // 属性表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowModal(false);
    }
  }

  return (
    <Modal
      title={`${type}用户`}
      footer={null}
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      destroyOnClose={true}
    >
      {
        // 只有是编辑的情况下，并且要显示的数据还没有返回，才显示骨架屏
        initialValues===undefined&&editId!==undefined ? <Skeleton active={true} paragraph={{ rows: 4 }} />
        :
        <ProForm 
          onFinish={(values) => handleSubmit(values)}
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

        {
          // 只有添加功能有密码选项
          editId===undefined ? 
          <ProFormText.Password
            name="password"
            label="密码"
            placeholder="请输入密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码最少6位' },
            ]}
          />:''
        }

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

export default CreatOrEdit;



