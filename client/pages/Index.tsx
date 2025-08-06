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
    namePlaceholder: "Nhập họ tên đầy đủ để có bài đọc hoàn chỉnh",
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
    subtitle: "数秘術の古代の技法を通じて、あなたの生年月日と名前に隠された意味を発見してください",
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

      // Birthday Number with steps
      const birthdaySteps: string[] = [];
      if (day > 9) {
        birthdaySteps.push(`${t.birthdayTitle}: ${day}`);
      }
      const birthdayCalc = reduceToSingleDigitWithSteps(day, birthdaySteps);
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
                 "リーダーシップの資質を維持しながら協力することを学ぶ"
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
                        <h4 className="text-lg font-semibold text-purple-100 mb-3">💫 {t.keyStrengths}</h4>
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
                  📆 2. {t.birthdayTitle}: {results.birthdayNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-red-200">
                  {t.dayOfBirth} ({results.birthDate.day}) {t.reflectsTraits}
                </p>
                
                {results.calculations.birthdaySteps.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-red-200 mb-2">➤ {t.calculation}</h4>
                    <div className="bg-black/30 p-3 rounded-lg font-mono text-red-100">
                      {results.calculations.birthdaySteps.map((step, index) => (
                        <div key={index}>{step}</div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-black/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-red-100 mb-2">💎 {t.birthdayTitle} {results.birthdayNumber} {t.traits}</h5>
                  <div className="space-y-2 text-red-200 text-sm">
                    {results.birthdayNumber === 4 && <p>• {language === 'en' ? "Strong willpower and ability to build solid foundations" : 
                                                           language === 'vi' ? "Ý chí mạnh mẽ và khả năng xây dựng nền tảng vững chắc" :
                                                           language === 'it' ? "Forte forza di volontà e capacità di costruire fondamenta solide" :
                                                           "強い意志力と堅固な基盤を築く能力"}</p>}
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
                  🪐 3. {t.attitudeTitle}: {results.attitudeNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-pink-200">
                  {t.revealsPerception}
                </p>
                
                <div>
                  <h4 className="text-lg font-semibold text-pink-200 mb-2">➤ {t.calculation}</h4>
                  <div className="bg-black/30 p-3 rounded-lg font-mono text-pink-100">
                    {results.calculations.attitudeSteps.map((step, index) => (
                      <div key={index}>{step}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-pink-100 mb-2">👥 {t.howOthersSee}</h5>
                  <p className="text-pink-200 text-sm">
                    {results.attitudeNumber === 6 && (language === 'en' ? "Caring, responsible, and nurturing" :
                                                     language === 'vi' ? "Chu đáo, có trách nhiệm và nuôi dưỡng" :
                                                     language === 'it' ? "Premuroso, responsabile e protettivo" :
                                                     "思いやりがあり、責任感があり、育成的")}
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
