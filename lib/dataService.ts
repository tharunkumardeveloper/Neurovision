// Clinical Decision Support System Data Service
import { 
  generatePatientDataset, 
  simulateModelPredictions, 
  calculatePerformanceMetrics,
  generateTrainingHistory,
  generateSHAPValues,
  PatientData as ProcessedPatientData 
} from './dataProcessor'

// Cache for generated data
let cachedDataset: ProcessedPatientData[] | null = null
let cachedPredictions: any = null
let cachedMetrics: any = null

export interface PatientData {
  id: string
  age: number
  gender: string
  education: number
  stage1Complete: boolean
  stage2Complete: boolean
  riskLevel: 'Low' | 'Moderate' | 'High'
  finalDiagnosis: 'Normal' | 'MCI' | 'Mild AD' | 'Moderate AD'
  confidenceScore: number
}

export interface ClinicalAssessment {
  mmse: number
  cdr: number
  moca?: number
  timestamp: Date
  assessorId: string
}

export interface HandwritingAnalysis {
  taskId: string
  taskName: string
  velocity: number
  pressure: number
  tremor: number
  fluency: number
  pauseTime: number
  strokeWidth: number
  condition: 'AD' | 'HC'
  features: number[]
}

export interface BloodBiomarkers {
  abeta42_40_ratio: number
  ptau181: number
  nfl: number
  apoe4_status: boolean
  testDate: Date
  labId: string
}

export interface MRIAnalysis {
  hippocampalVolume: number
  corticalThickness: number
  ventricularSize: number
  whiteMatterLesions: number
  brainAge: number
  atrophyScore: number
  category: 'NonDemented' | 'VeryMildDemented' | 'MildDemented' | 'ModerateDemented'
  gradcamRegions: string[]
}

export interface CDSSPrediction {
  stage1Score: number
  stage2Score: number
  overallRisk: number
  confidence: number
  diagnosis: 'Normal' | 'MCI' | 'Mild AD' | 'Moderate AD'
  recommendations: string[]
  nextSteps: string[]
  timeToProgression?: number
}

export interface MRIImage {
  id: string
  filename: string
  category: 'NonDemented' | 'VeryMildDemented' | 'MildDemented' | 'ModerateDemented'
  path: string
}

export interface HandwritingImage {
  id: string
  filename: string
  task: string
  condition: 'AD' | 'HC'
  path: string
}

// MRI Dataset categories mapping
export const MRI_CATEGORIES = {
  'NonDemented': { label: 'Normal Cognition', severity: 0, color: 'green' },
  'VeryMildDemented': { label: 'Very Mild Dementia', severity: 1, color: 'yellow' },
  'MildDemented': { label: 'Mild Dementia', severity: 2, color: 'orange' },
  'ModerateDemented': { label: 'Moderate Dementia', severity: 3, color: 'red' }
}

// Handwriting tasks mapping
export const HANDWRITING_TASKS = {
  'TASK_02': 'Connect Dots',
  'TASK_03': 'Vertical Lines',
  'TASK_04': 'Trace Circle',
  'TASK_05': 'Draw Clock',
  'TASK_21': 'Copy Text',
  'TASK_24': 'Write Sentence'
}

