import { useSelector } from 'react-redux'
import { Plus, RefreshCw } from 'lucide-react'
import Category from './Category'

const Dashboard = () => {
	const categories = useSelector(state => state.dashboard.categories)

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Dashboard Header */}
			<div className="px-6 py-4">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold text-gray-900">
						CNAPP Dashboard
					</h1>
					<div className="flex items-center space-x-3">
						<button className="flex items-center space-x-2 bg-white border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
							<Plus size={16} />
							<span>Add Widget</span>
						</button>
						<button className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50">
							<RefreshCw size={16} className="text-gray-600" />
						</button>
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<div className="w-2 h-2 bg-blue-600 rounded-full"></div>
							<span>Last 2 days</span>
						</div>
					</div>
				</div>
			</div>

			{/* Dashboard Content */}
			<div className="px-6 py-6">
				{categories.map(category => (
					<Category
						key={category.id}
						category={category}
					/>
				))}
			</div>
		</div>
	)
}

export default Dashboard