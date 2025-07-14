import React from 'react';

function Welcome({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-300/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-l from-amber-300/20 to-yellow-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 dot-pattern opacity-50"></div>
      </div>
      
      <div className="card max-w-md w-full text-center animate-fade-in relative z-10 hover:shadow-xl">
        <div className="mb-6">
          {/* 图标和标题 */}
          <div className="relative mx-auto mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/30 transform rotate-3 glow-effect">
              <svg className="w-10 h-10 text-white floating-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse-soft shadow-lg shadow-yellow-400/30"></div>
            <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-cyan-400 rounded-full animate-float shadow-lg shadow-cyan-400/30" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          <h1 className="text-4xl font-bold mb-3">
            <span className="gradient-text">MBTI</span>
            <span className="text-slate-800 ml-2">人格测试</span>
          </h1>
          
          <p className="text-slate-600 text-lg font-medium">
            <span className="highlight-container">探索内心世界</span>，发现真实的自己
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          <ul className="space-y-3">
            <li className="flex items-center p-3 bg-white/50 rounded-xl hover:bg-white hover:shadow-md transition-all transform hover:scale-105 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2 rounded-lg mr-3 shadow-md shadow-indigo-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <span className="text-slate-700 font-medium text-sm">1. 科学的16型人格分析体系</span>
            </li>
            <li className="flex items-center p-3 bg-white/50 rounded-xl hover:bg-white hover:shadow-md transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg mr-3 shadow-md shadow-purple-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span className="text-slate-700 font-medium text-sm">2. 快速完成，准确分析</span>
            </li>
            <li className="flex items-center p-3 bg-white/50 rounded-xl hover:bg-white hover:shadow-md transition-all">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-2 rounded-lg mr-3 shadow-md shadow-pink-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <span className="text-slate-700 font-medium text-sm">3. 个性化职业和发展建议</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onStart}
            className="btn-primary w-full py-3 group relative overflow-hidden whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center justify-center text-base">
              开始探索
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </button>
          
          <div className="flex justify-center space-x-8 mt-4">
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-2 rounded-full mb-1">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-xs text-slate-500">约 3-5 分钟完成</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-2 rounded-full mb-1">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-xs text-slate-500">基于 Myers-Briggs 理论</span>
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

export default Welcome;