import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollAnimations";
import { Brain, GitBranch, TrendingDown } from "lucide-react";

// ─── Neural Network Visualizer ───
const NeuralNetViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [layers, setLayers] = useState([4, 6, 6, 3]);
  const [isAnimating, setIsAnimating] = useState(false);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;

    const nodeRadius = 12;
    const layerSpacing = cw / (layers.length + 1);
    const nodePositions: { x: number; y: number }[][] = [];

    layers.forEach((count, li) => {
      const x = layerSpacing * (li + 1);
      const spacing = ch / (count + 1);
      const layerNodes: { x: number; y: number }[] = [];
      for (let ni = 0; ni < count; ni++) {
        layerNodes.push({ x, y: spacing * (ni + 1) });
      }
      nodePositions.push(layerNodes);
    });

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      frame++;

      // Draw connections
      for (let li = 0; li < nodePositions.length - 1; li++) {
        for (const from of nodePositions[li]) {
          for (const to of nodePositions[li + 1]) {
            const pulse = isAnimating ? Math.sin(frame * 0.05 + from.x * 0.01 + to.y * 0.01) * 0.5 + 0.5 : 0.2;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.strokeStyle = `hsla(183, 100%, 50%, ${pulse * 0.4})`;
            ctx.lineWidth = pulse * 1.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodePositions.forEach((layer, li) => {
        layer.forEach((node, ni) => {
          const pulse = isAnimating ? Math.sin(frame * 0.08 + li * 2 + ni) * 0.5 + 0.5 : 0.4;
          
          // Glow
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeRadius * 2);
          gradient.addColorStop(0, `hsla(183, 100%, 50%, ${pulse * 0.3})`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fillRect(node.x - nodeRadius * 2, node.y - nodeRadius * 2, nodeRadius * 4, nodeRadius * 4);

          // Node
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = li === 0 ? `hsla(183, 100%, 50%, ${0.5 + pulse * 0.5})`
            : li === layers.length - 1 ? `hsla(156, 100%, 50%, ${0.5 + pulse * 0.5})`
            : `hsla(263, 84%, 52%, ${0.4 + pulse * 0.4})`;
          ctx.fill();
          ctx.strokeStyle = `hsla(183, 100%, 50%, ${0.3 + pulse * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Labels
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "hsla(220, 20%, 60%, 0.8)";
      const labels = ["Input", ...layers.slice(1, -1).map((_, i) => `Hidden ${i + 1}`), "Output"];
      nodePositions.forEach((layer, li) => {
        ctx.fillText(labels[li], layer[0].x, ch - 10);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [layers, isAnimating]);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="h-64 w-full rounded-lg" />
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="rounded-lg bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)]"
        >
          {isAnimating ? "⏸ PAUSE" : "▶ FORWARD PASS"}
        </button>
        <div className="flex gap-2">
          {layers.map((count, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <input
                type="range" min={1} max={8} value={count}
                onChange={e => {
                  const newLayers = [...layers];
                  newLayers[i] = parseInt(e.target.value);
                  setLayers(newLayers);
                }}
                className="h-1 w-16 accent-primary"
              />
              <span className="font-mono text-[9px] text-muted-foreground">L{i + 1}: {count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Decision Tree Visualization ───
type TreeNode = { label: string; yes?: TreeNode; no?: TreeNode; result?: string } | { result: string; label?: string; yes?: undefined; no?: undefined };

const treeData: TreeNode = {
  label: "Temperature > 25°C?",
  yes: {
    label: "Humidity > 60%?",
    yes: { label: "Rainfall > 200mm?", yes: { result: "🌾 Rice" }, no: { result: "🌽 Maize" } },
    no: { result: "🌻 Sunflower" },
  },
  no: {
    label: "Soil pH > 6.5?",
    yes: { result: "🌿 Wheat" },
    no: { result: "🥔 Potato" },
  },
};

const DecisionTreeViz = () => {
  const [activePath, setActivePath] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);

  const traverse = (node: TreeNode, path: string[]) => {
    if (node.result) {
      setActivePath(path);
      setPrediction(node.result);
      return;
    }
    // Simulate random traversal for demo
    const goYes = Math.random() > 0.5;
    const next = goYes ? node.yes! : node.no!;
    const newPath = [...path, goYes ? "yes" : "no"];
    setTimeout(() => traverse(next, newPath), 600);
    setActivePath(path);
  };

  const renderNode = (node: TreeNode, depth: number, pathSoFar: string[]) => {
    const isActive = activePath.length >= pathSoFar.length &&
      pathSoFar.every((p, i) => activePath[i] === p);

    return (
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ scale: isActive ? 1.05 : 1, borderColor: isActive ? "hsl(183, 100%, 50%)" : "hsl(230, 30%, 15%)" }}
          className={`glass-card rounded-lg border px-3 py-2 text-center font-mono text-[11px] transition-all ${
            node.result ? "border-accent/50 text-accent font-bold" : "text-foreground"
          }`}
        >
          {node.result || node.label}
        </motion.div>
        {!node.result && (
          <div className="mt-2 flex gap-6">
            <div className="flex flex-col items-center">
              <span className="mb-1 font-mono text-[9px] text-accent">YES</span>
              <div className={`h-4 w-px ${isActive && activePath[pathSoFar.length] === "yes" ? "bg-primary" : "bg-border"}`} />
              {renderNode(node.yes!, depth + 1, [...pathSoFar, "yes"])}
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1 font-mono text-[9px] text-destructive">NO</span>
              <div className={`h-4 w-px ${isActive && activePath[pathSoFar.length] === "no" ? "bg-primary" : "bg-border"}`} />
              {renderNode(node.no!, depth + 1, [...pathSoFar, "no"])}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto py-4">
        <div className="min-w-[400px] flex justify-center">
          {renderNode(treeData, 0, [])}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setPrediction(null); setActivePath([]); setTimeout(() => traverse(treeData, []), 200); }}
          className="rounded-lg bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)]"
        >
          ▶ SIMULATE PREDICTION
        </button>
        {prediction && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-sm text-accent"
          >
            Predicted: {prediction}
          </motion.span>
        )}
      </div>
    </div>
  );
};

// ─── Gradient Descent Simulator ───
const GradientDescentViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(1.0);
  const lossHistory = useRef<number[]>([1.0]);
  const posRef = useRef(4); // starting position on loss curve

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const lr = 0.03;
      const x = posRef.current;
      // Gradient of x^2: 2x
      const grad = 2 * x;
      posRef.current = x - lr * grad + (Math.random() - 0.5) * 0.1;
      const newLoss = posRef.current * posRef.current * 0.06 + 0.02;
      setLoss(newLoss);
      lossHistory.current.push(newLoss);
      setEpoch(e => e + 1);

      if (Math.abs(posRef.current) < 0.1) {
        setIsRunning(false);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;

    ctx.clearRect(0, 0, cw, ch);

    // Draw loss curve (parabola)
    ctx.beginPath();
    ctx.strokeStyle = "hsla(263, 84%, 52%, 0.5)";
    ctx.lineWidth = 2;
    for (let px = 0; px < cw; px++) {
      const x = (px / cw - 0.5) * 10;
      const y = x * x * 0.06 + 0.02;
      const sy = ch - (y / 1.5) * ch;
      px === 0 ? ctx.moveTo(px, sy) : ctx.lineTo(px, sy);
    }
    ctx.stroke();

    // Draw optimization path
    const history = lossHistory.current;
    if (history.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "hsla(183, 100%, 50%, 0.8)";
      ctx.lineWidth = 1.5;
      const step = Math.max(1, Math.floor(history.length / cw));
      for (let i = 0; i < history.length; i += step) {
        const px = (i / Math.max(history.length - 1, 1)) * cw;
        const sy = ch - (history[i] / 1.5) * ch;
        i === 0 ? ctx.moveTo(px, sy) : ctx.lineTo(px, sy);
      }
      ctx.stroke();
    }

    // Draw current position
    const currentX = (posRef.current / 10 + 0.5) * cw;
    const currentY = ch - (loss / 1.5) * ch;
    ctx.beginPath();
    ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(183, 100%, 50%)";
    ctx.fill();
    const glow = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 15);
    glow.addColorStop(0, "hsla(183, 100%, 50%, 0.4)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(currentX - 15, currentY - 15, 30, 30);

  }, [loss, epoch]);

  const reset = () => {
    posRef.current = 3 + Math.random() * 2;
    lossHistory.current = [posRef.current * posRef.current * 0.06 + 0.02];
    setLoss(lossHistory.current[0]);
    setEpoch(0);
    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="h-48 w-full rounded-lg" />
      <div className="flex items-center gap-4">
        <button
          onClick={() => isRunning ? setIsRunning(false) : setIsRunning(true)}
          className="rounded-lg bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)]"
        >
          {isRunning ? "⏸ PAUSE" : "▶ TRAIN"}
        </button>
        <button onClick={reset} className="rounded-lg border border-border px-4 py-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
          ↺ RESET
        </button>
        <div className="flex gap-4 font-mono text-[11px] text-muted-foreground">
          <span>Epoch: <span className="text-primary">{epoch}</span></span>
          <span>Loss: <span className="text-accent">{loss.toFixed(4)}</span></span>
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ───
const visualizations = [
  { id: "neural", title: "Neural Network", icon: Brain, component: NeuralNetViz },
  { id: "tree", title: "Decision Tree", icon: GitBranch, component: DecisionTreeViz },
  { id: "gradient", title: "Gradient Descent", icon: TrendingDown, component: GradientDescentViz },
];

const MLVisualizationsSection = () => {
  const [activeViz, setActiveViz] = useState("neural");
  const ActiveComponent = visualizations.find(v => v.id === activeViz)!.component;

  return (
    <section id="ml-viz" className="section-padding relative">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// ML VISUALIZATIONS"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Interactive <span className="gradient-text">Model Demos</span>
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-sm text-muted-foreground">
              Explore machine learning concepts through live, interactive visualizations
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl">
          {/* Tabs */}
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {visualizations.map(viz => (
              <motion.button
                key={viz.id}
                onClick={() => setActiveViz(viz.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-display text-xs font-semibold tracking-wider transition-all ${
                  activeViz === viz.id
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)]"
                    : "glass-card border text-muted-foreground hover:text-primary"
                }`}
              >
                <viz.icon className="h-3.5 w-3.5" />
                {viz.title.toUpperCase()}
              </motion.button>
            ))}
          </div>

          {/* Viz */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeViz}
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

export default MLVisualizationsSection;
