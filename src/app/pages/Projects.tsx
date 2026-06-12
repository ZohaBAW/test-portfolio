import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ExternalLink, Github, Star, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Off-Road Adda",
    description: "Production client platform with a React.js frontend and Strapi CMS, using a decoupled, API-driven architecture. Integrated WhatsApp Business API for instant customer communication, improving enquiry response time. Built SEO-optimized, mobile-responsive layouts with TailwindCSS; deployed on Firebase Hosting and Strapi Cloud.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmYlMjByb2FkJTIwdmVoaWNsZXxlbnwxfHx8fDE3NzkxOTM2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tech: ["React.js", "Strapi CMS", "TailwindCSS", "WhatsApp API", "Firebase Hosting", "Strapi Cloud"],
    featured: true,
    liveUrl: "#",
  },
  {
    id: 2,
    title: "NasViewDeveloper",
    description: "Single-page luxury real estate site built in React 19, Vite, and Tailwind CSS with Framer Motion animations — cinematic hero, scroll-reveal sections, and glassmorphism project cards. Backend-free lead-generation flow that auto-generates a pre-filled WhatsApp message from the contact form, with click-to-call and email actions. Fully responsive, SEO-optimized, and deployed on Replit.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDF8fHx8MTc3OTA4NzI0MnwA&ixlib=rb-4.1.0&q=80&w=1080",
    tech: ["React 19", "Vite", "TailwindCSS", "Framer Motion", "WhatsApp API", "Replit"],
    featured: true,
    liveUrl: "#",
  },
];

const filters = ["All", "Featured", "React", "TailwindCSS", "WhatsApp API"];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Featured") return project.featured;
    return project.tech.some((tech) => tech.toLowerCase().includes(selectedFilter.toLowerCase()));
  });

  return (
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-muted-foreground text-lg">
            A showcase of my recent work and contributions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter)}
              className={
                selectedFilter === filter
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : ""
              }
            >
              {filter}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Card className="overflow-hidden h-full hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative overflow-hidden h-56 bg-muted">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredProject === project.id ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {project.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                          <Star size={12} className="mr-1" fill="white" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-4 gap-2"
                    >
                      <Button size="sm" variant="secondary" className="gap-2" asChild>
                        <a href="https://offroadadda.com" target="_blank" rel="noreferrer">
                          <Eye size={14} />
                          View Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" className="gap-2" asChild>
                        <a href="https://github.com/zuhaBAW/off-road" target="_blank" rel="noreferrer">
                          <Github size={14} /> 
                          Code
                        </a>
                      </Button>
                    </motion.div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-end text-sm text-muted-foreground pt-4 border-t border-border">
                      <Button size="sm" variant="ghost" className="gap-1 h-auto p-0 hover:text-purple-500">
                        <ExternalLink size={14} />
                        View Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="inline-block">
            <CardContent className="p-8">
              <Github className="mx-auto mb-4 text-purple-500" size={48} />
              <h3 className="text-2xl font-bold mb-2">More on GitHub</h3>
              <p className="text-muted-foreground mb-4">
                Check out my other projects and open source contributions
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 gap-2" asChild>
                <a href="https://linkedin.com/in/zuhabaw" target="_blank" rel="noreferrer">
                  <Github size={18} />
                  Visit My Profile
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
