import React from 'react'

interface ConfusionMatrixProps {
  matrix: number[][]
  classNames: string[]
  title: string
}

export default function ConfusionMatrix({ matrix, classNames, title }: ConfusionMatrixProps) {
  const getIntensityColor = (value: number, rowSum: number) => {
    const intensity = value / rowSum
    if (intensity > 0.8) return 'bg-green-600 text-white'
    if (intensity > 0.6) return 'bg-green-500 text-white'
    if (intensity > 0.4) return 'bg-yellow-500 text-white'
    if (intensity > 0.2) return 'bg-orange-500 text-white'
    return 'bg-red-500 text-white'
  }

  const getRowSum = (rowIndex: number) => {
    return matrix[rowIndex].reduce((sum, val) => sum + val, 0)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="text-center text-sm text-gray-600 mb-2">Predicted →</div>
          <div className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(${classNames.length}, 1fr)` }}>
            {/* Header row */}
            <div></div>
            {classNames.map((name, index) => (
              <div key={`header-${index}`} className="text-xs font-medium text-gray-700 p-2 text-center">
                {name}
              </div>
            ))}
            
            {/* Matrix rows */}
            {matrix.map((row, rowIndex) => {
              const rowSum = getRowSum(rowIndex)
              return (
                <React.Fragment key={`row-${rowIndex}`}>
                  <div className="text-xs font-medium text-gray-700 p-2 flex items-center">
                    {rowIndex === 0 && <span className="transform -rotate-90 whitespace-nowrap">Actual</span>}
                    {rowIndex === Math.floor(matrix.length / 2) && <span className="ml-2">{classNames[rowIndex]}</span>}
                    {rowIndex !== 0 && rowIndex !== Math.floor(matrix.length / 2) && <span className="ml-8">{classNames[rowIndex]}</span>}
                  </div>
                  {row.map((value, colIndex) => (
                    <div
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={`w-16 h-16 flex items-center justify-center text-sm font-bold rounded ${getIntensityColor(value, rowSum)}`}
                      title={`Actual: ${classNames[rowIndex]}, Predicted: ${classNames[colIndex]}, Count: ${value}`}
                    >
                      {value}
                    </div>
                  ))}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span>High Accuracy (&gt;80%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>Moderate (40-80%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Low (&lt;40%)</span>
        </div>
      </div>
    </div>
  )
}