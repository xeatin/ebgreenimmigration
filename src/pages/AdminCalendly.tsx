import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle2, Copy, ExternalLink } from "lucide-react";

type ApiError = { status?: number; message: string; detail?: unknown };

export default function AdminCalendly() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [signingKey, setSigningKey] = useState("");
  const [testResult, setTestResult] = useState<any>(null);

  const parseError = async (err: any): Promise<ApiError> => {
    // supabase.functions.invoke errors expose ctx.response when available
    const resp = err?.context?.response ?? err?.response;
    if (resp && typeof resp.text === "function") {
      try {
        const text = await resp.text();
        let detail: unknown = text;
        try { detail = JSON.parse(text); } catch {}
        return { status: resp.status, message: err?.message ?? `HTTP ${resp.status}`, detail };
      } catch {}
    }
    return { status: err?.status, message: err?.message ?? String(err) };
  };

  const handleRegister = async () => {
    if (!token.trim()) {
      toast({ title: "PAT obrigatório", description: "Cole seu Calendly Personal Access Token." });
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const { data, error: invokeError } = await supabase.functions.invoke("register-calendly-webhook", {
        body: { calendlyToken: token.trim() },
      });
      if (invokeError) {
        setError(await parseError(invokeError));
        return;
      }
      setResult(data);
      if (data?.ok) {
        if (data?.signing_key) setSigningKey(data.signing_key);
        toast({
          title: "Webhook criado!",
          description: "Copie o signing_key e salve como CALENDLY_WEBHOOK_SIGNING_KEY nas secrets.",
        });
      } else {
        setError({ status: 200, message: "Resposta sem ok=true", detail: data });
      }
    } catch (e: any) {
      setError(await parseError(e));
    } finally {
      setLoading(false);
    }
  };

  const handleTestPayload = async () => {
    setTesting(true);
    setTestResult(null);
    const fakePayload = {
      event: "invitee.created",
      created_at: new Date().toISOString(),
      created_by: "https://api.calendly.com/users/FAKE_USER",
      payload: {
        email: "teste@ebgreenusa.com",
        name: "Teste Simulado",
        first_name: "Teste",
        last_name: "Simulado",
        status: "active",
        timezone: "America/New_York",
        uri: "https://api.calendly.com/scheduled_events/FAKE/invitees/FAKE",
        questions_and_answers: [
          { question: "Telefone", answer: "+1 (771) 201-7117" },
          { question: "Tipo de visto", answer: "EB-2 NIW" },
        ],
        scheduled_event: {
          uri: "https://api.calendly.com/scheduled_events/FAKE",
          name: "Consultoria EB Green",
          start_time: new Date(Date.now() + 86400000).toISOString(),
          end_time: new Date(Date.now() + 86400000 + 1800000).toISOString(),
          location: { type: "google_conference", join_url: "https://meet.google.com/fake-test-link" },
        },
        cancel_url: "https://calendly.com/cancellations/FAKE",
        reschedule_url: "https://calendly.com/reschedulings/FAKE",
        tracking: { utm_source: "admin_test", utm_campaign: "simulated_payload" },
      },
    };
    try {
      const { data, error: invokeError } = await supabase.functions.invoke("calendly-webhook", {
        body: fakePayload,
      });
      if (invokeError) {
        setTestResult({ ok: false, error: await parseError(invokeError) });
        toast({ title: "Teste falhou", description: invokeError.message ?? "Erro desconhecido" });
      } else {
        setTestResult({ ok: true, data });
        toast({ title: "Payload enviado", description: "Verifique os logs da edge function e o n8n." });
      }
    } catch (e: any) {
      setTestResult({ ok: false, error: await parseError(e) });
    } finally {
      setTesting(false);
    }
  };

  const copyToClipboard = async (value: string, label = "Copiado") => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: label, description: "Valor copiado para a área de transferência." });
    } catch {
      toast({ title: "Falha ao copiar", description: "Copie manualmente." });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex items-start justify-center">
      <div className="w-full max-w-2xl mt-8 space-y-6">
        {/* Instruções */}
        <Card>
          <CardHeader>
            <CardTitle>Instruções</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Gere um <strong>Personal Access Token (PAT)</strong> em{" "}
                <a
                  href="https://calendly.com/integrations/api_webhooks"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary inline-flex items-center gap-1 underline"
                >
                  Calendly → Integrations → API & Webhooks <ExternalLink className="h-3 w-3" />
                </a>
                . Escopos necessários: <code className="font-mono">webhooks</code> e <code className="font-mono">user</code>.
              </li>
              <li>Cole o PAT no campo abaixo e clique em <strong>Registrar Webhook</strong>.</li>
              <li>
                Copie o <code className="font-mono">signing_key</code> retornado e salve nas Edge Function Secrets com o nome{" "}
                <code className="font-mono">CALENDLY_WEBHOOK_SIGNING_KEY</code>.
              </li>
              <li>
                Use o botão <strong>Testar com payload simulado</strong> para validar a sincronização com n8n/Kommo sem
                precisar de um agendamento real.
              </li>
            </ol>
            <p className="text-xs text-muted-foreground">
              Docs:{" "}
              <a
                href="https://developer.calendly.com/api-docs/c1ddc06ce1f1b-create-webhook-subscription"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Create Webhook Subscription
              </a>
              {" · "}
              <a
                href="https://help.calendly.com/hc/en-us/articles/223147027"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Gerar PAT
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Registro */}
        <Card>
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
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleRegister} disabled={loading} className="flex-1">
                {loading ? "Registrando..." : "Registrar Webhook no Calendly"}
              </Button>
              <Button
                onClick={handleTestPayload}
                disabled={testing}
                variant="secondary"
                className="flex-1"
              >
                {testing ? "Enviando..." : "Testar com payload simulado"}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  Erro {error.status ? `(HTTP ${error.status})` : ""}
                </AlertTitle>
                <AlertDescription>
                  <p className="mb-2">{error.message}</p>
                  {error.detail !== undefined && (
                    <pre className="text-xs bg-background/40 p-2 rounded overflow-auto max-h-48">
                      {typeof error.detail === "string"
                        ? error.detail
                        : JSON.stringify(error.detail, null, 2)}
                    </pre>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="space-y-2">
                <Label>Resultado do registro</Label>
                <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-80">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            {testResult && (
              <Alert variant={testResult.ok ? "default" : "destructive"}>
                {testResult.ok ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {testResult.ok ? "Payload simulado enviado" : "Falha no teste"}
                </AlertTitle>
                <AlertDescription>
                  <pre className="text-xs bg-background/40 p-2 rounded overflow-auto max-h-60 mt-2">
                    {JSON.stringify(testResult.ok ? testResult.data : testResult.error, null, 2)}
                  </pre>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Signing Key */}
        <Card>
          <CardHeader>
            <CardTitle>Signing Key → Secret</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Cole aqui o <code className="font-mono">signing_key</code> retornado pelo Calendly. Por questões de
              segurança, o valor precisa ser salvo manualmente como variável de ambiente
              (<code className="font-mono">CALENDLY_WEBHOOK_SIGNING_KEY</code>) no painel de Secrets do backend.
              Use o botão para copiar e cole na configuração.
            </p>
            <div className="space-y-2">
              <Label htmlFor="signing-key">CALENDLY_WEBHOOK_SIGNING_KEY</Label>
              <div className="flex gap-2">
                <Input
                  id="signing-key"
                  type="text"
                  placeholder="cole o signing_key aqui"
                  value={signingKey}
                  onChange={(e) => setSigningKey(e.target.value)}
                  className="font-mono text-xs"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => copyToClipboard(signingKey, "Signing key copiado")}
                  disabled={!signingKey}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Depois de copiar, peça ao agente Lovable para salvar como secret, ou cole no painel de Edge
                Function Secrets.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
