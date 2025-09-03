import React from 'react';

const Developers = () => {
	const features = [
		{
			icon: (
				<svg
					className="h-8 w-8 text-indigo-600"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13 10V3L4 14h7v7l9-11h-7z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			),
			title: 'Instant Deployment',
			description:
				'Go from code to production in seconds with zero configuration. CI/CD pipeline included.',
		},
		{
			icon: (
				<svg
					className="h-8 w-8 text-indigo-600"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						x="3"
						y="3"
						width="18"
						height="18"
						rx="2"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path
						d="M7 7h10M7 12h10M7 17h10"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			),
			title: 'Managed Database',
			description:
				'Built-in database with automatic scaling, backups, and data validation.',
		},
		{
			icon: (
				<svg
					className="h-8 w-8 text-indigo-600"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			),
			title: 'Built-in Auth',
			description:
				'Secure APIs with zero config auth. JWT, OAuth, and API keys supported out of the box.',
		},
		{
			icon: (
				<svg
					className="h-8 w-8 text-indigo-600"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13 20h-2a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2zM6 20H4a2 2 0 01-2-2v-6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2zM20 20h-2a2 2 0 01-2-2V4a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2z"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg>
			),
			title: 'Auto-Scaling',
			description:
				'Handles traffic spikes automatically. Scale to zero when idle to optimize costs.',
		},
		{
			icon: (
				<svg
					className="h-8 w-8 text-indigo-600"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			),
			title: 'Real-time Monitoring',
			description:
				'Live metrics, logs, and traces with built-in alerting. Debug with confidence.',
		},
		{
			icon: (
				<svg
					className="h-8 w-8 text-indigo-600"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			),
			title: 'Fair Pricing',
			description:
				'Free tier for hobbyists and startups. Pay only for what you use with no surprises.',
		},
	];

	return (
		<section className="bg-white py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<h2 className="mb-4 text-4xl font-extrabold text-gray-900">
						Built for developers, by developers
					</h2>
					<p className="text-xl text-gray-600">
						Everything you need to build, deploy, and scale APIs with
						confidence.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<div key={index} className="relative">
							<div className="flex items-center space-x-4">
								<div className="flex-shrink-0 rounded-lg bg-indigo-100 p-3">
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									{feature.title}
								</h3>
							</div>
							<p className="mt-4 text-base leading-relaxed text-gray-600">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Developers;
