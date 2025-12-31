'use client'

import { useState, useRef } from 'react'
import { Upload, Brain, FileText, Activity, CheckCircle, AlertCircle } from 'lucide-react'
import { getRandomMRIImages, getRandomHandwritingImages, MRI_CATEGORIES, HANDWRITING_TASKS } from '@/lib/dataService'
import LastMRIAnalysis from '../LastMRIAnalysis'
import AutoMRIDemo from '../AutoMRIDemo'

interface UploadedFile {
  name: string
  type: string
  size: number
  preview?: string
}

export default function UploadPage() {
  const [mriFile, setMriFile] = useState<UploadedFile | null>(null)
  const [handwritingFiles, setHandwritingFiles] = useState<UploadedFile[]>([])
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof MRI_CATEGORIES>('NonDemented')
  const [selectedTask, setSelectedTask] = useState<string>('TASK_02')

  const mriInputRef = useRef<HTMLInputElement>(null)
  const handwritingInputRef = useRef<HTMLInputElement>(null)

  const handleMRIUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const uploadedFile: UploadedFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        preview: URL.createObjectURL(file)
      }
      setMriFile(uploadedFile)
    }
  }

  const handleHandwritingUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const uploadedFiles: UploadedFile[] = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      preview: URL.createObjectURL(file)
    }))
    setHandwritingFiles(prev => [...prev, ...uploadedFiles])
  }

  const removeHandwritingFile = (index: number) => {
    setHandwritingFiles(prev => prev.filter((_, i) => i !== index))
  }

  const exampleMRIImages = getRandomMRIImages(selectedCategory, 6)
  const exampleHandwritingImages = getRandomHandwritingImages(selectedTask, undefined, 6)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Medical Data
        </h1>
        <p className="text-lg text-gray-600">
          Upload your MRI scans and handwriting samples for AI analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* MRI Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Brain className="w-8 h-8 text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold">MRI Brain Scan</h2>
          </div>

          {!mriFile ? (
            <div
              onClick={() => mriInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Click to upload MRI scan
              </p>
              <p className="text-sm text-gray-500">
                Supports DICOM, NIfTI, JPG, PNG files
              </p>
              <input
                ref={mriInputRef}
                type="file"
                accept=".dcm,.nii,.nii.gz,.jpg,.jpeg,.png"
                onChange={handleMRIUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="border border-green-300 rounded-lg p-4 bg-green-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-green-800">{mriFile.name}</p>
                    <p className="text-sm text-green-600">
                      {(mriFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMriFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              {mriFile.preview && (
                <div className="mt-4">
                  <img
                    src={mriFile.preview}
                    alt="MRI Preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          )}

          {/* MRI Examples */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Example MRI Scans</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as keyof typeof MRI_CATEGORIES)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                {Object.entries(MRI_CATEGORIES).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {exampleMRIImages.slice(0, 6).map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.path}
                    alt={`MRI ${image.category}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                    <span className="text-white text-xs text-center px-2">
                      {MRI_CATEGORIES[image.category].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Handwriting Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Activity className="w-8 h-8 text-orange-500 mr-3" />
            <h2 className="text-xl font-semibold">Handwriting Samples</h2>
          </div>

          <div
            onClick={() => handwritingInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors mb-4"
          >
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="font-medium text-gray-700 mb-1">
              Upload handwriting samples
            </p>
            <p className="text-sm text-gray-500">
              Multiple files supported (JPG, PNG)
            </p>
            <input
              ref={handwritingInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={handleHandwritingUpload}
              className="hidden"
            />
          </div>

          {/* Uploaded Files */}
          {handwritingFiles.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Uploaded Files</h3>
              <div className="space-y-2">
                {handwritingFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeHandwritingFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Handwriting Examples */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Example Tasks</h3>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                {Object.entries(HANDWRITING_TASKS).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {exampleHandwritingImages.slice(0, 6).map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.path}
                    alt={`Handwriting ${image.condition}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                    <span className="text-white text-xs text-center px-2">
                      {image.condition} - {HANDWRITING_TASKS[image.task as keyof typeof HANDWRITING_TASKS]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Analysis Demo Section */}
      <div className="mb-8">
        <AutoMRIDemo />
      </div>

      {/* Last MRI Analysis Section */}
      <div className="mb-8">
        <LastMRIAnalysis />
      </div>

      {/* Upload Summary */}
      {(mriFile || handwritingFiles.length > 0) && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold text-blue-800">Upload Summary</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-blue-700 mb-1">MRI Scans</p>
              <p className="font-medium text-blue-800">
                {mriFile ? '1 file uploaded' : 'No files uploaded'}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700 mb-1">Handwriting Samples</p>
              <p className="font-medium text-blue-800">
                {handwritingFiles.length} files uploaded
              </p>
            </div>
          </div>
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 font-medium">
            Process Uploads
          </button>
        </div>
      )}
    </div>
  )
}