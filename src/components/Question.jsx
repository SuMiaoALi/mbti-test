import React from 'react';

const Question = ({ question, selectedAnswer, onAnswerSelect, questionNumber, totalQuestions }) => {
  return (
    <div className="card animate-slide-up">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{questionNumber}</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">
              问题 {questionNumber}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span className="text-sm text-slate-500 font-medium">
              {questionNumber} / {totalQuestions}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 leading-relaxed mb-2">
          {question.text}
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option.value)}
            className={`question-option group ${
              selectedAnswer === option.value ? 'selected' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="relative flex-shrink-0 mt-1">
                <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  selectedAnswer === option.value
                    ? 'border-indigo-500 bg-indigo-500 scale-110'
                    : 'border-slate-300 group-hover:border-indigo-400'
                }`}>
                  {selectedAnswer === option.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50 animate-scale-in"></div>
                  )}
                </div>
                {selectedAnswer === option.value && (
                  <div className="absolute -inset-1 bg-indigo-500/20 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="flex-1 text-left">
                <span className="text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors duration-300">
                  {option.text}
                </span>
              </div>
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200/60">
        <div className="flex items-center justify-center space-x-2 text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">
            选择最符合您真实情况的选项
          </p>
        </div>
      </div>
    </div>
  );
};

export default Question;