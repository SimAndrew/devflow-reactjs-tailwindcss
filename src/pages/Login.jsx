import React, { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		// TODO: hook up real auth
		console.log({ email, password });
	};

	return (
		<section className="bg-gray-50 py-12">
			<div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
				<h1 className="text-center text-3xl font-extrabold text-gray-900">
					Log In
				</h1>
				<p className="mt-2 text-center text-gray-500">
					Welcome back. Please enter your credentials.
				</p>

				<form
					onSubmit={onSubmit}
					className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
				>
					<label className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
						placeholder="you@example.com"
					/>

					<label className="mt-4 block text-sm font-medium text-gray-700">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
						placeholder="••••••••"
					/>

					<button
						type="submit"
						className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
					>
						Log In
					</button>
				</form>
			</div>
		</section>
	);
};

export default Login;
