import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Calculator, Brain, Zap, Trophy, Timer, Check, Bug, Code2, TrendingUp } from "lucide-react";
import confetti from "canvas-confetti";

const FACTS = [
  "I've built production-grade platforms with React & Strapi 🚀",
  "I reduced customer response time by 60% with WhatsApp API integration 💬",
  "Understanding JS quirks is key to writing clean code 🔍",
  "Efficient code matters — I optimize for performance ⚡",
  "My attention to detail helps me catch bugs before they ship 🐛",
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
            {completedGames.length} / 5 Games Completed
          </span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <MathChallenge onComplete={() => handleGameComplete("math")} isCompleted={completedGames.includes("math")} />
        <MemoryGame onComplete={() => handleGameComplete("memory")} isCompleted={completedGames.includes("memory")} />
        <ReactionTest onComplete={() => handleGameComplete("reaction")} isCompleted={completedGames.includes("reaction")} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <BugFixChallenge onComplete={() => handleGameComplete("bugfix")} isCompleted={completedGames.includes("bugfix")} />
        <OutputPrediction onComplete={() => handleGameComplete("output")} isCompleted={completedGames.includes("output")} />
      </div>

      <div className="grid md:grid-cols-1 gap-6 mt-6">
        <CodeComplexity onComplete={() => handleGameComplete("complexity")} isCompleted={completedGames.includes("complexity")} />
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

type MathQuestion = { expression: string; answer: number; difficulty: string };

function generateMathQuestion(): MathQuestion {
  const type = Math.floor(Math.random() * 6);
  if (type === 0) {
    const a = Math.floor(Math.random() * 10) + 2;
    const b = Math.floor(Math.random() * 10) + 2;
    const c = Math.floor(Math.random() * 8) + 2;
    return { expression: `(${a} + ${b}) × ${c}`, answer: (a + b) * c, difficulty: "Medium" };
  } else if (type === 1) {
    const a = Math.floor(Math.random() * 12) + 3;
    const b = Math.floor(Math.random() * 9) + 2;
    const c = Math.floor(Math.random() * 20) + 5;
    return { expression: `${a} × ${b} − ${c}`, answer: a * b - c, difficulty: "Medium" };
  } else if (type === 2) {
    const a = Math.floor(Math.random() * 15) + 10;
    const b = Math.floor(Math.random() * 8) + 2;
    const c = Math.floor(Math.random() * 6) + 2;
    const d = Math.floor(Math.random() * 15) + 1;
    return { expression: `(${a} − ${b}) × ${c} + ${d}`, answer: (a - b) * c + d, difficulty: "Hard" };
  } else if (type === 3) {
    const a = Math.floor(Math.random() * 10) + 3;
    const b = Math.floor(Math.random() * 20) + 1;
    return { expression: `${a}² + ${b}`, answer: a * a + b, difficulty: "Hard" };
  } else if (type === 4) {
    const pcts = [10, 20, 25, 50, 75];
    const pct = pcts[Math.floor(Math.random() * pcts.length)];
    const y = (Math.floor(Math.random() * 10) + 1) * 20;
    return { expression: `${pct}% of ${y}`, answer: Math.round((pct / 100) * y), difficulty: "Medium" };
  } else {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 7) + 2;
    const c = Math.floor(Math.random() * 6) + 2;
    const d = Math.floor(Math.random() * 5) + 2;
    return { expression: `${a} × ${b} + ${c} × ${d}`, answer: a * b + c * d, difficulty: "Hard" };
  }
}

