import { Link } from 'react-router-dom';

const featuresData = [
	{
		title: 'Instant Deployment',
		description:
			'Ship your backend in seconds. Zero config, built-in CI/CD, automatic HTTPS.',
		icon: () => (
			<svg
				className="h-6 w-6 text-indigo-500"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4 16.5V21m16-4.5V21M4 12l8-9 8 9M5.5 10.5h13M9 21v-6h6v6"
				/>
			</svg>
		),
	},
	{
		title: 'Managed Database',
		description:
			'Scalable, backed-up, globally replicated data with schema validation.',
		icon: () => (
			<svg
				className="h-6 w-6 text-indigo-500"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<ellipse cx="12" cy="6" rx="8" ry="3" />
				<path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
				<path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
			</svg>
		),
	},
	{
		title: 'Built-in Auth',
		description:
			'First-class auth: API keys, OAuth, JWT, role-based access out of the box.',
		icon: () => (
			<svg
				className="h-6 w-6 text-indigo-500"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 12a3 3 0 100-6 3 3 0 000 6z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4 21a8 8 0 1116 0"
				/>
			</svg>
		),
	},
	{
		title: 'Auto-Scaling',
		description:
			'Traffic spikes handled automatically. Scale to zero when idle to save cost.',
		icon: () => (
			<svg
				className="h-6 w-6 text-indigo-500"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 3v6h6M21 21v-6h-6M21 3h-6v6M3 21h6v-6"
				/>
			</svg>
		),
	},
	{
		title: 'Real-time Monitoring',
		description:
			'Live logs, traces & metrics with anomaly detection and alert routing.',
		icon: () => (
			<svg
				className="h-6 w-6 text-indigo-500"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 13l3-3 4 4 7-8 4 5"
				/>
			</svg>
		),
	},
	{
		title: 'Unified APIs',
		description:
			'REST, GraphQL & Webhooks unified with consistent auth and rate limits.',
		icon: () => (
			<svg
				className="h-6 w-6 text-indigo-500"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 12h12M12 6v12"
				/>
			</svg>
		),
	},
	{
		title: 'Edge Caching',
		description:
			'Automatic global CDN caching with smart invalidation for dynamic routes.',
		icon: () => (
			<svg
				className="h-6 w-6 text-indigo-500"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<circle cx="12" cy="12" r="3" />
				<path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009.4 19a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 005 15.4a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 005 9.4a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009.4 5a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09A1.65 1.65 0 0014.6 5c.46 0 .91-.2 1.23-.52l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06c-.32.32-.52.77-.52 1.23 0 .46.2.91.52 1.23l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06A1.65 1.65 0 0014.6 15c-.46 0-.91.2-1.23.52l-.06.06a2 2 0 01-2.83 0l-.06-.06A1.65 1.65 0 009.4 15c-.46 0-.91.2-1.23.52l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 005 9.4c0-.46-.2-.91-.52-1.23l-.06-.06a2 2 0 010-2.83" />
			</svg>
		),
	},
	{
		title: 'Observability API',
		description:
			'Programmatic access to logs, metrics & traces for custom dashboards.',
		icon: () => (
			<svg
				className="h-6 w-6 text-indigo-500"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4 19h16M4 5h16M9 5v14M15 5v14"
				/>
			</svg>
		),
	},
	{
		title: 'Role-based Access',
		description:
			'Fine-grained permissions and audit trails for compliance & security.',
		icon: () => (
			<svg
				className="h-6 w-6 text-indigo-500"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 12a5 5 0 100-10 5 5 0 000 10z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M2 21a10 10 0 0120 0"
				/>
			</svg>
		),
	},
];

const FeatureCard = ({ title, description, Icon: IconComponent }) => (
	<div className="group relative rounded-xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
		<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 ring-1 ring-indigo-100 ring-inset group-hover:bg-indigo-100">
			{IconComponent()}
		</div>
		<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
		<p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
		<div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent opacity-0 transition group-hover:opacity-100" />
	</div>
);

const Features = () => {
	return (
		<main
			id="features"
			className="w-full bg-gradient-to-b from-white via-gray-50 to-white pt-20 pb-24"
		>
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					<span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium tracking-wide text-indigo-600 uppercase">
						<span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Platform
					</span>
					<h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Everything you need to build & scale APIs
					</h1>
					<p className="mt-6 text-lg leading-relaxed text-gray-600">
						DevFlow bundles infrastructure, database, auth, observability and
						deployment so you can focus on product—not plumbing.
					</p>
				</div>

				<div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{featuresData.map((f) => (
						<FeatureCard
							key={f.title}
							title={f.title}
							description={f.description}
							Icon={f.icon}
						/>
					))}
				</div>

				<div className="mt-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900">
							Simple API-first workflow
						</h2>
						<p className="mt-4 text-base leading-relaxed text-gray-600">
							Define endpoints, attach policies, stream logs and ship—without
							leaving your code editor. We generate the plumbing, you own the
							business logic.
						</p>
						<ul className="mt-6 space-y-3 text-sm text-gray-700">
							<li className="flex items-start gap-2">
								<span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />{' '}
								Unified REST & GraphQL layer
							</li>
							<li className="flex items-start gap-2">
								<span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />{' '}
								Built-in rate limiting & caching
							</li>
							<li className="flex items-start gap-2">
								<span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />{' '}
								One-command deploy & rollback
							</li>
							<li className="flex items-start gap-2">
								<span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />{' '}
								Production-grade observability
							</li>
						</ul>
					</div>
					<div className="relative">
						<div className="pointer-events-none absolute -inset-4 rounded-2xl bg-gradient-to-tr from-indigo-200/30 via-transparent to-purple-200/30" />
						<div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-900 p-5 font-mono text-[13px] leading-relaxed text-gray-200 shadow-xl">
							<div className="mb-3 flex items-center gap-2 text-xs text-gray-400">
								<span className="h-2 w-2 rounded-full bg-red-400" />
								<span className="h-2 w-2 rounded-full bg-yellow-400" />
								<span className="h-2 w-2 rounded-full bg-green-400" />
								<span className="ml-2">/api/todos.ts</span>
							</div>
							<pre className="whitespace-pre-wrap">
								{`import { api, db, auth } from '@devflow/core';

// Auth-protected endpoint
api.post('/todos', auth(), async (req) => {
  const { title, description } = req.body;
  if (!title) return { status: 400, body: { error: 'Title required' } };

  const todo = await db.todos.create({
    title,
    description,
    completed: false,
    userId: req.user.id
  });
  return { status: 201, body: todo };
});

// Query current user todos
api.get('/todos', auth(), async (req) => {
  return db.todos.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } });
});

// Deploy instantly
api.deploy();`}
							</pre>
						</div>
					</div>
				</div>

				<div className="mt-28 rounded-2xl border border-indigo-200/40 bg-white p-10 shadow-sm ring-1 ring-indigo-100/50 sm:p-14">
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
							Ready to explore the full platform?
						</h2>
						<p className="mt-4 text-base leading-relaxed text-gray-600">
							Start building in under a minute. No credit card required.
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Link
								to="/docs"
								className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
							>
								Read the Docs
							</Link>
							<Link
								to="/"
								className="inline-flex items-center justify-center rounded-md border border-indigo-200 bg-indigo-50 px-6 py-3 text-sm font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
							>
								Get Started Free
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Features;
