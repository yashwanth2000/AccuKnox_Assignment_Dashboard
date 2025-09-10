import { Plus } from 'lucide-react'
import Widget from './Widget'

const Category = ({ category, onAddWidget }) => {
	const handleAddWidget = () => {
		onAddWidget(category.id)
	}

	// Only show visible widgets
	const visibleWidgets = category.widgets.filter(widget => widget.isVisible)

	return (
		<div className="mb-6">
			<div className="flex items-center justify-between mb-3">
				<h2 className="text-base font-semibold text-gray-900">
					{category.name}
				</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{visibleWidgets.map(widget => (
					<Widget
						key={widget.id}
						widget={widget}
						categoryId={category.id}
					/>
				))}
				{/* Add Widget Button */}
				<button
					type="button"
					onClick={handleAddWidget}
					className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-200 flex gap-2 items-center justify-center min-h-[200px] hover:border-gray-300 cursor-pointer transition-colors text-gray-400"
				>
					<Plus size={20} />
					<span className="text-lg font-medium">Add Widget</span>
				</button>
			</div>
		</div>
	)
}

export default Category
