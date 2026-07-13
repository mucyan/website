export type Locale = "zh" | "en";

export type HeroSlide = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  theme: string;
};

export type Capability = {
  index: string;
  en: string;
  title: string;
  description: string;
  tags: string[];
};

export type Principle = {
  number: string;
  title: string;
  description: string;
};

type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  accessibility: {
    skipLink: string;
    homeLabel: string;
    primaryNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
    heroPagination: string;
    heroSlidePrefix: string;
    directionsLabel: string;
    previousDirections: string;
    nextDirections: string;
    backToTop: string;
  };
  languageSwitch: {
    label: string;
    href: string;
    hreflang: string;
  };
  navItems: Array<{ label: string; href: string }>;
  heroSlides: HeroSlide[];
  heroLearnMore: string;
  heroPlayback: {
    pause: string;
    play: string;
  };
  about: {
    overline: string;
    title: [string, string];
    paragraphs: [string, string];
    marqueeMiddle: string;
  };
  capabilities: {
    overline: string;
    title: [string, string];
    items: Capability[];
  };
  approach: {
    overline: string;
    title: [string, string];
    principles: Principle[];
  };
  company: {
    overline: string;
    title: [string, string];
    facts: Array<{ label: string; value: string; detail: string }>;
  };
  contact: {
    title: [string, string];
    lead: string;
    email: string;
    phone: string;
    addressLabel: string;
    addressLines: [string, string];
  };
  footer: {
    navigation: string;
    entity: string;
    entityName: string;
    creditCode: string;
    language: string;
  };
};

