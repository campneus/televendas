import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function DataUploader({ onDataUpload }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    setIsUploading(true);

    try {
      const newFiles = [];
      
      for (const file of files) {
        const fileData = {
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'processing',
          data: null
        };

        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          const text = await file.text();
          fileData.data = parseCSV(text);
          fileData.status = 'success';
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.name.endsWith('.xlsx')) {
          // Para arquivos Excel, seria necessário uma biblioteca como xlsx
          fileData.status = 'error';
          fileData.error = 'Arquivos Excel não são suportados nesta versão. Use CSV.';
        } else {
          fileData.status = 'error';
          fileData.error = 'Tipo de arquivo não suportado. Use CSV ou XLSX.';
        }

        newFiles.push(fileData);
      }

      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Notificar componente pai sobre novos dados
      const successfulUploads = newFiles.filter(f => f.status === 'success');
      if (successfulUploads.length > 0 && onDataUpload) {
        onDataUpload(successfulUploads);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const parseCSV = (text) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim());
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
    }

    return data;
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-neutral-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-neutral-200 bg-neutral-50';
    }
  };

  return (
    <Card className="rounded-2xl shadow-sm bg-white border-neutral-200 border">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Upload className="w-5 h-5 text-yellow-600" />
            Upload de Dados
          </h3>
        </div>

        {/* Área de Upload */}
        <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center mb-4">
          <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-neutral-700 mb-2">
            Arraste arquivos aqui ou clique para selecionar
          </h4>
          <p className="text-sm text-neutral-500 mb-4">
            Suporte para arquivos CSV e XLSX (máx. 10MB cada)
          </p>
          <input
            type="file"
            multiple
            accept=".csv,.xlsx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={isUploading}
          />
          <Button
            asChild
            className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-xl"
            disabled={isUploading}
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              {isUploading ? 'Processando...' : 'Selecionar Arquivos'}
            </label>
          </Button>
        </div>

        {/* Lista de Arquivos */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-700">Arquivos Carregados:</h4>
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(file.status)}`}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(file.status)}
                  <div>
                    <p className="text-sm font-medium text-neutral-800">{file.name}</p>
                    <p className="text-xs text-neutral-500">
                      {(file.size / 1024).toFixed(1)} KB
                      {file.data && ` • ${file.data.length} registros`}
                    </p>
                    {file.error && (
                      <p className="text-xs text-red-600 mt-1">{file.error}</p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-neutral-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Instruções */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">Instruções:</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Para substituir dados existentes, carregue arquivos com os mesmos nomes</li>
            <li>• Arquivos CSV devem ter cabeçalhos na primeira linha</li>
            <li>• Formatos suportados: JUL_LIGACOES.csv, JUL_OMNICHAT.csv, etc.</li>
            <li>• Os dados serão processados automaticamente após o upload</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

