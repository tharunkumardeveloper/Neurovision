import { User, Calendar, Hash } from 'lucide-react'

interface PatientInfoProps {
  patient: {
    name: string
    age: number
    gender: string
    id: string
    lastVisit: string
  }
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 bg-medical-100 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-medical-600" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{patient.name}</h2>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">ID: {patient.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Age: {patient.age}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Gender: {patient.gender}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Last Visit: {patient.lastVisit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}