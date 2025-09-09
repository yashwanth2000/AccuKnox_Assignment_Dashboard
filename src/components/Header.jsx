import { Search, Bell, User } from 'lucide-react'

const Header = () => {
	return (
		<div className="bg-white border-b border-gray-200 shadow-sm">
			<div className="px-6">
				<div className="flex items-center justify-between h-14">
					{/* Left side - Logo/Brand */}
					<div className="flex items-center">
						<div className="text-lg font-semibold text-gray-900">
							Company Logo
						</div>
					</div>

					{/* Center - Search */}
					<div className="flex-1 max-w-lg mx-8">
						<div className="relative">
							<Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search anything..."
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
							/>
						</div>
					</div>

					{/* Right side - Actions */}
					<div className="flex items-center space-x-4">
						<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md">
							<Bell size={18} />
						</button>
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
								<User size={16} className="text-gray-600" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header