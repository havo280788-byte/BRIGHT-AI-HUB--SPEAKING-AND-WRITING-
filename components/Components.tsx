import React from 'react';

// --- Card Component ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title }) => (
  <div className={`bg-white rounded-[2rem] shadow-soft border border-white/50 overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}>
    {title && (
      <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30">
        <h3 className="font-bold text-xl text-gray-800 tracking-tight">{title}</h3>
      </div>
    )}
    <div className="p-8">{children}</div>
  </div>
);

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading, className = '', ...props }) => {
  const baseStyle = "px-8 py-3.5 rounded-2xl text-lg font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-sm";

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5",
    secondary: "bg-white text-gray-700 border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200",
    outline: "border-2 border-blue-500 text-blue-600 hover:bg-blue-50",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <>
          <i className="fas fa-circle-notch fa-spin"></i> Processing...
        </>
      ) : children}
    </button>
  );
};

// --- Score Circle ---
export const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const getColor = (s: number) => {
    if (s >= 8.0) return 'text-green-500 border-green-500 bg-green-50';
    if (s >= 6.0) return 'text-blue-500 border-blue-500 bg-blue-50';
    if (s >= 4.0) return 'text-yellow-500 border-yellow-500 bg-yellow-50';
    return 'text-red-500 border-red-500 bg-red-50';
  };

  return (
    <div className={`w-32 h-32 rounded-full border-[6px] flex items-center justify-center ${getColor(score)} shadow-inner transition-all duration-500 transform hover:scale-105`}>
      <span className="text-5xl font-extrabold tracking-tighter">{score.toFixed(1)}</span>
    </div>
  );
};

// --- Score Breakdown ---
export const ScoreBreakdown: React.FC<{ breakdown: Record<string, number>; max?: number }> = ({ breakdown, max = 10 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
    {Object.entries(breakdown).map(([key, value]) => {
      const val = value as number;
      return (
        <div key={key} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between text-sm font-bold text-gray-500 mb-3 uppercase tracking-wide">
            <span>{key}</span>
            <span className="text-gray-800 text-base">{val}/{max}</span>
          </div>
          <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden p-[2px]">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${val >= max * 0.8 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                  val >= max * 0.5 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                    'bg-gradient-to-r from-yellow-400 to-yellow-500'
                }`}
              style={{ width: `${(val / max) * 100}%` }}
            ></div>
          </div>
        </div>
      );
    })}
  </div>
);

// --- Rubric Feedback Card (Chi tiết chấm điểm theo rubric) ---
interface RubricFeedbackItem {
  criterion: string;
  score: number;
  maxScore: number;
  feedback: string;
  suggestions: string[];
}

const getCriterionIcon = (criterion: string) => {
  switch (criterion.toLowerCase()) {
    case 'content': return 'fa-lightbulb';
    case 'language': return 'fa-language';
    case 'pronunciation': return 'fa-volume-up';
    case 'fluency': return 'fa-water';
    default: return 'fa-star';
  }
};

const getCriterionColor = (criterion: string) => {
  switch (criterion.toLowerCase()) {
    case 'content': return { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-400 to-purple-500' };
    case 'language': return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-400 to-blue-500' };
    case 'pronunciation': return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-400 to-orange-500' };
    case 'fluency': return { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', gradient: 'from-teal-400 to-teal-500' };
    default: return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', gradient: 'from-gray-400 to-gray-500' };
  }
};

export const RubricFeedbackCard: React.FC<{ rubricFeedback: RubricFeedbackItem[] }> = ({ rubricFeedback }) => (
  <div className="space-y-6">
    <h4 className="text-xl font-bold text-gray-800 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
        <i className="fas fa-clipboard-check"></i>
      </div>
      Chấm Điểm Chi Tiết Theo Rubric
    </h4>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {rubricFeedback.map((item, idx) => {
        const colors = getCriterionColor(item.criterion);
        const percentage = (item.score / item.maxScore) * 100;

        return (
          <div
            key={idx}
            className={`${colors.bg} rounded-2xl border ${colors.border} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center ${colors.text}`}>
                  <i className={`fas ${getCriterionIcon(item.criterion)} text-xl`}></i>
                </div>
                <div>
                  <h5 className="font-bold text-gray-800 text-lg">{item.criterion}</h5>
                  <p className="text-sm text-gray-500">Tiêu chí đánh giá</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-extrabold ${colors.text}`}>
                  {item.score}
                  <span className="text-lg text-gray-400 font-normal">/{item.maxScore}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-3 w-full bg-white rounded-full overflow-hidden mb-4 shadow-inner">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            {/* Feedback */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <p className="text-gray-700 leading-relaxed">{item.feedback}</p>
            </div>

            {/* Suggestions */}
            {item.suggestions && item.suggestions.length > 0 && (
              <div className="space-y-2">
                <p className={`text-sm font-bold ${colors.text} uppercase tracking-wide flex items-center gap-2`}>
                  <i className="fas fa-magic"></i> Gợi Ý Cải Thiện
                </p>
                <ul className="space-y-2">
                  {item.suggestions.map((suggestion, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-gray-600 text-sm bg-white rounded-lg p-3 shadow-sm">
                      <span className={`w-5 h-5 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`}>
                        {sIdx + 1}
                      </span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// --- Detailed Errors Section ---
interface DetailedError {
  original: string;
  correction: string;
  explanation: string;
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'coherence';
}

export const DetailedErrorsSection: React.FC<{ errors: DetailedError[] }> = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'grammar': return { icon: 'fa-spell-check', bg: 'bg-red-50', text: 'text-red-600', label: 'Ngữ pháp' };
      case 'vocabulary': return { icon: 'fa-book', bg: 'bg-blue-50', text: 'text-blue-600', label: 'Từ vựng' };
      case 'pronunciation': return { icon: 'fa-volume-up', bg: 'bg-orange-50', text: 'text-orange-600', label: 'Phát âm' };
      case 'coherence': return { icon: 'fa-link', bg: 'bg-purple-50', text: 'text-purple-600', label: 'Mạch lạc' };
      default: return { icon: 'fa-exclamation-circle', bg: 'bg-gray-50', text: 'text-gray-600', label: 'Khác' };
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-gray-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        Các Lỗi Cần Sửa
      </h4>

      <div className="space-y-4">
        {errors.map((error, idx) => {
          const typeInfo = getTypeInfo(error.type);
          return (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${typeInfo.bg} ${typeInfo.text} flex items-center justify-center shrink-0`}>
                  <i className={`fas ${typeInfo.icon}`}></i>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeInfo.bg} ${typeInfo.text}`}>
                      {typeInfo.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="line-through text-red-500 bg-red-50 px-3 py-1.5 rounded-lg font-medium">
                      {error.original}
                    </span>
                    <i className="fas fa-arrow-right text-gray-400"></i>
                    <span className="text-green-600 bg-green-50 px-3 py-1.5 rounded-lg font-medium">
                      {error.correction}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm bg-gray-50 rounded-lg p-3">
                    <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                    {error.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};