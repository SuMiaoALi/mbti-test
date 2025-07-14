import React, { useState } from 'react';
import Welcome from './components/Welcome';
import NameInput from './components/NameInput';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import { calculateMBTI, validateAnswers } from './utils/calculator';
import { saveTestResult } from './utils/storage';

// 应用状态枚举
const APP_STATES = {
  WELCOME: 'welcome',
  NAME_INPUT: 'nameInput',
  TESTING: 'testing',
  RESULT: 'result'
};

function App() {
  const [currentState, setCurrentState] = useState(APP_STATES.WELCOME);
  const [userName, setUserName] = useState('');
  const [testResult, setTestResult] = useState(null);

  // 开始测试流程
  const handleStart = () => {
    setCurrentState(APP_STATES.NAME_INPUT);
  };

  // 提交用户姓名
  const handleNameSubmit = (name) => {
    setUserName(name);
    setCurrentState(APP_STATES.TESTING);
  };

  // 完成测试
  const handleTestComplete = (answers) => {
    // 验证答案完整性
    if (!validateAnswers(answers)) {
      alert('请完成所有题目后再提交');
      return;
    }

    // 计算MBTI结果
    const result = calculateMBTI(answers);
    setTestResult(result);

    // 保存测试结果到本地存储
    try {
      saveTestResult(result, userName);
    } catch (error) {
      console.error('保存测试结果失败:', error);
    }

    // 跳转到结果页面
    setCurrentState(APP_STATES.RESULT);
  };

  // 重新开始测试
  const handleRestart = () => {
    setCurrentState(APP_STATES.WELCOME);
    setUserName('');
    setTestResult(null);
  };

  // 返回到上一步
  const handleBack = () => {
    switch (currentState) {
      case APP_STATES.NAME_INPUT:
        setCurrentState(APP_STATES.WELCOME);
        break;
      case APP_STATES.TESTING:
        setCurrentState(APP_STATES.NAME_INPUT);
        break;
      case APP_STATES.RESULT:
        setCurrentState(APP_STATES.TESTING);
        break;
      default:
        setCurrentState(APP_STATES.WELCOME);
    }
  };

  // 分享结果
  const handleShare = (result) => {
    // 这里可以添加分享统计或其他逻辑
    console.log('分享结果:', result);
  };

  // 根据当前状态渲染对应组件
  const renderCurrentState = () => {
    switch (currentState) {
      case APP_STATES.WELCOME:
        return <Welcome onStart={handleStart} />;
      
      case APP_STATES.NAME_INPUT:
        return (
          <NameInput 
            onSubmit={handleNameSubmit} 
            onBack={handleBack}
          />
        );
      
      case APP_STATES.TESTING:
        return (
          <TestPage 
            userName={userName}
            onComplete={handleTestComplete}
            onBack={handleBack}
          />
        );
      
      case APP_STATES.RESULT:
        return (
          <ResultPage 
            result={testResult}
            userName={userName}
            onRestart={handleRestart}
            onShare={handleShare}
          />
        );
      
      default:
        return <Welcome onStart={handleStart} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentState()}
    </div>
  );
}

export default App;
