import {
  Banknote,
  RefreshCw,
  Car,
  HeadphonesIcon,
  CheckCircle2,
} from "lucide-react";

const advantages = [
  {
    icon: Banknote,
    title: "Financiamento disponível",
    description:
      "Facilitamos o acesso a financiamento. Trabalhamos com parceiros para encontrar as melhores condições.",
  },
  {
    icon: RefreshCw,
    title: "Retoma da sua viatura",
    description:
      "Tem uma viatura para trocar? Avaliamos e fazemos retoma, simplificando o processo de compra.",
  },
  {
    icon: Car,
    title: "Viaturas preparadas para TVDE",
    description:
      "Viaturas prontas para trabalhar com as plataformas e com documentação organizada para validação.",
  },
  {
    icon: CheckCircle2,
    title: "Processo rápido e transparente",
    description:
      "Condições claras antes de avançar — preço, estado da viatura e o que está incluído. Sem surpresas.",
  },
  {
    icon: HeadphonesIcon,
    title: "Apoio e acompanhamento",
    description:
      "Ajudamos no processo de compra e acompanhamos para garantir uma transição tranquila.",
  },
];

const AdvantagesSection = () => {
  return (
    <section className="bg-muted py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-foreground text-center mb-2 leading-tight">
          Porquê comprar connosco?
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs mx-auto">
          Financiamento, retoma e apoio completo para começar a faturar mais rápido.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <div
                key={i}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm flex gap-3 items-start"
              >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{adv.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{adv.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
