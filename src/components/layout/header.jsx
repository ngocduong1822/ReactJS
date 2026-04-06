import { Link, NavLink } from "react-router-dom";
// import './header.css'
import {
  AlibabaOutlined,
  AliwangwangOutlined,
  AppstoreOutlined,
  AuditOutlined,
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
const Header = () => {
  const [current, setCurrent] = useState("mail");

  const { user } = useContext(AuthContext);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <AuditOutlined />,
    },
    {
      label: 'Welcome, ' + (user?.fullName || "Guest"),
      key: "setting",
      icon: <AliwangwangOutlined />,
      children: [
        {
          label: <Link to={user?.email ? "/" : "/login"}>{user?.email ? "Đăng xuất" : "Đăng nhập"}</Link>,
          key: user?.email ? "logout" : "login",
        },
      ],
    }
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
