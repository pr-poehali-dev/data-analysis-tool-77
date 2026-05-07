import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"

export function CTASection() {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible") },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="reveal max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-space-mono mb-8">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          Попробуйте бесплатно прямо сейчас
        </div>

        <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Начните работать<br />
          с <span className="text-red-500">AstraLogic</span> сегодня
        </h2>

        <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto">
          Тысячи людей уже экономят часы каждую неделю. Присоединяйтесь — без карты, без регистрации.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/chat")}
            className="btn-glow inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-orbitron font-bold text-base px-8 py-4 rounded-xl"
          >
            <Icon name="Zap" size={18} />
            Начать бесплатно
          </button>
          <button
            onClick={() => navigate("/chat")}
            className="btn-outline-glow inline-flex items-center justify-center gap-2 border border-red-500/40 text-red-400 hover:text-white hover:bg-red-500/10 font-orbitron font-bold text-base px-8 py-4 rounded-xl"
          >
            <Icon name="Play" size={18} />
            Смотреть демо
          </button>
        </div>
      </div>
    </section>
  )
}
