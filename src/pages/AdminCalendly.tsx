import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function AdminCalendly() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRegister = async () => {
    if (!token.trim()) {
      toast({ title: "PAT obrigatório", description: "Cole seu Calendly Personal Access Token." });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("register-calendly-webhook", {
        body: { calendlyToken: token.trim() },
      });
      if (error) throw error;
      setResult(data);
      if (data?.ok) {
        toast({
          title: "Webhook criado!",
          description: "Copie o signing_key e salve como CALENDLY_WEBHOOK_SIGNING_KEY nas secrets.",
        });
      } else {
        toast({ title: "Falha ao registrar", description: JSON.stringify(data?.detail ?? data) });
      }
    } catch (e: any) {
      toast({ title: "Erro", description: e?.message ?? String(e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex items-start justify-center">
      <Card className="w-full max-w-2xl mt-12">
        <CardHeader>
          <CardTitle>Registrar Webhook do Calendly</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pat">Calendly Personal Access Token (PAT)</Label>
            <Input
              id="pat"
              type="password"
              placeholder="eyJraWQiOi..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Crie em Calendly → Integrations → API & Webhooks → Personal Access Tokens. Escopos: webhooks + user.
            </p>
          </div>
          <Button onClick={handleRegister} disabled={loading} className="w-full">
            {loading ? "Registrando..." : "Registrar Webhook no Calendly"}
          </Button>

          {result && (
            <div className="space-y-2">
              <Label>Resultado</Label>
              <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-80">
                {JSON.stringify(result, null, 2)}
              </pre>
              {result?.signing_key && (
                <p className="text-sm">
                  ⚠️ Salve este <code className="font-mono">signing_key</code> nas Edge Function Secrets do projeto com o nome
                  {" "}
                  <code className="font-mono">CALENDLY_WEBHOOK_SIGNING_KEY</code>.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
