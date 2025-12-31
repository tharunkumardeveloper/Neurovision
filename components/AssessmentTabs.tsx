import { useState } from 'react'
import { CheckCircle, Clock, FileText, Edit3, Droplet, Brain } from 'lucide-react'
import ClinicalAssessment from './assessments/ClinicalAssessment'
import HandwritingAssessment from './assessments/HandwritingAssessment'
import BiomarkerAssessment from './assessments/BiomarkerAssessment'
import ImagingAssessment from './assessments/ImagingAssessment'

interface AssessmentTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  assessmentData: any
  setAssessmentData: (data: any) => void
}

const tabs = [
  { id: 'clinical', name: 'Clinical Assessment', icon: FileText },
  { id: 'handwriting', name: 'Digital Handwriting', icon: Edit3 },
  { id: 'biomarkers', name: 'Blood Biomarkers', icon: Droplet },
  { id: 'imaging', name: 'MRI Imaging', icon: Brain },
]

export default function AssessmentTabs({ 
  activeTab, 
  setActiveTab, 
  assessmentData, 
  setAssessmentData 
}: AssessmentTabsProps) {
  
  const getTabStatus = (tabId: string) => {
    return assessmentData[tabId]?.completed ? 'completed' : 'pending'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'clinical':
        return <ClinicalAssessment data={assessmentData.clinical} setData={(data) => 
          setAssessmentData({...assessmentData, clinical: data})} />
      case 'handwriting':
        return <HandwritingAssessment data={assessmentData.handwriting} setData={(data) => 
          setAssessmentData({...assessmentData, handwriting: data})} />
      case 'biomarkers':
        return <BiomarkerAssessment data={assessmentData.biomarkers} setData={(data) => 
          setAssessmentData({...assessmentData, biomarkers: data})} />
      case 'imaging':
        return <ImagingAssessment data={assessmentData.imaging} setData={(data) => 
          setAssessmentData({...assessmentData, imaging: data})} />
      default:
        return null
    }
  }

  return (
    <div className="card">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const status = getTabStatus(tab.id)
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${isActive 
                    ? 'border-medical-500 text-medical-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
                {status === 'completed' && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {status === 'pending' && (
                  <Clock className="h-4 w-4 text-yellow-500" />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  )
}