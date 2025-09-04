import React from 'react';

const TryIt = () => {
	return (
		<section className="bg-white py-12">
			<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-gray-900">
					Try it yourself
				</h2>
				<p className="mt-4 text-lg text-gray-500">
					Play with our interactive demo to see how easy it is to build and
					deploy an API.
				</p>
			</div>
			<div className="mx-auto mt-10 max-w-5xl">
				<div className="rounded-xl bg-white p-2 shadow-2xl">
					<div className="rounded-lg bg-gray-800">
						<div className="flex items-center border-b border-gray-700 px-4 py-2">
							<div className="flex space-x-2">
								<div className="h-3 w-3 rounded-full bg-red-500"></div>
								<div className="h-3 w-3 rounded-full bg-yellow-500"></div>
								<div className="h-3 w-3 rounded-full bg-green-500"></div>
							</div>
							<div className="ml-4 text-sm text-gray-300">Try it live</div>
						</div>
						<div className="flex h-80 flex-col items-center justify-center text-center">
							<p className="mb-6 text-gray-400">
								Interactive demo would be embedded here
							</p>
							<button className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-indigo-700">
								Launch Interactive Demo
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TryIt;
