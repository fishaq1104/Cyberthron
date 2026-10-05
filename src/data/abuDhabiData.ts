import { Place, Badge, Challenge } from '../types';

export const SUPPORTED_CITIES = [
  { id: 'abu-dhabi', name: 'Abu Dhabi', nameAr: 'أبوظبي', isPrimary: true, note: 'Primary Supported Prototype City' },
  { id: 'al-ain', name: 'Al Ain', nameAr: 'العين', isPrimary: false, note: 'Oasis & Heritage Zone' },
  { id: 'dubai', name: 'Dubai', nameAr: 'دبي', isPrimary: false, note: 'Expansion Corridor' },
  { id: 'sharjah', name: 'Sharjah', nameAr: 'الشارقة', isPrimary: false, note: 'Cultural Expansion Corridor' }
];

export const ABU_DHABI_PRESET_LOCATIONS = [
  'Al Reem Island',
  'Abu Dhabi Corniche',
  'Yas Island',
  'Saadiyat Island',
  'Al Maryah Island',
  'Khalifa City',
  'Masdar City',
  'Sheikh Zayed Grand Mosque',
  'Qasr Al Watan',
  'Mangrove National Park',
];

export const ABU_DHABI_PLACES: Place[] = [
  {
    id: 'szgm',
    name: 'Sheikh Zayed Grand Mosque',
    nameAr: 'جامع الشيخ زايد الكبير',
    category: 'Cultural & Heritage',
    categoryAr: 'ثقافة وتراث',
    lat: 24.4128,
    lng: 54.4750,
    distanceKm: 8.4,
    walkingTimeMins: 95,
    cyclingTimeMins: 26,
    shadeCoveragePercent: 85,
    heatSafetyLevel: 'Air-Conditioned Corridors & Reflective Marble Arcades',
    accessibility: '100% Wheelchair & Stroller Accessible with Electric Shuttles',
    sustainableTransit: 'Abu Dhabi Bus Route 94 (Direct air-conditioned bus stop at entrance)',
    description: 'An architectural masterpiece of Islamic heritage, world tolerance, and cultural dialogue featuring 82 white marble domes and shaded arcades.',
    heritageNote: 'Traditional Islamic floral stone carving, water mirror cooling courtyards inspired by historical Moorish architecture.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw6vvobgr9gJLCc_q9DGPDZcHWxhpT8Fh2Wk9Jx88PSw&s=10',
    tags: ['Iconic', 'Culture', 'Air-Conditioned', 'POD Friendly']
  },
  {
    id: 'qaw',
    name: 'Qasr Al Watan',
    nameAr: 'قصر الوطن',
    category: 'Heritage & Governance',
    categoryAr: 'تراث وحوكمة',
    lat: 24.4623,
    lng: 54.3168,
    distanceKm: 6.2,
    walkingTimeMins: 72,
    cyclingTimeMins: 20,
    shadeCoveragePercent: 90,
    heatSafetyLevel: 'Indoor Palace Sanctuary & Shaded Gardens',
    accessibility: 'Step-free routes, accessible ramps, Braille guides available',
    sustainableTransit: 'Bus Route 034 & 067 to Ras Al Akhdar',
    description: 'The UAE Presidential Palace celebrating Emirati governance, Arabian calligraphy, and historic craftsmanship.',
    heritageNote: 'Showcases Arabic geometry, regional scholarship, and the historic diplomacy of the UAE founders.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT99l1a3eBJ2Dy2xkn8wEDSh0quh3NqeZFSJaJiusGe9A&s=10',
    tags: ['Heritage', 'Presidential', 'Indoor Cool', 'Accessible']
  },
  {
    id: 'corniche',
    name: 'Abu Dhabi Corniche',
    nameAr: 'كورنيش أبوظبي',
    category: 'Coastal Walking & Cycling',
    categoryAr: 'ممشى ومسار دراجات ساحلي',
    lat: 24.4715,
    lng: 54.3412,
    distanceKm: 4.1,
    walkingTimeMins: 45,
    cyclingTimeMins: 14,
    shadeCoveragePercent: 78,
    heatSafetyLevel: 'Date Palm Canopy & Sea Breeze Zone (Best early morning or sunset)',
    accessibility: 'Fully paved, ramped beach crossings, tactile ground indicators',
    sustainableTransit: 'Corniche Dedicated Cycle Highway & Bus Routes 005, 032, 063',
    description: '8 kilometers of pristine waterfront featuring segregated pedestrian and cycling lanes, shaded gazebos, and blue-flag beaches.',
    heritageNote: 'Abu Dhabi maritime history and traditional dhow harbor heritage.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEn1cnbyCQ2b3o5g0110T0Zvg1nyRK706efgbPWbH7Hg&s=10',
    tags: ['Cycling Track', 'Sea Breeze', 'Date Palms', 'Family Friendly']
  },
  {
    id: 'saadiyat',
    name: 'Saadiyat Cultural District (Louvre AD)',
    nameAr: 'منطقة السعديات الثقافية (متحف اللوفر أبوظبي)',
    category: 'Culture & Nature',
    categoryAr: 'ثقافة وطبيعة',
    lat: 24.5312,
    lng: 54.4367,
    distanceKm: 7.8,
    walkingTimeMins: 88,
    cyclingTimeMins: 24,
    shadeCoveragePercent: 92,
    heatSafetyLevel: 'Iconic "Rain of Light" Passive Cooling Dome',
    accessibility: 'Full mobility accessibility, elevators, complimentary wheelchairs',
    sustainableTransit: 'Cultural Express Bus Route & Saadiyat Green Shuttles',
    description: 'Home to Louvre Abu Dhabi, Zayed National Museum, and Guggenheim Abu Dhabi with passive cooling microclimates.',
    heritageNote: 'Inspired by traditional Emirati falaj water systems and palm oasis shade patterns.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaeNn81_UbaHZNuK14Xifbx6f29IU52Gj2e-vLV6nLqQ&s=10',
    tags: ['Museum', 'Passive Cooling', 'Culture', 'Eco Architecture']
  },
  {
    id: 'mangroves',
    name: 'Mangrove National Park',
    nameAr: 'منتزه قرم الجبيل الوطني',
    category: 'Ecological & Nature Sanctuary',
    categoryAr: 'محمية طبيعية بيئية',
    lat: 24.4552,
    lng: 54.4190,
    distanceKm: 5.3,
    walkingTimeMins: 60,
    cyclingTimeMins: 18,
    shadeCoveragePercent: 70,
    heatSafetyLevel: 'Natural Microclimate with Marine Evaporative Cooling',
    accessibility: 'Raised wooden boardwalks suitable for wheelchairs & strollers',
    sustainableTransit: 'Eastern Mangroves Bus Stop Route 056 & Solar Kayaks',
    description: '75% of UAE mangrove forests protecting biodiversity, blue carbon sequestration, and coastal marine life.',
    heritageNote: 'Traditional Emirati coastal preservation and sustainable fishing history.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOnaBML0TDrkL92qC95r2S4LV487UGkcHo4MGLEEHpg&s=10',
    tags: ['Eco Sanctuary', 'Blue Carbon', 'Boardwalk', 'Zero Emission']
  },
  {
    id: 'masdar',
    name: 'Masdar City Eco-District',
    nameAr: 'مدينة مصدر المستدامة',
    category: 'Net-Zero Innovation',
    categoryAr: 'ابتكار الحياد المناخي',
    lat: 24.4329,
    lng: 54.6171,
    distanceKm: 14.2,
    walkingTimeMins: 140,
    cyclingTimeMins: 42,
    shadeCoveragePercent: 95,
    heatSafetyLevel: 'Traditional Wind Tower (Barjeel) Channelling Cooler Air',
    accessibility: '100% barrier-free pedestrian streets and autonomous transit pods',
    sustainableTransit: 'Autonomous PRT (Personal Rapid Transit) & Masdar Bus Hub',
    description: 'Pioneering clean-tech urban community with narrow shaded alleys that lower ambient temperature by up to 10°C.',
    heritageNote: 'Modern rebirth of ancient Arab desert windcatchers (Barjeel) and compact urban shading.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmU1hd3DZO-56t7gStJIdcZDqbyuSPsVqW-0rFn18hGA&s=10',
    tags: ['Net-Zero', 'Wind Tower', 'Autonomous Transit', 'Innovation']
  },
  {
    id: 'yas',
    name: 'Yas Island Promenade & Circuit',
    nameAr: 'جزيرة ياس ومسار الحلبة',
    category: 'Active Mobility & Entertainment',
    categoryAr: 'حركة نشطة وترفيه',
    lat: 24.4926,
    lng: 54.6067,
    distanceKm: 16.5,
    walkingTimeMins: 180,
    cyclingTimeMins: 48,
    shadeCoveragePercent: 65,
    heatSafetyLevel: 'Night Cycling Events & Shaded Hubs (TrainYAS evening sessions)',
    accessibility: 'Flat accessible corridors, Yas Express wheelchair lifts',
    sustainableTransit: 'Yas Express Electric Shuttles & Yas Marina Circuit Loop',
    description: 'World-class active mobility venue featuring Yas Marina Circuit community cycling, shaded promenades, and waterfront paths.',
    heritageNote: 'Modern entertainment balancing active fitness and UAE sports culture.',
    imageUrl: 'https://www.mediaoffice.abudhabi/assets/resized/sm/upload/xa/6y/a8/86/thumb-20220610_DCT_Yas-Island-attractions_Web-0-0-0-0.webp?k=20e6b0f9b0',
    tags: ['TrainYAS', 'Active Fitness', 'Evening Cycling', 'Connected']
  }
];

