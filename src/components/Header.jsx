import { Search, Bell, User, X } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Header = ({ onSearchResults, onClearSearch }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [showResults, setShowResults] = useState(false)
	const categories = useSelector(state => state.dashboard.categories)

	const handleSearch = (value) => {
		setSearchTerm(value)

		if (value.trim() === '') {
			setShowResults(false)
			onClearSearch?.()
			return
		}

		// Search across all widgets in all categories
		const searchResults = categories.map(category => {
			const matchingWidgets = category.widgets.filter(widget =>
				widget.isVisible && (
					widget.name.toLowerCase().includes(value.toLowerCase()) ||
					widget.text.toLowerCase().includes(value.toLowerCase())
				)
			)

			return matchingWidgets.length > 0 ? {
				...category,
				widgets: matchingWidgets
			} : null
		}).filter(Boolean)

		setShowResults(searchResults.length > 0)
		onSearchResults?.(searchResults, value)
	}

	const handleClearSearch = () => {
		setSearchTerm('')
		setShowResults(false)
		onClearSearch?.()
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			handleClearSearch()
		}
	}

	return (
		<header className="bg-white border-b border-gray-200 shadow-sm px-6 flex items-center justify-between h-14">
			<h2 className="text-xl font-medium text-gray-900 cursor-pointer">
				Company Logo
			</h2>

			<section className="flex-1 max-w-lg mx-8 relative">
				<div className="relative">
					<Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search widgets..."
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)}
						onKeyDown={handleKeyDown}
						className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
					/>
					{searchTerm && (
						<button
							onClick={handleClearSearch}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
							aria-label="Clear search"
						>
							<X size={16} />
						</button>
					)}
				</div>

				{/* Search Results Dropdown */}
				{showResults && searchTerm && (
					<nav className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
						<div className="p-2">
							<p className="text-xs text-gray-500 mb-2">
								Search results for "{searchTerm}"
							</p>
							{categories.map(category => {
								const matchingWidgets = category.widgets.filter(widget =>
									widget.isVisible && (
										widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
										widget.text.toLowerCase().includes(searchTerm.toLowerCase())
									)
								)

								if (matchingWidgets.length === 0) return null

								return (
									<section key={category.id} className="mb-3">
										<p className="text-xs font-medium text-gray-700 mb-1 px-2">
											{category.name}
										</p>
										{matchingWidgets.map(widget => (
											<button
												key={widget.id}
												className="w-full text-left p-2 hover:bg-gray-50 rounded cursor-pointer"
												onClick={() => {
													const element = document.getElementById(`widget-${widget.id}`)
													if (element) {
														element.scrollIntoView({ behavior: 'smooth', block: 'center' })
														element.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50')
														setTimeout(() => {
															element.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50')
														}, 2000)
													}
													handleClearSearch()
												}}
											>
												<span className="text-sm font-medium text-gray-900">
													{widget.name}
												</span>
											</button>
										))}
									</section>
								)
							})}
						</div>
					</nav>
				)}
			</section>

			<nav className="flex items-center space-x-4">
				<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer">
					<Bell size={18} />
				</button>
				<button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer">
					<User size={18} />
				</button>
			</nav>
		</header>
	)

}

export default Header