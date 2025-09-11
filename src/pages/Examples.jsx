import React, { useMemo, useState } from 'react';

const EXAMPLES = [
	{
		title: 'Todo List API',
		description:
			'A classic CRUD REST API for managing todos with validation, auth, and rate limiting.',
		tags: ['REST', 'Node.js'],
		codeUrl: '#',
		demoUrl: '#',
	},
	{
		title: 'GraphQL Blog Backend',
		description:
			'A GraphQL API for posts, comments, and users with pagination and resolvers.',
		tags: ['GraphQL', 'Node.js'],
		codeUrl: '#',
		demoUrl: '#',
	},
	{
		title: 'Real-time Chat',
		description:
			'A WebSocket-powered chat service for rooms, presence, and typing indicators.',
		tags: ['Realtime', 'WebSockets', 'React'],
		codeUrl: '#',
		demoUrl: '#',
	},
	{
		title: 'E-commerce Backend',
		description:
			'Products, carts, checkout flows, and Stripe integration to power a shop.',
		tags: ['REST', 'Stripe'],
		codeUrl: '#',
		demoUrl: '#',
	},
	{
		title: 'URL Shortener',
		description:
			'A tiny service to shorten links with analytics and custom slugs.',
		tags: ['Serverless', 'REST'],
		codeUrl: '#',
		demoUrl: '#',
	},
	{
		title: 'Image Optimizer',
		description:
			'On-the-fly image resizing, caching, and format conversion for fast media.',
		tags: ['Serverless', 'CDN'],
		codeUrl: '#',
		demoUrl: '#',
	},
];

const TAGS = ['All', 'REST', 'GraphQL', 'Realtime', 'Serverless'];

const Examples = () => {
	const [query, setQuery] = useState('');
	const [activeTag, setActiveTag] = useState('All');

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return EXAMPLES.filter((e) => {
			const matchesTag =
				activeTag === 'All' ||
				e.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase());
			const matchesQuery =
				!q ||
				e.title.toLowerCase().includes(q) ||
				e.description.toLowerCase().includes(q);
			return matchesTag && matchesQuery;
		});
	}, [query, activeTag]);

	return (
		<section className="bg-gray-50 py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<header className="text-center">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Explore Examples
					</h1>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
						Discover how to integrate DevFlow into real projects. Browse
						examples, view code, and start building faster.
					</p>
				</header>

				<div className="mt-10 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
					<div className="relative w-full sm:max-w-md">
						<input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search examples..."
							className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							aria-label="Search examples"
						/>
						<span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-5 w-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.25 5.25a7.5 7.5 0 0011.4 11.4z"
								/>
							</svg>
						</span>
					</div>

					<div className="flex flex-wrap gap-2">
						{TAGS.map((tag) => (
							<button
								key={tag}
								onClick={() => setActiveTag(tag)}
								className={
									'rounded-full border px-3 py-1 text-sm transition ' +
									(activeTag === tag
										? 'border-blue-600 bg-blue-600 text-white shadow'
										: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50')
								}
								aria-pressed={activeTag === tag}
							>
								{tag}
							</button>
						))}
					</div>
				</div>

				<div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((ex, idx) => (
						<article
							key={idx}
							className="group overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
						>
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
									{ex.title}
								</h3>
								<p className="mt-2 text-gray-600">{ex.description}</p>
								<div className="mt-4 flex flex-wrap gap-2">
									{ex.tags.map((t) => (
										<span
											key={t}
											className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
										>
											{t}
										</span>
									))}
								</div>
							</div>
							<div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4">
								<a
									href={ex.codeUrl}
									className="text-sm font-medium text-blue-700 hover:text-blue-800"
								>
									View Code →
								</a>
								<a
									href={ex.demoUrl}
									className="text-sm text-gray-600 hover:text-gray-800"
								>
									Live Demo
								</a>
							</div>
						</article>
					))}
				</div>

				{filtered.length === 0 && (
					<p className="mt-16 text-center text-gray-500">
						No examples found. Try a different search.
					</p>
				)}
			</div>
		</section>
	);
};

export default Examples;
