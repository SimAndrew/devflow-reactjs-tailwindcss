import React, { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const [showPassword, setShowPassword] = useState(false);

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	const validate = () => {
		const errs = [];

		// Email checks
		if (!email.trim()) {
			errs.push('Email is required.');
		} else if (!emailRegex.test(email)) {
			errs.push(
				'Enter a valid email (Latin letters, digits, and allowed symbols only).',
			);
		}

		// Password checks
		if (!password) {
			errs.push('Password is required.');
		} else {
			// Only latin letters and digits, exactly 8 chars
			const onlyAlnum = /^[A-Za-z0-9]+$/.test(password);
			if (password.length < 8) {
				errs.push('Password must be at least 8 characters.');
			}
			if (!onlyAlnum) {
				errs.push('Password must contain only Latin letters and digits.');
			}

			// Composition rule: 8 total with exactly 5 letters (>=1 uppercase) and 3 digits
			if (onlyAlnum && password.length >= 8) {
				const letters = (password.match(/[A-Za-z]/g) || []).length;
				const digits = (password.match(/[0-9]/g) || []).length;
				const uppers = (password.match(/[A-Z]/g) || []).length;
				if (
					!(
						letters === 5 &&
						digits === 3 &&
						uppers >= 1 &&
						password.length === 8
					)
				) {
					errs.push(
						'Password must be 8 chars: 5 Latin letters (at least 1 uppercase) and 3 digits.',
					);
				}
			}
		}

		setErrors(errs);
		return errs.length === 0;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!validate()) return;
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
					{errors.length > 0 && (
						<div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
							<ul className="list-disc pl-5">
								{errors.map((er, i) => (
									<li key={i}>{er}</li>
								))}
							</ul>
						</div>
					)}

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
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
							placeholder="••••••••"
							aria-describedby="password-hint"
						/>
						<button
							type="button"
							className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
							aria-label={showPassword ? 'Hide password' : 'Show password'}
							onClick={() => setShowPassword((v) => !v)}
						>
							{showPassword ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4.03-9-9 0-1.07.19-2.09.54-3.03m1.46-2.97A9.97 9.97 0 0112 5c5 0 9 4.03 9 9 0 1.07-.19 2.09-.54 3.03m-1.46 2.97A9.97 9.97 0 0112 19c-1.07 0-2.09-.19-3.03-.54m-2.97-1.46A9.97 9.97 0 015 12c0-1.07.19-2.09.54-3.03m2.97-2.97A9.97 9.97 0 0112 5c1.07 0 2.09.19 3.03.54m2.97 1.46A9.97 9.97 0 0119 12c0 1.07-.19 2.09-.54 3.03m-2.97 2.97A9.97 9.97 0 0112 19c-1.07 0-2.09-.19-3.03-.54"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 4l16 16"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							)}
						</button>
					</div>
					<p id="password-hint" className="mt-1 text-xs text-gray-500">
						Password must be 8 characters: 5 Latin letters (at least 1
						uppercase) and 3 digits; Latin letters and digits only.
					</p>

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
