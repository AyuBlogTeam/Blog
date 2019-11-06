import React, { Component, Fragment } from "react";
import EdUi from "./edUi";
import E from "wangeditor";
import { post, get } from "Common/axios.js";
import { message, Modal } from "antd";
import IPserver from "IPserver";

import { setLoading, setWriteBoo, getList } from "store/actionCreators";
import { connect } from "react-redux";

const { confirm } = Modal;

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
      previewImage: "",
      fileList: [],
      articalTitle: "",
      articalSummary: "",
      articalKind: "React",
      selectList: [
        "React",
        "Vue",
        "Angular",
        "PHP",
        "Java",
        "Python",
        "Javascript",
        "CSS",
        "TypeScript",
        "杂七杂八"
      ],
      articalId: ""
    };
  }

  handleCancel = () =>
    this.setState({
      previewVisible: false
    });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({
      fileList
    });
  };

  componentDidMount() {
    this.initEditor();
    if (this.props.currentId !== null) {
      this.props.setLoading(true);
      switch (this.props.currentType) {
        case "1":
          get(IPserver + "articals/getOneArtical.php", {
            articalid: this.props.currentId
          }).then(res => {
            this.setState({
              articalTitle: res.title,
              articalSummary: res.summary,
              articalId: this.props.currentId
            });
            this.editor.txt.html(res.content);
            this.props.setLoading(false);
          });
          break;
        case "2":
          get(IPserver + "journals/getOneJournal.php", {
            articalid: this.props.currentId
          }).then(res => {
            this.setState({
              articalTitle: res.title,
              articalSummary: res.summary,
              articalId: this.props.currentId
            });
            this.editor.txt.html(res.content);
            this.props.setLoading(false);
          });
          break;
        case "3":
          get(IPserver + "records/getOneRecord.php", {
            articalid: this.props.currentId
          }).then(res => {
            this.setState({
              articalId: this.props.currentId
            });
            this.editor.txt.html(res.content);
            this.props.setLoading(false);
          });
          break;
        default:
          break;
      }
    } else {
      this.setState({
        articalId: "",
        articalTitle: "",
        articalSummary: ""
      });
      this.editor.txt.html("");
    }
  }

  initEditor() {
    const elem = this.child.editorElem;
    const editor = new E(elem);

    this.editor = editor;

    editor.customConfig.zIndex = 100;
    editor.customConfig.uploadImgServer = IPserver + "articals/uploadImg.php";
    editor.customConfig.uploadFileName = "file"; //文件名称  也就是你在后台接受的 参数值
    editor.customConfig.uploadImgMaxLength = 1; // 限制一次最多上传 1 张图片
    editor.customConfig.uploadImgShowBase64 = false; // 使用 base64 保存图片
    editor.customConfig.linkImgCallback = function(url) {
      console.log(url); // url 即插入图片的地址
    };
    editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    editor.customConfig.lang = {
      设置标题: "Title",
      字号: "Size",
      文字颜色: "Color",
      设置列表: "List",
      有序列表: "",
      无序列表: "",
      对齐方式: "Align",
      靠左: "",
      居中: "",
      靠右: "",
      正文: "p",
      链接文字: "link text",
      链接: "link",
      上传图片: "Upload",
      网络图片: "Web",
      图片link: "image url",
      插入视频: "Video",
      格式如: "format",
      上传: "Upload",
      创建: "init"
    };
    editor.create();
  }

  changeTitle(e) {
    this.setState({
      articalTitle: e.target.value
    });
  }

  changeSummary(e) {
    this.setState({
      articalSummary: e.target.value
    });
  }

  changeKind(value) {
    this.setState({
      articalKind: value
    });
  }

  delete() {
    let that = this;
    let url;
    switch (this.props.currentType) {
      case "1":
        url = IPserver + "articals/deleteArtical.php";
        break;
      case "2":
        url = IPserver + "journals/deleteJournal.php";
        break;
      case "3":
        url = IPserver + "records/deleteRecord.php";
        break;
      default:
        break;
    }
    confirm({
      title: "警告",
      content: "确定要删除这篇博客吗？（删除后不可恢复）",
      onOk() {
        get(url, {
          articalId: that.state.articalId
        }).then(res => {
          if (res) {
            message.success("删除成功");
            that.props.setWriteBoo(that.props.currentType);
          }
        });
      },
      onCancel() {},
      cancelText: "取消",
      okText: "确定"
    });
  }

  submit() {
    let url, data;
    switch (this.props.currentType) {
      case "1":
        if (this.state.articalTitle === "") {
          message.warn("请输入标题");
          return;
        }
        if (this.state.articalSummary === "") {
          message.warn("请输入概述");
          return;
        }
        if (this.state.fileList.length === 0) {
          message.warn("请选择封面");
          return;
        }
        if (this.editor.txt.html() === "<p><br></p>") {
          message.warn("请输入文章内容");
          return;
        }
        url = IPserver + "articals/operationArtical.php";
        data = {
          articalId: this.state.articalId,
          title: this.state.articalTitle,
          summary: this.state.articalSummary,
          kind: this.state.articalKind,
          coverImg: this.state.fileList[0].response.data[0],
          content: this.editor.txt.html(),
          username: this.props.username
        };
        break;
      case "2":
        if (this.state.articalTitle === "") {
          message.warn("请输入标题");
          return;
        }
        if (this.state.articalSummary === "") {
          message.warn("请输入概述");
          return;
        }
        if (this.state.fileList.length === 0) {
          message.warn("请选择封面");
          return;
        }
        if (this.editor.txt.html() === "<p><br></p>") {
          message.warn("请输入文章内容");
          return;
        }
        url = IPserver + "journals/operationJournal.php";
        data = {
          articalId: this.state.articalId,
          title: this.state.articalTitle,
          summary: this.state.articalSummary,
          coverImg: this.state.fileList[0].response.data[0],
          content: this.editor.txt.html(),
          username: this.props.username
        };
        break;
      case "3":
        if (this.editor.txt.html() === "<p><br></p>") {
          message.warn("请输入文章内容");
          return;
        }
        url = IPserver + "records/operationRecord.php";
        data = {
          articalId: this.state.articalId,
          content: this.editor.txt.html(),
          username: this.props.username
        };
        break;
      default:
        break;
    }
    post(url, data).then(res => {
      if (res) {
        if (this.state.articalId !== "") {
          message.success("更新成功");
        } else {
          message.success("发布成功");
        }
        this.props.setWriteBoo(this.props.currentType);
      }
    });
  }

  render() {
    return (
      <Fragment>
        <EdUi
          ref={r => (this.child = r)}
          submit={this.submit.bind(this)}
          state={this.state}
          currentType={this.props.currentType}
          handleChange={this.handleChange.bind(this)}
          handleCancel={this.handleCancel.bind(this)}
          handlePreview={this.handlePreview.bind(this)}
          changeTitle={this.changeTitle.bind(this)}
          changeSummary={this.changeSummary.bind(this)}
          changeKind={this.changeKind.bind(this)}
          cancel={() => this.props.setWriteBoo(this.props.currentType)}
          delete={this.delete.bind(this)}
        />
      </Fragment>
    );
  }
}

const stateToProps = state => {
  return {
    loading: state.loading,
    currentId: state.currentId,
    currentType: state.currentType
  };
};

const dispatchToProps = dispatch => {
  return {
    setLoading(boo) {
      const action = setLoading(boo);
      dispatch(action);
    },
    setWriteBoo(index) {
      const action = setWriteBoo(false);
      dispatch(action);
      const list = getList(index);
      dispatch(list);
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Write);
