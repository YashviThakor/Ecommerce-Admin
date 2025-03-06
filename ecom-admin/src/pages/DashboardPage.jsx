import { Card, Row, Col, Statistic, Spin, message } from "antd";
import { UserOutlined, ShoppingCartOutlined, AppstoreOutlined, DollarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get("https://dummyjson.com/users"),
          axios.get("https://dummyjson.com/products"),
          axios.get("https://dummyjson.com/carts"),
        ]);

        const totalRevenue = ordersRes.data.carts.reduce((acc, order) => acc + order.total, 0);

        setStats({
          users: usersRes.data.total,
          products: productsRes.data.total,
          orders: ordersRes.data.total,
          revenue: totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        message.error("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>📊 Admin Dashboard</h1>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Card bordered style={{ textAlign: "center" }}>
              <Statistic
                title="Total Users"
                value={stats.users}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card bordered style={{ textAlign: "center" }}>
              <Statistic
                title="Total Products"
                value={stats.products}
                prefix={<AppstoreOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card bordered style={{ textAlign: "center" }}>
              <Statistic
                title="Total Orders"
                value={stats.orders}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card bordered style={{ textAlign: "center" }}>
              <Statistic
                title="Total Revenue"
                value={`$${stats.revenue.toLocaleString()}`}
                prefix={<DollarOutlined />}
                valueStyle={{ color: "#f5222d" }}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DashboardPage;
