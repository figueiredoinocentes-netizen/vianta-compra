import {
  Shield,
  Zap,
  Car,
  HeadphonesIcon,
  Wrench,
  CheckCircle2 } from
"lucide-react";

const advantages = [
{
  icon: Shield,
  title: "Caução flexível (sem juros)",
  description:
  "Pode pagar a caução em 3 prestações sem juros. Se precisar de dividir por mais meses, temos opção com financiadora (sujeito a aprovação)."
},
{
  icon: CheckCircle2,
  title: "Processo rápido e transparente",
  description:
  "Condições claras antes de avançar — prazo, caução e o que está incluído. Sem surpresas."
},
{
  icon: Car,
  title: "Viaturas preparadas para TVDE",
  description:
  "Viaturas prontas para trabalhar com as plataformas e com documentação organizada para validação."
},
{
  icon: HeadphonesIcon,
  title: "Apoio e acompanhamento",
  description:
  "Ajudamos no onboarding e acompanhamos para reduzir dias parados e melhorar resultados."
},
{
  icon: Wrench,
  title: "Menos tempo parado",
  description:
  "Se houver imprevistos (avaria/sinistro), apoiamos o processo e ajudamo-lo a voltar à estrada o mais rápido possível."
}];


const AdvantagesSection = () => {
  return (
    <section className="bg-muted py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-foreground text-center mb-2 leading-tight">No mercado desde 2017

        </h2>
        <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs mx-auto">
          Processo simples, oferta clara e apoio para começar a faturar mais rápido.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <div
                key={i}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm flex gap-3 items-start">

                <div className="shrink-0 w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{adv.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{adv.description}</p>
                </div>
              </div>);

          })}
        </div>
      </div>
    </section>);

};

export default AdvantagesSection;