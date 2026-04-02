import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Popconfirm, notification } from "antd";
import { useState, useEffect } from "react";
import ViewUserDetail from "./view.user.detail";
import UpDateUserModal from "./update.user.modal";
import { deleteUserApi } from "../../services/api.service";

const UserTable = (props) => {
  const { dataUsers, loadUser , current, pageSize, total, setCurrent, setPageSize } = props;

  // 🔥 state drawer
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  // 🔥 state update modal
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  // 🔥 delete user
  const handleDeleteUser = async (_id) => {
    try {
      const res = await deleteUserApi(_id);

      if (res.data) {
        notification.success({
          message: "Delete user",
          description: "Xóa user thành công",
        });

        await loadUser();
      } else {
        notification.error({
          message: "Delete user failed",
          description: res.message || "Xóa thất bại",
        });
      }
    } catch (error) {
      notification.error({
        message: "Delete user failed",
        description: error.message,
      });
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => (
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => {
            setDataDetail(record);
            setIsDetailOpen(true);
          }}
        >
          {record._id}
        </span>
      ),
    },
    {
      title: "FullName",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {/* EDIT */}
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />

          {/* DELETE */}
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // ✅ Hàm xử lý thay đổi phân trang
  const handlePaginationChange = (page, pageSize) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setCurrent(page);
    setPageSize(pageSize);
  }
  
  return (
    <>
      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey="_id"
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          pageSizeOptions: [6, 10, 20, 50],
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
          onChange: handlePaginationChange
        }}
      />

      {/* UPDATE MODAL */}
      <UpDateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />

      {/* VIEW DETAIL DRAWER */}
      <ViewUserDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
