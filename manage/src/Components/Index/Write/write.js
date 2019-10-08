import React, { Component,Fragment } from 'react';
import WriteUi from './wirteUi';
import E from 'wangeditor'
import { post } from 'Common/axios.js'
import { message } from 'antd'
import IPserver from 'IPserver';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

class Write extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            previewVisible: false,
            previewImage: '',
            fileList: [],
            articalTitle:"",
            articalSummary:"",
            articalKind:"React"
         }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };
  
    handleChange = ({ fileList }) => this.setState({ fileList });

    componentDidMount () {
        this.initEditor()
    }

    initEditor () {
        const elem = this.child.editorElem
        const editor = new E(elem)
        
        this.editor = editor

        editor.customConfig.zIndex = 100
        editor.customConfig.uploadImgServer = "http://localhost:8081/uploadImg.php"
        editor.customConfig.uploadFileName = "file";//文件名称  也就是你在后台接受的 参数值
        editor.customConfig.uploadImgMaxLength = 1  // 限制一次最多上传 1 张图片
        editor.customConfig.uploadImgShowBase64 = false   // 使用 base64 保存图片
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

    changeTitle(e){
        this.setState({
            articalTitle:e.target.value
        })
    }

    changeSummary(e){
        this.setState({
            articalSummary:e.target.value
        })
    }

    changeKind(value){
        this.setState({
            articalKind:value
        })
    }

    submit(){
        if(this.state.articalTitle === ""){
            message.warn("请输入标题")
            return
        }
        if(this.state.articalSummary === ""){
            message.warn("请输入概述")
            return
        }
        if(this.state.fileList.length === 0){
            message.warn("请选择封面")
            return
        }
        if(this.editor.txt.html() === "<p><br></p>"){
            message.warn("请输入文章内容")
            return
        }
        
        post(IPserver + "articals/addartical.php",{
            title:this.state.articalTitle,
            summary:this.state.articalSummary,
            kind:this.state.articalKind,
            coverImg:this.state.fileList[0].response.data[0],
            content:this.editor.txt.html(),
            username:this.props.username
        }).then((res)=>{
            if(res){
                message.success("发布成功")
                this.editor.txt.clear()
                this.setState({
                    articalTitle:"",
                    articalSummary:"",
                    fileList:[]
                })
            }
        }).catch((err)=>{
            message.error("发布失败")
        })
    }

    render() { 
        return ( 
            <Fragment>
                <WriteUi 
                    ref={r => this.child = r}
                    submit={this.submit.bind(this)}
                    state={this.state}
                    handleChange={this.handleChange.bind(this)}
                    handleCancel={this.handleCancel.bind(this)}
                    handlePreview={this.handlePreview.bind(this)}
                    changeTitle={this.changeTitle.bind(this)}
                    changeSummary={this.changeSummary.bind(this)}
                    changeKind={this.changeKind.bind(this)}
                />
            </Fragment>
         );
    }
}
 
export default Write;