// Data processing utilities for generating realistic model outputs
import { modelPerformanceResults } from './modelResults'

// Simulate realistic dataset
export interface PatientData {
  id: string
  age: number
  gender: 'M' | 'F'
  mmse: number
  cdr: number
  apoe: string
  diagnosis: 'Normal' | 'MCI' | 'Mild AD' | 'Moderate AD'
  mriFeatures: number[]
  genomicFeatures: number[]
}

// Generate synthetic but realistic patient data
export function generatePatientDataset(size: number = 1270): PatientData[] {
  const patients: PatientData[] = []
  
  // Class distribution based on real data
  const classDistribution = {
    'Normal': 171,
    'MCI': 15,
    'Mild AD': 629,
    'Moderate AD': 455
  }
  
  let currentId = 1
  
  Object.entries(classDistribution).forEach(([diagnosis, count]) => {
    for (let i = 0; i < count; i++) {
      const patient: PatientData = {
        id: `P${String(currentId).padStart(4, '0')}`,
        age: generateAgeForDiagnosis(diagnosis as any),
        gender: Math.random() > 0.5 ? 'F' : 'M',
        mmse: generateMMSEForDiagnosis(diagnosis as any),
        cdr: generateCDRForDiagnosis(diagnosis as any),
        apoe: generateAPOEStatus(),
        diagnosis: diagnosis as any,
        mriFeatures: generateMRIFeatures(diagnosis as any),
        genomicFeatures: generateGenomicFeatures(diagnosis as any)
      }
      patients.push(patient)
      currentId++
    }
  })
  
  return shuffleArray(patients)
}

function generateAgeForDiagnosis(diagnosis: string): number {
  const baseAge = {
    'Normal': 65,
    'MCI': 72,
    'Mild AD': 75,
    'Moderate AD': 78
  }[diagnosis] || 70
  
  return Math.max(50, Math.min(90, Math.round(baseAge + (Math.random() - 0.5) * 15)))
}

function generateMMSEForDiagnosis(diagnosis: string): number {
  const baseMMSE = {
    'Normal': 28,
    'MCI': 25,
    'Mild AD': 20,
    'Moderate AD': 15
  }[diagnosis] || 25
  
  return Math.max(0, Math.min(30, Math.round(baseMMSE + (Math.random() - 0.5) * 6)))
}

function generateCDRForDiagnosis(diagnosis: string): number {
  const baseCDR = {
    'Normal': 0,
    'MCI': 0.5,
    'Mild AD': 1,
    'Moderate AD': 2
  }[diagnosis] || 0.5
  
  return Math.max(0, Math.min(3, baseCDR + (Math.random() - 0.5) * 0.5))
}

function generateAPOEStatus(): string {
  const statuses = ['ε2/ε3', 'ε3/ε3', 'ε3/ε4', 'ε4/ε4']
  const weights = [0.1, 0.6, 0.25, 0.05] // Realistic population distribution
  
  const random = Math.random()
  let cumulative = 0
  
  for (let i = 0; i < statuses.length; i++) {
    cumulative += weights[i]
    if (random <= cumulative) {
      return statuses[i]
    }
  }
  
  return 'ε3/ε3'
}

function generateMRIFeatures(diagnosis: string): number[] {
  const features = []
  const featureCount = 512 // ResNet50 features
  
  // Base feature values influenced by diagnosis
  const diagnosisMultiplier = {
    'Normal': 1.0,
    'MCI': 0.9,
    'Mild AD': 0.7,
    'Moderate AD': 0.5
  }[diagnosis] || 1.0
  
  for (let i = 0; i < featureCount; i++) {
    const baseValue = Math.random() * 2 - 1 // -1 to 1
    const adjustedValue = baseValue * diagnosisMultiplier + (Math.random() - 0.5) * 0.2
    features.push(adjustedValue)
  }
  
  return features
}

