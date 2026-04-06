import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getAccountApi } from "./services/api.service";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
  const { setUser, isApploading, setIsApploading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await getAccountApi();

      if (res?.data) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(">>> Not logged in");
    } finally {
      setIsApploading(false); // 🔥 luôn chạy
    }
  };

  return (
    <>
      {isApploading ? (
        <Spin tip="Loading..." fullscreen />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;