// Get random MRI images for demonstration
export function getRandomMRIImages(category?: keyof typeof MRI_CATEGORIES, count: number = 5): MRIImage[] {
  const categories = category ? [category] : Object.keys(MRI_CATEGORIES) as (keyof typeof MRI_CATEGORIES)[]
  const images: MRIImage[] = []
  
  // Real image mappings from your dataset
  const realImages = {
    'NonDemented': [
      { filename: 'nonDem2540.jpg', path: '/datasets/mri/NonDemented/nonDem2540.jpg' },
      { filename: 'nonDem2541.jpg', path: '/datasets/mri/NonDemented/nonDem2541.jpg' },
      { filename: 'nonDem2542.jpg', path: '/datasets/mri/NonDemented/nonDem2542.jpg' },
      { filename: 'nonDem2543.jpg', path: '/datasets/mri/NonDemented/nonDem2543.jpg' }
    ],
    'VeryMildDemented': [
      { filename: 'verymildDem1776.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1776.jpg' },
      { filename: 'verymildDem1777.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1777.jpg' },
      { filename: 'verymildDem1778.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1778.jpg' }
    ],
    'MildDemented': [
      { filename: 'mildDem701.jpg', path: '/datasets/mri/MildDemented/mildDem701.jpg' },
      { filename: 'mildDem702.jpg', path: '/datasets/mri/MildDemented/mildDem702.jpg' },
      { filename: 'mildDem703.jpg', path: '/datasets/mri/MildDemented/mildDem703.jpg' },
      { filename: 'mildDem704.jpg', path: '/datasets/mri/MildDemented/mildDem704.jpg' }
    ],
    'ModerateDemented': [
      { filename: 'moderateDem36.jpg', path: '/datasets/mri/ModerateDemented/moderateDem36.jpg' },
      { filename: 'moderateDem37.jpg', path: '/datasets/mri/ModerateDemented/moderateDem37.jpg' },
      { filename: 'moderateDem38.jpg', path: '/datasets/mri/ModerateDemented/moderateDem38.jpg' },
      { filename: 'moderateDem39.jpg', path: '/datasets/mri/ModerateDemented/moderateDem39.jpg' }
    ]
  }
  
  categories.forEach(cat => {
    const categoryImages = realImages[cat] || []
    const selectedCount = Math.min(count, categoryImages.length)
    
    for (let i = 0; i < selectedCount; i++) {
      const imageData = categoryImages[i]
      if (imageData) {
        images.push({
          id: `${cat}_${i}`,
          filename: imageData.filename,
          category: cat,
          path: imageData.path
        })
      }
    }
    
    // Fill remaining with placeholder if needed
    const remaining = count - selectedCount
    for (let i = 0; i < remaining; i++) {
      const filename = generateFilenameForCategory(cat, selectedCount + i)
      images.push({
        id: `${cat}_${selectedCount + i}`,
        filename,
        category: cat,
        path: `https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=MRI+${cat.slice(0,4)}`
      })
    }
  })
  
  return images.slice(0, count)
}

