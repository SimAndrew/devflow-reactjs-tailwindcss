import { useState } from 'react';

const restApiCode = `import { DevFlow } from '@devflow/api';
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
api.deploy();`;

const graphQLCode = `type Todo {
  id: ID!
  title: String!
  description: String
  completed: Boolean!
  createdBy: User!
}

type Query {
  todos: [Todo!]!
}

type Mutation {
  createTodo(title: String!, description: String): Todo!
}

# Example resolver
const resolvers = {
  Query: {
    todos: (_, __, { db, user }) =>
      db.todos.findMany({ where: { userId: user.id } })
  },
  Mutation: {
    createTodo: (_, { title, description }, { db, user }) =>
      db.todos.create({
        title,
        description,
        completed: false,
        created_by: user.id
      })
  }
};`;

const webhooksCode = `// Register webhook endpoint
api.webhook('/webhook/payment', async (req, res) => {
  const event = req.body;
  // Handle payment event
  // ...
  res.status(200).send('Received');
});`;

const authCode = `// Authentication middleware
api.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Validate token and set user
  req.user = await verifyToken(token);
  next();
});`;

const tabs = [
	{ name: 'REST API', code: restApiCode },
	{ name: 'GraphQL', code: graphQLCode },
	{ name: 'Webhooks', code: webhooksCode },
	{ name: 'Authentication', code: authCode },
];

const ApiDevelopment = () => {
	const [activeTab, setActiveTab] = useState(0);

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
					{tabs.map((tab, idx) => (
						<button
							key={tab.name}
							className={`pb-2 font-medium transition-colors duration-150 ${
								activeTab === idx
									? 'border-b-2 border-indigo-600 text-indigo-600'
									: 'text-gray-500 hover:text-gray-900'
							}`}
							onClick={() => setActiveTab(idx)}
						>
							{tab.name}
						</button>
					))}
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
						<span className="text-xs text-gray-400">devflow-api.js</span>
					</div>
					<div className="p-6">
						<pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
							{tabs[activeTab].code}
						</pre>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ApiDevelopment;
