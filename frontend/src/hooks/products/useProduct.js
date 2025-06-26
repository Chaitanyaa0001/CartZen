// ✅ FINAL VERSION: useProduct.js - Uses /api/chat to get bot response and products
import api from "../../api/api";

export const useProducts = () => {
  const fetchProducts = async (message) => {
    try {
      const response = await api.post("/api/chat", { message });
      return {
        botResponse: response.data.response || "Here you go!",
        products: response.data.products || [],
      };
    } catch (error) {
      console.error("Chat API error:", error);
      return {
        botResponse: "Sorry, something went wrong.",
        products: [],
      };
    }
  };

  return { fetchProducts };
};
