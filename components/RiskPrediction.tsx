import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react'

interface RiskPredictionProps {
  assessmentData: any
}

export default function RiskPrediction({ assessmentData }: RiskPredictionProps) {
  // Calculate overall risk score based on available data
  const calculateRiskScore = () => {
    let totalScore = 0
    let completedAssessments = 0

    // Clinical assessment (30% weight)
    if (assessmentData.clinical.completed) {
      const mmseScore = (30 - assessmentData.clinical.mmse) / 30 * 0.3
      const cdrScore = assessmentData.clinical.cdr * 0.3
      totalScore += (mmseScore + cdrScore) * 0.3
      completedAssessments++
    }

    // Handwriting assessment (20% weight)
    if (assessmentData.handwriting.completed) {
      const handwritingRisk = (
        (1 - assessmentData.handwriting.velocity) * 0.4 +
        (1 - assessmentData.handwriting.pressure) * 0.3 +
        assessmentData.handwriting.tremor * 0.3
      ) * 0.2
      totalScore += handwritingRisk
      completedAssessments++
    }

    // Biomarkers (25% weight)
    if (assessmentData.biomarkers.completed) {
      const biomarkerRisk = (
        (1 - assessmentData.biomarkers.abeta) * 0.4 +
        (assessmentData.biomarkers.ptau / 4) * 0.3 +
        (assessmentData.biomarkers.nfl / 30) * 0.3
      ) * 0.25
      totalScore += biomarkerRisk
      completedAssessments++
    }

    // Imaging (25% weight)
    if (assessmentData.imaging.completed) {
      const imagingRisk = (
        (1 - assessmentData.imaging.hippocampalVolume) * 0.5 +
        (1 - assessmentData.imaging.corticalThickness) * 0.5
      ) * 0.25
      totalScore += imagingRisk
      completedAssessments++
    }

    return {
      score: Math.min(totalScore, 1),
      confidence: completedAssessments / 4,
      completedAssessments
    }
  }

  const { score, confidence, completedAssessments } = calculateRiskScore()

  const getRiskLevel = (score: number) => {
    if (score < 0.3) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle }
    if (score < 0.6) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock }
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle }
  }

  const getStagePredicition = (score: number) => {
    if (score < 0.2) return 'Normal Cognition'
    if (score < 0.4) return 'Subjective Cognitive Decline'
    if (score < 0.6) return 'Mild Cognitive Impairment'
    if (score < 0.8) return 'Mild Alzheimer\'s Disease'
    return 'Moderate Alzheimer\'s Disease'
  }

  const risk = getRiskLevel(score)
  const RiskIcon = risk.icon

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <div className={`card p-6 ${risk.bg} border-2`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
          <RiskIcon className={`h-6 w-6 ${risk.color}`} />
        </div>
        
        <div className="text-center space-y-4">
          <div>
            <div className={`text-4xl font-bold ${risk.color} mb-2`}>
              {(score * 100).toFixed(0)}%
            </div>
            <div className={`text-lg font-medium ${risk.color}`}>
              {risk.level} Risk
            </div>
          </div>
          
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                risk.level === 'Low' ? 'bg-green-500' :
                risk.level === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score * 100}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-gray-600">
            Confidence: {(confidence * 100).toFixed(0)}% ({completedAssessments}/4 assessments completed)
          </div>
        </div>
      </div>

      {/* Stage Prediction */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-medical-600" />
          <h3 className="text-lg font-semibold text-gray-900">Stage Prediction</h3>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-medium text-gray-900 mb-2">
            {getStagePredicition(score)}
          </div>
          <p className="text-sm text-gray-600">
            Based on current multi-modal assessment data
          </p>
        </div>
      </div>

      {/* Assessment Progress */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Progress</h3>
        
        <div className="space-y-3">
          {[
            { name: 'Clinical Assessment', completed: assessmentData.clinical.completed, stage: 1 },
            { name: 'Digital Handwriting', completed: assessmentData.handwriting.completed, stage: 1 },
            { name: 'Blood Biomarkers', completed: assessmentData.biomarkers.completed, stage: 2 },
            { name: 'MRI Imaging', completed: assessmentData.imaging.completed, stage: 2 }
          ].map((assessment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${
                  assessment.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
                <span className="text-sm font-medium text-gray-900">{assessment.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  assessment.stage === 1 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  Stage {assessment.stage}
                </span>
              </div>
              <span className={`text-sm ${
                assessment.completed ? 'text-green-600' : 'text-gray-500'
              }`}>
                {assessment.completed ? 'Complete' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Recommendations</h3>
        
        <div className="space-y-3 text-sm">
          {score > 0.6 && (
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">
                High risk detected. Consider immediate referral to memory clinic for comprehensive evaluation.
              </p>
            </div>
          )}
          
          {score > 0.3 && score <= 0.6 && (
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">
                Moderate risk identified. Schedule follow-up assessment in 6 months and consider lifestyle interventions.
              </p>
            </div>
          )}
          
          {!assessmentData.biomarkers.completed && score > 0.4 && (
            <div className="flex items-start space-x-2">
              <TrendingUp className="h-4 w-4 text-medical-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">
                Consider Stage 2 assessment (blood biomarkers and MRI) for improved diagnostic accuracy.
              </p>
            </div>
          )}
          
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">
              Continue regular cognitive monitoring and maintain healthy lifestyle practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}