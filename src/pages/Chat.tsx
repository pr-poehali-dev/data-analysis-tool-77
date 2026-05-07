import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const CHAT_URL = "https://functions.poehali.dev/0c0a89c1-5579-4891-8f7b-15a5eecb4ee7"

interface Message {
  role: "user" | "assistant"
  content: string
}

const SUGGESTIONS = [
  { icon: "PenLine", text: "Напиши продающий пост для Instagram" },
  { icon: "Lightbulb", text: "Придумай 5 заголовков для статьи о бизнесе" },
  { icon: "Languages", text: "Переведи текст на английский язык" },
  { icon: "Wand2", text: "Улучши этот текст: вставь свой текст сюда" },
  { icon: "Mail", text: "Напиши холодное письмо для клиента" },
  { icon: "FileText", text: "Составь структуру лендинга для продукта" },
]

function TypingDots() {
  return (
    <div className="flex gap-1.5 items-center py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-red-500 rounded-full"
          style={{ animation: `chatBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  )
}

function MessageBubble({ msg, index }: { msg: Message; index: number }) {
  const isUser = msg.role === "user"
  return (
    <div
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
      style={{ animation: `msgSlideIn 0.35s ease-out both`, animationDelay: `${index * 0.04}s` }}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-red-500/20">
          <Icon name="Sparkles" size={14} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-gradient-to-br from-red-500 to-red-600 text-white rounded-tr-sm shadow-lg shadow-red-500/25"
            : "bg-white/5 border border-white/10 text-gray-100 rounded-tl-sm"
        }`}
      >
        {msg.content}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-1">
          <Icon name="User" size={14} className="text-gray-400" />
        </div>
      )}
    </div>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim()
    if (!content || loading) return

    const userMsg: Message = { role: "user", content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")
    setLoading(true)
    textareaRef.current?.focus()

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }])
      } else {
        throw new Error("no reply")
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Произошла ошибка при обращении к серверу. Попробуйте ещё раз." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const canSend = input.trim().length > 0 && !loading

  return (
    <>
      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes msgSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(239,68,68,0.3); }
          50% { box-shadow: 0 0 28px rgba(239,68,68,0.6); }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .send-btn-active {
          animation: glowPulse 2s ease-in-out infinite;
        }
        .suggestion-card {
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .suggestion-card:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 24px rgba(239,68,68,0.2);
        }
        .suggestion-card:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>

      <div className="h-screen bg-black flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-red-500/20 bg-black/95 backdrop-blur-md z-10 shrink-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white hover:text-red-400 transition-all duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">
              <Icon name="ArrowLeft" size={18} />
            </span>
            <span className="font-orbitron text-base font-bold">
              Astra<span className="text-red-500">Logic</span>
            </span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-300 font-space-mono">AI онлайн</span>
          </div>

          <button
            onClick={() => setMessages([])}
            className="text-gray-600 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-500/10"
            title="Новый чат"
          >
            <Icon name="SquarePen" size={18} />
          </button>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 scroll-smooth">
          {messages.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto"
              style={{ animation: "floatIn 0.6s ease-out both" }}
            >
              <div className="mb-8">
                <div className="relative w-20 h-20 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping opacity-40" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center shadow-xl shadow-red-500/30">
                    <Icon name="Sparkles" size={32} className="text-white" />
                  </div>
                </div>
                <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-3">
                  Astra<span className="text-red-500">Logic</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                  Текстовый ИИ нового поколения. Задайте любой вопрос или выберите подсказку ниже.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s.text)}
                    className="suggestion-card text-left p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/50 text-sm text-gray-300"
                    style={{ animation: `floatIn 0.5s ease-out ${0.1 + i * 0.07}s both` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center mt-0.5">
                        <Icon name={s.icon as "PenLine"} size={14} className="text-red-400" />
                      </div>
                      <span className="leading-snug">{s.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-5">
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} index={i} />
              ))}
              {loading && (
                <div className="flex gap-3 justify-start" style={{ animation: "msgSlideIn 0.3s ease-out both" }}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-red-500/20">
                    <Icon name="Sparkles" size={14} className="text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 px-4 md:px-8 py-4 border-t border-white/5 bg-black/95">
          <div className="max-w-3xl mx-auto flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Напишите сообщение..."
                className="resize-none min-h-[52px] max-h-40 bg-white/5 border-white/10 text-white placeholder:text-gray-600 font-geist text-sm focus:border-red-500/40 rounded-2xl pr-4 py-3.5 transition-all duration-200"
                rows={1}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!canSend}
              className={`shrink-0 h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                canSend
                  ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg send-btn-active hover:scale-105 active:scale-95"
                  : "bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
              }`}
            >
              <Icon name={loading ? "Loader2" : "Send"} size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
          <p className="text-center text-xs text-gray-700 mt-2 font-space-mono">
            Enter — отправить · Shift+Enter — новая строка · AstraLogic может ошибаться
          </p>
        </div>
      </div>
    </>
  )
}
