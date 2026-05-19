import { motion } from "motion/react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Github, Linkedin, Mail, MapPin, Code2, Heart } from "lucide-react";
import { Button } from "../components/ui/button";

const timeline = [
  {
    year: "2024",
    title: "Senior Full Stack Developer",
    description: "Leading development of scalable web applications",
  },
  {
    year: "2022",
    title: "IT Trainer & Mentor",
    description: "Teaching modern web development to aspiring developers",
  },
  {
    year: "2020",
    title: "Full Stack Developer",
    description: "Built enterprise solutions using React and Node.js",
  },
  {
    year: "2018",
    title: "Started Coding Journey",
    description: "Fell in love with web development and never looked back",
  },
];

export default function About() {
  return (
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-muted-foreground text-lg">
            Developer, Trainer, and Technology Enthusiast
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Avatar & Quick Info */}
              <div className="text-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  <Avatar className="w-48 h-48 border-4 border-purple-500/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" />
                    <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <p className="text-muted-foreground">Full Stack Developer</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-2">
                    <MapPin size={14} />
                    San Francisco, CA
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  <Button size="icon" variant="outline">
                    <Github size={18} />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Linkedin size={18} />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Mail size={18} />
                  </Button>
                </div>
              </div>

              {/* Bio & Interests */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Code2 className="text-purple-500" size={20} />
                    My Story
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm a passionate Full Stack Developer and IT Trainer with over 6 years of experience
                    building modern web applications. I love crafting beautiful, performant, and user-friendly
                    interfaces while ensuring robust backend systems.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    When I'm not coding, you'll find me teaching others, contributing to open source,
                    or exploring the latest web technologies. I believe in continuous learning and
                    sharing knowledge with the community.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Heart className="text-pink-500" size={20} />
                    Interests & Hobbies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">🎮 Gaming</Badge>
                    <Badge variant="secondary">📚 Reading Tech Blogs</Badge>
                    <Badge variant="secondary">🎸 Playing Guitar</Badge>
                    <Badge variant="secondary">✈️ Traveling</Badge>
                    <Badge variant="secondary">📷 Photography</Badge>
                    <Badge variant="secondary">🎨 UI/UX Design</Badge>
                    <Badge variant="secondary">🏃‍♂️ Running</Badge>
                    <Badge variant="secondary">☕ Coffee Tasting</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Core Values</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { emoji: "💡", title: "Innovation", desc: "Always seeking better solutions" },
                      { emoji: "🤝", title: "Collaboration", desc: "Teamwork makes the dream work" },
                      { emoji: "📈", title: "Growth", desc: "Continuous learning mindset" },
                      { emoji: "⚡", title: "Excellence", desc: "Quality in every detail" },
                    ].map((value) => (
                      <motion.div
                        key={value.title}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-muted"
                      >
                        <div className="text-2xl mb-1">{value.emoji}</div>
                        <div className="font-semibold">{value.title}</div>
                        <div className="text-sm text-muted-foreground">{value.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">My Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col gap-8`}
                >
                  <div className="flex-1" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                      {item.year.slice(-2)}
                    </div>
                  </div>
                  <Card className="flex-1 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-sm text-purple-500 font-semibold mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
