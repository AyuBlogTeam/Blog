import React, { Component, Fragment } from "react";
import Loading from "../Public/loading";
import Common from "./common";

import Ed from "Components/Public/ed/ed";
import List from "Components/Public/list";
import Table from "Components/Public/table";
import IPserver from "IPserver";
import { get } from "Common/axios.js";
import { message, Modal, Input } from "antd";

import { getList, setLoading, setWriteBoo } from "store/actionCreators";
import { connect } from "react-redux";

const { confirm } = Modal;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightWidth: "calc(100% - 242px)", //右侧宽度
      rightLeft: "242px", //右侧距左侧距离
      username: "阿鱼", //用户名
      currentComponent: "1", //当前菜单
      tableData: [], //表格数据
      selectedRowKeys: [], //表格选择行
      total: 0, //表格总数据
      columns: [], //表格头部信息
      currentPage: 1, //表格当前页码
      modal: {
        title: "新增",
        visible: false
      }, //modal数据
      live2dValue: "" //新增live2d内容
    };
  }

  // 组件挂载后
  componentDidMount() {
    //将路由对象赋值给window对象方便axios判断时调用
    window.router = this.props.history;
    this.props.getList(this.state.currentComponent);
  }

  //改变宽度
  changeWidth(boo) {
    if (!boo) {
      this.setState({
        rightWidth: "calc(100% - 242px)",
        rightLeft: "242px"
      });
    } else {
      this.setState({
        rightWidth: "calc(100% - 80px)",
        rightLeft: "80px"
      });
    }
  }

  // 新增Live2d内容
  addLive2d() {
    this.setState({
      modal: {
        title: "新增看板娘语录",
        visible: true
      },
      live2dValue: ""
    });
  }

  // 新增live2d内容切换触发事件
  changeLive2d(e) {
    this.setState({
      live2dValue: e.target.value
    });
  }

  // 提交新增live2d内容
  submitLive2d() {
    if (this.state.live2dValue === "") {
      message.warning("请输入内容");
      return;
    }
    get(IPserver + "live2d/addLive2d.php", {
      content: this.state.live2dValue
    }).then(res => {
      if (res) {
        message.success("新增成功");
        this.getTableInfo();
        this.setState({
          modal: {
            title: "",
            visible: false
          }
        });
      }
    });
  }

  // 关闭模态框
  closeModal() {
    this.setState({
      modal: {
        title: "",
        visible: false
      }
    });
  }

  // 选择菜单
  checkMenu(item) {
    this.setState(
      {
        currentComponent: item.key
      },
      () => {
        if (
          this.state.currentComponent === "4" ||
          this.state.currentComponent === "5" ||
          this.state.currentComponent === "6"
        ) {
          this.getTableInfo();
        } else {
          this.props.setWriteBoo();
          this.props.getList(this.state.currentComponent);
        }
      }
    );
  }

  // 表格分页切换
  changeTablePage(item) {
    this.getTableInfo(item.current);
  }

  // 删除表格数据
  deleteTableData(key) {
    let data;
    if (key === "all") {
      if (this.state.selectedRowKeys.length === 0) {
        message.warning("请选择行");
        return;
      } else {
        data = this.state.selectedRowKeys.join(",");
      }
    } else {
      data = key;
    }
    let url;
    let content;
    switch (this.state.currentComponent) {
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
    let that = this;
    confirm({
      title: "警告",
      content: content,
      onOk() {
        get(url, {
          id: data
        }).then(res => {
          if (res) {
            message.success("删除成功");
            that.getTableInfo();
            that.setState({
              currentPage: 1,
              selectedRowKeys: []
            });
          }
        });
      },
      onCancel() {},
      cancelText: "取消",
      okText: "确定"
    });
  }

  // 多选编辑操作
  onSelectTableChange(item) {
    this.setState({
      selectedRowKeys: item
    });
  }

  // 获取表格数据
  getTableInfo(page = 1) {
    let url;
    switch (this.state.currentComponent) {
      case "4":
        url = IPserver + "visitor/getVisitor.php";
        this.setState({
          columns: [
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
                    onClick={() => this.deleteTableData(text.key)}
                  >
                    删除
                  </span>
                );
              }
            }
          ]
        });
        break;
      case "5":
        url = IPserver + "live2d/getLive2d.php";
        this.setState({
          columns: [
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
              title: "作者",
              dataIndex: "author",
              key: "author",
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
                    onClick={() => this.deleteTableData(text.key)}
                  >
                    删除
                  </span>
                );
              }
            }
          ]
        });
        break;
      case "6":
        url = IPserver + "feedback/getFeedback.php";
        this.setState({
          columns: [
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
                    onClick={() => this.deleteTableData(text.key)}
                  >
                    删除
                  </span>
                );
              }
            }
          ]
        });
        break;
      default:
        break;
    }
    this.props.setLoading(true);
    get(url, {
      from: (page - 1) * 10
    }).then(res => {
      this.setState({
        tableData: res.data,
        total: Number(res.total),
        currentPage: page
      });
      this.props.setLoading(false);
    });
  }

  // 渲染页面
  render() {
    const {
      rightWidth,
      rightLeft,
      username,
      currentComponent,
      modal,
      live2dValue
    } = this.state;
    const { list, loading, writeBoo } = this.props;
    let rightMain = null;
    if (
      currentComponent === "1" ||
      currentComponent === "2" ||
      currentComponent === "3"
    ) {
      if (!writeBoo) {
        rightMain = <List list={list} current={currentComponent} />;
      } else {
        rightMain = <Ed username={username} />;
      }
    } else {
      rightMain = (
        <Table
          state={this.state}
          changePage={this.changeTablePage.bind(this)}
          addLive2d={this.addLive2d.bind(this)}
          onSelectChange={this.onSelectTableChange.bind(this)}
          deleteData={this.deleteTableData.bind(this)}
        />
      );
    }
    return (
      <Fragment>
        <Common
          changeWidth={this.changeWidth.bind(this)}
          checkMenu={this.checkMenu.bind(this)}
        />
        <div id="rightMain" style={{ width: rightWidth, left: rightLeft }}>
          {rightMain}
        </div>
        {loading ? <Loading /> : null}
        <Modal
          title={modal.title}
          visible={modal.visible}
          onOk={this.submitLive2d.bind(this)}
          onCancel={this.closeModal.bind(this)}
          okText="确定"
          cancelText="取消"
        >
          <Input
            value={live2dValue}
            onChange={this.changeLive2d.bind(this)}
            placeholder="请输入内容"
          />
        </Modal>
      </Fragment>
    );
  }
}

const stateToProps = state => {
  return {
    list: state.list,
    loading: state.loading,
    writeBoo: state.writeBoo
  };
};

const dispatchToProps = dispatch => {
  return {
    getList(index) {
      const action = getList(index);
      dispatch(action);
    },
    setLoading(boo) {
      const action = setLoading(boo);
      dispatch(action);
    },
    setWriteBoo() {
      const action = setWriteBoo(false);
      dispatch(action);
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Index);