export const BADGES: Badge[] = [
  {
    id: 'first-trip',
    title: 'First Green Trip',
    titleAr: 'أول رحلة خضراء',
    description: 'Completed your first low-carbon journey in Abu Dhabi.',
    descriptionAr: 'أكملت أول رحلة منخفضة الكربون في أبوظبي.',
    icon: '🌱',
    earned: true,
    dateEarned: '2026-09-28'
  },
  {
    id: '10k-walker',
    title: '10K Walker',
    titleAr: 'سائر الـ 10 كيلومترات',
    description: 'Walked more than 10 kilometers through climate-safe routes.',
    descriptionAr: 'مشيت أكثر من 10 كم عبر مسارات آمنة ومظللة.',
    icon: '🚶',
    earned: true,
    dateEarned: '2026-10-01'
  },
  {
    id: 'cycling-explorer',
    title: 'Cycling Explorer',
    titleAr: 'مستكشف الدراجات',
    description: 'Pedaled along Abu Dhabi Corniche or Al Hudayriyat cycle track.',
    descriptionAr: 'قدت دراجتك على كورنيش أبوظبي أو مسار الحديريات.',
    icon: '🚲',
    earned: true,
    dateEarned: '2026-09-30'
  },
  {
    id: 'shade-seeker',
    title: 'Shade Seeker',
    titleAr: 'صائد الظل',
    description: 'Selected a route with over 75% shade coverage during peak heat hours.',
    descriptionAr: 'اخترت مساراً تتجاوز نسبة تظليله 75% خلال ساعات الظهيرة.',
    icon: '🌳',
    earned: true,
    dateEarned: '2026-10-02'
  },
  {
    id: 'uae-explorer',
    title: 'UAE Explorer',
    titleAr: 'مستكشف الإمارات',
    description: 'Visited 3 sustainable cultural heritage landmarks without a car.',
    descriptionAr: 'زرت 3 معالم تراثية وثقافية مستدامة دون استخدام سيارة خاصة.',
    icon: '🇦🇪',
    earned: false
  },
  {
    id: 'sustainability-champion',
    title: 'Sustainability Champion',
    titleAr: 'بطل الاستدامة',
    description: 'Accumulated over 1,000 Green Points and saved 10kg of CO₂.',
    descriptionAr: 'جمعت أكثر من 1,000 نقطة خضراء ووفرت 10 كجم من الكربون.',
    icon: '♻️',
    earned: true,
    dateEarned: '2026-10-02'
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'weekly-10k',
    title: 'Walk 10 km this week',
    titleAr: 'امشِ 10 كم هذا الأسبوع',
    category: 'walking',
    rewardPoints: 250,
    progressPercent: 75,
    currentValue: '7.5 km',
    targetValue: '10 km',
    deadline: 'In 3 days',
    isCompleted: false
  },
  {
    id: 'cycle-corniche',
    title: 'Cycle Corniche at Sunset',
    titleAr: 'جولة دراجة على الكورنيش وقت الغروب',
    category: 'cycling',
    rewardPoints: 150,
    progressPercent: 100,
    currentValue: '8.2 km',
    targetValue: '8.0 km',
    deadline: 'Completed',
    isCompleted: true
  },
  {
    id: 'masdar-transit',
    title: 'Try Public Transit in Masdar or Reem',
    titleAr: 'استخدم الحافلات الكهربائية في الريم أو مصدر',
    category: 'transit',
    rewardPoints: 200,
    progressPercent: 66,
    currentValue: '2 trips',
    targetValue: '3 trips',
    deadline: 'In 5 days',
    isCompleted: false
  }
];

