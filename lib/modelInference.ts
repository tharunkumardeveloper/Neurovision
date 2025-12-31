// Model inference service for processing uploaded MRI images
import { gradCAMSamples, shapData } from './modelResults'

export interface MRIInferenceResult {
  prediction: {
    class: 'Normal' | 'MCI' | 'Mild AD' | 'Moderate AD'
    confidence: number
    probabilities: {
      Normal: number
      MCI: number
      'Mild AD': number
      'Moderate AD': number
    }
  }
  gradCAM: {
    title: string
    confidence: number
    originalImage?: string // Base64 encoded original image
    heatmapData?: number[][] // Optional 2D heatmap data
    regions: Array<{
      name: string
      status: string
      attention: number
      color: string
    }>
  }
  shap: {
    name: string
    features: Array<{
      name: string
      value: number
      impact: 'risk' | 'protective'
      description: string
    }>
  }
  processingTime: number
}

// Simulate model inference on uploaded MRI image
export async function inferMRIImage(imageFile: File): Promise<MRIInferenceResult> {
  const startTime = Date.now()
  
  // Convert image file to base64 for display
  const originalImageBase64 = await fileToBase64(imageFile)
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))
  
  // Simulate model prediction based on image characteristics
  const prediction = simulateMRIPrediction(imageFile)
  
  // Generate corresponding Grad-CAM and SHAP data
  const gradCAM = generateGradCAMForPrediction(prediction.class, prediction.confidence, originalImageBase64)
  const shap = generateSHAPForPrediction(prediction.class)
  
  const processingTime = Date.now() - startTime
  
  return {
    prediction,
    gradCAM,
    shap,
    processingTime
  }
}

// Helper function to convert file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

function simulateMRIPrediction(imageFile: File) {
  // Simulate CNN prediction based on file characteristics
  const fileName = imageFile.name.toLowerCase()
  const fileSize = imageFile.size
  
  // Use filename hints if available
  let baseClass: 'Normal' | 'MCI' | 'Mild AD' | 'Moderate AD' = 'Normal'
  let baseConfidence = 0.7
  
  if (fileName.includes('mild') || fileName.includes('ad')) {
    baseClass = 'Mild AD'
    baseConfidence = 0.82
  } else if (fileName.includes('moderate')) {
    baseClass = 'Moderate AD'
    baseConfidence = 0.88
  } else if (fileName.includes('mci')) {
    baseClass = 'MCI'
    baseConfidence = 0.76
  } else if (fileName.includes('normal') || fileName.includes('healthy')) {
    baseClass = 'Normal'
    baseConfidence = 0.92
  } else {
    // Random prediction with realistic distribution
    const rand = Math.random()
    if (rand < 0.13) baseClass = 'Normal'
    else if (rand < 0.14) baseClass = 'MCI'
    else if (rand < 0.63) baseClass = 'Mild AD'
    else baseClass = 'Moderate AD'
    
    baseConfidence = 0.65 + Math.random() * 0.25
  }
  
  // Add some randomness
  const confidence = Math.min(0.95, Math.max(0.55, baseConfidence + (Math.random() - 0.5) * 0.2))
  
  // Generate probability distribution
  const probabilities = generateProbabilityDistribution(baseClass, confidence)
  
  return {
    class: baseClass,
    confidence,
    probabilities
  }
}

