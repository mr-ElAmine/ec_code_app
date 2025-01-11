import React, { useState, useContext, useEffect } from "react";
import { Modal, Input, Button, List, Spin, message, Empty } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllBooks } from "../../repository/getAllBooks";

const ResearchBookModal = () => {
  const { user } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    if (!user?.token) {
      message.warning("Veuillez vous connecter pour rechercher des livres.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSearchQuery("");
    setFilteredBooks([]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      const filtered = books.filter((book) =>
        book.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      if (user?.token) {
        const bookList = await getAllBooks(user.token);
        setBooks(bookList);
        setFilteredBooks(bookList);
      } else {
        console.warn("Le jeton de l'utilisateur n'est pas disponible.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
      message.error("Erreur lors de la récupération des livres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalVisible) fetchBooks();
  }, [isModalVisible]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Ouvrir la barre de recherche
      </Button>
      <Modal
        title="Recherche de livres"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          placeholder="Entrez le nom du livre"
          value={searchQuery}
          onChange={handleSearchChange}
          allowClear
        />
        {loading ? (
          <Spin tip="Chargement des livres..." />
        ) : filteredBooks.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={filteredBooks}
            renderItem={(book) => (
              <List.Item>
                <List.Item.Meta
                  title={book.name}
                  description={
                    <>
                      <p>
                        {book.description || "Aucune description disponible."}
                      </p>
                      <p>
                        {book.average_rating
                          ? `${book.average_rating} / 10`
                          : "Non noté"}
                      </p>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description="Aucun livre trouvé" />
        )}
      </Modal>
    </>
  );
};

export default ResearchBookModal;
