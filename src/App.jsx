import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Developers from './components/Developers';
import ApiDevelopment from './components/ApiDevelopment';
import DashboardManagement from './components/DashboardManagement';
import TrustedByDevelopers from './components/TrustedByDevelopers.jsx';

function App() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<Hero />
			<Developers />
			<ApiDevelopment />
			<DashboardManagement />
			<TrustedByDevelopers />
		</div>
	);
}

export default App;
