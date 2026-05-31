# GTM Import Guide — Container `GTM-N2BG96B5`

> Use este arquivo como roteiro de execução. Tempo total estimado: **5 minutos**.

## O que tem no JSON

| Recurso | Quantidade | Status |
|---|---|---|
| GA4 Configuration tag | 1 | ✅ Ativa (G-E95KQSN0BH) |
| GA4 Event tags | 5 | ✅ Ativas (generate_lead, form_submit, cta_click, scroll, page_engagement) |
| Google Ads Conversion tag | 1 | ⏸️ Pausada (você ativa depois de criar a conversão no Google Ads) |
| Custom Event Triggers | 5 | ✅ Ativos |
| DataLayer Variables | 10 | ✅ Ativas |
| Built-in Variables | 5 | ✅ Ativas |

**⚠️ Não inclui tag Meta Pixel.** O Pixel já é disparado pelo código do site (`src/lib/analytics.ts`) com `eventID` único pra deduplicação CAPI. Adicionar tag de Pixel no GTM **vai causar duplicação** que você já vinha enfrentando.

---

## Passo a passo

### 1. Antes de importar — auditoria das tags atuais

1. Acesse https://tagmanager.google.com → container `GTM-N2BG96B5`
2. Workspace → **Tags**
3. Liste tudo que estiver lá. Print ou anote os nomes.
4. **Procure especificamente por tags de Meta Pixel** (qualquer tag tipo "Custom HTML" ou template do Pixel).
   - Se existir tag de Pixel **disparando PageView ou Lead** → **PAUSE** (não delete ainda, só pause clicando na tag → ⋮ → Pause)
   - Motivo: o Pixel agora é controlado pelo código. Se a tag do GTM continuar ativa, você terá Lead em dobro.

### 2. Importar o container

1. Workspace → **Admin** (engrenagem no topo)
2. Coluna **Container** → **Import Container**
3. **Choose container file** → selecione `gtm-container-N2BG96B5.json`
4. **Choose workspace** → selecione um workspace novo: clique em "New" → nome: `Tracking v1 — Phase 2`
5. **Choose an import option:**
   - ✅ **Merge** (mantém o que já existe + adiciona novo)
   - Sub-opção: **Overwrite conflicting tags, triggers, and variables** (sobrescreve só se houver conflito de nome)
6. **Confirm** → revise o preview (deve mostrar 7 tags / 5 triggers / 10 variables sendo adicionadas)
7. **Confirm** novamente

### 3. Após importar — verificações

1. **Tags → "GA4 Configuration"** → confirme que o `Measurement ID` está como `G-E95KQSN0BH`. Se não, edite.
2. **Tags → "Google Ads — Conversion (Lead)"** → essa está **pausada** intencionalmente. Quando você criar a conversão no Google Ads:
   - Edite a tag → substitua `PREENCHA_AW-XXXXXXX` e `PREENCHA_LABEL` pelos valores reais
   - Tire do pause (⋮ → Resume)
3. **Variables → User-Defined → "DLV - event_id"** → confirme que existe (e os outros 9 DLVs)

### 4. Preview / Debug

1. Topo direito → **Preview**
2. Insira a URL do site (em produção ou preview Vercel)
3. Na aba Tag Assistant que abre, navegue, preencha o form
4. Esperado ver disparando:
   - **GA4 Configuration** → no carregamento de cada página
   - **GA4 Event — generate_lead** → no submit do form (com `event_id` no payload)
   - **GA4 Event — form_submit** → no submit do form
   - **GA4 Event — cta_click** → ao clicar em botões com `data-cta-id`
   - **GA4 Event — scroll** → em 25/50/75/100% de scroll

### 5. Publish

Quando tudo verde no Preview:
1. Topo direito → **Submit**
2. Version name: `Tracking v1 — GA4 + custom events`
3. Version description: `GA4 config + 5 custom events. Meta Pixel handled by site code with event_id deduplication.`
4. **Publish**

---

## Eventos que o site dispara hoje (referência rápida)

Ver `src/lib/analytics.ts` pra detalhes. Esses são os eventos que aparecem no `dataLayer`:

| Event | Quando | Params |
|---|---|---|
| `cta_click` | Botão CTA clicado | cta_id, cta_text, cta_location, cta_href, visa_context |
| `form_start` | Primeiro campo focado | form_id, field |
| `form_step` | Avanço de etapa | form_id, form_step, visa_context |
| `form_abandon` | Saída sem submeter | form_id, form_step, visa_context |
| `form_error` | Erro de validação/submit | form_id, form_step, reason |
| `form_submit` | Form enviado com sucesso | form_id, visa_context, reason (qualification) |
| `meta_lead` | Lead enviado pro CRM (com event_id pra dedup) | content_name, content_category, status, visa_context, event_id |
| `scroll_depth` | 25/50/75/100% de scroll | depth, page |
| `page_engagement` | Saída da página | page, time_seconds, reason |

---

## Troubleshooting

**"Importei mas não vejo eventos no Preview"**
- Verifique se o container ID na URL é mesmo `GTM-N2BG96B5`
- Faça hard refresh no Tag Assistant (Cmd+Shift+R)
- Verifique se o site tem `dataLayer` no console: `window.dataLayer` deve mostrar array

**"GA4 disparando 2x"**
- Provavelmente tem uma tag GA4 antiga no container. Pause/delete.
- Ou existe outro container GTM no site (rode `document.querySelectorAll('script[src*="googletagmanager"]')` no console)

**"Lead disparando 2x no Meta Events Manager"**
- Você não pausou a tag de Pixel antiga no GTM. Volte ao passo 1.4.

**"Lead disparando 0x no Meta Events Manager"**
- Site não está carregando o Pixel. Verifique no `index.html` que o snippet do Pixel está intacto.

---

## Próximos passos depois de importar

1. ✉️ Confirmar comigo que importou e publicou
2. 🧪 Eu rodo um teste de validação no Test Events do Meta (`TEST36612`)
3. 🚀 Avançar pra **Fase 3** (server-side CAPI + GA4 MP) — depende do acesso ao Supabase
