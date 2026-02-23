import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-vianta-black.png";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Vianta" className="h-8 w-auto" />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Última atualização: {new Date().toLocaleDateString("pt-PT", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/90">
          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Responsável pelo Tratamento</h2>
            <p>
              <strong>Dos Inocentes Lda.</strong><br />
              NIF: 514 455 624<br />
              Av. Silvério Galrão Nogueira, nº8<br />
              2640-169 Cheleiros, Portugal<br />
              Email: <a href="mailto:geral@vianta.pt" className="text-primary underline">geral@vianta.pt</a>
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">2. Dados Pessoais Recolhidos</h2>
            <p>Através do formulário de contacto disponível neste website, recolhemos os seguintes dados pessoais:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Número de telefone</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">3. Finalidade do Tratamento</h2>
            <p>
              Os dados recolhidos destinam-se exclusivamente ao contacto comercial relacionado com o serviço de aluguer
              de viaturas para atividade TVDE (Uber, Bolt e outras plataformas). Não utilizamos os seus dados para
              qualquer outra finalidade nem os partilhamos com terceiros para fins de marketing.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">4. Base Legal</h2>
            <p>
              O tratamento dos seus dados pessoais baseia-se no seu <strong>consentimento</strong>, prestado de forma
              livre, informada e inequívoca aquando do preenchimento e envio do formulário de contacto.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">5. Prazo de Conservação</h2>
            <p>
              Os dados pessoais são conservados durante o período necessário para dar seguimento ao seu pedido de
              contacto e, no máximo, por <strong>12 meses</strong> após a última interação, salvo obrigação legal em
              contrário.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">6. Direitos do Titular</h2>
            <p>Nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD), tem direito a:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Acesso</strong> — solicitar informação sobre os dados que temos sobre si;</li>
              <li><strong>Retificação</strong> — corrigir dados inexatos ou incompletos;</li>
              <li><strong>Apagamento</strong> — solicitar a eliminação dos seus dados;</li>
              <li><strong>Portabilidade</strong> — receber os seus dados em formato estruturado;</li>
              <li><strong>Oposição</strong> — opor-se ao tratamento dos dados;</li>
              <li><strong>Retirada do consentimento</strong> — a qualquer momento, sem comprometer a licitude do tratamento já efetuado.</li>
            </ul>
            <p className="mt-2">
              Para exercer qualquer destes direitos, contacte-nos através do email{" "}
              <a href="mailto:geral@vianta.pt" className="text-primary underline">geral@vianta.pt</a>.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">7. Cookies</h2>
            <p>Este website utiliza os seguintes tipos de cookies:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Cookies funcionais</strong> — necessários para o correto funcionamento do site (ex.: preferência
                de consentimento de cookies).
              </li>
              <li>
                <strong>Cookies de terceiros</strong> — o formulário de contacto é fornecido por um serviço externo
                (GoHighLevel) que pode definir os seus próprios cookies para fins de funcionamento.
              </li>
            </ul>
            <p className="mt-2">
              Pode gerir as suas preferências de cookies a qualquer momento através do banner de cookies apresentado na
              sua primeira visita.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-semibold mb-2">8. Reclamações</h2>
            <p>
              Caso considere que os seus dados não estão a ser tratados de forma adequada, tem o direito de apresentar
              uma reclamação junto da{" "}
              <a
                href="https://www.cnpd.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Comissão Nacional de Proteção de Dados (CNPD)
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
