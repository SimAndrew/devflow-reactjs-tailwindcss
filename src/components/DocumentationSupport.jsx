import React from 'react';

const DocumentationSupport = () => {
	const documentationLinks = [
		{ name: 'Quick Start Guide', href: '#' },
		{ name: 'API Reference', href: '#' },
		{ name: 'Tutorials & Guides', href: '#' },
		{ name: 'Best Practices', href: '#' },
	];

	const communityLinks = [
		{ name: 'Discord Community', href: '#' },
		{ name: 'GitHub Discussions', href: '#' },
		{ name: 'Stack Overflow Tag', href: '#' },
		{ name: 'Support Contact', href: '#' },
	];

	return (
		<footer className="bg-gray-50 py-12">
			<div className="mx-auto w-[1024px] px-4">
				<div className="flex justify-center">
					<div className="grid grid-cols-1 gap-24 md:grid-cols-2">
						<div>
							<h3 className="text-lg font-bold text-gray-900">Documentation</h3>
							<p className="mt-2 text-base text-gray-500">
								Comprehensive guides, API references, and examples to help you
								get started quickly.
							</p>
							<ul className="mt-4 space-y-2">
								{documentationLinks.map((link) => (
									<li key={link.name}>
										<a
											href={link.href}
											className="text-base text-indigo-600 hover:text-indigo-800"
										>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-bold text-gray-900">
								Community & Support
							</h3>
							<p className="mt-2 text-base text-gray-500">
								Join our community of developers and get help whenever you need
								it.
							</p>
							<ul className="mt-4 space-y-2">
								{communityLinks.map((link) => (
									<li key={link.name}>
										<a
											href={link.href}
											className="text-base text-indigo-600 hover:text-indigo-800"
										>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default DocumentationSupport;
