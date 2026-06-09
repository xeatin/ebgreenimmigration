## Objetivo

Aplicar consistência tipográfica (mesma cadência do rodapé do formulário) aos textos pequenos do site — sem alterar títulos (Playfair) nem corpo principal.

## Regra de estilo (refinamento institucional)

| Tamanho                               | line-height               | tracking                   | Aplicação                                                |
| ------------------------------------- | ------------------------- | -------------------------- | -------------------------------------------------------- |
| **11px** (meta, badges, micro-labels) | `leading-snug` (1.375)    | `tracking-wide` (+0.025em) | Selos, "Dados protegidos", labels de formulário pequenos |
| **12–13px** (`text-xs`)               | `leading-snug`            | `tracking-wide`            | Captions, helper texts, footer institucional             |
| **14–15px** (`text-sm`)               | `leading-relaxed` (1.625) | `tracking-normal`          | Descrições curtas em cards                               |
| **16px+** corpo                       | `leading-relaxed`         | `tracking-normal`          | Sem mudança                                              |

Títulos Playfair: **sem alteração** (mantém presença editorial).

## Escopo de arquivos

Aplicar nos componentes públicos (não nos `ui/` shadcn — esses são primitivos):

1. `src/components/HeroSection.tsx` — métricas e selo "+89% NIW"
2. `src/components/Footer.tsx` — disclaimer trilíngue, copyright
3. `src/components/ContactSection.tsx` — labels secundárias e helper texts (footer já feito)
4. `src/components/ServicesSection.tsx` — descrições curtas dos cards de visto
5. `src/components/TestimonialsSection.tsx` — função/cargo abaixo dos nomes
6. `src/components/AboutSection.tsx` — caption do card flutuante
7. `src/components/ProcessSection.tsx` — números e legendas das etapas
8. `src/components/DifferentialsSection.tsx` — subtítulos curtos
9. `src/components/Navbar.tsx` — labels do menu (já em `text-sm`)
10. `src/components/WhatsAppButton.tsx` — tooltip

## O que NÃO muda

- Tamanhos (`text-[11px]`, `text-xs`, `text-sm`) permanecem
- Cores e pesos atual
- Títulos Playfair (h1, h2, h3)
- Componentes `ui/` shadcn
- Botões CTA principais

## Resultado esperado

Microtipografia mais respirada e refinada, alinhada ao padrão institucional do rodapé do formulário, sem reflows perceptíveis no layout.
