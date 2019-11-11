import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext
} from "react";
import EdUi from "./edUi";
import E from "wangeditor";
import { post, get } from "Common/axios.js";
import { message, Modal } from "antd";
import IPserver from "IPserver";

import { ReduxContext, setLoading, setWriteBoo } from "../../store/store";
const { confirm } = Modal;

export const WriteContext = createContext();

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

let editor;

const Write = props => {
  const { dispatch, getList } = props;
  const { currentId, currentType } = useContext(ReduxContext).state;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [articalTitle, setArticalTitle] = useState("");
  const [articalSummary, setArticalSummary] = useState("");
  const [articalKind, setArticalKind] = useState("React");
  const [count, setCount] = useState(0);
  const [selectList] = useState([
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
  ]);
  const [articalId, setArticalId] = useState("");
  const [isMusic, setIsMusic] = useState(false);
  const [musicCode, setMusicCode] = useState("");
  const editElem = useRef(null);

  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleChange = file => {
    setCount(count => count + 1);
    setFileList(file.fileList);
  };

  useEffect(() => {
    if (!isMusic) {
      initEditor();
      if (currentId !== null) {
        dispatch(setLoading(true));
        switch (currentType) {
          case "1":
            get(IPserver + "articals/getOneArtical.php", {
              articalid: currentId
            }).then(res => {
              setArticalTitle(res.title);
              setArticalSummary(res.summary);
              setArticalId(currentId);
              editor.txt.html(res.content);
              dispatch(setLoading(false));
            });
            break;
          case "2":
            get(IPserver + "journals/getOneJournal.php", {
              articalid: currentId
            }).then(res => {
              setArticalTitle(res.title);
              setArticalSummary(res.summary);
              setArticalId(currentId);
              editor.txt.html(res.content);
              dispatch(setLoading(false));
            });
            break;
          case "3":
            get(IPserver + "records/getOneRecord.php", {
              articalid: currentId
            }).then(res => {
              if (res.ismusic) {
                setIsMusic(true);
                setMusicCode(res.content);
              } else {
                setIsMusic(false);
                editor.txt.html(res.content);
              }
              setArticalId(currentId);
              dispatch(setLoading(false));
            });
            break;
          default:
            break;
        }
      } else {
        setArticalTitle("");
        setArticalSummary("");
        setArticalId("");
        editor.txt.html("");
      }
    }
  }, [isMusic]);

  const initEditor = () => {
    const elem = editElem.current;
    const newEditor = new E(elem);

    editor = newEditor;

    newEditor.customConfig.zIndex = 100;
    newEditor.customConfig.uploadImgServer =
      IPserver + "articals/uploadImg.php";
    newEditor.customConfig.uploadFileName = "file"; //文件名称  也就是你在后台接受的 参数值
    newEditor.customConfig.uploadImgMaxLength = 1; // 限制一次最多上传 1 张图片
    newEditor.customConfig.uploadImgShowBase64 = false; // 使用 base64 保存图片
    newEditor.customConfig.linkImgCallback = function(url) {
      console.log(url); // url 即插入图片的地址
    };
    newEditor.customConfig.menus = [
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
    newEditor.customConfig.lang = {
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
    newEditor.create();
  };

  const deleteOne = () => {
    let url;
    switch (currentType) {
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
          articalId: articalId
        }).then(res => {
          if (res) {
            message.success("删除成功");
            dispatch(setWriteBoo(false));
            getList();
          }
        });
      },
      onCancel() {},
      cancelText: "取消",
      okText: "确定"
    });
  };

  const submit = () => {
    let url, data;
    switch (currentType) {
      case "1":
        if (articalTitle === "") {
          message.warn("请输入标题");
          return;
        }
        if (articalSummary === "") {
          message.warn("请输入概述");
          return;
        }
        if (fileList.length === 0) {
          message.warn("请选择封面");
          return;
        }
        if (editor.txt.html() === "<p><br></p>") {
          message.warn("请输入文章内容");
          return;
        }
        url = IPserver + "articals/operationArtical.php";
        data = {
          articalId: articalId,
          title: articalTitle,
          summary: articalSummary,
          kind: articalKind,
          coverImg: fileList[0].response.data[0],
          content: editor.txt.html(),
          username: props.username
        };
        break;
      case "2":
        if (articalTitle === "") {
          message.warn("请输入标题");
          return;
        }
        if (articalSummary === "") {
          message.warn("请输入概述");
          return;
        }
        if (fileList.length === 0) {
          message.warn("请选择封面");
          return;
        }
        if (editor.txt.html() === "<p><br></p>") {
          message.warn("请输入文章内容");
          return;
        }
        url = IPserver + "journals/operationJournal.php";
        data = {
          articalId: articalId,
          title: articalTitle,
          summary: articalSummary,
          coverImg: fileList[0].response.data[0],
          content: editor.txt.html(),
          username: props.username
        };
        break;
      case "3":
        if (isMusic) {
          if (musicCode === "") {
            message.warn("请输入代码");
            return;
          }
          data = {
            articalId: articalId,
            content: musicCode,
            ismusic: true,
            username: props.username
          };
        } else {
          if (editor.txt.html() === "<p><br></p>") {
            message.warn("请输入文章内容");
            return;
          }
          data = {
            articalId: articalId,
            content: editor.txt.html(),
            ismusic: false,
            username: props.username
          };
        }
        url = IPserver + "records/operationRecord.php";
        break;
      default:
        break;
    }
    post(url, data).then(res => {
      if (res) {
        if (articalId !== "") {
          message.success("更新成功");
        } else {
          message.success("发布成功");
        }
        dispatch(setWriteBoo(false));
        getList();
      }
    });
  };

  return (
    <WriteContext.Provider
      value={{
        previewVisible,
        previewImage,
        fileList,
        articalTitle,
        articalSummary,
        articalKind,
        selectList,
        articalId,
        editElem,
        submit,
        currentType,
        handleChange,
        handleCancel,
        handlePreview,
        count,
        musicCode,
        isMusic,
        changeTitle: e => {
          setArticalTitle(e.target.value);
        },
        changeSummary: e => {
          setArticalSummary(e.target.value);
        },
        changeKind: e => {
          setArticalKind(e.target.value);
        },
        changeMusicCode: e => {
          setMusicCode(e.target.value);
        },
        changeType: () => {
          setIsMusic(boo => {
            return !boo;
          });
        },
        cancel: () => {
          dispatch(setWriteBoo(false));
          getList();
        },
        deleteOne
      }}
    >
      <EdUi />
    </WriteContext.Provider>
  );
};

export default Write;
