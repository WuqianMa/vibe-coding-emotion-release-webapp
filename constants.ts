import { Language, CoreWant } from './types';

export const TRANSLATIONS = {
  zh: {
    title: "莱斯特释放法",
    subtitle: "六步法 · 释放情绪 · 达成目标",
    start: "开始释放",
    enter: "继续",
    backspace: "返回/否",
    step: "第 {{current}} 步 / 共 {{total}} 步",
    next: "下一步",
    continue_release: "继续释放",
    finish_session: "结束会话",
    new_goal: "新的目标",
    
    // Steps
    s1_title: "你的目标是什么？",
    s1_desc: "写下一个具体的、你想要达成，或者目前困扰你的事情。",
    s1_placeholder: "例如：我想要升职加薪...",
    
    s2_title: "这让你感觉如何？",
    s2_desc: "当你想到这个目标还没实现，或者在这个问题中时，当下的情绪是什么？",
    s2_placeholder: "例如：焦虑、紧绷、失望...",
    
    s3_title: "这种感受源于哪种基本欲望？",
    s3_desc: "所有的负面情绪，通常都来自这三种匮乏感之一：",
    
    s4_title: "欢迎这种感觉",
    s4_desc: "把注意力集中在“{{want}}”的欲望上。不要抗拒它，也不要试图改变它。只是允许它在这一刻完全地存在。",
    
    s5_could_title: "你能把它放下吗？",
    s5_could_desc: "Could you let it go?",
    s5_note: "（回答“是”或“否”都可以，只要是诚实的）",
    
    s5_would_title: "你愿意放下吗？",
    s5_would_desc: "Would you let it go?",
    s5_would_note: "（你是想要这种痛苦，还是想要自由？）",
    
    s5_when_title: "什么时候？",
    s5_when_desc: "When?",
    
    s6_title: "检查一下",
    s6_desc: "关于 \"{{goal}}\"，那种 \"{{feeling}}\" 的感觉还剩多少？",
    s6_low: "完全消失 (0)",
    s6_high: "非常强烈 (10)",
    s6_result_continue: "如果还有残留，我们需要再来一轮。",
    s6_result_done: "太棒了！",
    
    complete_title: "释放完成",
    complete_desc: "你已经成功释放了对 \"{{goal}}\" 的阻力。\n带着这份轻松和确信去行动吧。",

    // Actions
    btn_yes: "是的",
    btn_no: "不",
    btn_willing: "愿意",
    btn_unwilling: "不愿意",
    btn_now: "现在",
    btn_templates_show: "选择目标模板",
    btn_templates_hide: "收起模板",
    
    // AI
    ai_help: "AI 辅助觉察",
    ai_thinking: "思考中...",
    ai_ask: "不确定？问问 AI",
    ai_insight: "AI 洞察: ",
    
    // Wants
    want_approval: "被认可/爱",
    want_control: "控制/支配",
    want_security: "安全/生存",
    want_unknown: "不确定",
    
    // Welcome
    welcome_intro: "这是一个帮助你放下内在限制、释放负面情绪，从而自然达成目标的简单流程。请在安静的环境下使用，诚实地面对自己的内心。"
  },
  en: {
    title: "Lester's Release Method",
    subtitle: "The 6 Steps · Release Emotions · Achieve Goals",
    start: "Start Session",
    enter: "Continue",
    backspace: "Back/No",
    step: "STEP {{current}} OF {{total}}",
    next: "Next",
    continue_release: "Continue Releasing",
    finish_session: "End Session",
    new_goal: "New Goal",
    
    s1_title: "What is your goal?",
    s1_desc: "Write down a specific goal you want to achieve or a problem you want to solve.",
    s1_placeholder: "e.g., I want to get a promotion...",
    
    s2_title: "How does this make you feel?",
    s2_desc: "When you think about this goal not being met yet, what is the feeling right now?",
    s2_placeholder: "e.g., Anxious, Tight, Disappointed...",
    
    s3_title: "What is the core want beneath this?",
    s3_desc: "All negative emotions typically stem from one of these three wants:",
    
    s4_title: "Welcome the feeling",
    s4_desc: "Focus on the want for \"{{want}}\". Don't resist it, don't try to change it. Just allow it to be here completely.",
    
    s5_could_title: "Could you let it go?",
    s5_could_desc: "Could you let it go?",
    s5_note: "(Answer 'Yes' or 'No', as long as it is honest)",
    
    s5_would_title: "Would you let it go?",
    s5_would_desc: "Would you let it go?",
    s5_would_note: "(Do you want the pain, or do you want freedom?)",
    
    s5_when_title: "When?",
    s5_when_desc: "When?",
    
    s6_title: "Check In",
    s6_desc: "Regarding \"{{goal}}\", how much of that \"{{feeling}}\" remains?",
    s6_low: "Gone (0)",
    s6_high: "Intense (10)",
    s6_result_continue: "If there is any left, let's do another round.",
    s6_result_done: "Wonderful!",
    
    complete_title: "Release Complete",
    complete_desc: "You have successfully released resistance to \"{{goal}}\".\nMove forward with ease and certainty.",

    btn_yes: "Yes",
    btn_no: "No",
    btn_willing: "Yes",
    btn_unwilling: "No",
    btn_now: "Now",
    btn_templates_show: "Goal Templates",
    btn_templates_hide: "Hide Templates",
    
    ai_help: "AI Assist",
    ai_thinking: "Thinking...",
    ai_ask: "Unsure? Ask AI",
    ai_insight: "AI Insight: ",
    
    want_approval: "Approval / Love",
    want_control: "Control",
    want_security: "Security / Safety",
    want_unknown: "Unknown",
    
    welcome_intro: "A simple process to drop internal limitations and release negative emotions to naturally achieve your goals. Use in a quiet environment and be honest with yourself."
  },
  fr: {
    title: "Méthode de Libération",
    subtitle: "6 Étapes · Libérer les Émotions · Atteindre les Objectifs",
    start: "Commencer",
    enter: "Continuer",
    backspace: "Retour/Non",
    step: "ÉTAPE {{current}} SUR {{total}}",
    next: "Suivant",
    continue_release: "Continuer à libérer",
    finish_session: "Terminer",
    new_goal: "Nouvel Objectif",
    
    s1_title: "Quel est votre objectif ?",
    s1_desc: "Écrivez un objectif spécifique que vous souhaitez atteindre ou un problème à résoudre.",
    s1_placeholder: "ex: Je veux obtenir une promotion...",
    
    s2_title: "Qu'est-ce que cela vous fait ressentir ?",
    s2_desc: "Quand vous pensez à cet objectif, quelle émotion surgit ?",
    s2_placeholder: "ex: Anxiété, Tension, Déception...",
    
    s3_title: "Quel est le désir profond derrière ?",
    s3_desc: "Toutes les émotions négatives proviennent généralement de l'un de ces trois manques :",
    
    s4_title: "Accueillez ce sentiment",
    s4_desc: "Concentrez-vous sur le besoin de \"{{want}}\". Ne résistez pas, n'essayez pas de le changer. Permettez-lui simplement d'être là.",
    
    s5_could_title: "Pourriez-vous le lâcher ?",
    s5_could_desc: "Could you let it go?",
    s5_note: "(Répondez 'Oui' ou 'Non', tant que c'est honnête)",
    
    s5_would_title: "Voudriez-vous le lâcher ?",
    s5_would_desc: "Would you let it go?",
    s5_would_note: "(Voulez-vous la douleur ou la liberté ?)",
    
    s5_when_title: "Quand ?",
    s5_when_desc: "When?",
    
    s6_title: "Vérification",
    s6_desc: "Concernant \"{{goal}}\", combien reste-t-il de ce sentiment de \"{{feeling}}\" ?",
    s6_low: "Disparu (0)",
    s6_high: "Intense (10)",
    s6_result_continue: "S'il en reste, faisons un autre tour.",
    s6_result_done: "Merveilleux !",
    
    complete_title: "Libération Terminée",
    complete_desc: "Vous avez relâché la résistance face à \"{{goal}}\".\nAvancez avec aisance et certitude.",

    btn_yes: "Oui",
    btn_no: "Non",
    btn_willing: "Je veux",
    btn_unwilling: "Je ne veux pas",
    btn_now: "Maintenant",
    btn_templates_show: "Modèles",
    btn_templates_hide: "Masquer",
    
    ai_help: "Aide IA",
    ai_thinking: "Réflexion...",
    ai_ask: "Incertain ? Demandez à l'IA",
    ai_insight: "Aperçu IA : ",
    
    want_approval: "Approbation / Amour",
    want_control: "Contrôle",
    want_security: "Sécurité",
    want_unknown: "Inconnu",
    
    welcome_intro: "Un processus simple pour abandonner les limitations internes et libérer les émotions négatives. À utiliser dans un environnement calme."
  }
};

