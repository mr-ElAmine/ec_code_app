import axios from "axios";

export async function getAllBooks(token) {
  try {
    const response = await axios.get("/api/all-books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des livres :",
      error.response.data
    );
  }
}
