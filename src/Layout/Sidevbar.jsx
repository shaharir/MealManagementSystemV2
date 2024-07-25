import { useState } from "react";
import "./css/sidebar.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  AppstoreFilled,
  CarryOutOutlined,
  DollarOutlined,
  CoffeeOutlined,
  BorderOuterOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../Page/Private/Dashboard/Dashboard";
import Border from "../Page/Private/Border/Border";
import Search from "antd/es/input/Search";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { BoxArrowRight, Gear, Person } from "react-bootstrap-icons";
import Bazar from "../Page/Private/Bazar/Bazar";
import Deposit from "../Page/Private/Deposit/Deposit";
import Meal from "../Page/Private/Meal/Meal";
import Summary from "../Page/Private/Summary/Summary";
import Feedback from "../Page/Private/Feedback/Feedback";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <AppstoreFilled />,
      label: (
        <Link
          className="text-decoration-none"
          to="/"
          style={{ marginLeft: "15px" }}
        >
          Dashboard
        </Link>
      ),
    },
    {
      key: "border",
      icon: <TeamOutlined />,
      label: (
        <Link
          className="text-decoration-none"
          to="/border"
          style={{ marginLeft: "15px" }}
        >
          Border
        </Link>
      ),
    },
    {
      key: "bazar",
      icon: <CarryOutOutlined />,
      label: (
        <Link
          className="text-decoration-none"
          to="/bazar"
          style={{ marginLeft: "15px" }}
        >
          Bazar
        </Link>
      ),
    },
    {
      key: "deposit",
      icon: <DollarOutlined />,
      label: (
        <Link
          className="text-decoration-none"
          to="/deposit"
          style={{ marginLeft: "15px" }}
        >
          Deposit
        </Link>
      ),
    },
    {
      key: "meal",
      icon: <CoffeeOutlined />,
      label: (
        <Link
          className="text-decoration-none"
          to="/meal"
          style={{ marginLeft: "15px" }}
        >
          Meal
        </Link>
      ),
    },
    {
      key: "summary",
      icon: <BorderOuterOutlined />,
      label: (
        <Link
          className="text-decoration-none"
          to="/summary"
          style={{ marginLeft: "15px" }}
        >
          Summary
        </Link>
      ),
    },
    {
      key: "Feedback",
      icon: <ToolOutlined />,
      label: (
        <Link
          className="text-decoration-none"
          to="/feedBack"
          style={{ marginLeft: "15px" }}
        >
          Feedback
        </Link>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="demo-logo-vertical " style={{ textAlign: "center" }}>
          <img
            src="../../../public/johnny_automatic_leg_steak.svg"
            alt="Logo"
            style={{
              width: "50%",
              height: "auto",
              marginBottom: "42px",
              marginTop: "20px",
            }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          style={{
            paddingBottom: "123px",
            fontSize: "16px",
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Search
              placeholder="Are You Looking For something?...."
              allowClear
              size="large"
              className="search-bar"
              style={{
                width: 500,
                marginLeft: 190,
                marginTop: 12,
              }}
            />
          </div>
          <div className="dropdown-menu-container">
            <DropdownButton
              id="profile-dropdown"
              title={
                <img
                  src="https://scontent.fdac135-1.fna.fbcdn.net/v/t39.30808-1/265123842_2034978933336405_901740030518575765_n.jpg?stp=dst-jpg_p160x160&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=O-k_E0TVploQ7kNvgEy18D0&_nc_ht=scontent.fdac135-1.fna&oh=00_AYBX7UMj9Q8M-8hGv9FGn5x1Jt4sV-xVUZQVakQ0HVCjOg&oe=668CAA78"
                  alt="Profile"
                  className="profile-picture"
                />
              }
              variant="outline"
              className="border-0 custom-dropdown"
            >
              <div className="dropdown_profile">
                <Dropdown.Item
                  href="/profile"
                  className="dropdown-item text-white"
                >
                  <Person className="icon" />
                  <span className="item-text">Profile</span>
                </Dropdown.Item>
                <Dropdown.Item
                  href="/settings"
                  className="dropdown-item text-white"
                >
                  <Gear className="icon" />
                  <span className="item-text">Settings</span>
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={handleLogout}
                  className="dropdown-item text-white"
                >
                  <BoxArrowRight className="icon" />
                  <span className="item-text">Log Out</span>
                </Dropdown.Item>
              </div>
            </DropdownButton>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 1px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/border" element={<Border />} />
            <Route path="/bazar" element={<Bazar />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/meal" element={<Meal />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
