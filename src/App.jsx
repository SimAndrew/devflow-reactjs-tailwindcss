import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Developers from './components/Developers';

function App() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<Hero />
			<Developers />
		</div>
	);
}

export default App;
