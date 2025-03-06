import { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, List, Typography, message } from "antd";
import axios from "axios";

const { Title } = Typography;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/carts");
      setOrders(res.data.carts);
    } catch (error) {
      message.error("Error fetching orders!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/carts/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
      message.success("Order deleted successfully!");
    } catch (error) {
      message.error("Error deleting order!");
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    form.setFieldsValue({
      total: order.total,
      discountedTotal: order.discountedTotal,
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    if (editingOrder) {
      try {
        await axios.put(`https://dummyjson.com/carts/${editingOrder.id}`, values);
        setOrders(orders.map((o) => (o.id === editingOrder.id ? { ...o, ...values } : o)));
        message.success("Order updated successfully!");
      } catch (error) {
        message.error("Error updating order!");
      }
    }
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Orders Management</Title>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
        {orders.map((order) => (
          <Card
            key={order.id}
            title={`Order ID: ${order.id} (User: ${order.userId})`}
            bordered
            style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
            actions={[
              <Button type="primary" onClick={() => handleEdit(order)}>Edit</Button>,
              <Button danger onClick={() => handleDelete(order.id)}>Delete</Button>,
            ]}
          >
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Discount:</strong> ${order.discountedTotal}</p>
            <p><strong>Products:</strong></p>
            <List
              dataSource={order.products}
              renderItem={(product) => (
                <List.Item>
                  {product.title} - {product.quantity} x ${product.price}
                </List.Item>
              )}
            />
          </Card>
        ))}
      </div>

      <Modal
        title="Edit Order"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="total" label="Total Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="discountedTotal" label="Discounted Total">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrdersPage;
