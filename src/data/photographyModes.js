// 拍照模式数据 - PhotoMaster Pro
// 包含各场景推荐参数、提示语和小红书搜索关键词

export const PHOTOGRAPHY_MODES = [
  {
    id: 'starry-sky',
    name: '星空',
    nameEn: 'Starry Sky',
    icon: '✨',
    description: '银河、星轨、星星',
    tags: ['星空', '银河', '天文', '星星', '星轨'],
    searchKeywords: '手机拍星空教程',
    params: {
      iso: '800–3200',
      shutter: '15–30秒',
      aperture: 'f/1.8–f/2.8',
      wb: '3300–4500K',
      focus: '无穷远 (∞)',
      tips: '使用三脚架固定手机，避开城市光污染，建议用耳机线或定时器触发快门减少抖动'
    },
    xiaohongshuTags: ['星空摄影', '手机拍星空', '银河拍摄']
  },
  {
    id: 'backlit',
    name: '逆光/阳光',
    nameEn: 'Backlit / Sunlight',
    icon: '☀️',
    description: '阳光逆光、光斑、剪影',
    tags: ['逆光', '阳光', '光斑', '剪影', '日出日落'],
    searchKeywords: '手机逆光拍照教程',
    params: {
      iso: '50–100',
      shutter: '自动或 +1~+2 EV',
      aperture: 'f/2.0–f/2.8',
      wb: '日光 5500K',
      focus: '对主体半按对焦',
      tips: '开启HDR，欠曝拍剪影，过曝拍阳光感。测光点选在明暗交界处效果最佳'
    },
    xiaohongshuTags: ['逆光摄影', '手机逆光', '光斑拍摄', '剪影拍照']
  },
  {
    id: 'back-figure',
    name: '背影',
    nameEn: 'Back View',
    icon: '🌅',
    description: '人物背影、意境照片',
    tags: ['背影', '意境', '人像', '旅行'],
    searchKeywords: '手机拍背影照教程',
    params: {
      iso: '100–400',
      shutter: '自动',
      aperture: 'f/1.8–f/2.8',
      wb: '自动或日光',
      focus: '对主体对焦',
      tips: '选择干净简洁的背景（大海、草原、街道），光线从侧面打过来更有层次感'
    },
    xiaohongshuTags: ['背影拍照', '意境照', '人像背影', '旅行拍照']
  },
  {
    id: 'portrait',
    name: '人像',
    nameEn: 'Portrait',
    icon: '👤',
    description: '背景虚化人像照',
    tags: ['人像', '虚化', '自拍', '特写'],
    searchKeywords: '手机人像模式教程',
    params: {
      iso: '100–400',
      shutter: '自动',
      aperture: 'f/1.8–f/2.0（虚化）',
      wb: '自动',
      focus: '对眼睛对焦',
      tips: '人像模式需1.5–3米距离，背景与人物拉开距离，光线柔和时效果最好（阴天或柔光）'
    },
    xiaohongshuTags: ['手机人像', '人像模式', '背景虚化', '人像摄影']
  },
  {
    id: 'food',
    name: '美食',
    nameEn: 'Food',
    icon: '🍜',
    description: '美食摄影、色香味',
    tags: ['美食', '食物', '餐厅', '探店'],
    searchKeywords: '手机拍美食教程',
    params: {
      iso: '100–400',
      shutter: '自动',
      aperture: 'f/2.0–f/2.8',
      wb: '暖色调 4500–5500K',
      focus: '对食物主体对焦',
      tips: '45度角最通用，俯拍需要垂直光线。用手遮挡部分直射光制造柔和阴影'
    },
    xiaohongshuTags: ['美食摄影', '手机拍美食', '探店拍照', '食物摄影']
  },
  {
    id: 'night-city',
    name: '夜景/城市',
    nameEn: 'Night City',
    icon: '🌃',
    description: '城市夜景、霓虹灯光',
    tags: ['夜景', '城市', '霓虹', '灯光'],
    searchKeywords: '手机拍夜景教程',
    params: {
      iso: '400–1600',
      shutter: '1/15–2秒',
      aperture: 'f/1.8–f/2.8',
      wb: '自动或荧光灯',
      focus: '对灯光对焦',
      tips: '夜间模式会自动长曝光，保持手机稳定。手动模式建议快门1/15以上避免糊片'
    },
    xiaohongshuTags: ['手机拍夜景', '城市夜景', '霓虹灯拍照', '夜间摄影']
  },
  {
    id: 'macro',
    name: '微距/特写',
    nameEn: 'Macro',
    icon: '🔍',
    description: '花朵、昆虫、细节特写',
    tags: ['微距', '特写', '花草', '昆虫'],
    searchKeywords: '手机微距拍摄教程',
    params: {
      iso: '100–400',
      shutter: '自动',
      aperture: 'f/2.0–f/2.8',
      wb: '日光',
      focus: '对细节对焦',
      tips: '保持5–10cm最近对焦距离，多颗镜头手机用长焦/微距镜头。手动对焦更精准'
    },
    xiaohongshuTags: ['手机微距', '微距摄影', '特写拍摄', '花草摄影']
  },
  {
    id: 'long-exposure',
    name: '长曝光',
    nameEn: 'Long Exposure',
    icon: '💨',
    description: '流水拉丝、云朵飘动',
    tags: ['长曝光', '流水', '云', '光轨'],
    searchKeywords: '手机长曝光教程',
    params: {
      iso: '50–100',
      shutter: '2–10秒',
      aperture: 'f/8–f/11',
      wb: '日光',
      focus: '自动对焦后锁定',
      tips: '必须使用三脚架，流水选小光圈(f/8-f/11)拉丝感强，车轨需在安全位置拍摄'
    },
    xiaohongshuTags: ['手机长曝光', '流水拉丝', '光轨拍摄', '摄影技巧']
  },
  {
    id: 'sunrise-sunset',
    name: '日出日落',
    nameEn: 'Sunrise / Sunset',
    icon: '🌄',
    description: '日出日落、黄金时段',
    tags: ['日出', '日落', '黄金时段', '天空'],
    searchKeywords: '手机拍日出日落教程',
    params: {
      iso: '50–200',
      shutter: '根据天空亮度调整',
      aperture: 'f/5.6–f/8',
      wb: '日光 5500K',
      focus: '对太阳边缘对焦',
      tips: '黄金时段（前半小时）光线最柔美，可欠曝保留天空细节，日落时可加渐变ND滤镜'
    },
    xiaohongshuTags: ['日出拍照', '日落拍照', '黄金时段', '天空摄影']
  },
  {
    id: 'street',
    name: '街拍',
    nameEn: 'Street Photography',
    icon: '🏙️',
    description: '街头人文、瞬间抓拍',
    tags: ['街拍', '人文', '街头', '抓拍'],
    searchKeywords: '手机街拍教程',
    params: {
      iso: '200–800',
      shutter: '1/250秒以上',
      aperture: 'f/2.0–f/2.8',
      wb: '自动',
      focus: '预对焦到抓拍距离',
      tips: '快门优先（1/250以上），提前构图等人物进入。安静场所可试「声控拍照」减少抖动'
    },
    xiaohongshuTags: ['手机街拍', '人文摄影', '街头拍照', '抓拍技巧']
  },
  {
    id: 'snow',
    name: '雪景',
    nameEn: 'Snow Scene',
    icon: '❄️',
    description: '雪景、白雪皑皑',
    tags: ['雪', '雪景', '冬天', '白色'],
    searchKeywords: '手机拍雪景教程',
    params: {
      iso: '50–200',
      shutter: '+1~+2 EV（过曝补偿）',
      aperture: 'f/5.6–f/8',
      wb: '阴天 6500K 或日光',
      focus: '对主体对焦',
      tips: '雪景偏亮需加曝光补偿(+1~+2 EV)，否则拍成灰雪。早晚光线拍雪最有质感'
    },
    xiaohongshuTags: ['手机拍雪', '雪景摄影', '冬天拍照', '雪景技巧']
  },
  {
    id: 'underwater',
    name: '水下',
    nameEn: 'Underwater',
    icon: '🌊',
    description: '海边、泳池水下摄影',
    tags: ['水下', '海边', '泳池', '潜水'],
    searchKeywords: '手机水下摄影教程',
    params: {
      iso: '100–400',
      shutter: '1/250秒以上',
      aperture: 'f/2.0–f/2.8',
      wb: '水中白平衡或日光',
      focus: '对主体对焦',
      tips: '需防水壳！靠近拍摄水更清，阳光充足时色彩最好。上午9-11点水下光线最佳'
    },
    xiaohongshuTags: ['手机水下摄影', '防水壳拍摄', '海边拍照', '泳池拍照']
  }
];

