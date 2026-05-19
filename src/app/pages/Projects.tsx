import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ExternalLink, Github, Star, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "SaaS Dashboard Platform",
    description: "A comprehensive analytics dashboard for SaaS businesses with real-time data visualization and reporting.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3AlMjBjb2RlfGVufDF8fHx8MTc3OTE5MzYwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Recharts"],
    stars: 245,
    views: "12.5k",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Marketplace",
    description: "Full-featured online marketplace with payment integration, inventory management, and seller dashboard.",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMHdlYnNpdGUlMjBtb2JpbGV8ZW58MXx8fHwxNzc5MTkzNjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tech: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    stars: 189,
    views: "8.2k",
    featured: true,
  },
  {
    id: 3,
    title: "Fitness Tracking App",
    description: "Mobile-first fitness application with workout plans, progress tracking, and social features.",
    image: "https://images.unsplash.com/photo-1580983693000-5654250f64d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXBwJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3OTA4NzI0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tech: ["React Native", "Firebase", "Redux", "Chart.js"],
    stars: 156,
    views: "6.8k",
    featured: false,
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description: "Unified dashboard for managing multiple social media accounts with analytics and scheduling.",
    image: "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NzkxOTM2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tech: ["Vue.js", "Express", "Redis", "Bull"],
    stars: 203,
    views: "9.1k",
    featured: true,
  },
  {
    id: 5,
    title: "Weather Forecast App",
    description: "Beautiful weather application with hourly forecasts, weather maps, and location-based alerts.",
    image: "https://images.unsplash.com/photo-1705077296278-d82dd5c8662f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwYXBwbGljYXRpb24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc5MTkzNjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tech: ["React", "OpenWeather API", "Mapbox", "Tailwind"],
    stars: 178,
    views: "7.5k",
    featured: false,
  },
  {
    id: 6,
    title: "Task Management System",
    description: "Collaborative project management tool with kanban boards, time tracking, and team collaboration.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudCUyMHByb2R1Y3Rpdml0eSUyMGFwcHxlbnwxfHx8fDE3NzkxOTM2MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tech: ["React", "DND Kit", "Supabase", "Zustand"],
    stars: 312,
    views: "15.2k",
    featured: true,
  },
];

const filters = ["All", "Featured", "React", "TypeScript", "Mobile"];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Featured") return project.featured;
    return project.tech.some((tech) => tech.toLowerCase().includes(selectedFilter.toLowerCase()));
  });

  return (
    <div className="container mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-muted-foreground text-lg">
            A showcase of my recent work and contributions
          </p>
        </div>

        {/* Filters */}
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

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  {/* Project Image */}
                  <div className="relative overflow-hidden h-48 bg-muted">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredProject === project.id ? 1.1 : 1,
                      }}
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

                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-4 gap-2"
                    >
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Eye size={14} />
                        View Demo
                      </Button>
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Github size={14} />
                        Code
                      </Button>
                    </motion.div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500" />
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        {project.views}
                      </div>
                      <Button size="sm" variant="ghost" className="gap-1 h-auto p-0 hover:text-purple-500">
                        <ExternalLink size={14} />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
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
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 gap-2">
                <Github size={18} />
                Visit GitHub Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
