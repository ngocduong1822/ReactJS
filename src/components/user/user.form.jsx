import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.service";

const UserForm = (props) => {
  const { loadUser } = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitBtn = async () => {
    try {
      const res = await createUserApi(fullName, email, password, phone);

      if (res.data) {
        notification.success({
          message: "Create user",
          description: "Tạo User thành công",
        });
        resetAndCloseModal();
        await loadUser();
      } else {
        notification.error({
          message: "Create user failed",
          description: JSON.stringify(res.message || "Tạo User thất bại"),
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Có lỗi xảy ra",
      });
    }
  };
  const resetAndCloseModal =() => {
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");

        setIsModalOpen(false);
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Table Users</h3>

        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Create User
        </Button>
      </div>

      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={handleSubmitBtn} 
        onCancel={() => {resetAndCloseModal()}}
        maskClosable={false}
        okText="Create"
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
              <span>FullName</span>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <span>Email</span>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <span>Password</span>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
};

export default UserForm;