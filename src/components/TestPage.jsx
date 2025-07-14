import React, { useState, useEffect } from 'react';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { questions } from '../data/questions';
import { motion, AnimatePresence } from 'framer-motion';

function TestPage({ userName, onComplete, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [direction, setDirection] = useState(0); // -1: 向左, 1: 向右

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = answers[currentQuestionIndex] !== null;
  const canGoPrev = currentQuestionIndex > 0;

  // 处理选择答案
  const handleAnswerSelect = (answer) => {
    // 保存当前选择的答案
    setSelectedAnswer(answer);
    
    // 显示确认动画
    setShowConfirmation(true);
    
    // 更新答案数组
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    // 自动进入下一题或完成测试
    if (isLastQuestion) {
      // 最后一题，延迟后自动完成测试
      setTimeout(() => {
        onComplete(newAnswers);
      }, 300);
    } else {
      // 不是最后一题，自动跳转到下一题
      setTimeout(() => {
        // 设置过渡方向
        setDirection(1);
        
        // 开始过渡动画
        setIsTransitioning(true);
        
        // 重置确认状态
        setShowConfirmation(false);
        
        // 延迟切换到下一题
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setIsTransitioning(false);
          setSelectedAnswer(null);
        }, 250);
      }, 300);
    }
  };

  // 处理下一题
  const handleNext = () => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      // 完成测试
      onComplete(answers);
    } else {
      // 设置过渡方向
      setDirection(1);
      
      // 开始过渡动画
      setIsTransitioning(true);
      
      // 重置确认状态
      setShowConfirmation(false);
      
      // 延迟切换到下一题，加快速度
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
        setSelectedAnswer(null);
      }, 250);
    }
  };

  // 处理上一题
  const handlePrev = () => {
    if (!canGoPrev) return;
    
    // 设置过渡方向
    setDirection(-1);
    
    // 开始过渡动画
    setIsTransitioning(true);
    
    // 重置确认状态
    setShowConfirmation(false);
    
    // 延迟切换到上一题，加快速度
    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev - 1);
      setIsTransitioning(false);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }, 250);
  };

  // 处理键盘操作
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && canGoNext) {
      handleNext();
    } else if (e.key === 'ArrowLeft' && canGoPrev) {
      handlePrev();
    } else if (e.key === 'ArrowRight' && canGoNext) {
      handleNext();
    }
  };

  // 添加键盘事件监听
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestionIndex, answers, canGoNext, canGoPrev]);

  // 计算进度
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
                <h1 className="text-2xl font-bold gradient-text">MBTI 人格测试</h1>
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
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ 
                  opacity: 0, 
                  x: direction === 1 ? 100 : direction === -1 ? -100 : 0,
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.25, ease: "easeOut" } 
                }}
                exit={{ 
                  opacity: 0, 
                  x: direction === 1 ? -100 : direction === -1 ? 100 : 0,
                  transition: { duration: 0.25, ease: "easeIn" } 
                }}
                className="w-full"
              >
                <Question 
                  question={currentQuestion}
                  selectedAnswer={answers[currentQuestionIndex]}
                  onAnswerSelect={handleAnswerSelect}
                  questionNumber={null} /* 删除问题编号显示 */
                  totalQuestions={questions.length}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* 选择确认动画 */}
            {showConfirmation && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* 导航按钮 - 调整为横向排列 */}
        <div className="flex items-center justify-between mt-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <motion.div whileHover={{ scale: canGoPrev ? 1.03 : 1 }} whileTap={{ scale: canGoPrev ? 0.97 : 1 }}>
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`btn-secondary group py-2 px-4 ${!canGoPrev ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
            >
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>上一题</span>
              </span>
            </button>
          </motion.div>

          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium text-slate-500">{currentQuestionIndex + 1} / {questions.length}</span>
          </div>

          <motion.div whileHover={{ scale: canGoNext ? 1.03 : 1 }} whileTap={{ scale: canGoNext ? 0.97 : 1 }}>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`btn-primary group py-2 px-4 ${!canGoNext ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLastQuestion ? (
                  <>
                    <span>完成测试</span>
                    <svg className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <span>下一题</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </>
                )}
              </span>
            </button>
          </motion.div>
        </div>

        {/* 删除快捷键提示 */}

        {/* 测试进度概览 */}
        <div className="mt-6">
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className={`h-2 rounded-lg transition-all duration-300 ${
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

        {/* 测试提示区域 */}
        <div className="mt-8 space-y-4" style={{marginTop: '30px'}}>
          {/* 主要提示 */}
          <div className="glass-effect rounded-2xl p-6 border border-indigo-200/30">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">💡 答题小贴士</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  请根据您的<span className="font-medium text-indigo-600">第一直觉</span>和<span className="font-medium text-indigo-600">真实感受</span>来选择答案，不要过度思考。最真实的反应往往能反映您最本质的人格特征。
                </p>
              </div>
            </div>
          </div>

          {/* 次要提示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;