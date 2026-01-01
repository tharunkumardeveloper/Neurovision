import { Brain, Activity, User, Bell, Settings, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-xl border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative flex-shrink-0">
                <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
                <Activity className="h-4 w-4 sm:h-6 sm:w-6 text-blue-300 absolute -bottom-1 -right-1" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white truncate">
                  NeuroVision CDSS
                </h1>
                <p className="text-xs sm:text-sm text-blue-200 hidden sm:block">
                  Clinical Decision Support for Early Alzheimer's Detection
                </p>
                <p className="text-xs text-blue-200 sm:hidden">
                  AI Alzheimer's Detection
                </p>
              </div>
            </div>
          </div>
          
          {/* Quick Stats - Hidden on mobile, compact on tablet */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <div className="text-center">
              <div className="text-sm xl:text-lg font-bold text-green-400">Tiered Approach</div>
              <div className="text-xs text-blue-200">Cost-Effective</div>
            </div>
            <div className="text-center">
              <div className="text-sm xl:text-lg font-semibold text-blue-300">88.2%</div>
              <div className="text-xs text-blue-200">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs xl:text-sm text-green-400">CDSS Active</span>
              </div>
              <div className="text-xs text-blue-200">ML Pipeline</div>
            </div>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile menu button */}
            <button 
              className="p-2 text-blue-200 hover:text-white transition-colors lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Desktop actions */}
            <div className="hidden sm:flex items-center space-x-2">
              <button className="p-2 text-blue-200 hover:text-white transition-colors">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="p-2 text-blue-200 hover:text-white transition-colors">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-right hidden md:block">
                <p className="text-xs sm:text-sm font-medium text-white">Clinical Dashboard</p>
                <p className="text-xs text-blue-200">Multi-modal AI analysis ready</p>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-blue-800 py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm font-bold text-green-400">Tiered</div>
                <div className="text-xs text-blue-200">Cost-Effective</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-300">88.2%</div>
                <div className="text-xs text-blue-200">Accuracy</div>
              </div>
              <div>
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Active</span>
                </div>
                <div className="text-xs text-blue-200">ML Pipeline</div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-blue-800">
              <button className="p-2 text-blue-200 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-blue-200 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}