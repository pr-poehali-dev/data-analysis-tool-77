import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Елена Родригес",
    role: "Владелица интернет-магазина",
    avatar: "/professional-woman-scientist.png",
    content:
      "Раньше тратила полдня на описания товаров. Теперь NeuralTEXT пишет их за минуту — и даже лучше, чем я сама делала.",
  },
  {
    name: "Маркус Уильямс",
    role: "Маркетолог, Stellar Agency",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "Контент для соцсетей стал выходить в 5 раз быстрее. Клиенты замечают рост вовлечённости — ИИ реально пишет цепляющие тексты.",
  },
  {
    name: "Анна Ковальски",
    role: "Студентка магистратуры",
    avatar: "/asian-woman-tech-developer.jpg",
    content:
      "Помогает разобраться в сложных темах и структурировать мысли для эссе. Это как умный репетитор, доступный в любое время.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Что говорят пользователи</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Тысячи людей уже используют NeuralTEXT каждый день для работы, учёбы и творчества
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
