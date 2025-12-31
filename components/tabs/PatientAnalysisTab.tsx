import { useState } from 'react'
import { User, TrendingUp, Brain, Dna } from 'lucide-react'

export default function PatientAnalysisTab() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  const patients = [
    {
      id: 'P-001-2024',
      name: 'Patient #001',
      age: 68,
      gender: 'Female',
      stage: 'Normal',
      risk: 'Low',
      confidence: 89.2,
      scanDate: 'Dec 15, 2024',
      mriScore: 91.3,
      genomicScore: 87.1,
      ensembleScore: 89.2
    },
    {
      id: 'P-002-2024',
      name: 'Patient #002',
      age: 72,
      gender: 'Male',
      stage: 'MCI',
      risk: 'Medium',
      confidence: 76.4,
      scanDate: 'Dec 20, 2024',
      mriScore: 78.2,
      genomicScore: 74.6,
      ensembleScore: 76.4
    },
    {
      id: 'P-003-2024',
      name: 'Patient #003',
      age: 75,
      gender: 'Female',
      stage: 'Mild AD',
      risk: 'High',
      confidence: 82.1,
      scanDate: 'Dec 18, 2024',
      mriScore: 79.8,
      genomicScore: 84.4,
      ensembleScore: 82.1
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'High': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return '🟢'
      case 'Medium': return '🟡'
      case 'High': return '🔴'
      default: return '⚪'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Normal': return 'text-green-700 bg-green-100'
      case 'MCI': return 'text-yellow-700 bg-yellow-100'
      case 'Mild AD': return 'text-orange-700 bg-orange-100'
      case 'Moderate AD': return 'text-red-700 bg-red-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  return (
    <div className="space-y-8">
      {!selectedPatient ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Selection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{patient.age}y, {patient.gender}</p>
                    </div>
                  </div>
                  <span className="text-2xl">{getRiskIcon(patient.risk)}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Predicted Stage:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(patient.stage)}`}>
                      {patient.stage}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Risk Level:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(patient.risk)}`}>
                      {patient.risk} Risk
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confidence:</span>
                    <span className="font-semibold text-gray-900">{patient.confidence}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Scan:</span>
                    <span className="text-sm text-gray-900">{patient.scanDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Patient Analysis Report</h2>
            <button
              onClick={() => setSelectedPatient(null)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            >
              ← Back to Patient List
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Patient Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Patient Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient ID:</span>
                  <span className="font-medium">{selectedPatient.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{selectedPatient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{selectedPatient.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium">{selectedPatient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scan Date:</span>
                  <span className="font-medium">{selectedPatient.scanDate}</span>
                </div>
              </div>
            </div>

            {/* Prediction Results */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction Results</h3>
              
              <div className="text-center mb-6">
                <div className={`inline-block px-6 py-3 rounded-lg text-xl font-bold ${getStageColor(selectedPatient.stage)}`}>
                  {selectedPatient.stage}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Confidence Score:</span>
                    <span className="font-semibold">{selectedPatient.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${selectedPatient.confidence}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border-2 ${getRiskColor(selectedPatient.risk)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Risk Level:</span>
                    <span className="text-2xl">{getRiskIcon(selectedPatient.risk)} {selectedPatient.risk} Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MRI Analysis */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              MRI Analysis (Grad-CAM)
            </h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <h4 className="font-medium text-gray-700 mb-2">Original</h4>
                <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-700 rounded-full relative">
                    <div className="absolute inset-2 bg-gray-600 rounded-full"></div>
                    <div className="absolute top-8 left-6 w-6 h-4 bg-gray-500 rounded-full"></div>
                    <div className="absolute top-8 right-6 w-6 h-4 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="font-medium text-gray-700 mb-2">Heatmap</h4>
                <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-700 rounded-full relative">
                    <div className="absolute inset-2 bg-gray-600 rounded-full"></div>
                    <div className="absolute top-8 left-6 w-6 h-4 bg-red-500 opacity-80 rounded-full"></div>
                    <div className="absolute top-8 right-6 w-6 h-4 bg-yellow-500 opacity-80 rounded-full"></div>
                    <div className="absolute top-6 left-8 w-8 h-6 bg-orange-500 opacity-60 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="font-medium text-gray-700 mb-2">Overlay</h4>
                <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-700 rounded-full relative">
                    <div className="absolute inset-2 bg-gray-600 rounded-full"></div>
                    <div className="absolute top-8 left-6 w-6 h-4 bg-gray-500 rounded-full"></div>
                    <div className="absolute top-8 right-6 w-6 h-4 bg-gray-500 rounded-full"></div>
                    <div className="absolute top-8 left-6 w-6 h-4 bg-red-500 opacity-60 rounded-full"></div>
                    <div className="absolute top-8 right-6 w-6 h-4 bg-yellow-500 opacity-60 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Highlighted Regions:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>• Hippocampus:</span>
                    <span className="text-green-600 font-medium">Normal size ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Temporal Lobe:</span>
                    <span className="text-green-600 font-medium">No atrophy ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Parietal Cortex:</span>
                    <span className="text-green-600 font-medium">Intact ✓</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Heatmap Legend:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>High attention</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Moderate attention</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Low attention</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Genomic Analysis */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Dna className="h-5 w-5 mr-2" />
              Genomic Feature Analysis (SHAP)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Feature</th>
                    <th className="text-center py-2">SHAP Value</th>
                    <th className="text-center py-2">Impact</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Feature_120</td>
                    <td className="text-center py-2 text-red-600 font-semibold">+0.342</td>
                    <td className="text-center py-2">🔴 Risk</td>
                    <td className="py-2">APOE ε4 allele carrier</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Feature_119</td>
                    <td className="text-center py-2 text-red-600 font-semibold">+0.298</td>
                    <td className="text-center py-2">🔴 Risk</td>
                    <td className="py-2">Chromosome 19 marker</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Feature_122</td>
                    <td className="text-center py-2 text-green-600 font-semibold">-0.276</td>
                    <td className="text-center py-2">🟢 Protect</td>
                    <td className="py-2">Protective variant</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Genetic Risk Summary:</h4>
              <div className="text-sm text-purple-800">
                <div><strong>APOE Status:</strong> ε3/ε4 heterozygous (1.5-3x baseline risk)</div>
                <div><strong>Polygenic Risk Score:</strong> Moderate (65th percentile)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}