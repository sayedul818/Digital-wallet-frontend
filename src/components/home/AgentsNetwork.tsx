import React from 'react';
import { MapPin, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const agents = [
	{
		icon: <MapPin className="h-8 w-8 text-blue-600" />,
		title: 'Nationwide Coverage',
		desc: 'Thousands of agents available across the country.'
	},
	{
		icon: <Users className="h-8 w-8 text-green-600" />,
		title: 'Trusted Partners',
		desc: 'All agents are verified and trained for secure transactions.'
	},
	{
		icon: <CheckCircle className="h-8 w-8 text-purple-600" />,
		title: 'Instant Cash Services',
		desc: 'Deposit or withdraw cash instantly at any agent location.'
	}
];

const cardVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
	hover: { scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }
};

const AgentsNetwork: React.FC = () => (
	<>
		<section className="py-16 bg-white dark:bg-gray-950">
			<div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
					<span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-4">Network</span>
					<h2 className="text-4xl font-bold mb-4">
						<span className="text-gray-800 dark:text-white">Agents </span>
						<span className="text-indigo-600 dark:text-indigo-400">Nationwide</span>
					</h2>
					<p className="text-gray-600 dark:text-gray-400 text-lg">Trusted cash agents available across the country</p>
				</motion.div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{agents.map((agent) => (
						<motion.div
							key={agent.title}
							className="flex flex-col items-center bg-blue-50 dark:bg-gray-800 rounded-lg shadow p-6"
							initial="hidden"
							whileInView="visible"
							whileHover="hover"
							viewport={{ once: true, amount: 0.3 }}
							variants={cardVariants}
						>
							<div className="mb-4">{agent.icon}</div>
							<h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
								{agent.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-300 text-center">{agent.desc}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	</>
);

export default AgentsNetwork;
