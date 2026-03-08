import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const initialMessages: Message[] = [
  { role: "assistant", content: "Hello! I'm the AI assistant for this portfolio. Ask me about the developer's projects, skills, or experience!" },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated response
    setTimeout(() => {
      const responses: Record<string, string> = {
        projects: "This developer has built 6+ projects including AI Sales Assistant, Crop Yield Prediction ML, NLP Topic Modeling, and more. Check the Projects section for details!",
        skills: "Key skills include Python, TensorFlow, PyTorch, React, FastAPI, and more. The developer excels in AI/ML, web development, and systems design.",
        experience: "Started BTech in AI/ML in 2023, built production ML models in 2024, conducted NLP research in 2025, and is currently focused on AI application development.",
      };
      const key = Object.keys(responses).find((k) =>
        input.toLowerCase().includes(k)
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: key
            ? responses[key]
            : "I can tell you about the developer's projects, skills, or experience. What would you like to know?",
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(183_100%_50%_/_0.4)] transition-transform hover:scale-110"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-xl border"
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-display text-sm font-bold">AI Assistant</span>
              <span className="ml-auto h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <button
                  onClick={handleSend}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
