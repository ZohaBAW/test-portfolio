import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Sparkles, Lock, Unlock } from "lucide-react";

const PUZZLE_PIECES = [
  { id: 1, color: "from-purple-500 to-pink-500", position: null },
  { id: 2, color: "from-cyan-500 to-blue-500", position: null },
  { id: 3, color: "from-pink-500 to-rose-500", position: null },
  { id: 4, color: "from-blue-500 to-purple-500", position: null },
];

const CORRECT_ORDER = [1, 2, 3, 4];

interface PuzzlePiece {
  id: number;
  color: string;
  position: number | null;
}

const DraggablePiece = ({ piece, onDrop }: { piece: PuzzlePiece; onDrop: (id: number) => void }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "puzzle-piece",
    item: { id: piece.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (piece.position !== null) return null;

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`w-24 h-24 rounded-xl bg-gradient-to-br ${piece.color} cursor-move shadow-lg ${
        isDragging ? "opacity-50" : "opacity-100"
      } flex items-center justify-center backdrop-blur-sm border border-white/20`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Sparkles className="text-white" size={32} />
    </motion.div>
  );
};

const DropZone = ({
  position,
  piece,
  onDrop,
}: {
  position: number;
  piece: PuzzlePiece | undefined;
  onDrop: (position: number, pieceId: number) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "puzzle-piece",
    drop: (item: { id: number }) => onDrop(position, item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-24 h-24 rounded-xl border-2 border-dashed transition-all ${
        isOver
          ? "border-cyan-400 bg-cyan-400/20 scale-105"
          : piece
          ? "border-transparent"
          : "border-white/30 bg-white/5"
      } flex items-center justify-center`}
    >
      {piece ? (
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          className={`w-full h-full rounded-xl bg-gradient-to-br ${piece.color} flex items-center justify-center shadow-lg border border-white/20`}
        >
          <Sparkles className="text-white" size={32} />
        </motion.div>
      ) : (
        <div className="text-white/40 font-mono">{position}</div>
      )}
    </div>
  );
};

export default function PuzzleLogin() {
  const navigate = useNavigate();
  const [pieces, setPieces] = useState<PuzzlePiece[]>(PUZZLE_PIECES);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleDrop = (position: number, pieceId: number) => {
    setPieces((prev) =>
      prev.map((p) =>
        p.id === pieceId ? { ...p, position } : p.position === position ? { ...p, position: null } : p
      )
    );
  };

  const resetPuzzle = () => {
    setPieces(PUZZLE_PIECES);
    setProgress(0);
    setIsUnlocked(false);
  };

  useEffect(() => {
    const placedPieces = pieces.filter((p) => p.position !== null);
    const correctPieces = pieces.filter(
      (p) => p.position !== null && CORRECT_ORDER[p.position - 1] === p.id
    );

    setProgress((correctPieces.length / CORRECT_ORDER.length) * 100);

    if (correctPieces.length === CORRECT_ORDER.length) {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
    }
  }, [pieces]);

  const handleUnlock = () => {
    navigate("/dashboard");
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
              Welcome to Zoha's Portfolio 🚀
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Solve the puzzle below to unlock my world.
            </p>
          </motion.div>

          {/* Puzzle Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl mb-8"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 text-sm">Puzzle Progress</span>
                <span className="text-white font-mono">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Drop Zones */}
            <div className="flex gap-4 mb-12 justify-center">
              {[1, 2, 3, 4].map((position) => (
                <DropZone
                  key={position}
                  position={position}
                  piece={pieces.find((p) => p.position === position)}
                  onDrop={handleDrop}
                />
              ))}
            </div>

            {/* Draggable Pieces */}
            <div className="flex gap-4 justify-center flex-wrap">
              {pieces.map((piece) => (
                <DraggablePiece key={piece.id} piece={piece} onDrop={handleDrop} />
              ))}
            </div>

            <div className="mt-8 text-center text-white/60 text-sm">
              Drag and drop the pieces in the correct order (1 → 4)
            </div>
          </motion.div>

          {/* Unlock Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
                  Unlock Portfolio
                </>
              ) : (
                <>
                  <Lock className="mr-2" />
                  Solve Puzzle First
                </>
              )}
            </Button>

            {pieces.some((p) => p.position !== null) && (
              <Button
                variant="ghost"
                onClick={resetPuzzle}
                className="mt-4 text-white/80 hover:text-white"
              >
                Reset Puzzle
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </DndProvider>
  );
}
