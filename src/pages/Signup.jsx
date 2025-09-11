import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [agree, setAgree] = useState(false);
	const [error, setError] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const validate = () => {
		if (!name.trim()) return 'Full name is required';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			return 'Enter a valid email address';
		if (password.length < 8) return 'Password must be at least 8 characters';
		if (password !== confirm) return 'Passwords do not match';
		if (!agree) return 'You must accept the Terms';
		return '';
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const msg = validate();
		if (msg) {
			setError(msg);
			return;
		}
		setError('');
		setSubmitting(true);
		try {
			// TODO: replace with real API call
			await new Promise((res) => setTimeout(res, 600));
			console.log('Signup payload', { name, email });
			alert('Account created. You can now log in.');
		} catch {
			setError('Something went wrong. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="bg-gray-50 py-12">
			<div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
				<h1 className="text-center text-3xl font-extrabold text-gray-900">
					Get Started
				</h1>
				<p className="mt-2 text-center text-gray-500">
					Create your DevFlow account to start building.
				</p>

				<form
					onSubmit={onSubmit}
					className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
				>
					{error && (
						<div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
							{error}
						</div>
					)}

					<label className="block text-sm font-medium text-gray-700">
						Full name
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
						placeholder="Ada Lovelace"
						autoComplete="name"
						required
					/>

					<label className="mt-4 block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
						placeholder="you@example.com"
						autoComplete="email"
						required
					/>

					<label className="mt-4 block text-sm font-medium text-gray-700">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
						placeholder="••••••••"
						autoComplete="new-password"
						required
						minLength={8}
					/>
					<p className="mt-1 text-xs text-gray-500">
						Use 8+ characters with a mix of letters, numbers and symbols.
					</p>

					<label className="mt-4 block text-sm font-medium text-gray-700">
						Confirm password
					</label>
					<input
						type="password"
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
						className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
						placeholder="••••••••"
						autoComplete="new-password"
						required
					/>

					<label className="mt-5 inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="checkbox"
							checked={agree}
							onChange={(e) => setAgree(e.target.checked)}
							className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
						/>
						I agree to the{' '}
						<a className="text-indigo-600 hover:text-indigo-700" href="#">
							Terms
						</a>{' '}
						and{' '}
						<a className="text-indigo-600 hover:text-indigo-700" href="#">
							Privacy Policy
						</a>
						.
					</label>

					<button
						type="submit"
						disabled={submitting}
						className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{submitting ? 'Creating account…' : 'Create account'}
					</button>

					<p className="mt-4 text-center text-sm text-gray-600">
						Already have an account?{' '}
						<Link
							to="/login"
							className="font-medium text-indigo-600 hover:text-indigo-700"
						>
							Log in
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Signup;
