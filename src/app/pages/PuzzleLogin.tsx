import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Brain, Lock, Unlock } from "lucide-react";
import confetti from "canvas-confetti";

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export default function PuzzleLogin() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [moves, setMoves] = useState(0);

  const emojis = ["🚀", "💻", "⚡", "🎨", "🔥", "✨"];

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((value, id) => ({ id, value, flipped: false, matched: false }));
    setCards(shuffled);
    setFlippedIndices([]);
    setIsStarted(true);
    setProgress(0);
    setIsUnlocked(false);
    setMoves(0);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setTimeout(() => {
        const [first, second] = newFlipped;
        if (cards[first].value === cards[second].value) {
          const updated = [...cards];
          updated[first].matched = true;
          updated[second].matched = true;
          setCards(updated);

          if (updated.every((c) => c.matched)) {
            setIsUnlocked(true);
            confetti({
              particleCount: 200,
              spread: 100,
              origin: { y: 0.6 },
            });
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

  useEffect(() => {
    const matchedCount = cards.filter((c) => c.matched).length;
    setProgress((matchedCount / cards.length) * 100);
  }, [cards]);

  const handleUnlock = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Welcome to My Portfolio Space 🚀
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Test your memory to unlock my world.
          </p>
        </motion.div>

        {/* Puzzle Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl mb-8 max-w-2xl w-full"
        >
          {!isStarted ? (
            <div className="text-center">
              <Brain className="mx-auto mb-6 text-purple-400" size={80} />
              <h2 className="text-3xl font-bold text-white mb-4">Memory Challenge</h2>
              <p className="text-white/70 mb-8 text-lg">
                Match all the pairs to unlock the portfolio
              </p>
              <Button
                onClick={initGame}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-lg rounded-full shadow-lg"
              >
                Start Challenge
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/80 text-sm">Progress</span>
                  <div className="flex gap-4">
                    <span className="text-white/80 text-sm">Moves: {moves}</span>
                    <span className="text-white font-mono">{Math.round(progress)}%</span>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Memory Cards Grid */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: card.flipped || card.matched ? 1 : 1.05 }}
                    whileTap={{ scale: card.flipped || card.matched ? 1 : 0.95 }}
                    onClick={() => handleCardClick(index)}
                    className={`aspect-square rounded-xl cursor-pointer flex items-center justify-center text-5xl transition-all duration-300 ${
                      card.flipped || card.matched
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
                        : "bg-white/10 hover:bg-white/20"
                    } ${card.matched ? "opacity-70" : ""}`}
                  >
                    <AnimatePresence mode="wait">
                      {card.flipped || card.matched ? (
                        <motion.div
                          key="front"
                          initial={{ rotateY: 90 }}
                          animate={{ rotateY: 0 }}
                          exit={{ rotateY: 90 }}
                          transition={{ duration: 0.3 }}
                        >
                          {card.value}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          initial={{ rotateY: 90 }}
                          animate={{ rotateY: 0 }}
                          exit={{ rotateY: 90 }}
                          transition={{ duration: 0.3 }}
                          className="text-white/30"
                        >
                          ?
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="text-center text-white/60 text-sm">
                Click cards to flip and find matching pairs
              </div>
            </>
          )}
        </motion.div>

        {/* Unlock Button */}
        {isStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              size="lg"
              disabled={!isUnlocked}
              onClick={handleUnlock}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-lg rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUnlocked ? (
                <>
                  <Unlock className="mr-2" />
                  Enter Portfolio
                </>
              ) : (
                <>
                  <Lock className="mr-2" />
                  Match All Pairs First
                </>
              )}
            </Button>

            {isStarted && !isUnlocked && (
              <Button
                variant="ghost"
                onClick={initGame}
                className="text-white/80 hover:text-white"
              >
                Restart Game
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
