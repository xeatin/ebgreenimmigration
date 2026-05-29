# Deploy na Hostinger

Use apenas os arquivos já gerados para produção.

## O que subir

- Pasta pronta: `hostinger-upload/`
- Ou o arquivo zipado: `ebgreen-hostinger-upload.zip`

## Onde subir

Suba o conteúdo para a pasta `public_html` do domínio na Hostinger.

## Importante

- Não envie `src/`, `node_modules/`, `package.json` ou outros arquivos do código-fonte.
- Se usar o zip, envie `ebgreen-hostinger-upload.zip` para `public_html` e extraia ali dentro.
- O arquivo `.htaccess` já está incluído para as rotas do React funcionarem corretamente na Hostinger.
- Se já existir uma página padrão da Hostinger no domínio, apague os arquivos antigos de `public_html` antes de extrair os novos.

## Estrutura final esperada em `public_html`

- `index.html`
- `.htaccess`
- `assets/`
- `robots.txt`
- `sitemap.xml`
- demais arquivos estáticos do build