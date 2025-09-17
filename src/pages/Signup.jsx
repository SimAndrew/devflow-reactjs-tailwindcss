// Signup page: user registration with validation and Supabase auth
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabaseClient';

// Signup page component
const Signup = () => {
	// UI state: toggles and request status
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [serverError, setServerError] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const errorRef = useRef(null);
	const navigate = useNavigate();

	// React Hook Form setup
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ mode: 'onSubmit' });

	// Validation helpers (email regex) and watched values
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const passwordValue = watch('password', '');

	// Submit handler: create account via Supabase and seed profile
	const onSubmit = async (data) => {
		setServerError(null);
		setSubmitting(true);
		try {
			const { name, email, password } = data;

			const { data: signUpData, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: { full_name: name },
					emailRedirectTo: `${window.location.origin}/auth/callback`,
				},
			});
			if (error) throw error;

			try {
				const userId =
					signUpData.user?.id ?? signUpData.session?.user?.id ?? null;
				if (userId) {
					await supabase
						.from('profiles')
						.upsert({ id: userId, full_name: name }, { onConflict: 'id' });
				}
			} catch (profileErr) {
				console.warn('profiles upsert skipped:', profileErr?.message);
			}

			navigate('/login', {
				replace: true,
				state: { msg: 'Check your email to confirm your account.' },
			});
		} catch (e) {
			setServerError(e.message || 'Signup error');
		} finally {
			setSubmitting(false);
		}
	};

	// Collect validation error messages for the banner
	const errorList = Object.values(errors)
		.map((e) => e?.message)
		.filter(Boolean);

	// Auto-scroll to the error banner when errors appear
	useEffect(() => {
		if (errorList.length > 0 && errorRef.current) {
			errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [errorList.length]);

	// Render
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
					onSubmit={handleSubmit(onSubmit)}
					className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
				>
					{/* Validation errors banner */}
					{errorList.length > 0 && (
						<div
							ref={errorRef}
							className="z-10 mb-6 rounded-md border border-red-400 bg-red-50 px-4 py-3 text-base text-red-700 shadow-lg"
							style={{ position: 'relative' }}
						>
							<ul className="list-disc pl-5">
								{errorList.map((er, i) => (
									<li key={i}>{er}</li>
								))}
							</ul>
						</div>
					)}

					{/* Server error message */}
					{serverError && (
						<div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
							{serverError}
						</div>
					)}

					{/* Full name field */}
					<label className="block text-sm font-medium text-gray-700">
						Full name
					</label>
					<input
						type="text"
						placeholder="Ada Lovelace"
						autoComplete="name"
						className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
						{...register('name', {
							required: 'Full name is required.',
							minLength: {
								value: 2,
								message: 'Name must be at least 2 characters.',
							},
							pattern: {
								value: /^[A-Za-z][A-Za-z '-]*$/,
								message:
									'Use Latin letters, spaces, hyphens, and apostrophes only.',
							},
						})}
					/>

					{/* Email field */}
					<label className="mt-4 block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
						{...register('email', {
							required: 'Email is required.',
							pattern: {
								value: emailRegex,
								message:
									'Enter a valid email (Latin letters, digits, and allowed symbols only).',
							},
						})}
					/>

					{/* Password field with show/hide toggle and custom rules */}
					<label className="mt-4 block text-sm font-medium text-gray-700">
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••"
							autoComplete="new-password"
							className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
							aria-describedby="password-hint"
							{...register('password', {
								required: 'Password is required.',
								minLength: {
									value: 8,
									message: 'Password must be at least 8 characters.',
								},
								validate: (value) => {
									if (!/^[A-Za-z0-9]+$/.test(value)) {
										return 'Password must contain only Latin letters and digits.';
									}
									const letters = (value.match(/[A-Za-z]/g) || []).length;
									const digits = (value.match(/[0-9]/g) || []).length;
									const uppers = (value.match(/[A-Z]/g) || []).length;
									if (
										!(
											letters === 5 &&
											digits === 3 &&
											uppers >= 1 &&
											value.length === 8
										)
									) {
										return 'Password must be 8 chars: 5 Latin letters (at least 1 uppercase) and 3 digits.';
									}
									return true;
								},
							})}
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

					{/* Confirm password field with show/hide toggle */}
					<label className="mt-4 block text-sm font-medium text-gray-700">
						Confirm password
					</label>
					<div className="relative">
						<input
							type={showConfirm ? 'text' : 'password'}
							placeholder="••••••••"
							autoComplete="new-password"
							className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
							{...register('confirm', {
								required: 'Confirm your password.',
								validate: (value) =>
									value === passwordValue ? true : 'Passwords do not match.',
							})}
						/>
						<button
							type="button"
							className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
							aria-label={showConfirm ? 'Hide password' : 'Show password'}
							onClick={() => setShowConfirm((v) => !v)}
						>
							{showConfirm ? (
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
										d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4.03-9-9 0-1.07.19-2.09.54-3.03m-1.46-2.97A9.97 9.97 0 0112 5c5 0 9 4.03 9 9 0 1.07-.19 2.09-.54 3.03m-1.46 2.97A9.97 9.97 0 0112 19c-1.07 0-2.09-.19-3.03-.54m-2.97-1.46A9.97 9.97 0 015 12c0-1.07.19-2.09.54-3.03m2.97-2.97A9.97 9.97 0 0112 5c1.07 0 2.09.19 3.03.54m2.97 1.46A9.97 9.97 0 0119 12c0 1.07-.19 2.09-.54 3.03m-2.97 2.97A9.97 9.97 0 0112 19c-1.07 0-2.09-.19-3.03-.54"
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

					{/* Terms consent checkbox */}
					<label className="mt-5 inline-flex items-center gap-2 text-sm text-gray-700">
						<input
							type="checkbox"
							className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
							{...register('agree', { required: 'You must accept the Terms.' })}
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

					{/* Submit button */}
					<button
						type="submit"
						disabled={submitting}
						className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-50"
					>
						{submitting ? 'Creating...' : 'Create account'}
					</button>

					{/* Link to login */}
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