export const STEPS_INFO = {
  zh: [
    { title: "第一步：明确目标", description: "写下你想要达成的一个目标。" },
    { title: "第二步：觉察感受", description: "内心涌现出什么情绪？" },
    { title: "第三步：追溯根源", description: "在这个感受背后，你想要什么？" },
    { title: "第四步：释放", description: "问自己是否愿意放下。" },
    { title: "第五步：重复", description: "不断重复，直到平静。" },
    { title: "第六步：行动", description: "带着轻松的心态去行动。" }
  ],
  en: [
    { title: "Step 1: Define Goal", description: "Write down what you want to achieve." },
    { title: "Step 2: Feel", description: "What emotion comes up?" },
    { title: "Step 3: Root Cause", description: "What is the core want beneath this?" },
    { title: "Step 4: Release", description: "Ask if you are willing to let it go." },
    { title: "Step 5: Repeat", description: "Repeat until you feel peace." },
    { title: "Step 6: Action", description: "Take action with ease." }
  ],
  fr: [
    { title: "Étape 1 : Objectif", description: "Définissez ce que vous voulez." },
    { title: "Étape 2 : Ressentir", description: "Quelle émotion surgit ?" },
    { title: "Étape 3 : Racine", description: "Quel est le désir profond ?" },
    { title: "Étape 4 : Libérer", description: "Demandez-vous si vous pouvez lâcher prise." },
    { title: "Étape 5 : Répéter", description: "Répétez jusqu'à la paix." },
    { title: "Étape 6 : Action", description: "Agissez avec aisance." }
  ]
};

