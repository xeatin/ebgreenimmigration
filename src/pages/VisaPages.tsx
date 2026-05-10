import VisaLandingPage from "@/components/VisaLandingPage";
import { eb1aContent, eb2niwContent, eb5Content, trabalhoContent, estudanteContent, familiarContent } from "./visa-content";

export const VisaEb1a = () => <VisaLandingPage content={eb1aContent} />;
export const VisaEb2Niw = () => <VisaLandingPage content={eb2niwContent} />;
export const VisaInvestidor = () => <VisaLandingPage content={eb5Content} />;
export const VisaTrabalho = () => <VisaLandingPage content={trabalhoContent} />;
export const VisaEstudante = () => <VisaLandingPage content={estudanteContent} />;
export const VisaFamiliar = () => <VisaLandingPage content={familiarContent} />;
