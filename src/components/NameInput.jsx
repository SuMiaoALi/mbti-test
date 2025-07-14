import React, { useState, useEffect } from 'react';

function NameInput({ onSubmit, onBack }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // 自动聚焦输入框
  useEffect(() => {
    const timer = setTimeout(() => {
      const inputElement = document.getElementById('name');
      if (inputElement) {
        inputElement.focus();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 验证姓名
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('请输入您的姓名');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('姓名至少需要2个字符');
      return;
    }
    
    if (trimmedName.length > 20) {
      setError('姓名不能超过20个字符');
      return;
    }
    
    // 清除错误并提交
    setError('');
    onSubmit(trimmedName);
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* 背景装饰 - 与Welcome组件保持一致 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-300/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-l from-amber-300/20 to-yellow-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 dot-pattern opacity-50"></div>
      </div>
      
      <div className="card max-w-md w-full animate-fade-in relative z-10 hover:shadow-xl">
        {/* 头部 */}
        <div className="text-center mb-6">
          <div className="relative mx-auto mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/30 transform rotate-3 glow-effect">
              <svg className="w-10 h-10 text-white floating-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse-soft shadow-lg shadow-yellow-400/30"></div>
            <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-cyan-400 rounded-full animate-float shadow-lg shadow-cyan-400/30" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 animate-bounce-in">
            <span className="gradient-text">个性化体验</span>
          </h2>
          <p className="text-slate-600 text-sm font-medium animate-slide-up" style={{animationDelay: '0.2s'}}>
            <span className="highlight-container">输入您的姓名</span>，开启专属测试之旅
          </p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="space-y-2">
            <div className="relative group">
              {/* 输入框外发光效果 */}
              <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-${isFocused || name ? '100' : '0'} transition-opacity duration-300 blur-sm -m-0.5`}></div>
              
              {/* 输入框 */}
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="请输入您的姓名"
                className={`w-full px-6 py-4 border-2 rounded-xl bg-white/80 backdrop-blur-sm relative z-10 text-lg font-medium placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ${error ? 'border-red-300' : 'border-slate-200 hover:border-indigo-300 group-hover:shadow-lg'}`}
                maxLength={20}
              />
              
              {/* 验证成功图标 */}
              {name && !error && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md shadow-green-500/20 animate-scale-in">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>
            
            {/* 错误提示 */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 animate-scale-in">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
          </div>

          {/* 按钮组 */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="btn-secondary flex-1 group py-4"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                </svg>
                返回
              </span>
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 group relative overflow-hidden py-4"
              disabled={!name.trim()}
            >
              <span className="relative z-10 flex items-center justify-center">
                开始测试
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
          </div>
        </form>

        {/* 隐私提示 */}
        <div className="mt-8 p-6 glass-effect rounded-2xl border border-indigo-200/30 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">隐私保护承诺</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                您的姓名仅用于生成个性化测试报告，我们承诺不会收集、存储或分享您的任何个人信息。
              </p>
            </div>
          </div>
        </div>
        
        {/* 底部信息 */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 opacity-70">
          <div className="text-center text-xs text-slate-400">
            © 2025 MBTI 人格测试
          </div>
        </div>
      </div>
    </div>
  );
}

export default NameInput;