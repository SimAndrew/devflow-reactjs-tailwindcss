import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ redirectTo = '/login' }) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) return null; // you can add a spinner here

	if (!user) {
		return <Navigate to={redirectTo} replace state={{ from: location }} />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
