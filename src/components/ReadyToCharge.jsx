import React from 'react';

const ReadyToCharge = () => {
	return (
		<section className="bg-indigo-600">
			<div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
					<span className="block">
						Ready to supercharge your API development?
					</span>
				</h2>
				<p className="mt-4 text-lg text-indigo-200">
					Join thousands of developers building faster and scaling smarter with
					DevFlow.
				</p>
				<div className="mt-8">
					<button className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 shadow-md transition hover:bg-gray-100">
						Get Started for Free
					</button>
				</div>
				<p className="mt-4 text-sm text-indigo-200">
					No credit card required. Free tier includes 100,000 requests per
					month.
				</p>
			</div>
		</section>
	);
};

export default ReadyToCharge;
