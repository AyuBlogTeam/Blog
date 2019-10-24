import React, { Component,Fragment } from 'react';
import VisitorUI from './visitorUi';
import IPserver from 'IPserver';
import {
  get
} from 'Common/axios.js'
import {
  message,
  Modal
} from 'antd'
const { confirm } = Modal;

class Visitor extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tableData:[]
         }
    }

    delete(key){
        let that = this;
        confirm({
            title: '警告',
            content: '确定要删除这条访客记录吗？（删除后不可恢复）',
            onOk() {
                get(IPserver + "visitor/deleteVisitor.php",{
                    id:key
                }).then((res)=>{
                if(res){
                    message.success("删除成功")
                    that.getInfo()
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

    componentDidMount(){
        this.getInfo()
    }

    getInfo(){
        this.props.loading(true)
        get(IPserver + "visitor/getVisitor.php").then((res)=>{
            this.setState({
                tableData:res
            })
            this.props.loading(false)
        }).catch(()=>{
            this.props.loading(false)
            message.error("获取数据失败")
        })
    }

    render() { 
        return ( 
            <Fragment>
                <VisitorUI 
                    state={this.state}
                    delete={this.delete.bind(this)}
                />
            </Fragment>
         );
    }
}
 
export default Visitor;