import 'swiper/css';
import 'swiper/css/pagination';

const TESTIMONIALS = [
	{
		name: 'Alice Johnson',
		role: 'Senior Backend Engineer',
		company: 'Acme Corp',
		quote:
			'DevFlow dramatically simplified our API development. We shipped features twice as fast and reduced boilerplate by 60%.',
		initials: 'AJ',
	},
	{
		name: 'Marcus Lee',
		role: 'Full‑Stack Developer',
		company: 'BetaSoft',
		quote:
			'The developer experience is top‑notch. From local dev to deployment, everything feels streamlined and reliable.',
		initials: 'ML',
	},
	{
		name: 'Priya Sharma',
		role: 'Platform Engineer',
		company: 'Nimbus',
		quote:
			'We migrated several microservices to DevFlow. Observability and performance tuning became so much easier.',
		initials: 'PS',
	},
	{
		name: 'Diego Fernández',
		role: 'API Architect',
		company: 'CloudNine',
		quote:
			'Schema‑first design and great tooling. Our team aligned quickly around consistent API standards.',
		initials: 'DF',
	},
	{
		name: 'Sara Kim',
		role: 'Frontend Lead',
		company: 'Moonshot',
		quote:
			'The SDKs are excellent. We integrated auth and realtime updates in days, not weeks.',
		initials: 'SK',
	},
	{
		name: 'Tom Walker',
		role: 'CTO',
		company: 'BrightApps',
		quote:
			'We saw a 30% drop in incidents after adopting DevFlow. Built‑in best practices really pay off.',
		initials: 'TW',
	},
	{
		name: 'Linda Park',
		role: 'DevOps Engineer',
		company: 'RocketLabs',
		quote:
			"DevFlow's CI/CD integration is seamless. Our deployment pipeline is now fully automated and error-free.",
		initials: 'LP',
	},
	{
		name: 'James Carter',
		role: 'Lead API Developer',
		company: 'NextGen',
		quote:
			'The documentation and code samples are fantastic. Our onboarding time for new devs dropped by half.',
		initials: 'JC',
	},
	{
		name: 'Elena Petrova',
		role: 'Cloud Solutions Architect',
		company: 'SkyNetics',
		quote:
			"DevFlow's scalability is impressive. We handled traffic spikes with zero downtime.",
		initials: 'EP',
	},
	{
		name: 'Mohammed Al-Farsi',
		role: 'API Security Specialist',
		company: 'SecureAPI',
		quote:
			'Built-in security features saved us weeks of work. OAuth and rate limiting are just a config away.',
		initials: 'MA',
	},
	{
		name: 'Julia Nguyen',
		role: 'Product Manager',
		company: 'Appify',
		quote:
			'Our team loves the analytics dashboard. We track usage and errors in real time, making decisions faster.',
		initials: 'JN',
	},
	{
		name: 'Victor Chen',
		role: 'Senior Software Engineer',
		company: 'DataStream',
		quote:
			"DevFlow's support is outstanding. Quick responses and helpful advice every time we reach out.",
		initials: 'VC',
	},
];

const Avatar = ({ initials }) => (
	<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-sm font-bold text-white ring-4 ring-indigo-50">
		{initials}
	</div>
);

const TestimonialCard = ({ t }) => (
	<div className="h-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
		<div className="flex items-center gap-4">
			<Avatar initials={t.initials} />
			<div>
				<p className="text-base font-semibold text-gray-900">{t.name}</p>
				<p className="text-sm text-gray-500">
					{t.role} • {t.company}
				</p>
			</div>
		</div>
		<p className="mt-4 text-gray-700">“{t.quote}”</p>
	</div>
);

const Testimonials = () => {
	return (
		<section className="bg-gray-50 py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<header className="text-center">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						What developers say
					</h1>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
						Real stories from teams building APIs faster with DevFlow.
					</p>
				</header>

				<div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{TESTIMONIALS.map((t, idx) => (
						<TestimonialCard key={idx} t={t} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
