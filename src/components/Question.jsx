import React, { useState } from 'react';

const Question = ({ question, selectedAnswer, onAnswerSelect, questionNumber, totalQuestions }) => {
  const [animateSelection, setAnimateSelection] = useState(false);
  
  const handleOptionSelect = (value) => {
    // 如果已经选择了这个选项，不做任何操作
    if (selectedAnswer === value) return;
    
    // 设置动画标志
    setAnimateSelection(true);
    
    // 选择新选项
    onAnswerSelect(value);
    
    // 动画结束后重置标志
    setTimeout(() => {
      setAnimateSelection(false);
    }, 300);
  };
  
  return (
    <div className="card glass-card animate-fade-in shadow-xl relative overflow-hidden">
      {/* 装饰元素 */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-indigo-600/20 rounded-full blur-xl"></div>
      
      {/* 问题头部 */}
      <div className="mb-8 relative z-10">
        <h3 className="text-xl font-bold text-slate-800 leading-relaxed mb-3 animate-slide-up" style={{animationDelay: '0.1s'}}>
          {question.text}
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-sm"></div>
      </div>

      {/* 选项列表 - 按钮风格设计 */}
      <div className="space-y-4 relative z-10">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option.value;
          
          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(option.value)}
              className={`w-full transition-all duration-300 relative overflow-hidden group ${
                isSelected
                  ? 'btn-primary transform scale-[1.02] shadow-xl'
                  : 'btn-secondary hover:shadow-lg hover:scale-[1.01]'
              }`}
              style={{
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: isSelected ? '600' : '500',
                textAlign: 'left',
                justifyContent: 'flex-start'
              }}
            >
              {/* 选中状态的装饰效果 */}
              {isSelected && (
                <>
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/20 rounded-full blur-md"></div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 rounded-full blur-md"></div>
                </>
              )}
              
              <div className="flex items-center relative z-10 w-full">
                {/* 选项内容 */}
                <span className="flex-grow text-left">
                  {option.text}
                </span>
                
                {/* 选中指示器 */}
                {isSelected && (
                  <div className="flex-shrink-0 ml-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* 未选中时的箭头指示器 */}
                {!isSelected && (
                  <div className="flex-shrink-0 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* 选中动画效果 */}
              {isSelected && animateSelection && (
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ripple"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;