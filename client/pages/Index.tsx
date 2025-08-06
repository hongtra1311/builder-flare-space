import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, StarIcon, HeartIcon, SparklesIcon, BrainIcon, EyeIcon, TrendingUpIcon, GlobeIcon } from "lucide-react";

interface NumerologyResults {
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  birthdayNumber: number;
  attitudeNumber: number;
  calculations: {
    lifePathSteps: string[];
    birthdaySteps: string[];
    attitudeSteps: string[];
    expressionSteps: string[];
    soulUrgeSteps: string[];
    personalitySteps: string[];
  };
  birthDate: {
    day: number;
    month: number;
    year: number;
  };
}

type Language = 'en' | 'vi' | 'it' | 'ja';

const translations = {
  en: {
    title: "Mystic Numbers",
    subtitle: "Discover the hidden meanings in your birth date and name through the ancient art of numerology",
    readingTitle: "Your Numerology Reading",
    birthDate: "Birth Date",
    required: "*",
    fullName: "Full Name (Optional)",
    namePlaceholder: "Enter your full name for complete reading",
    revealButton: "Reveal My Numbers",
    calculating: "Calculating Your Numbers...",
    lifePathTitle: "Life Path Number",
    birthdayTitle: "Birthday Number",
    attitudeTitle: "Attitude Number",
    expressionTitle: "Expression Number",
    soulUrgeTitle: "Soul Urge Number",
    personalityTitle: "Personality Number",
    howCalculated: "How it's calculated:",
    addDigits: "Add all the digits of the full birthdate:",
    keyStrengths: "Key Strengths:",
    challenges: "Challenges to watch for:",
    careerPath: "Career Path",
    relationships: "Relationships",
    growthPath: "Growth Path",
    dayOfBirth: "The day of birth",
    reflectsTraits: "reflects your natural talents and personality traits.",
    calculation: "Calculation:",
    traits: "Traits:",
    howOthersSee: "How Others See You:",
    revealsPerception: "This number reveals how others perceive you and how you present yourself to the world.",
    naturalTalents: "Your natural talents and how you express yourself to the world.",
    innerDesires: "Your inner desires and what motivates you at the deepest level.",
    outerPersonality: "How others perceive you and the impression you make.",
    corePersonality: "Core Personality Summary",
    element: "Element",
    number: "Number",
    meaning: "Meaning",
    naturalTalentsAbilities: "Natural talents and abilities",
    howOthersPerceive: "How others perceive you",
    yourTalentsAbilities: "Your talents and abilities",
    innerDesiresMotivations: "Your inner desires and motivations",
    outerPersonalityTraits: "Your outer personality",
    aboutTitle: "About Numerology",
    aboutText: "Numerology is the ancient practice of discovering the hidden meanings behind numbers in your life. Each number carries unique vibrations and energies that can reveal insights about your personality, life purpose, and spiritual path.",
    lifePathDesc: "Your most important number, revealing your life's purpose and journey.",
    expressionDesc: "Shows your natural talents and how you express yourself to the world.",
    soulUrgeDesc: "Reveals your inner desires and what motivates you at the deepest level.",
    personalityDesc: "How others perceive you and the impression you make on the world.",
    footer: "By @novteaaa",
    languageSelect: "Language"
  },
  vi: {
    title: "Số Thần Bí",
    subtitle: "Khám phá những ý nghĩa ẩn giấu trong ngày sinh và tên của bạn thông qua nghệ thuật cổ xưa thần số học",
    readingTitle: "Bài Đọc Thần Số Học Của Bạn",
    birthDate: "Ngày Sinh",
    required: "*",
    fullName: "Họ Tên Đầy Đủ (Tùy chọn)",
    namePlaceholder: "Nhập họ tên đầy đủ để có bài đ���c hoàn chỉnh",
    revealButton: "Tiết Lộ Các Số Của Tôi",
    calculating: "Đang Tính Toán Các Số Của Bạn...",
    lifePathTitle: "Số Đường Đời",
    birthdayTitle: "Số Ngày Sinh",
    attitudeTitle: "Số Thái Độ",
    expressionTitle: "Số Biểu Hiện",
    soulUrgeTitle: "Số Khao Khát Tâm Hồn",
    personalityTitle: "Số Tính Cách",
    howCalculated: "Cách tính:",
    addDigits: "Cộng tất cả các chữ số của ngày sinh đầy đủ:",
    keyStrengths: "Điểm Mạnh Chính:",
    challenges: "Thách thức cần chú ý:",
    careerPath: "Đường Nghề Nghiệp",
    relationships: "Các Mối Quan Hệ",
    growthPath: "Con Đường Phát Triển",
    dayOfBirth: "Ngày sinh",
    reflectsTraits: "phản ánh tài năng tự nhiên và đặc điểm tính cách của bạn.",
    calculation: "Cách tính:",
    traits: "Đặc điểm:",
    howOthersSee: "Người Khác Nhìn Bạn Như Thế Nào:",
    revealsPerception: "Số này tiết lộ cách người khác nhìn nhận bạn và cách bạn thể hiện bản thân với thế giới.",
    naturalTalents: "Tài năng tự nhiên và cách bạn thể hiện bản thân với thế giới.",
    innerDesires: "Khao khát bên trong và điều thúc đẩy bạn ở cấp độ sâu sắc nhất.",
    outerPersonality: "Cách người khác nhìn nhận bạn và ấn tượng bạn tạo ra.",
    corePersonality: "Tóm Tắt Tính Cách Cốt Lõi",
    element: "Yếu Tố",
    number: "Số",
    meaning: "Ý Nghĩa",
    naturalTalentsAbilities: "Tài năng và khả năng tự nhiên",
    howOthersPerceive: "Cách người khác nhìn nhận bạn",
    yourTalentsAbilities: "Tài năng và khả năng của bạn",
    innerDesiresMotivations: "Khao khát và động lực bên trong",
    outerPersonalityTraits: "Tính cách bên ngoài của bạn",
    aboutTitle: "Về Thần Số Học",
    aboutText: "Thần số học là thực hành cổ xưa khám phá những ý nghĩa ẩn giấu đằng sau các con số trong cuộc sống của bạn. Mỗi con số mang theo những rung động và năng lượng độc đáo có thể tiết lộ những hiểu biết về tính cách, mục đích sống và con đường tâm linh của bạn.",
    lifePathDesc: "Số quan trọng nhất của bạn, tiết lộ mục đích và hành trình cuộc đời.",
    expressionDesc: "Hiển thị tài năng tự nhiên và cách bạn thể hiện bản thân với thế giới.",
    soulUrgeDesc: "Tiết lộ khao khát bên trong và điều thúc đẩy bạn ở cấp độ sâu sắc nhất.",
    personalityDesc: "Cách người khác nhìn nhận bạn và ấn tượng bạn tạo ra với thế giới.",
    footer: "Bởi @novteaaa",
    languageSelect: "Ngôn Ngữ"
  },
  it: {
    title: "Numeri Mistici",
    subtitle: "Scopri i significati nascosti nella tua data di nascita e nel tuo nome attraverso l'antica arte della numerologia",
    readingTitle: "La Tua Lettura Numerologica",
    birthDate: "Data di Nascita",
    required: "*",
    fullName: "Nome Completo (Opzionale)",
    namePlaceholder: "Inserisci il tuo nome completo per una lettura completa",
    revealButton: "Rivela i Miei Numeri",
    calculating: "Calcolando i Tuoi Numeri...",
    lifePathTitle: "Numero del Percorso di Vita",
    birthdayTitle: "Numero del Compleanno",
    attitudeTitle: "Numero dell'Atteggiamento",
    expressionTitle: "Numero dell'Espressione",
    soulUrgeTitle: "Numero dell'Impulso dell'Anima",
    personalityTitle: "Numero della Personalità",
    howCalculated: "Come viene calcolato:",
    addDigits: "Somma tutte le cifre della data di nascita completa:",
    keyStrengths: "Punti di Forza Chiave:",
    challenges: "Sfide da tenere sotto controllo:",
    careerPath: "Percorso Professionale",
    relationships: "Relazioni",
    growthPath: "Percorso di Crescita",
    dayOfBirth: "Il giorno di nascita",
    reflectsTraits: "riflette i tuoi talenti naturali e tratti della personalità.",
    calculation: "Calcolo:",
    traits: "Tratti:",
    howOthersSee: "Come Gli Altri Ti Vedono:",
    revealsPerception: "Questo numero rivela come gli altri ti percepiscono e come ti presenti al mondo.",
    naturalTalents: "I tuoi talenti naturali e come ti esprimi al mondo.",
    innerDesires: "I tuoi desideri interiori e ciò che ti motiva al livello più profondo.",
    outerPersonality: "Come gli altri ti percepiscono e l'impressione che fai.",
    corePersonality: "Riassunto della Personalità Principale",
    element: "Elemento",
    number: "Numero",
    meaning: "Significato",
    naturalTalentsAbilities: "Talenti e abilità naturali",
    howOthersPerceive: "Come gli altri ti percepiscono",
    yourTalentsAbilities: "I tuoi talenti e abilità",
    innerDesiresMotivations: "I tuoi desideri interiori e motivazioni",
    outerPersonalityTraits: "La tua personalità esteriore",
    aboutTitle: "Sulla Numerologia",
    aboutText: "La numerologia è l'antica pratica di scoprire i significati nascosti dietro i numeri nella tua vita. Ogni numero porta vibrazioni ed energie uniche che possono rivelare intuizioni sulla tua personalità, scopo di vita e percorso spirituale.",
    lifePathDesc: "Il tuo numero più importante, che rivela lo scopo e il viaggio della tua vita.",
    expressionDesc: "Mostra i tuoi talenti naturali e come ti esprimi al mondo.",
    soulUrgeDesc: "Rivela i tuoi desideri interiori e ciò che ti motiva al livello più profondo.",
    personalityDesc: "Come gli altri ti percepiscono e l'impressione che fai sul mondo.",
    footer: "Di @novteaaa",
    languageSelect: "Lingua"
  },
  ja: {
    title: "神秘の数字",
    subtitle: "数秘術の古代の技法を通じて、あ��たの生年月日と名前に隠された意味を発見してください",
    readingTitle: "あなたの数秘術リーディング",
    birthDate: "生年月日",
    required: "*",
    fullName: "フルネーム（任意）",
    namePlaceholder: "完全なリーディングのためにフルネームを入力してください",
    revealButton: "私の数字を明かす",
    calculating: "あなたの数字を計算中...",
    lifePathTitle: "ライフパス数",
    birthdayTitle: "バースデー数",
    attitudeTitle: "アティテュード数",
    expressionTitle: "エクスプレッション数",
    soulUrgeTitle: "ソウルアージ数",
    personalityTitle: "パーソナリティ数",
    howCalculated: "計算方法:",
    addDigits: "生年月日のすべての数字を足します:",
    keyStrengths: "主な強み:",
    challenges: "注意すべき課題:",
    careerPath: "キャリアパス",
    relationships: "人間関係",
    growthPath: "成長の道",
    dayOfBirth: "誕生日",
    reflectsTraits: "はあなたの自然な才能と性格的特徴を反映しています。",
    calculation: "計算:",
    traits: "特徴:",
    howOthersSee: "他の人があなたをどう見るか:",
    revealsPerception: "この数字は他の人があなたをどう認識し、あなたが世界にどう自分を表現するかを明らかにします。",
    naturalTalents: "あなたの自然な才能と世界への表現方法。",
    innerDesires: "あなたの内なる願望と最も深いレベルでの動機。",
    outerPersonality: "他の人があなたをどう認識し、あなたが与える印象。",
    corePersonality: "核となる性格の要約",
    element: "要素",
    number: "数字",
    meaning: "意味",
    naturalTalentsAbilities: "自然な才能と能力",
    howOthersPerceive: "他の人があなたをどう認識するか",
    yourTalentsAbilities: "あなたの才能と能力",
    innerDesiresMotivations: "あなたの内なる願望と動機",
    outerPersonalityTraits: "あなたの外的な性格",
    aboutTitle: "数秘術について",
    aboutText: "数秘術は、あなたの人生における数字の背後にある隠された意味を発見する古代の実践です。各数字は独特の振動とエネルギーを持ち、あなたの性格、人生の目的、精神的な道についての洞察を明らかにすることができます。",
    lifePathDesc: "あなたの最も重要な数字で、人生の目的と旅路を明らかにします。",
    expressionDesc: "あなたの自然な才能と世界への表現方法を示します。",
    soulUrgeDesc: "あなたの内なる願望と最も深いレベルでの動機を明らかにします。",
    personalityDesc: "他の人があなたをどう認識し、世界に与える印象。",
    footer: "@novteaaa による",
    languageSelect: "言語"
  }
};

