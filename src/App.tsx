import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { VisaEb1a, VisaEb2Niw, VisaInvestidor, VisaTrabalho, VisaEstudante, VisaFamiliar } from "./pages/VisaPages.tsx";
import { useGlobalCtaTracking } from "./hooks/useAnalytics";

const AppRoutes = () => {
  useGlobalCtaTracking();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quero-migrar-para-os-eua" element={<Index />} />
        <Route path="/visto-eb1a" element={<VisaEb1a />} />
        <Route path="/visto-eb2niw" element={<VisaEb2Niw />} />
        <Route path="/visto-investidor" element={<VisaInvestidor />} />
        <Route path="/visto-trabalho" element={<VisaTrabalho />} />
        <Route path="/visto-estudante" element={<VisaEstudante />} />
        <Route path="/visto-familiar" element={<VisaFamiliar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quero-migrar-para-os-eua" element={<Index />} />
            <Route path="/visto-eb1a" element={<VisaEb1a />} />
            <Route path="/visto-eb2niw" element={<VisaEb2Niw />} />
            <Route path="/visto-investidor" element={<VisaInvestidor />} />
            <Route path="/visto-trabalho" element={<VisaTrabalho />} />
            <Route path="/visto-estudante" element={<VisaEstudante />} />
            <Route path="/visto-familiar" element={<VisaFamiliar />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
