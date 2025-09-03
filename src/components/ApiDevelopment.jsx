const ApiDevelopment = () => {
	return (
		<section className="bg-gray-50 py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-12 space-y-2">
					<h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
						Simple, powerful API development
					</h2>
					<p className="text-center text-gray-600">
						From simple REST endpoints to complex GraphQL services, build it all
						with DevFlow.
					</p>
				</div>

				{/* Tabs */}
				<div className="mb-8 flex justify-center space-x-8">
					<button className="border-b-2 border-indigo-600 pb-2 font-medium text-indigo-600">
						REST API
					</button>
					<button className="pb-2 font-medium text-gray-500 hover:text-gray-900">
						GraphQL
					</button>
					<button className="pb-2 font-medium text-gray-500 hover:text-gray-900">
						Webhooks
					</button>
					<button className="pb-2 font-medium text-gray-500 hover:text-gray-900">
						Authentication
					</button>
				</div>

				{/* Code Example */}
				<div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-[#0B1120] shadow-2xl">
					{/* Terminal Header */}
					<div className="flex items-center justify-between bg-[#1E293B] px-4 py-3">
						<div className="flex items-center space-x-2">
							<div className="h-3 w-3 rounded-full bg-[#FF5F56]"></div>
							<div className="h-3 w-3 rounded-full bg-[#FFBD2E]"></div>
							<div className="h-3 w-3 rounded-full bg-[#27C93F]"></div>
						</div>
						<span className="font-mono text-sm text-gray-400">todo.ts</span>
					</div>

					{/* Code Content */}
					<div className="p-6">
						<pre className="font-mono text-sm leading-relaxed text-gray-300">
							{`import { DevFlow } from '@devflow/api';
import { db } from '@devflow/database';

// Initialize and configure API
const api = new DevFlow.API({
  name: 'todo-api',
  cors: true,
  rateLimit: { max: 100, windowMs: 60000 }
});

// Create a new todo
api.post('/todos', async (req, res) => {
  const { title, description } = req.body;

  // Input validation
  if (!title) {
    return res.status(400).json({
      error: 'Title is required'
    });
  }

  // Create record in database
  const todo = await db.todos.create({
    title,
    description,
    completed: false,
    created_by: req.user.id
  });

  return res.status(201).json(todo);
});

// List all todos for the authenticated user
api.get('/todos', async (req, res) => {
  const todos = await db.todos.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return res.json(todos);
});

// One-command deployment
api.deploy();`}
						</pre>
					</div>
				</div>

				{/* Footer Link */}
				<div className="mt-8 text-center">
					<a
						href="#docs"
						className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-700"
					>
						View more examples in docs →
					</a>
				</div>
			</div>
		</section>
	);
};

export default ApiDevelopment;