function generateGenomicFeatures(diagnosis: string): number[] {
  const features = []
  const featureCount = 1000 // Genomic variants
  
  // Risk multiplier based on diagnosis
  const riskMultiplier = {
    'Normal': 0.3,
    'MCI': 0.5,
    'Mild AD': 0.7,
    'Moderate AD': 0.9
  }[diagnosis] || 0.5
  
  for (let i = 0; i < featureCount; i++) {
    // Binary features (0 or 1) with diagnosis-influenced probability
    const probability = 0.1 + riskMultiplier * 0.4
    features.push(Math.random() < probability ? 1 : 0)
  }
  
  return features
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Simulate model predictions
export function simulateModelPredictions(patients: PatientData[]) {
  const results = {
    mriCNN: simulateMRIPredictions(patients),
    genomicXGB: simulateGenomicPredictions(patients),
    ensemble: {} as any
  }
  
  // Ensemble combines both
  results.ensemble = simulateEnsemblePredictions(patients, results.mriCNN, results.genomicXGB)
  
  return results
}

function simulateMRIPredictions(patients: PatientData[]) {
  const predictions: { [key: string]: { predicted: string, confidence: number, probabilities: number[] } } = {}
  
  patients.forEach(patient => {
    const { predicted, confidence, probabilities } = predictFromMRI(patient)
    predictions[patient.id] = { predicted, confidence, probabilities }
  })
  
  return predictions
}

function simulateGenomicPredictions(patients: PatientData[]) {
  const predictions: { [key: string]: { predicted: string, confidence: number, probabilities: number[] } } = {}
  
  patients.forEach(patient => {
    const { predicted, confidence, probabilities } = predictFromGenomic(patient)
    predictions[patient.id] = { predicted, confidence, probabilities }
  })
  
  return predictions
}

function simulateEnsemblePredictions(
  patients: PatientData[], 
  mriPreds: any, 
  genomicPreds: any
) {
  const predictions: { [key: string]: { predicted: string, confidence: number, probabilities: number[] } } = {}
  
  patients.forEach(patient => {
    const mriProbs = mriPreds[patient.id].probabilities
    const genomicProbs = genomicPreds[patient.id].probabilities
    
    // Weighted ensemble (70% MRI, 30% Genomic)
    const ensembleProbs = mriProbs.map((prob: number, i: number) => 
      0.7 * prob + 0.3 * genomicProbs[i]
    )
    
    const maxIndex = ensembleProbs.indexOf(Math.max(...ensembleProbs))
    const classes = ['Normal', 'MCI', 'Mild AD', 'Moderate AD']
    
    predictions[patient.id] = {
      predicted: classes[maxIndex],
      confidence: Math.max(...ensembleProbs),
      probabilities: ensembleProbs
    }
  })
  
  return predictions
}

function predictFromMRI(patient: PatientData): { predicted: string, confidence: number, probabilities: number[] } {
  const classes = ['Normal', 'MCI', 'Mild AD', 'Moderate AD']
  const trueIndex = classes.indexOf(patient.diagnosis)
  
  // Simulate MRI CNN accuracy of ~75.47%
  const accuracy = 0.7547
  const isCorrect = Math.random() < accuracy
  
  if (isCorrect) {
    // Correct prediction
    const probabilities = [0.1, 0.1, 0.1, 0.1]
    probabilities[trueIndex] = 0.7 + Math.random() * 0.2
    
    // Normalize
    const sum = probabilities.reduce((a: number, b: number) => a + b, 0)
    const normalized = probabilities.map((p: number) => p / sum)
    
    return {
      predicted: patient.diagnosis,
      confidence: normalized[trueIndex],
      probabilities: normalized
    }
  } else {
    // Incorrect prediction - bias toward adjacent classes
    const probabilities = [0.15, 0.15, 0.15, 0.15]
    
    // Higher probability for adjacent classes
    if (trueIndex > 0) probabilities[trueIndex - 1] += 0.2
    if (trueIndex < 3) probabilities[trueIndex + 1] += 0.2
    
    const maxIndex = probabilities.indexOf(Math.max(...probabilities))
    
    return {
      predicted: classes[maxIndex],
      confidence: probabilities[maxIndex],
      probabilities
    }
  }
}

function predictFromGenomic(patient: PatientData): { predicted: string, confidence: number, probabilities: number[] } {
  const classes = ['Normal', 'MCI', 'Mild AD', 'Moderate AD']
  
  // Genomic model has different performance characteristics
  // Simulate based on APOE status and other genetic factors
  const apoeRisk = patient.apoe.includes('ε4') ? 0.8 : 0.2
  const ageRisk = (patient.age - 50) / 40 // 0 to 1 scale
  
  const riskScore = (apoeRisk + ageRisk) / 2
  
  let probabilities: number[]
  
  if (riskScore < 0.3) {
    probabilities = [0.7, 0.2, 0.08, 0.02]
  } else if (riskScore < 0.6) {
    probabilities = [0.3, 0.4, 0.25, 0.05]
  } else if (riskScore < 0.8) {
    probabilities = [0.1, 0.2, 0.5, 0.2]
  } else {
    probabilities = [0.05, 0.1, 0.35, 0.5]
  }
  
  const maxIndex = probabilities.indexOf(Math.max(...probabilities))
  
  return {
    predicted: classes[maxIndex],
    confidence: probabilities[maxIndex],
    probabilities
  }
}

// Calculate performance metrics
export function calculatePerformanceMetrics(
  patients: PatientData[], 
  predictions: { [key: string]: { predicted: string, confidence: number } }
) {
  const classes = ['Normal', 'MCI', 'Mild AD', 'Moderate AD']
  const confusionMatrix = Array(4).fill(0).map(() => Array(4).fill(0))
  
  // Build confusion matrix
  patients.forEach(patient => {
    const trueIndex = classes.indexOf(patient.diagnosis)
    const predIndex = classes.indexOf(predictions[patient.id].predicted)
    confusionMatrix[trueIndex][predIndex]++
  })
  
  // Calculate metrics
  const metrics = classes.map((className, i) => {
    const tp = confusionMatrix[i][i]
    const fp = confusionMatrix.reduce((sum, row, j) => sum + (j !== i ? row[i] : 0), 0)
    const fn = confusionMatrix[i].reduce((sum, val, j) => sum + (j !== i ? val : 0), 0)
    const tn = patients.length - tp - fp - fn
    
    const precision = tp / (tp + fp) || 0
    const recall = tp / (tp + fn) || 0
    const f1Score = 2 * (precision * recall) / (precision + recall) || 0
    const support = confusionMatrix[i].reduce((sum, val) => sum + val, 0)
    
    return {
      className,
      precision,
      recall,
      f1Score,
      support
    }
  })
  
  const accuracy = confusionMatrix.reduce((sum, row, i) => sum + row[i], 0) / patients.length
  
  const macroAvg = {
    precision: metrics.reduce((sum, m) => sum + m.precision, 0) / metrics.length,
    recall: metrics.reduce((sum, m) => sum + m.recall, 0) / metrics.length,
    f1Score: metrics.reduce((sum, m) => sum + m.f1Score, 0) / metrics.length
  }
  
  const totalSupport = metrics.reduce((sum, m) => sum + m.support, 0)
  const weightedAvg = {
    precision: metrics.reduce((sum, m) => sum + m.precision * m.support, 0) / totalSupport,
    recall: metrics.reduce((sum, m) => sum + m.recall * m.support, 0) / totalSupport,
    f1Score: metrics.reduce((sum, m) => sum + m.f1Score * m.support, 0) / totalSupport
  }
  
  return {
    metrics,
    accuracy,
    macroAvg,
    weightedAvg,
    confusionMatrix
  }
}

// Generate training history
export function generateTrainingHistory() {
  const epochs = [1, 2, 3, 4, 5, 6, 7, 8]
  
  // Simulate realistic training progression
  const trainLoss = [1.386, 0.956, 0.743, 0.621, 0.567, 0.534, 0.518, 0.512]
  const valLoss = [1.298, 0.892, 0.756, 0.689, 0.651, 0.634, 0.628, 0.635]
  
  const trainAcc = [35.2, 58.7, 68.4, 73.1, 75.8, 77.2, 77.9, 78.1]
  const valAcc = [38.1, 61.3, 70.2, 73.8, 74.9, 75.3, 75.47, 75.1]
  
  return {
    epochs,
    trainLoss,
    valLoss,
    trainAcc,
    valAcc
  }
}

// Generate SHAP-like feature importance
export function generateSHAPValues(patient: PatientData) {
  const features = [
    {
      name: 'APOE ε4 Status',
      value: patient.apoe.includes('ε4') ? 0.234 : -0.156,
      impact: patient.apoe.includes('ε4') ? 'risk' : 'protective',
      description: patient.apoe.includes('ε4') ? 'APOE ε4 allele present' : 'No APOE ε4 alleles'
    },
    {
      name: 'Age Factor',
      value: (patient.age - 65) * 0.01,
      impact: patient.age > 70 ? 'risk' : 'protective',
      description: `Age: ${patient.age} years`
    },
    {
      name: 'MMSE Score',
      value: (30 - patient.mmse) * 0.02,
      impact: patient.mmse < 26 ? 'risk' : 'protective',
      description: `MMSE: ${patient.mmse}/30`
    },
    {
      name: 'CDR Score',
      value: patient.cdr * 0.15,
      impact: patient.cdr > 0 ? 'risk' : 'protective',
      description: `CDR: ${patient.cdr}`
    },
    {
      name: 'Gender Factor',
      value: patient.gender === 'F' ? 0.05 : -0.03,
      impact: patient.gender === 'F' ? 'risk' : 'protective',
      description: `Gender: ${patient.gender}`
    }
  ]
  
  return features.sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
}