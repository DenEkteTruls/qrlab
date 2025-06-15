import { useState, useCallback } from 'react';

// Import the QR generator (you'll need to adjust the path)
const QRCodeGenerator = require('./QRCodeGenerator');

export function useQRGenerator(initialOptions = {}) {
  const [generator] = useState(() => new QRCodeGenerator(initialOptions));
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [qrResult, setQrResult] = useState(null);

  const generateQR = useCallback(async (type, data, preferredMethod = 'api') => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Validate data first
      const validation = generator.validateData(type, data);
      if (!validation.valid) {
        throw new Error(validation.errors.join(', '));
      }

      const result = await generator.generate(type, data, preferredMethod);
      setQrResult(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [generator]);

  const updateOptions = useCallback((newOptions) => {
    generator.updateOptions(newOptions);
  }, [generator]);

  const downloadQR = useCallback(async (filename) => {
    if (!qrResult) {
      throw new Error('No QR code to download');
    }
    
    try {
      await generator.downloadQR(qrResult.url, filename);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [generator, qrResult]);

  const copyToClipboard = useCallback(async () => {
    if (!qrResult) {
      throw new Error('No QR code to copy');
    }
    
    try {
      await generator.copyToClipboard(qrResult.url);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [generator, qrResult]);

  return {
    generateQR,
    updateOptions,
    downloadQR,
    copyToClipboard,
    isGenerating,
    error,
    qrResult,
    generator
  };
} 