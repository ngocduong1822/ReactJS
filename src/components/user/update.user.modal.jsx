import { useEffect, useState } from "react";
import { Input, notification, Modal } from "antd";
import {  updateUserApi } from "../../services/api.service";
const UpDateUserModal = (props) => {
    const [id, setId] = useState("");
      const [fullName, setFullName] = useState("");
      const [phone, setPhone] = useState("");     
     const { isModalUpdateOpen, setIsModalUpdateOpen,dataUpdate, setDataUpdate ,loadUser} = props;
      useEffect(() => {
        if(dataUpdate){
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
      },[dataUpdate])

       const resetAndCloseModal =() => {
        setFullName("");
        setId("");
        setPhone("");
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
  }
      const handleSubmitBtn = async () => {
    try {
      const res = await updateUserApi(id, fullName, phone);

      if (res.data) {
        notification.success({
          message: "Update user",
          description: "Cập nhật User thành công",
        });
        resetAndCloseModal();
        await loadUser();
      } else {
        notification.error({
          message: "Update user failed",
          description: JSON.stringify(res.message || "Cập nhật User thất bại"),
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Có lỗi xảy ra",
      });
    }
  };
  return (
     <Modal
        title="Update User"
        open={isModalUpdateOpen}
        onOk={handleSubmitBtn} 
        onCancel={() => {resetAndCloseModal()}}
        maskClosable={false}
        okText="Save"
      >
        <div style={{ margin: "20px 0" }}>
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexDirection: "column",
            }}
          >
            <div>
              <span>Id</span>
              <Input
                value={id}
                disabled
              />
            </div>

            <div>
              <span>FullName</span>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <span>Phone number</span>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal>
  )
}
export default UpDateUserModal;