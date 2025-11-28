import { useState } from 'react';
import { Header } from '../components/Header';
import { PatientSidebar } from '../components/PatientSidebar';
import { Upload, FileText, ArrowRight, X, Check, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { PageType } from '../App';

interface PatientScreeningPageProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

type ScreeningMethod = 'image' | 'data' | null;
type ScreeningStep = 'select' | 'input' | 'processing' | 'results';

export function PatientScreeningPage({ onLogout, onNavigate }: PatientScreeningPageProps) {
  const [method, setMethod] = useState<ScreeningMethod>(null);
  const [step, setStep] = useState<ScreeningStep>('select');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    age: '',
    familyHistory: '',
    brcaStatus: '',
    menstrualHistory: '',
    previousBiopsies: '',
    hormoneTherapy: '',
    breastDensity: '',
    lifestyle: '',
  });

  const [results, setResults] = useState({
    riskLevel: 'low',
    confidence: 92,
    findings: '',
    recommendations: '',
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleStartScreening = () => {
    setStep('processing');
    
    // Simulate AI processing
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Simulate results
          const mockRiskLevel = Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'moderate' : 'low';
          setResults({
            riskLevel: mockRiskLevel,
            confidence: 85 + Math.floor(Math.random() * 15),
            findings: mockRiskLevel === 'high' 
              ? 'AI analysis detected areas requiring further evaluation. Unusual density patterns were identified in the upper outer quadrant.'
              : mockRiskLevel === 'moderate'
              ? 'AI analysis identified some areas of increased density that should be monitored. Follow-up recommended in 6 months.'
              : 'AI analysis shows normal breast tissue with no concerning findings. Continue with annual screenings.',
            recommendations: mockRiskLevel === 'high'
              ? 'Schedule immediate consultation with a breast imaging specialist. Additional imaging (ultrasound or MRI) may be required.'
              : mockRiskLevel === 'moderate'
              ? 'Follow up with your healthcare provider within 3-6 months. Continue monthly self-examinations.'
              : 'Maintain regular screening schedule. Continue monthly self-examinations and healthy lifestyle habits.',
          });
          setStep('results');
        }, 1000);
      }
    }, 200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleStartScreening();
  };

  const handleStartNew = () => {
    setMethod(null);
    setStep('select');
    setUploadedFiles([]);
    setProgress(0);
    setFormData({
      age: '',
      familyHistory: '',
      brcaStatus: '',
      menstrualHistory: '',
      previousBiopsies: '',
      hormoneTherapy: '',
      breastDensity: '',
      lifestyle: '',
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-700 bg-red-100 border-red-300';
      case 'moderate': return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'low': return 'text-green-700 bg-green-100 border-green-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <Header onLogout={onLogout} />
      
      <div className="flex">
        <PatientSidebar onNavigate={onNavigate} activePage="screening" />
        
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-5xl mx-auto">
            {/* Method Selection */}
            {step === 'select' && (
              <>
                <div className="mb-8">
                  <h1 className="text-blue-900 mb-2">New Breast Cancer Screening</h1>
                  <p className="text-blue-600">Choose your preferred screening method. Both options use advanced AI analysis.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Scan Option */}
                  <button
                    onClick={() => {
                      setMethod('image');
                      setStep('input');
                    }}
                    className="bg-white rounded-2xl shadow-md border-2 border-blue-100 hover:border-blue-600 p-8 text-left transition-all group hover:shadow-lg"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ImageIcon className="text-white" size={32} />
                    </div>
                    <h2 className="text-blue-900 mb-3">Image Scan Analysis</h2>
                    <p className="text-blue-600 mb-4">
                      Upload mammogram or MRI images for AI-powered analysis. Our system processes DICOM, PNG, and JPEG formats.
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-800">
                      <span>Start Image Upload</span>
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-100">
                      <p className="text-sm text-blue-700">✓ High-resolution image analysis</p>
                      <p className="text-sm text-blue-700">✓ Density pattern detection</p>
                      <p className="text-sm text-blue-700">✓ Detailed visual report</p>
                    </div>
                  </button>

                  {/* Data Tabular Option */}
                  <button
                    onClick={() => {
                      setMethod('data');
                      setStep('input');
                    }}
                    className="bg-white rounded-2xl shadow-md border-2 border-blue-100 hover:border-pink-600 p-8 text-left transition-all group hover:shadow-lg"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <FileText className="text-white" size={32} />
                    </div>
                    <h2 className="text-blue-900 mb-3">Risk Factor Assessment</h2>
                    <p className="text-blue-600 mb-4">
                      Complete a structured questionnaire about your health history, lifestyle, and risk factors for comprehensive analysis.
                    </p>
                    <div className="flex items-center gap-2 text-pink-600 group-hover:text-pink-800">
                      <span>Start Assessment</span>
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-100">
                      <p className="text-sm text-blue-700">✓ No imaging required</p>
                      <p className="text-sm text-blue-700">✓ Comprehensive risk scoring</p>
                      <p className="text-sm text-blue-700">✓ Personalized recommendations</p>
                    </div>
                  </button>
                </div>

                {/* Info Section */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-blue-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="text-blue-600" size={20} />
                    Important Information
                  </h3>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• AI screening is a supplementary tool and does not replace professional medical diagnosis</li>
                    <li>• Results are typically available within minutes</li>
                    <li>• All data is encrypted and HIPAA compliant</li>
                    <li>• Consult with a healthcare provider for any concerning results</li>
                  </ul>
                </div>
              </>
            )}

            {/* Image Upload Input */}
            {step === 'input' && method === 'image' && (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-blue-900 mb-2">Upload Medical Images</h1>
                    <p className="text-blue-600">Upload high-resolution mammogram or MRI images (DICOM, PNG, JPEG)</p>
                  </div>
                  <button
                    onClick={handleStartNew}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    ← Back
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-8">
                  {/* Drag and Drop Area */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                      dragActive
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Upload className="text-blue-600" size={40} />
                    </div>
                    <h3 className="text-blue-900 mb-2">Drag and drop your images here</h3>
                    <p className="text-blue-600 mb-4">or</p>
                    <label className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-colors">
                      Browse Files
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                        accept=".dcm,.png,.jpg,.jpeg"
                      />
                    </label>
                    <p className="text-sm text-blue-600 mt-4">
                      Supported formats: DICOM (.dcm), PNG, JPEG • Max size: 50MB per file
                    </p>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h3 className="text-blue-900">Uploaded Files ({uploadedFiles.length})</h3>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                              <ImageIcon className="text-white" size={20} />
                            </div>
                            <div>
                              <p className="text-blue-900">{file.name}</p>
                              <p className="text-sm text-blue-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                          >
                            <X className="text-blue-600 group-hover:text-red-600" size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Instructions */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <h4 className="text-blue-900 mb-2">Image Quality Guidelines:</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• Upload clear, high-resolution images</li>
                      <li>• Include multiple views if available (CC, MLO)</li>
                      <li>• Ensure images are properly oriented</li>
                      <li>• Remove any personal identifiers from images</li>
                    </ul>
                  </div>

                  {/* Start Analysis Button */}
                  {uploadedFiles.length > 0 && (
                    <button
                      onClick={handleStartScreening}
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      Start AI Analysis
                      <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Data Form Input */}
            {step === 'input' && method === 'data' && (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-blue-900 mb-2">Risk Factor Assessment</h1>
                    <p className="text-blue-600">Please answer the following questions accurately</p>
                  </div>
                  <button
                    onClick={handleStartNew}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    ← Back
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl shadow-md border border-blue-100 p-8">
                  <div className="space-y-6">
                    {/* Age */}
                    <div>
                      <label className="block text-sm text-blue-900 mb-2">Age *</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your age"
                        required
                        min="18"
                        max="120"
                      />
                    </div>

                    {/* Family History */}
                    <div>
                      <label className="block text-sm text-blue-900 mb-2">Family History of Breast Cancer *</label>
                      <select
                        value={formData.familyHistory}
                        onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="none">No family history</option>
                        <option value="second-degree">Second-degree relative (aunt, grandmother)</option>
                        <option value="first-degree">First-degree relative (mother, sister, daughter)</option>
                        <option value="multiple">Multiple family members</option>
                      </select>
                    </div>

                    {/* BRCA Status */}
                    <div>
                      <label className="block text-sm text-blue-900 mb-2">BRCA Gene Status *</label>
                      <select
                        value={formData.brcaStatus}
                        onChange={(e) => setFormData({ ...formData, brcaStatus: e.target.value })}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="not-tested">Not tested</option>
                        <option value="negative">Tested - Negative</option>
                        <option value="brca1">BRCA1 positive</option>
                        <option value="brca2">BRCA2 positive</option>
                        <option value="both">Both BRCA1 and BRCA2 positive</option>
                      </select>
                    </div>

                    {/* Menstrual History */}
                    <div>
                      <label className="block text-sm text-blue-900 mb-2">Age at First Menstrual Period *</label>
                      <select
                        value={formData.menstrualHistory}
                        onChange={(e) => setFormData({ ...formData, menstrualHistory: e.target.value })}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="before-12">Before age 12</option>
                        <option value="12-13">12-13 years</option>
                        <option value="14-15">14-15 years</option>
                        <option value="after-15">After age 15</option>
                      </select>
                    </div>

                    {/* Previous Biopsies */}
                    <div>
                      <label className="block text-sm text-blue-900 mb-2">Previous Breast Biopsies *</label>
                      <select
                        value={formData.previousBiopsies}
                        onChange={(e) => setFormData({ ...formData, previousBiopsies: e.target.value })}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="none">No previous biopsies</option>
                        <option value="one-benign">One biopsy - Benign</option>
                        <option value="multiple-benign">Multiple biopsies - Benign</option>
                        <option value="atypical">Biopsy showing atypical hyperplasia</option>
                      </select>
                    </div>

                    {/* Hormone Therapy */}
                    <div>
                      <label className="block text-sm text-blue-900 mb-2">Hormone Replacement Therapy *</label>
                      <select
                        value={formData.hormoneTherapy}
                        onChange={(e) => setFormData({ ...formData, hormoneTherapy: e.target.value })}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="never">Never used</option>
                        <option value="less-5">Used for less than 5 years</option>
                        <option value="more-5">Used for more than 5 years</option>
                        <option value="current">Currently using</option>
                      </select>
                    </div>

                    {/* Breast Density */}
                    <div>
                      <label className="block text-sm text-blue-900 mb-2">Breast Density (if known)</label>
                      <select
                        value={formData.breastDensity}
                        onChange={(e) => setFormData({ ...formData, breastDensity: e.target.value })}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select if known</option>
                        <option value="almost-fatty">Almost entirely fatty</option>
                        <option value="scattered">Scattered fibroglandular densities</option>
                        <option value="heterogeneous">Heterogeneously dense</option>
                        <option value="extremely-dense">Extremely dense</option>
                      </select>
                    </div>

                    {/* Lifestyle Factors */}
                    <div>
                      <label className="block text-sm text-blue-900 mb-2">Lifestyle Factors</label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-blue-900">Regular physical activity (3+ times/week)</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-blue-900">Maintain healthy weight</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-blue-900">Limited alcohol consumption</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-blue-900">Non-smoker</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-8 bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Calculate Risk Assessment
                    <ArrowRight size={20} />
                  </button>
                </form>
              </>
            )}

            {/* Processing */}
            {step === 'processing' && (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-12 max-w-2xl w-full text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Loader2 className="text-blue-600 animate-spin" size={48} />
                  </div>
                  <h2 className="text-blue-900 mb-3">AI Analysis in Progress</h2>
                  <p className="text-blue-600 mb-6">
                    {method === 'image' 
                      ? 'Processing your medical images using advanced machine learning algorithms...'
                      : 'Analyzing your risk factors and generating personalized assessment...'}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-blue-700 mb-2">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-blue-600">
                    This typically takes 30-60 seconds. Please do not close this window.
                  </p>
                </div>
              </div>
            )}

            {/* Results */}
            {step === 'results' && (
              <>
                <div className="mb-8">
                  <h1 className="text-blue-900 mb-2">Screening Results</h1>
                  <p className="text-blue-600">Your AI-powered analysis is complete</p>
                </div>

                <div className="space-y-6">
                  {/* Risk Level Card */}
                  <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-blue-900">Risk Assessment</h2>
                      <span className={`px-6 py-3 rounded-xl border-2 text-lg capitalize ${getRiskColor(results.riskLevel)}`}>
                        {results.riskLevel} Risk
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="p-6 bg-blue-50 rounded-xl">
                        <p className="text-sm text-blue-600 mb-2">AI Confidence Score</p>
                        <div className="flex items-end gap-2">
                          <p className="text-4xl text-blue-900">{results.confidence}%</p>
                          <Check className="text-green-600 mb-2" size={24} />
                        </div>
                        <div className="mt-4 w-full h-2 bg-white rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${results.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="p-6 bg-pink-50 rounded-xl">
                        <p className="text-sm text-pink-600 mb-2">Analysis Method</p>
                        <p className="text-2xl text-blue-900 capitalize">{method === 'image' ? 'Image Scan' : 'Risk Factor'} Assessment</p>
                        <p className="text-sm text-blue-600 mt-2">
                          {method === 'image' ? `${uploadedFiles.length} images analyzed` : 'Comprehensive health profile evaluated'}
                        </p>
                      </div>
                    </div>

                    {/* Findings */}
                    <div className="mb-6">
                      <h3 className="text-blue-900 mb-3">Findings</h3>
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="text-blue-900">{results.findings}</p>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h3 className="text-blue-900 mb-3">Recommendations</h3>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl border border-blue-100">
                        <p className="text-blue-900">{results.recommendations}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => onNavigate('appointments')}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-colors"
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
                      New Screening
                    </button>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <div className="flex gap-3">
                      <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
                      <div>
                        <h4 className="text-yellow-900 mb-2">Important Notice</h4>
                        <p className="text-sm text-yellow-800">
                          This AI screening is a preliminary assessment tool and should not be considered a final diagnosis. 
                          Please consult with a qualified healthcare professional for proper evaluation and interpretation of results.
                          Your results have been automatically shared with your assigned healthcare provider.
                        </p>
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
