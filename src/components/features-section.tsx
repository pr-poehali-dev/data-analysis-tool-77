import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const features = [
  {
    title: "Генерация текстов",
    description: "Создавайте статьи, посты, описания и письма за секунды. ИИ пишет в вашем стиле и под вашу задачу.",
    icon: "PenLine",
    badge: "Быстро",
  },
  {
    title: "Редактирование и улучшение",
    description: "Загрузите готовый текст — ИИ улучшит стиль, исправит ошибки и сделает его более убедительным.",
    icon: "Sparkles",
    badge: "Качество",
  },
  {
    title: "Умные ответы",
    description: "Задайте любой вопрос и получите развёрнутый, точный ответ. Как персональный эксперт в кармане.",
    icon: "MessageSquare",
    badge: "Ответы",
  },
  {
    title: "Перевод на 50+ языков",
    description: "Мгновенный перевод с сохранением смысла и тона. Идеально для бизнеса и общения с партнёрами.",
    icon: "Languages",
    badge: "Мультиязык",
  },
  {
    title: "Суммаризация",
    description: "Длинный документ, статья или переписка — ИИ сожмёт до ключевых тезисов за несколько секунд.",
    icon: "FileText",
    badge: "Экономия",
  },
  {
    title: "История и контекст",
    description: "Платформа помнит ваши предыдущие запросы и сохраняет контекст беседы для связных диалогов.",
    icon: "History",
    badge: "Память",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Возможности AstraLogic</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Всё что нужно для работы с текстом — в одном месте, без лишних инструментов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Icon name={feature.icon} size={32} className="text-red-500" fallback="Star" />
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}