import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FileTextOutlined,
  ReadOutlined,
  AppstoreOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = ({ activePage }) => {
  return (
    <Sider collapsible style={{ minHeight: "100vh" }}>
      <div className="logo" style={{ color: "white", textAlign: "center", padding: "10px" }}>
        Admin Dashboard
      </div>
      <Menu theme="dark" defaultSelectedKeys={[activePage]} mode="inline">
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="products" icon={<AppstoreOutlined />}>
          <Link to="/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<FileDoneOutlined />}>
          <Link to="/orders">Orders</Link>
        </Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}> {/* 🔥 Added Cart Link */}
          <Link to="/cart">Cart</Link>
        </Menu.Item>
        <Menu.Item key="quotes" icon={<FileTextOutlined />}>
          <Link to="/quotes">Quotes</Link>
        </Menu.Item>
        <Menu.Item key="recipes" icon={<ReadOutlined />}>
          <Link to="/recipes">Recipes</Link>
        </Menu.Item>
        <Menu.Item key="blog" icon={<FileTextOutlined />}>
          <Link to="/blog">Blog</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
