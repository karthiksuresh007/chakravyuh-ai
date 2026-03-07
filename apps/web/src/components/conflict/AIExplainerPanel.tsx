"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  loading: () => <span className="text-gray-500 text-sm">Loading…</span>,
});

const AI_SERVICE_URL =
  process.env.NEXT_PUBLIC_AI_SERVICE_URL ?? "http://localhost:8000";

const LEVELS = [
  { id: "eli10", label: "ELI10", desc: "For a 10-year-old" },
  { id: "eli15", label: "ELI15", desc: "For a teenager" },
  { id: "college", label: "College", desc: "Undergraduate" },
  { id: "policymaker", label: "Policy", desc: "Executive briefing" },
  { id: "research", label: "Research", desc: "Deep analysis" },
] as const;

type Level = (typeof LEVELS)[number]["id"];

interface Message {
  role: "user" | "model";
  text: string;
}

interface AIExplainerPanelProps {
  slug: string;
  conflictName: string;
}

export default function AIExplainerPanel({
  slug,
  conflictName,
}: AIExplainerPanelProps) {
  const [level, setLevel] = useState<Level>("college");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [followUp, setFollowUp] = useState("");
  const [hasExplained, setHasExplained] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleExplain = useCallback(async () => {
    setError(null);
    setStreaming(true);
    setMessages([]);
    setSessionId(null);
    setHasExplained(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${AI_SERVICE_URL}/ai/explain/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conflict_slug: slug, level }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.detail ?? `AI service error: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line.startsWith("event: ")) {
            const eventType = line.slice(7).trim();

            // Next line should be data
            const dataLineIdx = lines.indexOf(line) + 1;
            if (dataLineIdx < lines.length && lines[dataLineIdx].startsWith("data: ")) {
              const dataStr = lines[dataLineIdx].slice(6);
              try {
                const data = JSON.parse(dataStr);

                if (eventType === "meta" && data.sessionId) {
                  setSessionId(data.sessionId);
                } else if (eventType === "chunk") {
                  accumulated += data;
                  setMessages([{ role: "model", text: accumulated }]);
                } else if (eventType === "error") {
                  throw new Error(data.error ?? "Stream error");
                }
              } catch {
                // If it's a JSON parse error on chunk data, the chunk IS the string
                if (eventType === "chunk") {
                  accumulated += dataStr.replace(/^"|"$/g, "");
                  setMessages([{ role: "model", text: accumulated }]);
                }
              }
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Failed to get explanation");
    } finally {
      setStreaming(false);
    }
  }, [slug, level]);

  const handleFollowUp = useCallback(async () => {
    if (!followUp.trim() || !sessionId || streaming) return;

    const question = followUp.trim();
    setFollowUp("");
    setError(null);
    setStreaming(true);

    setMessages((prev) => [...prev, { role: "user", text: question }]);

    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${AI_SERVICE_URL}/ai/follow-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          question,
          stream: true,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.detail ?? `AI service error: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line.startsWith("event: ")) {
            const eventType = line.slice(7).trim();
            const dataLineIdx = lines.indexOf(line) + 1;
            if (dataLineIdx < lines.length && lines[dataLineIdx].startsWith("data: ")) {
              const dataStr = lines[dataLineIdx].slice(6);
              try {
                const data = JSON.parse(dataStr);
                if (eventType === "chunk") {
                  accumulated += data;
                  setMessages((prev) => {
                    const last = prev[prev.length - 1];
                    if (last?.role === "model") {
                      return [...prev.slice(0, -1), { role: "model", text: accumulated }];
                    }
                    return [...prev, { role: "model", text: accumulated }];
                  });
                } else if (eventType === "error") {
                  throw new Error(data.error ?? "Stream error");
                }
              } catch {
                if (eventType === "chunk") {
                  accumulated += dataStr.replace(/^"|"$/g, "");
                  setMessages((prev) => {
                    const last = prev[prev.length - 1];
                    if (last?.role === "model") {
                      return [...prev.slice(0, -1), { role: "model", text: accumulated }];
                    }
                    return [...prev, { role: "model", text: accumulated }];
                  });
                }
              }
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Failed to get response");
    } finally {
      setStreaming(false);
    }
  }, [followUp, sessionId, streaming]);

  const handleStop = () => {
    abortRef.current?.abort();
    setStreaming(false);
  };

  return (
    <div className="space-y-6 glass-panel shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 font-mono">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </span>
            AI Conflict Explainer
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Powered by Gemini — get an AI-generated explanation of {conflictName}
          </p>
        </div>
      </div>

      {/* Level selector */}
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 block">
          Explanation Level
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Explanation complexity level">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => { setLevel(l.id); setHasExplained(false); setMessages([]); setSessionId(null); }}
              disabled={streaming}
              aria-pressed={level === l.id}
              className={`group relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                level === l.id
                  ? "bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/40"
                  : "bg-gray-800/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {l.label}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {l.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      {!hasExplained && (
        <motion.button
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleExplain}
          disabled={streaming}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          Explain this Conflict
        </motion.button>
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streaming indicator */}
      {streaming && (
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
          </div>
          <span className="text-sm text-gray-400">
            {messages.length === 0 ? "Analyzing conflict data..." : "Generating..."}
          </span>
          <button
            onClick={handleStop}
            aria-label="Stop generating"
            className="ml-auto text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Stop
          </button>
        </div>
      )}

      {/* Messages / Response area */}
      {messages.length > 0 && (
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label="AI conversation"
          className="max-h-[60vh] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700"
        >
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-xl bg-purple-500/20 border border-purple-500/20 px-4 py-2.5 text-sm text-purple-200">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl bg-gray-800/50 border border-gray-700/50 px-5 py-4"
                >
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-strong:text-gray-200 prose-li:marker:text-gray-500">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Follow-up input */}
      {hasExplained && !streaming && sessionId && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleFollowUp(); }}
            placeholder="Ask a follow-up question..."
            maxLength={500}
            className="flex-1 rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50"
          />
          <button
            onClick={handleFollowUp}
            disabled={!followUp.trim()}
            aria-label="Send follow-up question"
            className="px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Re-explain with different level */}
      {hasExplained && !streaming && (
        <button
          onClick={() => { setHasExplained(false); setMessages([]); setSessionId(null); setError(null); }}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← Change explanation level and try again
        </button>
      )}
    </div>
  );
}
