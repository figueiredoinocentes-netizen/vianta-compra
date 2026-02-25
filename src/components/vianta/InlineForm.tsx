import { useRef, useEffect, useState } from "react";

type FormType = "stock" | "consultancy";

interface InlineFormProps {
  type: FormType;
  open: boolean;
  formRef: React.RefObject<HTMLDivElement>;
}

const FORMS: Record<FormType, { id: string; height: number; title: string; description: string; name: string }> = {
  stock: {
    id: "MFtB6ReND5CtglXtLk7v",
    height: 1183,
    title: "Pedir contacto",
    description: "Preencha o formulário e entraremos em contacto consigo.",
    name: "Form LP Compra Stock",
  },
  consultancy: {
    id: "f0KULSnF1uiKyvsBdaqO",
    height: 1183,
    title: "Consultoria automóvel",
    description: "Deixe o contacto e faça a avaliação gratuita.",
    name: "Form LP Compra Consultoria",
  },
};

const BASE = "https://api.bfdigital.io/widget/form";

const InlineForm = ({ type, open, formRef }: InlineFormProps) => {
  const scriptLoaded = useRef(false);
  const [hasOpened, setHasOpened] = useState(false);
  const form = FORMS[type];

  // Only create iframe once open is true for the first time
  useEffect(() => {
    if (open && !hasOpened) setHasOpened(true);
  }, [open, hasOpened]);

  // Load GHL script once
  useEffect(() => {
    if (scriptLoaded.current) return;
    if (document.querySelector('script[src="https://api.bfdigital.io/js/form_embed.js"]')) {
      scriptLoaded.current = true;
      return;
    }
    const script = document.createElement("script");
    script.src = "https://api.bfdigital.io/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    scriptLoaded.current = true;
  }, []);

  const iframeSrc = `${BASE}/${form.id}`;

  return (
    <div
      ref={formRef}
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        maxHeight: open ? `${form.height + 200}px` : "0px",
        opacity: open ? 1 : 0,
      }}
    >
      <div className="bg-muted pt-10 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-extrabold text-foreground text-center mb-1 font-heading">
            {form.title}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {form.description}
          </p>

          {hasOpened && (
            <div
              ref={(node) => {
                if (!node || node.querySelector("iframe")) return;
                const iframe = document.createElement("iframe");
                iframe.src = iframeSrc;
                iframe.style.cssText = `width:100%;height:${form.height}px;border:none;border-radius:3px`;
                iframe.id = `inline-${form.id}`;
                iframe.setAttribute("data-layout", '{"id":"INLINE"}');
                iframe.setAttribute("data-trigger-type", "alwaysShow");
                iframe.setAttribute("data-trigger-value", "");
                iframe.setAttribute("data-activation-type", "alwaysActivated");
                iframe.setAttribute("data-activation-value", "");
                iframe.setAttribute("data-deactivation-type", "neverDeactivate");
                iframe.setAttribute("data-deactivation-value", "");
                iframe.setAttribute("data-form-name", form.name);
                iframe.setAttribute("data-height", String(form.height));
                iframe.setAttribute("data-layout-iframe-id", `inline-${form.id}`);
                iframe.setAttribute("data-form-id", form.id);
                iframe.title = form.name;
                node.appendChild(iframe);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InlineForm;
