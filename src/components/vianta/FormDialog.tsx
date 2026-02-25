import { Car, X } from "lucide-react";
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
  vehicleLabel?: string | null;
}

const FORMS: Record<FormType, { id: string; height: number; title: string; name: string }> = {
  stock: {
    id: "MFtB6ReND5CtglXtLk7v",
    height: 1183,
    title: "Pedir contacto",
    name: "Form LP Compra Stock",
  },
  consultancy: {
    id: "D26uSHUDyRjZS4ZZuij4",
    height: 1007,
    title: "Consultoria automóvel",
    name: "Form 0",
  },
};

const BASE = "https://api.bfdigital.io/widget/form";

const FormDialog = ({ type, open, onOpenChange, vehicleLabel }: FormDialogProps) => {
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

  const iframeSrc =
    type === "stock" && vehicleLabel
      ? `${BASE}/${form.id}?viatura=${encodeURIComponent(vehicleLabel)}`
      : `${BASE}/${form.id}`;

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

        {/* Vehicle banner (stock only) */}
        {type === "stock" && vehicleLabel && (
          <div className="flex items-center gap-3 bg-muted border border-border rounded-xl px-4 py-3 mx-5 mt-3">
            <Car className="w-5 h-5 text-accent shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">
                A pedir contacto sobre
              </p>
              <p className="text-sm font-semibold text-foreground">{vehicleLabel}</p>
            </div>
          </div>
        )}

        {/* GHL iframe */}
        <div className="px-5 pb-5 pt-3">
          {open && (
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              style={{ width: "100%", height: `${form.height}px`, border: "none", borderRadius: "3px" }}
              id={`inline-${form.id}`}
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name={form.name}
              data-height={form.height}
              data-layout-iframe-id={`inline-${form.id}`}
              data-form-id={form.id}
              title={form.name}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
