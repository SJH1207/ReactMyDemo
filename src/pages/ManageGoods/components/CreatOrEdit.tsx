import React, { useEffect, useState } from 'react';
import ProForm, { ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { message, Modal, Skeleton, Cascader, Button,Image } from 'antd';
import { getCategory } from '@/services/category';
import { addGoods, showGoods, updataGoods } from '@/services/goods';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import { UploadOutlined } from '@ant-design/icons';
import Editor from '@/components/Editor';

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
  const { editId } = props; // 要编辑的商品id，添加的时候是undefined，只有编辑的时候才有

  // 添加  或是  编辑  的文字描述
  const type = editId === undefined ? '添加' : '编辑';

  /*   

  useEffect(async ()=>{
    // 发送请求，获得商品详情
    if (editId!==undefined){
      const response=await showUser(editId)
      console.log('商品详情',response);
      // 获取数据之后，修改状态，状态改变，组件重新渲染，骨架屏消失，表单出现
      setinitialValues({
        name:response.name,
        email:response.email
      })
    }
  },[]) 
*/
  // useEffect更推荐下面这种写法
  useEffect(() => {
    const asyncFn = async () => {
      // 查询分类数据
      const resCategory = await getCategory();
      console.log(resCategory);
      
      if (resCategory.status === undefined) {
        setOptions(resCategory);
      }
      // 发送请求，获得商品详情
      if (editId !== undefined) {
        const response = await showGoods(editId);
        console.log('商品详情', response);
        console.log('商品详情:categort', response.category);
        // 获取数据之后，修改状态，状态改变，组件重新渲染，骨架屏消失，表单出现
        const {pid,id}=response.category
        let defaultCategory =[]
        if ( pid===0){
          defaultCategory=[id]
        }else {
          defaultCategory=[pid,id]
        }
        setinitialValues({...response,category_id: defaultCategory });
      }
    };
    asyncFn();
  }, []);

  // 文件上传成功后，设置cover字段的value
  const setCoverKey = (fileKey) => formObj.setFieldsValue({ cover: fileKey });

  // 编辑器输入内容后，设置details字段的value
  const setDetails = (content) => formObj.setFieldsValue({ details: content });
  

  // 提交表单,执行编辑或者添加
  const handleSubmit = async (values) => {
    console.log(values);

    let response = {};
    if (editId === undefined) {
      // 执行添加
      response = await addGoods({...values,category_id:values.category_id[1]});
    } else {
      // 执行编辑
      response = await updataGoods(editId, {...values,category_id:values.category_id[1]});
    }

    if (response.status === undefined) {
      message.success(`${type}成功`);
      // 刷新表格数据
      actionRef.current.reload();
      // 关闭模态框
      isShowModal(false);
    }
  };

  return (
    <Modal
      title={`${type}商品`}
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
          <ProForm
            form={formObj}
            onFinish={(values) => handleSubmit(values)}
            initialValues={initialValues}
          >
            <ProForm.Item
              name="category_id"
              label="分类"
              rules={[{ required: true, message: '请选择分类' }]}
            >
              <Cascader
                options={options}
                placeholder="请选择分类"
                fieldNames={{ value: 'id', label: 'name' }}
              />
            </ProForm.Item>

            <ProFormText
              name="title"
              label="昵称"
              placeholder="请输入昵称"
              rules={[{ required: true, message: '请输入昵称' }]}
            />

            <ProFormTextArea
              name="description"
              label="描述"
              placeholder="请输入描述"
              rules={[{ required: true, message: '请输入描述' }]}
            />

            <ProFormDigit
              name="price"
              label="价格"
              placeholder="请输入价格"
              min={0}
              max={9999}
              rules={[{ required: true, message: '请输入价格' }]}
            />

            <ProFormDigit
              name="stock"
              label="库存"
              placeholder="请输入库存"
              min={0}
              max={9999}
              rules={[{ required: true, message: '请输入库存' }]}
            />

            {/* <ProFormText name="cover" hidden={true}></ProFormText> */}

            <ProForm.Item
              name="cover"
              label="商品主图"
              rules={[{ required: true, message: '请上传商品主图' }]}
            >
              <div>
                {
                  editId===1 && initialValues.cover_url ? 
                  <Image width={200} src={initialValues.cover_url}></Image>
                  :''
                }<br/>
                <AliyunOSSUpload 
                  showUploadList={true} 
                  accept="image/*" 
                  setCoverKey={setCoverKey}
                >
                  <Button icon={<UploadOutlined />}>点击上传商品主图</Button>
                </AliyunOSSUpload>
              </div>
            </ProForm.Item>

            <ProForm.Item
              name="details"
              label="商品详情"
              rules={[{ required: true, message: '请输入商品详情' }]}
            >
              <div>
                <Editor 
                  setDetails={setDetails} 
                  content={editId===1 ? initialValues.details:''}
                />
              </div>
            </ProForm.Item>
          </ProForm>
        )
      }
    </Modal>
  );
};

export default CreatOrEdit;
