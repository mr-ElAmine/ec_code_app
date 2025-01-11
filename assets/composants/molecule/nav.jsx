import React, { useContext } from "react";
import { Layout, Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

const { Header } = Layout;

const Nav = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Layout>
      <Header className="flex items-center bg-blue-600">
        <div className="text-white font-bold text-xl mr-auto">Book App</div>

        <Button type="primary" shape="round" danger onClick={logout}>
          Logout
        </Button>
      </Header>
    </Layout>
  );
};

export default Nav;
