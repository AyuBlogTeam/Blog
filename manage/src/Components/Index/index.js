import React, { Component,Fragment } from 'react';
import Loading from '../Public/loading'
import Common from './common'
import WriteArtical from './WriteArtical/writeArtical'
import ArticalList from './ArticalList/articalList'

import WriteLifeArtical from './WriteLifeArtical/writeLifeArtical'
import LifeArticalList from './LifeArticalList/lifeArticalList'

import WriteRecord from './WriteRecord/writeRecord'
import RecordList from './RecordList/recordList'

import Table from 'Components/Public/table'
import IPserver from 'IPserver';
import {
    get
} from 'Common/axios.js'
import {
    message,
    Modal,
    Input
} from 'antd'
const { confirm } = Modal;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightWidth:"calc(100% - 242px)", //右侧宽度
            rightLeft:"242px", //右侧距左侧距离
            username:"阿鱼", //用户名
            articalId:"", //文章详情id
            isArticalList:true, //是否显示文章列表
            isLifeArticalList:true, //是否显示记录列表
            isRecord:true, //是否显示记录列表
            loading:false, //加载状态
            currentComponent:"1", //当前菜单
            tableData:[], //表格数据
            selectedRowKeys:[], //表格选择行
            total:0, //表格总数据
            columns:[], //表格头部信息
            currentPage:1, //表格当前页码
            modal:{
              title:"新增",
              visible:false
            }, //modal数据
            live2dValue:"", //新增live2d内容
            lifeArticalId:"", //生活日志详情id
            recordId:"" //记录详情id
        }
    }

    // 组件挂载后
    componentDidMount(){
      //将路由对象赋值给window对象方便axios判断时调用
      window.router = this.props.history;
    }

    //改变宽度
    changeWidth(boo){
      if(!boo){
        this.setState({
          rightWidth:"calc(100% - 242px)",
          rightLeft:"242px"
        })
      }else{
        this.setState({
          rightWidth:"calc(100% - 80px)",
          rightLeft:"80px"
        })
      }
      
    }
    
    //获取文章id
    getArticalId(id){
      this.setState({
        articalId:id,
        isArticalList:false
      })
    }

    //获取生活文章id
    getLifeArticalId(id){
      this.setState({
        lifeArticalId:id,
        isLifeArticalList:false
      })
    }

    //获取记录id
    getRecordId(id){
      this.setState({
        recordId:id,
        isRecord:false
      })
    }

    // 加载框
    loading(boo){
      this.setState({
        loading:boo
      })
    }

    // 新增文章
    addArtical(){
      this.setState({
        isArticalList:false,
        articalId:""
      })
    }

    // 新增Live2d内容
    addLive2d(){
      this.setState({
        modal:{
          title:"新增看板娘语录",
          visible:true
        },
        live2dValue:""
      })
    }

    // 新增live2d内容切换触发事件
    changeLive2d(e){
      this.setState({
        live2dValue: e.target.value
      })
    }

    //新增生活日志
    addLife(){
      this.setState({
        isLifeArticalList:false,
        lifeArticalId:""
      })
    }

    //新增记录
    addRecord(){
      this.setState({
        isRecord:false,
        recordId:""
      })
    }

    // 提交新增live2d内容
    submitLive2d(){
      if(this.state.live2dValue === ""){
        message.warning("请输入内容");
        return;
      }
      get(IPserver + "live2d/addLive2d.php",{
        content:this.state.live2dValue
      }).then((res)=>{
        if(res){
          message.success("新增成功")
          this.getTableInfo()
          this.setState({
            modal:{
              title:"",
              visible:false
            }
          })
        }
      })
    }

    // 关闭模态框
    closeModal(){
      this.setState({
        modal:{
          title:"",
          visible:false
        }
      })
    }

    // 取消新增
    cancelAdd(){
      this.setState({
        isArticalList:true
      })
    }
    
    //取消新增生活日志
    cancelAddLife(){
      this.setState({
        isLifeArticalList:true
      })
    }

    //取消新增记录
    cancelAddRecord(){
      this.setState({
        isRecord:true
      })
    }

    // 选择菜单
    checkMenu(item){
      this.setState({
        currentComponent:item.key,
        isArticalList:true,
        isLifeArticalList:true,
        isRecord:true
      },()=>{
        if(this.state.currentComponent === "4" || this.state.currentComponent === "5"){
          this.getTableInfo()
        }
      })
    }

    // 表格分页切换
    changeTablePage(item){
      this.getTableInfo(item.current)
    }

    // 删除表格数据
    deleteTableData(key){
      let data;
      if(key === "all"){
        if(this.state.selectedRowKeys.length === 0){
          message.warning("请选择行");
          return;
        }else{
          data = this.state.selectedRowKeys.join(",");
        }
      }else{
        data = key;
      }
      let url;
      let content;
      switch(this.state.currentComponent){
        case "4":
          url = IPserver + "visitor/deleteVisitor.php";
          content = "确定要删除选择的访客记录吗？（删除后不可恢复）";
          break;
        case "5":
          url = IPserver + "live2d/deleteLive2d.php";
          content = "确定要删除选择的内容吗？（删除后不可恢复）";
          break;
        default:
          break;
      }
      let that = this;
      confirm({
          title: '警告',
          content: content,
          onOk() {
              get(url,{
                  id:data
              }).then((res)=>{
                if(res){
                    message.success("删除成功")
                    that.getTableInfo()
                    that.setState({
                        currentPage:1
                    })
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

    // 多选编辑操作
    onSelectTableChange(item){
      this.setState({
        selectedRowKeys:item
      })
    }

    // 获取表格数据
    getTableInfo(page=1){
        this.loading(true)
        let url;
        switch(this.state.currentComponent){
          case "4":
            url = IPserver + "visitor/getVisitor.php";
            this.setState({
              columns:[
                {
                    title: 'IP',
                    dataIndex: 'cip',
                    key: 'cip',
                    align:"center"
                },
                {
                    title: '城市',
                    dataIndex: 'cname',
                    key: 'cname',
                    align:"center"
                },
                {
                    title: '城市代码',
                    dataIndex: 'cid',
                    key: 'cid',
                    align:"center"
                },
                {
                    title:"来访时间",
                    dataIndex: 'time',
                    key: 'time',
                    align:"center"
                },
                {
                    title: '操作',
                    key: 'action',
                    align:"center",
                    render: (text) => {
                        return (
                            <span className="deleteBtn" onClick={()=>this.deleteTableData(text.key)}>删除</span>
                        )
                    },
                }
              ]
            })
            break;
          case "5":
            url = IPserver + "live2d/getLive2d.php";
            this.setState({
              columns:[
                {
                    title: '编号',
                    dataIndex: 'key',
                    key: 'key',
                    align:"center"
                },
                {
                    title: '内容',
                    dataIndex: 'content',
                    key: 'content',
                    align:"center"
                },
                {
                    title: '操作',
                    key: 'action',
                    align:"center",
                    render: (text) => {
                        return (
                            <span className="deleteBtn" onClick={()=>this.deleteTableData(text.key)}>删除</span>
                        )
                    },
                }
              ]
            })
            break;
          default:
            break;
        }
        get(url,{
            from:(page-1)*10
        }).then((res)=>{
            this.setState({
                tableData:res.data,
                total:Number(res.total),
                currentPage:page
            })
            this.loading(false)
        }).catch(()=>{
            this.loading(false)
            message.error("获取数据失败")
        })
    }

    // 渲染页面
    render() { 
        const {rightWidth,rightLeft,username,isArticalList,articalId,loading,currentComponent,modal,live2dValue,isLifeArticalList,lifeArticalId,isRecord,recordId} = this.state
        let rightMain = null
        switch(currentComponent){
          case "1":
            if(isArticalList){
              rightMain = <ArticalList 
                            getArticalId={this.getArticalId.bind(this)}
                            add={this.addArtical.bind(this)}
                            loading={this.loading.bind(this)}
                          />
              break;
            }else{
              rightMain = <WriteArtical 
                            username={username}
                            articalId={articalId}
                            cancel={this.cancelAdd.bind(this)}
                            loading={this.loading.bind(this)}
                          />
              break;
            }
          case "2":
            if(isLifeArticalList){
              rightMain = <LifeArticalList 
                            add={this.addLife.bind(this)}
                            loading={this.loading.bind(this)}
                            getLifeArticalId={this.getLifeArticalId.bind(this)}
                          />
            }else{
              rightMain = <WriteLifeArtical 
                            username={username}
                            lifeArticalId={lifeArticalId}
                            cancel={this.cancelAddLife.bind(this)}
                            loading={this.loading.bind(this)}
                          />
            }
            break;
          case "3":
            if(isRecord){
              rightMain = <RecordList 
                            add={this.addRecord.bind(this)}
                            loading={this.loading.bind(this)}
                            getRecordId={this.getRecordId.bind(this)}
                          />
            }else{
              rightMain = <WriteRecord 
                            username={username}
                            recordId={recordId}
                            cancel={this.cancelAddRecord.bind(this)}
                            loading={this.loading.bind(this)}
                          />
            }
            break;
          case "4":
            rightMain = <Table 
                          loading={this.loading.bind(this)}
                          state={this.state}
                          changePage={this.changeTablePage.bind(this)}
                          onSelectChange={this.onSelectTableChange.bind(this)}
                          addLive2d={this.addLive2d.bind(this)}
                          deleteData={this.deleteTableData.bind(this)}
                        />
            break;
          case "5":
            rightMain = <Table 
                          loading={this.loading.bind(this)}
                          state={this.state}
                          changePage={this.changeTablePage.bind(this)}
                          onSelectChange={this.onSelectTableChange.bind(this)}
                          addLive2d={this.addLive2d.bind(this)}
                          deleteData={this.deleteTableData.bind(this)}
                        />
            break;
          default:
            break;
        }
        return ( 
            <Fragment>
                <Common 
                  changeWidth={this.changeWidth.bind(this)}
                  checkMenu={this.checkMenu.bind(this)}
                />
                <div id="rightMain" style={{width:rightWidth,left:rightLeft}}>
                    {rightMain}
                </div>
                {
                  loading?<Loading />:null
                }
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
                        placeholder="请输入内容" />
                </Modal>
            </Fragment>
         );
    }
} 
 
export default Index;