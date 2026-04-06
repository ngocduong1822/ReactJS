import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserApi } from '../services/api.service';
const UserPage = () => {
   const [dataUsers,setDataUsers] = useState([]);
   const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [total, setTotal] = useState(0);
    
   // ✅ Load data khi page hoặc pageSize thay đổi
   useEffect( () => {
      loadUser();
    }, [current, pageSize]);
      
   const loadUser = async() => {
      const res = await fetchAllUserApi(current, pageSize);
      
      if(res.data){
        setDataUsers(res.data.result);
        setTotal(res.data.meta.total);  // ✅ Lấy total từ meta
        // ❌ Xóa setCurrent/setPageSize để tránh vòng lặp vô tận
      }
    }
    
  return (
    <div style={{ padding:"20px" }}>
      <UserForm loadUser={ loadUser}/> 
      <UserTable dataUsers={dataUsers}
      loadUser={ loadUser} 
      current={current} 
      pageSize={pageSize} 
      total={total}
      setCurrent={setCurrent}
      setPageSize={setPageSize}
      />
      
    </div>
    
  )
}

export default UserPage;