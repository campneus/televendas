import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const CHART_COLORS = ['#FACC15', '#0A0A0A', '#FFD60A', '#F59E0B'];

function MetricComparison({ title, currentValue, previousValue, format = 'number' }) {
  const difference = currentValue - previousValue;
  const percentChange = previousValue !== 0 ? (difference / previousValue) * 100 : 0;
  
  const formatValue = (value) => {
    if (format === 'percentage') return `${value.toFixed(1)}%`;
    if (format === 'currency') return `R$ ${value.toLocaleString()}`;
    return value.toLocaleString();
  };

  const getTrendIcon = () => {
    if (difference > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (difference < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-neutral-500" />;
  };

  const getTrendColor = () => {
    if (difference > 0) return 'text-green-600';
    if (difference < 0) return 'text-red-600';
    return 'text-neutral-500';
  };

  return (
    <div className="p-4 border rounded-xl bg-neutral-50">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-neutral-700">{title}</h4>
        {getTrendIcon()}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-black">
          {formatValue(currentValue)}
        </div>
        <div className="text-sm text-neutral-500">
          Anterior: {formatValue(previousValue)}
        </div>
        <div className={`text-sm font-medium ${getTrendColor()}`}>
          {difference > 0 ? '+' : ''}{formatValue(Math.abs(difference))} 
          ({percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%)
        </div>
      </div>
    </div>
  );
}

export default function ComparisonPanel({ 
  currentData, 
  previousData, 
  comparisonType = 'period' 
}) {
  const comparisonMetrics = useMemo(() => {
    if (!currentData || !previousData) return [];

    return [
      {
        title: 'Ligações Atendidas',
        current: currentData.totalLigacoesAtendidas || 0,
        previous: previousData.totalLigacoesAtendidas || 0,
        format: 'number'
      },
      {
        title: 'Taxa de Ignoradas',
        current: currentData.percentualIgnoradas || 0,
        previous: previousData.percentualIgnoradas || 0,
        format: 'percentage'
      },
      {
        title: 'Atendimentos Omnichat',
        current: currentData.totalOmnichat || 0,
        previous: previousData.totalOmnichat || 0,
        format: 'number'
      },
      {
        title: 'Orçamentos Gerados',
        current: currentData.totalOrcamentos || 0,
        previous: previousData.totalOrcamentos || 0,
        format: 'number'
      },
      {
        title: 'CSAT Médio',
        current: currentData.csatMedio || 0,
        previous: previousData.csatMedio || 0,
        format: 'number'
      },
      {
        title: 'Taxa de Conversão',
        current: currentData.taxaConversao || 0,
        previous: previousData.taxaConversao || 0,
        format: 'percentage'
      }
    ];
  }, [currentData, previousData]);

  const trendData = useMemo(() => {
    if (!currentData || !previousData) return [];

    return [
      {
        periodo: 'Anterior',
        ligacoes: previousData.totalLigacoesAtendidas || 0,
        omnichat: previousData.totalOmnichat || 0,
        orcamentos: previousData.totalOrcamentos || 0
      },
      {
        periodo: 'Atual',
        ligacoes: currentData.totalLigacoesAtendidas || 0,
        omnichat: currentData.totalOmnichat || 0,
        orcamentos: currentData.totalOrcamentos || 0
      }
    ];
  }, [currentData, previousData]);

  if (!currentData || !previousData) {
    return (
      <Card className="rounded-2xl shadow-sm bg-white border-neutral-200 border">
        <CardContent className="p-4 sm:p-5">
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">
              Comparação não disponível
            </h3>
            <p className="text-sm text-neutral-500">
              Selecione dois períodos para comparar os dados
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Métricas de Comparação */}
      <Card className="rounded-2xl shadow-sm bg-white border-neutral-200 border">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Comparação de {comparisonType === 'period' ? 'Períodos' : 'Vendedores'}
            </h3>
            <Button variant="outline" size="sm" className="rounded-xl">
              Exportar Comparação
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonMetrics.map((metric, index) => (
              <MetricComparison
                key={index}
                title={metric.title}
                currentValue={metric.current}
                previousValue={metric.previous}
                format={metric.format}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Tendência */}
      <Card className="rounded-2xl shadow-sm bg-white border-neutral-200 border">
        <CardContent className="p-4 sm:p-5">
          <h3 className="text-lg font-semibold mb-4">Tendência Comparativa</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ligacoes" fill={CHART_COLORS[0]} name="Ligações" />
                <Bar dataKey="omnichat" fill={CHART_COLORS[1]} name="Omnichat" />
                <Bar dataKey="orcamentos" fill={CHART_COLORS[2]} name="Orçamentos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Insights Automáticos */}
      <Card className="rounded-2xl shadow-sm bg-white border-neutral-200 border">
        <CardContent className="p-4 sm:p-5">
          <h3 className="text-lg font-semibold mb-4">Insights Automáticos</h3>
          <div className="space-y-3">
            {comparisonMetrics.map((metric, index) => {
              const difference = metric.current - metric.previous;
              const percentChange = metric.previous !== 0 ? (difference / metric.previous) * 100 : 0;
              
              if (Math.abs(percentChange) < 5) return null; // Só mostra mudanças significativas
              
              return (
                <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    {difference > 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        {metric.title} {difference > 0 ? 'aumentou' : 'diminuiu'} {Math.abs(percentChange).toFixed(1)}%
                      </p>
                      <p className="text-xs text-neutral-600 mt-1">
                        {difference > 0 ? 'Melhoria' : 'Atenção necessária'} em relação ao período anterior
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

