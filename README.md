# Dashboard Televendas Campneus - Versão Atualizada

Dashboard interativo para análise de performance de televendas da Campneus, desenvolvido em React com Node.js, baseado no novo design HTML fornecido.

## 🚀 Características Atualizadas

- **Interface Moderna**: Design baseado no HTML fornecido com cores preta, branca e amarelo
- **Filtro de Data Reposicionado**: Localizado no canto superior direito para melhor usabilidade
- **KPIs Interativos**: Métricas completas de ligações, atendimentos, CSAT e conversões
- **Novos KPIs Implementados**:
  - **VAT por Top 30**: Gráfico de barras mostrando performance dos vendedores
  - **Funil de Conversão**: Visualização do processo de conversão
  - **Mais Cotados**: Tabela com modelos mais cotados e suas conversões
  - **Atendimentos x Ignoradas por dia**: Gráfico de linha baseado na imagem fornecida
- **Navegação por Abas**: Visão Geral, Ligações, Omnichat e Agentes
- **Gráficos Dinâmicos**: Visualizações com Recharts
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## 📊 Dados Suportados

O dashboard processa os seguintes tipos de dados:

- **JUL_LIGACOES.csv**: Dados de ligações atendidas e ignoradas
- **JUL_OMNICHAT.csv**: Dados de atendimentos via chat
- **JUL_STATUS_AGENTE.csv**: Status e performance dos agentes
- **JUL_totvs_orçamento.xlsx**: Dados de orçamentos gerados
- **Funcionarios.xlsx**: Informações dos funcionários
- **mais_cotados.json**: Dados dos modelos mais cotados (gerado automaticamente)

## 🎯 Principais Melhorias Implementadas

### 1. Design Atualizado
- Layout baseado no arquivo HTML fornecido
- Cores consistentes: preto (#0A0A0A), branco (#FFFFFF) e amarelo (#FACC15)
- Cards com animações hover
- Tipografia melhorada

### 2. Filtros Reposicionados
- Filtro de data movido para o canto superior direito
- Remoção da opção "Exportar CSV" conforme solicitado
- Interface mais limpa e intuitiva

### 3. Novos KPIs
- **VAT por Top 30**: Gráfico de barras pretas mostrando performance
- **Funil de Conversão**: Visualização do processo completo
- **Mais Cotados**: Tabela com 22 modelos e suas métricas
- **Gráfico de Atendimentos x Ignoradas**: Baseado na imagem fornecida

### 4. Navegação Melhorada
- Sistema de abas mais intuitivo
- Cores de destaque amarelo para aba ativa
- Ícones representativos para cada seção

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Animações**: Framer Motion
- **Build**: Vite

## 📁 Estrutura do Projeto Atualizada

```
dashboard-campneus/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   ├── FilterPanel.jsx  # Painel de filtros avançados
│   │   ├── ComparisonPanel.jsx # Painel de comparação
│   │   └── DataUploader.jsx # Upload de dados
│   ├── data/                # Dados processados em JSON
│   │   ├── funcionarios.json
│   │   ├── jul_ligacoes.json
│   │   ├── jul_omnichat.json
│   │   ├── jul_status_agente.json
│   │   ├── jul_orcamento.json
│   │   └── mais_cotados.json # NOVO: Dados dos modelos mais cotados
│   ├── App.jsx              # Componente principal ATUALIZADO
│   ├── App.css              # Estilos customizados
│   └── main.jsx             # Ponto de entrada
├── package.json
├── README.md                # ATUALIZADO
└── DEPLOY_RENDER.md         # Guia de deploy
```

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18+ 
- npm ou pnpm

### Instalação

1. Clone ou extraia o projeto
2. Navegue até o diretório do projeto
3. Instale as dependências:

```bash
npm install
# ou
pnpm install
```

### Executar em Desenvolvimento

```bash
npm run dev
# ou
pnpm run dev
```

O dashboard estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
# ou
pnpm run build
```

Os arquivos de produção serão gerados na pasta `dist/`

## 📈 Funcionalidades do Dashboard Atualizado

### Aba Visão Geral
- **KPIs Principais**: 8 cards com métricas essenciais
- **Atendimentos x Ignoradas por dia**: Gráfico de linha com dados do mês
- **VAT por Top 30**: Gráfico de barras com performance dos vendedores
- **Funil de Conversão**: Visualização do processo de vendas
- **Mais Cotados**: Tabela com os 22 modelos mais cotados
- **Top 10 Agentes**: Ranking de performance

### Aba Ligações
- **KPIs Específicos**: Sem resposta, taxa não resposta, tempo médio
- **Tabela Detalhada**: Performance individual por agente
- **Métricas Calculadas**: Taxa de atendimento automática

### Aba Omnichat
- **Distribuição CSAT**: Gráfico de pizza com faixas de satisfação
- **Performance Chat**: Gráfico de barras por agente
- **Tabela de Performance**: Dados detalhados de chat

### Aba Agentes
- **Informações Gerais**: Total de funcionários, ativos, dias trabalhados
- **Lista Completa**: Tabela com todos os funcionários e status

## 🎨 Personalização

### Cores do Tema Atualizadas
```javascript
const COLORS = {
  primary: "#FACC15",     // Amarelo principal
  secondary: "#0A0A0A",   // Preto
  white: "#FFFFFF",       // Branco
  gray: "#6B7280",        // Cinza
  green: "#10B981",       // Verde
  blue: "#3B82F6",        // Azul
  purple: "#8B5CF6",      // Roxo
  indigo: "#6366F1",      // Índigo
  red: "#EF4444"          // Vermelho
};
```

### Gráficos
Cores dos gráficos definidas em:
```javascript
const CHART_COLORS = ['#FACC15', '#0A0A0A', '#FFD60A', '#F59E0B', '#EAB308'];
```

## 🔄 Atualizando Dados

### Método 1: Substituir Arquivos
1. Substitua os arquivos na pasta `src/data/`
2. Para "Mais Cotados", edite `src/data/mais_cotados.json`
3. Rebuild e redeploy a aplicação

### Método 2: Upload via Interface (Futuro)
- Funcionalidade de upload implementada para expansão futura
- Suporte a CSV e processamento automático

## 🌐 Deploy no Render

Siga o guia completo em `DEPLOY_RENDER.md` para instruções detalhadas de deploy.

### Deploy Rápido
1. Faça upload do código para GitHub
2. Conecte ao Render como "Static Site"
3. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

## 🐛 Solução de Problemas

### Build Bem-sucedido
- ✅ Build passa sem erros
- ✅ Todos os componentes carregam corretamente
- ✅ Gráficos renderizam adequadamente
- ✅ Navegação entre abas funciona

### Performance
- Bundle otimizado: ~847KB (comprimido: ~242KB)
- Carregamento rápido dos dados
- Animações suaves

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o dashboard, consulte a documentação do código ou entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Este projeto foi desenvolvido especificamente para a Campneus e é de uso interno da empresa.

---

**✨ Versão Atualizada** - Implementadas todas as modificações solicitadas baseadas no design HTML fornecido!

