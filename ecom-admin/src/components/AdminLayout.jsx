import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout style={{ padding: "24px" }}>
        <Content>
          <Outlet /> {/* render active page */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
