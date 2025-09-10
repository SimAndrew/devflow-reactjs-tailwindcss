import React from 'react';

const DashboardManagement = () => {
	return (
		<section className="bg-white px-4 py-12 sm:py-16">
			<div className="mb-6 text-center">
				<h2 className="mb-2 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
					Powerful dashboard for API management
				</h2>
				<p className="mx-auto max-w-2xl text-sm text-gray-500 sm:text-base md:text-lg">
					Monitor, debug, and optimize your APIs with our intuitive dashboard.
				</p>
			</div>

			<div className="mb-10 flex justify-center">
				<div className="relative aspect-[2/1] min-h-[260px] w-full max-w-[1200px] overflow-hidden rounded-xl bg-gray-200 shadow-lg sm:min-h-[320px] md:min-h-[360px] lg:min-h-[400px]">
					<div className="absolute inset-0 flex items-center justify-center p-4">
						<span className="text-center text-4xl leading-tight font-medium text-gray-400 select-none sm:text-5xl md:text-6xl">
							1200
							<span className="hidden sm:inline"> × </span>
							<span className="block sm:hidden">×</span>
							600
						</span>
					</div>
				</div>
			</div>

			<div className="mt-8 flex flex-col items-center gap-12 md:flex-row md:justify-center md:gap-24">
				<div className="max-w-xs text-center">
					<h3 className="mb-2 font-semibold text-gray-900">
						Real-time Metrics
					</h3>
					<p className="text-sm text-gray-500">
						Monitor latency, error rates, and throughput in real-time.
					</p>
				</div>
				<div className="max-w-xs text-center">
					<h3 className="mb-2 font-semibold text-gray-900">Request Explorer</h3>
					<p className="text-sm text-gray-500">
						Debug API calls with detailed logs and request tracing.
					</p>
				</div>
				<div className="max-w-xs text-center">
					<h3 className="mb-2 font-semibold text-gray-900">
						Team Collaboration
					</h3>
					<p className="text-sm text-gray-500">
						Manage permissions and collaborate with your entire team.
					</p>
				</div>
			</div>
		</section>
	);
};

export default DashboardManagement;
