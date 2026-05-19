import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Code2, Palette, Database, Wrench, Cloud, GitBranch } from "lucide-react";

const skillCategories = {
  frontend: {
    title: "Frontend",
    icon: Code2,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "TypeScript", level: 90, icon: "📘" },
      { name: "Next.js", level: 85, icon: "▲" },
      { name: "Tailwind CSS", level: 92, icon: "🎨" },
      { name: "Vue.js", level: 75, icon: "💚" },
      { name: "HTML/CSS", level: 98, icon: "🌐" },
    ],
  },
  backend: {
    title: "Backend",
    icon: Database,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Express", level: 88, icon: "🚂" },
      { name: "Python", level: 80, icon: "🐍" },
      { name: "Django", level: 75, icon: "🎸" },
      { name: "PostgreSQL", level: 85, icon: "🐘" },
      { name: "MongoDB", level: 82, icon: "🍃" },
    ],
  },
  tools: {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Git", level: 95, icon: "📦" },
      { name: "Docker", level: 80, icon: "🐳" },
      { name: "AWS", level: 75, icon: "☁️" },
      { name: "CI/CD", level: 78, icon: "🔄" },
      { name: "Jest", level: 85, icon: "🃏" },
      { name: "Webpack", level: 70, icon: "📦" },
    ],
  },
};

const tools = [
  { name: "VS Code", category: "Editor" },
  { name: "Figma", category: "Design" },
  { name: "Postman", category: "API" },
  { name: "GitHub", category: "Version Control" },
  { name: "Vercel", category: "Deployment" },
  { name: "Jira", category: "Project Management" },
  { name: "Slack", category: "Communication" },
  { name: "Notion", category: "Documentation" },
  { name: "Chrome DevTools", category: "Debugging" },
  { name: "Terminal", category: "CLI" },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Tools
          </h1>
          <p className="text-muted-foreground text-lg">
            Technologies I work with and love
          </p>
        </div>

        {/* Skill Categories */}
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {Object.entries(skillCategories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={key} value={key} className="gap-2">
                  <Icon size={18} />
                  <span className="hidden sm:inline">{category.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(skillCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="grid md:grid-cols-2 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    <Card className={`transition-all duration-300 ${
                      hoveredSkill === skill.name ? "shadow-lg scale-105" : ""
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{skill.icon}</span>
                            <span className="font-semibold text-lg">{skill.name}</span>
                          </div>
                          <span className="text-sm font-mono text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Tools Grid */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Tools I Use Daily
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="font-semibold mb-1">{tool.name}</div>
                    <div className="text-xs text-muted-foreground">{tool.category}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
          >
            <Code2 className="text-purple-500 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">Clean Code</h3>
            <p className="text-muted-foreground text-sm">
              Writing maintainable, scalable, and well-documented code following best practices
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
          >
            <Palette className="text-cyan-500 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">UI/UX Focus</h3>
            <p className="text-muted-foreground text-sm">
              Creating beautiful, intuitive interfaces with attention to user experience
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20"
          >
            <Cloud className="text-pink-500 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">Modern Stack</h3>
            <p className="text-muted-foreground text-sm">
              Leveraging the latest technologies and frameworks for optimal performance
            </p>
          </motion.div>
        </div>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="text-purple-500" />
              Certifications & Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "AWS Certified Developer", year: "2023", issuer: "Amazon" },
                { name: "Meta React Developer", year: "2022", issuer: "Meta" },
                { name: "Node.js Application Developer", year: "2021", issuer: "OpenJS Foundation" },
                { name: "Full Stack Web Development", year: "2020", issuer: "freeCodeCamp" },
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold">{cert.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {cert.issuer} • {cert.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
