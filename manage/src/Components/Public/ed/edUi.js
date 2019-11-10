import React, { Component, Fragment } from "react";
import { Button, Input, Upload, Modal, Icon, Select } from "antd";
import IPserver from "IPserver";
class IndexUi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;
    const {
      previewVisible,
      previewImage,
      fileList,
      articalTitle,
      articalSummary,
      articalKind,
      selectList,
      articalId,
      musicCode
    } = props.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传封面</div>
      </div>
    );
    let list;
    if (selectList !== undefined) {
      list = selectList.map((item, index) => {
        return (
          <Select.Option value={item} key={index}>
            {item}
          </Select.Option>
        );
      });
    }
    return (
      <Fragment>
        {props.currentType !== "3" ? (
          <Fragment>
            <div className="input">
              <Input
                addonBefore="标题"
                value={articalTitle}
                onChange={props.changeTitle}
              />
            </div>
          </Fragment>
        ) : null}
        {props.currentType !== "3" ? (
          <Fragment>
            <div className="input">
              <Input.TextArea
                placeholder="请输入概述"
                value={articalSummary}
                onChange={props.changeSummary}
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </div>
          </Fragment>
        ) : null}
        {props.currentType === "3" ? (
          <Fragment>
            <div className="input">
              <Input.TextArea
                placeholder="请输入分享的音乐代码"
                value={musicCode}
                onChange={props.changeMusicCode}
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </div>
          </Fragment>
        ) : null}
        {props.currentType !== "3" ? (
          <Fragment>
            <div className="input">
              <Upload
                action={IPserver + "articals/uploadImg.php"}
                listType="picture-card"
                fileList={fileList}
                onPreview={props.handlePreview}
                onChange={props.handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={props.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </Fragment>
        ) : null}
        <div
          className="input"
          ref={r => (this.editorElem = r)}
          style={{ textAlign: "left" }}
        />
        {props.currentType === "1" ? (
          <Fragment>
            <div className="input">
              <Select
                defaultValue={articalKind}
                style={{ width: 200 }}
                onChange={props.changeKind}
              >
                {list}
              </Select>
            </div>
          </Fragment>
        ) : null}
        {articalId !== "" ? (
          <Fragment>
            <Button className="submit" type="primary" onClick={props.submit}>
              更新
            </Button>
            <Button className="cancel" onClick={props.cancel}>
              取消
            </Button>
            <Button type="danger" className="delete" onClick={props.delete}>
              删除
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button className="submit" type="primary" onClick={props.submit}>
              发布
            </Button>
            <Button className="cancel" onClick={props.cancel}>
              取消
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default IndexUi;
