import requests from "./httpService";
import Cookies from 'js-cookie';
const AdminServices = {
  registerAdmin: async (body) => {
    return requests.post("/admin/auth/register", body);
  },

  loginAdmin: async (body) => {
    return requests.post(`/admin/auth/login`, body);
  },
  logoutAdmin: async () => {
    return requests.post('/admin/auth/logout');
  }
 
};

export default AdminServices;
