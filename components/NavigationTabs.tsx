import { BarChart3, Brain, Edit, Droplets, Database } from 'lucide-react'

interface NavigationTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const tabs = [
  { id: 'dashboard', name: 'CDSS Dashboard', icon: BarChart3, description: 'AI-powered clinical decision support' },
  { id: 'mri', name: 'MRI Analysis Hub', icon: Brain, description: 'Upload MRI & get AI explanations' },
  { id: 'datasets', name: 'Dataset Gallery', icon: Database, description: 'View research datasets' },
  { id: 'handwriting', name: 'Handwriting', icon: Edit, description: 'Digital handwriting analysis' },
  { id: 'biomarkers', name: 'Biomarkers', icon: Droplets, description: 'Blood biomarker analysis' }
]

export default function NavigationTabs({ activeTab, setActiveTab }: NavigationTabsProps) {
  const handleTabClick = (tabId: string) => {
    console.log('NavigationTabs: Handling click for tab:', tabId)
    setActiveTab(tabId)
  }

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-8" aria-label="Tabs" role="tablist">
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