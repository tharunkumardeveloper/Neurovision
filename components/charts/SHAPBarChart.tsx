import React from 'react'

interface SHAPFeature {
  name: string
  value: number
  impact: 'risk' | 'protective'
  description: string
}

interface SHAPData {
  name: string
  features: SHAPFeature[]
}

interface SHAPBarChartProps {
  data: SHAPData
}

export default function SHAPBarChart({ data }: SHAPBarChartProps) {
  // Sort features by absolute value for better visualization
  const sortedFeatures = [...data.features].sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
  
  // Find max absolute value for scaling
  const maxAbsValue = Math.max(...sortedFeatures.map(f => Math.abs(f.value)))
  
  const getBarColor = (feature: SHAPFeature) => {
    if (feature.impact === 'risk') {
      return feature.value > 0 ? 'bg-red-500' : 'bg-red-300'
    } else {
      return feature.value > 0 ? 'bg-green-500' : 'bg-green-300'
    }
  }
  
  const getBarWidth = (value: number) => {
    return Math.abs(value) / maxAbsValue * 100
  }
  
  const getImpactIcon = (impact: 'risk' | 'protective') => {
    if (impact === 'risk') {
      return (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    } else {
      return (
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          SHAP Feature Importance Analysis
        </h3>
        <p className="text-sm text-gray-600">
          {data.name} - Feature contributions to model prediction
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mb-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-700">Increases Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-700">Protective</span>
        </div>
        <div className="text-xs text-gray-500">
          Bar length = feature importance magnitude
        </div>
      </div>

      {/* SHAP Bar Chart */}
      <div className="space-y-4">
        {sortedFeatures.map((feature, index) => (
          <div key={index} className="group">
            {/* Feature Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getImpactIcon(feature.impact)}
                <h4 className="font-medium text-gray-900 text-sm">{feature.name}</h4>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold ${
                  feature.impact === 'risk' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {feature.value > 0 ? '+' : ''}{feature.value.toFixed(3)}
                </span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 z-10"></div>
              
              {/* Bar container */}
              <div className="relative h-8 bg-gray-100 rounded-md overflow-hidden">
                {feature.value !== 0 && (
                  <div
                    className={`absolute top-0 h-full transition-all duration-500 ${getBarColor(feature)} opacity-80`}
                    style={{
                      width: `${getBarWidth(feature.value)}%`,
                      left: feature.value > 0 ? '50%' : `${50 - getBarWidth(feature.value)}%`
                    }}
                  ></div>
                )}
                
                {/* Value label on bar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700 bg-white bg-opacity-80 px-2 py-1 rounded">
                    {Math.abs(feature.value).toFixed(3)}
                  </span>
                </div>
              </div>
            </div>

            {/* Feature Description */}
            <p className="text-xs text-gray-600 mt-1 pl-6">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Analysis Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-700">Risk Factors:</span>
            <span className="font-medium text-blue-900 ml-1">
              {sortedFeatures.filter(f => f.impact === 'risk' && f.value > 0).length}
            </span>
          </div>
          <div>
            <span className="text-blue-700">Protective Factors:</span>
            <span className="font-medium text-blue-900 ml-1">
              {sortedFeatures.filter(f => f.impact === 'protective' && f.value > 0).length}
            </span>
          </div>
          <div>
            <span className="text-blue-700">Total Features:</span>
            <span className="font-medium text-blue-900 ml-1">{sortedFeatures.length}</span>
          </div>
          <div>
            <span className="text-blue-700">Max Impact:</span>
            <span className="font-medium text-blue-900 ml-1">
              ±{maxAbsValue.toFixed(3)}
            </span>
          </div>
        </div>
      </div>

      {/* Technical Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        SHAP (SHapley Additive exPlanations) values explain individual predictions by quantifying 
        the contribution of each feature to the model's output.
      </div>
    </div>
  )
}