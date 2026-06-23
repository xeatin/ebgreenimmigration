import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import Noticias from "./pages/Noticias.tsx";
import { VisaEb1a, VisaEb2Niw } from "./pages/VisaPages.tsx";
import AdminCalendly from "./pages/AdminCalendly.tsx";
import { useGlobalCtaTracking } from "./hooks/useAnalytics";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useGlobalCtaTracking();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/quero-migrar-para-os-eua" element={<Index />} />
      <Route path="/visto-eb1a" element={<VisaEb1a />} />
      <Route path="/visto-eb2niw" element={<VisaEb2Niw />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/admin/calendly" element={<AdminCalendly />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
