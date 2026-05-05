import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Нужно ли устанавливать что-то на компьютер?",
      answer:
        "Нет, NeuralTEXT работает прямо в браузере. Просто зайдите на сайт, зарегистрируйтесь и начните пользоваться — никаких установок и настроек.",
    },
    {
      question: "На каких языках работает нейросеть?",
      answer:
        "Платформа поддерживает более 50 языков, включая русский, английский, немецкий, французский и другие. Можно писать запрос на одном языке, а получать ответ на другом.",
    },
    {
      question: "Мои данные в безопасности?",
      answer:
        "Да, все данные передаются по зашифрованному соединению. Мы не передаём ваши тексты третьим лицам и не используем их для обучения модели без вашего согласия.",
    },
    {
      question: "Есть ли бесплатный тариф?",
      answer:
        "Да, новые пользователи получают бесплатный доступ с определённым лимитом запросов в месяц. Для активных пользователей доступны платные тарифы без ограничений.",
    },
    {
      question: "Насколько точны ответы нейросети?",
      answer:
        "NeuralTEXT использует одну из лучших языковых моделей. Для творческих задач и работы с текстом точность очень высокая. Для фактических данных рекомендуем проверять информацию из дополнительных источников.",
    },
    {
      question: "Можно ли использовать для работы в команде?",
      answer:
        "Да, у нас есть командные тарифы с общим доступом к истории запросов и возможностью совместной работы над текстами.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Ответы на популярные вопросы о платформе NeuralTEXT и работе с нейросетью.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
