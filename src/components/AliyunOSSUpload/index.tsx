import React from 'react';
import {  Upload, message } from 'antd';
import { ossConfig } from '@/services/common';

export default class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  // 组件挂载完成后，进行初始化，获取oss的配置
  async componentDidMount() {
    await this.init();
  }

  // 初始化获取OSS上传签名  
  init = async () => {
    try {
      const OSSData = await ossConfig();
      // console.log(OSSData);
      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  
  // 文件上传过程中触发的回调函数，直到上传完成
  onChange = ({ file }) => {
    console.log('Aliyun OSS:', file);
    if (file.status==='done'){
      // 文件上传成功后，把文件的key设置为表单某个字段的值
      if(this.props.setCoverKey){
        this.props.setCoverKey(file.key)
      }
      // 上传完成后如果需要url，那么返回url
      // if(this.props.insertImage){
      //   this.props.insertImage(file.url)
      // }
      message.success('上传成功')
    } 
  };


  // 获取额外的上传参数
  getExtraData = file => {
    const { OSSData } = this.state;

    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  // 选择文件之后，上传之前，执行的回调
  beforeUpload = async file => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    // 如果签名过期了，重新获取
    if (expire < Date.now()) {
      await this.init();
    }

    const dir='react/'  // 定义一个上传的目录

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename =  Date.now() + suffix;
    file.key =  OSSData.dir + dir + suffix;// 在getExtraData函数中会用到，在云存储中存储文件的key
    file.url =OSSData.host + OSSData.dir + dir + filename;// 上传完成后，用于显示内容

    return file;
  };

  render() {
    const { value,accept,showUploadList } = this.props;
    const props = {
      accept:accept||'',
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      listType:'picture',
      maxCount:1,
      showUploadList,
    };
    return (
      <Upload {...props} >
        {this.props.children}
      </Upload>
    );
  }
}

