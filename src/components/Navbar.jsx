const Navbar = () => {
	return (
		<nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
			<div className="flex items-center">
				<img
					src="/src/assets/devflow-logo.svg"
					alt="DevFlow"
					className="h-5 w-5"
				/>
				<span className="ml-2 text-lg font-semibold text-gray-900">
					DevFlow
				</span>
			</div>

			<div className="flex items-center space-x-4">
				<a href="#features" className="text-gray-600 hover:text-gray-900">
					Features
				</a>
				<a href="#examples" className="text-gray-600 hover:text-gray-900">
					Examples
				</a>
				<a href="#testimonials" className="text-gray-600 hover:text-gray-900">
					Testimonials
				</a>
				<a href="#docs" className="text-gray-600 hover:text-gray-900">
					Docs
				</a>
				<a href="#community" className="text-gray-600 hover:text-gray-900">
					Community
				</a>
			</div>

			<div className="flex items-center space-x-4">
				<button className="px-4 py-2 text-gray-600 hover:text-gray-900">
					Log In
				</button>
				<button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
					Get Started
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
