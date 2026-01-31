import React, { useState, useEffect } from 'react';
import { Card, Button } from './Components';
import { ModelConfig } from './ModelConfig';

// Full list of students provided (Unaccented / English alphabet)
const STUDENTS = [
  "Hoa Quang An", "Pham Quynh Anh", "Ha Thi Minh Anh", "Cao Nguyen Quynh Anh", "Tran Nguyet Anh",
  "Hoa Gia Binh", "Hoang Van Cong Chinh", "Nguyen Manh Cuong", "Tran Thi Dung", "Nguyen Thanh Dat",
  "Nguyen Phuc Dien", "Nguyen Trung Duc", "Nguyen Le Gia Han", "Nguyen Phuong Hien", "Nguyen Hoang Gia Huynh",
  "Duong Gia Hung", "Dinh Van Hung", "Le Dinh Khoi", "Nguyen Thi Ngoc Lan", "Huynh Dang Khanh Linh",
  "Pham Vu Thuy Linh", "Nguyen Bui Yen Linh", "Dang Hoang Long", "Nguyen Khanh Ly", "Tran Hoang Minh",
  "Tran Nu Nguyet Nga", "Tran Nhu Ngoc", "Le Thi Nhu Ngoc", "Tran Nu Bao Ngoc", "Tran Hoang Nguyen",
  "Nguyen Thao Nguyen", "Phan Duy Nguyen", "Nguyen Thi Thanh Nhan", "Bui Thien Nhan", "Nguyen Ngoc Uyen Nhi",
  "Vu Nguyen Tue Nhi", "Nguyen Hoang Tam Nhu", "Le Kim Phat", "Nguyen Ba Phi", "Dinh Xuan Hoang Phuc",
  "Ta Pham Minh Phuc", "Tran Huu Quang", "Nguyen Tien Sang", "Tran Minh Thong", "Vu Le Phuong Thuy",
  "Vo Bao Thuy", "Nguyen Anh Thu", "Le Trinh Anh Thu", "Pham Anh Thu", "Nguyen Thuy Tien",
  "Nguyen Phuong Uyen", "Vu Thi Ha Vy"
];

interface Props {
  onLogin: (name: string, apiKey: string, model: string) => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-3-pro-preview');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Auto-fill from local storage if available
  useEffect(() => {
    const storedKey = localStorage.getItem('lingua_api_key');
    if (storedKey) setApiKey(storedKey);
    
    const storedModel = localStorage.getItem('lingua_model');
    if (storedModel) setSelectedModel(storedModel);
  }, []);

  const filteredStudents = STUDENTS.filter(student => 
    student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogin = () => {
    if (!apiKey.trim()) {
        alert("Please enter a valid Gemini API Key to continue.");
        return;
    }
    if (!selectedStudent) {
        alert("Please select your name from the list.");
        return;
    }
    onLogin(selectedStudent, apiKey, selectedModel);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white flex flex-col items-center justify-center p-4 font-sans relative">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-in-up z-10 my-auto">
        
        {/* Left Column: Config */}
        <div className="space-y-6">
            <div className="text-left md:text-left text-center">
                <div className="inline-block w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 mb-4">
                    <i className="fas fa-shapes text-3xl"></i>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Welcome Class!</h1>
                <p className="text-base text-gray-500 font-medium">Setup your AI connection & identity.</p>
                <div className="mt-4">
                    <a href="https://aistudio.google.com/api-keys" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                        <i className="fas fa-key"></i> Lấy API key miễn phí tại đây
                    </a>
                </div>
            </div>

            <Card className="!rounded-3xl border border-white/60 shadow-xl backdrop-blur-xl bg-white/80">
                <ModelConfig 
                    apiKey={apiKey}
                    onApiKeyChange={setApiKey}
                    selectedModel={selectedModel}
                    onSelectModel={setSelectedModel}
                />
            </Card>
        </div>

        {/* Right Column: Student Selection */}
        <Card className="!p-0 !rounded-3xl border border-white/60 shadow-xl backdrop-blur-xl bg-white/80 overflow-visible h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10 rounded-t-3xl">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">3. Chọn Tên Học Sinh</label>
                <div className="relative group">
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-blue-500 transition-colors"></i>
                    <input 
                        type="text" 
                        placeholder="Tìm tên của bạn..." 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all text-base font-medium placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-transparent p-3 space-y-2 min-h-[300px] max-h-[500px]">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedStudent(student)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 border-2 ${
                                selectedStudent === student 
                                ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-100' 
                                : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors shrink-0 ${
                                selectedStudent === student
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                                {student.charAt(0)}
                            </div>
                            <span className={`font-semibold text-sm ${selectedStudent === student ? 'text-blue-700' : 'text-gray-700'}`}>{student}</span>
                            {selectedStudent === student && (
                                <div className="ml-auto text-blue-500">
                                    <i className="fas fa-check-circle text-lg"></i>
                                </div>
                            )}
                        </button>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-400">
                        <p className="text-sm font-medium">No student found.</p>
                    </div>
                )}
            </div>
            
            {/* Login Action Area */}
            <div className="p-6 bg-white border-t border-gray-100 rounded-b-3xl relative z-20">
                <Button 
                    onClick={handleLogin} 
                    className="w-full py-4 text-lg shadow-xl shadow-blue-500/20"
                    disabled={!selectedStudent || !apiKey.trim()}
                >
                    Start Learning <i className="fas fa-arrow-right ml-2"></i>
                </Button>
            </div>
        </Card>
      </div>

      <footer className="mt-8 py-4 text-center text-orange-600 text-[10px] font-bold uppercase tracking-widest opacity-80">
        DEVELOPED BY TEACHER VO THI THU HA - TRAN HUNG DAO HIGH SCHOOL - LAM DONG
      </footer>
    </div>
  );
};

export default LoginScreen;