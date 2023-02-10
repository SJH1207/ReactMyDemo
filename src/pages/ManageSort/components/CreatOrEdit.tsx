import React, { useEffect, useState } from 'react';
import ProForm, {  ProFormText } from '@ant-design/pro-form';
import { message, Modal, Skeleton, Select } from 'antd';
import { getCategory } from '@/services/category';
import { addSort, showSort, updataSort } from '@/services/sort';

const CreatOrEdit = (props) => {
  // 将表单初始化的值设置成状态，在编辑的时候，使用这个状态
  const [initialValues, setinitialValues] = useState(undefined);
  const [options, setOptions] = useState([]);

  // 定义form的示例，用来操作表单
  const [formObj] = ProForm.useForm();
  // 设置表单的值
  // formObj.setFieldsValue({fieldName:value})

  const { isModalVisible } = props; // 模态框是否显示
  const { isShowModal } = props; // 操作模态框显示隐藏的方法
  const { actionRef } = props; // 父组件传来的表格的引用，用来操作表格，比如刷新表格
  const { editId } = props; // 要编辑的分类id，添加的时候是undefined，只有编辑的时候才有

  // 添加  或是  编辑  的文字描述
  const type = editId === undefined ? '添加' : '编辑';

  // useEffect更推荐下面这种写法
  useEffect(() => {
    const asyncFn = async () => {
      // 查询分类数据
      const resCategory = await getCategory();
      if (resCategory.status === undefined) {

        const pidName=resCategory.map((item)=>{
          return {value:item.name,pid:item.pid}
        })
        console.log('pidName',pidName);
        setOptions(pidName);
        console.log('resCategory', resCategory);
      }
      // 发送请求，获得分类详情，编辑模块
      if (editId !== undefined) {
        const response = await showSort(editId);
        console.log('分类详情', response);
        // setinitialValues(11);
        
        // 获取数据之后，修改状态，状态改变，组件重新渲染，骨架屏消失，表单出现
        const { pid, name } = response;
        let defaultCategory = name;
        // if (pid === 0) {
        //   defaultCategory = [id];
        // } else {
        //   defaultCategory = [pid, id];
        // }
        setinitialValues({...response,group: defaultCategory });
      }
    };
    asyncFn();
  }, []);

  // 提交表单,执行编辑或者添加
  const handleSubmit = async (values) => {
    let response = {};
    
    if (editId === undefined) {
      if(values.group===undefined){
        values.pid=0
      }else {
        values.pid=1
        delete values.group;
      }
      console.log(values);
      
      // 执行添加
      response = await addSort(values);
    } else {

      console.log(values);
      console.log('response',initialValues);
      values.pid=initialValues.pid
      delete values.group;
      
      
      // 执行编辑
      response = await updataSort(editId, values);
    }


    if (response.status === undefined) {
      message.success(`${type}成功`);
      isShowModal(false)
      actionRef.current.reload();
      // // 属性表格数据
      // actionRef.current.reload();
      // // 关闭模态框
      // isShowModal(false);
    }
  };

  return (
    <Modal
      title={`${type}分类`}
      footer={null}
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      destroyOnClose={true}
    >
      {
        // 只有是编辑的情况下，并且要显示的数据还没有返回，才显示骨架屏
        initialValues === undefined && editId !== undefined ? (
          <Skeleton active={true} paragraph={{ rows: 4 }} />
        ) : (
          <ProForm onFinish={(values) => handleSubmit(values)} initialValues={initialValues} >

            <ProForm.Item name="group" label="父级分类">
              <Select options={options}></Select>
            </ProForm.Item>

            
            <ProFormText name="pid"  hidden={true}></ProFormText>

            <ProFormText
              name="name"
              label="分类名称"
              placeholder="请输入"
              rules={[{ required: true, message: '请输入分类名称' }]}
            />
          </ProForm>
        )
      }
    </Modal>
  );
};

export default CreatOrEdit;
