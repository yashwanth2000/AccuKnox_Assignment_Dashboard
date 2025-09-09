import { Plus } from 'lucide-react'
import Widget from './Widget'

const Category = ({ category }) => {
	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-base font-semibold text-gray-900">
					{category.name}
				</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{category.widgets.map(widget => (
					<Widget
						key={widget.id}
						widget={widget}
						categoryId={category.id}
					/>
				))}
				{/* Add Widget Button */}
				<div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[200px] hover:border-gray-300 cursor-pointer transition-colors">
					<div className="text-center text-gray-400">
						<Plus size={24} className="mx-auto mb-2" />
						<div className="text-sm font-medium">Add Widget</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Category