export default function Index() {
  const [birthday, setBirthday] = useState("");
  const [name, setName] = useState("");
  const [results, setResults] = useState<NumerologyResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  const reduceToSingleDigitWithSteps = (num: number, steps: string[] = []): { result: number, steps: string[] } => {
    if (num === 11 || num === 22 || num === 33) return { result: num, steps }; // Master numbers
    
    const allSteps = [...steps];
    let current = num;
    
    while (current > 9) {
      const digits = current.toString().split('').map(d => parseInt(d));
      const sum = digits.reduce((a, b) => a + b, 0);
      allSteps.push(`${digits.join(' + ')} = ${sum}`);
      current = sum;
    }
    
    return { result: current, steps: allSteps };
  };

  const getLetterValue = (letter: string): number => {
    const values: { [key: string]: number } = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
      S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    };
    return values[letter.toUpperCase()] || 0;
  };

  const calculateNumerology = () => {
    if (!birthday) return;
    
    setIsCalculating(true);
    
    setTimeout(() => {
      const date = new Date(birthday);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      // Life Path Number with detailed steps
      const lifePathSteps: string[] = [];
      const dayDigits = day.toString().split('').map(d => parseInt(d));
      const monthDigits = month.toString().split('').map(d => parseInt(d));
      const yearDigits = year.toString().split('').map(d => parseInt(d));
      
      const allDigits = [...dayDigits, ...monthDigits, ...yearDigits];
      lifePathSteps.push(`${allDigits.join(' + ')} = ${allDigits.reduce((a, b) => a + b, 0)}`);
      
      const lifePathCalc = reduceToSingleDigitWithSteps(allDigits.reduce((a, b) => a + b, 0), lifePathSteps);
      const lifePathNumber = lifePathCalc.result;

      // Birthday Number with steps (sum of all digits in birth date)
      const birthdaySteps: string[] = [];
      birthdaySteps.push(`${allDigits.join(' + ')} = ${allDigits.reduce((a, b) => a + b, 0)}`);
      const birthdayCalc = reduceToSingleDigitWithSteps(allDigits.reduce((a, b) => a + b, 0), birthdaySteps);
      const birthdayNumber = birthdayCalc.result;

      // Attitude Number (day + month)
      const attitudeSteps: string[] = [];
      attitudeSteps.push(`Day + Month: ${day} + ${month} = ${day + month}`);
      const attitudeCalc = reduceToSingleDigitWithSteps(day + month, attitudeSteps);
      const attitudeNumber = attitudeCalc.result;

      // If name is provided, calculate name-based numbers
      let expressionNumber = 1;
      let soulUrgeNumber = 1;
      let personalityNumber = 1;
      const expressionSteps: string[] = [];
      const soulUrgeSteps: string[] = [];
      const personalitySteps: string[] = [];

      if (name.trim()) {
        const vowels = 'AEIOU';
        const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
        
        const nameUpper = name.toUpperCase().replace(/[^A-Z]/g, '');
        
        // Expression Number (all letters)
        const expressionValues = nameUpper.split('').map(letter => getLetterValue(letter));
        expressionSteps.push(`${nameUpper.split('').map((letter, i) => `${letter}(${expressionValues[i]})`).join(' + ')} = ${expressionValues.reduce((a, b) => a + b, 0)}`);
        const expressionCalc = reduceToSingleDigitWithSteps(expressionValues.reduce((a, b) => a + b, 0), expressionSteps);
        expressionNumber = expressionCalc.result;

        // Soul Urge Number (vowels only)
        const vowelLetters = nameUpper.split('').filter(letter => vowels.includes(letter));
        if (vowelLetters.length > 0) {
          const vowelValues = vowelLetters.map(letter => getLetterValue(letter));
          soulUrgeSteps.push(`Vowels: ${vowelLetters.map((letter, i) => `${letter}(${vowelValues[i]})`).join(' + ')} = ${vowelValues.reduce((a, b) => a + b, 0)}`);
          const soulUrgeCalc = reduceToSingleDigitWithSteps(vowelValues.reduce((a, b) => a + b, 0), soulUrgeSteps);
          soulUrgeNumber = soulUrgeCalc.result;
        }

        // Personality Number (consonants only)
        const consonantLetters = nameUpper.split('').filter(letter => consonants.includes(letter));
        if (consonantLetters.length > 0) {
          const consonantValues = consonantLetters.map(letter => getLetterValue(letter));
          personalitySteps.push(`Consonants: ${consonantLetters.map((letter, i) => `${letter}(${consonantValues[i]})`).join(' + ')} = ${consonantValues.reduce((a, b) => a + b, 0)}`);
          const personalityCalc = reduceToSingleDigitWithSteps(consonantValues.reduce((a, b) => a + b, 0), personalitySteps);
          personalityNumber = personalityCalc.result;
        }
      }

      setResults({
        lifePathNumber,
        expressionNumber,
        soulUrgeNumber,
        personalityNumber,
        birthdayNumber,
        attitudeNumber,
        calculations: {
          lifePathSteps: lifePathCalc.steps,
          birthdaySteps: birthdayCalc.steps,
          attitudeSteps: attitudeCalc.steps,
          expressionSteps: expressionSteps.concat(reduceToSingleDigitWithSteps(expressionNumber).steps),
          soulUrgeSteps: soulUrgeSteps,
          personalitySteps: personalitySteps
        },
        birthDate: { day, month, year }
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const getBirthdayMeaning = (number: number) => {
    const meanings: { [key: number]: any } = {
      1: {
        title: language === 'en' ? "The Leader" : language === 'vi' ? "Người Lãnh Đạo" : language === 'it' ? "Il Leader" : "リーダー",
        components: language === 'en' ? "independence, leadership, confidence" :
                   language === 'vi' ? "độc lập, lãnh đạo, tự tin" :
                   language === 'it' ? "indipendenza, leadership, fiducia" :
                   "独立、リーダーシップ、自信",
        traits: language === 'en' ? [
          "Natural-born leaders who are independent and pioneering",
          "They thrive when they can take initiative and dislike being told what to do",
          "Innovation and originality are their strengths",
          "Need to carve their own path in life",
          "May need to watch out for arrogance or impatience"
        ] : language === 'vi' ? [
          "Lãnh đạo bẩm sinh, độc lập và tiên phong",
          "Họ phát triển khi có thể chủ động và không thích bị sai khiến",
          "Đổi mới và sáng tạo là điểm mạnh của họ",
          "Cần tự tạo con đ��ờng riêng trong cuộc sống",
          "Có thể cần cẩn thận với sự kiêu ngạo hoặc thiếu kiên nhẫn"
        ] : language === 'it' ? [
          "Leader nati che sono indipendenti e pionieristici",
          "Prosperano quando possono prendere l'iniziativa e non amano essere comandati",
          "Innovazione e originalità sono i loro punti di forza",
          "Hanno bisogno di tracciare il loro percorso nella vita",
          "Potrebbero dover fare attenzione all'arroganza o all'impazienza"
        ] : [
          "独立心とパイオニア精神を持つ生まれながらのリーダー",
          "主導権を握ることで成長し、指示されることを嫌う",
          "革新性と独創性が彼らの強み",
          "人生で自分だけの道を切り開く必要がある",
          "傲慢さや短気に注意が必要"
        ]
      },
      2: {
        title: language === 'en' ? "The Diplomat" : language === 'vi' ? "Nhà Ngoại Giao" : language === 'it' ? "Il Diplomatico" : "外交官",
        components: language === 'en' ? "sensitivity, harmony, cooperation" :
                   language === 'vi' ? "nhạy cảm, hòa hợp, hợp tác" :
                   language === 'it' ? "sensibilità, armonia, cooperazione" :
                   "敏感さ、調和、協力",
        traits: language === 'en' ? [
          "Gentle, peace-loving individuals who value relationships",
          "Sensitive to the needs of others and excel at creating harmony",
          "Prefer partnership over going solo, diplomacy is their strength",
          "Must be careful not to lose their identity while accommodating others",
          "Emotional intelligence is a natural gift"
        ] : language === 'vi' ? [
          "Những người nhẹ nhàng, yêu hòa bình và coi trọng các mối quan hệ",
          "Nhạy cảm với nhu cầu của người khác và xuất sắc trong việc tạo ra sự hòa hợp",
          "Thích hợp tác hơn là đi một mình, ngoại giao là điểm mạnh",
          "Phải cẩn thận không mất bản sắc khi chiều lòng người khác",
          "Trí tuệ cảm xúc là món quà tự nhiên"
        ] : language === 'it' ? [
          "Individui gentili e amanti della pace che apprezzano le relazioni",
          "Sensibili ai bisogni degli altri ed eccellono nel creare armonia",
          "Preferiscono la partnership al lavoro da soli, la diplomazia è la loro forza",
          "Devono stare attenti a non perdere la loro identità mentre si adattano agli altri",
          "L'intelligenza emotiva è un dono naturale"
        ] : [
          "人間関係を大切にする穏やかで平和を愛する人々",
          "他者のニーズに敏感で、調和を作り出すのが得意",
          "単独行動よりもパートナーシップを好み、外交が得意",
          "他者に合わせる中で自分のアイデンティティを失わないよう注意が必要",
          "感情的知性は天賦の才能"
        ]
      },
      3: {
        title: language === 'en' ? "The Communicator" : language === 'vi' ? "Người Giao Tiếp" : language === 'it' ? "Il Comunicatore" : "コミュニケーター",
        components: language === 'en' ? "creativity, joy, expression" :
                   language === 'vi' ? "sáng tạo, vui vẻ, biểu hiện" :
                   language === 'it' ? "creatività, gioia, espressione" :
                   "創造性、喜び、表現",
        traits: language === 'en' ? [
          "Vibrant, expressive, and full of creative energy",
          "Thrive in social settings and love to entertain or inspire",
          "Express joy and creativity through words, art, or performance",
          "Optimism and charm are their trademarks",
          "May need to learn focus and avoid superficiality"
        ] : language === 'vi' ? [
          "Sống động, biểu cảm và đầy năng lượng sáng tạo",
          "Phát triển trong môi trường xã hội và thích giải trí hoặc truyền cảm hứng",
          "Thể hiện niềm vui và sự sáng tạo qua lời nói, nghệ thuật hoặc biểu diễn",
          "Lạc quan và quyến rũ là đặc điểm nổi bật",
          "Có thể cần học cách tập trung và tránh sự hời hợt"
        ] : language === 'it' ? [
          "Vibranti, espressivi e pieni di energia creativa",
          "Prosperano in contesti sociali e amano intrattenere o ispirare",
          "Esprimono gioia e creatività attraverso parole, arte o performance",
          "Ottimismo e fascino sono i loro marchi di fabbrica",
          "Potrebbero aver bisogno di imparare a concentrarsi ed evitare la superficialità"
        ] : [
          "活気があり、表現力豊かで創造的エネルギーに満ちている",
          "社交的な場で成長し、人を楽しませたり刺激を与えるのが好き",
          "言葉、芸術、パフォーマンスを通じて喜びと創造性を表現",
          "楽観主義と魅力が彼らの特徴",
          "集中力を学び、表面的になることを避ける必要があるかもしれない"
        ]
      },
      4: {
        title: language === 'en' ? "The Builder" : language === 'vi' ? "Người Xây Dựng" : language === 'it' ? "Il Costruttore" : "建設者",
        components: language === 'en' ? "stability, discipline, structure" :
                   language === 'vi' ? "ổn định, kỷ luật, cấu trúc" :
                   language === 'it' ? "stabilità, disciplina, struttura" :
                   "安定、規律、構造",
        traits: language === 'en' ? [
          "Strong willpower and can turn dreams into reality through discipline",
          "Often experience early struggles but grow stronger over time",
          "Work best when they build solid foundations and stay consistent",
          "Creative minds with a practical approach",
          "Excel at building stable systems in business, family, or community"
        ] : language === 'vi' ? [
          "Ý chí mạnh mẽ và có thể biến giấc mơ thành hiện thực qua kỷ luật",
          "Thường trải qua khó khăn ban đầu nhưng trở nên mạnh mẽ hơn theo thời gian",
          "Làm việc tốt nhất khi xây dựng nền tảng vững chắc và duy trì nhất quán",
          "Có tư duy sáng tạo với cách tiếp cận thực tế",
          "Xuất sắc trong việc xây dựng hệ thống ổn định trong kinh doanh, gia đình hoặc cộng đồng"
        ] : language === 'it' ? [
          "Forte forza di volontà e possono trasformare i sogni in realtà attraverso la disciplina",
          "Spesso sperimentano lotte iniziali ma diventano più forti nel tempo",
          "Lavorano meglio quando costruiscono fondamenta solide e rimangono coerenti",
          "Menti creative con un approccio pratico",
          "Eccellono nel costruire sistemi stabili negli affari, famiglia o comunità"
        ] : [
          "強い意志力を持ち、規律を通じて夢を現実に変えることができる",
          "しばしば初期の困難を経験するが、時間と共により強くなる",
          "堅固な基盤を築き、一貫性を保つときに最高の働きをする",
          "実用的なアプローチを持つ創造的な心",
          "ビジネス、家族、コミュニティで安定したシステムを構築するのが得意"
        ]
      },
      5: {
        title: language === 'en' ? "The Adventurer" : language === 'vi' ? "Nhà Thám Hiểm" : language === 'it' ? "L'Avventuriero" : "冒険家",
        components: language === 'en' ? "freedom, versatility, curiosity" :
                   language === 'vi' ? "tự do, linh hoạt, tò mò" :
                   language === 'it' ? "libertà, versatilità, curiosità" :
                   "自由、多様性、好奇心",
        traits: language === 'en' ? [
          "Dynamic and thrive on variety and new experiences",
          "Curious, energetic, and easily bored by routine",
          "Communication comes naturally and they seek freedom in all areas",
          "Challenge is to avoid scattering energy and develop discipline",
          "When balanced, they live a life full of excitement and growth"
        ] : language === 'vi' ? [
          "Năng động và phát triển với sự đa dạng và trải nghiệm mới",
          "Tò mò, năng động và dễ chán với thói quen",
          "Giao tiếp tự nhiên và tìm kiếm tự do trong mọi lĩnh vực",
          "Thách thức là tránh phân tán năng lượng và phát triển kỷ luật",
          "Khi cân bằng, họ sống một cuộc sống đầy phấn khích và phát triển"
        ] : language === 'it' ? [
          "Dinamici e prosperano con varietà e nuove esperienze",
          "Curiosi, energici e facilmente annoiati dalla routine",
          "La comunicazione viene naturale e cercano libertà in tutte le aree",
          "La sfida è evitare di disperdere l'energia e sviluppare disciplina",
          "Quando equilibrati, vivono una vita piena di eccitazione e crescita"
        ] : [
          "ダイナミックで、多様性と新しい体験で成長する",
          "好奇心旺盛で活発、ルーティンに飽きやすい",
          "コミュニケーションが自然で、すべての分野で自由を求める",
          "エネルギーを散漫にせず、規律を身につけることが課題",
          "バランスが取れているとき、興奮と成長に満ちた人生を送る"
        ]
      },
      6: {
        title: language === 'en' ? "The Nurturer" : language === 'vi' ? "Người Nuôi Dưỡng" : language === 'it' ? "Il Nutritore" : "育成者",
        components: language === 'en' ? "responsibility, care, harmony" :
                   language === 'vi' ? "trách nhiệm, chăm sóc, hòa hợp" :
                   language === 'it' ? "responsabilità, cura, armonia" :
                   "責任、ケア、調和",
        traits: language === 'en' ? [
          "Loving, compassionate, and protective by nature",
          "Often take on caretaker roles and are drawn to family and community",
          "Bring harmony and beauty into their environments",
          "Sometimes can become overly responsible or controlling",
          "Their strength lies in service and emotional support"
        ] : language === 'vi' ? [
          "Yêu thương, từ bi và bảo vệ theo bản tính",
          "Thường đảm nhận vai trò chăm sóc và bị thu hút bởi gia đình và cộng đồng",
          "Mang lại sự hòa hợp và vẻ đẹp vào môi trường của họ",
          "Đôi khi có thể trở nên quá có trách nhiệm hoặc kiểm soát",
          "Sức mạnh của họ nằm ở việc phục vụ và hỗ trợ cảm xúc"
        ] : language === 'it' ? [
          "Amorevoli, compassionevoli e protettivi per natura",
          "Spesso assumono ruoli di caregiver e sono attratti dalla famiglia e comunità",
          "Portano armonia e bellezza nei loro ambienti",
          "A volte possono diventare eccessivamente responsabili o controllanti",
          "La loro forza risiede nel servizio e nel supporto emotivo"
        ] : [
          "本質的に愛情深く、思いやりがあり、保護的",
          "しばしば世話役の役割を担い、家族やコミュニティに惹かれる",
          "環境に調和と美をもたらす",
          "時として過度に責任感を感じたり、コントロールしがちになることも",
          "彼らの強みはサービスと感情的サポ��トにある"
        ]
      },
      7: {
        title: language === 'en' ? "The Seeker" : language === 'vi' ? "Người Tìm Kiếm" : language === 'it' ? "Il Cercatore" : "探求者",
        components: language === 'en' ? "introspection, wisdom, analysis" :
                   language === 'vi' ? "nội tâm, khôn ngoan, phân tích" :
                   language === 'it' ? "introspezione, saggezza, analisi" :
                   "内省、知恵、分析",
        traits: language === 'en' ? [
          "Thinkers, philosophers, and spiritual seekers",
          "Need time alone to reflect and recharge",
          "Often question the deeper meaning of life and are highly intuitive",
          "Love learning, especially in science, metaphysics, or psychology",
          "Can sometimes seem distant or mysterious to others"
        ] : language === 'vi' ? [
          "Những nhà tư tưởng, triết gia và người tìm kiếm tâm linh",
          "Cần thời gian một mình để suy ngẫm và nạp lại năng lượng",
          "Thường đặt câu hỏi về ý nghĩa sâu sắc của cuộc sống và có trực giác cao",
          "Thích học hỏi, đặc biệt trong khoa học, siêu hình học hoặc tâm lý học",
          "Đôi khi có thể tỏ ra xa cách hoặc bí ẩn với người khác"
        ] : language === 'it' ? [
          "Pensatori, filosofi e cercatori spirituali",
          "Hanno bisogno di tempo da soli per riflettere e ricaricarsi",
          "Spesso questionano il significato più profondo della vita e sono altamente intuitivi",
          "Amano imparare, specialmente in scienza, metafisica o psicologia",
          "A volte possono sembrare distanti o misteriosi agli altri"
        ] : [
          "思想家、哲学者、精神的探求者",
          "反省し、エネルギーを補充するために一人の時間が必要",
          "しばしば人生の深い意味を問い、高い直感力を持つ",
          "特に科学、形而上学、心理学の学習を愛する",
          "時として他者には距離感があったり神秘的に見えることがある"
        ]
      },
      8: {
        title: language === 'en' ? "The Achiever" : language === 'vi' ? "Người Đạt Được" : language === 'it' ? "Il Realizzatore" : "達成者",
        components: language === 'en' ? "power, ambition, material success" :
                   language === 'vi' ? "quyền lực, tham vọng, thành công vật chất" :
                   language === 'it' ? "potere, ambizione, successo materiale" :
                   "力、野心、物質的成功",
        traits: language === 'en' ? [
          "Powerful, strategic, and goal-oriented individuals",
          "Natural managers who often gravitate toward business or leadership",
          "Driven to achieve and often focus on material and financial success",
          "Challenge is to manage control, ego, and find balance between power and compassion",
          "When aligned, they can create real-world success and impact"
        ] : language === 'vi' ? [
          "Những cá nhân mạnh mẽ, chiến lược và hướng mục tiêu",
          "Nhà quản lý bẩm sinh thường hướng đến kinh doanh hoặc lãnh đạo",
          "Được thúc đẩy để đạt được và thường tập trung vào thành công vật chất và tài chính",
          "Thách thức là quản lý sự kiểm soát, cái tôi và tìm sự cân bằng giữa quyền lực và lòng trắc ẩn",
          "Khi phù hợp, họ có thể tạo ra thành công và tác động trong thế giới thực"
        ] : language === 'it' ? [
          "Individui potenti, strategici e orientati agli obiettivi",
          "Manager naturali che spesso gravitano verso il business o la leadership",
          "Spinti a raggiungere e spesso si concentrano sul successo materiale e finanziario",
          "La sfida è gestire il controllo, l'ego e trovare equilibrio tra potere e compassione",
          "Quando allineati, possono creare successo e impatto nel mondo reale"
        ] : [
          "力強く、戦略的で目標志向の個人",
          "ビジネスやリーダーシップに引かれる天然のマネージャー",
          "達成への意欲があり、しばしば物質的・金銭的成功に焦点を当てる",
          "コントロール、エゴを管理し、力と思いやりのバランスを見つけることが課題",
          "調和がとれているとき、現実世界での成功と影響を生み出すことができる"
        ]
      },
      9: {
        title: language === 'en' ? "The Humanitarian" : language === 'vi' ? "Người Nhân Đạo" : language === 'it' ? "L'Umanitario" : "人道主義者",
        components: language === 'en' ? "compassion, idealism, generosity" :
                   language === 'vi' ? "lòng trắc ẩn, lý tưởng, rộng lượng" :
                   language === 'it' ? "compassione, idealismo, generosità" :
                   "思いやり、理想主義、寛大さ",
        traits: language === 'en' ? [
          "Compassionate, wise, and deeply connected to humanity",
          "Idealists who want to make the world a better place",
          "Art, service, and healing are often part of their journey",
          "May carry emotional wounds that lead them to help others",
          "Their path is about unconditional love and service on a large scale"
        ] : language === 'vi' ? [
          "Từ bi, khôn ngoan và kết nối sâu sắc với nhân loại",
          "Những người lý tưởng muốn làm cho thế giới trở nên tốt đẹp hơn",
          "Nghệ thuật, phục vụ và chữa lành thường là một phần của hành trình",
          "Có thể mang theo những vết thương cảm xúc dẫn đến việc giúp đỡ người khác",
          "Con đường của họ là về tình yêu vô điều kiện và phục vụ trên quy mô lớn"
        ] : language === 'it' ? [
          "Compassionevoli, saggi e profondamente connessi all'umanità",
          "Idealisti che vogliono rendere il mondo un posto migliore",
          "Arte, servizio e guarigione sono spesso parte del loro viaggio",
          "Potrebbero portare ferite emotive che li portano ad aiutare gli altri",
          "Il loro percorso riguarda l'amore incondizionato e il servizio su larga scala"
        ] : [
          "思いやりがあり、賢明で、人類と深くつながっている",
          "世界をより良い場所にしたい理想主義者",
          "芸術、奉仕、癒しがしばしば彼らの旅の一部",
          "他者を助けることにつながる感情的な傷を抱えているかもしれない",
          "彼らの道は無条件の愛と大規模な奉仕について"
        ]
      },
      11: {
        title: language === 'en' ? "The Visionary — Master Number" : language === 'vi' ? "Người Có Tầm Nhìn — Số Chủ" : language === 'it' ? "Il Visionario — Numero Maestro" : "ビジョナリー — マスターナンバー",
        components: language === 'en' ? "intuition, inspiration, spiritual insight" :
                   language === 'vi' ? "trực giác, cảm hứng, thấu hiểu tâm linh" :
                   language === 'it' ? "intuizione, ispirazione, intuizione spirituale" :
                   "直感、インスピレーション、精神的洞察",
        traits: language === 'en' ? [
          "Master Number — highly spiritual, intuitive, and visionary",
          "Often feel a deep sense of purpose from an early age",
          "May experience intense inner conflict, needing time to align with their calling",
          "Meant to uplift and inspire others through teaching, healing, or art",
          "Challenge is to master self-doubt and embrace their spiritual gifts"
        ] : language === 'vi' ? [
          "Số Chủ — rất tâm linh, trực giác và có tầm nhìn",
          "Thường cảm thấy một mục đích sâu sắc từ khi còn nhỏ",
          "Có thể trải qua xung đột nội tâm dữ dội, cần thời gian để phù hợp với sứ mệnh",
          "Được sinh ra để nâng đỡ và truyền cảm hứng cho người khác qua giảng dạy, chữa lành hoặc nghệ thuật",
          "Thách thức là làm chủ sự nghi ngờ bản thân và chấp nhận những món quà tâm linh"
        ] : language === 'it' ? [
          "Numero Maestro — altamente spirituale, intuitivo e visionario",
          "Spesso sentono un profondo senso di scopo fin dalla giovane età",
          "Potrebbero sperimentare conflitti interni intensi, necessitando tempo per allinearsi con la loro chiamata",
          "Destinati a elevare e ispirare gli altri attraverso insegnamento, guarigione o arte",
          "La sfida è padroneggiare l'autodubito e abbracciare i loro doni spirituali"
        ] : [
          "マスターナンバー — 高度に精神的、直感的、ビジョナリー",
          "しばしば若い頃から深い目的意識を感じる",
          "激しい内的葛藤を経験し、自分の使命と調和するのに時間が必要かもしれない",
          "教育、癒し、芸術を通じて他者を高め、インスピレーションを与える運命",
          "自己疑念を克服し、精神的な才能を受け入れることが課題"
        ]
      },
      22: {
        title: language === 'en' ? "The Master Builder — Master Number" : language === 'vi' ? "Người Xây Dựng Bậc Thầy — Số Chủ" : language === 'it' ? "Il Costruttore Maestro — Numero Maestro" : "マスタービルダー — マスターナンバー",
        components: language === 'en' ? "vision, leadership, manifestation" :
                   language === 'vi' ? "tầm nhìn, lãnh đạo, hiện thực hóa" :
                   language === 'it' ? "visione, leadership, manifestazione" :
                   "ビジョン、リーダーシップ、現実化",
        traits: language === 'en' ? [
          "Master Number combining spiritual vision with practical action",
          "Capable of building things that last — movements, communities, legacies",
          "Have both intuition and discipline, making them powerful forces for change",
          "Challenge is to believe in their potential and not settle for mediocrity",
          "Born to turn dreams into reality on a large scale"
        ] : language === 'vi' ? [
          "Số Chủ kết hợp tầm nhìn tâm linh với hành động thực tế",
          "Có khả năng xây dựng những thứ bền vững — các phong trào, cộng đồng, di sản",
          "Có cả trực giác và kỷ luật, khiến họ trở thành lực lượng mạnh mẽ cho sự thay đổi",
          "Thách thức là tin vào tiềm năng của họ và không chấp nhận sự tầm thường",
          "Sinh ra để biến giấc mơ thành hiện thực trên quy mô lớn"
        ] : language === 'it' ? [
          "Numero Maestro che combina visione spirituale con azione pratica",
          "Capaci di costruire cose durature — movimenti, comunità, eredità",
          "Hanno sia intuizione che disciplina, rendendoli forze potenti per il cambiamento",
          "La sfida è credere nel loro potenziale e non accontentarsi della mediocrità",
          "Nati per trasformare i sogni in realtà su larga scala"
        ] : [
          "精神的ビジョンと実践的行動を組み合わせるマスターナンバー",
          "持続するもの — 運動、コミュニティ、遺産を構築する能力がある",
          "直感と規律の���方を持ち、変化のための強力な力となる",
          "自分の可能性を信じ、平凡に甘んじないことが課題",
          "大規模に夢を現実に変えるために生まれた"
        ]
      }
    };

    return meanings[number] || {
      title: language === 'en' ? "Unique Energy" : language === 'vi' ? "Năng Lượng Độc Đáo" : language === 'it' ? "Energia Unica" : "ユニークなエネルギー",
      components: language === 'en' ? "special energy" : language === 'vi' ? "năng lượng đặc biệt" : language === 'it' ? "energia speciale" : "特別なエネルギー",
      traits: [language === 'en' ? "A unique and special energy surrounds this number" :
              language === 'vi' ? "Một năng lượng độc đáo và đặc biệt bao quanh con số này" :
              language === 'it' ? "Un'energia unica e speciale circonda questo numero" :
              "この数字には独特で特別なエネルギーが宿っています"]
    };
  };

  const getAttitudeMeaning = (number: number) => {
    const meanings: { [key: number]: any } = {
      1: {
        title: language === 'en' ? "The Leader" : language === 'vi' ? "Người Lãnh Đạo" : language === 'it' ? "Il Leader" : "リーダー",
        components: language === 'en' ? "confidence, independence, assertiveness" :
                   language === 'vi' ? "tự tin, độc lập, quyết đoán" :
                   language === 'it' ? "fiducia, indipendenza, assertività" :
                   "自信、独立、積極性",
        perception: language === 'en' ? "You're seen as confident, independent, and assertive. Others perceive you as a natural leader who takes initiative." :
                   language === 'vi' ? "Bạn được nhìn nhận là tự tin, độc lập và quyết đoán. Người khác coi bạn là lãnh đạo tự nhiên luôn chủ động." :
                   language === 'it' ? "Sei visto come sicuro di te, indipendente e assertivo. Gli altri ti percepiscono come un leader naturale che prende l'iniziativa." :
                   "あなたは自信があり、独立心があり、積極的だと見られています。他の人はあなたを主導権を握る天然のリーダーとして認識しています。"
      },
      2: {
        title: language === 'en' ? "The Diplomat" : language === 'vi' ? "Nhà Ngoại Giao" : language === 'it' ? "Il Diplomatico" : "外交官",
        components: language === 'en' ? "kindness, cooperation, diplomacy" :
                   language === 'vi' ? "tử t��, hợp tác, ngoại giao" :
                   language === 'it' ? "gentilezza, cooperazione, diplomazia" :
                   "優しさ、協力、外交",
        perception: language === 'en' ? "You're seen as diplomatic, kind, and cooperative. People may view you as a good listener and peacekeeper." :
                   language === 'vi' ? "Bạn được nhìn nhận là có tài ngoại giao, tử tế và hợp tác. Mọi người có thể coi bạn là người biết lắng nghe và gìn giữ hòa bình." :
                   language === 'it' ? "Sei visto come diplomatico, gentile e cooperativo. Le persone possono vederti come un buon ascoltatore e pacificatore." :
                   "あなたは外交的で親切、協力的だと見られています。人々はあなたを良い聞き手で平和維持者として見るかもしれません。"
      },
      3: {
        title: language === 'en' ? "The Communicator" : language === 'vi' ? "Người Giao Tiếp" : language === 'it' ? "Il Comunicatore" : "コミュニケーター",
        components: language === 'en' ? "expression, sociability, optimism" :
                   language === 'vi' ? "biểu đạt, giao tiếp, lạc quan" :
                   language === 'it' ? "espressione, socievolezza, ottimismo" :
                   "表現、社交性、楽観主義",
        perception: language === 'en' ? "You're seen as expressive, social, and fun-loving. Others are drawn to your creative and optimistic energy." :
                   language === 'vi' ? "Bạn được nhìn nhận là biểu cảm, giao tiếp và vui vẻ. Người khác bị thu hút bởi năng lượng sáng tạo và lạc quan của bạn." :
                   language === 'it' ? "Sei visto come espressivo, sociale e amante del divertimento. Gli altri sono attratti dalla tua energia creativa e ottimista." :
                   "あなたは表現力豊かで社交的、楽しいことが好きだと見られています。他の人はあなたの創造的で楽観的なエネルギーに惹かれます。"
      },
      4: {
        title: language === 'en' ? "The Builder" : language === 'vi' ? "Người Xây Dựng" : language === 'it' ? "Il Costruttore" : "建設者",
        components: language === 'en' ? "dependability, structure, loyalty" :
                   language === 'vi' ? "đáng tin cậy, cấu trúc, trung thành" :
                   language === 'it' ? "affidabilità, struttura, lealtà" :
                   "信頼性、構造、忠誠心",
        perception: language === 'en' ? "You're seen as dependable, grounded, and hardworking. Others might see you as someone who values structure, planning, and loyalty." :
                   language === 'vi' ? "Bạn được nhìn nhận là đáng tin cậy, vững chắc và chăm chỉ. Người khác có thể coi bạn là người coi trọng cấu trúc, kế hoạch và lòng trung thành." :
                   language === 'it' ? "Sei visto come affidabile, con i piedi per terra e laborioso. Gli altri potrebbero vederti come qualcuno che apprezza struttura, pianificazione e lealtà." :
                   "あなたは信頼でき、地に足がついていて、勤勉だと見られています。他の人はあなたを構造、計画、忠誠心を重視する人として見るかもしれません。"
      },
      5: {
        title: language === 'en' ? "The Adventurer" : language === 'vi' ? "Nhà Thám Hiểm" : language === 'it' ? "L'Avventuriero" : "冒険家",
        components: language === 'en' ? "adventure, energy, adaptability" :
                   language === 'vi' ? "phiêu lưu, năng lượng, thích ứng" :
                   language === 'it' ? "avventura, energia, adattabilità" :
                   "冒険、エネルギー、適応性",
        perception: language === 'en' ? "You're seen as adventurous, energetic, and adaptable. People may see you as a free spirit who embraces change." :
                   language === 'vi' ? "Bạn được nhìn nhận là phiêu lưu, năng động và thích ứng. Mọi người có thể coi bạn là linh hồn tự do chấp nhận thay đổi." :
                   language === 'it' ? "Sei visto come avventuroso, energico e adattabile. Le persone possono vederti come uno spirito libero che abbraccia il cambiamento." :
                   "あなたは冒険的で活発、適応性があると見られています。人々はあなたを変化を受け入れる自由な精神として見るかもしれません。"
      },
      6: {
        title: language === 'en' ? "The Nurturer" : language === 'vi' ? "Người Nuôi Dưỡng" : language === 'it' ? "Il Nutritore" : "育成者",
        components: language === 'en' ? "nurturing, responsibility, support" :
                   language === 'vi' ? "nuôi dưỡng, trách nhiệm, hỗ trợ" :
                   language === 'it' ? "nutrimento, responsabilità, supporto" :
                   "育成、責任、サポート",
        perception: language === 'en' ? "You're seen as nurturing, responsible, and supportive. Others likely see you as a caregiver or someone to trust." :
                   language === 'vi' ? "Bạn được nhìn nhận là nuôi dưỡng, có trách nhiệm và hỗ trợ. Người khác có thể coi bạn là người chăm sóc hoặc đáng tin cậy." :
                   language === 'it' ? "Sei visto come premuroso, responsabile e di supporto. Gli altri probabilmente ti vedono come un caregiver o qualcuno di cui fidarsi." :
                   "あなたは育成的で責任感があり、支援的だと見られています。他の人はあなたを介護者や信頼できる人として見るでしょう。"
      },
      7: {
        title: language === 'en' ? "The Seeker" : language === 'vi' ? "Người Tìm Kiếm" : language === 'it' ? "Il Cercatore" : "探求者",
        components: language === 'en' ? "mystery, wisdom, introspection" :
                   language === 'vi' ? "bí ẩn, khôn ngoan, nội tâm" :
                   language === 'it' ? "mistero, saggezza, introspezione" :
                   "神秘、知恵、内省",
        perception: language === 'en' ? "You're seen as mysterious, wise, and introspective. Others may perceive you as deep, thoughtful, or even a bit reserved." :
                   language === 'vi' ? "Bạn được nhìn nhận là bí ẩn, khôn ngoan và nội tâm. Người khác có thể coi bạn là sâu sắc, chu đáo, hoặc thậm chí hơi dè dặt." :
                   language === 'it' ? "Sei visto come misterioso, saggio e introspettivo. Gli altri possono percepirti come profondo, riflessivo o anche un po' riservato." :
                   "あなたは神秘的で賢明、内省的だと見られています。他の人はあなたを深く思慮深い、あるいは少し控えめな人として認識するかもしれません。"
      },
      8: {
        title: language === 'en' ? "The Achiever" : language === 'vi' ? "Người Đạt Được" : language === 'it' ? "Il Realizzatore" : "達成者",
        components: language === 'en' ? "ambition, capability, influence" :
                   language === 'vi' ? "tham vọng, khả năng, ảnh hưởng" :
                   language === 'it' ? "ambizione, capacità, influenza" :
                   "野心、能力、影響力",
        perception: language === 'en' ? "You're seen as ambitious, capable, and influential. People may view you as someone with strong leadership and business sense." :
                   language === 'vi' ? "Bạn được nhìn nhận là tham vọng, có khả năng và ảnh hưởng. Mọi người có thể coi bạn là người có khả năng lãnh đạo mạnh mẽ và óc kinh doanh." :
                   language === 'it' ? "Sei visto come ambizioso, capace e influente. Le persone possono vederti come qualcuno con forte leadership e senso degli affari." :
                   "あなたは野心的で有能、影響力があると見られています。人々はあなたを強いリーダーシップとビジネスセンスを持つ人として見るかもしれません。"
      },
      9: {
        title: language === 'en' ? "The Humanitarian" : language === 'vi' ? "Người Nhân Đạo" : language === 'it' ? "L'Umanitario" : "人道主義者",
        components: language === 'en' ? "compassion, generosity, idealism" :
                   language === 'vi' ? "lòng trắc ẩn, rộng lượng, lý tưởng" :
                   language === 'it' ? "compassione, generosità, idealismo" :
                   "思いやり、寛大さ、理想主義",
        perception: language === 'en' ? "You're seen as compassionate, generous, and idealistic. Others see you as someone who wants to make a difference in the world." :
                   language === 'vi' ? "Bạn được nhìn nhận là từ bi, rộng lượng và lý tưởng. Người khác coi bạn là người muốn tạo ra sự khác biệt trong thế giới." :
                   language === 'it' ? "Sei visto come compassionevole, generoso e idealista. Gli altri ti vedono come qualcuno che vuole fare la differenza nel mondo." :
                   "あなたは思いやりがあり、寛大で理想主義的だと見られています。他の人はあなたを世界に変化をもたらしたい人として見ています。"
      },
      11: {
        title: language === 'en' ? "The Visionary — Master Number" : language === 'vi' ? "Người Có Tầm Nhìn — Số Chủ" : language === 'it' ? "Il Visionario — Numero Maestro" : "ビジョナリー — マスターナンバー",
        components: language === 'en' ? "inspiration, intuition, spiritual insight" :
                   language === 'vi' ? "cảm hứng, trực giác, thấu hiểu tâm linh" :
                   language === 'it' ? "ispirazione, intuizione, intuizione spirituale" :
                   "インスピレーション、直感、精神的洞察",
        perception: language === 'en' ? "You're seen as inspiring, intuitive, and visionary. People may feel drawn to your wisdom and spiritual insight." :
                   language === 'vi' ? "Bạn được nhìn nhận là truyền cảm hứng, trực giác và có tầm nhìn. Mọi người có thể bị thu hút bởi trí tuệ và thấu hiểu tâm linh c��a bạn." :
                   language === 'it' ? "Sei visto come ispirante, intuitivo e visionario. Le persone possono sentirsi attratte dalla tua saggezza e intuizione spirituale." :
                   "あなたはインスピレーションを与え、直感的でビジョナリーだと見られています。人々はあなたの知恵と精神的洞察に惹かれるかもしれません。"
      },
      22: {
        title: language === 'en' ? "The Master Builder — Master Number" : language === 'vi' ? "Người Xây Dựng Bậc Thầy — Số Chủ" : language === 'it' ? "Il Costruttore Maestro — Numero Maestro" : "マスタービルダー — マスターナンバー",
        components: language === 'en' ? "power, mastery, practicality" :
                   language === 'vi' ? "quyền lực, thành thạo, thực tế" :
                   language === 'it' ? "potere, maestria, praticità" :
                   "力、熟練、実用性",
        perception: language === 'en' ? "You're seen as powerful, masterful, and practical. Others see your potential to achieve great things for the collective." :
                   language === 'vi' ? "Bạn được nhìn nhận là mạnh mẽ, thành thạo và thực tế. Người khác thấy tiềm năng của bạn để đ���t được những điều vĩ đại cho tập thể." :
                   language === 'it' ? "Sei visto come potente, magistrale e pratico. Gli altri vedono il tuo potenziale per raggiungere grandi cose per il collettivo." :
                   "あなた���力強く、熟練していて実用的だと見られています。他の人はあなたが集合体のために偉大なことを成し遂げる可能性を見ています。"
      }
    };

    return meanings[number] || {
      title: language === 'en' ? "Unique Energy" : language === 'vi' ? "Năng Lượng Độc Đáo" : language === 'it' ? "Energia Unica" : "ユニークなエネルギー",
      components: language === 'en' ? "special energy" : language === 'vi' ? "năng lượng đặc biệt" : language === 'it' ? "energia speciale" : "特別なエネルギー",
      perception: language === 'en' ? "You have a unique energy that others find intriguing." :
                 language === 'vi' ? "Bạn có một năng lượng độc đáo mà người khác thấy hấp dẫn." :
                 language === 'it' ? "Hai un'energia unica che gli altri trovano intrigante." :
                 "あなたには他の人が興味深いと感じるユニークなエネルギーがあります。"
    };
  };

  const getDetailedMeaning = (number: number, type: string) => {
    const meanings: { [key: string]: { [key: number]: any } } = {
      lifePath: {
        1: {
          title: language === 'en' ? "The Leader" : language === 'vi' ? "Người Lãnh Đạo" : language === 'it' ? "Il Leader" : "リーダー",
          description: language === 'en' ? "Natural born leader, independent, pioneering spirit" : 
                      language === 'vi' ? "Lãnh đạo bẩm sinh, độc lập, tinh thần tiên phong" :
                      language === 'it' ? "Leader nato, indipendente, spirito pionieristico" :
                      "生まれながらのリーダー、独立心、開拓精神",
          strengths: language === 'en' ? ["Independent", "Leadership", "Innovation", "Self-reliant", "Ambitious"] :
                    language === 'vi' ? ["Độc lập", "Lãnh đạo", "Đổi mới", "Tự lực", "Tham vọng"] :
                    language === 'it' ? ["Indipendente", "Leadership", "Innovazione", "Autosufficiente", "Ambizioso"] :
                    ["独立", "リーダーシップ", "革新", "自立", "野心的"],
          challenges: language === 'en' ? ["Can be domineering", "Impatient", "Self-centered", "Stubborn"] :
                     language === 'vi' ? ["Có thể hống hách", "Thiếu kiên nhẫn", "Tự cho mình là trung tâm", "Cứng đầu"] :
                     language === 'it' ? ["Può essere prepotente", "Impaziente", "Egocentrico", "Testardo"] :
                     ["支配的になりがち", "短気", "自己中心的", "頑固"],
          career: language === 'en' ? "Entrepreneurship, management, politics, innovation, self-employment" :
                 language === 'vi' ? "Kinh doanh, quản lý, chính trị, đổi mới, tự kinh doanh" :
                 language === 'it' ? "Imprenditorialità, gestione, politica, innovazione, lavoro autonomo" :
                 "起業、管理、政治、革新、自営業",
          relationships: language === 'en' ? "Needs a partner who respects independence and supports ambitions" :
                        language === 'vi' ? "Cần một đối tác tôn trọng sự độc lập và ủng hộ tham vọng" :
                        language === 'it' ? "Ha bisogno di un partner che rispetti l'indipendenza e sostenga le ambizioni" :
                        "独立性を尊重し、野心を支える パートナーが必要",
          growth: language === 'en' ? "Learn to collaborate while maintaining leadership qualities" :
                 language === 'vi' ? "Học cách hợp tác trong khi duy trì phẩm chất lãnh đạo" :
                 language === 'it' ? "Imparare a collaborare mantenendo le qualità di leadership" :
                 "リーダーシップの資質��維持しながら協力することを学ぶ"
        },
        7: {
          title: language === 'en' ? "The Seeker" : language === 'vi' ? "Người Tìm Kiếm" : language === 'it' ? "Il Cercatore" : "探求者",
          description: language === 'en' ? "Analytical, spiritual, introspective seeker" : 
                      language === 'vi' ? "Người tìm kiếm phân tích, tâm linh, nội tâm" :
                      language === 'it' ? "Cercatore analitico, spirituale, introspettivo" :
                      "分析的、精神的、内省的な探求者",
          strengths: language === 'en' ? ["Analytical", "Spiritual", "Intuitive", "Introspective", "Wise"] :
                    language === 'vi' ? ["Phân tích", "Tâm linh", "Trực giác", "Nội tâm", "Khôn ngoan"] :
                    language === 'it' ? ["Analitico", "Spirituale", "Intuitivo", "Introspettivo", "Saggio"] :
                    ["分析的", "精神的", "直感的", "内省的", "賢い"],
          challenges: language === 'en' ? ["Aloof", "Secretive", "Skeptical", "Isolated", "Overthinking"] :
                     language === 'vi' ? ["Xa cách", "Bí mật", "Hoài nghi", "Cô lập", "Suy nghĩ quá nhiều"] :
                     language === 'it' ? ["Distaccato", "Riservato", "Scettico", "Isolato", "Pensare troppo"] :
                     ["よそよそしい", "秘密主義", "懐疑的", "孤立", "考えすぎ"],
          career: language === 'en' ? "Research, analysis, spirituality, psychology, writing, science" :
                 language === 'vi' ? "Nghiên cứu, phân tích, tâm linh, tâm lý học, viết lách, khoa học" :
                 language === 'it' ? "Ricerca, analisi, spiritualità, psicologia, scrittura, scienza" :
                 "研究、分析、精神性、心理学、執筆、科学",
          relationships: language === 'en' ? "Needs deep, meaningful connections with understanding partners" :
                        language === 'vi' ? "Cần những kết nối sâu sắc, ý nghĩa với đối tác hiểu biết" :
                        language === 'it' ? "Ha bisogno di connessioni profonde e significative con partner comprensivi" :
                        "理解のあるパートナーとの深く意味のあるつながりが必要",
          growth: language === 'en' ? "Balance solitude with meaningful social connections" :
                 language === 'vi' ? "Cân bằng sự cô đơn với các kết nối xã hội có ý nghĩa" :
                 language === 'it' ? "Bilanciare la solitudine con connessioni sociali significative" :
                 "孤独と意味のある社会的つながりのバランスを取る"
        }
      }
    };
    
    return meanings[type]?.[number] || {
      title: language === 'en' ? "Unique Energy" : language === 'vi' ? "Năng Lượng Độc Đáo" : language === 'it' ? "Energia Unica" : "ユニークなエネルギー",
      description: language === 'en' ? "A unique and special energy surrounds this number" : 
                  language === 'vi' ? "Một năng lượng độc đáo và đặc biệt bao quanh con số này" :
                  language === 'it' ? "Un'energia unica e speciale circonda questo numero" :
                  "この数字には独特で特別なエネルギーが宿っています",
      strengths: [language === 'en' ? "Unique perspective" : language === 'vi' ? "Góc nhìn độc đáo" : language === 'it' ? "Prospettiva unica" : "独特の視点"],
      challenges: [language === 'en' ? "Finding your path" : language === 'vi' ? "Tìm con đường của bạn" : language === 'it' ? "Trovare la tua strada" : "自分の道を見つける"],
      career: language === 'en' ? "Follow your intuition" : language === 'vi' ? "Theo trực giác của bạn" : language === 'it' ? "Segui la tua intuizione" : "直感に従う",
      relationships: language === 'en' ? "Seek understanding" : language === 'vi' ? "Tìm kiếm sự hiểu biết" : language === 'it' ? "Cerca comprensione" : "理解を求める",
      growth: language === 'en' ? "Embrace your uniqueness" : language === 'vi' ? "Chấp nhận sự độc đáo của bạn" : language === 'it' ? "Abbraccia la tua unicità" : "あなたの独自性を受け入れる"
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-purple-300" />
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-32 bg-black/30 border-purple-400/50 text-purple-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-purple-400/50">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <SparklesIcon className="w-12 h-12 text-purple-300 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <SparklesIcon className="w-12 h-12 text-red-300 ml-4" />
          </div>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Input Form */}
        <Card className="max-w-2xl mx-auto mb-8 bg-black/20 backdrop-blur-lg border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-purple-100 flex items-center justify-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              {t.readingTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-purple-200">
                {t.birthDate} {t.required}
              </Label>
              <Input
                id="birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="bg-black/30 border-purple-400/50 text-purple-100 focus:border-purple-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-200">
                {t.fullName}
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/30 border-purple-400/50 text-purple-100 focus:border-purple-400 placeholder:text-purple-300/50"
              />
            </div>

            <Button
              onClick={calculateNumerology}
              disabled={!birthday || isCalculating}
              className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold py-3 text-lg"
            >
              {isCalculating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t.calculating}
                </div>
              ) : (
                t.revealButton
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        {results && (
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Life Path Number - Detailed */}
            <Card className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 backdrop-blur-lg border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-3xl text-purple-100 flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{results.lifePathNumber}</span>
                  </div>
                  🌟 1. {t.lifePathTitle}: {results.lifePathNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-200 mb-2">➤ {t.howCalculated}</h4>
                  <p className="text-purple-300 mb-2">{t.addDigits}</p>
                  <div className="bg-black/30 p-3 rounded-lg font-mono text-purple-100">
                    {results.calculations.lifePathSteps.map((step, index) => (
                      <div key={index}>{step}</div>
                    ))}
                  </div>
                </div>

                {(() => {
                  const meaning = getDetailedMeaning(results.lifePathNumber, 'lifePath');
                  return (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xl font-semibold text-purple-100 mb-2">
                          🔢 {t.lifePathTitle} {results.lifePathNumber} — {meaning.title}
                        </h4>
                        <p className="text-purple-200">{meaning.description}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-100 mb-3">���� {t.keyStrengths}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {meaning.strengths.map((strength: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <span className="text-purple-200">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-100 mb-3">⚠️ {t.challenges}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {meaning.challenges.map((challenge: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                              <span className="text-purple-200">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-black/20 p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-100 mb-2 flex items-center gap-2">
                            <BrainIcon className="w-4 h-4" /> {t.careerPath}
                          </h5>
                          <p className="text-purple-200 text-sm">{meaning.career}</p>
                        </div>
                        <div className="bg-black/20 p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-100 mb-2 flex items-center gap-2">
                            <HeartIcon className="w-4 h-4" /> {t.relationships}
                          </h5>
                          <p className="text-purple-200 text-sm">{meaning.relationships}</p>
                        </div>
                      </div>

                      <div className="bg-black/20 p-4 rounded-lg">
                        <h5 className="font-semibold text-purple-100 mb-2 flex items-center gap-2">
                          <TrendingUpIcon className="w-4 h-4" /> {t.growthPath}
                        </h5>
                        <p className="text-purple-200 text-sm">{meaning.growth}</p>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Birthday Number - Detailed */}
            <Card className="bg-gradient-to-br from-red-800/40 to-red-900/40 backdrop-blur-lg border-red-400/30">
              <CardHeader>
                <CardTitle className="text-3xl text-red-100 flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{results.birthdayNumber}</span>
                  </div>
                  📆 2. {t.birthdayTitle}: {results.birthdayNumber} ({getBirthdayMeaning(results.birthdayNumber).title})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-red-200 mb-2">➤ {t.calculation}</h4>
                  <div className="bg-black/30 p-3 rounded-lg font-mono text-red-100">
                    {results.calculations.birthdaySteps.map((step, index) => (
                      <div key={index}>{step}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-red-200 mb-2">
                    ➤ Components: {results.birthdayNumber} ({getBirthdayMeaning(results.birthdayNumber).components})
                  </h4>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-red-100 mb-3">💎 {t.birthdayTitle} {results.birthdayNumber} {t.traits}</h5>
                  <div className="space-y-3 text-red-200 text-sm">
                    {getBirthdayMeaning(results.birthdayNumber).traits.map((trait: string, index: number) => (
                      <p key={index}>• {trait}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attitude Number */}
            <Card className="bg-gradient-to-br from-pink-800/40 to-purple-800/40 backdrop-blur-lg border-pink-400/30">
              <CardHeader>
                <CardTitle className="text-3xl text-pink-100 flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{results.attitudeNumber}</span>
                  </div>
                  🪐 3. {t.attitudeTitle}: {results.attitudeNumber} ({getAttitudeMeaning(results.attitudeNumber).title})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-pink-200 mb-2">➤ {t.calculation}</h4>
                  <div className="bg-black/30 p-3 rounded-lg font-mono text-pink-100">
                    {results.calculations.attitudeSteps.map((step, index) => (
                      <div key={index}>{step}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-pink-200 mb-2">
                    ➤ Components: {results.attitudeNumber} ({getAttitudeMeaning(results.attitudeNumber).components})
                  </h4>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-pink-100 mb-3">👥 {t.howOthersSee}</h5>
                  <p className="text-pink-200 text-sm">
                    {getAttitudeMeaning(results.attitudeNumber).perception}
                  </p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-pink-100 mb-2">💫 {language === 'en' ? "Key Insights" : language === 'vi' ? "Hiểu Biết Chính" : language === 'it' ? "Intuizioni Chiave" : "主要な洞察"}:</h5>
                  <p className="text-pink-200 text-sm">
                    {t.revealsPerception}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Name-based numbers if available */}
            {name.trim() && (
              <>
                <Card className="bg-gradient-to-br from-purple-800/40 to-red-800/40 backdrop-blur-lg border-purple-400/30">
                  <CardHeader>
                    <CardTitle className="text-3xl text-purple-100 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{results.expressionNumber}</span>
                      </div>
                      ✨ {t.expressionTitle}: {results.expressionNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-purple-200">
                      {t.naturalTalents}
                    </p>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-purple-200 mb-2">➤ {t.calculation}</h4>
                      <div className="bg-black/30 p-3 rounded-lg font-mono text-purple-100 text-sm">
                        {results.calculations.expressionSteps.map((step, index) => (
                          <div key={index}>{step}</div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-800/40 to-pink-800/40 backdrop-blur-lg border-red-400/30">
                  <CardHeader>
                    <CardTitle className="text-3xl text-red-100 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{results.soulUrgeNumber}</span>
                      </div>
                      💖 {t.soulUrgeTitle}: {results.soulUrgeNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-red-200">
                      {t.innerDesires}
                    </p>
                    
                    {results.calculations.soulUrgeSteps.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-red-200 mb-2">➤ {t.calculation}</h4>
                        <div className="bg-black/30 p-3 rounded-lg font-mono text-red-100 text-sm">
                          {results.calculations.soulUrgeSteps.map((step, index) => (
                            <div key={index}>{step}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-800/40 to-purple-800/40 backdrop-blur-lg border-pink-400/30">
                  <CardHeader>
                    <CardTitle className="text-3xl text-pink-100 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{results.personalityNumber}</span>
                      </div>
                      🎭 {t.personalityTitle}: {results.personalityNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-pink-200">
                      {t.outerPersonality}
                    </p>
                    
                    {results.calculations.personalitySteps.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-pink-200 mb-2">➤ {t.calculation}</h4>
                        <div className="bg-black/30 p-3 rounded-lg font-mono text-pink-100 text-sm">
                          {results.calculations.personalitySteps.map((step, index) => (
                            <div key={index}>{step}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {/* Summary Table */}
            <Card className="bg-gradient-to-br from-purple-900/60 to-red-900/60 backdrop-blur-lg border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-3xl text-purple-100 flex items-center gap-3">
                  <EyeIcon className="w-8 h-8" />
                  🧬 {t.corePersonality}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-purple-400/30">
                        <th className="py-3 px-4 text-purple-200 font-semibold">{t.element}</th>
                        <th className="py-3 px-4 text-purple-200 font-semibold">{t.number}</th>
                        <th className="py-3 px-4 text-purple-200 font-semibold">{t.meaning}</th>
                      </tr>
                    </thead>
                    <tbody className="text-purple-100">
                      <tr className="border-b border-purple-400/20">
                        <td className="py-3 px-4">{t.lifePathTitle}</td>
                        <td className="py-3 px-4 font-bold">{results.lifePathNumber}</td>
                        <td className="py-3 px-4">{getDetailedMeaning(results.lifePathNumber, 'lifePath').description}</td>
                      </tr>
                      <tr className="border-b border-purple-400/20">
                        <td className="py-3 px-4">{t.birthdayTitle}</td>
                        <td className="py-3 px-4 font-bold">{results.birthdayNumber}</td>
                        <td className="py-3 px-4">{t.naturalTalentsAbilities}</td>
                      </tr>
                      <tr className="border-b border-purple-400/20">
                        <td className="py-3 px-4">{t.attitudeTitle}</td>
                        <td className="py-3 px-4 font-bold">{results.attitudeNumber}</td>
                        <td className="py-3 px-4">{t.howOthersPerceive}</td>
                      </tr>
                      {name.trim() && (
                        <>
                          <tr className="border-b border-purple-400/20">
                            <td className="py-3 px-4">{t.expressionTitle}</td>
                            <td className="py-3 px-4 font-bold">{results.expressionNumber}</td>
                            <td className="py-3 px-4">{t.yourTalentsAbilities}</td>
                          </tr>
                          <tr className="border-b border-purple-400/20">
                            <td className="py-3 px-4">{t.soulUrgeTitle}</td>
                            <td className="py-3 px-4 font-bold">{results.soulUrgeNumber}</td>
                            <td className="py-3 px-4">{t.innerDesiresMotivations}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">{t.personalityTitle}</td>
                            <td className="py-3 px-4 font-bold">{results.personalityNumber}</td>
                            <td className="py-3 px-4">{t.outerPersonalityTraits}</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* About Section */}
        {!results && (
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="bg-black/20 backdrop-blur-lg border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-purple-100">
                  {t.aboutTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-200 space-y-4">
                <p>
                  {t.aboutText}
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-semibold text-purple-100 mb-2">{t.lifePathTitle}</h3>
                    <p className="text-sm">{t.lifePathDesc}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-100 mb-2">{t.expressionTitle}</h3>
                    <p className="text-sm">{t.expressionDesc}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-100 mb-2">{t.soulUrgeTitle}</h3>
                    <p className="text-sm">{t.soulUrgeDesc}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-100 mb-2">{t.personalityTitle}</h3>
                    <p className="text-sm">{t.personalityDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-4 pt-2 pb-4 border-t border-purple-400/20">
          <div className="text-center">
            <p className="text-purple-300 text-sm">
              {t.footer}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
