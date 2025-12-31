import { useState } from 'react'
import { Save, AlertCircle } from 'lucide-react'

interface ClinicalAssessmentProps {
  data: {
    mmse: number
    cdr: number
    completed: boolean
  }
  setData: (data: any) => void
}

export default function ClinicalAssessment({ data, setData }: ClinicalAssessmentProps) {
  const [formData, setFormData] = useState(data)

  const handleSave = () => {
    setData({ ...formData, completed: true })
  }

  const getMMSEInterpretation = (score: number) => {
    if (score >= 24) return { text: 'Normal', color: 'text-green-600' }
    if (score >= 18) return { text: 'Mild Cognitive Impairment', color: 'text-yellow-600' }
    return { text: 'Moderate-Severe Impairment', color: 'text-red-600' }
  }

  const getCDRInterpretation = (score: number) => {
    if (score === 0) return { text: 'Normal', color: 'text-green-600' }
    if (score === 0.5) return { text: 'Very Mild Dementia', color: 'text-yellow-600' }
    if (score === 1) return { text: 'Mild Dementia', color: 'text-orange-600' }
    return { text: 'Moderate-Severe Dementia', color: 'text-red-600' }
  }

  const mmseInterpretation = getMMSEInterpretation(formData.mmse)
  const cdrInterpretation = getCDRInterpretation(formData.cdr)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-medical-600" />
        <h3 className="text-lg font-medium text-gray-900">Clinical Cognitive Assessment</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MMSE Score */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Mini-Mental State Examination (MMSE)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="30"
              value={formData.mmse}
              onChange={(e) => setFormData({...formData, mmse: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>15</span>
              <span>30</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{formData.mmse}/30</span>
            <span className={`text-sm font-medium ${mmseInterpretation.color}`}>
              {mmseInterpretation.text}
            </span>
          </div>
        </div>

        {/* CDR Score */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Clinical Dementia Rating (CDR)
          </label>
          <select
            value={formData.cdr}
            onChange={(e) => setFormData({...formData, cdr: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-500"
          >
            <option value={0}>0 - Normal</option>
            <option value={0.5}>0.5 - Very Mild</option>
            <option value={1}>1 - Mild</option>
            <option value={2}>2 - Moderate</option>
            <option value={3}>3 - Severe</option>
          </select>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{formData.cdr}</span>
            <span className={`text-sm font-medium ${cdrInterpretation.color}`}>
              {cdrInterpretation.text}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Clinical Notes */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Clinical Observations
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-500"
          placeholder="Enter any additional clinical observations or notes..."
        />
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