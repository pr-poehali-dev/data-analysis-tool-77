import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

const CHAT_URL = "https://functions.poehali.dev/0c0a89c1-5579-4891-8f7b-15a5eecb4ee7"

interface Message {
  role: "user" | "assistant"
  content: string
}

const SUGGESTIONS = [
  "Напиши продающий пост для Instagram",
  "Придумай 5 заголовков для статьи о маркетинге",
  "Переведи текст на английский язык",
  "Улучши этот текст: вставь свой текст сюда",
]

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

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Произошла ошибка. Пожалуйста, попробуйте ещё раз." },
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

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-red-500/20 bg-black/95 backdrop-blur-md z-10 shrink-0">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
          <span className="font-orbitron text-lg font-bold">
            Astra<span className="text-red-500">Logic</span>
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-400 font-space-mono">AstraLogic</span>
        </div>
        <button
          onClick={() => setMessages([])}
          className="text-gray-500 hover:text-red-500 transition-colors"
          title="Очистить чат"
        >
          <Icon name="Trash2" size={18} />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                <Icon name="Sparkles" size={28} className="text-red-500" />
              </div>
              <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-2">AstraLogic</h1>
              <p className="text-gray-400 font-space-mono text-sm md:text-base">
                Текстовый ИИ нового поколения. Задайте вопрос или выберите подсказку.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-left p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all text-sm text-gray-300 font-space-mono"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-1">
                    <Icon name="Sparkles" size={14} className="text-red-500" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap font-space-mono ${
                    msg.role === "user"
                      ? "bg-red-500 text-white rounded-tr-sm"
                      : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-1">
                    <Icon name="User" size={14} className="text-gray-400" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-1">
                  <Icon name="Sparkles" size={14} className="text-red-500" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-5">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 md:px-8 py-4 border-t border-red-500/20 bg-black/95">
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напишите сообщение... (Enter — отправить, Shift+Enter — новая строка)"
            className="resize-none min-h-[48px] max-h-36 bg-white/5 border-white/10 text-white placeholder:text-gray-500 font-space-mono text-sm focus:border-red-500/50 rounded-xl"
            rows={1}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="bg-red-500 hover:bg-red-600 text-white border-0 shrink-0 h-12 w-12 p-0 rounded-xl"
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
        <p className="text-center text-xs text-gray-600 font-space-mono mt-2">
          AstraLogic может допускать ошибки. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  )
}