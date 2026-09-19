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
    switchLanguage: string;
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
  product: {
    overline: string;
    title: [string, string];
    badge: string;
    category: string;
    description: string;
    websiteLabel: string;
    docsLabel: string;
    scenariosLabel: string;
    scenarios: Array<{ title: string; description: string }>;
    availability: string;
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
    emailLabel: string;
    email: string;
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
      description: "Mucyan 沐沧科技，MeowPush 的创造者。从跨平台推送通知出发，构建连接工作流、系统与设备的软件产品。",
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
      switchLanguage: "切换至英文版",
    },
    languageSwitch: { label: "EN", href: "/en/", hreflang: "en" },
    navItems: [
      { label: "我们的产品", href: "#products" },
      { label: "关于我们", href: "#about" },
      { label: "业务方向", href: "#capabilities" },
      { label: "工作方式", href: "#approach" },
      { label: "公司信息", href: "#company" },
      { label: "联系我们", href: "#contact" },
    ],
    heroSlides: [
      {
        eyebrow: "MUCYAN · MEOWPUSH",
        title: "让消息，",
        titleAccent: "连接日常",
        description: "从首款产品 MeowPush 出发，让工作流、系统与设备之间的重要消息，走进你的日常。",
        theme: "notify",
      },
      {
        eyebrow: "AGENT WORKFLOWS",
        title: "让进展，",
        titleAccent: "及时可见",
        description: "为 Agent 工作流接入通知，把任务动态从运行中的系统带到你身边。",
        theme: "signal",
      },
      {
        eyebrow: "SYSTEMS & DEVICES",
        title: "让连接，",
        titleAccent: "更加简单",
        description: "通过 Webhook 连接项目、监控与家居系统，让信息在不同场景之间流动。",
        theme: "current",
      },
      {
        eyebrow: "LONG-TERM TECHNOLOGY",
        title: "让技术，",
        titleAccent: "持续生长",
        description: "从真实使用中发现问题，以清晰的设计与持续迭代，让软件成为日常的助力。",
        theme: "horizon",
      },
    ],
    heroLearnMore: "探索首款产品",
    heroPlayback: { pause: "暂停主视觉自动切换", play: "继续主视觉自动切换" },
    product: {
      overline: "我们的产品 · OUR PRODUCTS",
      title: ["让重要消息，", "抵达你的设备。"],
      badge: "沐沧科技首款产品",
      category: "跨平台 Webhook 推送通知应用",
      description: "MeowPush 连接 Agent 工作流、监控系统、项目与家居系统，将其中的消息推送到你的设备，让工作与生活中的重要动态触手可及。",
      websiteLabel: "访问产品官网",
      docsLabel: "阅读使用文档",
      scenariosLabel: "从工作流到日常生活",
      scenarios: [
        { title: "Agent 工作流", description: "在智能体工作流中接入通知，及时了解任务动态。" },
        { title: "监控告警", description: "将监控系统中的告警送达设备，关注需要处理的问题。" },
        { title: "项目集成", description: "通过 Webhook 接入项目，让事件与通知建立连接。" },
        { title: "家居系统", description: "连接家居系统，把日常设备的动态带到身边。" },
      ],
      availability: "前往产品官网查看各平台的下载入口与最新支持情况。",
    },
    about: {
      overline: "关于沐沧",
      title: ["从真实需求出发，", "把技术做成好用的产品。"],
      paragraphs: [
        "沐沧科技是一家位于山东淄博的科技企业。我们关注软件、智能应用与系统连接，致力于把复杂的技术能力转化为清晰、实用的产品体验。",
        "从首款产品 MeowPush 出发，我们将对技术的理解落到具体应用：连接工作流、系统与设备，让重要消息抵达用户，让每一次构建都回应真实需求。",
      ],
      marqueeMiddle: "沐沧科技",
    },
    capabilities: {
      overline: "业务方向 · WHAT WE EXPLORE",
      title: ["围绕产品，", "持续构建技术能力。"],
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
      title: ["好用的产品，", "从理解开始。"],
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
      title: ["从一次交流，", "开始新的连接。"],
      lead: "无论是 MeowPush 的使用反馈、产品合作，还是软件与系统连接方面的想法，都欢迎通过商务邮箱与我们交流。",
      emailLabel: "商务邮箱",
      email: "contact@mucyan.com",
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
      description: "Mucyan is the company behind MeowPush. We build software that connects workflows, systems, and devices, starting with cross-platform push notifications.",
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
      switchLanguage: "Switch to the Chinese version",
    },
    languageSwitch: { label: "中文", href: "/", hreflang: "zh-CN" },
    navItems: [
      { label: "Products", href: "#products" },
      { label: "About", href: "#about" },
      { label: "Focus", href: "#capabilities" },
      { label: "Approach", href: "#approach" },
      { label: "Company", href: "#company" },
      { label: "Contact", href: "#contact" },
    ],
    heroSlides: [
      {
        eyebrow: "MUCYAN · MEOWPUSH",
        title: "Stay connected",
        titleAccent: "to what matters.",
        description: "Meet MeowPush, our first product: bringing important updates from workflows, systems, and devices into everyday life.",
        theme: "notify",
      },
      {
        eyebrow: "AGENT WORKFLOWS",
        title: "Keep progress",
        titleAccent: "in sight.",
        description: "Connect notifications to your Agent workflows and bring task updates from running systems to your devices.",
        theme: "signal",
      },
      {
        eyebrow: "SYSTEMS & DEVICES",
        title: "Make connections",
        titleAccent: "simple.",
        description: "Use Webhooks to connect projects, monitoring, and home systems, bringing updates across the contexts you care about.",
        theme: "current",
      },
      {
        eyebrow: "LONG-TERM TECHNOLOGY",
        title: "Build technology",
        titleAccent: "to last.",
        description: "We learn from real use and keep improving, with clear design and practical software for everyday needs.",
        theme: "horizon",
      },
    ],
    heroLearnMore: "Explore our first product",
    heroPlayback: { pause: "Pause automatic hero rotation", play: "Resume automatic hero rotation" },
    product: {
      overline: "OUR PRODUCTS",
      title: ["Important updates,", "delivered to your devices."],
      badge: "Mucyan’s first product",
      category: "Cross-platform Webhook push notifications",
      description: "MeowPush connects Agent workflows, monitoring systems, projects, and home systems to notifications on your devices, keeping important updates from work and everyday life within reach.",
      websiteLabel: "Visit product website",
      docsLabel: "Read documentation",
      scenariosLabel: "From workflows to everyday life",
      scenarios: [
        { title: "Agent workflows", description: "Add notifications to your Agent workflows to stay informed about tasks." },
        { title: "Monitoring alerts", description: "Receive alerts from monitoring systems on your devices when issues need attention." },
        { title: "Project integration", description: "Connect project events to push notifications through Webhooks." },
        { title: "Home systems", description: "Bring updates from connected home systems to your devices." },
      ],
      availability: "Visit the product website for downloads and the latest platform availability.",
    },
    about: {
      overline: "ABOUT MUCYAN",
      title: ["Real needs.", "Thoughtful software."],
      paragraphs: [
        "Mucyan is the English brand name of 沐沧科技（淄博）有限公司, a technology company established in Zibo, Shandong, China, on 18 May 2026. Its registered business scope includes technology development and consulting, software development, AI software and application systems, data services, IoT technologies, information-security software, systems integration, and software outsourcing.",
        "Our first product, MeowPush, puts this approach into practice by connecting workflows, systems, and devices through push notifications. We start with real needs and build in practical, verifiable steps, with attention to reliability, maintainability, and continuous improvement.",
      ],
      marqueeMiddle: "TECHNOLOGY",
    },
    capabilities: {
      overline: "OUR FOCUS · WHAT WE EXPLORE",
      title: ["Building the capabilities", "behind our products."],
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
      title: ["Useful products", "begin with understanding."],
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
      title: ["A conversation.", "A new connection."],
      lead: "Have feedback on MeowPush, a product partnership in mind, or an idea about software and connected systems? We would love to hear from you by business email.",
      emailLabel: "Business email",
      email: "contact@mucyan.com",
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
