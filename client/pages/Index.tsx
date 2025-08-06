import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarIcon, StarIcon, HeartIcon, SparklesIcon } from "lucide-react";

interface NumerologyResults {
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  birthdayNumber: number;
}

export default function Index() {
  const [birthday, setBirthday] = useState("");
  const [name, setName] = useState("");
  const [results, setResults] = useState<NumerologyResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const reduceToSingleDigit = (num: number): number => {
    if (num === 11 || num === 22 || num === 33) return num; // Master numbers
    while (num > 9) {
      num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
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

      // Life Path Number
      const lifePathNumber = reduceToSingleDigit(day + month + year);

      // Birthday Number
      const birthdayNumber = reduceToSingleDigit(day);

      // If name is provided, calculate name-based numbers
      let expressionNumber = 1;
      let soulUrgeNumber = 1;
      let personalityNumber = 1;

      if (name.trim()) {
        const vowels = 'AEIOU';
        const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
        
        const nameUpper = name.toUpperCase().replace(/[^A-Z]/g, '');
        
        // Expression Number (all letters)
        expressionNumber = reduceToSingleDigit(
          nameUpper.split('').reduce((sum, letter) => sum + getLetterValue(letter), 0)
        );

        // Soul Urge Number (vowels only)
        soulUrgeNumber = reduceToSingleDigit(
          nameUpper.split('').filter(letter => vowels.includes(letter))
            .reduce((sum, letter) => sum + getLetterValue(letter), 0)
        );

        // Personality Number (consonants only)
        personalityNumber = reduceToSingleDigit(
          nameUpper.split('').filter(letter => consonants.includes(letter))
            .reduce((sum, letter) => sum + getLetterValue(letter), 0)
        );
      }

      setResults({
        lifePathNumber,
        expressionNumber,
        soulUrgeNumber,
        personalityNumber,
        birthdayNumber
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const getNumberMeaning = (number: number, type: string): string => {
    const meanings: { [key: string]: { [key: number]: string } } = {
      lifePath: {
        1: "Natural leader, independent, pioneering spirit",
        2: "Cooperative, diplomatic, peace-maker",
        3: "Creative, expressive, optimistic communicator",
        4: "Practical, reliable, hard-working foundation builder",
        5: "Adventurous, freedom-loving, dynamic explorer",
        6: "Nurturing, responsible, caring family-oriented",
        7: "Analytical, spiritual, introspective seeker",
        8: "Ambitious, material success, executive abilities",
        9: "Humanitarian, generous, universal consciousness",
        11: "Master intuitive, spiritual messenger, inspirational",
        22: "Master builder, practical visionary, manifestor",
        33: "Master teacher, compassionate healer, uplifter"
      },
      expression: {
        1: "Leadership and independence in self-expression",
        2: "Cooperation and harmony in relationships",
        3: "Creativity and communication talents",
        4: "Practical skills and methodical approach",
        5: "Versatility and freedom in expression",
        6: "Service and responsibility to others",
        7: "Research and spiritual understanding",
        8: "Material achievement and business acumen",
        9: "Humanitarian service and universal love"
      },
      soulUrge: {
        1: "Desire for independence and leadership",
        2: "Craving for peace and companionship",
        3: "Need for creative self-expression",
        4: "Yearning for security and order",
        5: "Hunger for freedom and adventure",
        6: "Deep need to nurture and serve",
        7: "Longing for knowledge and understanding",
        8: "Drive for material success and recognition",
        9: "Desire to serve humanity and make a difference"
      },
      personality: {
        1: "Appears confident, determined, and independent",
        2: "Seems gentle, cooperative, and diplomatic",
        3: "Appears charming, creative, and entertaining",
        4: "Seems reliable, practical, and organized",
        5: "Appears dynamic, adventurous, and progressive",
        6: "Seems caring, responsible, and family-oriented",
        7: "Appears mysterious, analytical, and reserved",
        8: "Seems ambitious, successful, and authoritative",
        9: "Appears compassionate, generous, and artistic"
      },
      birthday: {
        1: "Born to lead and initiate new projects",
        2: "Natural mediator with diplomatic gifts",
        3: "Creative expression is your special talent",
        4: "Building and organizing are your strengths",
        5: "Freedom and variety fuel your spirit",
        6: "Caring for others brings you fulfillment",
        7: "Seeking truth and wisdom is your path",
        8: "Material success and achievement motivate you",
        9: "Serving humanity is your calling"
      }
    };
    
    return meanings[type]?.[number] || "A unique and special energy surrounds this number";
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

        {/* Results */}
        {results && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-800/40 to-purple-900/40 backdrop-blur-lg border-purple-400/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-white">{results.lifePathNumber}</span>
                </div>
                <CardTitle className="text-purple-100 flex items-center justify-center gap-2">
                  <StarIcon className="w-5 h-5" />
                  Life Path Number
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200 text-center">
                  {getNumberMeaning(results.lifePathNumber, 'lifePath')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-800/40 to-red-900/40 backdrop-blur-lg border-red-400/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-white">{results.birthdayNumber}</span>
                </div>
                <CardTitle className="text-red-100 flex items-center justify-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Birthday Number
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-200 text-center">
                  {getNumberMeaning(results.birthdayNumber, 'birthday')}
                </p>
              </CardContent>
            </Card>

            {name.trim() && (
              <>
                <Card className="bg-gradient-to-br from-pink-800/40 to-pink-900/40 backdrop-blur-lg border-pink-400/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-white">{results.expressionNumber}</span>
                    </div>
                    <CardTitle className="text-pink-100 flex items-center justify-center gap-2">
                      <SparklesIcon className="w-5 h-5" />
                      Expression Number
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-pink-200 text-center">
                      {getNumberMeaning(results.expressionNumber, 'expression')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-800/40 to-red-800/40 backdrop-blur-lg border-purple-400/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-white">{results.soulUrgeNumber}</span>
                    </div>
                    <CardTitle className="text-purple-100 flex items-center justify-center gap-2">
                      <HeartIcon className="w-5 h-5" />
                      Soul Urge Number
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-200 text-center">
                      {getNumberMeaning(results.soulUrgeNumber, 'soulUrge')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-800/40 to-pink-800/40 backdrop-blur-lg border-red-400/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-white">{results.personalityNumber}</span>
                    </div>
                    <CardTitle className="text-red-100 flex items-center justify-center gap-2">
                      <StarIcon className="w-5 h-5" />
                      Personality Number
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-200 text-center">
                      {getNumberMeaning(results.personalityNumber, 'personality')}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
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
