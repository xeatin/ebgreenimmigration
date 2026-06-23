## Reformulação da Última Tela (Step 4 — Análise e Agendamento)

### Problema
Com a integração do Calendly diretamente no fluxo, os campos abaixo tornam-se redundantes porque o próprio agendamento já captura intenção e contexto:
1. **"Quando pretende iniciar?"** (timeline) → obsoleto; o usuário escolhe a data/hora no Calendly
2. **"Status atual"** (currentStatus) → obsoleto; pode ser perguntado na consulta
3. **"Eu concordo com a Política de Privacidade"** (checkbox) → obsoleto; o próprio Calendly já apresenta os termos no fluxo de agendamento

### Nova estrutura do Step 4

```
┌─────────────────────────────────────────────────────┐
│  ✦  Análise Preliminar do seu Perfil                │
│                                                      │
│  [Card com visto sugerido + explicação]             │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  🎯  Próximo passo: agende sua consulta     │   │
│  │                                               │   │
│  │  Com base no seu perfil, preparamos uma      │   │
│  │  análise personalizada. Reserve um horário   │   │
│  │  com nosso time de especialistas.             │   │
│  │                                               │   │
│  │  [  📅  Agendar consulta gratuita  ]          │   │
│  │                                               │   │
│  │  ⏱ Duração: 30 minutos                       │   │
│  │  📹 Reunião por Google Meet (link automático)│   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  🔒  Seus dados estão protegidos e serão enviados  │
│      diretamente para nossa equipe de especialistas. │
└─────────────────────────────────────────────────────┘
```

### Mudanças visuais e comportamentais

| # | O que muda | Motivo |
|---|-----------|--------|
| 1 | Remove select **"Quando pretende iniciar?"** | O Calendly já captura a data/hora desejada |
| 2 | Remove select **"Status atual"** | Opcional e melhor tratado na consulta ao vivo |
| 3 | Remove checkbox **"Eu concordo com a Política de Privacidade"** | O Calendly apresenta os termos no checkout do agendamento |
| 4 | Remove botão de submit do formulário tradicional | Substituído pelo CTA de agendamento Calendly |
| 5 | Aumenta destaque do botão **"Agendar consulta"** | Torna-se a ação principal da tela |
| 6 | Adiciona microcopy abaixo do CTA | "30 min · Google Meet · Confirmação por e-mail" |
| 7 | Mantém o card de análise preliminar | Continua sendo o valor principal deste step |

### Fluxo de dados preservado
- Nome, e-mail, telefone e tipo de visto continuam sendo pré-preenchidos no Calendly via `openCalendlyPopup()`
- O `customAnswers` (telefone + visto sugerido) continua sendo enviado para a sessão do Calendly
- O `utm` tracking permanece intacto

### O que acontece com o botão "Voltar"?
Continua visível para permitir que o usuário revise os dados do perfil (Step 2) se necessário.

### Stepper (indicador de etapas)
Atualmente o stepper mostra 3 etapas. Com esta mudança, o Step 3 passa a ser apenas **visualização da análise + agendamento** — sem campos de formulário para preencher.

---

Aprovo esta reformulação e implemento agora?