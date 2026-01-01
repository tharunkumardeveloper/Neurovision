import React, { useState } from 'react'
import { Download, Eye, Info } from 'lucide-react'
import { sampleMRIImages, categoryInfo, getSampleImagesByCategory } from '../lib/sampleMRIData'

interface SampleMRIGalleryProps {
  onImageSelect?: (filename: string) => void
}

export default function SampleMRIGallery({ onImageSelect }: SampleMRIGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof sampleMRIImages>('normal')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const categories = Object.keys(sampleMRIImages) as (keyof typeof sampleMRIImages)[]
  const currentImages = getSampleImagesByCategory(selectedCategory)
  const currentCategoryInfo = categoryInfo[selectedCategory]

  const handleImageClick = (image: any) => {
    setSelectedImage(image.id)
    if (onImageSelect) {
      onImageSelect(image.filename)
    }
  }

  const downloadSampleImage = async (image: any) => {
    try {
      // Try to fetch the actual image first
      const response = await fetch(image.path)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = image.filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        // Fallback: open the fallback image
        window.open(image.fallback, '_blank')
      }
    } catch (error) {
      // Fallback: open the fallback image
      window.open(image.fallback, '_blank')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          Sample MRI Images from Research Dataset
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">
          Click on any image to use it as a sample upload, or download for testing
        </p>
      </div>

      {/* Category Tabs - Mobile Optimized */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
        {categories.map((category) => {
          const info = categoryInfo[category]
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-touch ${
                selectedCategory === category
                  ? `bg-${info.color}-100 text-${info.color}-800 border-2 border-${info.color}-300`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
              }`}
            >
              <span className="hidden sm:inline">{info.name}</span>
              <span className="sm:hidden">{info.name.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Category Description */}
      <div className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 bg-${currentCategoryInfo.color}-50 border border-${currentCategoryInfo.color}-200`}>
        <h4 className={`font-semibold text-${currentCategoryInfo.color}-900 mb-2 text-sm sm:text-base`}>
          {currentCategoryInfo.name}
        </h4>
        <p className={`text-xs sm:text-sm text-${currentCategoryInfo.color}-800 mb-2 sm:mb-3`}>
          {currentCategoryInfo.description}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {currentCategoryInfo.characteristics.map((char, index) => (
            <span
              key={index}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded bg-${currentCategoryInfo.color}-100 text-${currentCategoryInfo.color}-700`}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Image Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {currentImages.map((image) => (
          <div
            key={image.id}
            className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all min-h-touch ${
              selectedImage === image.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            onClick={() => handleImageClick(image)}
          >
            <div className="aspect-square bg-black flex items-center justify-center">
              <img
                src={image.path}
                alt={image.description}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = image.fallback
                }}
              />
            </div>

            {/* Overlay - Simplified for mobile */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1 sm:space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadSampleImage(image)
                  }}
                  className="p-1.5 sm:p-2 bg-white rounded-full hover:bg-gray-100 transition-colors min-h-touch min-w-touch"
                  title="Download sample"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
                </button>
                <button
                  className="p-1.5 sm:p-2 bg-white rounded-full hover:bg-gray-100 transition-colors min-h-touch min-w-touch"
                  title="Use as sample"
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Image Info - Mobile Optimized */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 sm:p-3">
              <div className="text-white text-xs">
                <div className="font-medium truncate">{image.filename}</div>
                <div className="opacity-90 text-xs sm:text-sm truncate">{image.expectedResult}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Instructions - Mobile Optimized */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <h4 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">How to Use Sample Images:</h4>
            <ul className="text-blue-800 space-y-1">
              <li>• <strong>Click</strong> any image to see expected AI analysis results</li>
              <li>• <strong>Download</strong> images to test the upload functionality</li>
              <li className="hidden sm:list-item">• <strong>Compare</strong> different categories to understand AI decision-making</li>
              <li>• <strong>Upload format:</strong> JPEG, PNG, or DICOM files (max 50MB)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}