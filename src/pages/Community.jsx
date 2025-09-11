import React from 'react';

const channels = [
	{
		badge: 'GH',
		title: 'GitHub Discussions',
		description:
			'Ask questions, share ideas, and help others build with DevFlow.',
		action: { label: 'Start a discussion', href: 'https://github.com/' },
	},
	{
		badge: 'DC',
		title: 'Discord',
		description: 'Chat live with the community and the core team.',
		action: { label: 'Join Discord', href: 'https://discord.com/' },
	},
	{
		badge: 'SO',
		title: 'Stack Overflow',
		description:
			'Use the devflow tag to get help from the wider developer community.',
		action: { label: 'Browse Q&A', href: 'https://stackoverflow.com/' },
	},
	{
		badge: 'X',
		title: 'Twitter / X',
		description: 'Follow updates, releases, and tips from the team.',
		action: { label: 'Follow @devflow', href: 'https://x.com' },
	},
	{
		badge: 'IG',
		title: 'Instagram',
		description: 'Stay in the loop with monthly digests and case studies.',
		action: { label: 'Subscribe', href: 'https://www.instagram.com/' },
	},
	{
		badge: 'EV',
		title: 'Events',
		description:
			'Join meetups, livestreams, and workshops hosted by the community.',
		action: { label: 'See calendar', href: 'https://events.com/' },
	},
];

const Stat = ({ value, label }) => (
	<div className="text-center">
		<div className="text-3xl font-bold text-gray-900">{value}</div>
		<div className="mt-1 text-sm text-gray-500">{label}</div>
	</div>
);

const Badge = ({ children }) => (
	<div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 text-xs font-bold text-white shadow-sm">
		{children}
	</div>
);

const Community = () => {
	return (
		<section className="bg-gray-50 py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<header className="text-center">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Join the DevFlow Community
					</h1>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
						Connect with developers, learn best practices, and help shape the
						future of API development.
					</p>
				</header>

				<div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
					<Stat value="12k+" label="Community members" />
					<Stat value="450+" label="Contributors" />
					<Stat value="8k+" label="GitHub stars" />
					<Stat value="120+" label="Releases" />
				</div>

				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{channels.map((c) => (
						<div
							key={c.title}
							className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
						>
							<div className="flex items-start gap-3">
								<Badge>{c.badge}</Badge>
								<div>
									<h3 className="text-base font-semibold text-gray-900">
										{c.title}
									</h3>
									<p className="mt-1 text-sm text-gray-600">{c.description}</p>
								</div>
							</div>
							<div className="mt-4">
								<a
									href={c.action.href}
									className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
								>
									{c.action.label}
									<svg
										className="h-4 w-4"
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d="M13 5l7 7-7 7-1.41-1.41L16.17 13H4v-2h12.17l-4.58-4.59L13 5z" />
									</svg>
								</a>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 p-8">
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="text-2xl font-bold text-gray-900">
							Become a contributor
						</h2>
						<p className="mt-2 text-gray-600">
							We welcome contributions of all kinds: bug reports, docs,
							examples, and features. Check the guidelines and pick a good first
							issue.
						</p>
						<div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<a
								href="#"
								className="w-full rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto"
							>
								Contribution guide
							</a>
							<a
								href="#"
								className="w-full rounded-md border border-indigo-200 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50 sm:w-auto"
							>
								Good first issues
							</a>
						</div>
					</div>
				</div>

				<div className="mt-10 text-center">
					<p className="text-sm text-gray-500">
						By participating, you agree to follow our{' '}
						<a
							href="#"
							className="font-medium text-indigo-600 hover:text-indigo-700"
						>
							Code of Conduct
						</a>
						.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Community;
