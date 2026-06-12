import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";

const experiences = [
  {
    company: "Zabeel International Institute",
    logo: "ZI",
    role: "Full Stack Web Trainer",
    duration: "Sep 2025 – Present",
    location: "Dubai, UAE",
    type: "Full-time",
    achievements: [
      "Delivering comprehensive training in HTML, CSS, JavaScript, Next.js, React.js, Node.js, Python, Django, and Express.js.",
      "Guiding students through real-world project development, from UI design to backend integration.",
      "Created structured lesson plans covering REST APIs, database management, and cloud deployment.",
      "Mentoring students on debugging, code optimization, and industry-standard best practices.",
    ],
    tech: ["React.js", "Next.js", "Node.js", "Express.js", "Python", "Django", "JavaScript", "HTML5", "CSS3"],
  },
  {
    company: "Prolance Services",
    logo: "PS",
    role: "Front-End Developer",
    duration: "Jun 2022 – Sep 2023",
    location: "India",
    type: "Full-time",
    achievements: [
      "Developed and maintained responsive web interfaces using React.js, TypeScript, Material UI, and Mantine UI.",
      "Created reusable and modular components, reducing frontend redundancy.",
      "Integrated REST APIs via React Query and Redux Toolkit to deliver real-time dynamic dashboards.",
      "Enhanced app navigation and forms for smoother user flow, cutting bounce rate.",
      "Contributed to the development of WordPress websites, increasing site speed.",
      "Played a key role in WordPress security, enhancing site protection and reducing vulnerabilities.",
      "Conducted A/B tests on sites, improving conversion rates.",
      "Partnered with backend engineers to ensure consistent API contracts and error-free integrations.",
      "Contributed to CI/CD pipelines using Git and Bitbucket; participated in Agile sprints and managed tasks in Jira / Trello.",
    ],
    tech: ["React.js", "TypeScript", "Material UI", "Mantine UI", "Redux Toolkit", "React Query", "WordPress", "Git", "Bitbucket"],
  },
  {
    company: "ReformX Technologies",
    logo: "RX",
    role: "Front-End Developer",
    duration: "Jan 2022 – May 2022",
    location: "India",
    type: "Full-time",
    achievements: [
      "Developed internal tools and dashboards using React.js and Firebase to streamline company workflows.",
      "Built reusable UI components and web applications using modern, component-based frontend patterns.",
      "Mentored junior developers on component architecture and frontend–backend integration.",
    ],
    tech: ["React.js", "Firebase", "JavaScript", "HTML5", "CSS3"],
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
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h1>
          <p className="text-muted-foreground text-lg">
            My professional journey and achievements
          </p>
        </div>

        <div className="relative">
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
                <div className="absolute left-4 top-8 w-8 h-8 -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-background shadow-lg flex items-center justify-center">
                  <Briefcase size={14} className="text-white" />
                </div>

                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex items-start gap-4">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { label: "Years Experience", value: "3+", icon: "⏱️" },
            { label: "Projects Delivered", value: "20+", icon: "🚀" },
            { label: "Companies Worked", value: "3", icon: "🏢" },
            { label: "Students Mentored", value: "50+", icon: "👩‍🏫" },
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
