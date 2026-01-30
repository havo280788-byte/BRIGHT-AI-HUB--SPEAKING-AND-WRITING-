import React from 'react';
import { ModelConfig } from './ModelConfig';
import { Button } from './Components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  selectedModel: string;
  setModel: (model: string) => void;
  onSave: () => void;
}

export const SettingsModal: React.FC<Props> = ({ 
    isOpen, onClose, apiKey, setApiKey, selectedModel, setModel, onSave 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
       <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative z-10 animate-fade-in-up overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
                    <i className="fas fa-cog fa-spin-slow"></i>
                </div>
                <div>
                    <h3 className="text-xl font-extrabold text-gray-900">Thiết lập Model & API Key</h3>
                    <p className="text-sm text-gray-500 font-medium">Cấu hình AI cho ứng dụng của bạn</p>
                </div>
             </div>
             <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 flex items-center justify-center transition-colors">
                <i className="fas fa-times"></i>
             </button>
          </div>

          {/* Body */}
          <div className="p-8">
             <ModelConfig 
                apiKey={apiKey}
                onApiKeyChange={setApiKey}
                selectedModel={selectedModel}
                onSelectModel={setModel}
             />
             
             <div className="mt-8">
                <Button onClick={onSave} className="w-full py-4 text-lg shadow-xl shadow-blue-600/20">
                    <i className="fas fa-save mr-2"></i> Lưu và Tiếp tục
                </Button>
             </div>
          </div>
       </div>
    </div>
  );
};
