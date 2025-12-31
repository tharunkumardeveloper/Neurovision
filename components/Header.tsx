import { Brain, Activity, User, Bell, Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-xl border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-10 w-10 text-blue-400" />
                <Activity className="h-6 w-6 text-blue-300 absolute -bottom-1 -right-1" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">NeuroVision CDSS</h1>
                <p className="text-sm text-blue-200">Clinical Decision Support for Early Alzheimer's Detection</p>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">Tiered Approach</div>
              <div className="text-xs text-blue-200">Cost-Effective</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-300">88.2%</div>
              <div className="text-xs text-blue-200">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">CDSS Active</span>
              </div>
              <div className="text-xs text-blue-200">ML Pipeline</div>
            </div>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-blue-200 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-blue-200 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">Clinical Dashboard</p>
                <p className="text-xs text-blue-200">Multi-modal AI analysis ready</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}