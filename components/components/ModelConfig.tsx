import React from 'react';
import { AI_MODELS } from '../types';

interface Props {
  selectedModel: string;
  onSelectModel: (id: string) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export const ModelConfig: React.FC<Props> = ({ selectedModel, onSelectModel, apiKey, onApiKeyChange }) => {
  return (
    <div className="space-y-6">
       {/* 1. Model Selection */}
       <div>
         <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">1. Chọn Model AI</label>
         <div className="grid grid-cols-3 gap-3">
            {AI_MODELS.map((model) => (
                <button
                   key={model.id}
                   onClick={() => onSelectModel(model.id)}
                   className={`relative p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 group hover:shadow-lg ${
                       selectedModel === model.id 
                       ? `${model.borderColor} ${model.bgColor} ring-2 ring-offset-2 ring-blue-300`
                       : 'border-gray-100 bg-white hover:border-blue-200'
                   }`}
                >
                    {model.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10">
                            {model.badge}
                        </div>
                    )}
                    <div className={`text-2xl mb-1 ${selectedModel === model.id ? model.color : 'text-gray-400 group-hover:text-gray-600'}`}>
                        <i className={`fas ${model.icon}`}></i>
                    </div>
                    <div className="font-bold text-gray-800 text-sm leading-tight">{model.name}</div>
                    <div className="text-[10px] text-gray-500 font-medium leading-tight">{model.desc}</div>
                </button>
            ))}
         </div>
         <p className="text-center text-xs text-gray-400 mt-3 font-medium">
            <i className="fas fa-info-circle mr-1"></i>
            Nếu model gặp lỗi, hệ thống tự động chuyển sang model khác
         </p>
       </div>

       {/* 2. API Key */}
       <div>
         <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">2. API Key</label>
         <div className="relative group">
            <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
            <input 
                type="password" 
                placeholder="Dán mã API Key của bạn vào đây..." 
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all font-medium placeholder-gray-400 shadow-sm text-sm"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
            />
         </div>
       </div>
    </div>
  );
};
