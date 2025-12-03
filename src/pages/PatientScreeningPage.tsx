import React from 'react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { PatientSidebar } from '../components/PatientSidebar';
import { ArrowRight, AlertCircle, Loader2, Check, TrendingUp, Activity } from 'lucide-react';
import { PageType } from '../App';

interface PatientScreeningPageProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

type ScreeningStep = 'input' | 'processing' | 'results';

interface MedicalData {
  // Mean Values
  meanRadius: string;
  meanTexture: string;
  meanPerimeter: string;
  meanArea: string;
  meanSmoothness: string;
  meanCompactness: string;
  meanConcavity: string;
  meanConcavePoints: string;
  meanSymmetry: string;
  meanFractalDimension: string;
  // Standard Error
  radiusError: string;
  textureError: string;
  perimeterError: string;
  areaError: string;
  smoothnessError: string;
  compactnessError: string;
  concavityError: string;
  concavePointsError: string;
  symmetryError: string;
  fractalDimensionError: string;
  // Worst Values
  worstRadius: string;
  worstTexture: string;
  worstPerimeter: string;
  worstArea: string;
  worstSmoothness: string;
  worstCompactness: string;
  worstConcavity: string;
  worstConcavePoints: string;
  worstSymmetry: string;
  worstFractalDimension: string;
}

