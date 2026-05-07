import { useState } from "react"
import Icon from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/90 backdrop-blur-md border-b border-red-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <h1 className="font-orbitron text-xl font-bold text-white group-hover:opacity-80 transition-opacity">
              Astra<span className="text-red-500">Logic</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="font-geist text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              Возможности
            </a>
            <a href="#applications" className="font-geist text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              Сценарии
            </a>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => navigate("/chat")}
              className="btn-glow inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-orbitron font-bold text-sm px-5 py-2.5 rounded-xl"
            >
              <Icon name="Zap" size={15} />
              Попробовать бесплатно
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-500 transition-colors duration-200 p-1"
            >
              {isOpen ? <Icon name="X" size={22} /> : <Icon name="Menu" size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-red-500/20 py-3">
            <div className="space-y-1">
              <a
                href="#features"
                className="block px-3 py-2.5 font-geist text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Возможности
              </a>
              <a
                href="#applications"
                className="block px-3 py-2.5 font-geist text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Сценарии
              </a>
              <div className="px-3 pt-2">
                <button
                  className="btn-glow w-full inline-flex items-center justify-center gap-2 bg-red-500 text-white font-orbitron font-bold text-sm px-5 py-3 rounded-xl"
                  onClick={() => { setIsOpen(false); navigate("/chat") }}
                >
                  <Icon name="Zap" size={15} />
                  Попробовать бесплатно
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
