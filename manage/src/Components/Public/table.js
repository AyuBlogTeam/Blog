import React from "react";
import { Table, Button } from "antd";

const TableUi = props => {
  const {
    tableData,
    total,
    columns,
    currentPage,
    selectedRowKeys,
    currentComponent
  } = props.state;
  const rowSelection = {
    selectedRowKeys,
    onChange: props.onSelectChange
  };
  return (
    <div id="visitor">
      <Button className="fr mb10" onClick={() => props.deleteData("all")}>
        删除
      </Button>
      {currentComponent === "5" ? (
        <Button className="fr mb10 mr10" onClick={props.addLive2d}>
          新增
        </Button>
      ) : null}
      <div className="clear"></div>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={props.changePage}
        pagination={{
          total: total,
          showQuickJumper: true,
          current: currentPage
        }}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default TableUi;
