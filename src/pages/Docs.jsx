import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const sections = [
	{
		id: 'api',
		title: 'API Reference',
		description:
			'Detailed documentation for all DevFlow endpoints, schemas, parameters, and responses.',
		items: [
			'Authentication & Security',
			'REST endpoints and error codes',
			'GraphQL schema and resolvers',
			'Rate limits and best practices',
		],
	},
	{
		id: 'tutorials',
		title: 'Tutorials',
		description:
			'Step-by-step guides that take you from zero to production with real examples.',
		items: [
			'Build a Todo REST API',
			'Set up a GraphQL blog',
			'Deploy with CI/CD',
			'Add realtime updates',
		],
	},
	{
		id: 'faq',
		title: 'FAQ',
		description:
			'Answers to common questions about features, pricing, support, and ecosystem.',
		items: [
			'What environments are supported?',
			'How do I monitor usage?',
			'What are the limits?',
			'How to contact support?',
		],
	},
];

const Docs = () => {
	const scrollTo = useCallback((id) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, []);

	return (
		<section className="bg-gray-50 py-12">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
				<header className="text-center">
					<h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						Documentation
					</h1>
					<p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
						Comprehensive guides, API references, and tutorials to help you get
						started and build with DevFlow.
					</p>
				</header>

				{/* Quick links */}
				<div className="mt-10 grid gap-4 sm:grid-cols-2">
					{sections.map((s) => (
						<button
							key={s.id}
							onClick={() => scrollTo(s.id)}
							className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:shadow-md"
						>
							<span className="mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
								★
							</span>
							<span>
								<span className="block text-base font-semibold text-gray-900">
									{s.title}
								</span>
								<span className="mt-1 block text-sm text-gray-500">
									{s.description}
								</span>
							</span>
						</button>
					))}
				</div>

				{/* Sections */}
				<div className="mt-12 space-y-12">
					{sections.map((s) => (
						<section
							key={s.id}
							id={s.id}
							className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
						>
							<h2 className="text-xl font-bold text-gray-900">{s.title}</h2>
							<p className="mt-2 text-gray-600">{s.description}</p>
							<ul className="mt-4 list-disc space-y-1 pl-5 text-gray-700">
								{s.items.map((item, idx) => (
									<li key={idx}>{item}</li>
								))}
							</ul>
							<div className="mt-5">
								<a
									href="#"
									className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
								>
									Read the Docs →
								</a>
							</div>
						</section>
					))}
				</div>

				{/* CTA */}
				<div className="mt-12 flex justify-center">
					<Link
						to="/features"
						className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow transition hover:bg-blue-700"
					>
						Get Started Free
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Docs;
