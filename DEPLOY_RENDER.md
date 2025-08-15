# 🚀 Guia de Deploy no Render - Dashboard Campneus

Este guia detalha como fazer o deploy do Dashboard Televendas Campneus no Render.

## 📋 Pré-requisitos

- Conta no [Render](https://render.com)
- Projeto buildado localmente (opcional)
- Repositório Git (GitHub, GitLab, Bitbucket) - recomendado

## 🌐 Método 1: Deploy via Repositório Git (Recomendado)

### Passo 1: Preparar o Repositório

1. **Criar repositório Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Dashboard Campneus"
   ```

2. **Fazer push para GitHub/GitLab**:
   ```bash
   git remote add origin https://github.com/seu-usuario/dashboard-campneus.git
   git push -u origin main
   ```

### Passo 2: Conectar ao Render

1. Acesse [render.com](https://render.com) e faça login
2. Clique em **"New +"** → **"Static Site"**
3. Conecte sua conta Git (GitHub/GitLab)
4. Selecione o repositório `dashboard-campneus`

### Passo 3: Configurar o Deploy

Configure as seguintes opções:

| Campo | Valor |
|-------|-------|
| **Name** | `dashboard-campneus` |
| **Branch** | `main` |
| **Root Directory** | (deixe vazio) |
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |

### Passo 4: Variáveis de Ambiente (se necessário)

Se precisar de variáveis de ambiente:
- Clique em **"Advanced"**
- Adicione as variáveis necessárias

### Passo 5: Deploy

1. Clique em **"Create Static Site"**
2. O Render iniciará o build automaticamente
3. Aguarde a conclusão (3-5 minutos)
4. Acesse a URL fornecida pelo Render

## 📦 Método 2: Deploy Manual

### Passo 1: Build Local

```bash
# No diretório do projeto
npm install
npm run build
```

### Passo 2: Upload Manual

1. Acesse [render.com](https://render.com)
2. Clique em **"New +"** → **"Static Site"**
3. Selecione **"Deploy an existing static site"**
4. Faça upload da pasta `dist/`

### Passo 3: Configurar

| Campo | Valor |
|-------|-------|
| **Name** | `dashboard-campneus` |
| **Publish Directory** | `dist` |

## ⚙️ Configuração Avançada

### Arquivo render.yaml (Opcional)

Crie um arquivo `render.yaml` na raiz do projeto:

```yaml
services:
  - type: web
    name: dashboard-campneus
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    headers:
      - path: /*
        name: Cache-Control
        value: public, max-age=31536000
      - path: /index.html
        name: Cache-Control
        value: public, max-age=0
```

### Configurações de Performance

Para melhor performance, configure:

1. **Headers de Cache**:
   - Assets estáticos: `Cache-Control: public, max-age=31536000`
   - HTML: `Cache-Control: public, max-age=0`

2. **Compressão**:
   - O Render ativa compressão gzip automaticamente

3. **Redirects**:
   - SPA redirect: `/* → /index.html`

## 🔄 Deploy Automático

### Configurar Webhook

1. No painel do Render, vá em **"Settings"**
2. Em **"Build & Deploy"**, ative **"Auto-Deploy"**
3. Configure o branch para deploy automático

### Deploy via API

```bash
# Trigger deploy via API
curl -X POST "https://api.render.com/deploy/srv-YOUR_SERVICE_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 🌍 Domínio Customizado

### Configurar Domínio

1. No painel do Render, vá em **"Settings"**
2. Clique em **"Custom Domains"**
3. Adicione seu domínio: `dashboard.campneus.com.br`
4. Configure os DNS records:

```
Type: CNAME
Name: dashboard
Value: dashboard-campneus.onrender.com
```

### SSL/HTTPS

- O Render fornece SSL gratuito via Let's Encrypt
- Ativação automática após configuração do domínio

## 📊 Monitoramento

### Logs de Deploy

```bash
# Ver logs via CLI do Render
render logs -s dashboard-campneus
```

### Métricas

No painel do Render, monitore:
- **Build Time**: Tempo de build
- **Deploy Status**: Status dos deploys
- **Traffic**: Tráfego do site

## 🔧 Solução de Problemas

### Build Falha

**Erro comum**: `npm: command not found`
- **Solução**: Verificar se `package.json` está na raiz

**Erro comum**: `Build failed with exit code 1`
- **Solução**: Executar `npm run build` localmente para debug

### Site não Carrega

**Problema**: Página em branco
- **Solução**: Verificar se `dist/index.html` existe

**Problema**: 404 em rotas
- **Solução**: Configurar redirect `/* → /index.html`

### Performance Lenta

**Bundle muito grande** (~900KB):
```javascript
// vite.config.js - Otimização
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select']
        }
      }
    }
  }
}
```

## 📱 Teste de Deploy

### Checklist Pós-Deploy

- [ ] Site carrega corretamente
- [ ] Dados aparecem nos gráficos
- [ ] Filtros funcionam
- [ ] Abas navegam corretamente
- [ ] Exportação CSV funciona
- [ ] Responsivo em mobile
- [ ] Performance aceitável

### URLs de Teste

Após deploy, teste:
- **Homepage**: `https://dashboard-campneus.onrender.com`
- **Filtros**: Teste filtros por vendedor
- **Comparação**: Navegue entre abas
- **Mobile**: Teste em dispositivos móveis

## 🔄 Atualizações Futuras

### Deploy de Atualizações

1. **Via Git**:
   ```bash
   git add .
   git commit -m "Atualização dashboard"
   git push origin main
   ```

2. **Manual**: Upload nova pasta `dist/`

### Backup de Dados

Antes de atualizações importantes:
1. Backup dos arquivos em `src/data/`
2. Export das configurações do Render
3. Teste em ambiente de staging

## 📞 Suporte Render

- **Documentação**: [docs.render.com](https://docs.render.com)
- **Status**: [status.render.com](https://status.render.com)
- **Suporte**: Via dashboard do Render

---

**🎉 Parabéns!** Seu Dashboard Campneus está agora online e acessível 24/7 via Render!

