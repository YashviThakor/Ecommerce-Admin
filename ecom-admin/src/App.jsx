import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import OrdersPage from "./pages/OrdersPage";
import QuotesPage from "./pages/QuotesPage";
import RecipesPage from "./pages/RecipesPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Navbar />
          <Content style={{ margin: "16px" }}>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/cart" element={<CartPage />} /> 
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
