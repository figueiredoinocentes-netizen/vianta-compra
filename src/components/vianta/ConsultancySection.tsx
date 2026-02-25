import { Button } from "@/components/ui/button";
import { ClipboardList, Search, CheckCircle, ShoppingCart, Truck } from "lucide-react";

interface ConsultancySectionProps {
  onScrollToForm: () => void;
}

const steps = [
  {
    icon: ClipboardList,
    title: "Avaliação",
    description: "Budget, tipo de carro e objetivo TVDE.",
  },
  {
    icon: Search,
    title: "Procura e seleção",
    description: "Encontramos as melhores opções, incluindo alternativas.",
  },
  {
    icon: CheckCircle,
    title: "Validação e aprovação",
    description: "Você escolhe — só avançamos com a sua aprovação.",
  },
  {
    icon: ShoppingCart,
    title: "Compra + preparação",
    description: "Tratamos de tudo: compra, inspeção, extintor, dísticos e preparação.",
  },
  {
    icon: Truck,
    title: "Entrega pronta a trabalhar",
    description: "Recebe a viatura pronta para atividade TVDE.",
  },
];

const ConsultancySection = ({ onScrollToForm }: ConsultancySectionProps) => {
  return (
    <section className="bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-foreground text-center mb-2 leading-tight">
          Não encontrou a viatura certa?
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-10 max-w-md mx-auto">
          Não se preocupe, diga-nos o que procura. Com o nosso serviço de consultoria automóvel encontramos a melhor solução para cada motorista.
        </p>

        {/* Vertical stepper */}
        <div className="relative pl-8 space-y-8 mb-10">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative flex gap-4 items-start">
                {/* Step circle */}
                <div className="absolute -left-8 w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 z-10">
                  <Icon className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-0.5">{step.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            onClick={onScrollToForm}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl h-12 px-8"
          >
            Quero este serviço
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConsultancySection;
