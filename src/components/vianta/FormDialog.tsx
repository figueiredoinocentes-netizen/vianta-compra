import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useRef } from "react";

type FormType = "stock" | "consultancy";

interface FormDialogProps {
  type: FormType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FORMS: Record<FormType, { id: string; height: number; title: string; name: string }> = {
  stock: {
    id: "MFtB6ReND5CtglXtLk7v",
    height: 1183,
    title: "Pedir contacto",
    name: "Form LP Compra Stock",
  },
  consultancy: {
    id: "f0KULSnF1uiKyvsBdaqO",
    height: 1183,
    title: "Consultoria automóvel",
    name: "Form LP Compra Consultoria",
  },
};

const BASE = "https://api.bfdigital.io/widget/form";

const FormDialog = ({ type, open, onOpenChange }: FormDialogProps) => {
  const scriptLoaded = useRef(false);
  const form = FORMS[type];

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-5 pb-0">
          <DialogTitle className="text-xl font-extrabold font-heading">
            {form.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Preencha o formulário para saber mais.
          </DialogDescription>
        </DialogHeader>

        {/* GHL iframe – wrapped in a div so the GHL script's DOM mutations
             don't conflict with React's reconciliation on unmount */}
        <div className="px-5 pb-5 pt-3">
          <div ref={(node) => {
            if (!node || !open) return;
            // Clear previous iframe if any
            node.innerHTML = "";
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
          }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
