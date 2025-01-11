import axios from "axios";

export async function getAllBookReadForUser(userEmail, token) {
  try {
    const response = await axios.get("/book/read/user", {
      params: {
        user_email: userEmail,
      },
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
    throw error;
  }
}
