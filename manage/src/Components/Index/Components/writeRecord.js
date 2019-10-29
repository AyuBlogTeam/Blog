import React, { Component,Fragment } from 'react';
import WriteRecordUi from 'Components/Public/editor.js';
import E from 'wangeditor'
import {
  post,get
} from 'Common/axios.js'
import {
  message,
  Modal
} from 'antd'
import IPserver from 'IPserver';

const { confirm } = Modal;

class WriteRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articalId:""
    }
  }

  componentDidMount() {
    this.initEditor()
    if(this.props.recordId !== ""){
      this.props.loading(true)
      get(IPserver + "records/getOneRecord.php",{
        articalid:this.props.recordId
      }).then((res)=>{
        this.setState({
          articalId:this.props.recordId
        })
        this.editor.txt.html(res.content)
        this.props.loading(false)
      }).catch((error)=>{
        message.error("获取数据失败")
        this.props.loading(false)
      })
    }else{
      this.setState({
        articalId:""
      })
    }
  }

  initEditor() {
    const elem = this.child.editorElem
    const editor = new E(elem)

    this.editor = editor

    editor.customConfig.zIndex = 100
    editor.customConfig.uploadImgServer = IPserver + "lifes/uploadImg.php"
    editor.customConfig.uploadFileName = "file"; //文件名称  也就是你在后台接受的 参数值
    editor.customConfig.uploadImgMaxLength = 1 // 限制一次最多上传 1 张图片
    editor.customConfig.uploadImgShowBase64 = false // 使用 base64 保存图片
    editor.customConfig.linkImgCallback = function (url) {
      console.log(url) // url 即插入图片的地址
    }
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    editor.customConfig.lang = {
      '设置标题': 'Title',
      '字号': 'Size',
      '文字颜色': 'Color',
      '设置列表': 'List',
      '有序列表': '',
      '无序列表': '',
      '对齐方式': 'Align',
      '靠左': '',
      '居中': '',
      '靠右': '',
      '正文': 'p',
      '链接文字': 'link text',
      '链接': 'link',
      '上传图片': 'Upload',
      '网络图片': 'Web',
      '图片link': 'image url',
      '插入视频': 'Video',
      '格式如': 'format',
      '上传': 'Upload',
      '创建': 'init'
    }
    editor.create()
  }

  delete(){
    let that = this;
    confirm({
      title: '警告',
      content: '确定要删除这篇博客吗？（删除后不可恢复）',
      onOk() {
        get(IPserver + "records/deleteRecord.php",{
          articalId:that.state.articalId
        }).then((res)=>{
          if(res){
            message.success("删除成功")
            that.props.cancel()
          }
        }).catch(()=>{
          message.error("删除失败")
        })
      },
      onCancel() {},
      cancelText:"取消",
      okText:"确定"
    });
  }

  submit() {
    if (this.editor.txt.html() === "<p><br></p>") {
      message.warn("请输入文章内容")
      return
    }

    post(IPserver + "records/operationRecord.php", {
      articalId:this.state.articalId,
      content: this.editor.txt.html(),
      username: this.props.username
    }).then((res) => {
      if (res) {
        if(this.state.articalId !== ""){
          message.success("更新成功")
        }else{
          message.success("发布成功")
        }
        this.props.cancel()
      }
    }).catch((err) => {
      if(this.state.articalId !== ""){
        message.error("更新失败")
      }else{
        message.error("发布失败")
      }
    })
  }

  render() {
    return ( 
      <Fragment>
        <WriteRecordUi
          ref = {r => this.child = r}
          submit = {this.submit.bind(this)}
          state = {this.state}
          cancel={this.props.cancel}
          delete={this.delete.bind(this)}
        /> 
      </Fragment>
    );
  }
}

export default WriteRecord;