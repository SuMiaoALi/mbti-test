// 测试配置文件
// 可以通过修改这个文件来切换不同的测试集

export const TEST_CONFIG = {
  // 当前使用的测试集
  // 可选值: 'demo' (3题快速体验版) 或 'full' (20题完整版)
  currentTestSet: 'full',
  
  // 是否显示测试集选择器（未来功能）
  showTestSetSelector: false,
  
  // 测试集描述
  testSets: {
    demo: {
      name: '快速体验版',
      description: '3道题目的快速MBTI体验测试',
      questionCount: 3,
      estimatedTime: '1分钟'
    },
    full: {
      name: '完整版MBTI测试',
      description: '20道题目的完整MBTI人格测试',
      questionCount: 20,
      estimatedTime: '5-8分钟'
    }
  }
};

// 获取当前测试集配置
export const getCurrentTestConfig = () => {
  return TEST_CONFIG.testSets[TEST_CONFIG.currentTestSet] || TEST_CONFIG.testSets.demo;
};