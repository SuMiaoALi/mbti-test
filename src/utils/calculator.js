import { personalities } from '../data/personalities.js';

/**
 * 计算MBTI人格类型
 * @param {Array} answers - 用户的答案数组
 * @returns {Object} 包含人格类型和详细信息的对象
 */
export function calculateMBTI(answers) {
  // 初始化各维度计数
  const scores = {
    E: 0, I: 0,  // 外向/内向
    S: 0, N: 0,  // 感觉/直觉
    T: 0, F: 0,  // 思考/情感
    J: 0, P: 0   // 判断/知觉
  };

  // 统计各维度得分
  answers.forEach(answer => {
    if (answer && scores.hasOwnProperty(answer)) {
      scores[answer]++;
    }
  });

  // 确定每个维度的倾向
  const type = [
    scores.E >= scores.I ? 'E' : 'I',
    scores.S >= scores.N ? 'S' : 'N',
    scores.T >= scores.F ? 'T' : 'F',
    scores.J >= scores.P ? 'J' : 'P'
  ].join('');

  // 计算各维度的倾向强度（百分比）
  const preferences = {
    EI: {
      preference: scores.E >= scores.I ? 'E' : 'I',
      strength: Math.round((Math.max(scores.E, scores.I) / (scores.E + scores.I)) * 100)
    },
    SN: {
      preference: scores.S >= scores.N ? 'S' : 'N',
      strength: Math.round((Math.max(scores.S, scores.N) / (scores.S + scores.N)) * 100)
    },
    TF: {
      preference: scores.T >= scores.F ? 'T' : 'F',
      strength: Math.round((Math.max(scores.T, scores.F) / (scores.T + scores.F)) * 100)
    },
    JP: {
      preference: scores.J >= scores.P ? 'J' : 'P',
      strength: Math.round((Math.max(scores.J, scores.P) / (scores.J + scores.P)) * 100)
    }
  };

  return {
    type,
    personality: personalities[type],
    scores,
    preferences,
    timestamp: new Date().toISOString()
  };
}

/**
 * 获取维度描述
 * @param {string} dimension - 维度代码 (EI, SN, TF, JP)
 * @returns {Object} 维度描述对象
 */
export function getDimensionDescription(dimension) {
  const descriptions = {
    EI: {
      name: "能量来源",
      E: { name: "外向 (Extraversion)", description: "从外部世界获得能量，喜欢与人交往" },
      I: { name: "内向 (Introversion)", description: "从内心世界获得能量，喜欢独处思考" }
    },
    SN: {
      name: "信息收集",
      S: { name: "感觉 (Sensing)", description: "关注具体事实和细节，相信经验" },
      N: { name: "直觉 (Intuition)", description: "关注整体概念和可能性，相信灵感" }
    },
    TF: {
      name: "决策方式",
      T: { name: "思考 (Thinking)", description: "基于逻辑和客观分析做决定" },
      F: { name: "情感 (Feeling)", description: "基于价值观和他人感受做决定" }
    },
    JP: {
      name: "生活方式",
      J: { name: "判断 (Judging)", description: "喜欢有计划、有条理的生活" },
      P: { name: "知觉 (Perceiving)", description: "喜欢灵活、随性的生活" }
    }
  };

  return descriptions[dimension];
}

/**
 * 获取强度描述
 * @param {number} strength - 强度百分比
 * @returns {string} 强度描述
 */
export function getStrengthDescription(strength) {
  if (strength >= 80) return "非常明显";
  if (strength >= 70) return "明显";
  if (strength >= 60) return "中等";
  if (strength >= 55) return "轻微";
  return "平衡";
}

/**
 * 验证答案完整性
 * @param {Array} answers - 答案数组
 * @param {number} totalQuestions - 总题目数
 * @returns {boolean} 是否完整
 */
export function validateAnswers(answers, totalQuestions = 20) {
  return answers.length === totalQuestions && answers.every(answer => answer !== null && answer !== undefined);
}