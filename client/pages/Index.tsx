import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarIcon, StarIcon, HeartIcon, SparklesIcon, BrainIcon, EyeIcon, TrendingUpIcon } from "lucide-react";

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

export default function Index() {
  const [birthday, setBirthday] = useState("");
  const [name, setName] = useState("");
  const [results, setResults] = useState<NumerologyResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

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
        birthdaySteps.push(`Birthday: ${day}`);
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
          title: "The Leader",
          description: "Natural born leader, independent, pioneering spirit",
          strengths: ["Independent", "Leadership", "Innovation", "Self-reliant", "Ambitious"],
          challenges: ["Can be domineering", "Impatient", "Self-centered", "Stubborn"],
          career: "Entrepreneurship, management, politics, innovation, self-employment",
          relationships: "Needs a partner who respects independence and supports ambitions",
          growth: "Learn to collaborate while maintaining leadership qualities"
        },
        2: {
          title: "The Peacemaker",
          description: "Cooperative, diplomatic, peace-maker",
          strengths: ["Diplomatic", "Cooperative", "Intuitive", "Patient", "Supportive"],
          challenges: ["Over-sensitive", "Indecisive", "Dependent", "Self-doubt"],
          career: "Counseling, mediation, teamwork, social services, partnerships",
          relationships: "Thrives in harmonious relationships, natural partner",
          growth: "Build confidence while maintaining sensitivity to others"
        },
        3: {
          title: "The Creative Communicator",
          description: "Creative, expressive, optimistic communicator",
          strengths: ["Creative", "Communicative", "Optimistic", "Artistic", "Charismatic"],
          challenges: ["Scattered energy", "Superficial", "Moody", "Prone to gossip"],
          career: "Arts, entertainment, writing, speaking, marketing, design",
          relationships: "Needs intellectual stimulation and creative expression",
          growth: "Focus creative energy and develop discipline"
        },
        4: {
          title: "The Builder",
          description: "Practical, reliable, hard-working foundation builder",
          strengths: ["Reliable", "Practical", "Organized", "Hardworking", "Loyal"],
          challenges: ["Rigid", "Overly serious", "Stubborn", "Resistant to change"],
          career: "Construction, engineering, accounting, management, organization",
          relationships: "Values stability and long-term commitment",
          growth: "Learn flexibility while maintaining reliability"
        },
        5: {
          title: "The Explorer",
          description: "Adventurous, freedom-loving, dynamic explorer",
          strengths: ["Adventurous", "Versatile", "Progressive", "Curious", "Energetic"],
          challenges: ["Restless", "Irresponsible", "Impatient", "Inconsistent"],
          career: "Travel, sales, journalism, entertainment, technology",
          relationships: "Needs freedom and variety in relationships",
          growth: "Learn commitment while maintaining sense of adventure"
        },
        6: {
          title: "The Nurturer",
          description: "Nurturing, responsible, caring family-oriented",
          strengths: ["Nurturing", "Responsible", "Caring", "Protective", "Healing"],
          challenges: ["Overly protective", "Interfering", "Martyrdom", "Worry"],
          career: "Healthcare, teaching, counseling, social work, hospitality",
          relationships: "Natural caregiver, family-oriented",
          growth: "Care for others without losing self-identity"
        },
        7: {
          title: "The Seeker",
          description: "Analytical, spiritual, introspective seeker",
          strengths: ["Analytical", "Spiritual", "Intuitive", "Introspective", "Wise"],
          challenges: ["Aloof", "Secretive", "Skeptical", "Isolated", "Overthinking"],
          career: "Research, analysis, spirituality, psychology, writing, science",
          relationships: "Needs deep, meaningful connections with understanding partners",
          growth: "Balance solitude with meaningful social connections"
        },
        8: {
          title: "The Achiever",
          description: "Ambitious, material success, executive abilities",
          strengths: ["Ambitious", "Organized", "Practical", "Authoritative", "Efficient"],
          challenges: ["Materialistic", "Workaholic", "Impatient", "Demanding"],
          career: "Business, finance, real estate, law, executive positions",
          relationships: "Attracted to successful partners, values achievement",
          growth: "Balance material success with spiritual fulfillment"
        },
        9: {
          title: "The Humanitarian",
          description: "Humanitarian, generous, universal consciousness",
          strengths: ["Compassionate", "Generous", "Artistic", "Philanthropic", "Wise"],
          challenges: ["Impractical", "Moody", "Resentful", "Self-righteous"],
          career: "Humanitarian work, arts, healing, teaching, charitable organizations",
          relationships: "Seeks universal love and understanding",
          growth: "Channel compassion effectively without losing practical focus"
        },
        11: {
          title: "The Master Intuitive",
          description: "Master intuitive, spiritual messenger, inspirational",
          strengths: ["Intuitive", "Inspirational", "Spiritual", "Idealistic", "Psychic"],
          challenges: ["Highly sensitive", "Nervous energy", "Impractical", "Moody"],
          career: "Spiritual teaching, healing, counseling, arts, invention",
          relationships: "Needs understanding and supportive partners",
          growth: "Ground spiritual insights in practical reality"
        },
        22: {
          title: "The Master Builder",
          description: "Master builder, practical visionary, manifestor",
          strengths: ["Visionary", "Practical", "Organized", "Influential", "Builder"],
          challenges: ["Overwhelming pressure", "Perfectionism", "Self-doubt"],
          career: "Large-scale projects, architecture, international business",
          relationships: "Needs partners who understand their grand vision",
          growth: "Manifest grand visions while staying grounded"
        },
        33: {
          title: "The Master Teacher",
          description: "Master teacher, compassionate healer, uplifter",
          strengths: ["Compassionate", "Healing", "Teaching", "Uplifting", "Service"],
          challenges: ["Overwhelming responsibility", "Emotional sensitivity"],
          career: "Teaching, healing, spiritual guidance, humanitarian work",
          relationships: "Devoted to uplifting others through love",
          growth: "Balance service to others with self-care"
        }
      }
    };
    
    return meanings[type]?.[number] || {
      title: "Unique Energy",
      description: "A unique and special energy surrounds this number",
      strengths: ["Unique perspective", "Special gifts"],
      challenges: ["Finding your path"],
      career: "Follow your intuition",
      relationships: "Seek understanding",
      growth: "Embrace your uniqueness"
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
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <SparklesIcon className="w-12 h-12 text-purple-300 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-transparent">
              Mystic Numbers
            </h1>
            <SparklesIcon className="w-12 h-12 text-red-300 ml-4" />
          </div>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Discover the hidden meanings in your birth date and name through the ancient art of numerology
          </p>
        </div>

        {/* Input Form */}
        <Card className="max-w-2xl mx-auto mb-8 bg-black/20 backdrop-blur-lg border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-purple-100 flex items-center justify-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              Your Numerology Reading
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-purple-200">
                Birth Date *
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
                Full Name (Optional)
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name for complete reading"
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
                  Calculating Your Numbers...
                </div>
              ) : (
                "Reveal My Numbers"
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
                  🌟 1. Life Path Number: {results.lifePathNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-200 mb-2">➤ How it's calculated:</h4>
                  <p className="text-purple-300 mb-2">Add all the digits of the full birthdate:</p>
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
                          🔢 Your Life Path Number is {results.lifePathNumber} — {meaning.title}
                        </h4>
                        <p className="text-purple-200">{meaning.description}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-100 mb-3">💫 Key Strengths:</h4>
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
                        <h4 className="text-lg font-semibold text-purple-100 mb-3">⚠️ Challenges to watch for:</h4>
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
                            <BrainIcon className="w-4 h-4" /> Career Path
                          </h5>
                          <p className="text-purple-200 text-sm">{meaning.career}</p>
                        </div>
                        <div className="bg-black/20 p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-100 mb-2 flex items-center gap-2">
                            <HeartIcon className="w-4 h-4" /> Relationships
                          </h5>
                          <p className="text-purple-200 text-sm">{meaning.relationships}</p>
                        </div>
                      </div>

                      <div className="bg-black/20 p-4 rounded-lg">
                        <h5 className="font-semibold text-purple-100 mb-2 flex items-center gap-2">
                          <TrendingUpIcon className="w-4 h-4" /> Growth Path
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
                  📆 2. Birthday Number: {results.birthdayNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-red-200">
                  The day of birth ({results.birthDate.day}) reflects your natural talents and personality traits.
                </p>
                
                {results.calculations.birthdaySteps.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-red-200 mb-2">➤ Calculation:</h4>
                    <div className="bg-black/30 p-3 rounded-lg font-mono text-red-100">
                      {results.calculations.birthdaySteps.map((step, index) => (
                        <div key={index}>{step}</div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-black/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-red-100 mb-2">�� Birthday Number {results.birthdayNumber} Traits:</h5>
                  <div className="space-y-2 text-red-200 text-sm">
                    {results.birthdayNumber === 1 && <p>• Natural leadership abilities and pioneering spirit</p>}
                    {results.birthdayNumber === 2 && <p>• Diplomatic nature and excellent cooperation skills</p>}
                    {results.birthdayNumber === 3 && <p>• Creative expression and natural communication talents</p>}
                    {results.birthdayNumber === 4 && <p>• Strong willpower and ability to build solid foundations</p>}
                    {results.birthdayNumber === 5 && <p>• Adventurous spirit and love for freedom and variety</p>}
                    {results.birthdayNumber === 6 && <p>• Natural nurturing abilities and family orientation</p>}
                    {results.birthdayNumber === 7 && <p>• Deep thinking and spiritual/analytical inclinations</p>}
                    {results.birthdayNumber === 8 && <p>• Business acumen and material achievement focus</p>}
                    {results.birthdayNumber === 9 && <p>• Humanitarian instincts and artistic sensibilities</p>}
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
                  🪐 3. Attitude Number: {results.attitudeNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-pink-200">
                  This number reveals how others perceive you and how you present yourself to the world.
                </p>
                
                <div>
                  <h4 className="text-lg font-semibold text-pink-200 mb-2">➤ Calculation:</h4>
                  <div className="bg-black/30 p-3 rounded-lg font-mono text-pink-100">
                    {results.calculations.attitudeSteps.map((step, index) => (
                      <div key={index}>{step}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-pink-100 mb-2">👥 How Others See You:</h5>
                  <p className="text-pink-200 text-sm">
                    {results.attitudeNumber === 1 && "Confident, independent, and natural leader"}
                    {results.attitudeNumber === 2 && "Gentle, cooperative, and diplomatic"}
                    {results.attitudeNumber === 3 && "Charming, creative, and entertaining"}
                    {results.attitudeNumber === 4 && "Dependable, grounded, and hardworking"}
                    {results.attitudeNumber === 5 && "Dynamic, adventurous, and progressive"}
                    {results.attitudeNumber === 6 && "Caring, responsible, and nurturing"}
                    {results.attitudeNumber === 7 && "Mysterious, analytical, and wise"}
                    {results.attitudeNumber === 8 && "Ambitious, successful, and authoritative"}
                    {results.attitudeNumber === 9 && "Compassionate, generous, and artistic"}
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
                      ✨ Expression Number: {results.expressionNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-purple-200">
                      Your Expression Number reveals your natural talents and how you express yourself to the world.
                    </p>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-purple-200 mb-2">➤ Calculation:</h4>
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
                      💖 Soul Urge Number: {results.soulUrgeNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-red-200">
                      Your Soul Urge Number reveals your inner desires and what motivates you at the deepest level.
                    </p>
                    
                    {results.calculations.soulUrgeSteps.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-red-200 mb-2">➤ Calculation:</h4>
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
                      🎭 Personality Number: {results.personalityNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-pink-200">
                      Your Personality Number shows how others perceive you and the impression you make.
                    </p>
                    
                    {results.calculations.personalitySteps.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-pink-200 mb-2">➤ Calculation:</h4>
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
                  🧬 Core Personality Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-purple-400/30">
                        <th className="py-3 px-4 text-purple-200 font-semibold">Element</th>
                        <th className="py-3 px-4 text-purple-200 font-semibold">Number</th>
                        <th className="py-3 px-4 text-purple-200 font-semibold">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="text-purple-100">
                      <tr className="border-b border-purple-400/20">
                        <td className="py-3 px-4">Life Path Number</td>
                        <td className="py-3 px-4 font-bold">{results.lifePathNumber}</td>
                        <td className="py-3 px-4">{getDetailedMeaning(results.lifePathNumber, 'lifePath').description}</td>
                      </tr>
                      <tr className="border-b border-purple-400/20">
                        <td className="py-3 px-4">Birthday Number</td>
                        <td className="py-3 px-4 font-bold">{results.birthdayNumber}</td>
                        <td className="py-3 px-4">Natural talents and abilities</td>
                      </tr>
                      <tr className="border-b border-purple-400/20">
                        <td className="py-3 px-4">Attitude Number</td>
                        <td className="py-3 px-4 font-bold">{results.attitudeNumber}</td>
                        <td className="py-3 px-4">How others perceive you</td>
                      </tr>
                      {name.trim() && (
                        <>
                          <tr className="border-b border-purple-400/20">
                            <td className="py-3 px-4">Expression Number</td>
                            <td className="py-3 px-4 font-bold">{results.expressionNumber}</td>
                            <td className="py-3 px-4">Your talents and abilities</td>
                          </tr>
                          <tr className="border-b border-purple-400/20">
                            <td className="py-3 px-4">Soul Urge Number</td>
                            <td className="py-3 px-4 font-bold">{results.soulUrgeNumber}</td>
                            <td className="py-3 px-4">Your inner desires and motivations</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">Personality Number</td>
                            <td className="py-3 px-4 font-bold">{results.personalityNumber}</td>
                            <td className="py-3 px-4">Your outer personality</td>
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
                  About Numerology
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-200 space-y-4">
                <p>
                  Numerology is the ancient practice of discovering the hidden meanings behind numbers in your life. 
                  Each number carries unique vibrations and energies that can reveal insights about your personality, 
                  life purpose, and spiritual path.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-semibold text-purple-100 mb-2">Life Path Number</h3>
                    <p className="text-sm">Your most important number, revealing your life's purpose and journey.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-100 mb-2">Expression Number</h3>
                    <p className="text-sm">Shows your natural talents and how you express yourself to the world.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-100 mb-2">Soul Urge Number</h3>
                    <p className="text-sm">Reveals your inner desires and what motivates you at the deepest level.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-100 mb-2">Personality Number</h3>
                    <p className="text-sm">How others perceive you and the impression you make on the world.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