// Get random handwriting images
export function getRandomHandwritingImages(task?: string, condition?: 'AD' | 'HC', count: number = 5): HandwritingImage[] {
  const tasks = task ? [task] : Object.keys(HANDWRITING_TASKS)
  const conditions = condition ? [condition] : ['AD', 'HC']
  const images: HandwritingImage[] = []
  
  // Real image mappings from your dataset - comprehensive list
  const realImages: Record<string, Record<'AD' | 'HC', Array<{ filename: string; path: string }>>> = {
    'TASK_02': {
      'AD': [
        { filename: 'T02_AD_001.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_001.png' },
        { filename: 'T02_AD_002.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_002.png' },
        { filename: 'T02_AD_003.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_003.png' },
        { filename: 'T02_AD_004.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_004.png' },
        { filename: 'T02_AD_005.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_005.png' },
        { filename: 'T02_AD_006.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_006.png' },
        { filename: 'T02_AD_007.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_007.png' },
        { filename: 'T02_AD_008.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_008.png' },
        { filename: 'T02_AD_009.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_009.png' },
        { filename: 'T02_AD_010.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_010.png' },
        { filename: 'T02_AD_011.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_011.png' },
        { filename: 'T02_AD_012.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_012.png' },
        { filename: 'T02_AD_013.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_013.png' },
        { filename: 'T02_AD_014.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_014.png' },
        { filename: 'T02_AD_015.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_015.png' },
        { filename: 'T02_AD_016.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_016.png' },
        { filename: 'T02_AD_017.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_017.png' },
        { filename: 'T02_AD_018.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_018.png' },
        { filename: 'T02_AD_019.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_019.png' },
        { filename: 'T02_AD_020.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_020.png' },
        { filename: 'T02_AD_021.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_021.png' },
        { filename: 'T02_AD_022.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_022.png' },
        { filename: 'T02_AD_023.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_023.png' },
        { filename: 'T02_AD_024.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_024.png' },
        { filename: 'T02_AD_025.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_025.png' },
        { filename: 'T02_AD_026.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_026.png' },
        { filename: 'T02_AD_027.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_027.png' },
        { filename: 'T02_AD_028.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_028.png' },
        { filename: 'T02_AD_029.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_029.png' },
        { filename: 'T02_AD_030.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_030.png' },
        { filename: 'T02_AD_031.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_031.png' },
        { filename: 'T02_AD_032.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_032.png' },
        { filename: 'T02_AD_033.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_033.png' },
        { filename: 'T02_AD_034.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_034.png' },
        { filename: 'T02_AD_035.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_035.png' },
        { filename: 'T02_AD_036.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_036.png' }
      ],
      'HC': [
        { filename: 'T02_HC_001.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_001.png' },
        { filename: 'T02_HC_002.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_002.png' },
        { filename: 'T02_HC_003.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_003.png' },
        { filename: 'T02_HC_004.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_004.png' },
        { filename: 'T02_HC_005.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_005.png' },
        { filename: 'T02_HC_006.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_006.png' },
        { filename: 'T02_HC_007.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_007.png' },
        { filename: 'T02_HC_008.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_008.png' },
        { filename: 'T02_HC_009.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_009.png' },
        { filename: 'T02_HC_010.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_010.png' },
        { filename: 'T02_HC_011.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_011.png' },
        { filename: 'T02_HC_012.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_012.png' },
        { filename: 'T02_HC_013.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_013.png' },
        { filename: 'T02_HC_014.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_014.png' },
        { filename: 'T02_HC_015.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_015.png' },
        { filename: 'T02_HC_016.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_016.png' },
        { filename: 'T02_HC_019.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_019.png' },
        { filename: 'T02_HC_020.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_020.png' },
        { filename: 'T02_HC_021.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_021.png' },
        { filename: 'T02_HC_022.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_022.png' },
        { filename: 'T02_HC_023.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_023.png' },
        { filename: 'T02_HC_024.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_024.png' },
        { filename: 'T02_HC_025.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_025.png' },
        { filename: 'T02_HC_026.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_026.png' },
        { filename: 'T02_HC_027.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_027.png' },
        { filename: 'T02_HC_028.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_028.png' },
        { filename: 'T02_HC_029.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_029.png' },
        { filename: 'T02_HC_030.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_030.png' },
        { filename: 'T02_HC_031.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_031.png' },
        { filename: 'T02_HC_032.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_032.png' },
        { filename: 'T02_HC_033.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_033.png' },
        { filename: 'T02_HC_034.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_034.png' },
        { filename: 'T02_HC_035.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_035.png' },
        { filename: 'T02_HC_036.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_036.png' },
        { filename: 'T02_HC_037.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_037.png' },
        { filename: 'T02_HC_038.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_038.png' }
      ]
    },
    'TASK_03': {
      'AD': Array.from({length: 36}, (_, i) => ({
        filename: `T03_AD_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_03/AD/T03_AD_${String(i + 1).padStart(3, '0')}.png`
      })),
      'HC': Array.from({length: 38}, (_, i) => ({
        filename: `T03_HC_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_03/HC/T03_HC_${String(i + 1).padStart(3, '0')}.png`
      }))
    },
    'TASK_04': {
      'AD': Array.from({length: 36}, (_, i) => ({
        filename: `T04_AD_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_04/AD/T04_AD_${String(i + 1).padStart(3, '0')}.png`
      })),
      'HC': Array.from({length: 38}, (_, i) => ({
        filename: `T04_HC_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_04/HC/T04_HC_${String(i + 1).padStart(3, '0')}.png`
      }))
    },
    'TASK_05': {
      'AD': Array.from({length: 36}, (_, i) => ({
        filename: `T05_AD_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_05/AD/T05_AD_${String(i + 1).padStart(3, '0')}.png`
      })),
      'HC': Array.from({length: 38}, (_, i) => ({
        filename: `T05_HC_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_05/HC/T05_HC_${String(i + 1).padStart(3, '0')}.png`
      }))
    },
    'TASK_21': {
      'AD': Array.from({length: 36}, (_, i) => ({
        filename: `T21_AD_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_21/AD/T21_AD_${String(i + 1).padStart(3, '0')}.png`
      })),
      'HC': Array.from({length: 38}, (_, i) => ({
        filename: `T21_HC_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_21/HC/T21_HC_${String(i + 1).padStart(3, '0')}.png`
      }))
    },
    'TASK_24': {
      'AD': Array.from({length: 36}, (_, i) => ({
        filename: `T24_AD_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_24/AD/T24_AD_${String(i + 1).padStart(3, '0')}.png`
      })),
      'HC': Array.from({length: 38}, (_, i) => ({
        filename: `T24_HC_${String(i + 1).padStart(3, '0')}.png`,
        path: `/datasets/handwriting/TASK_24/HC/T24_HC_${String(i + 1).padStart(3, '0')}.png`
      }))
    }
  }
  
  tasks.forEach(taskId => {
    conditions.forEach(cond => {
      const taskImages = realImages[taskId]
      const conditionImages = taskImages?.[cond as 'AD' | 'HC'] || []
      
      // Shuffle the available images
      const shuffledImages = [...conditionImages].sort(() => Math.random() - 0.5)
      const selectedCount = Math.min(count, shuffledImages.length)
      
      for (let i = 0; i < selectedCount; i++) {
        const imageData = shuffledImages[i]
        if (imageData) {
          images.push({
            id: `${taskId}_${cond}_${i}`,
            filename: imageData.filename,
            task: taskId,
            condition: cond as 'AD' | 'HC',
            path: imageData.path
          })
        }
      }
    })
  })
  
  // Shuffle the final result and return requested count
  return images.sort(() => Math.random() - 0.5).slice(0, count)
}

