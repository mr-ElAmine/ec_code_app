import React, { useState, useEffect, useContext } from "react";
import { Table, Spin, Alert, Empty } from "antd";
import { getAllBookReadForUser } from "../../repository/getAllBookReadForUser";
import { AuthContext } from "../../contexts/AuthContext";
import UpdateReadingFormModal from "./UpdateReadingFormModal";

const InProgressBooksTable = () => {
  const { user, addReadBookEvent } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ajouté le",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        return (
          <UpdateReadingFormModal
            bookReadId={record.id}
            bookId={record.bookId}
            notes={record.notes}
            rating={record.rating}
            isFinished={record.isRead}
          />
        );
      },
    },
  ];

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      if (user?.username && user?.token) {
        const data = await getAllBookReadForUser(user.username, user.token);

        const unreadBooks = data
          .filter((bookRead) => !bookRead.is_read)
          .map((bookRead, index) => ({
            key: `${bookRead.book.name}-${index}`,
            updatedAt: bookRead.updated_at,
            name: bookRead.book.name,
            description: bookRead.book.description,
            notes: bookRead.description,
            id: bookRead.id,
            bookId: bookRead.book.id,
            rating: bookRead.rating,
            isRead: bookRead.is_read,
          }));
        setBooks(unreadBooks);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError(err.response?.data?.message || "Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user?.username, user?.token, addReadBookEvent]);

  if (loading) {
    return <Spin tip="Chargement des livres en cours..." />;
  }

  if (error) {
    return (
      <Alert
        message="Erreur"
        description={error}
        type="error"
        className="w-full"
      />
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex justify-center items-center w-full border-2 rounded-lg bg-gray-50">
        <Empty description="Aucun livre en cours de lecture" />
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={books}
      bordered
      title={() => "Livres en cours de lecture"}
      className="w-full shadow-md"
      pagination={false}
    />
  );
};

export default InProgressBooksTable;
