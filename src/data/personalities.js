export const personalities = {
  INTJ: {
    name: "建筑师",
    nickname: "策略家",
    description: "富有想象力和战略性的思想家，一切皆在计划之中。",
    traits: [
      "独立自主，有强烈的个人愿景",
      "善于长期规划和战略思考",
      "追求知识和能力的提升",
      "在复杂问题面前保持冷静"
    ],
    strengths: ["战略思维", "独立性", "决心", "想象力"],
    weaknesses: ["过于批判", "缺乏耐心", "过分自信"],
    careers: ["科学家", "工程师", "建筑师", "战略顾问"],
    color: "from-purple-600 to-indigo-600"
  },
  
  INTP: {
    name: "逻辑学家",
    nickname: "思想家",
    description: "具有创新精神的发明家，对知识有着不可抑制的渴望。",
    traits: [
      "热爱理论和抽象概念",
      "独立思考，不受传统束缚",
      "追求逻辑的完美和一致性",
      "对感兴趣的领域极其专注"
    ],
    strengths: ["分析能力", "创造力", "客观性", "求知欲"],
    weaknesses: ["缺乏实用性", "健忘", "缺乏耐心"],
    careers: ["研究员", "哲学家", "程序员", "数学家"],
    color: "from-blue-600 to-purple-600"
  },

  ENTJ: {
    name: "指挥官",
    nickname: "领导者",
    description: "大胆、富有想象力、意志强烈的领导者，总能找到或创造解决方法。",
    traits: [
      "天生的领导者和组织者",
      "善于制定和执行长期计划",
      "高效率，追求卓越",
      "勇于承担责任和挑战"
    ],
    strengths: ["领导力", "自信", "战略思维", "效率"],
    weaknesses: ["不耐烦", "傲慢", "缺乏同理心"],
    careers: ["CEO", "律师", "管理顾问", "企业家"],
    color: "from-red-600 to-orange-600"
  },

  ENTP: {
    name: "辩论家",
    nickname: "发明家",
    description: "聪明好奇的思想家，无法抗拒智力上的挑战。",
    traits: [
      "充满创意和想象力",
      "善于发现新的可能性",
      "热爱辩论和智力挑战",
      "适应性强，思维敏捷"
    ],
    strengths: ["创新能力", "热情", "多才多艺", "魅力"],
    weaknesses: ["缺乏专注", "缺乏耐心", "过分争论"],
    careers: ["创业家", "营销专家", "记者", "发明家"],
    color: "from-orange-600 to-yellow-600"
  },

  INFJ: {
    name: "提倡者",
    nickname: "理想主义者",
    description: "安静而神秘，同时鼓舞他人的理想主义者。",
    traits: [
      "富有同情心和洞察力",
      "追求意义和目的",
      "善于理解他人的情感",
      "坚持自己的价值观"
    ],
    strengths: ["洞察力", "理想主义", "决心", "创造力"],
    weaknesses: ["过于敏感", "完美主义", "容易倦怠"],
    careers: ["心理咨询师", "作家", "社工", "艺术家"],
    color: "from-green-600 to-teal-600"
  },

  INFP: {
    name: "调停者",
    nickname: "梦想家",
    description: "诗意、善良、利他的人，总是热切地为美好事业而努力。",
    traits: [
      "忠于自己的价值观",
      "富有创造力和想象力",
      "善解人意，富有同情心",
      "追求个人成长和自我实现"
    ],
    strengths: ["创造力", "同理心", "开放性", "热情"],
    weaknesses: ["过于理想化", "缺乏实用性", "容易受伤"],
    careers: ["艺术家", "心理学家", "作家", "社会工作者"],
    color: "from-pink-600 to-purple-600"
  },

  ENFJ: {
    name: "主人公",
    nickname: "教育家",
    description: "富有魅力、鼓舞人心的领导者，能够吸引听众。",
    traits: [
      "天生的领导者和导师",
      "善于激励和鼓舞他人",
      "富有同情心和理解力",
      "追求和谐与合作"
    ],
    strengths: ["领导力", "同理心", "沟通能力", "利他主义"],
    weaknesses: ["过于理想化", "过分敏感", "缺乏客观性"],
    careers: ["教师", "心理咨询师", "政治家", "人力资源"],
    color: "from-emerald-600 to-green-600"
  },

  ENFP: {
    name: "竞选者",
    nickname: "激励者",
    description: "热情、有创造力、社交能力强，总能找到微笑的理由。",
    traits: [
      "充满热情和活力",
      "善于发现人和事物的潜力",
      "富有创造力和想象力",
      "重视人际关系和情感连接"
    ],
    strengths: ["热情", "创造力", "社交能力", "乐观"],
    weaknesses: ["缺乏专注", "过分情绪化", "缺乏实用性"],
    careers: ["记者", "演员", "心理学家", "销售"],
    color: "from-yellow-600 to-orange-600"
  },

  ISTJ: {
    name: "物流师",
    nickname: "检查员",
    description: "实用主义的逻辑学家，可靠性无人能及。",
    traits: [
      "注重细节和准确性",
      "遵守规则和传统",
      "责任心强，值得信赖",
      "喜欢有序和稳定的环境"
    ],
    strengths: ["可靠性", "实用性", "勤奋", "责任心"],
    weaknesses: ["固执", "缺乏灵活性", "过于严肃"],
    careers: ["会计师", "审计员", "管理员", "工程师"],
    color: "from-slate-600 to-gray-600"
  },

  ISFJ: {
    name: "守护者",
    nickname: "保护者",
    description: "非常专注、温暖的守护者，时刻准备保护爱的人。",
    traits: [
      "关心他人的福祉",
      "忠诚可靠，值得信赖",
      "注重细节和他人需求",
      "喜欢和谐稳定的环境"
    ],
    strengths: ["可靠性", "耐心", "想象力", "观察力"],
    weaknesses: ["过于谦逊", "压抑感情", "缺乏自信"],
    careers: ["护士", "教师", "社工", "人力资源"],
    color: "from-blue-500 to-indigo-500"
  },

  ESTJ: {
    name: "总经理",
    nickname: "监督者",
    description: "出色的管理者，在管理事物或人员方面无与伦比。",
    traits: [
      "天生的组织者和领导者",
      "注重效率和结果",
      "遵守规则和传统",
      "善于制定和执行计划"
    ],
    strengths: ["领导力", "组织能力", "实用性", "意志力"],
    weaknesses: ["固执", "缺乏耐心", "过于严厉"],
    careers: ["管理者", "律师", "法官", "军官"],
    color: "from-red-500 to-pink-500"
  },

  ESFJ: {
    name: "执政官",
    nickname: "供给者",
    description: "极有同情心、受欢迎、总是热心帮助他人。",
    traits: [
      "关心他人的感受和需求",
      "善于营造和谐的氛围",
      "忠诚可靠，乐于助人",
      "重视传统和社会规范"
    ],
    strengths: ["同理心", "社交能力", "可靠性", "实用性"],
    weaknesses: ["过于敏感", "缺乏创新", "避免冲突"],
    careers: ["护士", "教师", "销售", "客服"],
    color: "from-pink-500 to-rose-500"
  },

  ISTP: {
    name: "鉴赏家",
    nickname: "手艺人",
    description: "大胆而实际的实验家，擅长使用各种工具。",
    traits: [
      "善于解决实际问题",
      "喜欢动手操作和实验",
      "独立自主，适应性强",
      "冷静客观，逻辑清晰"
    ],
    strengths: ["实用性", "灵活性", "危机处理", "效率"],
    weaknesses: ["缺乏耐心", "冷漠", "固执"],
    careers: ["工程师", "技师", "飞行员", "外科医生"],
    color: "from-gray-600 to-slate-600"
  },

  ISFP: {
    name: "探险家",
    nickname: "艺术家",
    description: "灵活、迷人的艺术家，时刻准备探索新的可能性。",
    traits: [
      "富有艺术天赋和审美能力",
      "善良温和，富有同情心",
      "重视个人价值和自由",
      "喜欢和谐美好的环境"
    ],
    strengths: ["艺术性", "同理心", "灵活性", "想象力"],
    weaknesses: ["过于敏感", "缺乏规划", "竞争力不足"],
    careers: ["艺术家", "音乐家", "设计师", "心理咨询师"],
    color: "from-purple-500 to-pink-500"
  },

  ESTP: {
    name: "企业家",
    nickname: "表演者",
    description: "聪明、精力充沛、善于感知的人，真正享受生活。",
    traits: [
      "活力充沛，善于社交",
      "适应性强，反应敏捷",
      "实用主义，注重当下",
      "善于处理危机和压力"
    ],
    strengths: ["适应性", "实用性", "社交能力", "乐观"],
    weaknesses: ["缺乏耐心", "冲动", "缺乏长远规划"],
    careers: ["销售", "企业家", "演员", "运动员"],
    color: "from-orange-500 to-red-500"
  },

  ESFP: {
    name: "娱乐家",
    nickname: "表演者",
    description: "自发的、精力充沛、热情的人——生活在他们周围从不无聊。",
    traits: [
      "热情开朗，充满活力",
      "善于娱乐和鼓舞他人",
      "重视人际关系和情感",
      "喜欢新鲜事物和变化"
    ],
    strengths: ["热情", "社交能力", "实用性", "艺术性"],
    weaknesses: ["缺乏专注", "过分敏感", "缺乏规划"],
    careers: ["演员", "音乐家", "销售", "活动策划"],
    color: "from-yellow-500 to-orange-500"
  }
};