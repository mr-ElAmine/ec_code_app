import React, { useContext } from "react";
import { Layout, Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Nav = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <Layout>
      <Header className="flex items-center bg-blue-600 ">
        <div className="mr-auto flex flex-row items-center gap-10">
          <div className="text-white font-bold text-xl mr-auto">
            <Link to="/" className="text-white hover:text-gray-200">
              Book App
            </Link>
          </div>

          <nav className="flex items-center  gap-5">
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to="/explore" className="text-white hover:text-gray-200">
              Explore
            </Link>
          </nav>
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="text-white font-bold">{user.username}</div>
          <Button type="primary" shape="round" danger onClick={logout}>
            Logout
          </Button>
        </div>
      </Header>
    </Layout>
  );
};

export default Nav;
