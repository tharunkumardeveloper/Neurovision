import { BarChart3, Brain, Edit, Droplets, Database, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface NavigationTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const tabs = [
  { id: 'dashboard', name: 'CDSS Dashboard', shortName: 'Dashboard', icon: BarChart3, description: 'AI-powered clinical decision support' },
  { id: 'mri', name: 'MRI Analysis Hub', shortName: 'MRI Analysis', icon: Brain, description: 'Upload MRI & get AI explanations' },
  { id: 'datasets', name: 'Dataset Gallery', shortName: 'Datasets', icon: Database, description: 'View research datasets' },
  { id: 'handwriting', name: 'Handwriting', shortName: 'Handwriting', icon: Edit, description: 'Digital handwriting analysis' },
  { id: 'biomarkers', name: 'Biomarkers', shortName: 'Biomarkers', icon: Droplets, description: 'Blood biomarker analysis' }
]

export default function NavigationTabs({ activeTab, setActiveTab }: NavigationTabsProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleTabClick = (tabId: string) => {
    console.log('NavigationTabs: Handling click for tab:', tabId)
    setActiveTab(tabId)
  }

  const scrollTabs = (direction: 'left' | 'right') => {
    const container = document.getElementById('tabs-container')
    if (container) {
      const scrollAmount = 200
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount)
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="relative lg:hidden">
          <button
            onClick={() => scrollTabs('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
            style={{ marginLeft: '-12px' }}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          
          <div
            id="tabs-container"
            className="flex overflow-x-auto scrollbar-hide space-x-1 py-2 px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    flex-shrink-0 flex flex-col items-center py-3 px-4 rounded-lg font-medium text-xs transition-all duration-200 cursor-pointer min-w-[80px]
                    ${isActive 
                      ? 'bg-blue-100 text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  tabIndex={0}
                >
                  <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-semibold text-center leading-tight">{tab.shortName}</span>
                </button>
              )
            })}
          </div>
          
          <button
            onClick={() => scrollTabs('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
            style={{ marginRight: '-12px' }}
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center space-x-8" aria-label="Tabs" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleTabClick(tab.id)
                  }
                }}
                className={`
                  group flex flex-col items-center py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 cursor-pointer
                  hover:bg-gray-50 active:bg-gray-100
                  ${isActive 
                    ? 'border-blue-500 text-blue-600 bg-blue-50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tab.id}-panel`}
                tabIndex={0}
              >
                <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="font-semibold">{tab.name}</span>
                <span className={`text-xs mt-1 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                  {tab.description}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}