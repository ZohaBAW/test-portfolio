import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Calculator, Brain, Zap, Trophy, Timer, Check, Bug, MapPin, KeyRound } from "lucide-react";
import confetti from "canvas-confetti";

const FACTS = [
  "I can solve a Rubik's cube in under 2 minutes! 🎲",
  "I've built over 50 web applications 💻",
  "Coffee is my debugging fuel ☕",
  "I love teaching others to code 👨‍🏫",
  "Attention to detail is one of my strengths 🔍",
  "I've navigated my career with strategic decisions 🎯",
];

export default function MiniGames() {
  const [completedGames, setCompletedGames] = useState<string[]>([]);

  const handleGameComplete = (gameId: string) => {
    if (!completedGames.includes(gameId)) {
      setCompletedGames([...completedGames, gameId]);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Mini Games Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Complete challenges to unlock fun facts about me!
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Trophy className="text-yellow-500" />
          <span className="text-lg font-semibold">
            {completedGames.length} / 6 Games Completed
          </span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <MathChallenge onComplete={() => handleGameComplete("math")} isCompleted={completedGames.includes("math")} />
        <MemoryGame onComplete={() => handleGameComplete("memory")} isCompleted={completedGames.includes("memory")} />
        <ReactionTest onComplete={() => handleGameComplete("reaction")} isCompleted={completedGames.includes("reaction")} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <BugFixChallenge onComplete={() => handleGameComplete("bugfix")} isCompleted={completedGames.includes("bugfix")} />
        <CareerPathMaze onComplete={() => handleGameComplete("maze")} isCompleted={completedGames.includes("maze")} />
        <PasswordGuess onComplete={() => handleGameComplete("password")} isCompleted={completedGames.includes("password")} />
      </div>

      {/* Fun Facts Display */}
      <AnimatePresence>
        {completedGames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="text-yellow-500" />
                  Unlocked Fun Facts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {completedGames.map((gameId, index) => (
                    <motion.div
                      key={gameId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-background rounded-lg border border-border"
                    >
                      <p className="text-lg">{FACTS[index]}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MathChallenge({ onComplete, isCompleted }: { onComplete: () => void; isCompleted: boolean }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const startGame = () => {
    setNum1(Math.floor(Math.random() * 20) + 1);
    setNum2(Math.floor(Math.random() * 20) + 1);
    setAnswer("");
    setTimeLeft(5);
    setIsActive(true);
    setResult(null);
  };

  useEffect(() => {
    if (!isActive || timeLeft === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          setIsActive(false);
          if (parseInt(answer) !== num1 + num2) {
            setResult("wrong");
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, answer, num1, num2]);

  const handleSubmit = () => {
    if (parseInt(answer) === num1 + num2) {
      setResult("correct");
      setIsActive(false);
      onComplete();
    } else {
      setResult("wrong");
      setIsActive(false);
    }
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full relative overflow-hidden">
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500">
              <Check size={14} className="mr-1" />
              Complete
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="text-purple-500" />
            Math Challenge
          </CardTitle>
          <CardDescription>Solve within 5 seconds!</CardDescription>
        </CardHeader>
        <CardContent>
          {!isActive && !result && (
            <Button onClick={startGame} className="w-full">
              Start Challenge
            </Button>
          )}

          {isActive && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-3xl font-bold">
                <Timer className="text-orange-500" size={24} />
                <span className="text-orange-500">{timeLeft}s</span>
              </div>
              <div className="text-center text-4xl font-bold p-6 bg-muted rounded-lg">
                {num1} + {num2} = ?
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Your answer"
                  className="text-lg"
                  autoFocus
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          )}

          {result && (
            <div className="text-center space-y-4">
              <div
                className={`text-2xl font-bold ${
                  result === "correct" ? "text-green-500" : "text-red-500"
                }`}
              >
                {result === "correct" ? "🎉 Correct!" : "❌ Wrong!"}
              </div>
              <Button onClick={startGame} variant="outline">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function MemoryGame({ onComplete, isCompleted }: { onComplete: () => void; isCompleted: boolean }) {
  const [cards, setCards] = useState<{ id: number; value: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const emojis = ["🚀", "⚡", "🎨", "💻"];
  
  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((value, id) => ({ id, value, flipped: false, matched: false }));
    setCards(shuffled);
    setFlippedIndices([]);
    setIsStarted(true);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [first, second] = newFlipped;
        if (cards[first].value === cards[second].value) {
          const updated = [...cards];
          updated[first].matched = true;
          updated[second].matched = true;
          setCards(updated);

          if (updated.every((c) => c.matched)) {
            onComplete();
          }
        } else {
          const updated = [...cards];
          updated[first].flipped = false;
          updated[second].flipped = false;
          setCards(updated);
        }
        setFlippedIndices([]);
      }, 1000);
    }
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full relative overflow-hidden">
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500">
              <Check size={14} className="mr-1" />
              Complete
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-pink-500" />
            Memory Flip
          </CardTitle>
          <CardDescription>Match all pairs!</CardDescription>
        </CardHeader>
        <CardContent>
          {!isStarted ? (
            <Button onClick={initGame} className="w-full">
              Start Game
            </Button>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(index)}
                  className={`aspect-square rounded-lg cursor-pointer flex items-center justify-center text-3xl ${
                    card.flipped || card.matched
                      ? "bg-gradient-to-br from-purple-500 to-pink-500"
                      : "bg-muted"
                  }`}
                >
                  {(card.flipped || card.matched) ? card.value : "?"}
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ReactionTest({ onComplete, isCompleted }: { onComplete: () => void; isCompleted: boolean }) {
  const [isWaiting, setIsWaiting] = useState(false);
  const [canClick, setCanClick] = useState(false);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState(0);

  const startTest = () => {
    setIsWaiting(true);
    setCanClick(false);
    setReactionTime(null);

    const delay = Math.random() * 3000 + 1000;
    setTimeout(() => {
      setCanClick(true);
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (!canClick) {
      setIsWaiting(false);
      setReactionTime(-1);
      return;
    }

    const time = Date.now() - startTime;
    setReactionTime(time);
    setIsWaiting(false);
    setCanClick(false);

    if (time < 500) {
      onComplete();
    }
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full relative overflow-hidden">
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500">
              <Check size={14} className="mr-1" />
              Complete
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="text-cyan-500" />
            Reaction Test
          </CardTitle>
          <CardDescription>Click when it turns green! ({"<"}500ms to win)</CardDescription>
        </CardHeader>
        <CardContent>
          {!isWaiting && reactionTime === null && (
            <Button onClick={startTest} className="w-full">
              Start Test
            </Button>
          )}

          {isWaiting && (
            <div
              onClick={handleClick}
              className={`h-32 rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer transition-colors ${
                canClick
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {canClick ? "CLICK NOW!" : "Wait..."}
            </div>
          )}

          {reactionTime !== null && (
            <div className="text-center space-y-4">
              {reactionTime === -1 ? (
                <div className="text-2xl font-bold text-red-500">
                  Too early! 😅
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-green-500">
                    {reactionTime}ms
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {reactionTime < 500 ? "🎉 Lightning fast!" : "Good, but try faster!"}
                  </div>
                </div>
              )}
              <Button onClick={startTest} variant="outline">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function BugFixChallenge({ onComplete, isCompleted }: { onComplete: () => void; isCompleted: boolean }) {
  const [selectedError, setSelectedError] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const codeSnippet = `if(user = loggedIn) {
  showDashboard();
}`;

  const options = [
    { id: 1, text: "= should be ==", correct: true },
    { id: 2, text: "Missing semicolon", correct: false },
    { id: 3, text: "Wrong function name", correct: false },
  ];

  const handleSelect = (id: number) => {
    setSelectedError(id);
    setShowResult(true);
    const isCorrect = options.find((o) => o.id === id)?.correct;
    if (isCorrect) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  const startChallenge = () => {
    setIsStarted(true);
    setSelectedError(null);
    setShowResult(false);
  };

  const resetChallenge = () => {
    setSelectedError(null);
    setShowResult(false);
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full relative overflow-hidden">
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500">
              <Check size={14} className="mr-1" />
              Complete
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="text-red-500" />
            Bug Fix Challenge
          </CardTitle>
          <CardDescription>Find and fix the error!</CardDescription>
        </CardHeader>
        <CardContent>
          {!isStarted ? (
            <Button onClick={startChallenge} className="w-full">
              Start Challenge
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-white">
                <pre>{codeSnippet}</pre>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">What's the bug?</p>
                {options.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedError === option.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleSelect(option.id)}
                    disabled={showResult}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center ${
                    options.find((o) => o.id === selectedError)?.correct
                      ? "bg-green-500/20 text-green-700 dark:text-green-300"
                      : "bg-red-500/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  {options.find((o) => o.id === selectedError)?.correct ? (
                    <p className="font-semibold">✅ Correct! Attention to detail is one of my strengths.</p>
                  ) : (
                    <p className="font-semibold">❌ Not quite, try again!</p>
                  )}
                </motion.div>
              )}

              {showResult && !options.find((o) => o.id === selectedError)?.correct && (
                <Button onClick={resetChallenge} variant="outline" className="w-full">
                  Try Again
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CareerPathMaze({ onComplete, isCompleted }: { onComplete: () => void; isCompleted: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [message, setMessage] = useState("");

  const steps = [
    {
      question: "Start of Journey",
      options: [
        { text: "Learn JavaScript", correct: true, next: 1 },
        { text: "Give up coding", correct: false, next: -1 },
      ],
    },
    {
      question: "Skill Development",
      options: [
        { text: "Build projects", correct: true, next: 2 },
        { text: "Only watch tutorials", correct: false, next: -1 },
      ],
    },
    {
      question: "Career Growth",
      options: [
        { text: "Share knowledge with others", correct: true, next: 3 },
        { text: "Keep everything to myself", correct: false, next: -1 },
      ],
    },
  ];

  const handleChoice = (isCorrect: boolean, next: number) => {
    if (isCorrect && next !== -1) {
      if (next === steps.length) {
        setMessage("🎉 You discovered my journey!");
        onComplete();
      } else {
        setCurrentStep(next);
        setMessage("✅ Great choice!");
        setTimeout(() => setMessage(""), 1000);
      }
    } else {
      setMessage("😄 Wrong turn! Try the other path.");
    }
  };

  const startMaze = () => {
    setIsStarted(true);
    setCurrentStep(0);
    setMessage("");
  };

  const resetMaze = () => {
    setCurrentStep(0);
    setMessage("");
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full relative overflow-hidden">
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500">
              <Check size={14} className="mr-1" />
              Complete
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-orange-500" />
            Career Path Maze
          </CardTitle>
          <CardDescription>Navigate through my journey!</CardDescription>
        </CardHeader>
        <CardContent>
          {!isStarted ? (
            <Button onClick={startMaze} className="w-full">
              Start Journey
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Step {currentStep + 1} of {steps.length}</div>
                <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2 mb-4" />
                <h3 className="font-semibold text-lg mb-4">{steps[currentStep]?.question}</h3>
              </div>

              <div className="space-y-2">
                {steps[currentStep]?.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full"
                    onClick={() => handleChoice(option.correct, option.next)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-3 rounded-lg text-center font-semibold ${
                    message.includes("🎉") || message.includes("✅")
                      ? "bg-green-500/20 text-green-700 dark:text-green-300"
                      : "bg-orange-500/20 text-orange-700 dark:text-orange-300"
                  }`}
                >
                  {message}
                </motion.div>
              )}

              {message.includes("Wrong") && (
                <Button onClick={resetMaze} variant="outline" className="w-full">
                  Restart Journey
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PasswordGuess({ onComplete, isCompleted }: { onComplete: () => void; isCompleted: boolean }) {
  const [currentClue, setCurrentClue] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [message, setMessage] = useState("");

  const clues = [
    { question: "My favorite tech stack?", answer: "react", hint: "A popular JavaScript library" },
    { question: "Years of experience? (number)", answer: "5", hint: "More than 3, less than 10" },
    { question: "Favorite programming language?", answer: "javascript", hint: "The language of the web" },
  ];

  const handleSubmit = () => {
    if (answer.toLowerCase() === clues[currentClue].answer.toLowerCase()) {
      if (currentClue === clues.length - 1) {
        setMessage("🎉 Access granted. Welcome inside!");
        onComplete();
      } else {
        setMessage("✅ Correct!");
        setTimeout(() => {
          setCurrentClue(currentClue + 1);
          setAnswer("");
          setMessage("");
        }, 1000);
      }
    } else {
      setMessage("❌ Try again! Hint: " + clues[currentClue].hint);
    }
  };

  const startChallenge = () => {
    setIsStarted(true);
    setCurrentClue(0);
    setAnswer("");
    setMessage("");
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full relative overflow-hidden">
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500">
              <Check size={14} className="mr-1" />
              Complete
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="text-yellow-500" />
            Password Guess
          </CardTitle>
          <CardDescription>Crack the code using clues!</CardDescription>
        </CardHeader>
        <CardContent>
          {!isStarted ? (
            <Button onClick={startChallenge} className="w-full">
              Start Challenge
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Clue {currentClue + 1} of {clues.length}</div>
                <Progress value={((currentClue + 1) / clues.length) * 100} className="h-2 mb-4" />
                <h3 className="font-semibold text-lg mb-4">{clues[currentClue]?.question}</h3>
              </div>

              <div className="flex gap-2">
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Your answer..."
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1"
                  autoFocus
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-center text-sm ${
                    message.includes("🎉") || message.includes("✅")
                      ? "bg-green-500/20 text-green-700 dark:text-green-300 font-semibold"
                      : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