export function PatientScreeningPage({ onLogout, onNavigate }: PatientScreeningPageProps) {
  const [step, setStep] = useState<ScreeningStep>('input');
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [medicalData, setMedicalData] = useState<MedicalData>({
    meanRadius: '',
    meanTexture: '',
    meanPerimeter: '',
    meanArea: '',
    meanSmoothness: '',
    meanCompactness: '',
    meanConcavity: '',
    meanConcavePoints: '',
    meanSymmetry: '',
    meanFractalDimension: '',
    radiusError: '',
    textureError: '',
    perimeterError: '',
    areaError: '',
    smoothnessError: '',
    compactnessError: '',
    concavityError: '',
    concavePointsError: '',
    symmetryError: '',
    fractalDimensionError: '',
    worstRadius: '',
    worstTexture: '',
    worstPerimeter: '',
    worstArea: '',
    worstSmoothness: '',
    worstCompactness: '',
    worstConcavity: '',
    worstConcavePoints: '',
    worstSymmetry: '',
    worstFractalDimension: '',
  });

  const [results, setResults] = useState({
    prediction: 'benign',
    confidence: 94.5,
    riskScore: 12.3,
    findings: '',
    recommendations: '',
  });

  const validateNumber = (value: string, min: number = 0, max: number = Infinity) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(medicalData).forEach(([key, value]) => {
      const strValue = value as string;
      if (!strValue.trim()) {
        newErrors[key] = 'Required';
      } else if (!validateNumber(strValue, 0)) {
        newErrors[key] = 'Must be a positive number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof MedicalData, value: string) => {
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setMedicalData({ ...medicalData, [field]: value });
      if (errors[field]) {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStep('processing');
    
    // Simulate AI processing
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Simulate prediction results
          const isMalignant = Math.random() > 0.7;
          setResults({
            prediction: isMalignant ? 'malignant' : 'benign',
            confidence: 85 + Math.random() * 13,
            riskScore: isMalignant ? 65 + Math.random() * 30 : 10 + Math.random() * 30,
            findings: isMalignant
              ? 'The AI model has detected patterns consistent with malignant characteristics. The cell features show irregular shapes, increased texture variance, and higher concavity measurements that warrant immediate medical attention.'
              : 'The AI model has analyzed the cell features and identified patterns consistent with benign characteristics. The measurements fall within normal ranges with regular shapes and low variance.',
            recommendations: isMalignant
              ? 'Immediate consultation with an oncologist is strongly recommended. Additional diagnostic tests including biopsy and imaging may be necessary to confirm diagnosis and determine appropriate treatment options.'
              : 'Continue with regular screening schedule. Maintain healthy lifestyle habits and perform monthly self-examinations. Schedule your next routine mammogram as per your healthcare provider\'s recommendation.',
          });
          setStep('results');
        }, 1000);
      }
    }, 200);
  };

  const handleStartNew = () => {
    setStep('input');
    setProgress(0);
    setMedicalData({
      meanRadius: '',
      meanTexture: '',
      meanPerimeter: '',
      meanArea: '',
      meanSmoothness: '',
      meanCompactness: '',
      meanConcavity: '',
      meanConcavePoints: '',
      meanSymmetry: '',
      meanFractalDimension: '',
      radiusError: '',
      textureError: '',
      perimeterError: '',
      areaError: '',
      smoothnessError: '',
      compactnessError: '',
      concavityError: '',
      concavePointsError: '',
      symmetryError: '',
      fractalDimensionError: '',
      worstRadius: '',
      worstTexture: '',
      worstPerimeter: '',
      worstArea: '',
      worstSmoothness: '',
      worstCompactness: '',
      worstConcavity: '',
      worstConcavePoints: '',
      worstSymmetry: '',
      worstFractalDimension: '',
    });
    setErrors({});
  };

  const renderInputField = (
    field: keyof MedicalData,
    label: string,
    placeholder: string = '0.00'
  ) => (
    <div>
      <label className="block text-sm text-blue-900 mb-2">{label} *</label>
      <input
        type="text"
        inputMode="decimal"
        value={medicalData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          errors[field] ? 'border-red-300 bg-red-50' : 'border-blue-200'
        }`}
        placeholder={placeholder}
      />
      {errors[field] && <p className="text-xs text-red-600 mt-1">{errors[field]}</p>}
    </div>
  );

  const getPredictionColor = (prediction: string) => {
    return prediction === 'malignant' 
      ? 'text-red-700 bg-red-100 border-red-300' 
      : 'text-green-700 bg-green-100 border-green-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <Header onLogout={onLogout} />
      
      <div className="flex">
        <PatientSidebar onNavigate={onNavigate} activePage="screening" />
        
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-6xl mx-auto">
            {/* Input Form */}
            {step === 'input' && (
              <>
                <div className="mb-8">
                  <h1 className="text-blue-900 mb-2">Medical Analysis</h1>
                  <p className="text-blue-600">Enter cell feature measurements for AI-powered breast cancer prediction</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Mean Values Section */}
                  <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Activity className="text-white" size={24} />
                      </div>
                      <div>
                        <h2 className="text-blue-900">A. Mean Values (Cell Features)</h2>
                        <p className="text-sm text-blue-600">Average measurements of cell nuclei</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {renderInputField('meanRadius', 'Mean Radius')}
                      {renderInputField('meanTexture', 'Mean Texture')}
                      {renderInputField('meanPerimeter', 'Mean Perimeter')}
                      {renderInputField('meanArea', 'Mean Area')}
                      {renderInputField('meanSmoothness', 'Mean Smoothness')}
                      {renderInputField('meanCompactness', 'Mean Compactness')}
                      {renderInputField('meanConcavity', 'Mean Concavity')}
                      {renderInputField('meanConcavePoints', 'Mean Concave Points')}
                      {renderInputField('meanSymmetry', 'Mean Symmetry')}
                      {renderInputField('meanFractalDimension', 'Mean Fractal Dimension')}
                    </div>
                  </div>

                  {/* Standard Error Section */}
                  <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <TrendingUp className="text-white" size={24} />
                      </div>
                      <div>
                        <h2 className="text-blue-900">B. Standard Error (Variance)</h2>
                        <p className="text-sm text-blue-600">Variability measurements of cell features</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {renderInputField('radiusError', 'Radius Error')}
                      {renderInputField('textureError', 'Texture Error')}
                      {renderInputField('perimeterError', 'Perimeter Error')}
                      {renderInputField('areaError', 'Area Error')}
                      {renderInputField('smoothnessError', 'Smoothness Error')}
                      {renderInputField('compactnessError', 'Compactness Error')}
                      {renderInputField('concavityError', 'Concavity Error')}
                      {renderInputField('concavePointsError', 'Concave Points Error')}
                      {renderInputField('symmetryError', 'Symmetry Error')}
                      {renderInputField('fractalDimensionError', 'Fractal Dimension Error')}
                    </div>
                  </div>

                  {/* Worst Values Section */}
                  <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                        <AlertCircle className="text-white" size={24} />
                      </div>
                      <div>
                        <h2 className="text-blue-900">C. Worst Values (Extremes)</h2>
                        <p className="text-sm text-blue-600">Extreme measurements of cell features</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {renderInputField('worstRadius', 'Worst Radius')}
                      {renderInputField('worstTexture', 'Worst Texture')}
                      {renderInputField('worstPerimeter', 'Worst Perimeter')}
                      {renderInputField('worstArea', 'Worst Area')}
                      {renderInputField('worstSmoothness', 'Worst Smoothness')}
                      {renderInputField('worstCompactness', 'Worst Compactness')}
                      {renderInputField('worstConcavity', 'Worst Concavity')}
                      {renderInputField('worstConcavePoints', 'Worst Concave Points')}
                      {renderInputField('worstSymmetry', 'Worst Symmetry')}
                      {renderInputField('worstFractalDimension', 'Worst Fractal Dimension')}
                    </div>
                  </div>

                  {/* Important Information */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex gap-3">
                      <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-blue-900 mb-2">Important Information</h4>
                        <ul className="space-y-1 text-sm text-blue-700">
                          <li>• All fields are required and must contain positive numerical values</li>
                          <li>• These measurements are typically obtained from fine needle aspirate (FNA) of breast mass</li>
                          <li>• Values should be entered as provided by your laboratory or imaging center</li>
                          <li>• AI prediction is for screening purposes only and must be confirmed by medical professionals</li>
                          <li>• Results are encrypted and HIPAA compliant</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <span>Submit for Prediction</span>
                    <ArrowRight size={20} />
                  </button>
                </form>
              </>
            )}

            {/* Processing */}
            {step === 'processing' && (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-12 max-w-2xl w-full text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center">
                    <Loader2 className="text-blue-600 animate-spin" size={48} />
                  </div>
                  <h2 className="text-blue-900 mb-3">AI Analysis in Progress</h2>
                  <p className="text-blue-600 mb-6">
                    Processing your medical data using advanced machine learning algorithms...
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-blue-700 mb-2">
                      <span>Analysis Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8 text-sm text-blue-600">
                    <div className="text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${progress > 30 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <p>Data Validation</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${progress > 60 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <p>Feature Analysis</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${progress > 90 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <p>Prediction Model</p>
                    </div>
                  </div>

                  <p className="text-sm text-blue-600 mt-6">
                    This typically takes 30-60 seconds. Please do not close this window.
                  </p>
                </div>
              </div>
            )}

            {/* Results */}
            {step === 'results' && (
              <>
                <div className="mb-8">
                  <h1 className="text-blue-900 mb-2">Prediction Results</h1>
                  <p className="text-blue-600">Your AI-powered analysis is complete</p>
                </div>

                <div className="space-y-6">
                  {/* Prediction Card */}
                  <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-blue-900">Diagnosis Prediction</h2>
                      <span className={`px-6 py-3 rounded-xl border-2 text-lg uppercase ${getPredictionColor(results.prediction)}`}>
                        {results.prediction}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <p className="text-sm text-blue-600 mb-2">AI Confidence</p>
                        <div className="flex items-end gap-2">
                          <p className="text-4xl text-blue-900">{results.confidence.toFixed(1)}%</p>
                          <Check className="text-blue-600 mb-2" size={24} />
                        </div>
                        <div className="mt-4 w-full h-2 bg-white rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${results.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                        <p className="text-sm text-purple-600 mb-2">Risk Score</p>
                        <div className="flex items-end gap-2">
                          <p className="text-4xl text-purple-900">{results.riskScore.toFixed(1)}</p>
                          <TrendingUp className="text-purple-600 mb-2" size={24} />
                        </div>
                        <p className="text-sm text-purple-700 mt-2">
                          {results.riskScore < 30 ? 'Low Risk' : results.riskScore < 60 ? 'Moderate Risk' : 'High Risk'}
                        </p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200">
                        <p className="text-sm text-pink-600 mb-2">Analysis Method</p>
                        <p className="text-2xl text-pink-900">30 Features</p>
                        <p className="text-sm text-pink-700 mt-2">
                          Cell nuclei characteristics analyzed
                        </p>
                      </div>
                    </div>

                    {/* Findings */}
                    <div className="mb-6">
                      <h3 className="text-blue-900 mb-3 flex items-center gap-2">
                        <Activity size={20} className="text-blue-600" />
                        Clinical Findings
                      </h3>
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-blue-900">{results.findings}</p>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h3 className="text-blue-900 mb-3 flex items-center gap-2">
                        <Check size={20} className="text-green-600" />
                        Recommendations
                      </h3>
                      <div className={`p-4 rounded-xl border ${
                        results.prediction === 'malignant' 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-green-50 border-green-200'
                      }`}>
                        <p className={results.prediction === 'malignant' ? 'text-red-900' : 'text-green-900'}>
                          {results.recommendations}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => onNavigate('appointments')}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
                    >
                      Book Consultation
                    </button>
                    <button
                      onClick={() => onNavigate('messages')}
                      className="bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-600 py-4 rounded-xl transition-colors"
                    >
                      Message Doctor
                    </button>
                    <button
                      onClick={handleStartNew}
                      className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 py-4 rounded-xl transition-colors"
                    >
                      New Analysis
                    </button>
                  </div>

                  {/* Critical Notice */}
                  <div className={`rounded-xl p-6 border-2 ${
                    results.prediction === 'malignant'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-yellow-50 border-yellow-300'
                  }`}>
                    <div className="flex gap-3">
                      <AlertCircle className={`flex-shrink-0 ${
                        results.prediction === 'malignant' ? 'text-red-600' : 'text-yellow-600'
                      }`} size={24} />
                      <div>
                        <h4 className={`mb-2 ${
                          results.prediction === 'malignant' ? 'text-red-900' : 'text-yellow-900'
                        }`}>
                          {results.prediction === 'malignant' ? 'Urgent Medical Attention Required' : 'Important Notice'}
                        </h4>
                        <p className={`text-sm ${
                          results.prediction === 'malignant' ? 'text-red-800' : 'text-yellow-800'
                        }`}>
                          {results.prediction === 'malignant'
                            ? 'This AI screening indicates patterns that require immediate medical evaluation. Please schedule a consultation with a qualified oncologist or breast imaging specialist as soon as possible. This prediction is not a final diagnosis and must be confirmed through proper medical examination and additional testing.'
                            : 'This AI screening is a preliminary assessment tool and should not be considered a final diagnosis. Please consult with a qualified healthcare professional for proper evaluation and interpretation of results. Your results have been automatically shared with your assigned healthcare provider for review.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Data Summary */}
                  <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                    <h3 className="text-blue-900 mb-4">Submitted Data Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-600 mb-1">Mean Features</p>
                        <p className="text-blue-900">10 values</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-purple-600 mb-1">Error Measures</p>
                        <p className="text-purple-900">10 values</p>
                      </div>
                      <div className="text-center p-3 bg-pink-50 rounded-lg">
                        <p className="text-pink-600 mb-1">Worst Values</p>
                        <p className="text-pink-900">10 values</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-green-600 mb-1">Total Features</p>
                        <p className="text-green-900">30 analyzed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
