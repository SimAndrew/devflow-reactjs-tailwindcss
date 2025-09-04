import React from 'react';

const DashboardManagement = () => {
	return (
		<section className="py-12">
			<div className="mb-6 text-center">
				<h2 className="mb-2 text-2xl font-extrabold text-gray-900 md:text-3xl">
					Powerful dashboard for API management
				</h2>
				<p className="text-base text-gray-500 md:text-lg">
					Monitor, debug, and optimize your APIs with our intuitive dashboard.
				</p>
			</div>
			<div className="mb-10 flex justify-center">
				<div className="flex h-[600px] w-[1200px] items-center justify-center rounded-lg bg-gray-200 shadow-lg">
					<div className="flex h-full w-full flex-col items-center justify-center">
						<span className="text-center text-5xl font-medium text-gray-400 select-none">
							1200
						</span>
						<span className="text-center text-5xl font-medium text-gray-400 select-none">
							×
						</span>
						<span className="text-center text-5xl font-medium text-gray-400 select-none">
							600
						</span>
					</div>
				</div>
			</div>
			<div className="mt-8 flex justify-center gap-24">
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
