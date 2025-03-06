import { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, message, Spin, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products);
    } catch (error) {
      message.error("Error fetching products!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      message.success("Product deleted successfully!");
    } catch (error) {
      message.error("Error deleting product!");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingProduct) {
        await axios.put(`https://dummyjson.com/products/${editingProduct.id}`, values);
        setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...values } : p)));
        message.success("Product updated successfully!");
      } else {
        const res = await axios.post("https://dummyjson.com/products/add", values);
        setProducts([...products, res.data]);
        message.success("Product added successfully!");
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Error saving product!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Products Management</Title>

      <Button type="primary" onClick={handleAdd} style={{ marginBottom: "16px" }}>
        Add Product
      </Button>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {products.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              cover={<img alt={product.title} src={product.thumbnail} style={{ height: "150px", objectFit: "cover" }} />}
              style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
              actions={[
                <Button type="primary" onClick={() => handleEdit(product)}>Edit</Button>,
                <Button danger onClick={() => handleDelete(product.id)}>Delete</Button>,
              ]}
            >
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: "Price is required" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="thumbnail" label="Image URL" rules={[{ required: true, message: "Image URL is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Brand">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="stock" label="Stock">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsPage;
