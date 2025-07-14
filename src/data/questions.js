import questionsData from './questions.json';
import { TEST_CONFIG } from '../config/testConfig.js';

// 获取当前使用的测试集
const getCurrentTestSet = () => {
  const testSetName = TEST_CONFIG.currentTestSet || 'demo';
  return questionsData.testSets[testSetName];
};

// 导出当前测试集的题目
export const questions = getCurrentTestSet().questions;

// 导出测试集信息
export const testSetInfo = {
  name: getCurrentTestSet().name,
  description: getCurrentTestSet().description,
  questionCount: getCurrentTestSet().questionCount
};

// 导出切换测试集的函数
export const getTestSet = (testSetName) => {
  if (questionsData.testSets[testSetName]) {
    return questionsData.testSets[testSetName];
  }
  return getCurrentTestSet();
};

// 导出所有可用的测试集
export const availableTestSets = Object.keys(questionsData.testSets).map(key => ({
  key,
  ...questionsData.testSets[key]
}));

// 导出配置信息
export { TEST_CONFIG } from '../config/testConfig.js';