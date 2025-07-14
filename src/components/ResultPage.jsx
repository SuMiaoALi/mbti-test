import React, { useEffect, useState } from 'react';
import { getDimensionDescription, getStrengthDescription } from '../utils/calculator';

const ResultPage = ({ result, userName, onRestart, onShare }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { type, personality, preferences } = result;

  useEffect(() => {
    // 延迟显示详细信息，增加动画效果
    const timer = setTimeout(() => setShowDetails(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const shareText = `我刚完成了MBTI人格测试，我的类型是${type} - ${personality.name}（${personality.nickname}）！${personality.description}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MBTI人格测试结果',
        text: shareText,
        url: window.location.href
      });
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(shareText).then(() => {
        alert('结果已复制到剪贴板！');
      });
    }
    onShare && onShare(result);
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/5 to-pink-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* 庆祝动画和结果卡片 */}
        <div className="card mb-8 text-center animate-fade-in relative overflow-hidden">
          {/* 庆祝装饰 */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="pt-8 mb-8">
            <div className="relative mx-auto mb-6">
              <div className={`w-32 h-32 bg-gradient-to-br ${personality.color} rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/25 transform rotate-3 animate-scale-in`}>
                <span className="text-4xl font-bold text-white">{type}</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text">{personality.name}</span>
              </h1>
              <p className="text-xl text-slate-600 font-medium">
                {personality.nickname}
              </p>
              <p className="text-slate-700 leading-relaxed text-lg max-w-2xl mx-auto">
                {personality.description}
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="font-bold text-slate-800 text-lg">测试者：{userName}</p>
            </div>
          </div>
        </div>

        {/* 维度分析 */}
        {showDetails && (
          <div className="grid md:grid-cols-2 gap-6 mb-8 animate-slide-up">
            {Object.entries(preferences).map(([dimension, data]) => {
              const desc = getDimensionDescription(dimension);
              const strengthDesc = getStrengthDescription(data.strength);
              
              return (
                <div key={dimension} className="card group hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{dimension}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{desc.name}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-semibold text-indigo-600">
                      {desc[data.preference].name}
                    </span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-slate-800">{data.strength}%</span>
                      <p className="text-xs text-slate-500">{strengthDesc}</p>
                    </div>
                  </div>
                  
                  <div className="progress-bar mb-4">
                    <div
                      className="progress-fill"
                      style={{ width: `${data.strength}%` }}
                    />
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {desc[data.preference].description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* 详细特征 */}
        {showDetails && (
          <div className="grid md:grid-cols-2 gap-6 mb-8 animate-slide-up">
            <div className="card group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 text-lg">主要优势</h3>
              </div>
              <div className="space-y-3">
                {personality.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50/50 rounded-xl group-hover:bg-green-50 transition-colors duration-300">
                    <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 text-lg">需要注意</h3>
              </div>
              <div className="space-y-3">
                {personality.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50/50 rounded-xl group-hover:bg-orange-50 transition-colors duration-300">
                    <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 性格特征 */}
        {showDetails && (
          <div className="card mb-8 animate-slide-up group hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-lg">典型特征</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {personality.traits.map((trait, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-slate-700 font-medium">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 适合职业 */}
        {showDetails && (
          <div className="card mb-8 animate-slide-up group hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-lg">适合的职业方向</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {personality.careers.map((career, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-xl text-sm font-semibold hover:from-purple-200 hover:to-pink-200 transition-all duration-300 cursor-default"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
          <button
            onClick={handleShare}
            className="btn-primary flex-1 group text-lg py-4"
          >
            <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            分享我的结果
          </button>
          
          <button
            onClick={onRestart}
            className="btn-secondary flex-1 group text-lg py-4"
          >
            <svg className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            重新测试
          </button>
        </div>

        {/* 免责声明 */}
        <div className="glass-effect rounded-2xl p-6 border border-amber-200/30">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">免责声明</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                此测试结果仅供参考，不能作为专业心理评估的替代。MBTI理论有其局限性，人格是复杂多面的，会随时间和环境变化。建议将结果作为自我了解的起点，而非绝对标准。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;