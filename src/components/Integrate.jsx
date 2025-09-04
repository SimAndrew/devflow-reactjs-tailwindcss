import React from 'react';

const toolIcons = [
	{ name: 'Tool 1', content: 'Example' },
	{ name: 'Tool 2', content: 'Example' },
	{ name: 'Tool 3', content: 'Example' },
];

const Integrate = () => {
	return (
		<footer className="bg-gray-50 py-16">
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="mb-2 text-3xl font-extrabold text-gray-900">
					Integrate with your favorite tools
				</h2>
				<p className="mb-10 text-lg text-gray-600">
					DevFlow works seamlessly with the tools you already use.
				</p>
			</div>
			<div className="mt-2 flex justify-center gap-24">
				{toolIcons.map((icon) => (
					<div
						key={icon.name}
						className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-200 text-xs text-gray-400 select-none"
					>
						{icon.content}
					</div>
				))}
			</div>
		</footer>
	);
};

export default Integrate;
