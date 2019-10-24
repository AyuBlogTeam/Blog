import React from 'react';
import { Table } from 'antd';

const VisitorUI = (props)=>{
    const { tableData } = props.state
    const columns = [
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
                    <span className="deleteBtn" onClick={()=>props.delete(text.key)}>删除</span>
                )
            },
          },
    ]
    return (
        <div id="visitor">
            <Table 
                columns={columns} 
                dataSource={tableData}
                onChange={props.changePage}
            />
        </div>
        
    )
}

export default VisitorUI;