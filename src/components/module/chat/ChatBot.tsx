"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useChat } from "@/hooks/useChat";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your EcoTrack AI assistant. Ask me anything about our products, stock levels, or orders.",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    chatMutation.mutate(
      { message: userMessage.content },
      {
        onSuccess: (response) => {
          const aiMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: response.data || "I'm not sure about that. Please try again.",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
        },
        onError: (error) => {
          const errorMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: error.message || "Something went wrong. Please try again later.",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {isOpen && (
        <div className="flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0a0f1e] shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-emerald-500/10 bg-[#0d1429] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20">
                <Bot className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">EcoTrack AI</h3>
                <p className="text-[11px] text-emerald-400">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-emerald-500/20"
                      : "bg-white/5"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Bot className="h-3.5 w-3.5 text-emerald-400" />
                  )}
                </div>
                <div
                  className={`max-w-[260px] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-emerald-500 text-white rounded-br-md"
                      : "bg-white/5 text-slate-300 rounded-bl-md border border-white/5"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {chatMutation.isPending && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <Bot className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/5 border border-white/5 px-3.5 py-2.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                  <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-emerald-500/10 bg-[#0d1429] px-3 py-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 border border-emerald-500/10 focus-within:border-emerald-500/30 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || chatMutation.isPending}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white transition-colors hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-400"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/30 transition-all hover:scale-110 hover:shadow-xl active:scale-95 ${
          isOpen
            ? "bg-slate-700 text-white rotate-0"
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Slow pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping [animation-duration:4s] [animation-iteration-count:infinite]" />
        )}

        {/* Bounce animation on icon */}
        <span className={`transition-transform duration-300 ${!isOpen ? "group-hover:animate-bounce" : ""}`}>
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </span>

        {/* Unread indicator with pulse */}
        {!isOpen && messages.length > 1 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-[#0a0f1e] animate-pulse">
            {messages.filter((m) => m.role === "assistant").length}
          </span>
        )}
      </button>
    </div>
  );
}
