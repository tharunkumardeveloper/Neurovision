'use client'

import { useState } from 'react'
import { Brain, Activity, FileText, Eye, Grid, List } from 'lucide-react'

export default function DatasetGallery() {
  const [activeCategory, setActiveCategory] = useState<'mri' | 'handwriting' | 'clinical'>('mri')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Comprehensive MRI dataset - all available images
  const mriImages = [
    // Normal Cognition (NonDemented) - 12 samples
    { category: 'NonDemented', filename: 'nonDem2540.jpg', path: '/datasets/mri/NonDemented/nonDem2540.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: 'nonDem2541.jpg', path: '/datasets/mri/NonDemented/nonDem2541.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: 'nonDem2542.jpg', path: '/datasets/mri/NonDemented/nonDem2542.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: 'nonDem2543.jpg', path: '/datasets/mri/NonDemented/nonDem2543.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: 'nonDem2544.jpg', path: '/datasets/mri/NonDemented/nonDem2544.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: 'nonDem2545.jpg', path: '/datasets/mri/NonDemented/nonDem2545.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: 'nonDem2546.jpg', path: '/datasets/mri/NonDemented/nonDem2546.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: 'nonDem2547.jpg', path: '/datasets/mri/NonDemented/nonDem2547.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: '00a98422-8b63-47e6-8b8f-9119984d87ee.jpg', path: '/datasets/mri/NonDemented/00a98422-8b63-47e6-8b8f-9119984d87ee.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: '00b6998c-266a-4880-b6af-30ca013bdd8c.jpg', path: '/datasets/mri/NonDemented/00b6998c-266a-4880-b6af-30ca013bdd8c.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: '0a42c1ce-7be9-4fc1-886e-2a75dfa03cc8.jpg', path: '/datasets/mri/NonDemented/0a42c1ce-7be9-4fc1-886e-2a75dfa03cc8.jpg', label: 'Normal Cognition' },
    { category: 'NonDemented', filename: '0a5063e8-da6a-4037-b41a-25a50d734557.jpg', path: '/datasets/mri/NonDemented/0a5063e8-da6a-4037-b41a-25a50d734557.jpg', label: 'Normal Cognition' },

    // Very Mild Dementia (MCI) - 12 samples
    { category: 'VeryMildDemented', filename: 'verymildDem1776.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1776.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: 'verymildDem1777.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1777.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: 'verymildDem1778.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1778.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: 'verymildDem1779.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1779.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: 'verymildDem1780.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1780.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: 'verymildDem1781.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1781.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: '000a074f-a3a5-4c70-8c94-d7ed7bbe7018.jpg', path: '/datasets/mri/VeryMildDemented/000a074f-a3a5-4c70-8c94-d7ed7bbe7018.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: '00b4979d-ac1c-40e3-90b2-422511918fc0.jpg', path: '/datasets/mri/VeryMildDemented/00b4979d-ac1c-40e3-90b2-422511918fc0.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: '0a34b82b-ba3d-4320-85bf-d437582e42f4.jpg', path: '/datasets/mri/VeryMildDemented/0a34b82b-ba3d-4320-85bf-d437582e42f4.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: '0a4212bb-09d8-4216-92a3-ffd87f82484a.jpg', path: '/datasets/mri/VeryMildDemented/0a4212bb-09d8-4216-92a3-ffd87f82484a.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: '0a725d64-9ad0-4c7e-851e-c8466983870a.jpg', path: '/datasets/mri/VeryMildDemented/0a725d64-9ad0-4c7e-851e-c8466983870a.jpg', label: 'Very Mild Dementia (MCI)' },
    { category: 'VeryMildDemented', filename: '0a93e274-2cae-4a0a-b535-e1f18c3f9e27.jpg', path: '/datasets/mri/VeryMildDemented/0a93e274-2cae-4a0a-b535-e1f18c3f9e27.jpg', label: 'Very Mild Dementia (MCI)' },

    // Mild Dementia - 12 samples
    { category: 'MildDemented', filename: 'mildDem701.jpg', path: '/datasets/mri/MildDemented/mildDem701.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: 'mildDem702.jpg', path: '/datasets/mri/MildDemented/mildDem702.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: 'mildDem703.jpg', path: '/datasets/mri/MildDemented/mildDem703.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: 'mildDem704.jpg', path: '/datasets/mri/MildDemented/mildDem704.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: 'mildDem705.jpg', path: '/datasets/mri/MildDemented/mildDem705.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: 'mildDem706.jpg', path: '/datasets/mri/MildDemented/mildDem706.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: '000cdcc4-3e54-4034-a538-203c8047b564.jpg', path: '/datasets/mri/MildDemented/000cdcc4-3e54-4034-a538-203c8047b564.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: '00a89d56-bb82-429f-95c4-6f1e661629f5.jpg', path: '/datasets/mri/MildDemented/00a89d56-bb82-429f-95c4-6f1e661629f5.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: '0a0d76a0-9c31-4c5e-bc37-9d050a7a4a7a.jpg', path: '/datasets/mri/MildDemented/0a0d76a0-9c31-4c5e-bc37-9d050a7a4a7a.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: '0a1551a7-efee-4d67-bcd4-4569b3f3b808.jpg', path: '/datasets/mri/MildDemented/0a1551a7-efee-4d67-bcd4-4569b3f3b808.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: '0a285637-76bc-43b6-ae13-a44b41ba7eab.jpg', path: '/datasets/mri/MildDemented/0a285637-76bc-43b6-ae13-a44b41ba7eab.jpg', label: 'Mild Alzheimer\'s Disease' },
    { category: 'MildDemented', filename: '0a46ad2f-0049-494b-be9b-d71874e6009e.jpg', path: '/datasets/mri/MildDemented/0a46ad2f-0049-494b-be9b-d71874e6009e.jpg', label: 'Mild Alzheimer\'s Disease' },

    // Moderate Dementia - 12 samples
    { category: 'ModerateDemented', filename: 'moderateDem36.jpg', path: '/datasets/mri/ModerateDemented/moderateDem36.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: 'moderateDem37.jpg', path: '/datasets/mri/ModerateDemented/moderateDem37.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: 'moderateDem38.jpg', path: '/datasets/mri/ModerateDemented/moderateDem38.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: 'moderateDem39.jpg', path: '/datasets/mri/ModerateDemented/moderateDem39.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: 'moderateDem40.jpg', path: '/datasets/mri/ModerateDemented/moderateDem40.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: 'moderateDem41.jpg', path: '/datasets/mri/ModerateDemented/moderateDem41.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: '00a4080b-0cea-436f-9c97-031ee6d3b5f5.jpg', path: '/datasets/mri/ModerateDemented/00a4080b-0cea-436f-9c97-031ee6d3b5f5.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: '0a0641f9-459e-4aef-bd71-9b6fb20256be.jpg', path: '/datasets/mri/ModerateDemented/0a0641f9-459e-4aef-bd71-9b6fb20256be.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: '0a2db21e-81d3-461c-a23e-c133096d8f0a.jpg', path: '/datasets/mri/ModerateDemented/0a2db21e-81d3-461c-a23e-c133096d8f0a.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: '0a46bec5-3e7a-4184-b04d-06902780768b.jpg', path: '/datasets/mri/ModerateDemented/0a46bec5-3e7a-4184-b04d-06902780768b.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: '0a711361-d399-4343-adba-513182e85203.jpg', path: '/datasets/mri/ModerateDemented/0a711361-d399-4343-adba-513182e85203.jpg', label: 'Moderate Alzheimer\'s Disease' },
    { category: 'ModerateDemented', filename: '0a924bf0-65b3-48fb-a1ef-3b53ce56130d.jpg', path: '/datasets/mri/ModerateDemented/0a924bf0-65b3-48fb-a1ef-3b53ce56130d.jpg', label: 'Moderate Alzheimer\'s Disease' }
  ]

  const handwritingImages = [
    { task: 'TASK_02', condition: 'HC', filename: 'T02_HC_001.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_001.png', label: 'Connect Dots - Healthy Control' },
    { task: 'TASK_02', condition: 'HC', filename: 'T02_HC_002.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_002.png', label: 'Connect Dots - Healthy Control' },
    { task: 'TASK_02', condition: 'HC', filename: 'T02_HC_003.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_003.png', label: 'Connect Dots - Healthy Control' },
    { task: 'TASK_02', condition: 'HC', filename: 'T02_HC_004.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_004.png', label: 'Connect Dots - Healthy Control' },
    { task: 'TASK_02', condition: 'AD', filename: 'T02_AD_001.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_001.png', label: 'Connect Dots - Alzheimer\'s Disease' },
    { task: 'TASK_02', condition: 'AD', filename: 'T02_AD_002.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_002.png', label: 'Connect Dots - Alzheimer\'s Disease' },
    { task: 'TASK_02', condition: 'AD', filename: 'T02_AD_003.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_003.png', label: 'Connect Dots - Alzheimer\'s Disease' },
    { task: 'TASK_02', condition: 'AD', filename: 'T02_AD_004.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_004.png', label: 'Connect Dots - Alzheimer\'s Disease' },
    { task: 'TASK_03', condition: 'HC', filename: 'T03_HC_001.png', path: '/datasets/handwriting/TASK_03/HC/T03_HC_001.png', label: 'Vertical Lines - Healthy Control' },
    { task: 'TASK_03', condition: 'HC', filename: 'T03_HC_002.png', path: '/datasets/handwriting/TASK_03/HC/T03_HC_002.png', label: 'Vertical Lines - Healthy Control' },
    { task: 'TASK_03', condition: 'AD', filename: 'T03_AD_001.png', path: '/datasets/handwriting/TASK_03/AD/T03_AD_001.png', label: 'Vertical Lines - Alzheimer\'s Disease' },
    { task: 'TASK_03', condition: 'AD', filename: 'T03_AD_002.png', path: '/datasets/handwriting/TASK_03/AD/T03_AD_002.png', label: 'Vertical Lines - Alzheimer\'s Disease' }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'NonDemented': return 'border-green-300 bg-green-50'
      case 'VeryMildDemented': return 'border-yellow-300 bg-yellow-50'
      case 'MildDemented': return 'border-orange-300 bg-orange-50'
      case 'ModerateDemented': return 'border-red-300 bg-red-50'
      case 'HC': return 'border-green-300 bg-green-50'
      case 'AD': return 'border-red-300 bg-red-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Dataset Gallery
        </h1>
        <p className="text-lg text-gray-600">
          Comprehensive view of real medical datasets used in the CDSS
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveCategory('mri')}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
              activeCategory === 'mri'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Brain className="w-4 h-4 mr-2" />
            MRI Scans ({mriImages.length})
          </button>
          <button
            onClick={() => setActiveCategory('handwriting')}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
              activeCategory === 'handwriting'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Activity className="w-4 h-4 mr-2" />
            Handwriting ({handwritingImages.length})
          </button>
          <button
            onClick={() => setActiveCategory('clinical')}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
              activeCategory === 'clinical'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Clinical Data
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MRI Gallery */}
      {activeCategory === 'mri' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Brain className="w-6 h-6 text-purple-500 mr-2" />
            MRI Brain Scan Dataset
          </h2>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mriImages.map((image, index) => (
                <div key={index} className={`border-2 rounded-lg p-4 ${getCategoryColor(image.category)}`}>
                  <div className="relative group mb-3">
                    <img 
                      src={image.path} 
                      alt={image.label}
                      className="w-full h-48 object-contain rounded-md bg-white border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=${image.category.slice(0,8)}`
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900 mb-1">{image.label}</h3>
                    <p className="text-sm text-gray-600">{image.filename}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {mriImages.map((image, index) => (
                <div key={index} className={`border-2 rounded-lg p-4 flex items-center space-x-4 ${getCategoryColor(image.category)}`}>
                  <img 
                    src={image.path} 
                    alt={image.label}
                    className="w-20 h-20 object-contain rounded-md bg-white border flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/80x80/4A90E2/FFFFFF?text=${image.category.slice(0,4)}`
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{image.label}</h3>
                    <p className="text-sm text-gray-600">{image.filename}</p>
                    <p className="text-xs text-gray-500 mt-1">Category: {image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Handwriting Gallery */}
      {activeCategory === 'handwriting' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Activity className="w-6 h-6 text-orange-500 mr-2" />
            Handwriting Analysis Dataset
          </h2>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {handwritingImages.map((image, index) => (
                <div key={index} className={`border-2 rounded-lg p-4 ${getCategoryColor(image.condition)}`}>
                  <div className="relative group mb-3">
                    <img 
                      src={image.path} 
                      alt={image.label}
                      className="w-full h-48 object-contain rounded-md bg-white border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x150/${image.condition === 'AD' ? 'FF6B6B' : '4ECDC4'}/FFFFFF?text=${image.condition}+${image.task.slice(-2)}`
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900 mb-1">{image.label}</h3>
                    <p className="text-sm text-gray-600">{image.filename}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {handwritingImages.map((image, index) => (
                <div key={index} className={`border-2 rounded-lg p-4 flex items-center space-x-4 ${getCategoryColor(image.condition)}`}>
                  <img 
                    src={image.path} 
                    alt={image.label}
                    className="w-20 h-20 object-contain rounded-md bg-white border flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/80x80/${image.condition === 'AD' ? 'FF6B6B' : '4ECDC4'}/FFFFFF?text=${image.condition}`
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{image.label}</h3>
                    <p className="text-sm text-gray-600">{image.filename}</p>
                    <p className="text-xs text-gray-500 mt-1">Task: {image.task} | Condition: {image.condition}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Clinical Data */}
      {activeCategory === 'clinical' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <FileText className="w-6 h-6 text-blue-500 mr-2" />
            Clinical Dataset Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">OASIS Dataset</h3>
              <div className="space-y-3">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800">Cross-sectional Data</h4>
                  <p className="text-sm text-gray-600 mt-1">Demographics, MMSE scores, CDR ratings</p>
                  <p className="text-xs text-gray-500 mt-2">File: oasis_cross-sectional.csv</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800">Longitudinal Data</h4>
                  <p className="text-sm text-gray-600 mt-1">Follow-up assessments over time</p>
                  <p className="text-xs text-gray-500 mt-2">File: oasis_longitudinal.csv</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Biomarker Data</h3>
              <div className="space-y-3">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800">Plasma Lipidomics</h4>
                  <p className="text-sm text-gray-600 mt-1">Aβ42/40 ratio, p-tau181, NFL levels</p>
                  <p className="text-xs text-gray-500 mt-2">File: Plasma lipidomics in Alzheimers disease.csv</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800">Genetic Variants</h4>
                  <p className="text-sm text-gray-600 mt-1">APOE4 status and variant analysis</p>
                  <p className="text-xs text-gray-500 mt-2">Files: advp.hg38.bed, advp.hg38.tsv</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}