import { Outlet, useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { useTheme } from "../components/ThemeProvider";
import {
  Home,
  User,
  Briefcase,
  Code2,
  FolderGit2,
  Moon,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useState, useCallback, createContext, useContext } from "react";

const navItems = [
  { path: "/dashboard", label: "Games", icon: Home },
  { path: "/dashboard/about", label: "About", icon: User },
  { path: "/dashboard/experience", label: "Experience", icon: Briefcase },
  { path: "/dashboard/skills", label: "Skills", icon: Code2 },
  { path: "/dashboard/projects", label: "Projects", icon: FolderGit2 },
];

export const SoundContext = createContext<{
  playSound: (type: "click" | "success" | "error" | "pop") => void;
  soundEnabled: boolean;
}>({ playSound: () => {}, soundEnabled: false });

export function useSound() {
  return useContext(SoundContext);
}

function beep(ctx: AudioContext, freq: number, duration: number, type: OscillatorType = "sine", vol = 0.15) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (audioCtx) return audioCtx;
    const ctx = new AudioContext();
    setAudioCtx(ctx);
    return ctx;
  }, [audioCtx]);

  const playSound = useCallback((type: "click" | "success" | "error" | "pop") => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (type === "click") beep(ctx, 440, 0.08, "square", 0.1);
    if (type === "pop") beep(ctx, 600, 0.06, "sine", 0.12);
    if (type === "success") {
      beep(ctx, 523, 0.1, "sine", 0.15);
      setTimeout(() => beep(ctx, 659, 0.15, "sine", 0.15), 110);
      setTimeout(() => beep(ctx, 784, 0.2, "sine", 0.15), 230);
    }
    if (type === "error") {
      beep(ctx, 220, 0.15, "sawtooth", 0.1);
      setTimeout(() => beep(ctx, 180, 0.2, "sawtooth", 0.1), 160);
    }
  }, [soundEnabled, getCtx]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      const ctx = getCtx();
      beep(ctx, 523, 0.1, "sine", 0.15);
      setTimeout(() => beep(ctx, 659, 0.12, "sine", 0.15), 120);
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, soundEnabled }}>
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-950/20 to-background">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Z</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Zoha
                </span>
              </motion.div>

              <div className="flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Button
                      key={item.path}
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => navigate(item.path)}
                      className={`gap-2 ${isActive ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : ""}`}
                    >
                      <Icon size={18} />
                      <span className="hidden md:inline">{item.label}</span>
                    </Button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSound}
                  title={soundEnabled ? "Sound ON — click to mute" : "Sound OFF — click to enable"}
                >
                  {soundEnabled
                    ? <Volume2 size={20} className="text-purple-400" />
                    : <VolumeX size={20} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
              </div>
            </div>
          </div>
        </motion.nav>

        <main className="pt-24 pb-12 px-6">
          <Outlet />
        </main>

        <div
          className="fixed bottom-4 right-4 w-8 h-8 cursor-pointer opacity-0 hover:opacity-100"
          onClick={() => {
            const messages = [
              "🎉 You found the easter egg!",
              "🚀 Keep exploring!",
              "✨ Nice find!",
              "🎨 You're curious, I like that!",
            ];
            alert(messages[Math.floor(Math.random() * messages.length)]);
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse" />
        </div>
      </div>
    </SoundContext.Provider>
  );
}
