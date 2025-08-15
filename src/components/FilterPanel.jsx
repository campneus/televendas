import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Filter, Download, RefreshCw } from 'lucide-react';

export default function FilterPanel({ 
  filters, 
  onFiltersChange, 
  onExport, 
  onRefresh,
  vendedores = [] 
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      startDate: '2025-07-01',
      endDate: '2025-07-31',
      vendedor: '',
      tipoMetrica: 'todos',
      minCSAT: 0,
      maxCSAT: 5
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <Card className="rounded-2xl shadow-sm bg-white border-neutral-200 border mb-6">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5 text-yellow-600" />
            Filtros Avançados
          </h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="rounded-xl"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Limpar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onExport}
              className="rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Período */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Período</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <CalendarDays className="w-4 h-4 text-neutral-500" />
              <input
                type="date"
                value={localFilters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="bg-transparent outline-none text-sm flex-1"
              />
              <span className="text-neutral-400">→</span>
              <input
                type="date"
                value={localFilters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>
          </div>

          {/* Vendedor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Vendedor</label>
            <Select 
              value={localFilters.vendedor} 
              onValueChange={(value) => handleFilterChange('vendedor', value)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Todos os vendedores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os vendedores</SelectItem>
                {vendedores.map((vendedor, index) => (
                  <SelectItem key={index} value={vendedor}>
                    {vendedor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Métrica */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Métrica</label>
            <Select 
              value={localFilters.tipoMetrica} 
              onValueChange={(value) => handleFilterChange('tipoMetrica', value)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Todas as métricas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as métricas</SelectItem>
                <SelectItem value="ligacoes">Ligações</SelectItem>
                <SelectItem value="omnichat">Omnichat</SelectItem>
                <SelectItem value="orcamentos">Orçamentos</SelectItem>
                <SelectItem value="csat">CSAT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CSAT Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Faixa CSAT</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={localFilters.minCSAT}
                onChange={(e) => handleFilterChange('minCSAT', parseFloat(e.target.value) || 0)}
                className="rounded-xl text-sm"
                placeholder="Min"
              />
              <span className="text-neutral-400">-</span>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={localFilters.maxCSAT}
                onChange={(e) => handleFilterChange('maxCSAT', parseFloat(e.target.value) || 5)}
                className="rounded-xl text-sm"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Busca rápida */}
        <div className="mt-4">
          <Input
            placeholder="Busca rápida por vendedor..."
            value={localFilters.busca || ''}
            onChange={(e) => handleFilterChange('busca', e.target.value)}
            className="rounded-xl"
          />
        </div>
      </CardContent>
    </Card>
  );
}

