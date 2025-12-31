import { useState } from 'react'
import { Info, Eye, BarChart3 } from 'lucide-react'
import SHAPBarChart from './charts/SHAPBarChart'
import GradCAMHeatmap from './charts/GradCAMHeatmap'

interface ModelExplanationProps {
    assessmentData: any
}

export default function ModelExplanation({ assessmentData }: ModelExplanationProps) {
    const [activeView, setActiveView] = useState<'shap' | 'gradcam'>('shap')

    // Generate SHAP-like feature importance data
    const generateSHAPData = () => {
        const features = []

        if (assessmentData.clinical.completed) {
            features.push(
                { 
                    name: 'MMSE Score', 
                    value: (30 - assessmentData.clinical.mmse) * 0.02, 
                    impact: 'risk' as const,
                    description: `MMSE score of ${assessmentData.clinical.mmse}/30 indicates cognitive performance level`
                },
                { 
                    name: 'CDR Score', 
                    value: assessmentData.clinical.cdr * 0.15, 
                    impact: 'risk' as const,
                    description: `CDR score of ${assessmentData.clinical.cdr} reflects functional impairment severity`
                }
            )
        }

        if (assessmentData.handwriting.completed) {
            features.push(
                { 
                    name: 'Writing Velocity', 
                    value: (1 - assessmentData.handwriting.velocity) * 0.12, 
                    impact: 'risk' as const,
                    description: `Reduced writing velocity (${(assessmentData.handwriting.velocity * 100).toFixed(0)}%) suggests motor control difficulties`
                },
                { 
                    name: 'Pen Pressure', 
                    value: (1 - assessmentData.handwriting.pressure) * 0.08, 
                    impact: 'risk' as const,
                    description: `Decreased pen pressure (${(assessmentData.handwriting.pressure * 100).toFixed(0)}%) indicates fine motor impairment`
                },
                { 
                    name: 'Tremor Level', 
                    value: assessmentData.handwriting.tremor * 0.10, 
                    impact: 'risk' as const,
                    description: `Elevated tremor level (${(assessmentData.handwriting.tremor * 100).toFixed(0)}%) suggests neuromotor dysfunction`
                }
            )
        }

        if (assessmentData.biomarkers.completed) {
            features.push(
                { 
                    name: 'Aβ42/40 Ratio', 
                    value: (1 - assessmentData.biomarkers.abeta) * 0.18, 
                    impact: 'risk' as const,
                    description: `Low Aβ42/40 ratio (${assessmentData.biomarkers.abeta.toFixed(3)}) indicates amyloid pathology`
                },
                { 
                    name: 'p-tau181', 
                    value: (assessmentData.biomarkers.ptau / 4) * 0.16, 
                    impact: 'risk' as const,
                    description: `Elevated p-tau181 (${assessmentData.biomarkers.ptau.toFixed(1)} pg/mL) suggests tau pathology`
                },
                { 
                    name: 'NFL', 
                    value: (assessmentData.biomarkers.nfl / 30) * 0.14, 
                    impact: 'risk' as const,
                    description: `Increased NFL (${assessmentData.biomarkers.nfl.toFixed(1)} pg/mL) indicates neurodegeneration`
                }
            )
        }

        if (assessmentData.imaging.completed) {
            features.push(
                { 
                    name: 'Hippocampal Volume', 
                    value: (1 - assessmentData.imaging.hippocampalVolume) * 0.20, 
                    impact: 'risk' as const,
                    description: `Reduced hippocampal volume (${(assessmentData.imaging.hippocampalVolume * 100).toFixed(0)}% of normal) indicates atrophy`
                },
                { 
                    name: 'Cortical Thickness', 
                    value: (1 - assessmentData.imaging.corticalThickness) * 0.18, 
                    impact: 'risk' as const,
                    description: `Decreased cortical thickness (${(assessmentData.imaging.corticalThickness * 100).toFixed(0)}% of normal) suggests cortical atrophy`
                }
            )
        }

        // Add some positive contributing factors
        features.push(
            { 
                name: 'Age Factor', 
                value: -0.05, 
                impact: 'protective' as const,
                description: 'Age-adjusted baseline shows protective cognitive reserve'
            },
            { 
                name: 'Education Level', 
                value: -0.03, 
                impact: 'protective' as const,
                description: 'Higher education level provides cognitive protection'
            }
        )

        return {
            name: 'Multi-Modal Assessment Analysis',
            features: features.sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
        }
    }

    const shapData = generateSHAPData()

    // Generate Grad-CAM data for imaging assessment
    const generateGradCAMData = () => {
        if (!assessmentData.imaging.completed) {
            return null
        }

        return {
            title: 'MRI Analysis - Grad-CAM Visualization',
            confidence: 85.7,
            originalImage: '/datasets/mri/MildDemented/mildDem701.jpg', // Sample image
            regions: [
                {
                    name: 'Left Hippocampus',
                    status: 'Atrophic',
                    attention: 0.89,
                    color: 'red'
                },
                {
                    name: 'Right Hippocampus', 
                    status: 'Mild Atrophy',
                    attention: 0.67,
                    color: 'orange'
                },
                {
                    name: 'Temporal Cortex',
                    status: 'Thinning',
                    attention: 0.54,
                    color: 'yellow'
                },
                {
                    name: 'Frontal Cortex',
                    status: 'Normal',
                    attention: 0.23,
                    color: 'green'
                }
            ]
        }
    }

    const gradCAMData = generateGradCAMData()

    // Model confidence breakdown
    const modelConfidence = [
        { name: 'Random Forest (Biomarkers)', value: 0.92, color: '#3b82f6' },
        { name: 'CNN (MRI Analysis)', value: 0.88, color: '#10b981' },
        { name: 'SVM (Handwriting)', value: 0.85, color: '#f59e0b' },
        { name: 'Gradient Boosting (Clinical)', value: 0.90, color: '#ef4444' }
    ]

    return (
        <div className="space-y-6">
            <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <Info className="h-5 w-5 text-medical-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Model Explanation</h3>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveView('shap')}
                            className={`px-3 py-1 rounded text-sm font-medium ${activeView === 'shap'
                                ? 'bg-medical-100 text-medical-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <BarChart3 className="h-4 w-4 inline mr-1" />
                            SHAP Values
                        </button>
                        <button
                            onClick={() => setActiveView('gradcam')}
                            className={`px-3 py-1 rounded text-sm font-medium ${activeView === 'gradcam'
                                ? 'bg-medical-100 text-medical-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <Eye className="h-4 w-4 inline mr-1" />
                            Grad-CAM
                        </button>
                    </div>
                </div>

                {activeView === 'shap' && (
                    <div>
                        <SHAPBarChart data={shapData} />
                    </div>
                )}

                {activeView === 'gradcam' && (
                    <div>
                        {gradCAMData ? (
                            <GradCAMHeatmap data={gradCAMData} />
                        ) : (
                            <div className="text-center py-12">
                                <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No Imaging Data Available
                                </h3>
                                <p className="text-gray-600">
                                    Complete the imaging assessment to see Grad-CAM visualizations
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Model Performance */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Individual Model Confidence</h4>
                        <div className="space-y-3">
                            {modelConfidence.map((model, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-700">{model.name}</span>
                                        <span className="font-medium">{(model.value * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full"
                                            style={{
                                                width: `${model.value * 100}%`,
                                                backgroundColor: model.color
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Ensemble Composition</h4>
                        <div className="space-y-2">
                            {modelConfidence.map((model, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="w-3 h-3 rounded"
                                            style={{ backgroundColor: model.color }}
                                        ></div>
                                        <span className="text-sm text-gray-700">{model.name.split(' ')[0]}</span>
                                    </div>
                                    <span className="text-sm font-medium">{(model.value * 100).toFixed(0)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}