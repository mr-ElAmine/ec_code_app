import axios from "axios";

export async function bookReadAdd(token, bookReadData) {
  try {
    const response = await axios.post("/book/read/add", bookReadData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout d'une lecture :",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
