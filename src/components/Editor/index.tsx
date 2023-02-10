import React from 'react';
// 引入编辑器组件
import BraftEditor  from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import './index.less';
import AliyunOSSUpload from '../AliyunOSSUpload';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { ContentUtils } from 'braft-utils'


export default class Editor extends React.Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(this.props.content ?? null),
  };

  // 更新编辑器的状态
  handleEditorChange = (editorState) => {
    this.setState({ editorState });

    // 判断输入的内容是否为空（<p></p>）
    console.log(editorState.isEmpty());
    if (editorState.isEmpty() === false) {
      // 获取内容（HTML格式）
      const content = editorState.toHTML();
      // 调用父组件的方法，将编辑器输入的内容传递回去
      console.log(content);
      this.props.setDetails(content);
    } else {
      this.props.setDetails('');
    }
  };

  // insertImage =(url)=>{
  //   this.setState({
  //     editorState: ContentUtils.insertMedias(this.state.editorState, [{
  //       type: 'IMAGE',
  //       url
  //     }])
  //   })
  // }

  render() {
    const { editorState } = this.state;

    // 自定义控件---插入图片
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
            <AliyunOSSUpload 
                showUploadList={false} 
                accept="image/*" 
                // insertImage={this.insertImage}
            >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              插入图片
            </button>
          </AliyunOSSUpload>
        ),
      },
    ];

    return (
      <div className="my-edit">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          extendControls={extendControls}
          // onSave={this.submitContent}
        />
      </div>
    );
  }
}
