import axios from "axios";

export async function bookReadUpdate(token, bookReadId, updateData) {
  try {
    const response = await axios.put(
      "api/book/read/update",
      { book_read_id: bookReadId, ...updateData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating BookRead:",
      error.response?.data || error.message
    );
    throw error;
  }
}
