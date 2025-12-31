// Sample MRI images from the research dataset for user reference
export const sampleMRIImages = {
  normal: [
    {
      id: 'normal_001',
      filename: 'nonDem2540.jpg',
      path: '/datasets/mri/NonDemented/nonDem2540.jpg',
      fallback: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+1',
      description: 'Healthy brain with normal hippocampal volume and cortical thickness',
      expectedResult: 'Normal (92.3% confidence)'
    },
    {
      id: 'normal_002', 
      filename: 'nonDem2541.jpg',
      path: '/datasets/mri/NonDemented/nonDem2541.jpg',
      fallback: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+2',
      description: 'Normal cognitive function with intact brain structures',
      expectedResult: 'Normal (89.7% confidence)'
    },
    {
      id: 'normal_003',
      filename: 'nonDem2542.jpg', 
      path: '/datasets/mri/NonDemented/nonDem2542.jpg',
      fallback: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+3',
      description: 'Healthy elderly brain with age-appropriate changes',
      expectedResult: 'Normal (91.2% confidence)'
    },
    {
      id: 'normal_004',
      filename: 'nonDem2543.jpg',
      path: '/datasets/mri/NonDemented/nonDem2543.jpg', 
      fallback: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+4',
      description: 'Normal brain structure with preserved cognitive function',
      expectedResult: 'Normal (88.9% confidence)'
    },
    {
      id: 'normal_005',
      filename: 'nonDem2544.jpg',
      path: '/datasets/mri/NonDemented/nonDem2544.jpg',
      fallback: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+5',
      description: 'Healthy adult brain with optimal structural integrity',
      expectedResult: 'Normal (93.1% confidence)'
    },
    {
      id: 'normal_006',
      filename: '00a98422-8b63-47e6-8b8f-9119984d87ee.jpg',
      path: '/datasets/mri/NonDemented/00a98422-8b63-47e6-8b8f-9119984d87ee.jpg',
      fallback: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+6',
      description: 'Normal brain scan showing healthy tissue distribution',
      expectedResult: 'Normal (90.5% confidence)'
    },
    {
      id: 'normal_007',
      filename: '00b6998c-266a-4880-b6af-30ca013bdd8c.jpg',
      path: '/datasets/mri/NonDemented/00b6998c-266a-4880-b6af-30ca013bdd8c.jpg',
      fallback: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+7',
      description: 'Healthy brain with normal ventricular size',
      expectedResult: 'Normal (87.8% confidence)'
    },
    {
      id: 'normal_008',
      filename: '0a42c1ce-7be9-4fc1-886e-2a75dfa03cc8.jpg',
      path: '/datasets/mri/NonDemented/0a42c1ce-7be9-4fc1-886e-2a75dfa03cc8.jpg',
      fallback: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+8',
      description: 'Normal cognitive baseline with preserved brain volume',
      expectedResult: 'Normal (91.7% confidence)'
    }
  ],
  mci: [
    {
      id: 'mci_001',
      filename: 'verymildDem1776.jpg',
      path: '/datasets/mri/VeryMildDemented/verymildDem1776.jpg',
      fallback: 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+1',
      description: 'Early cognitive decline with subtle hippocampal changes',
      expectedResult: 'MCI (76.4% confidence)'
    },
    {
      id: 'mci_002',
      filename: 'verymildDem1777.jpg', 
      path: '/datasets/mri/VeryMildDemented/verymildDem1777.jpg',
      fallback: 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+2',
      description: 'Mild cognitive impairment with early temporal lobe changes',
      expectedResult: 'MCI (78.1% confidence)'
    },
    {
      id: 'mci_003',
      filename: 'verymildDem1778.jpg',
      path: '/datasets/mri/VeryMildDemented/verymildDem1778.jpg',
      fallback: 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+3',
      description: 'Very mild dementia with beginning atrophy patterns',
      expectedResult: 'MCI (74.8% confidence)'
    },
    {
      id: 'mci_004',
      filename: 'verymildDem1779.jpg',
      path: '/datasets/mri/VeryMildDemented/verymildDem1779.jpg',
      fallback: 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+4',
      description: 'Early stage MCI with minimal structural changes',
      expectedResult: 'MCI (72.3% confidence)'
    },
    {
      id: 'mci_005',
      filename: '000a074f-a3a5-4c70-8c94-d7ed7bbe7018.jpg',
      path: '/datasets/mri/VeryMildDemented/000a074f-a3a5-4c70-8c94-d7ed7bbe7018.jpg',
      fallback: 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+5',
      description: 'Very mild cognitive impairment with early hippocampal volume loss',
      expectedResult: 'MCI (79.6% confidence)'
    },
    {
      id: 'mci_006',
      filename: '00b4979d-ac1c-40e3-90b2-422511918fc0.jpg',
      path: '/datasets/mri/VeryMildDemented/00b4979d-ac1c-40e3-90b2-422511918fc0.jpg',
      fallback: 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+6',
      description: 'MCI with subtle cortical thinning in memory regions',
      expectedResult: 'MCI (75.9% confidence)'
    }
  ],
  mild: [
    {
      id: 'mild_001',
      filename: 'mildDem701.jpg',
      path: '/datasets/mri/MildDemented/mildDem701.jpg',
      fallback: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+1',
      description: 'Mild Alzheimer\'s with moderate hippocampal atrophy',
      expectedResult: 'Mild AD (82.1% confidence)'
    },
    {
      id: 'mild_002',
      filename: 'mildDem702.jpg',
      path: '/datasets/mri/MildDemented/mildDem702.jpg', 
      fallback: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+2',
      description: 'Mild dementia with temporal lobe atrophy present',
      expectedResult: 'Mild AD (79.6% confidence)'
    },
    {
      id: 'mild_003',
      filename: 'mildDem703.jpg',
      path: '/datasets/mri/MildDemented/mildDem703.jpg',
      fallback: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+3', 
      description: 'Mild AD with parietal cortex thinning',
      expectedResult: 'Mild AD (84.3% confidence)'
    },
    {
      id: 'mild_004',
      filename: 'mildDem704.jpg',
      path: '/datasets/mri/MildDemented/mildDem704.jpg',
      fallback: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+4',
      description: 'Mild Alzheimer\'s disease with multiple region involvement',
      expectedResult: 'Mild AD (81.7% confidence)'
    },
    {
      id: 'mild_005',
      filename: 'mildDem705.jpg',
      path: '/datasets/mri/MildDemented/mildDem705.jpg',
      fallback: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+5',
      description: 'Mild AD with noticeable ventricular enlargement',
      expectedResult: 'Mild AD (83.4% confidence)'
    },
    {
      id: 'mild_006',
      filename: '000cdcc4-3e54-4034-a538-203c8047b564.jpg',
      path: '/datasets/mri/MildDemented/000cdcc4-3e54-4034-a538-203c8047b564.jpg',
      fallback: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+6',
      description: 'Mild dementia with progressive hippocampal shrinkage',
      expectedResult: 'Mild AD (80.2% confidence)'
    },
    {
      id: 'mild_007',
      filename: '00a89d56-bb82-429f-95c4-6f1e661629f5.jpg',
      path: '/datasets/mri/MildDemented/00a89d56-bb82-429f-95c4-6f1e661629f5.jpg',
      fallback: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+7',
      description: 'Mild Alzheimer\'s with early frontal lobe changes',
      expectedResult: 'Mild AD (78.9% confidence)'
    },
    {
      id: 'mild_008',
      filename: '0a0d76a0-9c31-4c5e-bc37-9d050a7a4a7a.jpg',
      path: '/datasets/mri/MildDemented/0a0d76a0-9c31-4c5e-bc37-9d050a7a4a7a.jpg',
      fallback: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+8',
      description: 'Mild AD showing characteristic atrophy patterns',
      expectedResult: 'Mild AD (85.1% confidence)'
    }
  ],
  moderate: [
    {
      id: 'moderate_001',
      filename: 'moderateDem36.jpg',
      path: '/datasets/mri/ModerateDemented/moderateDem36.jpg',
      fallback: 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+1',
      description: 'Moderate AD with severe hippocampal atrophy',
      expectedResult: 'Moderate AD (88.7% confidence)'
    },
    {
      id: 'moderate_002', 
      filename: 'moderateDem37.jpg',
      path: '/datasets/mri/ModerateDemented/moderateDem37.jpg',
      fallback: 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+2',
      description: 'Moderate dementia with significant tissue loss',
      expectedResult: 'Moderate AD (91.2% confidence)'
    },
    {
      id: 'moderate_003',
      filename: 'moderateDem38.jpg',
      path: '/datasets/mri/ModerateDemented/moderateDem38.jpg',
      fallback: 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+3',
      description: 'Moderate AD with marked cortical thinning',
      expectedResult: 'Moderate AD (86.9% confidence)'
    },
    {
      id: 'moderate_004',
      filename: 'moderateDem39.jpg', 
      path: '/datasets/mri/ModerateDemented/moderateDem39.jpg',
      fallback: 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+4',
      description: 'Moderate Alzheimer\'s with widespread atrophy',
      expectedResult: 'Moderate AD (89.4% confidence)'
    },
    {
      id: 'moderate_005',
      filename: 'moderateDem40.jpg',
      path: '/datasets/mri/ModerateDemented/moderateDem40.jpg',
      fallback: 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+5',
      description: 'Moderate AD with extensive brain volume loss',
      expectedResult: 'Moderate AD (92.8% confidence)'
    },
    {
      id: 'moderate_006',
      filename: '00a4080b-0cea-436f-9c97-031ee6d3b5f5.jpg',
      path: '/datasets/mri/ModerateDemented/00a4080b-0cea-436f-9c97-031ee6d3b5f5.jpg',
      fallback: 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+6',
      description: 'Moderate dementia with severe temporal lobe atrophy',
      expectedResult: 'Moderate AD (87.3% confidence)'
    },
    {
      id: 'moderate_007',
      filename: '0a0641f9-459e-4aef-bd71-9b6fb20256be.jpg',
      path: '/datasets/mri/ModerateDemented/0a0641f9-459e-4aef-bd71-9b6fb20256be.jpg',
      fallback: 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+7',
      description: 'Moderate Alzheimer\'s with pronounced ventricular enlargement',
      expectedResult: 'Moderate AD (90.6% confidence)'
    },
    {
      id: 'moderate_008',
      filename: '0a2db21e-81d3-461c-a23e-c133096d8f0a.jpg',
      path: '/datasets/mri/ModerateDemented/0a2db21e-81d3-461c-a23e-c133096d8f0a.jpg',
      fallback: 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+8',
      description: 'Advanced moderate AD with multi-region involvement',
      expectedResult: 'Moderate AD (94.1% confidence)'
    }
  ]
}