// 手机品牌和型号数据
export const PHONE_BRANDS = [
  {
    id: 'honor',
    name: 'HONOR',
    nameZh: '荣耀',
    logo: '🔴',
    models: [
      { id: 'honor-magic7', name: 'Magic7 Pro/至臻版', hasProMode: true, hasNightMode: true },
      { id: 'honor-magic6', name: 'Magic6 Pro/至臻版', hasProMode: true, hasNightMode: true },
      { id: 'honor-magic5', name: 'Magic5 Pro/至臻版', hasProMode: true, hasNightMode: true },
      { id: 'honor-magicv', name: 'Magic V3/V2 折叠屏', hasProMode: true, hasNightMode: true },
      { id: 'honor-200', name: '荣耀200/200 Pro', hasProMode: true, hasNightMode: true },
      { id: 'honor-x', name: '荣耀X系列', hasProMode: false, hasNightMode: true },
    ],
    howToProMode: '相机 → 更多 →"专业"模式 → 手动调节 ISO/快门/WB/对焦',
    howToNightMode: '相机 → "夜景"模式 → 手持或上架拍摄',
    xiaohongshuRef: '一篇教会你用荣耀拍出质感大片',
  },
  {
    id: 'apple',
    name: 'Apple',
    nameZh: '苹果',
    logo: '🍎',
    models: [
      { id: 'iphone-15-pro', name: 'iPhone 15 Pro/Pro Max', hasProMode: true, hasNightMode: true },
      { id: 'iphone-14-pro', name: 'iPhone 14 Pro/Pro Max', hasProMode: true, hasNightMode: true },
      { id: 'iphone-13-pro', name: 'iPhone 13 Pro/Pro Max', hasProMode: true, hasNightMode: true },
      { id: 'iphone-15', name: 'iPhone 15/15 Plus', hasProMode: false, hasNightMode: true },
      { id: 'iphone-14', name: 'iPhone 14/14 Plus', hasProMode: false, hasNightMode: true },
      { id: 'iphone-se', name: 'iPhone SE 系列', hasProMode: false, hasNightMode: true },
    ],
    howToProMode: '相机 → 更多 → 左上角"RAW"或"专业" → 开启',
    howToNightMode: '相机 → 滑动到"夜间"模式 → 底部调节曝光时长',
  },
  {
    id: 'huawei',
    name: 'Huawei',
    nameZh: '华为',
    logo: '📱',
    models: [
      { id: 'huawei-p60', name: 'P60 Pro/Art', hasProMode: true, hasNightMode: true },
      { id: 'huawei-mate60', name: 'Mate 60 Pro+', hasProMode: true, hasNightMode: true },
      { id: 'huawei-p50', name: 'P50 Pro', hasProMode: true, hasNightMode: true },
      { id: 'huawei-nova', name: 'nova 系列', hasProMode: true, hasNightMode: true },
    ],
    howToProMode: '相机 → 更多 →"专业"模式 → 调节 ISO/快门/WB',
    howToNightMode: '相机 → 更多 →"夜间"模式 → 手持或上架',
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    nameZh: '小米',
    logo: '📱',
    models: [
      { id: 'xiaomi-14', name: '小米14/14 Pro/Ultra', hasProMode: true, hasNightMode: true },
      { id: 'xiaomi-13', name: '小米13/13 Pro/Ultra', hasProMode: true, hasNightMode: true },
      { id: 'xiaomi-12s', name: '小米12S Ultra', hasProMode: true, hasNightMode: true },
      { id: 'xiaomi-civi', name: 'Civi 系列', hasProMode: false, hasNightMode: true },
    ],
    howToProMode: '相机 → 右滑或"专业" → 手动调节各项参数',
    howToNightMode: '相机 → 左滑到"夜景"模式',
  },
  {
    id: 'oppo',
    name: 'OPPO',
    nameZh: 'OPPO/一加',
    logo: '📱',
    models: [
      { id: 'oppo-find', name: 'Find X7 Ultra/Pro', hasProMode: true, hasNightMode: true },
      { id: 'oppo-reno', name: 'Reno 系列', hasProMode: true, hasNightMode: true },
      { id: 'oneplus-12', name: '一加12', hasProMode: true, hasNightMode: true },
    ],
    howToProMode: '相机 → "专业" → 手动调节 ISO/快门/对焦',
    howToNightMode: '相机 → "夜景"模式',
  },
  {
    id: 'vivo',
    name: 'vivo',
    nameZh: 'vivo',
    logo: '📱',
    models: [
      { id: 'vivo-x100', name: 'X100 Pro/Ultra', hasProMode: true, hasNightMode: true },
      { id: 'vivo-x90', name: 'X90 Pro+', hasProMode: true, hasNightMode: true },
      { id: 'vivo-s18', name: 'S18/S17 系列', hasProMode: false, hasNightMode: true },
    ],
    howToProMode: '相机 → 右滑"专业" → 手动对焦/ISO/快门',
    howToNightMode: '相机 → "夜景"模式',
  },
  {
    id: 'samsung',
    name: 'Samsung',
    nameZh: '三星',
    logo: '📱',
    models: [
      { id: 'samsung-s24', name: 'Galaxy S24 Ultra/Pro', hasProMode: true, hasNightMode: true },
      { id: 'samsung-s23', name: 'Galaxy S23 Ultra', hasProMode: true, hasNightMode: true },
      { id: 'samsung-zfold', name: 'Galaxy Z Fold/Flip', hasProMode: true, hasNightMode: true },
    ],
    howToProMode: '相机 → 更多 →"专业"模式',
    howToNightMode: '相机 → 左滑到"夜间"',
  },
];
