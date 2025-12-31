import React from 'react'

interface PerformanceData {
    model: string
    accuracy: number
    macroF1: number
    weightedF1: number
    color: string
}

interface PerformanceChartProps {
    data: PerformanceData[]
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
    const maxValue = Math.max(...data.flatMap(d => [d.accuracy, d.macroF1, d.weightedF1]))

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Model Performance Comparison</h3>
            <div className="space-y-6">
                {data.map((model, index) => (
                    <div key={index} className="space-y-3">
                        <h4 className="font-medium text-gray-800">{model.model}</h4>

                        {/* Accuracy Bar */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Accuracy</span>
                                <span className="font-medium">{model.accuracy.toFixed(2)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full bg-${model.color}-500 transition-all duration-1000 ease-out`}
                                    style={{ width: `${(model.accuracy / maxValue) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Macro F1 Bar */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Macro F1</span>
                                <span className="font-medium">{model.macroF1.toFixed(2)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full bg-${model.color}-400 transition-all duration-1000 ease-out`}
                                    style={{ width: `${(model.macroF1 / maxValue) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Weighted F1 Bar */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Weighted F1</span>
                                <span className="font-medium">{model.weightedF1.toFixed(2)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full bg-${model.color}-300 transition-all duration-1000 ease-out`}
                                    style={{ width: `${(model.weightedF1 / maxValue) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}