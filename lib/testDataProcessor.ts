// Test script to verify data processing works correctly
import { getModelResults, getDatasetStats, getGradCAMData, getSHAPData } from './dataService'

export function testDataProcessing() {
  console.log('Testing data processing...')
  
  try {
    // Test model results
    const modelResults = getModelResults()
    console.log('✅ Model results generated:', {
      mriAccuracy: modelResults.mriCNN.accuracy.toFixed(2),
      genomicAccuracy: modelResults.genomicXGB.accuracy.toFixed(2),
      ensembleAccuracy: modelResults.ensemble.accuracy.toFixed(2)
    })
    
    // Test dataset stats
    const stats = getDatasetStats()
    console.log('✅ Dataset stats generated:', {
      totalPatients: stats.totalPatients,
      classDistribution: stats.classDistribution
    })
    
    // Test Grad-CAM data
    const gradCAM = getGradCAMData()
    console.log('✅ Grad-CAM data generated:', Object.keys(gradCAM))
    
    // Test SHAP data
    const shap = getSHAPData()
    console.log('✅ SHAP data generated:', Object.keys(shap))
    
    console.log('🎉 All data processing tests passed!')
    return true
    
  } catch (error) {
    console.error('❌ Data processing test failed:', error)
    return false
  }
}

// Run test if this file is executed directly
if (typeof window === 'undefined') {
  testDataProcessing()
}