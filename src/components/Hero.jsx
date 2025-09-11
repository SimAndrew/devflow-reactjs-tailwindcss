import { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
	const [showCode, setShowCode] = useState(false);

	return (
		<section className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:22px_22px] opacity-20"
			/>
			<div className="relative mx-auto flex max-w-7xl flex-col px-4 pt-24 pb-14 sm:px-6 md:pt-28 md:pb-20 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
				<div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
					<h1 className="text-3xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl">
						<span className="block">Build APIs in minutes,</span>
						<span className="block text-indigo-200">not months</span>
					</h1>

					<p className="mt-5 max-w-xl text-base text-indigo-100/90 sm:text-lg md:text-xl">
						DevFlow's serverless API platform lets you focus on code, not
						infrastructure. Scale automatically from prototype to production.
					</p>

					<div className="mt-8 flex w-full flex-col items-center gap-3 sm:mb-6 sm:flex-row sm:justify-center lg:justify-start">
						<Link
							to="/"
							className="inline-flex w-full items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-indigo-600 shadow-sm ring-1 shadow-indigo-900/10 ring-white/40 transition hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 sm:w-auto sm:text-lg"
						>
							Get Started Free
						</Link>
						<Link
							to="/docs"
							className="inline-flex items-center gap-2 text-base font-semibold text-white/90 transition hover:text-white sm:text-lg"
						>
							<span>View Docs</span>
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14" />
								<path d="m12 5 7 7-7 7" />
							</svg>
						</Link>
					</div>

					<button
						type="button"
						onClick={() => setShowCode((v) => !v)}
						className="mt-6 inline-flex items-center gap-2 rounded-md bg-indigo-500/25 px-4 py-2 text-sm font-medium text-indigo-100 ring-1 ring-white/20 backdrop-blur transition hover:bg-indigo-500/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
					>
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							viewBox="0 0 24 24"
						>
							<path d="M16 18 22 12 16 6" />
							<path d="M8 6 2 12l6 6" />
						</svg>
						{showCode ? 'Hide Code Example' : 'Show Code Example'}
					</button>
				</div>

				<div
					className={`flex flex-1 justify-center lg:justify-end ${
						showCode ? 'mt-10 md:mt-0' : 'mt-0'
					} ${showCode ? 'block' : 'hidden md:flex'}`}
				>
					<div className="w-full max-w-xl md:max-w-lg lg:max-w-xl">
						<div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a2241] shadow-2xl shadow-indigo-900/40 backdrop-blur">
							<div className="flex items-center justify-between bg-[#141b34] px-4 py-2.5 sm:px-5">
								<div className="flex items-center gap-1.5 sm:gap-2">
									<span className="h-3.5 w-3.5 rounded-full bg-red-500" />
									<span className="h-3.5 w-3.5 rounded-full bg-yellow-400" />
									<span className="h-3.5 w-3.5 rounded-full bg-green-500" />
								</div>
								<span className="font-mono text-[11px] text-white/70 sm:text-xs">
									api.js
								</span>
							</div>
							<div className="bg-[#1e2747] px-4 py-5 sm:px-6 sm:py-6">
								<pre
									className="overflow-x-auto font-mono text-[11px] leading-relaxed whitespace-pre text-indigo-100 [-ms-overflow-style:none] [scrollbar-width:none] sm:text-xs md:text-sm"
									style={{ scrollbarWidth: 'none' }}
								>
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
