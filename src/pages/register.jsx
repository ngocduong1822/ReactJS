import {
  Button,
  Descriptions,
  Form,
  Input,
  notification,
  Row,
  Col,
} from "antd";
import { registerUserApi } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    const res = await registerUserApi(
      values.fullName,
      values.email,
      values.passWord,
      values.phone,
    );
    if (res.data) {
      notification.success({
        message: "Register successfully",
        descriptions: "Đăng kí thành công",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register failed",
        descriptions: JSON.stringify(res.message),
      });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div style={{ margin: "50px" }}></div>
      <Row justify="center">
        <Col xs={24} md={8} >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter full name!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} md={8} >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        </Row>
        <Row justify="center">
        <Col xs={24} md={8} >
          <Form.Item
            label="Password"
            name="passWord"
            rules={[{ required: true, message: "Please enter password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        </Row>
        <Row justify="center"   >
        <Col xs={24} md={8} >
        <Form.Item
          label="Phone number"
          name="phone"
          rules={[
            {
              required: true,
              pattern: new RegExp(/\d+/g),
              message: "Wrong format!",
            },
          ]}
        >
          <Input />
        </Form.Item>
          </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} md={8} >

        <button
          onClick={() => {
            form.submit();
          }}
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#1890ff", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
        >
          Register
        </button>
          </Col>
      </Row>
    </Form>
  );
};

export default RegisterPage;
