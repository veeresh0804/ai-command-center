import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollAnimations";
import { Sprout, FileText, Play, BarChart3, Loader2 } from "lucide-react";

// ─── Crop Yield Predictor Demo ───
const CropPredictor = () => {
  const [inputs, setInputs] = useState({ soil: "Loamy", rainfall: 150, temperature: 28, humidity: 65 });
  const [prediction, setPrediction] = useState<null | { crop: string; yield: number; confidence: number }>(null);
  const [loading, setLoading] = useState(false);

  const soilTypes = ["Sandy", "Loamy", "Clay", "Silt", "Peaty"];

  const predict = () => {
    setLoading(true);
    setPrediction(null);
    // Simulate ML prediction
    setTimeout(() => {
      const crops = [
        { crop: "🌾 Rice", minTemp: 25, maxTemp: 35, minRain: 100, soil: "Loamy" },
        { crop: "🌿 Wheat", minTemp: 15, maxTemp: 25, minRain: 50, soil: "Clay" },
        { crop: "🌽 Maize", minTemp: 20, maxTemp: 30, minRain: 80, soil: "Sandy" },
        { crop: "🥔 Potato", minTemp: 10, maxTemp: 22, minRain: 60, soil: "Silt" },
        { crop: "🌻 Sunflower", minTemp: 20, maxTemp: 30, minRain: 40, soil: "Loamy" },
      ];

      let bestCrop = crops[0];
      let bestScore = 0;
      crops.forEach(c => {
        let score = 0;
        if (inputs.temperature >= c.minTemp && inputs.temperature <= c.maxTemp) score += 40;
        else score += Math.max(0, 40 - Math.abs(inputs.temperature - (c.minTemp + c.maxTemp) / 2) * 3);
        if (inputs.rainfall >= c.minRain) score += 30;
        if (inputs.soil === c.soil) score += 20;
        score += inputs.humidity > 50 ? 10 : 5;
        if (score > bestScore) { bestScore = score; bestCrop = c; }
      });

      setPrediction({
        crop: bestCrop.crop,
        yield: Math.round(2000 + bestScore * 30 + Math.random() * 500),
        confidence: Math.min(98, Math.round(bestScore + Math.random() * 5)),
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Input Panel */}
      <div className="space-y-4">
        <h4 className="font-mono text-xs tracking-wider text-primary">INPUT PARAMETERS</h4>
        <div>
          <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Soil Type</label>
          <select
            value={inputs.soil}
            onChange={e => setInputs({ ...inputs, soil: e.target.value })}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none"
          >
            {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {[
          { key: "rainfall", label: "Rainfall (mm)", min: 0, max: 400 },
          { key: "temperature", label: "Temperature (°C)", min: 5, max: 45 },
          { key: "humidity", label: "Humidity (%)", min: 10, max: 100 },
        ].map(field => (
          <div key={field.key}>
            <div className="flex justify-between mb-1">
              <label className="font-mono text-[11px] text-muted-foreground">{field.label}</label>
              <span className="font-mono text-[11px] text-primary">{inputs[field.key as keyof typeof inputs]}</span>
            </div>
            <input
              type="range"
              min={field.min}
              max={field.max}
              value={inputs[field.key as keyof typeof inputs] as number}
              onChange={e => setInputs({ ...inputs, [field.key]: parseInt(e.target.value) })}
              className="w-full accent-primary"
            />
          </div>
        ))}
        <button
          onClick={predict}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)] disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
          {loading ? "PREDICTING..." : "RUN PREDICTION"}
        </button>
      </div>

      {/* Output Panel */}
      <div className="glass-card flex flex-col items-center justify-center rounded-xl border p-6">
        <AnimatePresence mode="wait">
          {prediction ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full space-y-4 text-center"
            >
              <div className="text-5xl">{prediction.crop.split(" ")[0]}</div>
              <h4 className="font-display text-lg font-bold">{prediction.crop.split(" ").slice(1).join(" ")}</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="font-mono text-[10px] text-muted-foreground">PREDICTED YIELD</div>
                  <div className="font-display text-xl font-bold text-primary">{prediction.yield} kg/ha</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="font-mono text-[10px] text-muted-foreground">CONFIDENCE</div>
                  <div className="font-display text-xl font-bold text-accent">{prediction.confidence}%</div>
                </div>
              </div>
              {/* Mini bar chart */}
              <div className="mt-2">
                <div className="font-mono text-[10px] text-muted-foreground mb-2">MODEL CONFIDENCE</div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.confidence}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))" }}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="placeholder" className="text-center text-muted-foreground">
              <BarChart3 className="mx-auto mb-3 h-10 w-10 opacity-30" />
              <p className="font-mono text-xs">Adjust parameters and run prediction</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── NLP Topic Modeling Demo ───
const NLPDemo = () => {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<null | {
    topics: { name: string; weight: number; color: string }[];
    sentiment: string;
    entities: string[];
    wordCount: number;
  }>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!text.trim()) return;
    setLoading(true);
    setAnalysis(null);

    setTimeout(() => {
      const lower = text.toLowerCase();
      const topics: { name: string; weight: number; color: string }[] = [];

      const topicMap: [string, string[], string][] = [
        ["Technology", ["ai", "machine", "learning", "code", "software", "data", "algorithm", "computer", "neural", "model"], "#00F5FF"],
        ["Science", ["research", "experiment", "theory", "analysis", "hypothesis", "study", "science"], "#7C3AED"],
        ["Business", ["market", "growth", "revenue", "company", "strategy", "invest", "profit"], "#00FF9C"],
        ["Education", ["learn", "teach", "student", "university", "course", "knowledge", "study"], "#FF6B6B"],
      ];

      topicMap.forEach(([name, keywords, color]) => {
        const matches = keywords.filter(k => lower.includes(k)).length;
        if (matches > 0) topics.push({ name, weight: Math.min(95, matches * 25 + Math.random() * 15), color });
      });

      if (topics.length === 0) topics.push({ name: "General", weight: 60 + Math.random() * 20, color: "#00F5FF" });

      const positiveWords = ["good", "great", "excellent", "amazing", "love", "best", "improve", "success"];
      const negativeWords = ["bad", "poor", "worst", "fail", "problem", "issue", "error"];
      const posCount = positiveWords.filter(w => lower.includes(w)).length;
      const negCount = negativeWords.filter(w => lower.includes(w)).length;
      const sentiment = posCount > negCount ? "Positive 😊" : negCount > posCount ? "Negative 😟" : "Neutral 😐";

      const words = text.split(/\s+/).filter(w => w.length > 4);
      const entities = [...new Set(words.filter(w => w[0] === w[0].toUpperCase()))].slice(0, 5);

      setAnalysis({ topics, sentiment, entities, wordCount: text.split(/\s+/).length });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste any text to analyze topics, sentiment, and entities..."
        className="min-h-[100px] w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none resize-none"
      />
      <button
        onClick={analyze}
        disabled={loading || !text.trim()}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)] disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileText className="h-3.5 w-3.5" />}
        {loading ? "ANALYZING..." : "ANALYZE TEXT"}
      </button>

      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {/* Topics */}
            <div className="glass-card rounded-xl border p-4">
              <h5 className="mb-3 font-mono text-[10px] tracking-wider text-primary">DETECTED TOPICS</h5>
              <div className="space-y-2">
                {analysis.topics.map(topic => (
                  <div key={topic.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-xs" style={{ color: topic.color }}>{topic.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{Math.round(topic.weight)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.weight}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: topic.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="glass-card rounded-xl border p-4 space-y-3">
              <div>
                <h5 className="mb-1 font-mono text-[10px] tracking-wider text-primary">SENTIMENT</h5>
                <p className="font-display text-lg font-bold">{analysis.sentiment}</p>
              </div>
              <div>
                <h5 className="mb-1 font-mono text-[10px] tracking-wider text-primary">WORD COUNT</h5>
                <p className="font-mono text-sm text-accent">{analysis.wordCount}</p>
              </div>
              {analysis.entities.length > 0 && (
                <div>
                  <h5 className="mb-1 font-mono text-[10px] tracking-wider text-primary">ENTITIES</h5>
                  <div className="flex flex-wrap gap-1">
                    {analysis.entities.map(e => (
                      <span key={e} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{e}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Section ───
const demos = [
  { id: "crop", title: "Crop Yield Predictor", icon: Sprout, component: CropPredictor },
  { id: "nlp", title: "NLP Topic Analyzer", icon: FileText, component: NLPDemo },
];

const ProjectPlayground = () => {
  const [activeDemo, setActiveDemo] = useState("crop");
  const ActiveComponent = demos.find(d => d.id === activeDemo)!.component;

  return (
    <section id="playground" className="section-padding relative">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// AI PLAYGROUND"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Interactive <span className="gradient-text">Project Demos</span>
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-sm text-muted-foreground">
              Try my AI models directly in the browser — no setup required
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {demos.map(demo => (
              <motion.button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-display text-xs font-semibold tracking-wider transition-all ${
                  activeDemo === demo.id
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)]"
                    : "glass-card border text-muted-foreground hover:text-primary"
                }`}
              >
                <demo.icon className="h-3.5 w-3.5" />
                {demo.title.toUpperCase()}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl border p-6"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectPlayground;