// CDSS Stage 1: Primary Screening (Low-cost)
export async function performStage1Assessment(
  clinicalData: { age: number; gender: string; education: number; mmse: number; cdr: number },
  handwritingData: HandwritingAnalysis[]
): Promise<{ riskScore: number; riskLevel: 'Low' | 'Moderate' | 'High'; proceedToStage2: boolean }> {
  
  const mmseScore = Math.max(0, Math.min(30, clinicalData.mmse))
  const cdrScore = clinicalData.cdr
  const ageRisk = clinicalData.age > 65 ? (clinicalData.age - 65) * 0.02 : 0
  
  const handwritingRisk = handwritingData.reduce((acc, hw) => {
    const motorImpairment = (1 - hw.velocity) * 0.3 + hw.tremor * 0.4 + (1 - hw.fluency) * 0.3
    return acc + motorImpairment
  }, 0) / handwritingData.length
  
  const clinicalRisk = (30 - mmseScore) / 30 * 0.4 + cdrScore * 0.3 + ageRisk * 0.3
  const stage1Score = (clinicalRisk * 0.6 + handwritingRisk * 0.4) * 100
  
  let riskLevel: 'Low' | 'Moderate' | 'High'
  let proceedToStage2 = false
  
  if (stage1Score < 30) {
    riskLevel = 'Low'
  } else if (stage1Score < 60) {
    riskLevel = 'Moderate'
    proceedToStage2 = true
  } else {
    riskLevel = 'High'
    proceedToStage2 = true
  }
  
  return { riskScore: stage1Score, riskLevel, proceedToStage2 }
}

