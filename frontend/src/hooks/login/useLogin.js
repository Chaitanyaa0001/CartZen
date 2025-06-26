import { toast } from 'react-toastify';
import api from "../../api/api";

export const useLogin = () => {
  const login = async (formData) => {
    try {
      const response = await api.post("/api/auth/login", formData);
      toast.success("Login successful!");
      return { success: true, data: response.data };
    } catch (error) {
      console.log('login error hook:', error);
      const errMsg = error.response?.data?.error || "Login failed.";
      toast.error(errMsg);
      return { success: false, error: errMsg };
    }
  };

  return { login };
};
