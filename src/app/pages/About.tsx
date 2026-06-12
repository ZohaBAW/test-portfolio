import { motion } from "motion/react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Linkedin, Mail, MapPin, Code2, Heart } from "lucide-react";
import { Button } from "../components/ui/button";

const timeline = [
  {
    year: "2025–Present",
    title: "Full Stack Web Trainer",
    description: "Delivering comprehensive training in HTML, CSS, JavaScript, Next.js, React.js, Node.js, Python, Django, and Express.js at Zabeel International Institute, Dubai.",
  },
  {
    year: "2022–2023",
    title: "Front-End Developer at Prolance Services",
    description: "Built responsive web interfaces with React.js, TypeScript, Material UI, and Mantine UI. Integrated REST APIs and contributed to CI/CD pipelines in Agile sprints.",
  },
  {
    year: "2022",
    title: "Front-End Developer at ReformX Technologies",
    description: "Developed internal tools and dashboards using React.js and Firebase; mentored junior developers on component architecture and frontend–backend integration.",
  },
  {
    year: "2018–2021",
    title: "Bachelor of Computer Applications",
    description: "Graduated from JSS College for Women, Mysore, India with a GPA of 8.4/10.",
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
            Frontend Developer & Technology Enthusiast
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Avatar & Quick Info */}
              <div className="text-center space-y-4">
                <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                  <Avatar className="w-48 h-48 border-4 border-purple-500/20">
                    <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      ZW
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold">Zoha Binte Abdul Wahid</h2>
                  <p className="text-muted-foreground">Frontend Developer</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-2">
                    <MapPin size={14} />
                    Dubai, UAE
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">zohabawahid@gmail.com</p>
                  <p className="text-sm text-muted-foreground">+971 50 360 7057</p>
                </div>
                <div className="flex justify-center gap-2">
                  <Button size="icon" variant="outline" asChild>
                    <a href="https://linkedin.com/in/zuhabaw" target="_blank" rel="noreferrer">
                      <Linkedin size={18} />
                    </a>
                  </Button>
                  <Button size="icon" variant="outline" asChild>
                    <a href="mailto:zohabawahid@gmail.com">
                      <Mail size={18} />
                    </a>
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
                    Frontend-focused developer with 3 years of experience building responsive, accessible web applications using React.js, Next.js, and TypeScript. Skilled at translating UX/UI designs into reusable components and integrating frontends with REST APIs and content management systems.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Strong focus on clean, maintainable code, performance, and cross-browser compatibility, with proven collaboration through code reviews, Agile delivery, and mentoring. Currently based in Dubai, delivering industry-aligned training as a Full Stack Web Trainer at Zabeel International Institute.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Heart className="text-pink-500" size={20} />
                    Interests & Hobbies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">👨‍🏫 Teaching & Mentoring</Badge>
                    <Badge variant="secondary">📚 Learning New Technologies</Badge>
                    <Badge variant="secondary">🎨 UI/UX Design</Badge>
                    <Badge variant="secondary">⚡ Performance Optimization</Badge>
                    <Badge variant="secondary">🌐 API Integration</Badge>
                    <Badge variant="secondary">♿ Web Accessibility</Badge>
                    <Badge variant="secondary">🚀 Building Side Projects</Badge>
                    <Badge variant="secondary">📖 Reading Tech Blogs</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Core Values</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { emoji: "💡", title: "Clean Code", desc: "Readable, reusable, maintainable" },
                      { emoji: "🤝", title: "Collaboration", desc: "Agile delivery & code reviews" },
                      { emoji: "📈", title: "Growth", desc: "Continuous learning & teaching" },
                      { emoji: "⚡", title: "Performance", desc: "SEO, speed & cross-browser compat" },
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg text-xs text-center leading-tight px-1">
                      {item.year.slice(0, 4)}
                    </div>
                  </div>
                  <Card className="flex-1 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-sm text-purple-500 font-semibold mb-2">{item.year}</div>
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