function generateProbabilityDistribution(
  predictedClass: 'Normal' | 'MCI' | 'Mild AD' | 'Moderate AD',
  confidence: number
) {
  const classes = ['Normal', 'MCI', 'Mild AD', 'Moderate AD'] as const
  const probs = { Normal: 0.1, MCI: 0.1, 'Mild AD': 0.1, 'Moderate AD': 0.1 }
  
  // Set main class probability
  probs[predictedClass] = confidence
  
  // Distribute remaining probability
  const remaining = 1 - confidence
  const otherClasses = classes.filter(c => c !== predictedClass)
  
  otherClasses.forEach((cls, index) => {
    if (index === otherClasses.length - 1) {
      // Last class gets remaining probability
      probs[cls] = remaining - otherClasses.slice(0, -1).reduce((sum, c) => sum + probs[c], 0)
    } else {
      // Distribute based on adjacency (adjacent classes get higher probability)
      const classIndex = classes.indexOf(cls)
      const predictedIndex = classes.indexOf(predictedClass)
      const distance = Math.abs(classIndex - predictedIndex)
      
      if (distance === 1) {
        probs[cls] = remaining * 0.4 * Math.random()
      } else {
        probs[cls] = remaining * 0.2 * Math.random()
      }
    }
  })
  
  // Normalize to ensure sum = 1
  const sum = Object.values(probs).reduce((a, b) => a + b, 0)
  Object.keys(probs).forEach(key => {
    probs[key as keyof typeof probs] /= sum
  })
  
  return probs
}

function generateGradCAMForPrediction(
  predictedClass: 'Normal' | 'MCI' | 'Mild AD' | 'Moderate AD',
  confidence: number,
  originalImage: string
) {
  // Use existing Grad-CAM templates but customize for this prediction
  const templateKey = {
    'Normal': 'normal',
    'MCI': 'mci',
    'Mild AD': 'mild',
    'Moderate AD': 'moderate'
  }[predictedClass] as keyof typeof gradCAMSamples
  
  const template = gradCAMSamples[templateKey]
  
  // Customize the template with slight variations
  const customizedRegions = template.regions.map(region => ({
    ...region,
    attention: Math.max(0.05, Math.min(0.95, region.attention + (Math.random() - 0.5) * 0.1))
  }))
  
  return {
    title: `${predictedClass} Brain (Uploaded Image)`,
    confidence: confidence * 100,
    originalImage, // Include the original image for overlay
    regions: customizedRegions
  }
}

function generateSHAPForPrediction(predictedClass: 'Normal' | 'MCI' | 'Mild AD' | 'Moderate AD') {
  // Use existing SHAP templates but customize
  const templateKey = {
    'Normal': 'patient1',
    'MCI': 'patient2',
    'Mild AD': 'patient3',
    'Moderate AD': 'patient3' // Use Mild AD template for Moderate
  }[predictedClass] as keyof typeof shapData
  
  const template = shapData[templateKey]
  
  // Customize the template with variations
  const customizedFeatures = template.features.map(feature => ({
    ...feature,
    value: feature.value + (Math.random() - 0.5) * 0.1,
    description: feature.description.replace(/Patient #\d+/, 'Uploaded Image'),
    impact: feature.impact as 'risk' | 'protective' // Ensure proper typing
  }))
  
  return {
    name: `Uploaded Image (${predictedClass})`,
    features: customizedFeatures
  }
}

// Validate uploaded file
export function validateMRIFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/dicom']
  if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.dcm')) {
    return {
      valid: false,
      error: 'Please upload a valid MRI image file (JPEG, PNG, or DICOM)'
    }
  }
  
  // Check file size (max 50MB)
  const maxSize = 50 * 1024 * 1024
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must be less than 50MB'
    }
  }
  
  // Check minimum size (at least 1KB)
  if (file.size < 1024) {
    return {
      valid: false,
      error: 'File appears to be too small to be a valid MRI image'
    }
  }
  
  return { valid: true }
}

// Get processing status messages
export function getProcessingStatus(elapsedTime: number): string {
  if (elapsedTime < 1000) {
    return 'Initializing model...'
  } else if (elapsedTime < 2000) {
    return 'Preprocessing image...'
  } else if (elapsedTime < 3000) {
    return 'Running CNN inference...'
  } else if (elapsedTime < 4000) {
    return 'Generating Grad-CAM heatmap...'
  } else {
    return 'Computing SHAP values...'
  }
}