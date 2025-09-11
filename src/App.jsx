import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import Features from './pages/Features.jsx';
import Examples from './pages/Examples.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Docs from './pages/Docs.jsx';
import Community from './pages/Community.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/features" element={<Features />} />
				<Route path="/examples" element={<Examples />} />
				<Route path="/testimonials" element={<Testimonials />} />
				<Route path="/docs" element={<Docs />} />
				<Route path="/community" element={<Community />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;
