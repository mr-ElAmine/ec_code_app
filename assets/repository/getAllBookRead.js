import axios from "axios";

export async function getAllBookRead(token) {
  try {
    const response = await axios.get("/api/book/read/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des livres lus :",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        "Erreur inconnue lors de la récupération des livres lus."
    );
  }
}
