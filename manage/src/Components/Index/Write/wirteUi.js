import React, { Component,Fragment } from 'react';
import { Button,Input,Upload,Modal,Icon,Select } from 'antd'
import IPserver from 'IPserver';
class IndexUi extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        const props = this.props
        const { previewVisible, previewImage, fileList, articalTitle, articalSummary,articalKind,selectList } = props.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">上传封面</div>
          </div>
        );
        const list = selectList.map((item,index)=>{
          return (
            <Select.Option value={item} key={index}>{item}</Select.Option>
          )
        })
        return ( 
            <Fragment>
                <div className="input">
                    <Input 
                        addonBefore="标题"
                        value={articalTitle}
                        onChange={props.changeTitle}
                     />
                </div>
                <div className="input">
                    <Input.TextArea 
                        placeholder="请输入概述"
                        value={articalSummary}
                        onChange={props.changeSummary}
                        autosize={{ minRows: 3, maxRows: 6 }} />
                </div>
                <div className="input">
                    <Upload
                        action={IPserver + "articals/uploadImg.php"}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={props.handlePreview}
                        onChange={props.handleChange}
                        >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={props.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
                <div className="input" ref={r=>this.editorElem = r} style={{ textAlign: 'left' }} />
                <div className="input">
                <Select defaultValue={articalKind} style={{ width: 200 }} onChange={props.changeKind}>
                    {list}
                </Select>
                </div>
                <Button className="submit" type="primary" onClick={this.props.submit}>发布</Button>
            </Fragment>
         );
    }
}
 
export default IndexUi;
