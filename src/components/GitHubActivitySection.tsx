import { ScrollReveal } from "./ScrollAnimations";
import { motion } from "framer-motion";
import { GitBranch, GitCommit, GitPullRequest, Star, Activity, BarChart3 } from "lucide-react";

const githubStats = [
  { label: "Repositories", value: "10+", icon: GitBranch },
  { label: "Contributions", value: "120+", icon: GitCommit },
  { label: "Stars Earned", value: "15", icon: Star },
  { label: "Pull Requests", value: "25+", icon: GitPullRequest },
];

const recentRepos = [
  { name: "ShodhaniAI", language: "Python", stars: 5, description: "AI-powered semantic search platform" },
  { name: "ArivuCode", language: "JavaScript", stars: 3, description: "Interactive programming learning platform" },
  { name: "eRaksha-Sentinel", language: "Python", stars: 4, description: "Smart safety monitoring system" },
  { name: "ML-Experiments", language: "Jupyter", stars: 2, description: "Machine learning experiment notebooks" },
  { name: "Portfolio-Website", language: "TypeScript", stars: 1, description: "This portfolio website" },
];

const languageColors: Record<string, string> = {
  Python: "bg-[hsl(210,60%,50%)]",
  JavaScript: "bg-[hsl(50,90%,50%)]",
  TypeScript: "bg-[hsl(210,80%,55%)]",
  Jupyter: "bg-[hsl(25,80%,55%)]",
};

// Generate mock contribution graph
const generateContributions = () => {
  const weeks = 20;
  const days = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      week.push(Math.random() > 0.4 ? Math.floor(Math.random() * 4) : 0);
    }
    data.push(week);
  }
  return data;
};

const contributions = generateContributions();
const intensityClasses = [
  "bg-muted/50",
  "bg-primary/20",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
];

const GitHubActivitySection = () => {
  return (
    <section id="github" className="section-padding relative">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// OPEN SOURCE"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              GitHub <span className="gradient-text">Activity</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {githubStats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.08 * i}>
              <div className="glass-card hover-glow flex items-center gap-3 rounded-xl border p-4 transition-all">
                <stat.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-display text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contribution graph */}
          <ScrollReveal direction="left">
            <div className="glass-card rounded-xl border p-5">
              <div className="mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <h3 className="font-display text-sm font-bold">Contribution Graph</h3>
              </div>
              <div className="flex gap-[3px] overflow-x-auto pb-2">
                {contributions.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <motion.div
                        key={di}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (wi * 7 + di) * 0.003, duration: 0.2 }}
                        className={`h-3 w-3 rounded-sm ${intensityClasses[level]} transition-colors`}
                        title={`${level} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
                <span>Less</span>
                {intensityClasses.map((cls, i) => (
                  <div key={i} className={`h-2.5 w-2.5 rounded-sm ${cls}`} />
                ))}
                <span>More</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Recent repos */}
          <ScrollReveal direction="right">
            <div className="glass-card rounded-xl border p-5">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h3 className="font-display text-sm font-bold">Recent Repositories</h3>
              </div>
              <div className="space-y-3">
                {recentRepos.map((repo) => (
                  <motion.a
                    key={repo.name}
                    href="https://github.com/veeresh0804"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between rounded-lg bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold">{repo.name}</p>
                        <p className="text-xs text-muted-foreground">{repo.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className={`h-2.5 w-2.5 rounded-full ${languageColors[repo.language] || "bg-muted-foreground"}`} />
                        <span className="text-xs text-muted-foreground">{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{repo.stars}</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivitySection;