export const REWARDS = [
  {
    id: 'rew-1',
    points: 100,
    title: '10% Sustainable Partner Cafe Discount',
    titleAr: 'خصم 10% في مقاهي الاستدامة الشريكة',
    partner: 'Local Abu Dhabi Roasteries & Masdar Cafes',
    partnerAr: 'المقاهي المحلية المعتمدة في أبوظبي ومدينة مصدر',
    status: 'Coming Soon — Partner Rewards',
    statusAr: 'قريباً — مكافآت الشركاء'
  },
  {
    id: 'rew-2',
    points: 350,
    title: 'Al Hudayriyat Bike Rental Credit',
    titleAr: 'رصيد استئجار دراجة في جزيرة الحديريات',
    partner: 'Abu Dhabi Cycling Club Partner Hubs',
    partnerAr: 'مراكز تأجير نادي أبوظبي للدراجات',
    status: 'Coming Soon — Partner Rewards',
    statusAr: 'قريباً — مكافآت الشركاء'
  },
  {
    id: 'rew-3',
    points: 500,
    title: 'Abu Dhabi Bus Hafilat Pass Credit',
    titleAr: 'شحن رصيد بطاقة حافلات للنقل العام بأبوظبي',
    partner: 'Integrated Transport Centre (ITC) Initiative',
    partnerAr: 'مبادرة مركز النقل المتكامل بأبوظبي',
    status: 'Coming Soon — Partner Rewards',
    statusAr: 'قريباً — مكافآت الشركاء'
  },
  {
    id: 'rew-4',
    points: 800,
    title: 'Eastern Mangroves Eco-Kayak Tour',
    titleAr: 'جولة كاياك بيئية في منتزه القرم الشرقي',
    partner: 'Abu Dhabi Eco-Tourism Guild',
    partnerAr: 'رابطة السياحة البيئية في أبوظبي',
    status: 'Coming Soon — Partner Rewards',
    statusAr: 'قريباً — مكافآت الشركاء'
  }
];

