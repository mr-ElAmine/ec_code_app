import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  InputNumber,
  Select,
  message,
} from "antd";
import { getAllBooks } from "../../repository/getAllBooks"; // Adjust the path as per your project structure
import { AuthContext } from "../../contexts/AuthContext";
import { bookReadUpdate } from "../../repository/bookReadUpdate";
const { Option } = Select;

const UpdateReadingForm = ({
  bookReadId,
  bookId,
  notes,
  rating,
  isFinished,
}) => {
  const { user, setAddReadBookEvent } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        if (user?.token) {
          const bookList = await getAllBooks(user.token);
          setBooks(bookList);
        } else {
          console.warn("User token is not available.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
        message.error("Erreur lors de la récupération des livres.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user?.token]);

  useEffect(() => {
    form.setFieldsValue({
      bookId,
      notes,
      rating: Number(rating),
      isFinished,
    });
  }, [form, bookId, notes, rating, isFinished]);

  const onFinish = async (values) => {
    try {
      const bookReadData = {
        user_email: user.username,
        book_id: values.bookId,
        description: values.notes,
        rating: values.rating,
        is_read: values.isFinished,
      };

      console.log(bookReadData);

      await bookReadUpdate(user.token, bookReadId, bookReadData);
      setAddReadBookEvent(true);

      form.resetFields();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la lecture :", error);
      message.error("Erreur lors de l'ajout de la lecture.");
    }
  };

  return (
    <Form form={form} name="reading_form" layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Sélectionnez un livre"
        name="bookId"
        rules={[{ required: true, message: "Veuillez sélectionner un livre." }]}
      >
        <Select loading={loading} placeholder="Choisissez un livre" disabled>
          {books.map((book) => (
            <Option key={book.id} value={book.id}>
              {book.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Mes notes"
        name="notes"
        rules={[{ required: true, message: "Veuillez ajouter vos notes." }]}
      >
        <Input.TextArea
          rows={4}
          placeholder="Notez-ici les idées importantes de l'œuvre."
        />
      </Form.Item>

      <Form.Item
        label="Note"
        name="rating"
        initialValue={1}
        rules={[{ type: "number", min: 1, max: 10, required: true }]}
      >
        <InputNumber min={1} max={10} />
      </Form.Item>

      <Form.Item name="isFinished" valuePropName="checked">
        <Checkbox>Lecture terminée</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enregistrer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateReadingForm;
