# Refinamento Institucional de Design — EB Green Immigration

Aplicar uma camada de polimento visual coesa em todo o site, mantendo a identidade navy/charcoal + gold e reforçando a percepção de seriedade institucional.

---

## 1. Box-shadow institucional (cards)

Criar um token reutilizável e aplicar em todos os cards do site.

**`src/index.css`** — adicionar variáveis:
```css
--shadow-card: 0 2px 8px hsl(220 20% 10% / 0.08);
--shadow-card-hover: 0 6px 20px hsl(220 20% 10% / 0.12);
--shadow-elevated: 0 10px 30px hsl(220 20% 10% / 0.10);
```

**`tailwind.config.ts`** — registrar utilitários:
```ts
boxShadow: {
  card: "var(--shadow-card)",
  "card-hover": "var(--shadow-card-hover)",
  elevated: "var(--shadow-elevated)",
}
```

Substituir `shadow-lg` / `shadow-xl` / shadows arbitrárias nos componentes:
- `ServicesSection.tsx` (cards de visto)
- `ProcessSection.tsx` (etapas)
- `TestimonialsSection.tsx` (depoimentos)
- `AboutSection.tsx` (card flutuante)
- `ContactSection.tsx` (card do formulário, opções de visto, sugestão de visto)
- `DifferentialsSection.tsx`

Padrão: `shadow-card hover:shadow-card-hover transition-shadow duration-300`.

---

## 2. Tipografia

**Hierarquia mais clara e consistente:**

- **H1 (hero)**: `text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[1.05]`
- **H2 (seções)**: `text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight leading-[1.15]`
- **H3 (cards/sub)**: `text-xl md:text-2xl font-display font-medium leading-snug`
- **Eyebrow / kicker**: `text-xs md:text-sm uppercase tracking-[0.18em] text-gold font-medium`
- **Body**: `text-base md:text-[17px] leading-relaxed text-muted-foreground`
- **Caption / meta**: `text-sm text-muted-foreground/80`

Adicionar utility `.text-balance` em headlines longas.

---

## 3. Espaçamento

Padronizar ritmo vertical entre seções e dentro de cards.

- **Seções**: `py-20 md:py-28 lg:py-32` (uniforme)
- **Container interno**: `space-y-12 md:space-y-16`
- **Card padding**: `p-6 md:p-8` (cards padrão), `p-8 md:p-10` (cards principais)
- **Gap em grids**: `gap-6 md:gap-8`
- **Form fields**: `space-y-5` entre campos, `gap-2` entre label e input

---

## 4. Hierarquia visual

- Reforçar **eyebrow** (kicker dourado em uppercase) acima dos H2 das seções para criar 3 níveis claros: kicker → headline → subheadline.
- Linha divisória dourada fina (`h-px w-12 bg-gold`) abaixo dos títulos de cards principais.
- Reduzir peso de elementos secundários (texto auxiliar em `text-muted-foreground`, ícones em `text-gold/80`).
- Botões CTA primários com mais presença: `shadow-card`, padding `px-8 py-3.5`.

---

## 5. Formulários (ContactSection)

- **Inputs**: altura `h-12`, `rounded-md`, `border-border`, `focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:border-gold` transição suave.
- **Labels**: `text-sm font-medium text-foreground mb-1.5`
- **Placeholders**: `text-muted-foreground/60`
- **Erros**: `text-sm text-destructive mt-1.5` com ícone sutil.
- **Cards de seleção (visto/educação)**: aplicar `shadow-card`, hover com `border-gold/40 shadow-card-hover`, selecionado com `border-gold bg-gold/5`.
- **Stepper**: indicadores numéricos com `shadow-card`, ativo em `bg-gold text-navy`, completo com check em `bg-gold/15 text-gold`.
- **Botões Voltar/Continuar**: alinhamento já feito; aplicar `shadow-card` no Continuar e variant `ghost` no Voltar.

---

## 6. Cores (refinos sutis)

Sem trocar a paleta — apenas calibrar tokens em `index.css`:

- `--muted-foreground`: ajustar para melhor contraste em texto secundário (`220 12% 42%`).
- `--border`: refinar para tom levemente mais frio (`220 14% 88%`).
- Adicionar `--gold-soft: 38 75% 55% / 0.08` para fundos sutis (badges, hovers).
- Garantir uso de `text-foreground/80` em vez de cinzas arbitrários.

---

## Componentes afetados

```text
src/index.css                              tokens (shadow, cores)
tailwind.config.ts                         shadow utilities
src/components/HeroSection.tsx             tipografia + spacing
src/components/AboutSection.tsx            shadow card + hierarquia
src/components/ServicesSection.tsx         shadow + hierarquia + spacing
src/components/ProcessSection.tsx          shadow + spacing
src/components/DifferentialsSection.tsx    shadow + tipografia
src/components/TestimonialsSection.tsx     shadow + tipografia
src/components/ContactSection.tsx          forms completo + shadow + spacing
src/components/CTASection.tsx              tipografia + CTA shadow
src/components/Footer.tsx                  pequenos ajustes de tipografia
```

---

## Detalhes técnicos

- Todas as cores via tokens HSL existentes — nada hardcoded.
- Manter a estrutura de markup atual; apenas classes Tailwind serão alteradas.
- Animações já existentes (framer-motion, shimmer-gold, btn-highlight) preservadas.
- Sem mudanças de conteúdo, i18n ou lógica de negócio.
- Responsividade mobile preservada e testada nos breakpoints `md` e `lg`.

Confirma para eu implementar tudo?
