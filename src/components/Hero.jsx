const Hero = () => {
	return (
		<section className="flex min-h-[520px] items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 md:min-h-[600px]">
			<div className="flex w-full max-w-7xl flex-col items-center justify-center gap-0 px-4 md:flex-row md:gap-8">
				{/* Левая колонка: центрирование, заголовок, описание, кнопки */}
				<div className="flex flex-1 flex-col items-center justify-center text-center md:items-start md:text-left">
					<h1 className="mb-2 text-4xl leading-tight font-extrabold text-white sm:text-5xl md:text-6xl">
						Build APIs in minutes,
						<br className="hidden md:block" />
						<span className="block">not months</span>
					</h1>
					<p className="mt-4 max-w-xl text-lg text-indigo-100 md:max-w-md md:text-xl">
						DevFlow's serverless API platform lets you focus on code, not
						infrastructure. Scale automatically from prototype to production.
					</p>
					<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
						<a
							href="#"
							className="rounded-lg bg-white px-8 py-3 text-lg font-medium text-indigo-600 shadow transition hover:bg-gray-100"
						>
							Get Started Free
						</a>
						<a
							href="#"
							className="text-lg font-bold text-indigo-100 transition hover:text-white"
						>
							View Docs
						</a>
					</div>
				</div>
				{/* Правая колонка: карточка с кодом */}
				<div className="mt-12 flex flex-1 items-center justify-center md:mt-0">
					<div className="w-full max-w-xl">
						<div className="overflow-hidden rounded-2xl shadow-2xl">
							<div className="flex items-center justify-between bg-[#181e36] px-5 py-3">
								<div className="flex items-center gap-2">
									<span className="h-4 w-4 rounded-full bg-red-500"></span>
									<span className="h-4 w-4 rounded-full bg-yellow-400"></span>
									<span className="h-4 w-4 rounded-full bg-green-500"></span>
								</div>
								<span className="font-mono text-sm text-white">api.js</span>
							</div>
							<div className="bg-[#232b47] px-6 py-6">
								<pre className="overflow-x-auto font-mono text-base leading-relaxed whitespace-pre text-gray-100">
									{`import { DevFlow } from '@devflow/api';

// Initialize API endpoint
const api = new DevFlow.API({
  name: 'users-api',
  auth: true
});

// Create a new user
api.post('/users', async (req, res) => {
  const user = await db.users.create(req.body);
  return res.json(user);
});

// Deploy with a single command
api.deploy();`}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
