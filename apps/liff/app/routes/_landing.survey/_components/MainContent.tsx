import { useNavigate } from "@remix-run/react";
import { Briefcase, Check, ChevronLeft, DollarSign, Target, Users } from "lucide-react";
import { useState } from "react";


interface SurveyData {
  discovery: string;
  discoveryOther: string;
  goals: string;
  goalsOther: string;
  role: string;
  roleOther: string;
  income: string;
}

const initialData: SurveyData = {
  discovery: '',
  discoveryOther: '',
  goals: '',
  goalsOther: '',
  role: '',
  roleOther: '',
  income: ''
};

interface MainContentProps {
}

const MainContent: React.FC<MainContentProps> = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SurveyData>(initialData);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      title: 'การค้นพบ',
      subtitle: 'คุณรู้จัก DuckyDuck ได้อย่างไร?',
      icon: Users,
      field: 'discovery' as keyof SurveyData,
      options: [
        { value: 'social_media', label: 'โซเชียลมีเดีย', icon: '📱' },
        { value: 'word_of_mouth', label: 'การบอกต่อ/แนะนำ', icon: '💬' },
        { value: 'client_referral', label: 'การแนะนำจากลูกค้าเดิม', icon: '🤝' },
        { value: 'other', label: 'อื่นๆ', icon: '✨', hasInput: true }
      ]
    },
    {
      title: 'เป้าหมาย',
      subtitle: 'เป้าหมายหลักของคุณกับ DuckyDuck คืออะไร?',
      icon: Target,
      field: 'goals' as keyof SurveyData,
      options: [
        { value: 'business_skills', label: 'พัฒนาทักษะเพื่อเติบโตทางธุรกิจ', icon: '📈' },
        { value: 'personal_knowledge', label: 'เสริมสร้างความรู้ส่วนตัว', icon: '🧠' },
        { value: 'other', label: 'อื่นๆ', icon: '🎯', hasInput: true }
      ]
    },
    {
      title: 'บทบาท',
      subtitle: 'อะไรที่อธิบายบทบาทงานปัจจุบันของคุณได้ดีที่สุด?',
      icon: Briefcase,
      field: 'role' as keyof SurveyData,
      options: [
        { value: 'business_owner', label: 'เจ้าของธุรกิจ/นักธุรกิจ', icon: '👔' },
        { value: 'corporate', label: 'พนักงานบริษัท', icon: '🏢' },
        { value: 'freelancer', label: 'ฟรีแลนซ์/ผู้รับจ้างอิสระ', icon: '💻' },
        { value: 'student', label: 'นักเรียน/นักศึกษา', icon: '🎓' },
        { value: 'other', label: 'อื่นๆ', icon: '🔧', hasInput: true }
      ]
    },
    {
      title: 'รายได้',
      subtitle: 'รายได้รายเดือนปัจจุบันของคุณอยู่ในช่วงใด? (บาท)',
      icon: DollarSign,
      field: 'income' as keyof SurveyData,
      options: [
        { value: 'below_15000', label: 'ต่ำกว่า 15,000', icon: '💰' },
        { value: '15000_30000', label: '15,000 - 30,000', icon: '💵' },
        { value: '30001_50000', label: '30,001 - 50,000', icon: '💸' },
        { value: '50001_100000', label: '50,001 - 100,000', icon: '💎' },
        { value: 'above_100000', label: 'มากกว่า 100,000', icon: '🏆' },
        { value: 'prefer_not_say', label: 'ไม่ต้องการตอบ', icon: '🤐' }
      ]
    }
  ];

  const handleOptionSelect = (field: keyof SurveyData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      [`${field}Other`]: value === 'other' ? prev[`${field}Other` as keyof SurveyData] : ''
    }));
  };

  const handleOtherInput = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${field}Other`]: value
    }));
  };

  const canProceed = () => {
    const currentField = steps[currentStep].field;
    const fieldValue = formData[currentField];
    
    if (!fieldValue) return false;
    if (fieldValue === 'other') {
      const otherField = `${currentField}Other` as keyof SurveyData;
      return formData[otherField].trim() !== '';
    }
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) return;
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ขอบคุณมากครับ! 🙏</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              ข้อมูลของคุณจะช่วยให้เราปรับปรุงบริการได้ดียิ่งขึ้น
            </p>
            <div className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-md">
              เสร็จสิ้น ✨
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-amber-500 via-amber-400 to-amber-200 p-6">
      <div className="max-w-sm mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/80 text-sm font-medium">Q{currentStep + 1}</span>
            <span className="text-white/80 text-sm font-medium">{currentStep + 1}/{steps.length}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
              {currentStepData.subtitle}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentStepData.options.map((option, index) => (
              <div key={option.value}>
                <label className={`block w-full p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  formData[currentStepData.field] === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{option.icon}</div>
                      <span className="text-gray-800 font-medium">{option.label}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      formData[currentStepData.field] === option.value
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}>
                      {formData[currentStepData.field] === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name={currentStepData.field}
                    value={option.value}
                    checked={formData[currentStepData.field] === option.value}
                    onChange={(e) => handleOptionSelect(currentStepData.field, e.target.value)}
                    className="sr-only"
                  />
                </label>
                
                {option.hasInput && formData[currentStepData.field] === 'other' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="โปรดระบุรายละเอียด..."
                      value={formData[`${currentStepData.field}Other` as keyof SurveyData]}
                      onChange={(e) => handleOtherInput(currentStepData.field, e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 transition-colors duration-200 text-gray-800 placeholder-gray-400"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl text-white hover:bg-white/30 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 h-14 rounded-2xl font-bold text-lg transition-all duration-200 ${
              canProceed()
                ? 'bg-white text-primary hover:bg-gray-50 shadow-lg'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? 'ส่งแบบสำรวจ' : 'ถัดไป'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default MainContent;
