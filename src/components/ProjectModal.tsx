import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github: string;
  demo: string;
  image: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  image?: string;
}

const ProjectModal = forwardRef<HTMLDivElement, ProjectModalProps>(({ project, onClose, image }, ref) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card neon-border relative w-full max-w-2xl overflow-hidden rounded-2xl border"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-foreground transition-colors hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image */}
            {image && (
              <div className="h-48 w-full overflow-hidden md:h-56">
                <img src={image} alt={project.title} className="h-full w-full object-cover" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              <span className="mb-2 inline-block rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                {project.category}
              </span>
              <h2 className="mb-3 font-display text-2xl font-bold">{project.title}</h2>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="mb-2 font-display text-xs font-semibold tracking-wider text-muted-foreground">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-lg bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card hover-glow flex items-center gap-2 rounded-lg border px-5 py-2.5 font-display text-xs font-semibold tracking-wider text-foreground transition-all"
                >
                  <Github className="h-4 w-4" /> VIEW CODE
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-display text-xs font-semibold tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(183_100%_50%_/_0.3)]"
                >
                  <ExternalLink className="h-4 w-4" /> LIVE DEMO
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
