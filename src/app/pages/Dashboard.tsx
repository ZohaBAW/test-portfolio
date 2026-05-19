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
import { useState } from "react";

const navItems = [
  { path: "/dashboard", label: "Games", icon: Home },
  { path: "/dashboard/about", label: "About", icon: User },
  { path: "/dashboard/experience", label: "Experience", icon: Briefcase },
  { path: "/dashboard/skills", label: "Skills", icon: Code2 },
  { path: "/dashboard/projects", label: "Projects", icon: FolderGit2 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-950/20 to-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.div>

            {/* Nav Links */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => navigate(item.path)}
                    className={`gap-2 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : ""
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden md:inline">{item.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Theme & Sound Toggles */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
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

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <Outlet />
      </main>

      {/* Easter Egg - Hidden click area */}
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
  );
}
