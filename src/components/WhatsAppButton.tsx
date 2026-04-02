import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/17712017117"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full p-4 shadow-lg transition-colors animate-bounce-slow"
      aria-label="Fale pelo WhatsApp"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  );
};

export default WhatsAppButton;