// CDSS Stage 2: Biomarker & Imaging Augmentation
export async function performStage2Assessment(
  stage1Score: number,
  biomarkers: BloodBiomarkers,
  mriAnalysis: MRIAnalysis
): Promise<CDSSPrediction> {
  
  const biomarkerRisk = calculateBiomarkerRisk(biomarkers)
  const mriRisk = calculateMRIRisk(mriAnalysis)
  
  const stage2Score = (stage1Score * 0.3 + biomarkerRisk * 0.35 + mriRisk * 0.35)
  const overallRisk = Math.min(100, stage2Score)
  
  const confidence = calculateConfidence(stage1Score, biomarkerRisk, mriRisk)
  
  let diagnosis: 'Normal' | 'MCI' | 'Mild AD' | 'Moderate AD'
  if (overallRisk < 25) diagnosis = 'Normal'
  else if (overallRisk < 50) diagnosis = 'MCI'
  else if (overallRisk < 75) diagnosis = 'Mild AD'
  else diagnosis = 'Moderate AD'
  
  const recommendations = generateRecommendations(diagnosis, overallRisk, biomarkers, mriAnalysis)
  const nextSteps = generateNextSteps(diagnosis, overallRisk)
  
  const timeToProgression = diagnosis === 'Normal' ? undefined : 
    diagnosis === 'MCI' ? 3 + Math.random() * 2 : 
    diagnosis === 'Mild AD' ? 1 + Math.random() * 2 : 
    0.5 + Math.random()
  
  return {
    stage1Score,
    stage2Score,
    overallRisk,
    confidence,
    diagnosis,
    recommendations,
    nextSteps,
    timeToProgression
  }
}

function calculateBiomarkerRisk(biomarkers: BloodBiomarkers): number {
  let risk = 0
  
  if (biomarkers.abeta42_40_ratio < 0.08) risk += 30
  else if (biomarkers.abeta42_40_ratio < 0.10) risk += 15
  
  if (biomarkers.ptau181 > 25) risk += 25
  else if (biomarkers.ptau181 > 20) risk += 12
  
  if (biomarkers.nfl > 20) risk += 20
  else if (biomarkers.nfl > 15) risk += 10
  
  if (biomarkers.apoe4_status) risk += 25
  
  return Math.min(100, risk)
}

function calculateMRIRisk(mriAnalysis: MRIAnalysis): number {
  let risk = 0
  
  risk += (1 - mriAnalysis.hippocampalVolume) * 30
  risk += (1 - mriAnalysis.corticalThickness) * 25
  risk += mriAnalysis.ventricularSize * 25
  risk += mriAnalysis.whiteMatterLesions * 20
  
  return Math.min(100, risk)
}

function calculateConfidence(stage1: number, biomarker: number, mri: number): number {
  const variance = Math.pow(stage1 - biomarker, 2) + Math.pow(stage1 - mri, 2) + Math.pow(biomarker - mri, 2)
  const agreement = Math.max(0, 100 - variance / 100)
  return Math.min(95, 70 + agreement * 0.25)
}

function generateRecommendations(
  diagnosis: string, 
  risk: number, 
  biomarkers: BloodBiomarkers, 
  mri: MRIAnalysis
): string[] {
  const recommendations = []
  
  if (diagnosis === 'Normal') {
    recommendations.push('Continue regular health monitoring')
    recommendations.push('Maintain cognitive activities and physical exercise')
    if (biomarkers.apoe4_status) {
      recommendations.push('Consider lifestyle modifications due to genetic risk')
    }
  } else if (diagnosis === 'MCI') {
    recommendations.push('Neurologist consultation recommended')
    recommendations.push('Cognitive training and rehabilitation programs')
    recommendations.push('Monitor progression with 6-month follow-ups')
    recommendations.push('Consider clinical trial participation')
  } else {
    recommendations.push('Immediate specialist referral required')
    recommendations.push('Comprehensive neuropsychological assessment')
    recommendations.push('Discuss treatment options with neurologist')
    recommendations.push('Family counseling and support services')
  }
  
  return recommendations
}

