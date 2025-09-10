import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Plus, RefreshCw } from 'lucide-react'
import Category from './Category'
import WidgetDrawer from './WidgetDrawer'

const Dashboard = () => {
	const categories = useSelector(state => state.dashboard.categories)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [drawerActiveCategory, setDrawerActiveCategory] = useState('cspm')

	const handleAddWidget = (categoryId) => {
		const targetCategory = categoryId || 'cspm'
		setDrawerActiveCategory(targetCategory)
		setIsDrawerOpen(true)
	}

	const handleCloseDrawer = () => {
		setIsDrawerOpen(false)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Dashboard Header */}
			<div className="flex items-center justify-between px-6 py-4">
				<h1 className="text-xl font-semibold text-gray-900">
					Dashboard
				</h1>
				<div className="flex items-center space-x-3">
					<button
						onClick={() => handleAddWidget('cspm')}
						className="flex items-center space-x-2 bg-white border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
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

			{/* Dashboard Content */}
			<div className="px-6 py-2">
				{categories.map(category => (
					<Category
						key={category.id}
						category={category}
						onAddWidget={handleAddWidget}
					/>
				))}
			</div>

			{/* Widget Drawer */}
			{isDrawerOpen && (
				<WidgetDrawer
					isOpen={isDrawerOpen}
					activeCategory={drawerActiveCategory}
					onClose={handleCloseDrawer}
					onSetActiveCategory={setDrawerActiveCategory}
				/>
			)}
		</div>
	)
}

export default Dashboard