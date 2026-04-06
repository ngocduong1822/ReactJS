import {
  Button,
  Descriptions,
  Form,
  Input,
  notification,
  Row,
  Col,
  Divider
} from "antd";
import { registerUserApi } from "../services/api.service";
import { Link,useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
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
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ margin: "30px" }}>
      <h3 style={{ textAlign:"center" }}><b>Đăng ký tài khoản</b></h3>
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

        <Button
          onClick={() => {
            form.submit();
          }}
          type="submit"
          className="btn btn-primary"
        >
          Register
        </Button>
        <Divider />
        <div>Đã có tài khoản? <Link to="/login"> Đăng nhập tại đây</Link></div>
          </Col>
      </Row>
    </Form>
  );
};

export default RegisterPage;
