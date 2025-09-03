import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Developers from './components/Developers';
import ApiDevelopment from './components/ApiDevelopment';

function App() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<Hero />
			<Developers />
			<ApiDevelopment />
		</div>
	);
}

export default App;
