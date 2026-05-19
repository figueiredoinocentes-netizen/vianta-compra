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
// Extra space around iframe inside the muted section (pt-10 pb-20 + header) ~ 280px
const WRAPPER_PADDING = 280;

const InlineForm = ({ type, open, formRef }: InlineFormProps) => {
  const scriptLoaded = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [hasOpened, setHasOpened] = useState(false);
  const form = FORMS[type];
  const [iframeHeight, setIframeHeight] = useState(form.height);

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

  // Listen for height updates from GHL iframe
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!event.origin.includes("bfdigital.io")) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      // GHL posts various shapes; accept any numeric height referencing our form
      const candidate =
        (typeof data.height === "number" && data.height) ||
        (data.payload && typeof data.payload.height === "number" && data.payload.height) ||
        0;
      const matchesForm =
        !data.id || data.id === form.id || (data.payload && data.payload.id === form.id);
      if (candidate > 0 && matchesForm) {
        const newHeight = Math.max(candidate, 400);
        setIframeHeight(newHeight);
        if (iframeRef.current) iframeRef.current.style.height = `${newHeight}px`;
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [form.id]);

  const iframeSrc = `${BASE}/${form.id}`;

  return (
    <div
      ref={formRef}
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        maxHeight: open ? `${iframeHeight + WRAPPER_PADDING}px` : "0px",
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
                iframeRef.current = iframe;
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
