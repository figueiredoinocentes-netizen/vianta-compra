import { ChevronUp } from "lucide-react";

interface StickyButtonProps {
  visible: boolean;
  onScrollToTop: () => void;
}

const StickyButton = ({ visible, onScrollToTop }: StickyButtonProps) => {
  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={onScrollToTop}
        className="flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-5 py-3 rounded-full shadow-lg active:scale-95 transition-transform"
      >
        <ChevronUp className="w-4 h-4" />
        Ver viaturas
      </button>
    </div>
  );
};

export default StickyButton;