export const LEADERBOARD = [
  { rank: 1, user: 'Anonymous EcoWalker #88', points: 3420, trips: 42, co2: '14.8 kg' },
  { rank: 2, user: 'Anonymous GreenCyclist #14', points: 2980, trips: 36, co2: '12.4 kg' },
  { rank: 3, user: 'Anonymous ShadeSeeker #07', points: 2750, trips: 31, co2: '11.2 kg' },
  { rank: 4, user: 'You (Fatima Al Mansoori)', points: 1280, trips: 18, co2: '4.8 kg', isCurrent: true },
  { rank: 5, user: 'Anonymous AbuDhabiPed #52', points: 1190, trips: 15, co2: '4.2 kg' },
  { rank: 6, user: 'Anonymous MasdarCommuter #29', points: 1040, trips: 14, co2: '3.9 kg' },
];

export const HERITAGE_STORIES = [
  {
    id: 'harees',
    title: 'Harees Heritage Trail',
    titleAr: 'مسار الهريس التراثي',
    subtitle: 'The Sustenance of Desert Voyagers',
    subtitleAr: 'زاد المسافرين في قلب الصحراء',
    description: 'Discover the story behind one of the UAE’s most cherished traditional dishes. Slow-cooked over gentle embers using whole wheat, tender meat, and clarified ghee, Harees provided travelers with long-lasting vitality across the arid desert routes.',
    descriptionAr: 'اكتشف قصة أحد أعرق الأطباق الإماراتية التقليدية؛ الهريس الذي يُطهى على نار هادئة بالقمح واللحم والسمن البلدي، ليمنح المسافرين طاقة مستدامة عبر طرق الصحراء.',
    tag: 'Culinary Heritage',
    tagAr: 'تراث الطهي',
    icon: '🍲'
  },
  {
    id: 'barjeel',
    title: 'Barjeel: Traditional Wind Towers',
    titleAr: 'البراجيل: أبراج الرياح التراثية',
    subtitle: 'Ancient Emirati Passive Cooling Architecture',
    subtitleAr: 'تقنيات التبريد الطبيعي في العمارة الإماراتية',
    description: 'Before modern refrigeration, Emirati coastal communities harnessed Gulf thermals using Barjeel (windcatchers). The four-sided towers funnel cooler high-altitude breezes down into courtyards, dropping internal temperatures by up to 8°C without electricity.',
    descriptionAr: 'قبل أنظمة التكييف الحديثة، ابتكر الأجداد البراجيل لاصطياد نسيم الخليج العالي وتوجيهه لداخل المنازل لخفض الحرارة حتى 8 درجات مئوية دون أي استهلاك للطاقة.',
    tag: 'Passive Architecture',
    tagAr: 'عمارة مستدامة',
    icon: '🏛️'
  },
  {
    id: 'falaj',
    title: 'Falaj: Oasis Irrigation Networks',
    titleAr: 'الأفلاج: شبكات ري الواحات',
    subtitle: 'UNESCO-Inscribed Water Commons',
    subtitleAr: 'هندسة المياه المدرجة في اليونسكو',
    description: 'Developed millennia ago in Al Ain and surrounding foothills, Falaj channels use gravity to carry natural spring water underground for miles, minimizing evaporation and sustaining lush date palm canopies that shelter walkers to this day.',
    descriptionAr: 'نظام هندسي عريق يمتد لآلاف السنين في واحات العين، يعتمد على الجاذبية لنقل مياه الينابيع الجوفية دون تبخر، مغذياً بساتين النخيل التي تظلل المشاة حتى اليوم.',
    tag: 'Water Engineering',
    tagAr: 'هندسة المياه',
    icon: '🌴'
  },
  {
    id: 'gahwa',
    title: 'Emirati Gahwa & Hospitality',
    titleAr: 'القهوة العربية وكرم الضيافة',
    subtitle: 'Intangible Cultural Dialogue',
    subtitleAr: 'تراث الترحيب والأصالة',
    description: 'Serving Gahwa from the brass Dallah into the Finjan is an art of generosity and social warmth. Traditionally infused with cardamom and saffron, it represents the peaceful greeting given to every traveler arriving from their journey.',
    descriptionAr: 'تقديم القهوة من الدلة في الفنجان فن أصيل يعكس كرم الضيافة الإماراتية ونقاء الترحيب بكل عابر سبيل ومسافر.',
    tag: 'Living Traditions',
    tagAr: 'تقاليد حية',
    icon: '☕'
  }
];
