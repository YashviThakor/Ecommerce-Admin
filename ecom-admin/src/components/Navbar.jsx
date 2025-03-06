import { Layout } from "antd";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ background: "#001529", color: "white", textAlign: "center", fontSize: "20px" }}>
      Admin Dashboard
    </Header>
  );
};

export default Navbar;
