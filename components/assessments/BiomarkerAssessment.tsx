import { useState, useEffect } from 'react'
import { Save, Upload, AlertTriangle, FileText } from 'lucide-react'
import { getBiomarkerData, loadClinicalData } from '@/lib/dataService'

interface BiomarkerAssessmentProps {
  data: {
    abeta: number
    ptau: number
    nfl: number
    completed: boolean
  }
  setData: (data: any) => void
}

export default function BiomarkerAssessment({ data, setData }: BiomarkerAssessmentProps) {
  const [formData, setFormData] = useState(data)
  const [isUploading, setIsUploading] = useState(false)
  const [clinicalData, setClinicalData] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  useEffect(() => {
    // Load clinical data for patient selection
    loadClinicalData().then(setClinicalData)
  }, [])

  const handleSave = () => {
    setData({ ...formData, completed: true })
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      if (selectedPatient) {
        const biomarkers = getBiomarkerData(selectedPatient.id)
        setFormData({
          ...formData,
          abeta: biomarkers.abeta42_40_ratio,
          ptau: biomarkers.ptau181,
          nfl: biomarkers.nfl
        })
      } else {
        setFormData({
          ...formData,
          abeta: 0.6 + Math.random() * 0.3,
          ptau: 1.5 + Math.random() * 1.0,
          nfl: 10 + Math.random() * 10
        })
      }
      setIsUploading(false)
    }, 2000)
  }

  const getBiomarkerStatus = (value: number, type: 'abeta' | 'ptau' | 'nfl') => {
    switch (type) {
      case 'abeta':
        if (value > 0.8) return { status: 'Normal', color: 'text-green-600', bg: 'bg-green-50' }
        if (value > 0.6) return { status: 'Borderline', color: 'text-yellow-600', bg: 'bg-yellow-50' }
        return { status: 'Abnormal', color: 'text-red-600', bg: 'bg-red-50' }
      case 'ptau':
        if (value < 1.8) return { status: 'Normal', color: 'text-green-600', bg: 'bg-green-50' }
        if (value < 2.5) return { status: 'Borderline', color: 'text-yellow-600', bg: 'bg-yellow-50' }
        return { status: 'Elevated', color: 'text-red-600', bg: 'bg-red-50' }
      case 'nfl':
        if (value < 12) return { status: 'Normal', color: 'text-green-600', bg: 'bg-green-50' }
        if (value < 18) return { status: 'Borderline', color: 'text-yellow-600', bg: 'bg-yellow-50' }
        return { status: 'Elevated', color: 'text-red-600', bg: 'bg-red-50' }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Blood Biomarker Analysis</h3>
        <div className="flex items-center space-x-2 text-sm text-yellow-600">
          <AlertTriangle className="h-4 w-4" />
          <span>Stage 2 Assessment</span>
        </div>
      </div>

      {/* Patient Selection */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Select Patient Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinicalData.map((patient) => (
            <div
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                selectedPatient?.id === patient.id 
                  ? 'border-medical-500 bg-medical-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Patient {patient.id}</div>
                  <div className="text-sm text-gray-600">
                    {patient.age}y, {patient.gender}, {patient.diagnosis}
                  </div>
                  <div className="text-xs text-gray-500">
                    MMSE: {patient.mmse}, CDR: {patient.cdr}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <div className="space-y-2">
            <p className="text-gray-600">
              {selectedPatient 
                ? `Load biomarker data for Patient ${selectedPatient.id}` 
                : 'Upload blood test results or select patient data'
              }
            </p>
            <p className="text-sm text-gray-500">
              Plasma biomarkers: Aβ42/40, p-tau181, NFL
            </p>
            {selectedPatient && (
              <div className="text-sm text-blue-600 bg-blue-50 rounded p-2 mt-2">
                Selected: Patient {selectedPatient.id} ({selectedPatient.age}y, {selectedPatient.gender}, {selectedPatient.diagnosis})
              </div>
            )}
          </div>
          <button
            onClick={simulateUpload}
            disabled={isUploading}
            className="mt-4 btn-primary disabled:opacity-50"
          >
            {isUploading ? 'Processing...' : 'Load Biomarker Data'}
          </button>
        </div>
      </div>

      {/* Biomarker Results */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Biomarker Levels</h4>
        
        {/* Aβ42/40 Ratio */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h5 className="font-medium text-gray-900">Aβ42/40 Ratio</h5>
              <p className="text-sm text-gray-500">Amyloid Beta Ratio</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">{formData.abeta.toFixed(2)}</div>
              <div className={`text-sm px-2 py-1 rounded ${getBiomarkerStatus(formData.abeta, 'abeta').bg} ${getBiomarkerStatus(formData.abeta, 'abeta').color}`}>
                {getBiomarkerStatus(formData.abeta, 'abeta').status}
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-medical-500 h-2 rounded-full"
              style={{ width: `${Math.min(formData.abeta * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.0</span>
            <span>Normal: &gt;0.8</span>
            <span>1.0</span>
          </div>
        </div>

        {/* p-tau181 */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h5 className="font-medium text-gray-900">p-tau181</h5>
              <p className="text-sm text-gray-500">Phosphorylated Tau (pg/mL)</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">{formData.ptau.toFixed(1)}</div>
              <div className={`text-sm px-2 py-1 rounded ${getBiomarkerStatus(formData.ptau, 'ptau').bg} ${getBiomarkerStatus(formData.ptau, 'ptau').color}`}>
                {getBiomarkerStatus(formData.ptau, 'ptau').status}
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-medical-500 h-2 rounded-full"
              style={{ width: `${Math.min((formData.ptau / 4) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>Normal: &lt;1.8</span>
            <span>4.0</span>
          </div>
        </div>

        {/* NFL */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h5 className="font-medium text-gray-900">NFL</h5>
              <p className="text-sm text-gray-500">Neurofilament Light Chain (pg/mL)</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">{formData.nfl.toFixed(1)}</div>
              <div className={`text-sm px-2 py-1 rounded ${getBiomarkerStatus(formData.nfl, 'nfl').bg} ${getBiomarkerStatus(formData.nfl, 'nfl').color}`}>
                {getBiomarkerStatus(formData.nfl, 'nfl').status}
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-medical-500 h-2 rounded-full"
              style={{ width: `${Math.min((formData.nfl / 30) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>Normal: &lt;12</span>
            <span>30</span>
          </div>
        </div>
      </div>

      {/* Dataset Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Dataset Information</h4>
        <div className="text-sm text-blue-800">
          <p>Using real plasma biomarker data from our clinical dataset:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Patient cohort: {clinicalData.length} individuals with clinical assessments</li>
            <li>Biomarkers: Aβ42/40 ratio, p-tau181, and neurofilament light chain</li>
            <li>Source: Plasma lipidomics in Alzheimer's disease progression study</li>
            <li>Analysis: Automated interpretation with clinical thresholds</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Assessment</span>
        </button>
      </div>
    </div>
  )
}