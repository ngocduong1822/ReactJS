import { Divider, Form, Input, Row, Col, Button, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/api.service";
import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const [form] = Form.useForm();
  const Navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const onFinish = async (values) => {
    try {
      const res = await loginApi(values.email, values.password);
      if (res?.data?.access_token) {
        notification.success({
          message: "Login successfully",
          description: "Bạn đã đăng nhập thành công."
        });
        localStorage.setItem("access_token", res.data.access_token);
        setUser(res.data.user);
        Navigate("/");
        return;
      }

      notification.error({
        message: "Login failed",
        description: res?.message || "Đăng nhập thất bại"
      });
    } catch (error) {
      notification.error({
        message: "Login failed",
        description: error?.message || "Lỗi khi đăng nhập"
      });
    }
  };

  return (
    <Row justify="center" style={{ margin: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        
        <fieldset style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
          
          <legend style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
            Đăng nhập
          </legend>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter password!" }]}
            >
              <Input.Password onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  form.submit();
                }
              }}/>
            </Form.Item>

            <Form.Item>
              <div style={{ display: "flex", justifyContent: "space-between" ,alignItems: "center" }}>
                <Button type="primary"  onClick={()=>form.submit()}>
                  Login
                </Button>
                <Link to="/forgot-password">Quên mật khẩu?</Link>
              </div>
            </Form.Item>
          </Form>

          <Divider />

          <div style={{ textAlign: "center" }}>
            <span>Chưa có tài khoản? </span>
            <Link to="/register">Đăng ký ngay</Link>
          </div>

        </fieldset>

      </Col>
    </Row>
  );
};

export default LoginPage;