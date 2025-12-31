import React from 'react'

interface TrainingData {
  epochs: number[]
  trainLoss: number[]
  valLoss: number[]
  trainAcc: number[]
  valAcc: number[]
}

interface TrainingCurvesProps {
  data: TrainingData
  title: string
}

export default function TrainingCurves({ data, title }: TrainingCurvesProps) {
  const maxLoss = Math.max(...data.trainLoss, ...data.valLoss)
  const maxAcc = Math.max(...data.trainAcc, ...data.valAcc)
  
  const getPointPosition = (value: number, max: number, height: number) => {
    return height - (value / max) * height
  }

  const createPath = (values: number[], max: number, height: number, width: number) => {
    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = getPointPosition(value, max, height)
      return `${x},${y}`
    })
    return `M ${points.join(' L ')}`
  }

  const chartHeight = 200
  const chartWidth = 400

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Loss Chart */}
        <div>
          <h4 className="text-md font-medium mb-3 text-center">Training Loss</h4>
          <div className="relative">
            <svg width={chartWidth} height={chartHeight} className="border border-gray-200 rounded">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <g key={ratio}>
                  <line
                    x1={0}
                    y1={ratio * chartHeight}
                    x2={chartWidth}
                    y2={ratio * chartHeight}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                  />
                  <text
                    x={-5}
                    y={ratio * chartHeight + 4}
                    fontSize="10"
                    fill="#6b7280"
                    textAnchor="end"
                  >
                    {(maxLoss * (1 - ratio)).toFixed(1)}
                  </text>
                </g>
              ))}
              
              {/* Training Loss Line */}
              <path
                d={createPath(data.trainLoss, maxLoss, chartHeight, chartWidth)}
                stroke="#3b82f6"
                strokeWidth={2}
                fill="none"
              />
              
              {/* Validation Loss Line */}
              <path
                d={createPath(data.valLoss, maxLoss, chartHeight, chartWidth)}
                stroke="#ef4444"
                strokeWidth={2}
                fill="none"
                strokeDasharray="5,5"
              />
              
              {/* Data points */}
              {data.trainLoss.map((loss, index) => (
                <circle
                  key={`train-${index}`}
                  cx={(index / (data.trainLoss.length - 1)) * chartWidth}
                  cy={getPointPosition(loss, maxLoss, chartHeight)}
                  r={3}
                  fill="#3b82f6"
                />
              ))}
              
              {data.valLoss.map((loss, index) => (
                <circle
                  key={`val-${index}`}
                  cx={(index / (data.valLoss.length - 1)) * chartWidth}
                  cy={getPointPosition(loss, maxLoss, chartHeight)}
                  r={3}
                  fill="#ef4444"
                />
              ))}
            </svg>
            
            {/* X-axis labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              {data.epochs.map((epoch, index) => (
                <span key={index}>E{epoch}</span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mt-3 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span>Train Loss</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-red-500 border-dashed"></div>
              <span>Val Loss</span>
            </div>
          </div>
        </div>

        {/* Accuracy Chart */}
        <div>
          <h4 className="text-md font-medium mb-3 text-center">Training Accuracy</h4>
          <div className="relative">
            <svg width={chartWidth} height={chartHeight} className="border border-gray-200 rounded">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <g key={ratio}>
                  <line
                    x1={0}
                    y1={ratio * chartHeight}
                    x2={chartWidth}
                    y2={ratio * chartHeight}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                  />
                  <text
                    x={-5}
                    y={ratio * chartHeight + 4}
                    fontSize="10"
                    fill="#6b7280"
                    textAnchor="end"
                  >
                    {(maxAcc * (1 - ratio)).toFixed(0)}%
                  </text>
                </g>
              ))}
              
              {/* Training Accuracy Line */}
              <path
                d={createPath(data.trainAcc, maxAcc, chartHeight, chartWidth)}
                stroke="#10b981"
                strokeWidth={2}
                fill="none"
              />
              
              {/* Validation Accuracy Line */}
              <path
                d={createPath(data.valAcc, maxAcc, chartHeight, chartWidth)}
                stroke="#f59e0b"
                strokeWidth={2}
                fill="none"
                strokeDasharray="5,5"
              />
              
              {/* Data points */}
              {data.trainAcc.map((acc, index) => (
                <circle
                  key={`train-acc-${index}`}
                  cx={(index / (data.trainAcc.length - 1)) * chartWidth}
                  cy={getPointPosition(acc, maxAcc, chartHeight)}
                  r={3}
                  fill="#10b981"
                />
              ))}
              
              {data.valAcc.map((acc, index) => (
                <circle
                  key={`val-acc-${index}`}
                  cx={(index / (data.valAcc.length - 1)) * chartWidth}
                  cy={getPointPosition(acc, maxAcc, chartHeight)}
                  r={3}
                  fill="#f59e0b"
                />
              ))}
            </svg>
            
            {/* X-axis labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              {data.epochs.map((epoch, index) => (
                <span key={index}>E{epoch}</span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mt-3 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span>Train Acc</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-yellow-500 border-dashed"></div>
              <span>Val Acc</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
        <strong>Key Observations:</strong>
        <ul className="mt-1 space-y-1 text-gray-700">
          <li>• Final validation accuracy: {data.valAcc[data.valAcc.length - 1]}%</li>
          <li>• Best epoch: {data.epochs[data.valAcc.indexOf(Math.max(...data.valAcc))]} (Val Acc: {Math.max(...data.valAcc)}%)</li>
          <li>• Training converged around epoch {data.epochs.length - 2}</li>
        </ul>
      </div>
    </div>
  )
}