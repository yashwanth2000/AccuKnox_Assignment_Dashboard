import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import { addWidget, toggleWidgetVisibility } from '../store/dashboardSlice'

const WidgetDrawer = ({ isOpen, activeCategory, onClose, onSetActiveCategory }) => {
	const dispatch = useDispatch()
	const categories = useSelector(state => state.dashboard.categories)

	const [showAddForm, setShowAddForm] = useState(false)
	const [newWidget, setNewWidget] = useState({ name: '', text: '' })
	const [pendingChanges, setPendingChanges] = useState({})

	// Reset states when drawer opens/closes
	useEffect(() => {
		if (!isOpen) {
			setShowAddForm(false)
			setNewWidget({ name: '', text: '' })
			setPendingChanges({})
		}
	}, [isOpen])

	const handleClose = () => {
		setPendingChanges({})
		onClose()
	}

	const handleConfirm = () => {
		// Apply all pending changes
		Object.entries(pendingChanges).forEach(([key, shouldToggle]) => {
			if (shouldToggle) {
				const [categoryId, widgetId] = key.split('-');
				dispatch(toggleWidgetVisibility({ categoryId, widgetId }))
			}
		});
		setPendingChanges({})
		onClose()
	}

	const handleCancel = () => {
		setPendingChanges({})
		onClose()
	}

	const handleWidgetToggle = (categoryId, widgetId) => {
		const key = `${categoryId}-${widgetId}`;
		setPendingChanges(prev => ({
			...prev,
			[key]: !prev[key]
		}))
	}

	const isWidgetChecked = (categoryId, widgetId) => {
		const key = `${categoryId}-${widgetId}`;
		const category = categories.find(cat => cat.id === categoryId);
		const widget = category?.widgets.find(w => w.id === widgetId);

		// If there's a pending change, use that
		if (pendingChanges[key] !== undefined) {
			return pendingChanges[key] ? !widget?.isVisible : widget?.isVisible;
		}
		return widget?.isVisible || false;
	}

	const handleAddNewWidget = () => {
		if (newWidget.name.trim() && newWidget.text.trim()) {
			dispatch(addWidget({
				categoryId: activeCategory,
				widget: newWidget
			}))
			setNewWidget({ name: '', text: '' })
			setShowAddForm(false)
		}
	}

	const activeCategoryData = categories.find(cat => cat.id === activeCategory)

	return (
		<div className="fixed inset-0 z-50">
			{/* Drawer */}
			<div className="absolute right-0 top-0 h-full w-[500px] bg-white shadow-2xl flex flex-col">
				{/* Header */}
				<div className="bg-blue-600 text-white p-4">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Add Widget</h2>
						<button
							onClick={handleClose}
							className="text-white hover:bg-blue-700 p-1 rounded cursor-pointer"
						>
							<X size={20} />
						</button>
					</div>
					<p className="text-blue-100 text-sm mt-2">
						Personalise your dashboard by adding the following widget
					</p>
				</div>

				{/* Tabs */}
				<div className="border-b bg-gray-50 flex">
					{categories.map(category => (
						<button
							key={category.id}
							onClick={() => onSetActiveCategory(category.id)}
							className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeCategory === category.id
								? 'border-blue-600 text-blue-600 bg-white'
								: 'border-transparent text-gray-500 hover:text-gray-700'
								}`}
						>
							{category.tabName}
						</button>
					))}
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-6">
					{!showAddForm ? (
						<div className="space-y-3">
							{activeCategoryData?.widgets.map(widget => (
								<label
									key={widget.id}
									className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
								>
									<input
										type="checkbox"
										checked={isWidgetChecked(activeCategoryData.id, widget.id)}
										onChange={() => handleWidgetToggle(activeCategoryData.id, widget.id)}
										className="mt-0.5 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
									/>
									<span className="text-sm font-medium text-gray-900">
										{widget.name}
									</span>
								</label>
							))}

							{/* Add New Widget Option */}
							<button
								onClick={() => setShowAddForm(true)}
								className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-300 hover:text-blue-500 transition-colors cursor-pointer"
							>
								<Plus size={20} />
								<span className="font-medium">Add New Widget</span>
							</button>
						</div>
					) : (
						/* Add Widget Form */
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Widget Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									value={newWidget.name}
									onChange={(e) => setNewWidget(prev => ({ ...prev, name: e.target.value }))}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter widget name"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Widget Content <span className="text-red-500">*</span>
								</label>
								<textarea
									value={newWidget.text}
									onChange={(e) => setNewWidget(prev => ({ ...prev, text: e.target.value }))}
									rows={4}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter widget content"
								/>
							</div>

							<div className="flex space-x-3 pt-4">
								<button
									onClick={handleAddNewWidget}
									disabled={!newWidget.name.trim() || !newWidget.text.trim()}
									className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
								>
									Add Widget
								</button>
								<button
									onClick={() => setShowAddForm(false)}
									className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 cursor-pointer"
								>
									Cancel
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Footer Buttons */}
				{!showAddForm && (
					<div className="border-t p-4 bg-gray-50 flex space-x-3 justify-end">
						<button
							onClick={handleCancel}
							className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
						>
							Cancel
						</button>
						<button
							onClick={handleConfirm}
							className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
						>
							Confirm
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default WidgetDrawer