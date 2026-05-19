import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";

const experiences = [
  {
    company: "Tech Innovators Inc.",
    logo: "TI",
    role: "Senior Full Stack Developer",
    duration: "2024 - Present",
    location: "San Francisco, CA",
    type: "Full-time",
    achievements: [
      "Led a team of 5 developers in building a SaaS platform serving 10k+ users",
      "Reduced API response time by 60% through optimization and caching strategies",
      "Implemented CI/CD pipeline reducing deployment time from hours to minutes",
      "Mentored junior developers and conducted code reviews",
    ],
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
  },
  {
    company: "Code Academy Pro",
    logo: "CA",
    role: "IT Trainer & Curriculum Developer",
    duration: "2022 - 2024",
    location: "Remote",
    type: "Contract",
    achievements: [
      "Trained 200+ students in modern web development technologies",
      "Developed comprehensive curriculum for full stack bootcamp",
      "Achieved 95% student satisfaction rating",
      "Created 50+ tutorial videos with 100k+ views",
    ],
    tech: ["JavaScript", "React", "Express", "MongoDB", "Git"],
  },
  {
    company: "Digital Solutions Ltd.",
    logo: "DS",
    role: "Full Stack Developer",
    duration: "2020 - 2022",
    location: "New York, NY",
    type: "Full-time",
    achievements: [
      "Built and maintained 15+ client projects from concept to deployment",
      "Integrated third-party APIs including Stripe, SendGrid, and Twilio",
      "Improved application performance by 40% through code optimization",
      "Collaborated with design team to create pixel-perfect implementations",
    ],
    tech: ["Vue.js", "Python", "Django", "MySQL", "Redis"],
  },
  {
    company: "StartUp Ventures",
    logo: "SV",
    role: "Junior Developer",
    duration: "2018 - 2020",
    location: "Austin, TX",
    type: "Full-time",
    achievements: [
      "Developed responsive web applications using modern frameworks",
      "Participated in agile development process and daily standups",
      "Fixed 100+ bugs and implemented new features based on user feedback",
      "Learned best practices for clean code and software architecture",
    ],
    tech: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  },
];

export default function Experience() {
  return (
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h1>
          <p className="text-muted-foreground text-lg">
            My professional journey and achievements
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-8 w-8 h-8 -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-background shadow-lg flex items-center justify-center">
                  <Briefcase size={14} className="text-white" />
                </div>

                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex items-start gap-4">
                        {/* Company Logo */}
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {exp.logo}
                        </div>

                        <div>
                          <CardTitle className="text-2xl mb-2">{exp.role}</CardTitle>
                          <div className="text-lg font-semibold text-purple-500 mb-2">
                            {exp.company}
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {exp.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              {exp.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">
                        {exp.type}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Achievements */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
                        <Award size={16} className="text-yellow-500" />
                        Key Achievements
                      </div>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <div className="text-sm font-semibold mb-2">Technologies Used</div>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge variant="outline" className="hover:bg-purple-500/10">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { label: "Years Experience", value: "6+", icon: "⏱️" },
            { label: "Projects Completed", value: "50+", icon: "🚀" },
            { label: "Students Trained", value: "200+", icon: "👨‍🎓" },
            { label: "Team Members Led", value: "15+", icon: "👥" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