export const categoryInfo = {
  normal: {
    name: 'Normal Cognition',
    color: 'green',
    description: 'Healthy brain scans with no signs of cognitive decline',
    characteristics: ['Normal hippocampal volume', 'Intact cortical thickness', 'No significant atrophy']
  },
  mci: {
    name: 'Mild Cognitive Impairment (MCI)', 
    color: 'yellow',
    description: 'Early stage cognitive decline with subtle brain changes',
    characteristics: ['Mild hippocampal changes', 'Early temporal lobe alterations', 'Preserved overall structure']
  },
  mild: {
    name: 'Mild Alzheimer\'s Disease',
    color: 'orange', 
    description: 'Mild dementia with moderate brain atrophy patterns',
    characteristics: ['Moderate hippocampal atrophy', 'Temporal lobe involvement', 'Parietal cortex thinning']
  },
  moderate: {
    name: 'Moderate Alzheimer\'s Disease',
    color: 'red',
    description: 'Advanced dementia with severe brain tissue loss', 
    characteristics: ['Severe hippocampal atrophy', 'Significant tissue loss', 'Widespread cortical thinning']
  }
}

// Get all sample images in a flat array
export function getAllSampleImages() {
  return [
    ...sampleMRIImages.normal,
    ...sampleMRIImages.mci, 
    ...sampleMRIImages.mild,
    ...sampleMRIImages.moderate
  ]
}

// Get sample images by category
export function getSampleImagesByCategory(category: keyof typeof sampleMRIImages) {
  return sampleMRIImages[category] || []
}