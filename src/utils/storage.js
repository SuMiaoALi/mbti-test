/**
 * 本地存储管理工具
 */

const STORAGE_KEYS = {
  TEST_RESULTS: 'mbti_test_results',
  USER_DATA: 'mbti_user_data',
  STATISTICS: 'mbti_statistics'
};

/**
 * 保存测试结果
 * @param {Object} result - 测试结果对象
 * @param {string} userName - 用户姓名
 */
export function saveTestResult(result, userName) {
  try {
    const testData = {
      id: generateId(),
      userName,
      result,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // 获取现有结果
    const existingResults = getTestResults();
    existingResults.push(testData);

    // 保存到本地存储
    localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(existingResults));

    // 更新统计数据
    updateStatistics(result.type);

    return testData.id;
  } catch (error) {
    console.error('保存测试结果失败:', error);
    return null;
  }
}

/**
 * 获取所有测试结果
 * @returns {Array} 测试结果数组
 */
export function getTestResults() {
  try {
    const results = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error('获取测试结果失败:', error);
    return [];
  }
}

/**
 * 获取统计数据
 * @returns {Object} 统计数据对象
 */
export function getStatistics() {
  try {
    const stats = localStorage.getItem(STORAGE_KEYS.STATISTICS);
    return stats ? JSON.parse(stats) : initializeStatistics();
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return initializeStatistics();
  }
}

/**
 * 更新统计数据
 * @param {string} personalityType - 人格类型
 */
function updateStatistics(personalityType) {
  try {
    const stats = getStatistics();
    
    // 更新总测试次数
    stats.totalTests++;
    
    // 更新人格类型统计
    if (stats.personalityTypes[personalityType]) {
      stats.personalityTypes[personalityType]++;
    } else {
      stats.personalityTypes[personalityType] = 1;
    }
    
    // 更新最后更新时间
    stats.lastUpdated = new Date().toISOString();
    
    // 保存统计数据
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
  } catch (error) {
    console.error('更新统计数据失败:', error);
  }
}

/**
 * 初始化统计数据
 * @returns {Object} 初始统计数据
 */
function initializeStatistics() {
  return {
    totalTests: 0,
    personalityTypes: {},
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };
}

/**
 * 获取人格类型排行榜
 * @returns {Array} 排序后的人格类型数组
 */
export function getPersonalityRanking() {
  const stats = getStatistics();
  const types = Object.entries(stats.personalityTypes)
    .map(([type, count]) => ({
      type,
      count,
      percentage: ((count / stats.totalTests) * 100).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count);
  
  return types;
}

/**
 * 获取最近的测试结果
 * @param {number} limit - 限制数量
 * @returns {Array} 最近的测试结果
 */
export function getRecentResults(limit = 10) {
  const results = getTestResults();
  return results
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
}

/**
 * 清除所有数据
 */
export function clearAllData() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('清除数据失败:', error);
    return false;
  }
}

/**
 * 导出数据
 * @returns {Object} 所有数据
 */
export function exportData() {
  return {
    results: getTestResults(),
    statistics: getStatistics(),
    exportTime: new Date().toISOString()
  };
}

/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 获取数据大小（KB）
 * @returns {number} 数据大小
 */
export function getDataSize() {
  try {
    let totalSize = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        totalSize += new Blob([data]).size;
      }
    });
    return Math.round(totalSize / 1024 * 100) / 100; // KB
  } catch (error) {
    console.error('计算数据大小失败:', error);
    return 0;
  }
}