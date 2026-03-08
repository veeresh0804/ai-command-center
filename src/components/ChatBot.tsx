import { useState, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const initialMessages: Message[] = [
  { role: "assistant", content: "Hello! I'm Veeresh's AI assistant. Ask me about his projects, skills, or experience!" },
];

const ChatBot = forwardRef<HTMLDivElement>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const lower = input.toLowerCase();
      let response = "I can tell you about Veeresh's projects, skills, education, or experience. What would you like to know?";

      if (lower.includes("project") || lower.includes("shodhani") || lower.includes("arivu") || lower.includes("eraksha")) {
        response = "Veeresh has built 3 key projects:\n\n• **ShodhaniAI** — AI-powered semantic search platform with 35% improved query relevance\n• **ArivuCode** — Interactive programming learning platform with 40% better UI responsiveness\n• **eRaksha Sentinel** — Smart safety monitoring system reducing response time by 30%";
      } else if (lower.includes("skill") || lower.includes("tech")) {
        response = "Veeresh's tech stack includes Python, Java, C++, JavaScript, HTML/CSS, MySQL, MongoDB, Git, VS Code, and Jupyter Notebook. He specializes in AI/ML, NLP, and web development.";
      } else if (lower.includes("education") || lower.includes("college") || lower.includes("study")) {
        response = "Veeresh is pursuing B.Tech in CSE (AI & ML) at CMR College of Engineering, Hyderabad with 8.42 CGPA. He scored 880/1000 in his 10+2 MPC at Sahasra Junior College, Kakinada.";
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("intern")) {
        response = "Veeresh is available for internship from Jan 2026! Contact him at manoharaveeresh0804@gmail.com or connect on LinkedIn: linkedin.com/in/vennaveeresh";
      } else if (lower.includes("certif")) {
        response = "Veeresh holds Cisco Networking Academy certifications in Introduction to Networks, Networking Basics, Introduction to Cybersecurity, and IT Fundamentals. He also earned an NCC 'A' Certificate.";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 800);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(183_100%_50%_/_0.4)] transition-transform hover:scale-110"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-xl border"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-display text-sm font-bold">AI Assistant</span>
              <span className="ml-auto h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm outline-none focus:border-primary" />
                <button onClick={handleSend}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
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
