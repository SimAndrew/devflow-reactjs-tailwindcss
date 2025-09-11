import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../data/navLinks';

const Navbar = () => {
	const [open, setOpen] = useState(false);

	const linkBase = 'text-sm font-medium transition-colors';
	const inactive = 'text-gray-600 hover:text-gray-900';
	const active = 'text-indigo-600';

	return (
		<nav className="w-full border-b border-gray-100 bg-white/90 px-4 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70 sm:px-6 md:py-4">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<div
					className="flex cursor-pointer items-center gap-2"
					onClick={() => (window.location.href = '/')}
				>
					<img src="/devflow-logo.svg" alt="DevFlow" className="h-6 w-6" />
					<span className="text-lg font-semibold text-gray-900">DevFlow</span>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden items-center gap-8 md:flex">
					<nav className="flex items-center gap-8">
						{navLinks.map((l) => (
							<NavLink
								key={l.to}
								to={l.to}
								className={({ isActive }) =>
									`${linkBase} ${isActive ? active : inactive}`
								}
							>
								{l.label}
							</NavLink>
						))}
					</nav>
				</div>

				{/* Desktop Actions */}
				<div className="hidden items-center gap-4 md:flex">
					<button className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
						Log In
					</button>
					<button className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
						Get Started
					</button>
				</div>

				{/* Mobile toggle */}
				<button
					onClick={() => setOpen((o) => !o)}
					className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none md:hidden"
					aria-label="Toggle navigation"
					aria-expanded={open}
				>
					<span className="sr-only">Menu</span>
					<svg
						className={`h-6 w-6 transition-transform ${open ? 'rotate-90' : ''}`}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
					>
						{open ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
							/>
						)}
					</svg>
				</button>
			</div>

			{/* Mobile Panel */}
			<div
				className={`${
					open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
				} overflow-hidden transition-all duration-300 md:hidden`}
			>
				<div className="space-y-6 border-t border-gray-100 pt-2 pb-6">
					<div className="flex flex-col px-2">
						{navLinks.map((l) => (
							<NavLink
								key={l.to}
								to={l.to}
								onClick={() => setOpen(false)}
								className={({ isActive }) =>
									`rounded-md px-3 py-2 text-base font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
								}
							>
								{l.label}
							</NavLink>
						))}
					</div>
					<div className="flex flex-col gap-3 px-4">
						<button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
							Log In
						</button>
						<button className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
							Get Started
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
