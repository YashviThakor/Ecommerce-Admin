import { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, message, Spin, Typography } from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/users");
      setUsers(res.data.users);
    } catch (error) {
      message.error("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      message.success("User deleted successfully!");
    } catch (error) {
      message.error("Failed to delete user.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        await axios.put(`https://dummyjson.com/users/${editingUser.id}`, values);
        setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...values } : u)));
        message.success("User updated successfully!");
      } else {
        const res = await axios.post("https://dummyjson.com/users/add", values);
        setUsers([...users, res.data]);
        message.success("User added successfully!");
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update user.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        User Management 👥
      </Title>

      <Button type="primary" onClick={handleAdd} style={{ marginBottom: "16px" }}>
        + Add User
      </Button>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {users.map((user) => (
            <Card
              key={user.id}
              title={`${user.firstName} ${user.lastName}`}
              hoverable
              cover={
                <img
                  alt={user.firstName}
                  src={user.image || "https://via.placeholder.com/150"}
                  style={{ height: "150px", objectFit: "cover", borderRadius: "8px" }}
                />
              }
              actions={[
                <Button onClick={() => handleEdit(user)}>Edit</Button>,
                <Button danger onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>,
              ]}
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <Paragraph strong>Email: {user.email}</Paragraph>
              <Paragraph>Age: {user.age}</Paragraph>
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "First Name is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Last Name is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              { required: true, message: "Age is required" },
              { type: "number", min: 18, max: 99, message: "Age must be between 18-99" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
