import { useState } from 'react'
import { Brain, Dna, BarChart3, Target } from 'lucide-react'
import GradCAMHeatmap from '../charts/GradCAMHeatmap'
import SHAPBarChart from '../charts/SHAPBarChart'
import { gradCAMSamples, shapData, modelPerformanceResults } from '../../lib/modelResults'

export default function ExplainabilityTab() {
    const [selectedGradCAM, setSelectedGradCAM] = useState('normal')
    const [selectedSHAP, setSelectedSHAP] = useState('patient1')

    return (
        <div className="space-y-8">
            {/* Grad-CAM Visualization Gallery */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Grad-CAM Visualization Gallery</h2>

                <div className="flex space-x-2 mb-6">
                    {Object.entries(gradCAMSamples).map(([key, sample]: [string, any]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedGradCAM(key)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedGradCAM === key
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {sample.title.split(' ')[0]} {sample.title.split(' ')[1]}
                        </button>
                    ))}
                </div>

                <GradCAMHeatmap data={gradCAMSamples[selectedGradCAM as keyof typeof gradCAMSamples]} />
            </div>

            {/* SHAP Feature Analysis */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">SHAP Feature Analysis</h2>

                <div className="flex space-x-2 mb-6">
                    {Object.entries(shapData).map(([key, patient]: [string, any]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedSHAP(key)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSHAP === key
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {patient.name.split(' ')[0]} {patient.name.split(' ')[1]}
                        </button>
                    ))}
                </div>

                <SHAPBarChart data={shapData[selectedSHAP as keyof typeof shapData] as any} />
            </div>

            {/* Model Attention Patterns */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Model Attention Patterns</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <Brain className="h-6 w-6 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">MRI CNN Attention</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-2">Key Findings:</h4>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Hippocampus: Primary attention region (40-89%)</li>
                                    <li>• Temporal lobe: Secondary focus (18-78%)</li>
                                    <li>• Parietal cortex: Moderate attention (15-65%)</li>
                                    <li>• Frontal regions: Variable importance (12-45%)</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2">Attention Progression:</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Normal → MCI:</span>
                                        <span className="font-medium">+95% hippocampal attention</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>MCI → Mild AD:</span>
                                        <span className="font-medium">+49% temporal attention</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Mild → Moderate:</span>
                                        <span className="font-medium">+33% overall attention</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <Dna className="h-6 w-6 text-purple-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Genomic Feature Importance</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <h4 className="font-medium text-purple-900 mb-2">Top Risk Genes:</h4>
                                <ul className="text-sm text-purple-800 space-y-1">
                                    <li>• APOE ε4: Strongest predictor (±0.156 to ±0.342)</li>
                                    <li>• Chromosome 19: Consistent risk marker</li>
                                    <li>• Inflammatory pathways: Moderate impact</li>
                                    <li>• Lipid metabolism: Variable contribution</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2">Feature Stability:</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>APOE variants:</span>
                                        <span className="font-medium text-green-600">Highly stable</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Inflammatory markers:</span>
                                        <span className="font-medium text-yellow-600">Moderately stable</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Metabolic factors:</span>
                                        <span className="font-medium text-orange-600">Variable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real Model Performance Insights */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Model Performance Insights</h2>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-blue-50 rounded-lg">
                            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">MRI CNN Model</h3>
                            <div className="space-y-2 text-sm text-blue-800">
                                <div><strong>Accuracy:</strong> {modelPerformanceResults.mriCNN.accuracy.toFixed(2)}%</div>
                                <div><strong>Macro F1:</strong> {modelPerformanceResults.mriCNN.macroF1.toFixed(2)}%</div>
                                <div><strong>Training:</strong> {modelPerformanceResults.mriCNN.trainingTime} minutes</div>
                            </div>
                        </div>

                        <div className="text-center p-6 bg-purple-50 rounded-lg">
                            <Dna className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-purple-900 mb-2">Genomic XGBoost</h3>
                            <div className="space-y-2 text-sm text-purple-800">
                                <div><strong>Accuracy:</strong> {modelPerformanceResults.genomicXGB.accuracy.toFixed(2)}%</div>
                                <div><strong>Macro F1:</strong> {modelPerformanceResults.genomicXGB.macroF1.toFixed(2)}%</div>
                                <div><strong>Training:</strong> {modelPerformanceResults.genomicXGB.trainingTime} minutes</div>
                            </div>
                        </div>

                        <div className="text-center p-6 bg-green-50 rounded-lg">
                            <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-green-900 mb-2">Ensemble Model</h3>
                            <div className="space-y-2 text-sm text-green-800">
                                <div><strong>Accuracy:</strong> {modelPerformanceResults.ensemble.accuracy.toFixed(2)}%</div>
                                <div><strong>Macro F1:</strong> {modelPerformanceResults.ensemble.macroF1.toFixed(2)}%</div>
                                <div><strong>Improvement:</strong> +{modelPerformanceResults.ensemble.improvement.accuracyVsMRI.toFixed(2)}% vs MRI</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                            Multi-Modal Explainability Integration
                        </h3>
                        <p className="text-center text-gray-700 mb-4">
                            Our XAI approach combines visual attention maps from MRI analysis with quantitative genetic risk scores
                            to provide comprehensive, interpretable predictions for Alzheimer's disease progression.
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="font-semibold text-blue-600">Visual Evidence</div>
                                <div className="text-gray-600">Brain region analysis</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-purple-600">Genetic Evidence</div>
                                <div className="text-gray-600">Risk factor quantification</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-green-600">Clinical Evidence</div>
                                <div className="text-gray-600">Ensemble prediction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}