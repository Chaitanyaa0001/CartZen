import { toast } from 'react-toastify';
import api from "../../api/api";

export const useSignup = () => {
  const signup = async (formData) => {
    try {
      const response = await api.post('/api/auth/signup', formData);
      toast.success("Signup successful!");
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Signup failed";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  return { signup };
};
