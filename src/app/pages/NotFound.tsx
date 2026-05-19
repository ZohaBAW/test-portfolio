import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-white/80 text-lg mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 gap-2"
          >
            <Home size={18} />
            Go Home
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="gap-2 text-white border-white/20 hover:bg-white/10"
          >
            <Search size={18} />
            Explore Portfolio
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