function generateNextSteps(diagnosis: string, risk: number): string[] {
  const steps = []
  
  if (diagnosis === 'Normal' && risk < 20) {
    steps.push('Annual screening recommended')
    steps.push('Maintain healthy lifestyle')
  } else if (diagnosis === 'MCI' || risk > 50) {
    steps.push('Schedule neurologist appointment within 2 weeks')
    steps.push('Complete comprehensive cognitive testing')
    steps.push('Consider additional biomarker testing')
  } else {
    steps.push('Urgent neurologist referral')
    steps.push('Initiate care coordination')
    steps.push('Family meeting to discuss care plan')
  }
  
  return steps
}

// Helper functions
function getImageCountForCategory(category: keyof typeof MRI_CATEGORIES): number {
  const counts = {
    'NonDemented': 60,
    'VeryMildDemented': 60,
    'MildDemented': 60,
    'ModerateDemented': 60
  }
  return counts[category] || 60
}

function generateFilenameForCategory(category: keyof typeof MRI_CATEGORIES, index: number): string {
  const prefixes = {
    'NonDemented': 'nonDem',
    'VeryMildDemented': 'verymildDem',
    'MildDemented': 'mildDem',
    'ModerateDemented': 'moderateDem'
  }
  
  if (index < 10) {
    return `${prefixes[category]}${2540 + index}.jpg`
  } else {
    const uuid = generateUUID()
    return `${uuid}.jpg`
  }
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Get biomarker data (simulated based on plasma dataset)
export function getBiomarkerData(patientId: string) {
  const baseValues = {
    abeta42_40_ratio: 0.07 + Math.random() * 0.04,
    ptau181: 15 + Math.random() * 20,
    nfl: 10 + Math.random() * 20,
    apoe4_status: Math.random() > 0.7
  }
  
  return baseValues
}

// Analyze handwriting features (simulated)
export function analyzeHandwritingFeatures(imagePath: string) {
  const isAD = imagePath.includes('/AD/')
  
  return {
    velocity: isAD ? 0.4 + Math.random() * 0.3 : 0.7 + Math.random() * 0.3,
    pressure: isAD ? 0.3 + Math.random() * 0.4 : 0.6 + Math.random() * 0.4,
    tremor: isAD ? 0.3 + Math.random() * 0.5 : Math.random() * 0.3,
    fluency: isAD ? 0.3 + Math.random() * 0.4 : 0.7 + Math.random() * 0.3
  }
}

// Analyze MRI features (simulated)
export function analyzeMRIFeatures(imagePath: string) {
  const category = imagePath.split('/').slice(-2)[0] as keyof typeof MRI_CATEGORIES
  const severity = MRI_CATEGORIES[category]?.severity || 0
  
  return {
    hippocampalVolume: Math.max(0.5, 1 - (severity * 0.15) + (Math.random() * 0.1 - 0.05)),
    corticalThickness: Math.max(0.4, 1 - (severity * 0.12) + (Math.random() * 0.1 - 0.05)),
    ventricularSize: Math.min(1, severity * 0.2 + (Math.random() * 0.1)),
    whiteMatterLesions: Math.min(1, severity * 0.15 + (Math.random() * 0.1))
  }
}

// Load clinical data from CSV
export async function loadClinicalData(): Promise<PatientData[]> {
  try {
    return [
      { 
        id: '1', 
        age: 72, 
        gender: 'M', 
        education: 12,
        stage1Complete: true,
        stage2Complete: false,
        riskLevel: 'Moderate',
        finalDiagnosis: 'MCI',
        confidenceScore: 75
      },
      { 
        id: '2', 
        age: 68, 
        gender: 'F', 
        education: 16,
        stage1Complete: true,
        stage2Complete: true,
        riskLevel: 'Low',
        finalDiagnosis: 'Normal',
        confidenceScore: 92
      },
      { 
        id: '3', 
        age: 75, 
        gender: 'M', 
        education: 10,
        stage1Complete: true,
        stage2Complete: true,
        riskLevel: 'High',
        finalDiagnosis: 'Mild AD',
        confidenceScore: 88
      }
    ]
  } catch (error) {
    console.error('Error loading clinical data:', error)
    return []
  }
}

// ===== NEW DATA PROCESSING FUNCTIONS =====

// Generate or retrieve cached dataset
export function getProcessedDataset(): ProcessedPatientData[] {
  if (!cachedDataset) {
    cachedDataset = generatePatientDataset(1270)
  }
  return cachedDataset
}

// Generate or retrieve cached predictions
export function getModelPredictions() {
  if (!cachedPredictions) {
    const dataset = getProcessedDataset()
    cachedPredictions = simulateModelPredictions(dataset)
  }
  return cachedPredictions
}

// Generate or retrieve cached metrics
export function getModelResults() {
  if (!cachedMetrics) {
    const dataset = getProcessedDataset()
    const predictions = getModelPredictions()
    
    // Calculate metrics for each model
    const mriMetrics = calculatePerformanceMetrics(dataset, predictions.mriCNN)
    const genomicMetrics = calculatePerformanceMetrics(dataset, predictions.genomicXGB)
    const ensembleMetrics = calculatePerformanceMetrics(dataset, predictions.ensemble)
    
    cachedMetrics = {
      mriCNN: {
        name: 'MRI CNN (ResNet50)',
        accuracy: mriMetrics.accuracy * 100,
        macroF1: mriMetrics.macroAvg.f1Score * 100,
        weightedF1: mriMetrics.weightedAvg.f1Score * 100,
        trainingTime: 21,
        confusionMatrix: mriMetrics.confusionMatrix,
        classificationReport: {
          metrics: mriMetrics.metrics,
          overallAccuracy: mriMetrics.accuracy,
          macroAvg: mriMetrics.macroAvg,
          weightedAvg: mriMetrics.weightedAvg
        }
      },
      genomicXGB: {
        name: 'Genomic XGBoost',
        accuracy: genomicMetrics.accuracy * 100,
        macroF1: genomicMetrics.macroAvg.f1Score * 100,
        weightedF1: genomicMetrics.weightedAvg.f1Score * 100,
        trainingTime: 8,
        confusionMatrix: genomicMetrics.confusionMatrix,
        classificationReport: {
          metrics: genomicMetrics.metrics,
          overallAccuracy: genomicMetrics.accuracy,
          macroAvg: genomicMetrics.macroAvg,
          weightedAvg: genomicMetrics.weightedAvg
        }
      },
      ensemble: {
        name: 'Ensemble Meta-Learner',
        accuracy: ensembleMetrics.accuracy * 100,
        macroF1: ensembleMetrics.macroAvg.f1Score * 100,
        weightedF1: ensembleMetrics.weightedAvg.f1Score * 100,
        trainingTime: 29,
        confusionMatrix: ensembleMetrics.confusionMatrix,
        classificationReport: {
          metrics: ensembleMetrics.metrics,
          overallAccuracy: ensembleMetrics.accuracy,
          macroAvg: ensembleMetrics.macroAvg,
          weightedAvg: ensembleMetrics.weightedAvg
        }
      }
    }
  }
  return cachedMetrics
}

// Get training history
export function getModelTrainingHistory() {
  return generateTrainingHistory()
}

// Get SHAP values for a specific patient
export function getPatientSHAPValues(patientId: string) {
  const dataset = getProcessedDataset()
  const patient = dataset.find(p => p.id === patientId)
  
  if (!patient) {
    throw new Error(`Patient ${patientId} not found`)
  }
  
  return generateSHAPValues(patient)
}

// Get sample patients for different diagnoses
export function getSamplePatients() {
  const dataset = getProcessedDataset()
  const samples = {
    normal: dataset.find(p => p.diagnosis === 'Normal'),
    mci: dataset.find(p => p.diagnosis === 'MCI'),
    mild: dataset.find(p => p.diagnosis === 'Mild AD'),
    moderate: dataset.find(p => p.diagnosis === 'Moderate AD')
  }
  
  return samples
}

// Get dataset statistics
export function getDatasetStats() {
  const dataset = getProcessedDataset()
  
  const stats = {
    totalPatients: dataset.length,
    classDistribution: {
      'Normal': dataset.filter(p => p.diagnosis === 'Normal').length,
      'MCI': dataset.filter(p => p.diagnosis === 'MCI').length,
      'Mild AD': dataset.filter(p => p.diagnosis === 'Mild AD').length,
      'Moderate AD': dataset.filter(p => p.diagnosis === 'Moderate AD').length
    },
    demographics: {
      averageAge: dataset.reduce((sum, p) => sum + p.age, 0) / dataset.length,
      genderDistribution: {
        M: dataset.filter(p => p.gender === 'M').length,
        F: dataset.filter(p => p.gender === 'F').length
      },
      averageMMSE: dataset.reduce((sum, p) => sum + p.mmse, 0) / dataset.length,
      apoeDistribution: dataset.reduce((acc, p) => {
        acc[p.apoe] = (acc[p.apoe] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }
  }
  
  return stats
}

// Generate Grad-CAM like attention data
export function getGradCAMData() {
  const samples = getSamplePatients()
  
  return {
    normal: {
      title: `Normal Brain (${samples.normal?.id})`,
      confidence: 92.3,
      regions: [
        { name: 'Hippocampus', status: 'Normal', attention: 0.23, color: 'green' },
        { name: 'Temporal Lobe', status: 'Intact', attention: 0.18, color: 'green' },
        { name: 'Parietal Cortex', status: 'Normal', attention: 0.15, color: 'green' },
        { name: 'Frontal Cortex', status: 'Healthy', attention: 0.12, color: 'green' }
      ]
    },
    mci: {
      title: `MCI Brain (${samples.mci?.id})`,
      confidence: 76.4,
      regions: [
        { name: 'Hippocampus', status: 'Mild Atrophy', attention: 0.45, color: 'yellow' },
        { name: 'Temporal Lobe', status: 'Early Changes', attention: 0.38, color: 'yellow' },
        { name: 'Parietal Cortex', status: 'Subtle Changes', attention: 0.28, color: 'yellow' },
        { name: 'Frontal Cortex', status: 'Normal', attention: 0.15, color: 'green' }
      ]
    },
    mild: {
      title: `Mild AD Brain (${samples.mild?.id})`,
      confidence: 82.1,
      regions: [
        { name: 'Hippocampus', status: 'Moderate Atrophy', attention: 0.67, color: 'orange' },
        { name: 'Temporal Lobe', status: 'Atrophy Present', attention: 0.58, color: 'orange' },
        { name: 'Parietal Cortex', status: 'Thinning', attention: 0.42, color: 'orange' },
        { name: 'Frontal Cortex', status: 'Early Changes', attention: 0.25, color: 'yellow' }
      ]
    },
    moderate: {
      title: `Moderate AD Brain (${samples.moderate?.id})`,
      confidence: 88.7,
      regions: [
        { name: 'Hippocampus', status: 'Severe Atrophy', attention: 0.89, color: 'red' },
        { name: 'Temporal Lobe', status: 'Significant Loss', attention: 0.78, color: 'red' },
        { name: 'Parietal Cortex', status: 'Marked Thinning', attention: 0.65, color: 'red' },
        { name: 'Frontal Cortex', status: 'Atrophy Present', attention: 0.45, color: 'orange' }
      ]
    }
  }
}

// Get SHAP data for different patients
export function getSHAPData() {
  const samples = getSamplePatients()
  
  return {
    patient1: {
      name: `${samples.normal?.id} (Normal)`,
      features: generateSHAPValues(samples.normal!)
    },
    patient2: {
      name: `${samples.mci?.id} (MCI)`,
      features: generateSHAPValues(samples.mci!)
    },
    patient3: {
      name: `${samples.mild?.id} (Mild AD)`,
      features: generateSHAPValues(samples.mild!)
    }
  }
}

// Reset cache (useful for development)
export function resetDataCache() {
  cachedDataset = null
  cachedPredictions = null
  cachedMetrics = null
}