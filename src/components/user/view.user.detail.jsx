
import {  Drawer } from 'antd';
const ViewUserDetail = (props) => {
    const { dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen 
    } = props;
  return (
    <Drawer 
      title="User Detail"
      open={isDetailOpen}
      onClose={() => {
    setDataDetail(null);    
    setIsDetailOpen(false)}}
    >
      {dataDetail ?<>
        <div>
          <p><strong>Id:</strong> {dataDetail._id}</p>
          <p><strong>FullName:</strong> {dataDetail.fullName}</p>
          <p><strong>Email:</strong> {dataDetail.email}</p>
          <p><strong>Phone:</strong> {dataDetail.phone}</p>
        </div>
      </> :
      <p>No user data available.</p>
      }
    </Drawer>

  )}
export default ViewUserDetail;