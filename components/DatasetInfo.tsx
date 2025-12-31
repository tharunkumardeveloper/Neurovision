import { Database, Image, FileText, Activity, Dna, Brain } from 'lucide-react'

export default function DatasetInfo() {
  const datasets = [
    {
      name: 'MRI Image Dataset',
      icon: Brain,
      description: 'Kaggle Alzheimer\'s MRI Disease Classification Dataset',
      samples: '6,400 scans',
      details: {
        total: '6,400 scans',
        training: '5,120 images (80%)',
        test: '1,280 images (20%)',
        format: '224x224 RGB',
        storage: 'Parquet files'
      },
      categories: ['Normal: 1,280 train / 320 test', 'MCI: 1,280 train / 320 test', 'Mild AD: 1,280 train / 320 test', 'Moderate AD: 1,280 train / 320 test'],
      usage: 'ResNet50 CNN for structural brain analysis',
      accuracy: '72.3%',
      color: 'blue'
    },
    {
      name: 'Genomic Dataset',
      icon: Dna,
      description: 'ALZ_Variant Dataset (preprocessed genomic markers)',
      samples: '6,346 individuals',
      details: {
        total: '6,346 individuals',
        training: '5,076 samples (80%)',
        test: '1,270 samples (20%)',
        features: '130 genomic markers',
        format: '.npz + .tsv files'
      },
      categories: ['APOE variants', 'Chromosome 19 markers', 'Inflammatory pathways', '9 classes mapped to 4 AD stages'],
      usage: 'XGBoost classifier for genetic risk assessment',
      accuracy: '61.8%',
      color: 'purple'
    },
    {
      name: 'Clinical Data',
      icon: FileText,
      description: 'OASIS longitudinal and cross-sectional assessments',
      samples: 'Multiple cohorts',
      details: {
        source: 'OASIS database',
        assessments: 'MMSE, CDR scores',
        demographics: 'Age, gender, education',
        longitudinal: 'Multi-timepoint data',
        format: 'CSV files'
      },
      categories: ['Demographics', 'Cognitive Scores', 'Clinical Diagnosis', 'Longitudinal Tracking'],
      usage: 'Gradient Boosting for clinical feature interactions',
      accuracy: 'Integrated',
      color: 'green'
    },
    {
      name: 'Handwriting Dataset',
      icon: Activity,
      description: 'Digital handwriting samples from patients and controls',
      samples: '432 images',
      details: {
        tasks: '6 different tasks',
        conditions: 'AD vs Healthy Controls',
        samples: '36 per task/condition',
        format: 'PNG images',
        features: 'Kinematic analysis'
      },
      categories: ['Copy Text', 'Write Sentence', 'Draw Spiral', 'Draw Clock', 'Write Words', 'Draw Shapes'],
      usage: 'SVM-based kinematic feature extraction',
      accuracy: 'Integrated',
      color: 'orange'
    },
    {
      name: 'Plasma Biomarkers',
      icon: Database,
      description: 'Plasma lipidomics in Alzheimer\'s disease progression',
      samples: 'Biomarker profiles',
      details: {
        biomarkers: 'Aβ42/40, p-tau181, NFL',
        source: 'Clinical plasma samples',
        analysis: 'Automated interpretation',
        thresholds: 'Clinical cutoffs',
        format: 'CSV data'
      },
      categories: ['Aβ42/40 Ratio', 'p-tau181', 'Neurofilament Light Chain', 'APOE4 Status'],
      usage: 'Random Forest for biomarker pattern analysis',
      accuracy: 'Integrated',
      color: 'red'
    }
  ]

  const systemStats = [
    { label: 'Total Training Time', value: '~2 hours', icon: '⏱️' },
    { label: 'Average Prediction Time', value: '3.2 seconds', icon: '⚡' },
    { label: 'Ensemble Accuracy', value: '75.5%', icon: '🎯' },
    { label: 'Performance Boost', value: '+3.2%', icon: '📈' },
    { label: 'Active Models', value: '3', icon: '🤖' },
    { label: 'Patients Analyzed', value: '6,400', icon: '👥' }
  ]

  return (
    <div className="space-y-8">
      {/* System Statistics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">System Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {systemStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Overview */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Integrated Clinical Datasets</h2>
        <div className="space-y-6">
          {datasets.map((dataset, index) => {
            const Icon = dataset.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        dataset.color === 'blue' ? 'bg-blue-100' :
                        dataset.color === 'purple' ? 'bg-purple-100' :
                        dataset.color === 'green' ? 'bg-green-100' :
                        dataset.color === 'orange' ? 'bg-orange-100' :
                        dataset.color === 'red' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-8 w-8 ${
                          dataset.color === 'blue' ? 'text-blue-600' :
                          dataset.color === 'purple' ? 'text-purple-600' :
                          dataset.color === 'green' ? 'text-green-600' :
                          dataset.color === 'orange' ? 'text-orange-600' :
                          dataset.color === 'red' ? 'text-red-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{dataset.name}</h3>
                        <p className="text-gray-600 mt-1">{dataset.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{dataset.samples}</div>
                      <div className={`text-sm font-medium ${
                        dataset.color === 'blue' ? 'text-blue-600' :
                        dataset.color === 'purple' ? 'text-purple-600' :
                        dataset.color === 'green' ? 'text-green-600' :
                        dataset.color === 'orange' ? 'text-orange-600' :
                        dataset.color === 'red' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        Accuracy: {dataset.accuracy}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Dataset Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        {Object.entries(dataset.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Categories/Classes</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        {dataset.categories.slice(0, 4).map((category, idx) => (
                          <div key={idx}>• {category}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">AI Model Usage</h4>
                      <p className="text-sm text-gray-600">{dataset.usage}</p>
                      <div className={`mt-3 p-3 rounded-lg ${
                        dataset.color === 'blue' ? 'bg-blue-50' :
                        dataset.color === 'purple' ? 'bg-purple-50' :
                        dataset.color === 'green' ? 'bg-green-50' :
                        dataset.color === 'orange' ? 'bg-orange-50' :
                        dataset.color === 'red' ? 'bg-red-50' : 'bg-gray-50'
                      }`}>
                        <div className={`text-xs ${
                          dataset.color === 'blue' ? 'text-blue-800' :
                          dataset.color === 'purple' ? 'text-purple-800' :
                          dataset.color === 'green' ? 'text-green-800' :
                          dataset.color === 'orange' ? 'text-orange-800' :
                          dataset.color === 'red' ? 'text-red-800' : 'text-gray-800'
                        }`}>
                          <strong>Integration:</strong> Part of ensemble meta-learner for 
                          comprehensive multi-modal Alzheimer's risk assessment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Technical Specifications */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hardware Requirements</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum:</span>
                <span className="font-medium">12GB RAM, CPU-only</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recommended:</span>
                <span className="font-medium">16GB RAM, NVIDIA GPU (T4+)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Training Time:</span>
                <span className="font-medium">~2 hours on Colab T4 GPU</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Inference Time:</span>
                <span className="font-medium">3.2s per patient (GPU)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Software Stack</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Framework:</span>
                <span className="font-medium">PyTorch 2.9.0, scikit-learn 1.6.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ML Libraries:</span>
                <span className="font-medium">XGBoost 2.0+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Explainability:</span>
                <span className="font-medium">pytorch-grad-cam, SHAP 0.50.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Processing:</span>
                <span className="font-medium">Pandas 2.2.2, NumPy 2.0.2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Modal AI Pipeline */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Multi-Modal AI Pipeline</h2>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            All datasets are integrated through our ensemble meta-learner that combines predictions from 
            multiple specialized models to provide comprehensive Alzheimer's risk assessment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-900">ResNet50 CNN</h4>
            <p className="text-sm text-blue-700">MRI Analysis</p>
            <p className="text-xs text-gray-600 mt-1">72.3% accuracy</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <Dna className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-900">XGBoost</h4>
            <p className="text-sm text-purple-700">Genomic Analysis</p>
            <p className="text-xs text-gray-600 mt-1">61.8% accuracy</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <Activity className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h4 className="font-semibold text-orange-900">SVM</h4>
            <p className="text-sm text-orange-700">Handwriting Analysis</p>
            <p className="text-xs text-gray-600 mt-1">Integrated</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-900">Gradient Boosting</h4>
            <p className="text-sm text-green-700">Clinical Features</p>
            <p className="text-xs text-gray-600 mt-1">Integrated</p>
          </div>
        </div>
        
        <div className="text-center mt-6 p-4 bg-white rounded-lg shadow-sm">
          <h4 className="text-xl font-bold text-gray-900 mb-2">Ensemble Meta-Learner</h4>
          <p className="text-gray-700 mb-2">Logistic Regression fusion with 5-fold cross-validation</p>
          <div className="text-2xl font-bold text-green-600">75.5% Final Accuracy</div>
          <div className="text-sm text-green-700">+3.2% improvement over individual models</div>
        </div>
      </div>
    </div>
  )
}