function MathChallenge({ onComplete, isCompleted }: { onComplete: () => void; isCompleted: boolean }) {
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(12);
  const [isActive, setIsActive] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [streak, setStreak] = useState(0);

  const startGame = () => {
    setQuestion(generateMathQuestion());
    setAnswer("");
    setTimeLeft(12);
    setIsActive(true);
    setResult(null);
  };

  useEffect(() => {
    if (!isActive || timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          setIsActive(false);
          setResult("wrong");
          setStreak(0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleSubmit = () => {
    if (!question) return;
    if (parseFloat(answer) === question.answer) {
      setResult("correct");
      setIsActive(false);
      setStreak((s) => s + 1);
      onComplete();
    } else {
      setResult("wrong");
      setIsActive(false);
      setStreak(0);
    }
  };

  const timerColor = timeLeft <= 4 ? "text-red-500" : timeLeft <= 7 ? "text-orange-500" : "text-green-500";

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
          <CardDescription>Multi-step equations — 12 seconds!</CardDescription>
        </CardHeader>
        <CardContent>
          {!isActive && !result && (
            <div className="space-y-3 text-center">
              {streak > 0 && <div className="text-sm text-orange-500 font-semibold">🔥 Streak: {streak}</div>}
              <Button onClick={startGame} className="w-full">Start Challenge</Button>
            </div>
          )}

          {isActive && question && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{question.difficulty}</Badge>
                <div className={`flex items-center gap-1 font-bold ${timerColor}`}>
                  <Timer size={16} />
                  {timeLeft}s
                </div>
              </div>
              <Progress value={(timeLeft / 12) * 100} className="h-2" />
              <div className="text-center text-2xl font-bold p-6 bg-muted rounded-lg font-mono">
                {question.expression} = ?
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Your answer"
                  className="text-lg"
                  autoFocus
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          )}

          {result && question && (
            <div className="text-center space-y-3">
              <div className={`text-2xl font-bold ${result === "correct" ? "text-green-500" : "text-red-500"}`}>
                {result === "correct" ? "🎉 Correct!" : "❌ Wrong!"}
              </div>
              {result === "wrong" && (
                <p className="text-sm text-muted-foreground">
                  Answer was <span className="font-bold text-foreground">{question.answer}</span>
                </p>
              )}
              {streak > 1 && result === "correct" && (
                <p className="text-sm text-orange-500 font-semibold">🔥 {streak} in a row!</p>
              )}
              <Button onClick={startGame} variant="outline" className="w-full">Next Question</Button>
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
  const [currentBug, setCurrentBug] = useState(0);

  const bugScenarios = [
    {
      code: `if(user = loggedIn) {
  showDashboard();
}`,
      options: [
        { id: 1, text: "= should be === (assignment vs comparison)", correct: true },
        { id: 2, text: "Missing semicolon", correct: false },
        { id: 3, text: "Wrong function name", correct: false },
      ]
    },
    {
      code: `for(let i = 0; i < 10; i--) {
  console.log(i);
}`,
      options: [
        { id: 1, text: "i-- should be i++ (infinite loop)", correct: true },
        { id: 2, text: "Missing curly braces", correct: false },
        { id: 3, text: "Should use forEach instead", correct: false },
      ]
    },
    {
      code: `const items = [1, 2, 3];
console.log(items[3]);`,
      options: [
        { id: 1, text: "Index out of bounds (should be items[2])", correct: true },
        { id: 2, text: "Should use items.at(3)", correct: false },
        { id: 3, text: "Array syntax is wrong", correct: false },
      ]
    },
    {
      code: `function calculate() {
  return
    42;
}`,
      options: [
        { id: 1, text: "return and value on separate lines (returns undefined)", correct: true },
        { id: 2, text: "Missing function parameters", correct: false },
        { id: 3, text: "Wrong return value", correct: false },
      ]
    },
    {
      code: `const obj = { name: 'John' }
const copy = obj;
copy.name = 'Jane';`,
      options: [
        { id: 1, text: "Shallow copy (both objects share reference)", correct: true },
        { id: 2, text: "Missing const keyword", correct: false },
        { id: 3, text: "Wrong property access", correct: false },
      ]
    },
    {
      code: `let count = 0;
setTimeout(() => {
  count = count + 1;
}, 0);
console.log(count);`,
      options: [
        { id: 1, text: "Async timing issue (logs 0, not 1)", correct: true },
        { id: 2, text: "Should use var instead of let", correct: false },
        { id: 3, text: "Missing semicolons", correct: false },
      ]
    },
    {
      code: `const nums = [1, 2, 3];
const doubled = nums.map(n => {
  n * 2;
});`,
      options: [
        { id: 1, text: "Missing return statement in map", correct: true },
        { id: 2, text: "Should use forEach", correct: false },
        { id: 3, text: "Arrow function syntax error", correct: false },
      ]
    },
    {
      code: `class Animal {
  constructor(name) {
    name = name;
  }
}`,
      options: [
        { id: 1, text: "Should be this.name = name", correct: true },
        { id: 2, text: "Missing class keyword", correct: false },
        { id: 3, text: "Constructor syntax wrong", correct: false },
      ]
    },
    {
      code: `const users = ['Alice', 'Bob'];
users.foreach(user => {
  console.log(user);
});`,
      options: [
        { id: 1, text: "foreach should be forEach (capital E)", correct: true },
        { id: 2, text: "Should use for loop", correct: false },
        { id: 3, text: "Wrong arrow function syntax", correct: false },
      ]
    },
    {
      code: `async function getData() {
  const data = fetch('/api');
  return data.json();
}`,
      options: [
        { id: 1, text: "Missing await before fetch", correct: true },
        { id: 2, text: "Should use .then instead", correct: false },
        { id: 3, text: "Wrong async syntax", correct: false },
      ]
    },
  ];

  const handleSelect = (id: number) => {
    setSelectedError(id);
    setShowResult(true);
    const isCorrect = bugScenarios[currentBug].options.find((o) => o.id === id)?.correct;
    if (isCorrect) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  const startChallenge = () => {
    const randomBug = Math.floor(Math.random() * bugScenarios.length);
    setCurrentBug(randomBug);
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
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Test your debugging skills with real code errors!
              </p>
              <Button onClick={startChallenge} className="w-full">
                Start Challenge
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-white overflow-x-auto">
                <pre>{bugScenarios[currentBug].code}</pre>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">What's the bug?</p>
                {bugScenarios[currentBug].options.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedError === option.id ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleSelect(option.id)}
                    disabled={showResult}
                  >
                    <span className="text-sm">{option.text}</span>
                  </Button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center ${
                    bugScenarios[currentBug].options.find((o) => o.id === selectedError)?.correct
                      ? "bg-green-500/20 text-green-700 dark:text-green-300"
                      : "bg-red-500/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  {bugScenarios[currentBug].options.find((o) => o.id === selectedError)?.correct ? (
                    <p className="font-semibold">✅ Correct! Attention to detail is one of my strengths.</p>
                  ) : (
                    <p className="font-semibold">❌ Not quite, try again!</p>
                  )}
                </motion.div>
              )}

              {showResult && !bugScenarios[currentBug].options.find((o) => o.id === selectedError)?.correct && (
                <Button onClick={resetChallenge} variant="outline" className="w-full">
                  Try Again
                </Button>
              )}

              {!showResult && (
                <Button onClick={startChallenge} variant="ghost" className="w-full text-xs">
                  Skip to different bug
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function OutputPrediction({ onComplete, isCompleted }: { onComplete: () => void; isCompleted: boolean }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      code: `console.log(2 + "2" - 1);`,
      options: ["21", "3", "22", "Error"],
      correct: "21",
    },
    {
      code: `console.log(typeof null);`,
      options: ["null", "object", "undefined", "number"],
      correct: "object",
    },
    {
      code: `console.log([] + []);`,
      options: ["[]", "[[]]", '""', "undefined"],
      correct: '""',
    },
    {
      code: `console.log(true + false);`,
      options: ["true", "false", "1", "0"],
      correct: "1",
    },
    {
      code: `console.log(!"");`,
      options: ["true", "false", "null", "undefined"],
      correct: "true",
    },
    {
      code: `console.log([1, 2, 3] + [4, 5, 6]);`,
      options: ["[1,2,3,4,5,6]", '"1,2,34,5,6"', "NaN", "Error"],
      correct: '"1,2,34,5,6"',
    },
  ];

  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === questions[currentQuestion].correct) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  const startChallenge = () => {
    const randomQuestion = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(randomQuestion);
    setIsStarted(true);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const tryAgain = () => {
    const randomQuestion = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
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
            <Code2 className="text-blue-500" />
            Output Prediction
          </CardTitle>
          <CardDescription>What will this code output?</CardDescription>
        </CardHeader>
        <CardContent>
          {!isStarted ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Test your JavaScript knowledge!
              </p>
              <Button onClick={startChallenge} className="w-full">
                Start Challenge
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-white overflow-x-auto">
                <pre>{questions[currentQuestion].code}</pre>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">Output:</p>
                <div className="grid grid-cols-2 gap-2">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      className="font-mono"
                      onClick={() => handleSelect(option)}
                      disabled={showResult}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center ${
                    selectedAnswer === questions[currentQuestion].correct
                      ? "bg-green-500/20 text-green-700 dark:text-green-300"
                      : "bg-red-500/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  {selectedAnswer === questions[currentQuestion].correct ? (
                    <p className="font-semibold">✅ Correct! Understanding JS quirks is key to writing clean code.</p>
                  ) : (
                    <div>
                      <p className="font-semibold">❌ Not quite!</p>
                      <p className="text-sm mt-1">Correct answer: {questions[currentQuestion].correct}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {showResult && (
                <Button onClick={tryAgain} variant="outline" className="w-full">
                  Try Different Question
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CodeComplexity({ onComplete, isCompleted }: { onComplete: () => void; isCompleted: boolean }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      code: `for(let i=0; i<n; i++) {
  console.log(i);
}`,
      question: "What's the time complexity?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: "O(n)",
    },
    {
      code: `for(let i=0; i<n; i++) {
  for(let j=0; j<n; j++) {
    console.log(i, j);
  }
}`,
      question: "What's the time complexity?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2n)"],
      correct: "O(n²)",
    },
    {
      code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while(left <= right) {
    let mid = Math.floor((left + right) / 2);
    if(arr[mid] === target) return mid;
    if(arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      question: "What's the time complexity?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: "O(log n)",
    },
    {
      code: `const result = arr[0];
console.log(result);`,
      question: "What's the time complexity?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: "O(1)",
    },
    {
      code: `arr.sort((a, b) => a - b);`,
      question: "What's the time complexity?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correct: "O(n log n)",
    },
  ];

  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === questions[currentQuestion].correct) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  const startChallenge = () => {
    const randomQuestion = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(randomQuestion);
    setIsStarted(true);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const tryAgain = () => {
    const randomQuestion = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
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
            <TrendingUp className="text-green-500" />
            Code Complexity Challenge
          </CardTitle>
          <CardDescription>Identify the Big O complexity!</CardDescription>
        </CardHeader>
        <CardContent>
          {!isStarted ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Test your algorithm analysis skills!
              </p>
              <Button onClick={startChallenge} className="w-full">
                Start Challenge
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-white overflow-x-auto">
                <pre>{questions[currentQuestion].code}</pre>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">{questions[currentQuestion].question}</p>
                <div className="grid grid-cols-2 gap-2">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      className="font-mono"
                      onClick={() => handleSelect(option)}
                      disabled={showResult}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center ${
                    selectedAnswer === questions[currentQuestion].correct
                      ? "bg-green-500/20 text-green-700 dark:text-green-300"
                      : "bg-red-500/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  {selectedAnswer === questions[currentQuestion].correct ? (
                    <p className="font-semibold">✅ Correct! Efficient code matters — I optimize for performance.</p>
                  ) : (
                    <div>
                      <p className="font-semibold">❌ Not quite!</p>
                      <p className="text-sm mt-1">Correct answer: {questions[currentQuestion].correct}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {showResult && (
                <Button onClick={tryAgain} variant="outline" className="w-full">
                  Try Different Question
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
