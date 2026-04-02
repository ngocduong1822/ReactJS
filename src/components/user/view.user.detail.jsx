import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { updateUserAvaterAPI } from '../../services/api.service';

const ViewUserDetail = (props) => {
  const {
    dataDetail,
    setDataDetail,
    isDetailOpen,
    setIsDetailOpen,
    loadUser

  } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleOnChangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateUserAvatar = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    // TODO: gọi API upload file ở đây (bạn tự thêm sau)
    // giả sử API trả về link avatar mới
    const newAvatar = "demo-avatar.png";

    const resUpdateAvater = await updateUserAvaterAPI(
      newAvatar, dataDetail._id,dataDetail.fullName, dataDetail.phone
      
    );
const handleUpdateUserAvatar = async () => {
  if (!selectedFile) return;

  try {
    // 1. Upload file trước
    const resUpload = await handleUploadFile(selectedFile, 'avatar'); // hoặc folder bạn backend yêu cầu
    if (!resUpload?.data?.fileName && !resUpload?.data?.file) {
      throw new Error('Upload thất bại');
    }

    // 2. Lấy tên file trả về
    const uploadedAvatar = resUpload.data.fileName || resUpload.data.file || selectedFile.name;

    // 3. Update user record
    const resUpdateAvatar = await updateUserAvaterAPI(
      uploadedAvatar,
      dataDetail._id,
      dataDetail.fullName,
      dataDetail.phone
    );

    if (resUpdateAvatar?.data) {
      notification.success({ message: "Update avatar", description: "Cập nhật avatar thành công" });
      setSelectedFile(null);
      setPreview(null);
      await loadUser(); // refresh data list
      setDataDetail(prev => prev ? { ...prev, avatar: uploadedAvatar } : prev); // để drawer hiện ngay nếu muốn
    } else {
      throw new Error('Update API thất bại');
    }
  } catch (err) {
    notification.error({ message: "Error", description: err.message || "Upload/update avatar thất bại" });
  }
};
    if (resUpdateAvater ) {
      setIsDetailOpen(false);
      setSelectedFile(null);
      setPreview(null);
      await loadUser();
      notification.success({
        message: "Update avatar",
        description: "Cập nhật avatar thành công",
      });
    } else {
      notification.error({
        message: "Error",
        description: "Upload file thất bại",
      });
    }
  };

  return (
    <Drawer
      width={"50vw"}
      title="User Detail"
      open={isDetailOpen}
      onClose={() => {
        setDataDetail(null);
        setIsDetailOpen(false);
      }}
    >
      {dataDetail ? (
        <>
          <p><strong>Id:</strong> {dataDetail._id}</p>
          <p><strong>FullName:</strong> {dataDetail.fullName}</p>
          <p><strong>Email:</strong> {dataDetail.email}</p>
          <p><strong>Phone:</strong> {dataDetail.phone}</p>

          <br />
          <p><strong>Avatar:</strong></p>

          <div>
            <img
              width={150}
              height={150}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
              alt="User Avatar"
            />
          </div>

          <div>
            <label
              htmlFor='btnUpload'
              style={{
                display: "block",
                width: "fit-content",
                padding: "8px 16px",
                backgroundColor: "#1890ff",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Upload Avatar
            </label>

            <input
              id='btnUpload'
              type="file"
              hidden
              onChange={handleOnChangeFile}
            />
          </div>

          {preview && (
            <>
              <div>
                <img
                  width={150}
                  height={150}
                  src={preview}
                  alt="Preview"
                />
              </div>

              <Button
                type='primary'
                onClick={handleUpdateUserAvatar}
                style={{ marginTop: "10px" }}
              >
                Save
              </Button>
            </>
          )}
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </Drawer>
  );
};

export default ViewUserDetail;