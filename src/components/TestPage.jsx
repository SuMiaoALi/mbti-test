import React, { useState, useEffect } from 'react';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { questions } from '../data/questions';

function TestPage({ userName, onComplete, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = answers[currentQuestionIndex] !== null;
  const canGoPrev = currentQuestionIndex > 0;

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      // 完成测试
      onComplete(answers);
    } else {
      // 下一题
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && canGoNext) {
      handleNext();
    } else if (e.key === 'ArrowLeft' && canGoPrev) {
      handlePrev();
    } else if (e.key === 'ArrowRight' && canGoNext) {
      handleNext();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestionIndex, answers, canGoNext, canGoPrev]);

  const answeredCount = answers.filter(answer => answer !== null).length;
  const progressPercentage = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-300/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-l from-amber-300/20 to-yellow-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 dot-pattern opacity-30"></div>
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* 头部信息 */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/30 transform rotate-3 glow-effect">
                <svg className="w-7 h-7 text-white floating-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">MBTI 人格测试</h1>
                <p className="text-slate-600">你好，<span className="font-semibold gradient-text">{userName}</span></p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* 进度条 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">完成进度</span>
              <span className="text-sm font-medium text-slate-800">{answeredCount}/{questions.length}</span>
            </div>
            <div className="h-3 bg-slate-200/70 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 progress-shimmer"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 问题区域 */}
        <div className="card animate-fade-in overflow-hidden">
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
            <Question
              question={currentQuestion}
              selectedAnswer={answers[currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="mt-8 flex justify-between items-center animate-fade-in" style={{animationDelay: '0.2s'}}>
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`btn-secondary group py-3 px-5 ${!canGoPrev ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              上一题
            </span>
          </button>

          <div className="flex items-center space-x-2 text-slate-500">
            <span className="text-sm font-medium">{currentQuestionIndex + 1}</span>
            <div className="w-8 h-0.5 bg-slate-300 rounded-full"></div>
            <span className="text-sm">{questions.length}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`btn-primary group py-3 px-5 ${!canGoNext ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isLastQuestion ? (
                <>
                  完成测试
                  <svg className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </>
              ) : (
                <>
                  下一题
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>

        {/* 快捷键提示 */}
        <div className="mt-8 glass-effect rounded-xl p-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
            <div className="flex items-center space-x-2 hover:text-indigo-500 transition-colors duration-300">
              <kbd className="px-2 py-1 bg-white/80 rounded shadow-sm text-slate-700 font-mono border border-slate-200">←</kbd>
              <span>上一题</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-indigo-500 transition-colors duration-300">
              <kbd className="px-2 py-1 bg-white/80 rounded shadow-sm text-slate-700 font-mono border border-slate-200">→</kbd>
              <span>下一题</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-indigo-500 transition-colors duration-300">
              <kbd className="px-2 py-1 bg-white/80 rounded shadow-sm text-slate-700 font-mono border border-slate-200">Enter</kbd>
              <span>确认</span>
            </div>
          </div>
        </div>

        {/* 测试进度概览 */}
        <div className="mt-6 grid grid-cols-10 gap-2 animate-fade-in" style={{animationDelay: '0.4s'}}>
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-3 rounded-lg transition-all duration-500 ${
                answers[index] !== null
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/25'
                  : index === currentQuestionIndex
                  ? 'bg-gradient-to-r from-indigo-300/70 via-purple-300/70 to-pink-300/70 scale-110 pulse-soft'
                  : 'bg-slate-200/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestPage;