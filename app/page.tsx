'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import NavigationTabs from '@/components/NavigationTabs'
import CDSSDashboard from '@/components/pages/CDSSDashboard'
import DatasetGallery from '@/components/pages/DatasetGallery'
import MRIAnalysisHub from '@/components/pages/MRIAnalysisHub'
import HandwritingAnalysisPage from '@/components/pages/HandwritingAnalysisPage'
import BiomarkersAnalysisPage from '@/components/pages/BiomarkersAnalysisPage'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleTabChange = (newTab: string) => {
    console.log('Changing tab from', activeTab, 'to', newTab)
    setActiveTab(newTab)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <CDSSDashboard />
      case 'mri':
        return <MRIAnalysisHub />
      case 'handwriting':
        return <HandwritingAnalysisPage />
      case 'biomarkers':
        return <BiomarkersAnalysisPage />
      case 'datasets':
        return <DatasetGallery />
      default:
        return <CDSSDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavigationTabs activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div role="tabpanel" id={`${activeTab}-panel`} aria-labelledby={`${activeTab}-tab`}>
          {renderTabContent()}
        </div>
      </main>
    </div>
  )
}