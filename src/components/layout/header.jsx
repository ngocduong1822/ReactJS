import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined, UsergroupAddOutlined, AuditOutlined, AliwangwangOutlined } from "@ant-design/icons";
import { Menu, message } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutApi } from "../../services/api.service";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    try {
      const res = await logoutApi();

      if (res?.data) {
        localStorage.removeItem("access_token");

        setUser({
          email: "",
          fullName: "",
          phone: "",
          avatar: "",
          role: "",
          id: "",
        });

        message.success("Logout successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/users">Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to="/books">Books</Link>,
      key: "books",
      icon: <AuditOutlined />,
    },
    {
      label: `Welcome, ${user?.fullName || "Guest"}`,
      key: "setting",
      icon: <AliwangwangOutlined />,
      children: [
        {
          label: user?.email ? (
            <span onClick={handleLogout}>Đăng xuất</span>
          ) : (
            <Link to="/login">Đăng nhập</Link>
          ),
          key: user?.email ? "logout" : "login",
        },
      ],
    },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;