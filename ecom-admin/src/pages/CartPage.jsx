import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Button, Input, message, Space } from "antd";

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const [newProductId, setNewProductId] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/carts");
      setCarts(res.data.carts);
    } catch (error) {
      console.error("Error fetching carts:", error);
      message.error("Failed to load carts.");
    }
  };

  const deleteCart = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/carts/${id}`);
      setCarts(carts.filter((cart) => cart.id !== id));
      message.success("Cart deleted successfully.");
    } catch (error) {
      console.error("Error deleting cart:", error);
      message.error("Failed to delete cart.");
    }
  };

  const deleteCartItem = async (cartId, productId) => {
    try {
      const updatedCarts = carts.map((cart) => {
        if (cart.id === cartId) {
          const updatedProducts = cart.products.filter((product) => product.id !== productId);
          return { ...cart, products: updatedProducts };
        }
        return cart;
      });
      setCarts(updatedCarts);
      message.success("Item removed from cart.");
    } catch (error) {
      console.error("Error deleting cart item:", error);
      message.error("Failed to remove item.");
    }
  };

  const addCart = async () => {
    if (!newProductId || !newQuantity) {
      message.warning("Please enter product ID and quantity.");
      return;
    }

    try {
      const newCart = {
        userId: 1, // Example user
        products: [{ id: parseInt(newProductId), quantity: parseInt(newQuantity) }]
      };
      const res = await axios.post("https://dummyjson.com/carts/add", newCart);
      setCarts([...carts, res.data]);
      message.success("Cart added successfully.");
      setNewProductId("");
      setNewQuantity("");
    } catch (error) {
      console.error("Error adding cart:", error);
      message.error("Failed to add cart.");
    }
  };

  const updateQuantity = (cartId, productId, newQty) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.id === cartId) {
        const updatedProducts = cart.products.map((product) =>
          product.id === productId ? { ...product, quantity: newQty } : product
        );
        return { ...cart, products: updatedProducts };
      }
      return cart;
    });
    setCarts(updatedCarts);
  };

  const calculateTotalItems = () => {
    return carts.reduce((total, cart) => total + cart.products.reduce((sum, product) => sum + product.quantity, 0), 0);
  };

  const calculateGrandTotal = () => {
    return carts.reduce((total, cart) => total + cart.total, 0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>🛒 Cart Management</h2>

      {/* Add New Cart Section */}
      <Card title="Add New Cart" style={{ marginBottom: "20px" }}>
        <Space>
          <Input
            type="number"
            placeholder="Product ID"
            value={newProductId}
            onChange={(e) => setNewProductId(e.target.value)}
            style={{ width: "150px" }}
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            style={{ width: "150px" }}
          />
          <Button type="primary" onClick={addCart}>Add Cart</Button>
        </Space>
      </Card>

      {/* Summary Section */}
      <Card title="Summary" style={{ marginBottom: "20px" }}>
        <p><strong>Total Items:</strong> {calculateTotalItems()}</p>
        <p><strong>Grand Total:</strong> ${calculateGrandTotal()}</p>
      </Card>

      {/* Cart List */}
      {carts.map((cart) => (
        <Card key={cart.id} title={`Cart ID: ${cart.id} (User: ${cart.userId})`} style={{ marginBottom: "20px" }}
          extra={<Button danger onClick={() => deleteCart(cart.id)}>Delete Cart</Button>}
        >
          <p><strong>Total Price:</strong> ${cart.total}</p>

          {/* Products Table */}
          <Table
            dataSource={cart.products}
            rowKey="id"
            pagination={false}
            columns={[
              {
                title: "Product",
                dataIndex: "title",
                key: "title",
              },
              {
                title: "Price",
                dataIndex: "price",
                key: "price",
                render: (price) => `$${price}`,
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
                render: (quantity, record) => (
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => updateQuantity(cart.id, record.id, parseInt(e.target.value))}
                    style={{ width: "60px" }}
                  />
                ),
              },
              {
                title: "Total",
                dataIndex: "total",
                key: "total",
                render: (total) => <strong>${total}</strong>,
              },
              {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <Button danger size="small" onClick={() => deleteCartItem(cart.id, record.id)}>
                    Remove
                  </Button>
                ),
              },
            ]}
          />
        </Card>
      ))}
    </div>
  );
};

export default CartPage;
