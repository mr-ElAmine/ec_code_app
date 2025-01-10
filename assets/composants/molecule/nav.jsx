import React, { useContext } from "react";
import { Layout, Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

const { Header } = Layout;

const Nav = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <Layout>
      <Header className="flex items-center bg-blue-600">
        <div className="text-white font-bold text-xl mr-auto">Book App</div>
        <div className="flex gap-5 items-center font-bold text-white">
          {user.username}
          <Button type="primary" size={50} danger onClick={logout}>
            Logout
          </Button>
        </div>
      </Header>
    </Layout>
  );
};

export default Nav;
