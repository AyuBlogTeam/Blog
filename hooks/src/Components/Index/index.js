import React, { useState, useEffect, useContext } from "react";
import Loading from "../Public/loading";
import Common from "./common";

import Ed from "Components/Public/ed/ed";
import List from "Components/Public/list";
import Table from "Components/Public/table";
import IPserver from "IPserver";
import { get } from "Common/axios.js";
import { message, Modal, Input } from "antd";

import {
  ReduxContext,
  ReduxData,
  setWriteBoo,
  setLoading,
  setList
} from "../store/store";

const { confirm } = Modal;

const Index = () => {
  return (
    <ReduxData>
      <IndexChildren />
    </ReduxData>
  );
};

const IndexChildren = props => {
  const { list, loading, writeBoo } = useContext(ReduxContext).state;
  const { dispatch } = useContext(ReduxContext);
  const [rightWidth, setRightWidth] = useState("calc(100% - 242px)");
  const [rightLeft, setRightLeft] = useState("242px");
  const [username] = useState("阿鱼");
  const [currentComponent, setCurrentComponent] = useState("1");
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [total, setTotal] = useState(0);
  const [columns, setColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({
    title: "新增",
    visible: false
  });
  const [live2dValue, setLive2dValue] = useState("");

  useEffect(() => {
    window.router = props.history;
  }, []);

  useEffect(() => {
    if (
      currentComponent === "4" ||
      currentComponent === "5" ||
      currentComponent === "6"
    ) {
      getTableInfo();
    } else {
      dispatch(setWriteBoo(false));
      getList(currentComponent);
    }
  }, [currentComponent]);

  const getList = index => {
    dispatch(setLoading(true));
    let url = "";
    switch (index) {
      case "1":
        url = IPserver + "articals/getArtical.php";
        get(url).then(res => {
          dispatch(setList(res));
          dispatch(setLoading(false));
        });
        break;
      case "2":
        url = IPserver + "journals/getJournal.php";
        get(url).then(res => {
          dispatch(setList(res));
          dispatch(setLoading(false));
        });
        break;
      case "3":
        url = IPserver + "records/getRecord.php";
        get(url).then(res => {
          if (res.length !== 0) {
            let list = [];
            res.map(item => {
              if (item.content.length >= 30) {
                item.title = item.content.substr(0, 30) + "...";
              } else {
                item.title = item.content;
              }
              list.push(item);
              return item;
            });
            dispatch(setList(res));
          } else {
            dispatch(setList([]));
          }
          dispatch(setLoading(false));
        });
        break;
      default:
        break;
    }
  };

  const changeWidth = boo => {
    if (!boo) {
      setRightWidth("calc(100% - 242px)");
      setRightLeft("242px");
    } else {
      setRightWidth("calc(100% - 80px)");
      setRightLeft("80px");
    }
  };
  const addLive2d = () => {
    setModal({
      title: "新增看板娘语录",
      visible: true
    });
    setLive2dValue("");
  };
  const submitLive2d = () => {
    if (live2dValue === "") {
      message.warning("请输入内容");
      return;
    }
    get(IPserver + "live2d/addLive2d.php", {
      content: live2dValue
    }).then(res => {
      if (res) {
        message.success("新增成功");
        getTableInfo();
        setModal({
          title: "",
          visible: false
        });
      }
    });
  };
  const deleteTableData = key => {
    let data;
    if (key === "all") {
      if (selectedRowKeys.length === 0) {
        message.warning("请选择行");
        return;
      } else {
        data = selectedRowKeys.join(",");
      }
    } else {
      data = key;
    }
    let url;
    let content;
    switch (currentComponent) {
      case "4":
        url = IPserver + "visitor/deleteVisitor.php";
        content = "确定要删除选择的访客记录吗？（删除后不可恢复）";
        break;
      case "5":
        url = IPserver + "live2d/deleteLive2d.php";
        content = "确定要删除选择的内容吗？（删除后不可恢复）";
        break;
      case "6":
        url = IPserver + "feedback/deleteFeedback.php";
        content = "确定要删除选择的反馈吗？（删除后不可恢复）";
        break;
      default:
        break;
    }
    confirm({
      title: "警告",
      content: content,
      onOk() {
        get(url, {
          id: data
        }).then(res => {
          if (res) {
            message.success("删除成功");
            getTableInfo();
            setCurrentPage(1);
          }
        });
      },
      onCancel() {},
      cancelText: "取消",
      okText: "确定"
    });
  };
  const getTableInfo = (page = 1) => {
    let url;
    switch (currentComponent) {
      case "4":
        url = IPserver + "visitor/getVisitor.php";
        setColumns([
          {
            title: "IP",
            dataIndex: "cip",
            key: "cip",
            align: "center"
          },
          {
            title: "城市",
            dataIndex: "cname",
            key: "cname",
            align: "center"
          },
          {
            title: "城市代码",
            dataIndex: "cid",
            key: "cid",
            align: "center"
          },
          {
            title: "来访时间",
            dataIndex: "time",
            key: "time",
            align: "center"
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: text => {
              return (
                <span
                  className="deleteBtn"
                  onClick={() => deleteTableData(text.key)}
                >
                  删除
                </span>
              );
            }
          }
        ]);
        break;
      case "5":
        url = IPserver + "live2d/getLive2d.php";
        setColumns([
          {
            title: "编号",
            dataIndex: "key",
            key: "key",
            align: "center"
          },
          {
            title: "内容",
            dataIndex: "content",
            key: "content",
            align: "center"
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: text => {
              return (
                <span
                  className="deleteBtn"
                  onClick={() => deleteTableData(text.key)}
                >
                  删除
                </span>
              );
            }
          }
        ]);
        break;
      case "6":
        url = IPserver + "feedback/getFeedback.php";
        setColumns([
          {
            title: "编号",
            dataIndex: "key",
            key: "key",
            align: "center"
          },
          {
            title: "内容",
            dataIndex: "content",
            key: "content",
            align: "center"
          },
          {
            title: "时间",
            dataIndex: "time",
            key: "time",
            align: "center"
          },
          {
            title: "IP",
            dataIndex: "ip",
            key: "ip",
            align: "center"
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: text => {
              return (
                <span
                  className="deleteBtn"
                  onClick={() => deleteTableData(text.key)}
                >
                  删除
                </span>
              );
            }
          }
        ]);
        break;
      default:
        break;
    }
    dispatch(setLoading(true));
    get(url, {
      from: (page - 1) * 10
    }).then(res => {
      setTableData(res.data);
      setTotal(Number(res.total));
      setCurrentPage(page);
      dispatch(setLoading(false));
    });
  };
  let rightMain = null;
  if (
    currentComponent === "1" ||
    currentComponent === "2" ||
    currentComponent === "3"
  ) {
    if (!writeBoo) {
      rightMain = (
        <List list={list} current={currentComponent} dispatch={dispatch} />
      );
    } else {
      rightMain = (
        <Ed
          username={username}
          dispatch={dispatch}
          getList={() => getList(currentComponent)}
        />
      );
    }
  } else {
    rightMain = (
      <Table
        tableData={tableData}
        total={total}
        columns={columns}
        currentPage={currentPage}
        selectedRowKeys={selectedRowKeys}
        currentComponent={currentComponent}
        changePage={item => {
          getTableInfo(item.current);
        }}
        addLive2d={addLive2d}
        onSelectChange={item => {
          setSelectedRowKeys(item);
        }}
        deleteData={deleteTableData}
      />
    );
  }
  return (
    <>
      <Common
        changeWidth={changeWidth}
        checkMenu={item => {
          setCurrentComponent(item.key);
        }}
      />
      <div id="rightMain" style={{ width: rightWidth, left: rightLeft }}>
        {rightMain}
      </div>
      {loading ? <Loading /> : null}
      <Modal
        title={modal.title}
        visible={modal.visible}
        onOk={submitLive2d}
        onCancel={() => {
          setModal({
            title: "",
            visible: false
          });
        }}
        okText="确定"
        cancelText="取消"
      >
        <Input
          value={live2dValue}
          onChange={e => {
            setLive2dValue(e.target.value);
          }}
          placeholder="请输入内容"
        />
      </Modal>
    </>
  );
};

export default Index;