export const siteContent: Record<Locale, SiteContent> = {
  zh: {
    meta: {
      title: "Mucyan 沐沧科技｜让技术清晰发生",
      description: "Mucyan 沐沧科技，面向软件、智能应用、数据与系统方向，探索清晰、可靠、可持续的技术解决方案。",
    },
    accessibility: {
      skipLink: "跳至主要内容",
      homeLabel: "Mucyan 沐沧科技首页",
      primaryNav: "主导航",
      mobileNav: "移动端导航",
      openMenu: "打开导航菜单",
      closeMenu: "关闭导航菜单",
      heroPagination: "主视觉切换",
      heroSlidePrefix: "显示",
      directionsLabel: "相关方向",
      previousDirections: "向前浏览业务方向",
      nextDirections: "向后浏览业务方向",
      backToTop: "返回页面顶部",
    },
    languageSwitch: { label: "EN", href: "/en/", hreflang: "en" },
    navItems: [
      { label: "关于我们", href: "#about" },
      { label: "业务方向", href: "#capabilities" },
      { label: "工作方式", href: "#approach" },
      { label: "公司信息", href: "#company" },
      { label: "联系我们", href: "#contact" },
    ],
    heroSlides: [
      {
        eyebrow: "MUCYAN · SOFTWARE & TECHNOLOGY",
        title: "让复杂，",
        titleAccent: "清晰发生",
        description: "从软件到智能应用，以清晰的理解与可靠的构建，让技术真正服务于问题。",
        theme: "ocean",
      },
      {
        eyebrow: "INTELLIGENT APPLICATIONS",
        title: "让智能，",
        titleAccent: "走进场景",
        description: "关注人工智能软件与应用系统，探索智能能力与真实场景之间的连接。",
        theme: "signal",
      },
      {
        eyebrow: "DATA & CONNECTION",
        title: "让数据，",
        titleAccent: "连接价值",
        description: "围绕数据、物联网与系统集成方向，为信息流动建立更清晰的路径。",
        theme: "current",
      },
      {
        eyebrow: "LONG-TERM TECHNOLOGY",
        title: "让技术，",
        titleAccent: "持续生长",
        description: "尊重长期价值，以迭代、协作与持续改进回应不断变化的需求。",
        theme: "horizon",
      },
    ],
    heroLearnMore: "认识沐沧",
    heroPlayback: { pause: "暂停主视觉自动切换", play: "继续主视觉自动切换" },
    about: {
      overline: "关于沐沧",
      title: ["从淄博出发，", "向清晰而有价值的技术前进。"],
      paragraphs: [
        "沐沧科技是一家位于山东淄博的科技企业，面向软件、智能应用、数据与系统方向，探索清晰、可靠、可持续的技术解决方案。",
        "“Mucyan”承载着我们对技术的理解：像水一样理解环境，像海一样容纳复杂，让每一次构建都抵达真实需求。",
      ],
      marqueeMiddle: "沐沧科技",
    },
    capabilities: {
      overline: "业务方向 · WHAT WE EXPLORE",
      title: ["以技术为方法，", "回应真实问题。"],
      items: [
        {
          index: "01",
          en: "SOFTWARE",
          title: "软件与数字化",
          description: "围绕应用软件、网络与信息系统建设，探索从需求理解到稳定交付的完整路径。",
          tags: ["软件开发", "系统集成", "运行维护"],
        },
        {
          index: "02",
          en: "INTELLIGENCE",
          title: "智能应用",
          description: "关注人工智能基础软件、平台与场景化应用，让智能能力更自然地融入工作与生活。",
          tags: ["AI 软件", "应用系统", "场景探索"],
        },
        {
          index: "03",
          en: "DATA",
          title: "数据与连接",
          description: "面向数据服务、物联网与信息连接方向，帮助不同系统之间形成清晰、可靠的协同。",
          tags: ["数据服务", "物联网", "信息连接"],
        },
        {
          index: "04",
          en: "SERVICE",
          title: "技术服务",
          description: "提供面向技术咨询、软件外包与持续运维方向的服务，以协作回应业务中的真实问题。",
          tags: ["技术咨询", "软件外包", "持续改进"],
        },
      ],
    },
    approach: {
      overline: "我们的工作方式 · HOW WE WORK",
      title: ["好的技术，", "从清晰开始。"],
      principles: [
        { number: "01", title: "先理解问题", description: "在写下方案之前，先回到场景、目标与约束本身。" },
        { number: "02", title: "以迭代构建", description: "把复杂目标拆成可验证的步骤，让每一次前进都有依据。" },
        { number: "03", title: "向长期负责", description: "重视稳定性、可维护性与持续改进，不让交付成为终点。" },
      ],
    },
    company: {
      overline: "公司信息",
      title: ["年轻的起点，", "长期的视角。"],
      facts: [
        { label: "成立时间", value: "2026.05", detail: "沐沧科技（淄博）有限公司正式成立" },
        { label: "所在城市", value: "淄博", detail: "Zibo · Shandong · China" },
        { label: "企业类型", value: "有限责任公司", detail: "营业期限 · 长期" },
      ],
    },
    contact: {
      title: ["让下一步，", "清晰发生。"],
      lead: "如果你正在思考软件、智能应用、数据或系统方向的问题，欢迎在正式联系渠道上线后与我们交流。",
      email: "商务邮箱 · 待补充",
      phone: "联系电话 · 待补充",
      addressLabel: "REGISTERED OFFICE",
      addressLines: [
        "山东省淄博市张店区马尚街道办事处新村西路266号",
        "大学生创业空间404（一址多照）",
      ],
    },
    footer: {
      navigation: "网站导航",
      entity: "公司主体",
      entityName: "沐沧科技（淄博）有限公司",
      creditCode: "统一社会信用代码：91370303MAKEJDBW7N",
      language: "语言",
    },
  },
  en: {
    meta: {
      title: "Mucyan | Technology Made Clear",
      description: "Mucyan is a technology company based in Zibo, China, exploring software, intelligent applications, data services, and connected systems.",
    },
    accessibility: {
      skipLink: "Skip to main content",
      homeLabel: "Mucyan home",
      primaryNav: "Primary navigation",
      mobileNav: "Mobile navigation",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      heroPagination: "Hero slides",
      heroSlidePrefix: "Show",
      directionsLabel: "Related areas",
      previousDirections: "View previous focus area",
      nextDirections: "View next focus area",
      backToTop: "Back to top",
    },
    languageSwitch: { label: "中文", href: "/", hreflang: "zh-CN" },
    navItems: [
      { label: "About", href: "#about" },
      { label: "Focus", href: "#capabilities" },
      { label: "Approach", href: "#approach" },
      { label: "Company", href: "#company" },
      { label: "Contact", href: "#contact" },
    ],
    heroSlides: [
      {
        eyebrow: "MUCYAN · SOFTWARE & TECHNOLOGY",
        title: "Make complexity",
        titleAccent: "clear.",
        description: "From software to intelligent applications, we approach real problems with clear thinking and reliable engineering.",
        theme: "ocean",
      },
      {
        eyebrow: "INTELLIGENT APPLICATIONS",
        title: "Bring intelligence",
        titleAccent: "into context.",
        description: "We explore the connection between intelligent software and the real settings in which it can create practical value.",
        theme: "signal",
      },
      {
        eyebrow: "DATA & CONNECTION",
        title: "Connect data",
        titleAccent: "to value.",
        description: "Across data, IoT, and systems integration, we look for clearer paths through which information can move and work together.",
        theme: "current",
      },
      {
        eyebrow: "LONG-TERM TECHNOLOGY",
        title: "Build technology",
        titleAccent: "to last.",
        description: "We value iteration, collaboration, and continuous improvement as needs and technologies continue to evolve.",
        theme: "horizon",
      },
    ],
    heroLearnMore: "Meet Mucyan",
    heroPlayback: { pause: "Pause automatic hero rotation", play: "Resume automatic hero rotation" },
    about: {
      overline: "ABOUT MUCYAN",
      title: ["From Zibo,", "toward technology with clarity and value."],
      paragraphs: [
        "Mucyan is the English brand name of 沐沧科技（淄博）有限公司, a technology company established in Zibo, Shandong, China, on 18 May 2026. Its registered business scope includes technology development and consulting, software development, AI software and application systems, data services, IoT technologies, information-security software, systems integration, and software outsourcing.",
        "Mucyan approaches technology by first understanding the context, objectives, and constraints behind each need. Across software, intelligent applications, data, and connected systems, we seek to make complex questions clearer and build in practical, verifiable steps, with attention to reliability, maintainability, and continuous improvement.",
      ],
      marqueeMiddle: "TECHNOLOGY",
    },
    capabilities: {
      overline: "OUR FOCUS · WHAT WE EXPLORE",
      title: ["Technology as a method,", "real problems as the focus."],
      items: [
        {
          index: "01",
          en: "SOFTWARE",
          title: "Software & Digital Systems",
          description: "We focus on application software, network and information-security software, and digital systems, with clarity from initial requirements through implementation.",
          tags: ["Software Development", "Information Security", "Digital Systems"],
        },
        {
          index: "02",
          en: "INTELLIGENCE",
          title: "Intelligent Applications",
          description: "We explore AI software and application systems, including foundational, algorithmic, general-purpose, and industry-oriented capabilities.",
          tags: ["AI Software", "Application Systems", "Integration"],
        },
        {
          index: "03",
          en: "DATA",
          title: "Data & Connectivity",
          description: "Our focus includes data processing, internet and industrial-internet data services, together with IoT research, development, and technical services.",
          tags: ["Data Services", "Internet of Things", "Industrial Internet"],
        },
        {
          index: "04",
          en: "SERVICE",
          title: "Technology Services",
          description: "We focus on technology development and consulting, software outsourcing, and information-technology services, working collaboratively around practical needs.",
          tags: ["Technology Consulting", "Software Outsourcing", "Technical Services"],
        },
      ],
    },
    approach: {
      overline: "OUR APPROACH · HOW WE WORK",
      title: ["Good technology", "begins with clarity."],
      principles: [
        { number: "01", title: "Understand first", description: "Before proposing a solution, we return to the context, objectives, and constraints." },
        { number: "02", title: "Build iteratively", description: "We break complex goals into verifiable steps, so each decision is grounded in evidence." },
        { number: "03", title: "Think long term", description: "We prioritize reliability, maintainability, and continuous improvement beyond initial delivery." },
      ],
    },
    company: {
      overline: "COMPANY INFORMATION",
      title: ["A young beginning.", "A long-term view."],
      facts: [
        { label: "Established", value: "18 MAY 2026", detail: "沐沧科技（淄博）有限公司 was established in Zibo" },
        { label: "Location", value: "ZIBO", detail: "Shandong · China" },
        { label: "Company type", value: "LIMITED LIABILITY", detail: "Invested in or controlled by natural persons" },
      ],
    },
    contact: {
      title: ["Make the next step", "clear."],
      lead: "If you are exploring a question involving software, intelligent applications, data, or connected systems, we welcome the opportunity to talk. Official business contact details will be published here.",
      email: "Business email · Coming soon",
      phone: "Telephone · Coming soon",
      addressLabel: "REGISTERED OFFICE",
      addressLines: [
        "Room 404, University Student Entrepreneurship Space, No. 266 Xincun West Road, Mashang Subdistrict,",
        "Zhangdian District, Zibo, Shandong, China · Multiple business registrations at one address",
      ],
    },
    footer: {
      navigation: "SITE NAVIGATION",
      entity: "REGISTERED ENTITY",
      entityName: "沐沧科技（淄博）有限公司",
      creditCode: "Unified Social Credit Code: 91370303MAKEJDBW7N",
      language: "LANGUAGE",
    },
  },
};
