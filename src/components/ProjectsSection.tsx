import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { projectsData } from "@/data/portfolio";
import { ScrollReveal } from "./ScrollAnimations";
import ProjectModal from "./ProjectModal";
import projectShodhani from "@/assets/project-shodhani.jpg";
import projectArivucode from "@/assets/project-arivucode.jpg";
import projectEraksha from "@/assets/project-eraksha.jpg";

const projectImages: Record<string, string> = {
  "ShodhaniAI": projectShodhani,
  "ArivuCode": projectArivucode,
  "eRaksha Sentinel": projectEraksha,
};

const categories = ["All", "AI", "Machine Learning", "Web", "Systems"];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  const filtered = filter === "All" ? projectsData : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// MY WORK"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 font-display text-xs font-semibold tracking-wider transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)]"
                    : "glass-card border text-muted-foreground hover:text-primary"
                }`}
              >
                {cat === "All" && <Filter className="h-3 w-3" />}
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.id} delay={0.1 * i} direction={i % 2 === 0 ? "up" : "left"}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
                className="glass-card hover-glow group cursor-pointer overflow-hidden rounded-xl border transition-all h-full"
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={projectImages[project.title] || ""}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="mb-2 font-display text-lg font-bold">{project.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
                      <Github className="h-4 w-4" /> Code
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent">
                      <ExternalLink className="h-4 w-4" /> Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          image={selectedProject ? projectImages[selectedProject.title] : undefined}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
