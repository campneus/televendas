import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarDays, 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Percent, 
  Clock, 
  TrendingUp, 
  Users, 
  MessageCircle,
  CheckCircle,
  PieChart,
  User,
  Trophy,
  BarChart3,
  Star,
  PhoneIncoming,
  Target,
  ShoppingCart,
  Gauge
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Cell 
} from "recharts";

// Esquema de cores simplificado
const COLORS = {
  primary: "#FACC15",     // Amarelo
  secondary: "#0A0A0A",   // Preto
  white: "#FFFFFF",       // Branco
  success: "#10B981",     // Verde (bom)
  danger: "#EF4444",      // Vermelho (ruim)
  gray: "#6B7280"         // Cinza neutro
};

const CHART_COLORS = [COLORS.secondary, COLORS.primary, COLORS.success, COLORS.danger, COLORS.gray];

function App() {
  const [dados, setDados] = useState({
    kpis: {},
    agentes: [],
    atendimentosDiarios: [],
    maisCotados: []
  });
  const [dataInicio, setDataInicio] = useState("2025-07-01");
  const [dataFim, setDataFim] = useState("2025-07-31");

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      // Carregar KPIs calculados
      const kpisResponse = await fetch('/src/data/kpis_calculados.json');
      const kpis = await kpisResponse.json();

      // Carregar agentes consolidados
      const agentesResponse = await fetch('/src/data/agentes_consolidados.json');
      const agentes = await agentesResponse.json();

      // Carregar atendimentos diários
      const atendimentosResponse = await fetch('/src/data/atendimentos_diarios.json');
      const atendimentosDiarios = await atendimentosResponse.json();

      // Carregar mais cotados
      const maisCotadosResponse = await fetch('/src/data/mais_cotados.json');
      const maisCotados = await maisCotadosResponse.json();

      setDados({
        kpis,
        agentes,
        atendimentosDiarios,
        maisCotados
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Dados de fallback
      setDados({
        kpis: {
          total_ligacoes: 23093,
          ligacoes_atendidas: 19866,
          taxa_atendimento: 86.0,
          csat_medio: 4.4,
          chats_recebidos: 12718,
          chats_finalizados: 12707,
          taxa_finalizacao: 99.9,
          agentes_ativos: 44,
          total_orcamentos: 1250,
          orcamentos_convertidos: 188,
          percentual_convertidos: 15.0,
          percentual_fora_fila: 32.5,
          media_pneu: 4.5,
          sem_resposta: 3227,
          taxa_nao_resposta: 14.0
        },
        agentes: [],
        atendimentosDiarios: [],
        maisCotados: []
      });
    }
  };

  const getColorByValue = (value, threshold, isHigherBetter = true) => {
    if (isHigherBetter) {
      return value >= threshold ? COLORS.success : COLORS.danger;
    } else {
      return value <= threshold ? COLORS.success : COLORS.danger;
    }
  };

  const KPICard = ({ label, value, icon: Icon, isPercentage = false, threshold = null, isHigherBetter = true }) => {
    const color = threshold ? getColorByValue(value, threshold, isHigherBetter) : COLORS.secondary;
    
    return (
      <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
              <p className="text-2xl font-bold" style={{ color }}>
                {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
                {isPercentage && '%'}
              </p>
            </div>
            <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
              <Icon className="h-6 w-6" style={{ color }} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const FunilConversao = () => {
    const { kpis } = dados;
    
    const etapas = [
      { nome: "Contatos Totais", valor: kpis.total_ligacoes || 0, cor: COLORS.secondary },
      { nome: "Ligações Atendidas", valor: kpis.ligacoes_atendidas || 0, cor: COLORS.primary },
      { nome: "Chats Recebidos", valor: kpis.chats_recebidos || 0, cor: COLORS.success },
      { nome: "Chats Finalizados", valor: kpis.chats_finalizados || 0, cor: COLORS.success }
    ];

    return (
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Funil de Conversão</h3>
          </div>
          
          <div className="space-y-4">
            {etapas.map((etapa, index) => {
              const porcentagem = index === 0 ? 100 : ((etapa.valor / etapas[0].valor) * 100);
              
              return (
                <div key={etapa.nome} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{etapa.nome}</span>
                    <span className="text-sm font-bold" style={{ color: etapa.cor }}>
                      {etapa.valor.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${porcentagem}%`, 
                        backgroundColor: etapa.cor,
                        boxShadow: `0 0 10px ${etapa.cor}40`
                      }}
                    />
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {porcentagem.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const GraficoAtendimentosIgnoradas = () => {
    const { atendimentosDiarios } = dados;
    
    return (
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <PhoneCall className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Atendimentos x Ignoradas por dia (Julho)</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={atendimentosDiarios}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="data" 
                stroke="#666"
                fontSize={12}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="atendidas" 
                stroke={COLORS.success}
                strokeWidth={3}
                dot={{ fill: COLORS.success, strokeWidth: 2, r: 4 }}
                name="Atendidas"
              />
              <Line 
                type="monotone" 
                dataKey="ignoradas" 
                stroke={COLORS.danger}
                strokeWidth={3}
                dot={{ fill: COLORS.danger, strokeWidth: 2, r: 4 }}
                name="Ignoradas"
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Taxa média de ignoradas em julho: <span className="font-bold text-red-600">{dados.kpis.taxa_nao_resposta || 14.0}%</span>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const GraficoVATTop30 = () => {
    const { agentes } = dados;
    const top30 = agentes.slice(0, 30);
    
    return (
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">VAT por Top 30 – Julho</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top30}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="nome" 
                stroke="#666"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="performance" 
                fill={COLORS.secondary}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  const TabelaMaisCotados = () => {
    const { maisCotados } = dados;
    
    return (
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Mais Cotados</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">MODELO</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">VENDIDOS</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">CONVERSÃO</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">%</th>
                </tr>
              </thead>
              <tbody>
                {maisCotados.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2 font-medium text-gray-900">{item.Modelo || item.modelo}</td>
                    <td className="py-2 px-2 text-right text-gray-700">{(item.Vendidos || item.vendidos).toLocaleString('pt-BR')}</td>
                    <td className="py-2 px-2 text-right text-gray-700">{(item.Conversao || item.conversao).toLocaleString('pt-BR')}</td>
                    <td className="py-2 px-2 text-right font-semibold" style={{ 
                      color: (item.Percentual || item.percentual) >= 15 ? COLORS.success : COLORS.danger 
                    }}>
                      {(item.Percentual || item.percentual).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TabelaAgentes = () => {
    const { agentes } = dados;
    
    return (
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Performance de Agentes</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Agente</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">Ligações</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">Chats</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">CSAT</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {agentes.slice(0, 20).map((agente, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2 font-medium text-gray-900">{agente.nome}</td>
                    <td className="py-2 px-2 text-right text-gray-700">{agente.ligacoes.toLocaleString('pt-BR')}</td>
                    <td className="py-2 px-2 text-right text-gray-700">{agente.chats.toLocaleString('pt-BR')}</td>
                    <td className="py-2 px-2 text-right">
                      {agente.csat !== "N/A" ? (
                        <div className="flex items-center justify-end gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span style={{ color: agente.csat >= 4 ? COLORS.success : COLORS.danger }}>
                            {agente.csat}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="py-2 px-2 text-right font-semibold" style={{ 
                      color: agente.performance >= 80 ? COLORS.success : agente.performance >= 60 ? COLORS.primary : COLORS.danger 
                    }}>
                      {agente.performance}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard - Televendas - Campneus</h1>
            <p className="text-sm text-gray-600">Análise de performance e atendimento - Julho 2025</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <Input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-40"
              />
              <span className="text-gray-500">até</span>
              <Input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-40"
              />
            </div>
            <Button 
              onClick={carregarDados}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <Tabs defaultValue="visao-geral" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="visao-geral" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <BarChart3 className="h-4 w-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="ligacoes" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Phone className="h-4 w-4 mr-2" />
              Ligações
            </TabsTrigger>
            <TabsTrigger value="omnichat" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <MessageCircle className="h-4 w-4 mr-2" />
              Omnichat
            </TabsTrigger>
            <TabsTrigger value="agentes" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Users className="h-4 w-4 mr-2" />
              Agentes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visao-geral" className="space-y-6 mt-6">
            {/* KPIs Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                label="Total de Ligações"
                value={dados.kpis.total_ligacoes}
                icon={Phone}
              />
              <KPICard
                label="Ligações Atendidas"
                value={dados.kpis.ligacoes_atendidas}
                icon={PhoneCall}
              />
              <KPICard
                label="Taxa de Atendimento"
                value={dados.kpis.taxa_atendimento}
                icon={Percent}
                isPercentage={true}
                threshold={85}
                isHigherBetter={true}
              />
              <KPICard
                label="CSAT Médio"
                value={dados.kpis.csat_medio}
                icon={Star}
                threshold={4.0}
                isHigherBetter={true}
              />
            </div>

            {/* KPIs Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                label="Chats Recebidos"
                value={dados.kpis.chats_recebidos}
                icon={MessageCircle}
              />
              <KPICard
                label="Chats Finalizados"
                value={dados.kpis.chats_finalizados}
                icon={CheckCircle}
              />
              <KPICard
                label="Taxa Finalização"
                value={dados.kpis.taxa_finalizacao}
                icon={Clock}
                isPercentage={true}
                threshold={95}
                isHigherBetter={true}
              />
              <KPICard
                label="Agentes Ativos"
                value={dados.kpis.agentes_ativos}
                icon={User}
              />
            </div>

            {/* Novos KPIs Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                label="Total Orçamentos"
                value={dados.kpis.total_orcamentos}
                icon={ShoppingCart}
              />
              <KPICard
                label="Orçamentos Convertidos"
                value={dados.kpis.orcamentos_convertidos}
                icon={Target}
              />
              <KPICard
                label="% Orçamentos Convertidos"
                value={dados.kpis.percentual_convertidos}
                icon={TrendingUp}
                isPercentage={true}
                threshold={12}
                isHigherBetter={true}
              />
              <KPICard
                label="% Fora da Fila"
                value={dados.kpis.percentual_fora_fila}
                icon={Clock}
                isPercentage={true}
                threshold={30}
                isHigherBetter={false}
              />
            </div>

            {/* Novos KPIs Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                label="Média de Pneu"
                value={dados.kpis.media_pneu}
                icon={Gauge}
                threshold={4.0}
                isHigherBetter={true}
              />
              <KPICard
                label="Sem Resposta"
                value={dados.kpis.sem_resposta}
                icon={PhoneOff}
              />
              <KPICard
                label="Taxa Não Resposta"
                value={dados.kpis.taxa_nao_resposta}
                icon={PhoneOff}
                isPercentage={true}
                threshold={15}
                isHigherBetter={false}
              />
              <KPICard
                label="Tempo Médio Ligação"
                value="4m 32s"
                icon={Clock}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GraficoAtendimentosIgnoradas />
              <GraficoVATTop30 />
            </div>

            {/* Funil e Mais Cotados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FunilConversao />
              <TabelaMaisCotados />
            </div>

            {/* Tabela de Agentes */}
            <TabelaAgentes />
          </TabsContent>

          <TabsContent value="ligacoes" className="space-y-6 mt-6">
            {/* KPIs específicos de ligações */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard
                label="Sem Resposta"
                value={dados.kpis.sem_resposta}
                icon={PhoneOff}
              />
              <KPICard
                label="Taxa Não Resposta"
                value={dados.kpis.taxa_nao_resposta}
                icon={PhoneOff}
                isPercentage={true}
                threshold={15}
                isHigherBetter={false}
              />
              <KPICard
                label="Tempo Médio Ligação"
                value="4m 32s"
                icon={Clock}
              />
            </div>

            {/* Tabela detalhada de ligações por agente */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Detalhes de Ligações por Agente</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">AGENTE</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">ATENDIDAS</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">SEM RESPOSTA</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">TOTAL</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">TAXA ATENDIMENTO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados.agentes.slice(0, 15).map((agente, index) => {
                        const total = agente.ligacoes + (agente.sem_resposta || 0);
                        const taxa = total > 0 ? (agente.ligacoes / total * 100) : 0;
                        
                        return (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 px-2 font-medium text-gray-900">{agente.nome}</td>
                            <td className="py-2 px-2 text-right text-gray-700">{agente.ligacoes.toLocaleString('pt-BR')}</td>
                            <td className="py-2 px-2 text-right text-gray-700">{(agente.sem_resposta || 0).toLocaleString('pt-BR')}</td>
                            <td className="py-2 px-2 text-right text-gray-700">{total.toLocaleString('pt-BR')}</td>
                            <td className="py-2 px-2 text-right font-semibold" style={{ 
                              color: taxa >= 85 ? COLORS.success : taxa >= 70 ? COLORS.primary : COLORS.danger 
                            }}>
                              {taxa.toFixed(1)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="omnichat" className="space-y-6 mt-6">
            {/* Gráficos de CSAT e Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <PieChart className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Distribuição CSAT</h3>
                  </div>
                  
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-600 mb-2">{dados.kpis.csat_medio}</div>
                      <div className="text-sm text-gray-600">CSAT Médio</div>
                      <div className="flex justify-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${star <= Math.round(dados.kpis.csat_medio) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Performance Chat por Agente</h3>
                  </div>
                  
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={dados.agentes.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="nome" 
                        stroke="#666"
                        fontSize={10}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="chats" fill={COLORS.success} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Tabela de Performance de Chat por Agente */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance de Chat por Agente</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">AGENTE</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">RECEBIDOS</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">FINALIZADOS</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">CSAT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados.agentes.filter(a => a.chats > 0).slice(0, 15).map((agente, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 px-2 font-medium text-gray-900">{agente.nome}</td>
                          <td className="py-2 px-2 text-right text-gray-700">{agente.chats.toLocaleString('pt-BR')}</td>
                          <td className="py-2 px-2 text-right text-gray-700">{Math.round(agente.chats * 0.98).toLocaleString('pt-BR')}</td>
                          <td className="py-2 px-2 text-right">
                            {agente.csat !== "N/A" ? (
                              <span style={{ color: agente.csat >= 4 ? COLORS.success : COLORS.danger }}>
                                {agente.csat}
                              </span>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agentes" className="space-y-6 mt-6">
            {/* KPIs de Agentes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard
                label="Total Funcionários"
                value={dados.kpis.total_funcionarios}
                icon={Users}
              />
              <KPICard
                label="Agentes Ativos"
                value={dados.kpis.agentes_ativos}
                icon={User}
              />
              <KPICard
                label="Dias Trabalhados (Média)"
                value="22"
                icon={CalendarDays}
              />
            </div>

            {/* Tabela completa de agentes */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Lista Completa de Agentes</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">Agente</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">Ligações</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">Chats</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">CSAT</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados.agentes.map((agente, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 px-2 font-medium text-gray-900">{agente.nome}</td>
                          <td className="py-2 px-2 text-right text-gray-700">{agente.ligacoes.toLocaleString('pt-BR')}</td>
                          <td className="py-2 px-2 text-right text-gray-700">{agente.chats.toLocaleString('pt-BR')}</td>
                          <td className="py-2 px-2 text-right">
                            {agente.csat !== "N/A" ? (
                              <div className="flex items-center justify-end gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span style={{ color: agente.csat >= 4 ? COLORS.success : COLORS.danger }}>
                                  {agente.csat}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="py-2 px-2 text-right font-semibold" style={{ 
                            color: agente.performance >= 80 ? COLORS.success : agente.performance >= 60 ? COLORS.primary : COLORS.danger 
                          }}>
                            {agente.performance}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;

