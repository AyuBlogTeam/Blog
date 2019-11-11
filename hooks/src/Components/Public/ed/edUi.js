import React, { useContext } from "react";
import { Button, Input, Upload, Modal, Icon, Select } from "antd";
import IPserver from "IPserver";
import { WriteContext } from "./ed";

const IndexUi = () => {
  const {
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
    changeTitle,
    changeSummary,
    changeKind,
    cancel,
    deleteOne,
    musicCode,
    changeMusicCode,
    isMusic,
    changeType
  } = useContext(WriteContext);
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
    <React.Fragment>
      {currentType !== "3" ? (
        <React.Fragment>
          <div className="input">
            <Input
              addonBefore="标题"
              value={articalTitle}
              onChange={changeTitle}
            />
          </div>
        </React.Fragment>
      ) : null}
      {currentType !== "3" ? (
        <React.Fragment>
          <div className="input">
            <Input.TextArea
              placeholder="请输入概述"
              value={articalSummary}
              onChange={changeSummary}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </div>
        </React.Fragment>
      ) : null}
      {isMusic ? (
        <React.Fragment>
          <div className="input">
            <Input.TextArea
              placeholder="请输入分享的音乐代码"
              value={musicCode}
              onChange={changeMusicCode}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </div>
        </React.Fragment>
      ) : null}
      {currentType !== "3" ? (
        <React.Fragment>
          <div className="input">
            <Upload
              action={IPserver + "articals/uploadImg.php"}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
        </React.Fragment>
      ) : null}
      {!isMusic ? (
        <div className="input" ref={editElem} style={{ textAlign: "left" }} />
      ) : null}
      {currentType === "1" ? (
        <React.Fragment>
          <div className="input">
            <Select
              defaultValue={articalKind}
              style={{ width: 200 }}
              onChange={changeKind}
            >
              {list}
            </Select>
          </div>
        </React.Fragment>
      ) : null}
      {articalId !== "" ? (
        <React.Fragment>
          <Button className="submit" type="primary" onClick={submit}>
            更新
          </Button>
          <Button className="cancel" onClick={cancel}>
            取消
          </Button>
          <Button type="danger" className="delete" onClick={deleteOne}>
            删除
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button className="submit" type="primary" onClick={submit}>
            发布
          </Button>
          {currentType === "3" ? (
            <React.Fragment>
              <Button className="cancel" onClick={changeType}>
                切换
              </Button>
            </React.Fragment>
          ) : null}
          <Button className="cancel" onClick={cancel}>
            取消
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default IndexUi;