export const GOAL_TEMPLATES = {
  zh: {
    CAREER: {
      label: "事业/工作",
      templates: ["我想要在月内完成项目 X", "我想要自信地要求加薪", "我想要找到一份新工作"]
    },
    HEALTH: {
      label: "健康/身体",
      templates: ["我想要减掉 5 公斤", "我想要拥有深度睡眠", "我想要身体充满活力"]
    },
    RELATIONSHIP: {
      label: "关系/情感",
      templates: ["我想要宽恕 X", "我想要吸引伴侣", "我想要保持平和"]
    },
    PERSONAL: {
      label: "个人成长",
      templates: ["我想要改掉拖延", "我想要坚持冥想", "我想要接纳自己"]
    }
  },
  en: {
    CAREER: {
      label: "Career",
      templates: ["I want to finish Project X this month", "I want to ask for a raise confidently", "I want a new job aligned with my values"]
    },
    HEALTH: {
      label: "Health",
      templates: ["I want to lose 5kg easily", "I want deep sleep every night", "I want to feel energetic"]
    },
    RELATIONSHIP: {
      label: "Relationships",
      templates: ["I want to forgive X", "I want to attract a partner", "I want peace in family gatherings"]
    },
    PERSONAL: {
      label: "Growth",
      templates: ["I want to stop procrastinating", "I want to meditate daily", "I want to accept myself"]
    }
  },
  fr: {
    CAREER: {
      label: "Carrière",
      templates: ["Je veux finir le projet X", "Je veux demander une augmentation", "Je veux un nouveau travail"]
    },
    HEALTH: {
      label: "Santé",
      templates: ["Je veux perdre 5kg", "Je veux mieux dormir", "Je veux plus d'énergie"]
    },
    RELATIONSHIP: {
      label: "Relations",
      templates: ["Je veux pardonner à X", "Je veux attirer un partenaire", "Je veux la paix en famille"]
    },
    PERSONAL: {
      label: "Personnel",
      templates: ["Je veux arrêter de procrastiner", "Je veux méditer chaque jour", "Je veux m'accepter"]
    }
  }
};

export const EMOTION_LIST = {
  zh: ["焦虑", "愤怒", "悲伤", "恐惧", "渴望", "骄傲", "冷漠", "内疚"],
  en: ["Anxiety", "Anger", "Grief", "Fear", "Craving", "Pride", "Apathy", "Guilt"],
  fr: ["Anxiété", "Colère", "Tristesse", "Peur", "Désir", "Fierté", "Apathie", "Culpabilité"]
};
