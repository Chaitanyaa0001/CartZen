import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await api.post('/api/auth/logout');
      if (res.status === 200) {
        toast.success("Logged out successfully!");
        navigate('/login');
      }
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
      toast.error("Logout failed!");
    }
  };

  return { logout };
};
