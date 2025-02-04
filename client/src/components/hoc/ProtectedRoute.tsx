import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state) => state.appSlice.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === 0 || !user.isAdmin) {
      navigate('/');
    }
  }, [user]);

  return children;
};

export default ProtectedRoute;
