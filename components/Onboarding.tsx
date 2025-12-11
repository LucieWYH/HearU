
import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronRight, FileText, PenTool } from 'lucide-react';
import Logo from './Logo';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedData, setAgreedData] = useState(false);
  
  // Signature Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    if (step === 3 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
      }
    }
  }, [step]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setHasSigned(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setHasSigned(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fadeIn">
            <div className="mb-12">
                <Logo size="xl" variant="color" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Orange Gardien</h1>
            <p className="text-gray-500 leading-relaxed mb-12">
              Advanced protection against fraud calls, phishing SMS, and digital identity theft.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Get Started <ChevronRight size={20} />
            </button>
          </div>
        );
      case 1:
        return (
          <div className="p-8 h-full flex flex-col animate-fadeIn">
            <h2 className="text-2xl font-bold mb-8">Key Features</h2>
            <div className="space-y-6 flex-1">
              <FeatureItem 
                icon="📞" 
                title="Real-time Call Analysis" 
                desc="Identify scammers before you pick up." 
              />
              <FeatureItem 
                icon="💬" 
                title="SMS Filtering" 
                desc="Automatically detect and block phishing links." 
              />
              <FeatureItem 
                icon="📊" 
                title="Threat Dashboard" 
                desc="Visualize threats and manage your safety." 
              />
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold shadow-md active:scale-95 transition-transform"
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="p-8 h-full flex flex-col animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-orange-500" />
              <h2 className="text-2xl font-bold">Legal & Privacy</h2>
            </div>
            <p className="text-sm text-gray-500 mb-8">
              In accordance with RGPD regulations, we need your explicit consent to process call metadata and SMS content for protection purposes.
            </p>
            
            <div className="space-y-4 flex-1">
              <label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${agreedTerms ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                  {agreedTerms && <Check size={14} className="text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={agreedTerms} onChange={() => setAgreedTerms(!agreedTerms)} />
                <span className="text-sm font-medium text-gray-700">I agree to the Terms of Service and Anti-Fraud Policy.</span>
              </label>

              <label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${agreedData ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                  {agreedData && <Check size={14} className="text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={agreedData} onChange={() => setAgreedData(!agreedData)} />
                <span className="text-sm font-medium text-gray-700">I consent to the processing of my anonymized data for threat detection (RGPD).</span>
              </label>
            </div>

            <button 
              disabled={!agreedTerms || !agreedData}
              onClick={() => setStep(3)}
              className={`w-full py-4 rounded-xl font-semibold shadow-md transition-all ${(!agreedTerms || !agreedData) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white active:scale-95'}`}
            >
              Continue
            </button>
          </div>
        );
      case 3:
        return (
          <div className="p-8 h-full flex flex-col animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <PenTool className="text-orange-500" />
              <h2 className="text-2xl font-bold">Digital Signature</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Please sign below to validate your contract and activate the Orange Gardien service.
            </p>

            <div className="flex-1 flex flex-col">
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex-1 mb-4 overflow-hidden touch-none">
                <canvas 
                  ref={canvasRef}
                  width={340}
                  height={300}
                  className="w-full h-full cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {!hasSigned && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <span className="text-2xl font-cursive text-gray-500">Sign Here</span>
                  </div>
                )}
              </div>
              <button onClick={clearSignature} className="text-xs text-red-500 underline self-end mb-6">Clear Signature</button>
            </div>

            <button 
              disabled={!hasSigned}
              onClick={() => {
                // Simulate saving signature
                setTimeout(onComplete, 500);
              }}
              className={`w-full py-4 rounded-xl font-semibold shadow-md transition-all ${!hasSigned ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white active:scale-95'}`}
            >
              Activate Service
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-white relative">
      {renderStep()}
      
      {/* Step Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none">
        {[0, 1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? 'w-6 bg-orange-500' : 'w-1.5 bg-gray-200'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
    <span className="text-2xl">{icon}</span>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 leading-tight mt-1">{desc}</p>
    </div>
  </div>
);

export default Onboarding;
