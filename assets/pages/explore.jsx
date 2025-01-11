import React, { useEffect, useState, useContext } from "react";
import { List, Spin, Alert, Avatar } from "antd";
import Nav from "../composants/molecule/Nav";
import { getAllBookRead } from "../repository/getAllBookRead";
import { AuthContext } from "../contexts/AuthContext";

export const Explore = () => {
  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.token) {
        return;
      }
      try {
        const data = await getAllBookRead(user.token);
        console.log();

        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Nav />
      </header>

      <main className="flex-grow bg-white p-10">
        {loading ? (
          <Spin tip="Loading..." />
        ) : error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={books}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <div className="border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.book.name}
                    </h3>
                    <span className="text-sm text-gray-500 italic">
                      {item.book.category}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-600 text-sm">
                      {item.book.description}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700">
                      Rating:{" "}
                      <span className="text-gray-900">{item.rating} / 10</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      by {item.user.email}
                    </p>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </main>
    </div>
  );
};
