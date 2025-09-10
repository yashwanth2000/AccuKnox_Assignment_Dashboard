import { useDispatch } from 'react-redux'
import { X } from 'lucide-react'
import { removeWidget } from '../store/dashboardSlice'

const Widget = ({ widget, categoryId }) => {
	const dispatch = useDispatch()

	const handleRemove = () => {
		dispatch(removeWidget({ categoryId, widgetId: widget.id }))
	}

	return (
		<div
			id={`widget-${widget.id}`}
			className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm min-h-[200px] transition-all duration-300"
		>
			<div className="flex justify-between items-start mb-3">
				<h3 className="font-medium text-gray-900 text-sm">{widget.name}</h3>
				<button
					onClick={handleRemove}
					className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
					title="Remove widget"
				>
					<X size={14} />
				</button>
			</div>
			<div className="text-gray-600 text-sm leading-relaxed">
				{widget.text}
			</div>
		</div>
	)
}

export default Widget