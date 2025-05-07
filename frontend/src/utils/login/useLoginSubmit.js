import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminServices from '../../services/AdminServices';
import { notifyError, notifySuccess } from '../toast';

const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, verifyEmail, password, role }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

    if (location.pathname === '/login') {
      AdminServices.loginAdmin({ email, password })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Login Success!');
            Cookies.set('adminInfo', JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            navigate('/dashboard');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          console.log(11111)
          setLoading(false);
        });
    }

    if (location.pathname === '/signup') {
      AdminServices.registerAdmin({ name, email, password, role })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Register Success!');
            Cookies.set('adminInfo', JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            navigate('/dashboard');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
};
return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;